"use client";

import { useEffect, useRef } from "react";

/**
 * 히어로 배경 — 제자리에서 은은히 반짝이는 별(twinkle). 반딧불이처럼 돌아다니지 않음.
 * 오른쪽 위가 조금 더 밝고(별무리), 나머지는 성글게 흩어진 밤하늘 느낌.
 * - 순수 canvas 2D, 라이브러리 없음 / 화면 밖이면 정지 / reduced-motion이면 정지 프레임
 * - 마우스 올리면 아주 약한 시차(parallax)
 */
export default function HeroConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const TAU = Math.PI * 2;

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    let tk = 0; // 프레임 카운터 (반짝임 시간축)

    type Star = {
      x: number; y: number; r: number; depth: number;
      base: number; tw: number; phase: number; hub: boolean; bias: number;
    };
    let stars: Star[] = [];

    // 오른쪽 위가 조금 더 밝게
    let fx = 0;
    let fy = 0;
    let range = 1;

    const target = { x: 0, y: 0 };
    const off = { x: 0, y: 0 };
    let pointerInside = false;

    function seed() {
      const count = Math.round(Math.min(72, Math.max(24, (w * h) / 16000)));
      stars = Array.from({ length: count }, () => {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const d = Math.hypot(x - fx, y - fy) / range;
        const bias = Math.max(0.32, Math.min(1, 1 - d * 0.7));
        return {
          x,
          y,
          r: Math.random() * 1.2 + 0.5,
          depth: 0.4 + Math.random() * 0.6,
          base: 0.5 + Math.random() * 0.5,
          tw: 0.01 + Math.random() * 0.022, // 반짝임 속도
          phase: Math.random() * TAU,
          hub: Math.random() < 0.09,
          bias,
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
      fx = w * 0.85;
      fy = h * 0.16;
      range = Math.hypot(w, h);
      seed();
    }

    function draw(animate: boolean) {
      const tx = pointerInside ? target.x : 0;
      const ty = pointerInside ? target.y : 0;
      off.x += (tx - off.x) * 0.05;
      off.y += (ty - off.y) * 0.05;

      ctx!.clearRect(0, 0, w, h);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const rx = s.x + off.x * s.depth;
        const ry = s.y + off.y * s.depth;
        const twinkle = animate ? 0.5 + 0.5 * Math.sin(tk * s.tw + s.phase) : 0.7;
        const b = s.base * (0.28 + 0.72 * twinkle) * s.bias;
        if (b < 0.02) continue;

        const rad = s.hub ? s.r * 1.7 : s.r;
        const glow = rad * 3.2;
        const g = ctx!.createRadialGradient(rx, ry, 0, rx, ry, glow);
        g.addColorStop(0, s.hub ? `rgba(255,186,150,${0.5 * b})` : `rgba(255,246,242,${0.42 * b})`);
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(rx, ry, glow, 0, TAU);
        ctx!.fill();

        ctx!.fillStyle = s.hub ? `rgba(255,214,190,${b})` : `rgba(255,255,255,${b})`;
        ctx!.beginPath();
        ctx!.arc(rx, ry, rad, 0, TAU);
        ctx!.fill();
      }
    }

    function frame() {
      tk += 1;
      draw(true);
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
    draw(false); // 초기 정지 프레임

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
