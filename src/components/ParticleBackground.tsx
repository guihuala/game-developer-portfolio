import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  angle: number;
  spin: number;
  color: string;
  opacity: number;
}

import { useSettings } from '../context/SettingsContext';

export const ParticleBackground: React.FC = () => {
  const { isLateNightMode } = useSettings();
  const intensity = isLateNightMode ? 'high' : 'low';
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const createParticle = (x?: number, y?: number): Particle => {
      // Osmanthus colors: soft yellows, light oranges, warm whites
      const colors = ['#FFD54F', '#FFCA28', '#FFC107', '#FFE082', '#FFF9C4'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      return {
        x: x !== undefined ? x : Math.random() * canvas.width,
        y: y !== undefined ? y : Math.random() * canvas.height,
        size: Math.random() * 4 + 2,
        speedX: (Math.random() - 0.5) * 1.5,
        speedY: Math.random() * 1.5 + 0.5, // Falling down gently
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.05,
        color,
        opacity: Math.random() * 0.6 + 0.4,
      };
    };

    const initParticles = () => {
      particles = [];
      
      const divisor = intensity === 'high' ? 12000 : 36000;
      const numParticles = Math.floor((window.innerWidth * window.innerHeight) / divisor);
      for (let i = 0; i < numParticles; i++) {
        particles.push(createParticle());
      }
    };

    const drawPetal = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      
      // Soft shadow for a cute, floating look
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color;

      ctx.beginPath();
      // Draw a cute, plump petal shape
      ctx.ellipse(0, 0, p.size * 1.5, p.size, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse interaction (gentle push)
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.speedX -= (dx / dist) * force * 0.8;
          p.speedY -= (dy / dist) * force * 0.8;
        }

        p.x += p.speedX;
        p.y += p.speedY;
        p.angle += p.spin;

        // Add some wind/drift
        p.speedX += (Math.random() - 0.5) * 0.1;
        // Dampen speed back to normal
        p.speedX *= 0.95;
        if (p.speedY < 0.5) p.speedY += 0.05;
        if (p.speedY > 2.5) p.speedY *= 0.95;

        // Wrap around
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
          p.speedX = (Math.random() - 0.5) * 1.5;
        }
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.x < -20) p.x = canvas.width + 20;

        drawPetal(p);
      }

      animationFrameId = requestAnimationFrame(update);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const handleMouseClick = (e: MouseEvent) => {
      
      const burstCount = intensity === 'high' ? 15 : 5;
      // Burst of petals on click!
      for (let i = 0; i < burstCount; i++) {
        const p = createParticle(e.clientX, e.clientY);
        p.speedX = (Math.random() - 0.5) * 15;
        p.speedY = (Math.random() - 0.5) * 15;
        particles.push(p);
      }
      
      const maxParticles = intensity === 'high' ? 200 : 80;
      // Keep particle count somewhat stable by removing old ones if there are too many
      if (particles.length > maxParticles) {
        particles.splice(0, burstCount);
      }
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleMouseClick);
    
    resize();
    update();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleMouseClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
      style={{ background: 'transparent', opacity: 1 }}
    />
  );
};
