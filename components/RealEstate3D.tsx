"use client";

import React, { useEffect, useRef } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Edge3D {
  from: number;
  to: number;
}

export default function RealEstate3D() {
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

    // 3D Architectural House / Tower Wireframe Vertices
    const rawVertices: Point3D[] = [
      // Base Box
      { x: -90, y: 70, z: -70 },
      { x: 90, y: 70, z: -70 },
      { x: 90, y: 70, z: 70 },
      { x: -90, y: 70, z: 70 },
      { x: -90, y: -40, z: -70 },
      { x: 90, y: -40, z: -70 },
      { x: 90, y: -40, z: 70 },
      { x: -90, y: -40, z: 70 },
      // Roof Apex
      { x: 0, y: -110, z: 0 },
      // Inner Floors
      { x: -90, y: 15, z: -70 },
      { x: 90, y: 15, z: -70 },
      { x: 90, y: 15, z: 70 },
      { x: -90, y: 15, z: 70 },
    ];

    const edges: Edge3D[] = [
      // Outer cube
      { from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 0 },
      { from: 4, to: 5 }, { from: 5, to: 6 }, { from: 6, to: 7 }, { from: 7, to: 4 },
      { from: 0, to: 4 }, { from: 1, to: 5 }, { from: 2, to: 6 }, { from: 3, to: 7 },
      // Roof
      { from: 4, to: 8 }, { from: 5, to: 8 }, { from: 6, to: 8 }, { from: 7, to: 8 },
      // Floor divider
      { from: 9, to: 10 }, { from: 10, to: 11 }, { from: 11, to: 12 }, { from: 12, to: 9 },
    ];

    // Floating 3D Location Marker Pins
    const pins = [
      { x: -110, y: -60, z: 90, label: "Jaipur Prime" },
      { x: 120, y: -30, z: -50, label: "Verified Buyer" },
      { x: 30, y: -130, z: 40, label: "Lead Node" },
    ];

    const focalLength = 360;

    const project = (p: Point3D) => {
      const scale = focalLength / (focalLength + p.z + 200);
      return {
        x: p.x * scale + width / 2,
        y: p.y * scale + height / 2,
        scale,
      };
    };

    const rotateY = (p: Point3D, angle: number): Point3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return { x: p.x * cos + p.z * sin, y: p.y, z: -p.x * sin + p.z * cos };
    };

    const rotateX = (p: Point3D, angle: number): Point3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return { x: p.x, y: p.y * cos - p.z * sin, z: p.y * sin + p.z * cos };
    };

    let time = 0;

    const render = () => {
      time += 0.012;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const rotAngleY = time * 0.4 + mouseX * 0.4;
      const rotAngleX = 0.2 + mouseY * 0.3;

      // 1. Transform & Render Architectural 3D House Frame
      const transformedVerts = rawVertices.map((v) => {
        let p = rotateY(v, rotAngleY);
        p = rotateX(p, rotAngleX);
        return p;
      });

      const projectedVerts = transformedVerts.map(project);

      ctx.save();
      ctx.strokeStyle = "rgba(0, 166, 81, 0.75)";
      ctx.lineWidth = 1.8;
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#00a651";

      edges.forEach((edge) => {
        const p1 = projectedVerts[edge.from];
        const p2 = projectedVerts[edge.to];

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Render Vertex Light Sparks
      projectedVerts.forEach((pt) => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 3 * pt.scale, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      });

      ctx.restore();

      // 2. Render Floating 3D Location Marker Pins
      pins.forEach((pin) => {
        let p = rotateY({ x: pin.x, y: pin.y + Math.sin(time * 2) * 8, z: pin.z }, rotAngleY);
        p = rotateX(p, rotAngleX);
        const proj = project(p);

        ctx.save();
        ctx.translate(proj.x, proj.y);

        // Location Pin Marker
        ctx.fillStyle = "#0d60c4";
        ctx.strokeStyle = "#00a651";
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#0d60c4";

        ctx.beginPath();
        ctx.arc(0, -12 * proj.scale, 8 * proj.scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Pin Stem
        ctx.beginPath();
        ctx.moveTo(0, -4 * proj.scale);
        ctx.lineTo(0, 8 * proj.scale);
        ctx.stroke();

        // Label Badge
        ctx.fillStyle = "rgba(7, 26, 61, 0.85)";
        ctx.roundRect(-40 * proj.scale, 12 * proj.scale, 80 * proj.scale, 20 * proj.scale, 6);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#ffffff";
        ctx.font = `bold ${Math.max(8, 10 * proj.scale)}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(pin.label, 0, 22 * proj.scale);

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
