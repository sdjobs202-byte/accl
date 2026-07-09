"use client";

import { useEffect, useRef } from "react";

/**
 * 히어로 배경 성좌 — 오른쪽 위 한 곳에만 은은한 별무리가 모여 살짝 빛나고,
 * 가까운 별끼리만 아주 옅은 선으로 이어짐. 나머지는 차분한 딥스페이스.
 * - 순수 canvas 2D, 라이브러리 없음 / 화면 밖이면 정지 / reduced-motion이면 정지 프레임
 * - 마우스 시차는 아주 약하게
 */
export default function HeroConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;

    const LINK = 116;
    const LINK2 = LINK * LINK;

    type P = { x: number; y: number; vx: number; vy: number; r: number; depth: number; hub: boolean; rx: number; ry: number; m: number };
    let ps: P[] = [];

    // 별무리 초점 (오른쪽 위) + 여기서 멀어질수록 사라짐
    let fx = 0;
    let fy = 0;
    let range = 1;

    const target = { x: 0, y: 0 };
    const off = { x: 0, y: 0 };
    let pointerInside = false;

    function seed() {
      // 개수 확 줄임 (성글게)
      const count = Math.round(Math.min(52, Math.max(14, (w * h) / 24000)));
      ps = Array.from({ length: count }, () => {
        // 오른쪽 위로 치우쳐 생성 (한쪽에 모이게)
        const x = (0.45 + Math.random() * 0.6) * w;
        const y = (Math.random() * 0.55) * h;
        return {
          x,
          y,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          r: Math.random() * 1.1 + 0.4,
          depth: 0.4 + Math.random() * 0.6,
          hub: Math.random() < 0.08,
          rx: x,
          ry: y,
          m: 1,
        };
      });
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.max(1, Math.floor(w * dpr));
      canvas!.height = Math.max(1, Math.floor(h * dpr));
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      fx = w * 0.86;
      fy = h * 0.15;
      range = Math.hypot(w, h) * 0.5;
      seed();
    }

    function frame() {
      const tx = pointerInside ? target.x : 0;
      const ty = pointerInside ? target.y : 0;
      off.x += (tx - off.x) * 0.05;
      off.y += (ty - off.y) * 0.05;

      ctx!.clearRect(0, 0, w, h);

      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        p.x = p.x < 0 ? 0 : p.x > w ? w : p.x;
        p.y = p.y < 0 ? 0 : p.y > h ? h : p.y;
        p.rx = p.x + off.x * p.depth;
        p.ry = p.y + off.y * p.depth;
        // 초점에서 멀수록 흐려짐 (한쪽만 빛나게)
        const d = Math.hypot(p.x - fx, p.y - fy) / range;
        const t = d < 1 ? 1 - d : 0;
        p.m = t * t; // 부드러운 감쇠
      }

      // 아주 옅은 연결선 (양끝이 모두 밝을 때만)
      for (let i = 0; i < ps.length; i++) {
        const a = ps[i];
        if (a.m < 0.05) continue;
        for (let j = i + 1; j < ps.length; j++) {
          const b = ps[j];
          if (b.m < 0.05) continue;
          const dx = a.rx - b.rx;
          const dy = a.ry - b.ry;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK2) {
            const lt = 1 - Math.sqrt(d2) / LINK;
            const alpha = lt * 0.22 * Math.min(a.m, b.m);
            if (alpha < 0.01) continue;
            ctx!.strokeStyle = `rgba(206,158,150,${alpha})`;
            ctx!.lineWidth = 0.5;
            ctx!.beginPath();
            ctx!.moveTo(a.rx, a.ry);
            ctx!.lineTo(b.rx, b.ry);
            ctx!.stroke();
          }
        }
      }

      // 별 (작고 은은하게)
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        if (p.m < 0.02) continue;
        const rad = p.hub ? p.r * 1.7 : p.r;
        const glow = rad * 3.2;
        const g = ctx!.createRadialGradient(p.rx, p.ry, 0, p.rx, p.ry, glow);
        const gi = (p.hub ? 0.5 : 0.34) * p.m;
        g.addColorStop(0, p.hub ? `rgba(255,180,140,${gi})` : `rgba(255,244,240,${gi})`);
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(p.rx, p.ry, glow, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.fillStyle = p.hub ? `rgba(255,210,185,${0.9 * p.m})` : `rgba(255,255,255,${0.8 * p.m})`;
        ctx!.beginPath();
        ctx!.arc(p.rx, p.ry, rad, 0, Math.PI * 2);
        ctx!.fill();
      }

      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    resize();
    frame();
    cancelAnimationFrame(raf);
    running = false;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !reduce) start();
          else stop();
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onMove = (ev: PointerEvent) => {
      const rect = canvas!.getBoundingClientRect();
      const inside =
        ev.clientX >= rect.left && ev.clientX <= rect.right && ev.clientY >= rect.top && ev.clientY <= rect.bottom;
      pointerInside = inside;
      if (inside) {
        target.x = ((ev.clientX - rect.left) / rect.width - 0.5) * 16;
        target.y = ((ev.clientY - rect.top) / rect.height - 0.5) * 16;
      }
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("resize", resize);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="hero-fx" aria-hidden="true">
      <div className="hero-fx__space" />
      <canvas ref={canvasRef} className="hero-fx__canvas" />
      <div className="hero-fx__vignette" />
    </div>
  );
}
