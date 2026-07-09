"use client";

import { useEffect, useRef } from "react";

/**
 * 히어로 배경 성좌 애니메이션 (우주 속 별 + 근접 시 연결선, Obsidian 그래프뷰 느낌).
 * - 순수 canvas 2D, 외부 라이브러리 없음
 * - 화면 밖이면 자동 정지(IntersectionObserver), prefers-reduced-motion이면 정지 프레임
 * - 마우스 위치에 따라 은은한 시차(parallax)
 * 감싸는 요소는 `relative overflow-hidden`, 콘텐츠는 `relative z-10`.
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

    const LINK = 132;
    const LINK2 = LINK * LINK;

    type P = { x: number; y: number; vx: number; vy: number; r: number; depth: number; hub: boolean };
    let ps: P[] = [];

    // 마우스 시차 (전역 오프셋, 파티클 depth로 층위감)
    const target = { x: 0, y: 0 };
    const off = { x: 0, y: 0 };
    let pointerInside = false;

    function seed() {
      const count = Math.round(Math.min(96, Math.max(26, (w * h) / 14000)));
      ps = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: Math.random() * 1.5 + 0.5,
        depth: 0.4 + Math.random() * 0.7,
        hub: Math.random() < 0.1,
      }));
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.max(1, Math.floor(w * dpr));
      canvas!.height = Math.max(1, Math.floor(h * dpr));
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function frame() {
      // 시차 오프셋 이징
      const tx = pointerInside ? target.x : 0;
      const ty = pointerInside ? target.y : 0;
      off.x += (tx - off.x) * 0.05;
      off.y += (ty - off.y) * 0.05;

      ctx!.clearRect(0, 0, w, h);

      // 위치 갱신 + 렌더 좌표 계산
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        p.x = p.x < 0 ? 0 : p.x > w ? w : p.x;
        p.y = p.y < 0 ? 0 : p.y > h ? h : p.y;
        (p as any).rx = p.x + off.x * p.depth;
        (p as any).ry = p.y + off.y * p.depth;
      }

      // 연결선
      for (let i = 0; i < ps.length; i++) {
        const a = ps[i] as any;
        for (let j = i + 1; j < ps.length; j++) {
          const b = ps[j] as any;
          const dx = a.rx - b.rx;
          const dy = a.ry - b.ry;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK2) {
            const t = 1 - Math.sqrt(d2) / LINK;
            ctx!.strokeStyle = `rgba(214,152,142,${t * 0.4})`;
            ctx!.lineWidth = 0.6;
            ctx!.beginPath();
            ctx!.moveTo(a.rx, a.ry);
            ctx!.lineTo(b.rx, b.ry);
            ctx!.stroke();
          }
        }
      }

      // 별(노드)
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i] as any;
        const rad = p.hub ? p.r * 1.9 : p.r;
        const glow = rad * 5;
        const g = ctx!.createRadialGradient(p.rx, p.ry, 0, p.rx, p.ry, glow);
        g.addColorStop(0, p.hub ? "rgba(255,172,132,0.85)" : "rgba(255,241,236,0.7)");
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(p.rx, p.ry, glow, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.fillStyle = p.hub ? "rgba(255,206,178,1)" : "rgba(255,255,255,0.92)";
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
    cancelAnimationFrame(raf); // 초기 1프레임만 그려두고 대기
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
        target.x = ((ev.clientX - rect.left) / rect.width - 0.5) * 26;
        target.y = ((ev.clientY - rect.top) / rect.height - 0.5) * 26;
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
