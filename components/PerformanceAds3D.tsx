"use client";

import React, { useEffect, useRef } from "react";

export default function PerformanceAds3D() {
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

    const focalLength = 380;

    const project = (x: number, y: number, z: number) => {
      const scale = focalLength / (focalLength + z + 180);
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

      const rotY = mouseX * 0.25;

      // ----------------------------------------------------
      // 1. Floating 3D Main Analytics Monitor Screen
      // ----------------------------------------------------
      const monX = width * 0.25 - mouseX * 30;
      const monY = -height * 0.05 - mouseY * 20 + Math.sin(time) * 6;
      const monZ = 160;

      const pMon = project(monX, monY, monZ);

      ctx.save();
      ctx.translate(pMon.x, pMon.y);

      const mw = 220 * pMon.scale;
      const mh = 130 * pMon.scale;

      // Monitor Screen Frame
      ctx.fillStyle = "rgba(5, 12, 26, 0.98)";
      ctx.strokeStyle = "#00a651";
      ctx.lineWidth = 2;
      ctx.shadowBlur = 22;
      ctx.shadowColor = "#00a651";

      ctx.beginPath();
      ctx.roundRect(-mw / 2, -mh / 2, mw, mh, 10 * pMon.scale);
      ctx.fill();
      ctx.stroke();

      // Live 3D Growth Trend Waveform Graph inside Monitor
      ctx.beginPath();
      ctx.strokeStyle = "#00a651";
      ctx.lineWidth = 2 * pMon.scale;
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#00a651";

      const points = 8;
      for (let i = 0; i < points; i++) {
        const gx = -mw / 2 + 15 + (i / (points - 1)) * (mw - 30);
        const gy = 15 - Math.sin(time * 3 + i * 0.8) * 20 * pMon.scale;
        if (i === 0) ctx.moveTo(gx, gy);
        else ctx.lineTo(gx, gy);
      }
      ctx.stroke();

      // Monitor Screen Header Text
      ctx.fillStyle = "#ffffff";
      ctx.font = `bold ${Math.max(9, 11 * pMon.scale)}px sans-serif`;
      ctx.textAlign = "left";
      ctx.fillText("LIVE REVENUE & ROAS DASHBOARD", -mw / 2 + 15, -mh / 2 + 20);

      ctx.fillStyle = "#00a651";
      ctx.font = `bold ${Math.max(8, 10 * pMon.scale)}px sans-serif`;
      ctx.fillText("AVG ROAS: 3.8x | SPEND: ₹1Cr+", -mw / 2 + 15, -mh / 2 + 38);

      ctx.restore();

      // ----------------------------------------------------
      // 2. Secondary 3D Metric Badge Nodes
      // ----------------------------------------------------
      const kpis = [
        { text: "Meta CAPI: 100% Sync", x: -width * 0.26, y: height * 0.1, color: "#0d60c4" },
        { text: "Google Ads ROAS: 4.2x", x: -width * 0.2, y: -height * 0.15, color: "#00a651" },
      ];

      kpis.forEach((kpi) => {
        const pKpi = project(kpi.x - mouseX * 25, kpi.y - mouseY * 20, 140);
        ctx.save();
        ctx.translate(pKpi.x, pKpi.y);

        const kw = 150 * pKpi.scale;
        const kh = 36 * pKpi.scale;

        ctx.fillStyle = "rgba(7, 26, 61, 0.95)";
        ctx.strokeStyle = kpi.color;
        ctx.lineWidth = 1.6;
        ctx.shadowBlur = 14;
        ctx.shadowColor = kpi.color;

        ctx.beginPath();
        ctx.roundRect(-kw / 2, -kh / 2, kw, kh, 8 * pKpi.scale);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#ffffff";
        ctx.font = `bold ${Math.max(8, 10 * pKpi.scale)}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(kpi.text, 0, 0);

        ctx.restore();
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
