"use client";

import React, { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
}

export default function BubbleEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000, active: false };

    // Brand Colors mapped
    const colors = [
      "rgba(13, 96, 196, ", // Brand Blue
      "rgba(0, 166, 81, ",  // Brand Green
    ];

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const width = canvas.width;
      const height = canvas.height;

      // Adjust particle count based on screen width for performance
      const isMobile = width < 768;
      const particleCount = isMobile ? 6 : 18;

      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 80 + 30; // 30px to 110px
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          vx: (Math.random() - 0.5) * 0.3, // slow drift
          vy: -(Math.random() * 0.4 + 0.1), // upward drift
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.05 + 0.02, // extremely subtle (2% to 7% opacity)
        });
      }
    };

    // Listen to parent element resize
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    resizeCanvas();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Upward movement
        p.y += p.vy;
        p.x += p.vx;

        // Reset particle if it floats off screen top
        if (p.y + p.size < 0) {
          p.y = canvas.height + p.size;
          p.x = Math.random() * canvas.width;
        }
        // Bound X
        if (p.x - p.size > canvas.width) {
          p.x = -p.size;
        } else if (p.x + p.size < 0) {
          p.x = canvas.width + p.size;
        }

        // Subtly react to mouse coordinates (Push away drift)
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const limitDist = 200; // Activation distance

          if (dist < limitDist) {
            const force = (limitDist - dist) / limitDist;
            p.x += (dx / dist) * force * 1.5;
            p.y += (dy / dist) * force * 1.5;
          }
        }

        // Render circular bubble with soft blur
        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        grad.addColorStop(0, `${p.color}${p.alpha})`);
        grad.addColorStop(0.8, `${p.color}${p.alpha * 0.4})`);
        grad.addColorStop(1, `${p.color}0)`);

        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Mouse Move listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-70 dark:opacity-80 mix-blend-screen dark:mix-blend-normal"
    />
  );
}
