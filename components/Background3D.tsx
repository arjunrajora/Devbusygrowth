"use client";

import React, { useEffect, useRef } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface DataWispParticle {
  angle: number;
  radius: number;
  y: number;
  speedAngle: number;
  speedY: number;
  size: number;
  alpha: number;
  color: string;
}

interface KeywordNode3D {
  text: string;
  angle: number;
  radius: number;
  y: number;
  speedAngle: number;
  speedY: number;
  size: number;
  color: string;
  alpha: number;
}

export default function Background3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // High DPR Scaling
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Mouse & Touch Tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    // Scroll Tracking
    let targetScrollPercent = 0;
    let scrollPercent = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / width - 0.5) * 2;
      targetMouseY = (e.clientY / height - 0.5) * 2;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetMouseX = (e.touches[0].clientX / width - 0.5) * 2;
        targetMouseY = (e.touches[0].clientY / height - 0.5) * 2;
      }
    };

    const handleScroll = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      targetScrollPercent = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // ----------------------------------------------------
    // Keywords & Translucent Data Wisps Setup
    // ----------------------------------------------------
    const keywordList = [
      "Google", "Connect", "Data", "Explore", "Connection",
      "Google", "Connect", "Data", "Explore", "Connection",
      "AI Nodes", "ROAS Engine", "Performance", "Growth",
    ];

    const keywords: KeywordNode3D[] = keywordList.map((text, idx) => ({
      text,
      angle: (idx / keywordList.length) * Math.PI * 2 + Math.random() * 0.5,
      radius: 180 + (idx % 3) * 70,
      y: (Math.random() - 0.5) * height * 0.8,
      speedAngle: 0.003 + (idx % 2) * 0.002,
      speedY: (Math.random() - 0.5) * 0.4,
      size: 11 + (idx % 4) * 2,
      color: idx % 3 === 0 ? "13, 96, 196" : idx % 3 === 1 ? "0, 166, 81" : "255, 255, 255",
      alpha: 0.45 + (idx % 3) * 0.2,
    }));

    // Particle Wisp Stream Particles
    const wispCount = prefersReducedMotion ? 35 : 90;
    const wisps: DataWispParticle[] = [];

    for (let i = 0; i < wispCount; i++) {
      wisps.push({
        angle: Math.random() * Math.PI * 2,
        radius: 140 + Math.random() * 260,
        y: (Math.random() - 0.5) * height * 1.2,
        speedAngle: 0.004 + Math.random() * 0.006,
        speedY: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 2.5 + 1,
        alpha: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.4 ? "13, 96, 196" : "0, 166, 81",
      });
    }

    // 3D Projection Math
    const focalLength = 380;
    const project = (p: Point3D) => {
      const scale = focalLength / (focalLength + p.z + 200);
      return {
        x: p.x * scale + width / 2,
        y: p.y * scale + height / 2,
        scale,
      };
    };

    const rotateX = (p: Point3D, angle: number): Point3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return { x: p.x, y: p.y * cos - p.z * sin, z: p.y * sin + p.z * cos };
    };

    const rotateY = (p: Point3D, angle: number): Point3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return { x: p.x * cos + p.z * sin, y: p.y, z: -p.x * sin + p.z * cos };
    };

    let time = 0;

    // ----------------------------------------------------
    // Main Render Loop
    // ----------------------------------------------------
    const render = () => {
      time += 0.012;

      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;
      scrollPercent += (targetScrollPercent - scrollPercent) * 0.04;

      ctx.clearRect(0, 0, width, height);

      const offsetX = mouseX * 40;
      const offsetY = mouseY * 30 + scrollPercent * 100;
      const rotY = time * 0.15 + scrollPercent * Math.PI * 2;
      const rotX = 0.2 + mouseY * 0.2;

      // 1. Render 3D Digital Matrix City Grid Floor
      ctx.save();
      ctx.strokeStyle = "rgba(13, 96, 196, 0.12)";
      ctx.lineWidth = 1;

      const gridLines = 16;
      const gridSpacing = 80;
      const gridY = height * 0.45;

      for (let i = -gridLines; i <= gridLines; i++) {
        // Parallel lines going into Z depth
        const p1 = project(rotateY(rotateX({ x: i * gridSpacing, y: gridY, z: -400 }, rotX), rotY));
        const p2 = project(rotateY(rotateX({ x: i * gridSpacing, y: gridY, z: 400 }, rotX), rotY));

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
      ctx.restore();

      // 2. Render Floating Streams of Glowing Data Wisps
      const projWisps: { x: number; y: number; scale: number; alpha: number; color: string }[] = [];

      wisps.forEach((w) => {
        if (!prefersReducedMotion) {
          w.angle += w.speedAngle;
          w.y += w.speedY;

          if (w.y > height * 0.6) w.y = -height * 0.6;
          if (w.y < -height * 0.6) w.y = height * 0.6;
        }

        const rawPt: Point3D = {
          x: Math.cos(w.angle) * w.radius - offsetX,
          y: w.y - offsetY,
          z: Math.sin(w.angle) * w.radius,
        };

        const pt = rotateY(rotateX(rawPt, rotX), rotY);
        const proj = project(pt);

        if (proj.scale > 0) {
          projWisps.push({
            x: proj.x,
            y: proj.y,
            scale: proj.scale,
            alpha: w.alpha,
            color: w.color,
          });

          ctx.save();
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, w.size * proj.scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${w.color}, ${w.alpha * proj.scale})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = `rgba(${w.color}, 0.8)`;
          ctx.fill();
          ctx.restore();
        }
      });

      // Render Wisp Ribbon Trails
      ctx.save();
      ctx.lineWidth = 1.2;
      const wLen = projWisps.length;
      for (let i = 0; i < wLen; i++) {
        for (let j = i + 1; j < wLen; j++) {
          const w1 = projWisps[i];
          const w2 = projWisps[j];
          const dx = w1.x - w2.x;
          const dy = w1.y - w2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 85) {
            const alpha = (1 - dist / 85) * 0.22 * w1.alpha;
            ctx.beginPath();
            ctx.moveTo(w1.x, w1.y);
            ctx.lineTo(w2.x, w2.y);
            ctx.strokeStyle = `rgba(${w1.color}, ${alpha})`;
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      // 3. Render Floating Translucent Keywords ('Google', 'Connect', 'Data', 'Explore', 'Connection')
      keywords.forEach((kw) => {
        if (!prefersReducedMotion) {
          kw.angle += kw.speedAngle;
          kw.y += kw.speedY;

          if (kw.y > height * 0.5) kw.y = -height * 0.5;
          if (kw.y < -height * 0.5) kw.y = height * 0.5;
        }

        const rawPt: Point3D = {
          x: Math.cos(kw.angle) * kw.radius - offsetX,
          y: kw.y - offsetY,
          z: Math.sin(kw.angle) * kw.radius,
        };

        const pt = rotateY(rotateX(rawPt, rotX), rotY);
        const proj = project(pt);

        if (proj.scale > 0) {
          ctx.save();
          ctx.translate(proj.x, proj.y);

          // Translucent Glow Aura behind text
          ctx.fillStyle = `rgba(${kw.color}, ${kw.alpha * 0.18 * proj.scale})`;
          ctx.shadowBlur = 20;
          ctx.shadowColor = `rgba(${kw.color}, 0.9)`;

          const fontSize = Math.max(9, kw.size * proj.scale);
          ctx.font = `bold ${fontSize}px sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          // Text Glow & Fill
          ctx.fillStyle = `rgba(${kw.color}, ${kw.alpha * proj.scale})`;
          ctx.fillText(kw.text, 0, 0);

          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 h-full w-full pointer-events-none -z-40"
      aria-hidden="true"
    />
  );
}
