"use client";

import React, { useEffect, useState } from "react";

interface MonthlyPoint {
  month: string;
  count: number;
}

export default function AdminDashboardPage() {
  const [totalEnquiries, setTotalEnquiries] = useState<number>(0);
  const [monthlyStats, setMonthlyStats] = useState<MonthlyPoint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/admin/enquiries")
      .then((res) => res.json())
      .then((data) => {
        if (data.totalCount !== undefined) {
          setTotalEnquiries(data.totalCount);
        }
        if (data.monthlyStats) {
          setMonthlyStats(data.monthlyStats);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load dashboard enquiry stats:", err);
        setIsLoading(false);
      });
  }, []);

  // Compute maximum value for chart scaling (minimum 10 for clean grid)
  const maxCount = Math.max(...monthlyStats.map((item) => item.count), 10);
  const chartHeight = 220;
  const chartWidth = 700;
  const paddingX = 40;
  const paddingY = 30;

  // Calculate SVG coordinates for points
  const points = monthlyStats.map((item, index) => {
    const totalPoints = Math.max(monthlyStats.length - 1, 1);
    const x = paddingX + (index * (chartWidth - paddingX * 2)) / totalPoints;
    const y =
      chartHeight -
      paddingY -
      (item.count / maxCount) * (chartHeight - paddingY * 2);
    return { x, y, month: item.month, count: item.count };
  });

  // Construct SVG Path String
  const pathD =
    points.length > 0
      ? points.reduce((acc, pt, i) => {
          if (i === 0) return `M ${pt.x} ${pt.y}`;
          const prev = points[i - 1];
          const cx1 = prev.x + (pt.x - prev.x) / 2;
          const cy1 = prev.y;
          const cx2 = prev.x + (pt.x - prev.x) / 2;
          const cy2 = pt.y;
          return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${pt.x} ${pt.y}`;
        }, "")
      : "";

  // Area Fill Path String
  const areaD =
    points.length > 0
      ? `${pathD} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z`
      : "";

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Admin Dashboard
        </h1>
      </div>

      {/* 1. Total Enquiries Card */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-[#071a3d]/90 p-6 sm:p-8 shadow-xl backdrop-blur-xl max-w-sm">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Total Enquiries
        </div>
        <div className="mt-3 text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
          {isLoading ? (
            <span className="text-slate-300 dark:text-slate-600 animate-pulse">...</span>
          ) : (
            totalEnquiries
          )}
        </div>
      </div>

      {/* 2. Monthly Enquiries Section & Line Chart */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-[#071a3d]/90 p-6 sm:p-8 shadow-xl backdrop-blur-xl space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
            Monthly Enquiries
          </h2>
        </div>

        {/* Line Chart Component */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[600px] relative">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto overflow-visible">
              <defs>
                {/* Gradient Fill under the Line Chart */}
                <linearGradient id="enquiryLineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0d60c4" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#00a651" stopOpacity="0.0" />
                </linearGradient>
                {/* Line Gradient */}
                <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0d60c4" />
                  <stop offset="100%" stopColor="#00a651" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                const yVal = paddingY + ratio * (chartHeight - paddingY * 2);
                return (
                  <line
                    key={idx}
                    x1={paddingX}
                    y1={yVal}
                    x2={chartWidth - paddingX}
                    y2={yVal}
                    stroke="currentColor"
                    className="text-slate-200 dark:text-slate-800/80"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Area Gradient Fill */}
              {areaD && <path d={areaD} fill="url(#enquiryLineGradient)" />}

              {/* Smooth Trend Line */}
              {pathD && (
                <path
                  d={pathD}
                  fill="none"
                  stroke="url(#strokeGradient)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Data Points & Interactive Tooltips */}
              {points.map((pt, idx) => (
                <g key={idx} className="group cursor-pointer">
                  {/* Point Ring */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="5"
                    className="fill-white dark:fill-[#071a3d] stroke-[#0d60c4] dark:stroke-[#00a651] stroke-[3px] transition-transform duration-200 group-hover:scale-150"
                  />

                  {/* Tooltip on Hover */}
                  <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <rect
                      x={pt.x - 24}
                      y={pt.y - 36}
                      width="48"
                      height="24"
                      rx="6"
                      className="fill-slate-900 dark:fill-white"
                    />
                    <text
                      x={pt.x}
                      y={pt.y - 20}
                      textAnchor="middle"
                      className="fill-white dark:fill-slate-900 text-[11px] font-extrabold"
                    >
                      {pt.count}
                    </text>
                  </g>

                  {/* X Axis Month Label */}
                  <text
                    x={pt.x}
                    y={chartHeight - 8}
                    textAnchor="middle"
                    className="fill-slate-500 dark:fill-slate-400 text-[11px] font-bold"
                  >
                    {pt.month}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
