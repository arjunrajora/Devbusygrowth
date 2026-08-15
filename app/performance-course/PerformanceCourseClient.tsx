"use client";

import React from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { BUSINESS_CONFIG } from "@/components/businessConfig";
import JSONLD from "@/components/JSONLD";
import { Zap, ArrowRight, Check } from "lucide-react";

const OVERVIEW_WEEKS = [
  {
    week: "Weeks 1-2",
    title: "Meta Ads Foundation",
    image: "/images/courses/meta-google-ads.webp",
    color: "border-[#00a651]/20 text-[#00a651] bg-[#00a651]/5",
    bullets: ["Business Manager Setup", "Campaign Structure Mappings", "Setting Ad Objectives", "Budgeting Calculations"],
  },
  {
    week: "Weeks 3-4",
    title: "Audience & Targeting",
    image: "/images/courses/foundation-ai.webp",
    color: "border-[#071a3d]/20 text-[#071a3d] bg-[#071a3d]/5",
    bullets: ["Custom Audiences & Stacks", "Lookalike Segment Models", "Interest Stack Testing", "Retargeting Funnels"],
  },
  {
    week: "Weeks 5-6",
    title: "Creative & Copywriting",
    image: "/images/courses/social-content.webp",
    color: "border-[#0d60c4]/20 text-[#0d60c4] bg-[#0d60c4]/5",
    bullets: ["Ad Creative Wireframes", "Persuasive Copy Hooks", "A/B Dynamic Creative Testing", "Dynamic Creative Nodes"],
  },
  {
    week: "Weeks 7-8",
    title: "Google Search Ads",
    image: "/images/courses/seo-aeo.webp",
    color: "border-[#0b2857]/20 text-[#0b2857] bg-[#0b2857]/5",
    bullets: ["Keyword Intent Stacking", "Match Type Optimization", "High CTR Copy Hooks", "Ad Extensions Setup"],
  },
  {
    week: "Weeks 9-10",
    title: "Google Display & Video",
    image: "/images/courses/automation-ai.webp",
    color: "border-[#00a651]/20 text-[#00a651] bg-[#00a651]/5",
    bullets: ["Google Display Networks", "YouTube Ad Positioning", "Placement Blacklists", "Video Remarketing"],
  },
  {
    week: "Weeks 11-12",
    title: "Tracking & Scaling",
    image: "/images/courses/tracking-scaling.svg",
    color: "border-[#0d60c4]/20 text-[#0d60c4] bg-[#0d60c4]/5",
    bullets: ["Pixel & Conversions API", "GA4 Event Customizations", "Performance Max (PMax)", "Ad Budget Scaling Nodes"],
  },
];

const MASTER_TOOLS = [
  "Meta Ads Manager",
  "Google Ads Console",
  "Google Tag Manager",
  "GA4 (Google Analytics)",
  "Meta Pixel & CAPI",
  "Canva & Premiere Pro",
  "ChatGPT Ad Copy Nodes",
  "Hotjar Heatmaps",
];

export default function PerformanceCourseClient() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Courses", url: "/course" },
    { name: "Performance Marketing", url: "/performance-course" },
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#050c1a] text-slate-800 dark:text-slate-100 px-4 py-16 sm:px-6 lg:px-8 transition-colors duration-300">
      <JSONLD type="Breadcrumb" data={{ items: breadcrumbs }} />
      <JSONLD
        type="Course"
        data={{
          title: "Performance Marketing Course — Meta & Google Ads",
          description: "12-week intensive media buying program covering ad structures, tracking, creative matrix testing, and ROAS scaling.",
        }}
      />
      
      {/* Background lights */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-[#00a651]/5 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-72 w-72 rounded-full bg-[#0d60c4]/5 blur-3xl"></div>

      <div className="mx-auto max-w-7xl">
        
        {/* Course Header */}
        <div className="mb-16 text-center">
          <ScrollReveal direction="fade" delay={100}>
            <span className="inline-flex items-center rounded-full border border-[#00a651]/30 bg-[#00a651]/10 px-3.5 py-1 text-xs font-bold text-[#00a651] mb-4 animate-pulse gap-1.5">
              <Zap size={14} className="text-[#00a651] shrink-0" />
              <span>12-Week Intensive Media Buying</span>
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={200}>
            <h1 className="text-4xl font-extrabold text-[#071a3d] dark:text-white sm:text-5xl lg:text-6xl">
              Performance{" "}
              <span className="bg-gradient-to-r from-[#0d60c4] via-[#00a651] to-[#0d60c4] bg-clip-text text-transparent">
                Marketing
              </span>{" "}
              Course
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={300}>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300 sm:text-lg">
              Master Meta &amp; Google Ads structures, CAPI tracking, creative testing grids, and budget scaling nodes for direct ROAS growth.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={400}>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact?interest=performance-course"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0d60c4] to-[#00a651] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:scale-105"
              >
                <span>Reserve Seat in Next Batch</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Weekly Breakdown Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00a651]">Curriculum Breakdown</span>
            <h2 className="text-3xl font-extrabold text-[#071a3d] dark:text-white sm:text-4xl mt-1">
              12 Weeks to Media Buying Mastery
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {OVERVIEW_WEEKS.map((w, idx) => (
              <ScrollReveal direction="up" delay={idx * 80} key={idx}>
                <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0b1c3d] p-6 shadow-sm flex flex-col justify-between h-full hover:border-white/20 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="rounded-lg bg-[#071a3d] px-3 py-1 text-xs font-extrabold text-[#00a651]">
                        {w.week}
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-[#071a3d] dark:text-white mb-4">
                      {w.title}
                    </h3>

                    <div className="space-y-2">
                      {w.bullets.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                          <Check size={14} className="text-[#00a651] shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0b1c3d] p-8 text-center shadow-sm">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00a651]">Industry Tech Stack</span>
          <h2 className="text-2xl font-extrabold text-[#071a3d] dark:text-white sm:text-3xl mt-1 mb-6">
            Tools You Will Master Hands-On
          </h2>

          <div className="flex flex-wrap justify-center gap-3">
            {MASTER_TOOLS.map((tool, idx) => (
              <span
                key={idx}
                className="rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 px-4 py-2 text-xs font-extrabold text-[#071a3d] dark:text-slate-200 shadow-xs"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
