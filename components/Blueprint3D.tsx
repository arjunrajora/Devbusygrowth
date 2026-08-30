"use client";

import React, { useEffect, useRef } from "react";

interface ServiceNode3D {
  title: string;
  sub: string;
  type: "server" | "db" | "shield" | "api" | "ai" | "analytics";
  x: number;
  y: number;
  z: number;
  color: string;
}

export default function Blueprint3D() {
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

    // 6 Real IT Service Infrastructure Nodes
    const services: ServiceNode3D[] = [
      { title: "Cloud Infra", sub: "Server Blades & K8s", type: "server", x: -200, y: -90, z: 90, color: "#0d60c4" },
      { title: "Database Cluster", sub: "Postgres & Redis", type: "db", x: 0, y: -130, z: 120, color: "#00a651" },
      { title: "Cybersecurity", sub: "SSL / Auth Vault", type: "shield", x: 200, y: -90, z: 90, color: "#0d60c4" },
      { title: "REST / GraphQL API", sub: "n8n Webhook Node", type: "api", x: -200, y: 90, z: 110, color: "#00a651" },
      { title: "AI Neural Brain", sub: "OpenAI GPT-4o Agent", type: "ai", x: 0, y: 130, z: 150, color: "#0d60c4" },
      { title: "Analytics Monitor", sub: "CAPI & ROAS Gauges", type: "analytics", x: 200, y: 90, z: 70, color: "#00a651" },
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

      const offsetX = mouseX * 30;
      const offsetY = mouseY * 25;

      const projected = services.map((s, idx) => {
        const floatY = s.y + Math.sin(time * 1.5 + idx) * 8;
        const proj = project(s.x - offsetX, floatY - offsetY, s.z);
        return { ...s, projX: proj.x, projY: proj.y, scale: proj.scale };
      });

      // Render 3D Pipeline Connection Conduits
      ctx.save();
      ctx.lineWidth = 1.8;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const n1 = projected[i];
          const n2 = projected[j];

          const dx = n1.projX - n2.projX;
          const dy = n1.projY - n2.projY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 260) {
            ctx.beginPath();
            ctx.moveTo(n1.projX, n1.projY);
            ctx.lineTo(n2.projX, n2.projY);
            ctx.strokeStyle = `rgba(13, 96, 196, ${0.4 * (1 - dist / 260)})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#0d60c4";
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      // Render 3D IT Service Modules
      projected.forEach((node) => {
        ctx.save();
        ctx.translate(node.projX, node.projY);

        const w = 135 * node.scale;
        const h = 55 * node.scale;

        // Container Module
        ctx.fillStyle = "rgba(7, 26, 61, 0.95)";
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 1.8;
        ctx.shadowBlur = 16;
        ctx.shadowColor = node.color;

        ctx.beginPath();
        ctx.roundRect(-w / 2, -h / 2, w, h, 8 * node.scale);
        ctx.fill();
        ctx.stroke();

        // 3D IT Object Graphic Icon (Left side)
        const iconX = -w / 2 + 18 * node.scale;

        if (node.type === "db") {
          // 3D Database Cylinder
          ctx.beginPath();
          ctx.ellipse(iconX, -6 * node.scale, 8 * node.scale, 3 * node.scale, 0, 0, Math.PI * 2);
          ctx.ellipse(iconX, 0, 8 * node.scale, 3 * node.scale, 0, 0, Math.PI * 2);
          ctx.ellipse(iconX, 6 * node.scale, 8 * node.scale, 3 * node.scale, 0, 0, Math.PI * 2);
          ctx.strokeStyle = "#00a651";
          ctx.stroke();
        } else if (node.type === "shield") {
          // 3D Security Shield
          ctx.beginPath();
          ctx.moveTo(iconX, -8 * node.scale);
          ctx.lineTo(iconX + 6 * node.scale, -4 * node.scale);
          ctx.lineTo(iconX, 8 * node.scale);
          ctx.lineTo(iconX - 6 * node.scale, -4 * node.scale);
          ctx.closePath();
          ctx.strokeStyle = "#0d60c4";
          ctx.stroke();
        } else {
          // Status LED Pulse
          ctx.beginPath();
          ctx.arc(iconX, 0, 4 * node.scale, 0, Math.PI * 2);
          ctx.fillStyle = node.color;
          ctx.fill();
        }

        // Module Text Labels
        ctx.fillStyle = "#ffffff";
        ctx.font = `bold ${Math.max(9, 11 * node.scale)}px sans-serif`;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(node.title, -w / 2 + 32 * node.scale, -6 * node.scale);

        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.font = `${Math.max(7, 9 * node.scale)}px sans-serif`;
        ctx.fillText(node.sub, -w / 2 + 32 * node.scale, 8 * node.scale);

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
