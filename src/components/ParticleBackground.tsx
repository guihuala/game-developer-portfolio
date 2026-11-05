import React, { useEffect, useRef } from 'react';
import { useSettings } from '../context/SettingsContext';

interface Petal {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  angle: number;
  spin: number;
  opacity: number;
  color: string;
  life: number;
}

const COLORS = ['#FFD54F', '#FFCA28', '#FFC107', '#FFE082', '#FFF9C4'];
const BURST_CAPACITY = 16;
const BURST_LIFETIME = 700;

export const ParticleBackground: React.FC = () => {
  const { isLateNightMode } = useSettings();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let frame = 0;
    let previous = 0;
    let lastBurst = -Infinity;
    let burstCursor = 0;
    let ambient: Petal[] = [];
    const pointer = { x: -1000, y: -1000 };
    const create = (): Petal => ({ x: 0, y: 0, vx: 0, vy: 0, size: 2 + Math.random() * 4, angle: Math.random() * Math.PI * 2, spin: (Math.random() - .5) * .04, opacity: .35 + Math.random() * .4, color: COLORS[Math.floor(Math.random() * COLORS.length)], life: 0 });
    // Reuse a fixed pool. Clicks never increase the amount of drawing work.
    const bursts = Array.from({ length: BURST_CAPACITY }, create);
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const scale = Math.min(1, 1600 / width);
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      const count = Math.min(isLateNightMode ? 40 : 28, Math.floor(width * height / 42000));
      ambient = Array.from({ length: count }, () => ({ ...create(), x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - .5) * .5, vy: .4 + Math.random() * .7 }));
    };
    const draw = (petal: Petal, fade = 1) => {
      ctx.globalAlpha = petal.opacity * fade;
      ctx.fillStyle = petal.color;
      ctx.beginPath();
      // Ellipse rotation avoids save/translate/rotate/restore for every petal.
      ctx.ellipse(petal.x, petal.y, petal.size * 1.5, petal.size, petal.angle, 0, Math.PI * 2);
      ctx.fill();
    };
    const update = (time: number) => {
      frame = requestAnimationFrame(update);
      if (time - previous < 1000 / 30) return;
      const elapsed = previous ? Math.min(time - previous, 64) : 33;
      const step = elapsed / 33;
      previous = time;
      ctx.clearRect(0, 0, width, height);
      for (const petal of ambient) {
        const dx = petal.x - pointer.x;
        const dy = petal.y - pointer.y;
        const distanceSquared = dx * dx + dy * dy;
        if (distanceSquared > 1 && distanceSquared < 6400) {
          petal.vx += dx * .0003 * step;
        }
        petal.vx *= Math.pow(.98, step);
        petal.x += (petal.vx + .15) * step;
        petal.y += petal.vy * step;
        petal.angle += petal.spin * step;
        if (petal.y > height + 12) { petal.y = -12; petal.x = Math.random() * width; }
        if (petal.x > width + 12) petal.x = -12;
        if (petal.x < -12) petal.x = width + 12;
        draw(petal);
      }
      for (const petal of bursts) {
        if (petal.life <= 0) continue;
        petal.life = Math.max(0, petal.life - elapsed);
        petal.x += petal.vx * step;
        petal.y += petal.vy * step;
        petal.vx *= Math.pow(.9, step);
        petal.vy = petal.vy * Math.pow(.9, step) + .08 * step;
        petal.angle += petal.spin * step;
        draw(petal, petal.life / BURST_LIFETIME);
      }
    };
    const move = (event: PointerEvent) => { pointer.x = event.clientX; pointer.y = event.clientY; };
    const leave = () => { pointer.x = -1000; pointer.y = -1000; };
    const burst = (event: MouseEvent) => {
      const target = event.target;
      // Navigation, dialogs and model dragging should not trigger extra work.
      if (target instanceof Element && target.closest('a, button, input, select, textarea, dialog, canvas')) return;
      const time = performance.now();
      if (motion.matches || document.hidden || time - lastBurst < 120) return;
      lastBurst = time;
      for (let i = 0; i < 4; i++) {
        const petal = bursts[burstCursor];
        burstCursor = (burstCursor + 1) % BURST_CAPACITY;
        petal.x = event.clientX;
        petal.y = event.clientY;
        petal.vx = (Math.random() - .5) * 7;
        petal.vy = (Math.random() - .6) * 7;
        petal.life = BURST_LIFETIME;
      }
    };
    const resume = () => {
      cancelAnimationFrame(frame);
      ctx.clearRect(0, 0, width, height);
      bursts.forEach((petal) => { petal.life = 0; });
      if (!document.hidden && !motion.matches) { previous = 0; frame = requestAnimationFrame(update); }
    };
    resize();
    resume();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    window.addEventListener('click', burst);
    document.addEventListener('visibilitychange', resume);
    motion.addEventListener('change', resume);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
      window.removeEventListener('click', burst);
      document.removeEventListener('visibilitychange', resume);
      motion.removeEventListener('change', resume);
    };
  }, [isLateNightMode]);

  return <canvas ref={canvasRef} aria-hidden="true" className="fixed inset-0 pointer-events-none z-0" />;
};
