"use client";

import React, { useEffect, useRef } from "react";

export default function Hero3D() {
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

    const focalLength = 400;
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

      const offsetX = mouseX * 35;
      const offsetY = mouseY * 25;
      const rotY = mouseX * 0.25;

      // ----------------------------------------------------
      // 1. Render 3D IT Developer Laptop (Right Hero Stage)
      // ----------------------------------------------------
      const lapX = width * 0.26 - offsetX;
      const lapY = -height * 0.05 - offsetY + Math.sin(time) * 6;
      const lapZ = 160;

      // Laptop Base
      const baseVerts = [
        { x: -110, y: 40, z: -70 },
        { x: 110, y: 40, z: -70 },
        { x: 100, y: 40, z: 70 },
        { x: -100, y: 40, z: 70 },
      ];

      const projBase = baseVerts.map((v) => {
        const rx = v.x * Math.cos(rotY) + v.z * Math.sin(rotY);
        const rz = -v.x * Math.sin(rotY) + v.z * Math.cos(rotY);
        return project(rx + lapX, v.y + lapY, rz + lapZ);
      });

      ctx.save();
      ctx.fillStyle = "rgba(7, 26, 61, 0.95)";
      ctx.strokeStyle = "#00a651";
      ctx.lineWidth = 1.8;
      ctx.shadowBlur = 18;
      ctx.shadowColor = "#00a651";

      ctx.beginPath();
      ctx.moveTo(projBase[0].x, projBase[0].y);
      ctx.lineTo(projBase[1].x, projBase[1].y);
      ctx.lineTo(projBase[2].x, projBase[2].y);
      ctx.lineTo(projBase[3].x, projBase[3].y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Keyboard Trackpad Detail
      ctx.strokeStyle = "rgba(13, 96, 196, 0.8)";
      ctx.lineWidth = 1.2;
      const padCenter = project(lapX, 40 + lapY, 30 + lapZ);
      ctx.strokeRect(padCenter.x - 20 * padCenter.scale, padCenter.y - 8 * padCenter.scale, 40 * padCenter.scale, 16 * padCenter.scale);

      // Laptop Display Screen (Angled 3D Lid)
      const screenVerts = [
        { x: -105, y: 40, z: -68 },
        { x: 105, y: 40, z: -68 },
        { x: 105, y: -90, z: -90 },
        { x: -105, y: -90, z: -90 },
      ];

      const projScreen = screenVerts.map((v) => {
        const rx = v.x * Math.cos(rotY) + v.z * Math.sin(rotY);
        const rz = -v.x * Math.sin(rotY) + v.z * Math.cos(rotY);
        return project(rx + lapX, v.y + lapY, rz + lapZ);
      });

      ctx.fillStyle = "rgba(5, 12, 26, 0.98)";
      ctx.strokeStyle = "#0d60c4";
      ctx.lineWidth = 2;
      ctx.shadowBlur = 20;
      ctx.shadowColor = "#0d60c4";

      ctx.beginPath();
      ctx.moveTo(projScreen[0].x, projScreen[0].y);
      ctx.lineTo(projScreen[1].x, projScreen[1].y);
      ctx.lineTo(projScreen[2].x, projScreen[2].y);
      ctx.lineTo(projScreen[3].x, projScreen[3].y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Animated Code Syntax on Screen
      const codeLines = [
        "import { AIEngine } from '@tb/ai';",
        "const pipeline = new Pipeline({",
        "  metaCapi: true, roas: 3.8,",
        "  leads: 'automated_whatsapp'",
        "});",
        "await pipeline.scale();",
      ];

      const scrCenter = projScreen[3];
      ctx.fillStyle = "#00a651";
      ctx.font = `bold ${Math.max(7, 9 * scrCenter.scale)}px monospace`;
      ctx.textAlign = "left";

      codeLines.forEach((line, idx) => {
        const lineY = scrCenter.y + (idx * 13 + 18) * scrCenter.scale;
        const lineX = scrCenter.x + 12 * scrCenter.scale;
        ctx.fillText(line, lineX, lineY);
      });

      ctx.restore();

      // ----------------------------------------------------
      // 2. Render 3D Cloud Server Rack Blades (Left Stage)
      // ----------------------------------------------------
      const srvX = -width * 0.28 - offsetX;
      const srvY = -height * 0.1 - offsetY + Math.cos(time * 0.8) * 8;
      const srvZ = 180;

      for (let i = 0; i < 3; i++) {
        const bladeY = srvY + i * 36 - 40;
        const p = project(srvX, bladeY, srvZ);

        ctx.save();
        ctx.translate(p.x, p.y);

        const bw = 130 * p.scale;
        const bh = 28 * p.scale;

        ctx.fillStyle = "rgba(7, 26, 61, 0.95)";
        ctx.strokeStyle = i === 1 ? "#00a651" : "#0d60c4";
        ctx.lineWidth = 1.6;
        ctx.shadowBlur = 14;
        ctx.shadowColor = i === 1 ? "#00a651" : "#0d60c4";

        ctx.beginPath();
        ctx.roundRect(-bw / 2, -bh / 2, bw, bh, 6 * p.scale);
        ctx.fill();
        ctx.stroke();

        // Server LED Status Lights
        for (let led = 0; led < 4; led++) {
          ctx.beginPath();
          ctx.arc((-bw / 2 + 16 + led * 14) * p.scale, 0, 3 * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = (time * 5 + led) % 2 > 1 ? "#00a651" : "#0d60c4";
          ctx.shadowBlur = 8;
          ctx.shadowColor = ctx.fillStyle;
          ctx.fill();
        }

        // Server Label
        ctx.fillStyle = "#ffffff";
        ctx.font = `bold ${Math.max(8, 10 * p.scale)}px sans-serif`;
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillText(`SERVER_0${i + 1} [OK]`, bw / 2 - 10 * p.scale, 0);

        ctx.restore();
      }

      // ----------------------------------------------------
      // 3. Render Glowing Fiber Optic Pipelines Connecting Nodes
      // ----------------------------------------------------
      const srvProj = project(srvX + 60, srvY, srvZ);
      const lapProj = project(lapX - 60, lapY, lapZ);

      ctx.save();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(0, 166, 81, 0.6)";
      ctx.shadowBlur = 12;
      ctx.shadowColor = "#00a651";

      ctx.beginPath();
      ctx.moveTo(srvProj.x, srvProj.y);
      ctx.bezierCurveTo(
        (srvProj.x + lapProj.x) / 2,
        srvProj.y - 60,
        (srvProj.x + lapProj.x) / 2,
        lapProj.y + 60,
        lapProj.x,
        lapProj.y
      );
      ctx.stroke();

      // Moving Data Packets along Fiber Line
      const pktProgress = (time * 0.8) % 1;
      const pktX = srvProj.x + (lapProj.x - srvProj.x) * pktProgress;
      const pktY = srvProj.y + (lapProj.y - srvProj.y) * pktProgress;

      ctx.beginPath();
      ctx.arc(pktX, pktY, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.shadowBlur = 16;
      ctx.shadowColor = "#ffffff";
      ctx.fill();
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
