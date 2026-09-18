"use client";

import React, { useEffect, useRef } from "react";

interface IndustryObj3D {
  name: string;
  x: number;
  y: number;
  z: number;
  color: string;
  type: "building" | "shopping_bag" | "cube" | "cross" | "cap" | "briefcase";
}

export default function Industries3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = ((e.clientX - rect.left) / width - 0.5) * 2;
      targetMouseY = ((e.clientY - rect.top) / height - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);

    const industries: IndustryObj3D[] = [
      { name: "Tech & SaaS", x: -220, y: -70, z: 100, color: "#0d60c4", type: "cube" },
      { name: "E-Commerce", x: -70, y: -90, z: 120, color: "#00a651", type: "shopping_bag" },
      { name: "Real Estate", x: 80, y: -70, z: 110, color: "#0d60c4", type: "building" },
      { name: "Healthcare", x: -220, y: 70, z: 80, color: "#00a651", type: "cross" },
      { name: "Education", x: -70, y: 90, z: 100, color: "#0d60c4", type: "cap" },
      { name: "Services", x: 80, y: 70, z: 90, color: "#00a651", type: "briefcase" },
    ];

    const focalLength = 360;

    const project = (x: number, y: number, z: number) => {
      const scale = focalLength / (focalLength + z + 150);
      return {
        x: x * scale + width / 2,
        y: y * scale + height / 2,
        scale,
      };
    };

    let time = 0;

    const render = () => {
      time += 0.015;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const offsetX = mouseX * 25;
      const offsetY = mouseY * 20;

      industries.forEach((ind, idx) => {
        const floatY = ind.y + Math.sin(time * 1.5 + idx) * 8;
        const proj = project(ind.x - offsetX, floatY - offsetY, ind.z);

        if (proj.scale > 0) {
          ctx.save();
          ctx.translate(proj.x, proj.y);

          // 3D Geometric Icon Graphic
          ctx.strokeStyle = ind.color;
          ctx.fillStyle = "rgba(7, 26, 61, 0.85)";
          ctx.lineWidth = 1.8;
          ctx.shadowBlur = 15;
          ctx.shadowColor = ind.color;

          const size = 26 * proj.scale;

          if (ind.type === "cube") {
            ctx.beginPath();
            ctx.rect(-size / 2, -size / 2, size, size);
            ctx.fill();
            ctx.stroke();
          } else if (ind.type === "cross") {
            ctx.beginPath();
            ctx.rect(-size / 6, -size / 2, size / 3, size);
            ctx.rect(-size / 2, -size / 6, size, size / 3);
            ctx.fill();
            ctx.stroke();
          } else {
            ctx.beginPath();
            ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          }

          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
