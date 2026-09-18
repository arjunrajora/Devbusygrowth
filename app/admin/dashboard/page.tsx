"use client";

import React, { useEffect, useState } from "react";

interface MonthlyPoint {
  month: string;
  count: number;
}

export default function AdminDashboardPage() {
  const [totalEnquiries, setTotalEnquiries] = useState<number>(0);
  const [monthlyStats, setMonthlyStats] = useState<MonthlyPoint[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
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
        if (data.enquiries) {
          setEnquiries(data.enquiries);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load dashboard enquiry stats:", err);
        setIsLoading(false);
      });
  }, []);

  // 1. Calculate Line Chart Data: daily counts for the last 7 days (Mon-Sun format)
  const getLast7DaysData = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    type Last7Day = {
  dateStr: string;
  dayName: string;
  count: number;
};

const last7Days: Last7Day[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      last7Days.push({
        dateStr,
        dayName: days[d.getDay()],
        count: 0
      });
    }

    enquiries.forEach((enq: any) => {
      if (enq.createdAt) {
        const enqDate = new Date(enq.createdAt).toISOString().split("T")[0];
        const match = last7Days.find((d) => d.dateStr === enqDate);
        if (match) {
          match.count++;
        }
      }
    });

    return last7Days;
  };

  const last7DaysData = getLast7DaysData();
  const maxDailyCount = Math.max(...last7DaysData.map((item) => item.count), 5);

  // 2. Calculate Donut Chart Data: enquiries grouped by status
  const getDonutChartData = () => {
    const statuses = ["New", "Contacted", "In Progress", "Converted", "Closed"];
    const colors = ["#0d60c4", "#f59e0b", "#06b6d4", "#00a651", "#64748b"];
    const labels = ["New", "Contacted", "In Progress", "Converted", "Closed"];
    
    const counts = {
      "New": 0,
      "Contacted": 0,
      "In Progress": 0,
      "Converted": 0,
      "Closed": 0
    };

    enquiries.forEach((enq: any) => {
      const status = enq.status || "New";
      if (counts.hasOwnProperty(status)) {
        counts[status as keyof typeof counts]++;
      } else {
        counts["New"]++;
      }
    });

    const total = enquiries.length;
    let cumulativePercent = 0;
    
    return statuses.map((status, index) => {
      const count = counts[status as keyof typeof counts];
      const percentage = total > 0 ? (count / total) * 100 : 0;
      const startPercent = cumulativePercent;
      cumulativePercent += percentage;
      return {
        status,
        label: labels[index],
        count,
        percentage,
        startPercent,
        color: colors[index]
      };
    });
  };

  const donutChartData = getDonutChartData();
  const totalDonutCount = enquiries.length;

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

      {/* 2. New Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart #1: Enquiry Trend (Line Chart) */}
        <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-[#071a3d]/90 p-6 sm:p-8 shadow-xl backdrop-blur-xl space-y-6">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Enquiry Overview
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              New enquiries received per day over the last 7 days
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
              <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl w-full"></div>
            </div>
          ) : totalDonutCount === 0 ? (
            <div className="h-48 flex items-center justify-center text-slate-400 text-xs">
              No enquiry data available yet.
            </div>
          ) : (
            <div className="w-full">
              <svg viewBox="0 0 400 200" className="w-full h-auto overflow-visible">
                <defs>
                  <linearGradient id="trendLineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0d60c4" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#00a651" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="trendStrokeGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#0d60c4" />
                    <stop offset="100%" stopColor="#00a651" />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid Lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                  const yVal = 20 + ratio * 130;
                  return (
                    <line
                      key={idx}
                      x1="40"
                      y1={yVal}
                      x2="380"
                      y2={yVal}
                      stroke="currentColor"
                      className="text-slate-200 dark:text-slate-800/80"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Draw Curves & Points */}
                {(() => {
                  const width = 340;
                  const height = 130;
                  const maxVal = maxDailyCount;
                  const pts = last7DaysData.map((d, idx) => {
                    const x = 40 + (idx * width) / 6;
                    const y = 150 - (d.count / maxVal) * height;
                    return { x, y, label: d.dayName, count: d.count };
                  });

                  const lineD = pts.reduce((acc, pt, i) => {
                    if (i === 0) return `M ${pt.x} ${pt.y}`;
                    const prev = pts[i - 1];
                    const cx1 = prev.x + (pt.x - prev.x) / 2;
                    const cy1 = prev.y;
                    const cx2 = prev.x + (pt.x - prev.x) / 2;
                    const cy2 = pt.y;
                    return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${pt.x} ${pt.y}`;
                  }, "");

                  const fillD = `${lineD} L ${pts[pts.length - 1].x} 150 L ${pts[0].x} 150 Z`;

                  return (
                    <>
                      <path d={fillD} fill="url(#trendLineGradient)" />
                      <path d={lineD} fill="none" stroke="url(#trendStrokeGradient)" strokeWidth="3" strokeLinecap="round" />
                      {pts.map((pt, idx) => (
                        <g key={idx} className="group cursor-pointer">
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r="4"
                            className="fill-white dark:fill-[#071a3d] stroke-[#0d60c4] dark:stroke-[#00a651] stroke-[2.5px] transition-transform duration-200 group-hover:scale-150"
                          />
                          <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                            <rect
                              x={pt.x - 16}
                              y={pt.y - 26}
                              width="32"
                              height="18"
                              rx="4"
                              className="fill-slate-900 dark:fill-white"
                            />
                            <text
                              x={pt.x}
                              y={pt.y - 14}
                              textAnchor="middle"
                              className="fill-white dark:fill-slate-900 text-[9px] font-extrabold"
                            >
                              {pt.count}
                            </text>
                          </g>
                          <text
                            x={pt.x}
                            y="172"
                            textAnchor="middle"
                            className="fill-slate-400 dark:fill-slate-500 text-[10px] font-semibold"
                          >
                            {pt.label}
                          </text>
                        </g>
                      ))}
                    </>
                  );
                })()}
              </svg>
            </div>
          )}
        </div>

        {/* Chart #2: Enquiry Status (Donut Chart) */}
        <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-[#071a3d]/90 p-6 sm:p-8 shadow-xl backdrop-blur-xl space-y-6">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Enquiry Status
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Current enquiry distribution across process stages
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center gap-6 animate-pulse">
              <div className="h-28 w-28 rounded-full bg-slate-200 dark:bg-slate-800"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-5/6"></div>
              </div>
            </div>
          ) : totalDonutCount === 0 ? (
            <div className="h-48 flex items-center justify-center text-slate-400 text-xs">
              No enquiry data available yet.
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="relative w-36 h-36 flex-shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle
                    cx="50"
                    cy="50"
                    r="34"
                    fill="transparent"
                    stroke="currentColor"
                    className="text-slate-100 dark:text-slate-800/40"
                    strokeWidth="8"
                  />
                  {donutChartData.map((seg, idx) => {
                    const radius = 34;
                    const circumference = 2 * Math.PI * radius;
                    const strokeLength = (seg.percentage / 100) * circumference;
                    const strokeOffset = -((seg.startPercent / 100) * circumference);
                    
                    if (seg.count === 0) return null;

                    return (
                      <circle
                        key={idx}
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="transparent"
                        stroke={seg.color}
                        strokeWidth="8"
                        strokeDasharray={`${strokeLength} ${circumference}`}
                        strokeDashoffset={strokeOffset}
                        transform="rotate(-90 50 50)"
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                    );
                  })}
                  <text x="50" y="47" textAnchor="middle" className="fill-slate-900 dark:fill-white font-extrabold text-sm leading-none">
                    {totalDonutCount}
                  </text>
                  <text x="50" y="58" textAnchor="middle" className="fill-slate-400 text-[7px] uppercase font-bold tracking-widest leading-none">
                    Total Leads
                  </text>
                </svg>
              </div>

              <div className="flex-1 space-y-2 w-full">
                {donutChartData.map((seg, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs font-semibold">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: seg.color }}></span>
                      <span className="text-slate-600 dark:text-slate-300">{seg.label}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-800 dark:text-slate-100 font-bold">{seg.count}</span>
                      <span className="text-[10px] text-slate-400">({Math.round(seg.percentage)}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Monthly Enquiries Section & Line Chart */}
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
