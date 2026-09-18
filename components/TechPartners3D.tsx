"use client";

import React, { useEffect, useRef } from "react";

interface SoftwareNode3D {
  name: string;
  type: string;
  x: number;
  y: number;
  z: number;
  color: string;
}

export default function TechPartners3D() {
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

    const platforms: SoftwareNode3D[] = [
      { name: "Meta Ads CAPI", type: "Ad Server", x: -170, y: -70, z: 90, color: "#0d60c4" },
      { name: "Google Cloud / Ads", type: "Cloud API", x: 170, y: -70, z: 90, color: "#00a651" },
      { name: "IT Integration Core", type: "Gateway Server", x: 0, y: 0, z: 140, color: "#ffffff" },
      { name: "WhatsApp API Node", type: "Messaging Node", x: -150, y: 80, z: 100, color: "#00a651" },
      { name: "n8n Workflows", type: "Automation Hub", x: 150, y: 80, z: 100, color: "#0d60c4" },
      { name: "OpenAI GPT-4o", type: "Neural AI Model", x: 0, y: -125, z: 110, color: "#00a651" },
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

      const projected = platforms.map((p) => {
        const floatY = p.y + Math.sin(time * 2 + p.x) * 6;
        const proj = project(p.x - offsetX, floatY - offsetY, p.z);
        return { ...p, projX: proj.x, projY: proj.y, scale: proj.scale };
      });

      const hub = projected[2]; // Gateway Server

      // Render 3D Pipeline Conduits & Real-Time Data Streams
      ctx.save();
      ctx.lineWidth = 2.2;
      projected.forEach((spoke, idx) => {
        if (idx === 2) return;

        ctx.beginPath();
        ctx.moveTo(spoke.projX, spoke.projY);
        ctx.lineTo(hub.projX, hub.projY);
        ctx.strokeStyle = `rgba(13, 96, 196, 0.5)`;
        ctx.stroke();

        // Pulsing Data Packets
        const progress = (time * 0.9 + idx * 0.25) % 1;
        const packetX = spoke.projX + (hub.projX - spoke.projX) * progress;
        const packetY = spoke.projY + (hub.projY - spoke.projY) * progress;

        ctx.beginPath();
        ctx.arc(packetX, packetY, 5 * spoke.scale, 0, Math.PI * 2);
        ctx.fillStyle = spoke.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = spoke.color;
        ctx.fill();
      });
      ctx.restore();

      // Render 3D Platform Server Badges
      projected.forEach((p) => {
        ctx.save();
        ctx.translate(p.projX, p.projY);

        const isHub = p.name.includes("Core");
        const w = (isHub ? 175 : 140) * p.scale;
        const h = (isHub ? 48 : 38) * p.scale;

        ctx.fillStyle = isHub ? "rgba(13, 96, 196, 0.95)" : "rgba(7, 26, 61, 0.92)";
        ctx.strokeStyle = p.color;
        ctx.lineWidth = isHub ? 2.5 : 1.6;
        ctx.shadowBlur = 18;
        ctx.shadowColor = p.color;

        ctx.beginPath();
        ctx.roundRect(-w / 2, -h / 2, w, h, 8 * p.scale);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#ffffff";
        ctx.font = `bold ${Math.max(9, (isHub ? 11 : 9.5) * p.scale)}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.name, 0, -4 * p.scale);

        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.font = `${Math.max(7, 8.5 * p.scale)}px sans-serif`;
        ctx.fillText(p.type, 0, 8 * p.scale);

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
