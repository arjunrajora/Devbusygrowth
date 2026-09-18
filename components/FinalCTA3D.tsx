"use client";

import React, { useEffect, useRef } from "react";

export default function FinalCTA3D() {
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
      time += 0.02;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const rotY = mouseX * 0.35;
      const rotX = mouseY * 0.2;

      // 3D Master Command Monitor Centerpiece
      const monZ = 160;
      const pMon = project(mouseX * 20, Math.sin(time) * 6, monZ);

      ctx.save();
      ctx.translate(pMon.x, pMon.y);

      const mw = 260 * pMon.scale;
      const mh = 140 * pMon.scale;

      ctx.fillStyle = "rgba(5, 12, 26, 0.96)";
      ctx.strokeStyle = "#00a651";
      ctx.lineWidth = 2.2;
      ctx.shadowBlur = 25;
      ctx.shadowColor = "#00a651";

      ctx.beginPath();
      ctx.roundRect(-mw / 2, -mh / 2, mw, mh, 12 * pMon.scale);
      ctx.fill();
      ctx.stroke();

      // Screen Header & AI Code
      ctx.fillStyle = "#ffffff";
      ctx.font = `bold ${Math.max(10, 12 * pMon.scale)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("READY TO SCALE YOUR DIGITAL INFRASTRUCTURE?", 0, -mh / 2 + 25);

      ctx.fillStyle = "#00a651";
      ctx.font = `bold ${Math.max(8, 10 * pMon.scale)}px monospace`;
      ctx.fillText("status: 200 OK | capi_nodes: active | roas: 3.8x", 0, -mh / 2 + 45);

      ctx.restore();

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
