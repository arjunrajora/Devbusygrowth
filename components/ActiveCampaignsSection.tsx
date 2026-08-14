"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Target, TrendingUp, DollarSign, Activity } from "lucide-react";

interface Metric {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

interface CampaignData {
  id: string;
  tabLabel: string;
  title: string;
  description: string;
  img: string;
  badge: string;
  metrics: Metric[];
}

const CAMPAIGNS: CampaignData[] = [
  {
    id: "real-estate",
    tabLabel: "Real Estate",
    title: "High-Intent Property Buyer Campaigns in Jaipur",
    description: "Generated qualified property buyer site-visits through hyper-targeted Google Search & Meta ad funnels synced with WhatsApp routing.",
    img: "/images/real-estate/jaipur-real-estate.webp",
    badge: "Jaipur Real Estate Node",
    metrics: [
      { label: "Qualified Leads", value: 850, suffix: "+" },
      { label: "Cost Per Lead (CPL) Reduction", value: 42, prefix: "-", suffix: "%" },
      { label: "WhatsApp Automation Response", value: 3, suffix: "m" },
      { label: "Conversion Boost", value: 184, prefix: "+", suffix: "%" }
    ]
  },
  {
    id: "ecommerce",
    tabLabel: "E-Commerce",
    title: "Scaling D2C Beauty & Fashion Catalog Spend",
    description: "Implemented a dynamic creative testing matrix combined with conversion-focused customer funnels, resulting in optimized ad spend and massive Shopify sales growth.",
    img: "/images/lead_gen_funnel.jpg",
    badge: "D2C Scaling Node",
    metrics: [
      { label: "Ad Spend Return (ROAS)", value: 3.8, suffix: "x", decimals: 1 },
      { label: "Shopify Sales Growth", value: 184, prefix: "+", suffix: "%" },
      { label: "CPA Reduction", value: 24, prefix: "-", suffix: "%" },
      { label: "Active Ad Sets", value: 47, suffix: "+" }
    ]
  },
  {
    id: "education",
    tabLabel: "Education",
    title: "Admission & Mentorship Enrolment Scaling",
    description: "Scaled leads for national educational coaching and personal mentoring programs using structured lead generation funnels and live web discovery sessions.",
    img: "/images/services/courses-growth.webp",
    badge: "Education Funnel Node",
    metrics: [
      { label: "Qualified Enrolments", value: 1200, suffix: "+" },
      { label: "Cost Per Enrolment Reduction", value: 35, prefix: "-", suffix: "%" },
      { label: "Live Room Attendants", value: 800, suffix: "+" },
      { label: "Audience Trust Growth", value: 320, prefix: "+", suffix: "%" }
    ]
  },
  {
    id: "local-business",
    tabLabel: "Local Business",
    title: "Jaipur Retail Store Storefront Traffic Funnel",
    description: "Mapped hyper-local visual advertising creatives on Meta & Google Maps targeting regional demographics to drive physically foot-traffic & store enquiries.",
    img: "/images/hero_visual.jpg",
    badge: "Foot Traffic Node",
    metrics: [
      { label: "Walk-in Customers", value: 500, suffix: "+" },
      { label: "Customer Acquisition Cost (CAC)", value: 28, prefix: "-", suffix: "%" },
      { label: "Inbound Local Calls", value: 320, suffix: "+" },
      { label: "Google Profile CTR Boost", value: 142, prefix: "+", suffix: "%" }
    ]
  },
  {
    id: "b2b",
    tabLabel: "B2B SaaS",
    title: "SaaS Sales Demos & Enterprise Bookings Pipeline",
    description: "Constructed auto-scrapers and auto-responders that parse inbound queries, sync directories across Google Sheets & Notion, and deploy ChatGPT agents to support client inquiries.",
    img: "/images/automation_workflow.jpg",
    badge: "Enterprise Pipeline Node",
    metrics: [
      { label: "Booked Strategy Demos", value: 150, suffix: "+" },
      { label: "Sales Cycles Saved", value: 40, suffix: "h" },
      { label: "CPL Reduction", value: 18, prefix: "-", suffix: "%" },
      { label: "AI Response Match", value: 98, suffix: "%" }
    ]
  }
];

export default function ActiveCampaignsSection() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeCampaign = CAMPAIGNS[selectedIdx];

  return (
    <section className="relative py-20 bg-[#050c1a] text-white overflow-hidden select-none border-y border-white/10">
      
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-[#00a651]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#0d60c4]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00a651]/10 border border-[#00a651]/30 text-[#00a651] text-xs font-extrabold uppercase tracking-widest">
              <Activity size={14} />
              <span>Performance Proof</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-sans">
              Real outcomes from active campaigns
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-medium">
              Real growth. Real campaigns. Real business outcomes.
            </p>
          </div>
        </ScrollReveal>

        {/* Dynamic Left Image / Right Metrics grid (12 columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Visual Showcase (7 Columns) */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="scale" delay={150}>
              <div className="relative rounded-3xl border border-white/10 bg-[#071a3d] overflow-hidden aspect-[16/10] shadow-2xl group">
                
                {/* Switchable Image with Framer Motion AnimatePresence cross-fade */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCampaign.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={activeCampaign.img}
                      alt={activeCampaign.title}
                      fill
                      className="object-cover transition-transform duration-700 transform group-hover:scale-105"
                      sizes="(max-w-1024px) 100vw, 750px"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Ambient dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050c1a] via-[#050c1a]/30 to-transparent pointer-events-none" />

                {/* Floating Top Badge overlay */}
                <div className="absolute top-4 left-4 z-10 p-2.5 rounded-xl bg-[#050c1a]/95 border border-white/10 flex items-center gap-2 pointer-events-none">
                  <span className="h-2 w-2 rounded-full bg-[#00a651] animate-ping" />
                  <span className="text-[10px] font-extrabold tracking-widest text-[#00a651] uppercase">{activeCampaign.badge}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Staggered Metrics Display (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-[340px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCampaign.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Selected Node</span>
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">{activeCampaign.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed">{activeCampaign.description}</p>
                </div>

                {/* Large typography list with subtle dividers instead of cards */}
                <div className="divide-y divide-white/10 pt-4">
                  {activeCampaign.metrics.map((m, idx) => (
                    <div key={idx} className="py-3.5 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">{m.label}</span>
                      <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight text-[#00a651]">
                        <AnimatedCounter
                          targetValue={m.value}
                          prefix={m.prefix}
                          suffix={m.suffix}
                          decimals={m.decimals || 0}
                          duration={1200}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Selector Campaign Tabs Bar */}
        <ScrollReveal direction="up" delay={200}>
          <div className="mt-12 flex flex-wrap justify-center gap-3 bg-[#071a3d]/60 border border-white/10 p-2 rounded-2xl max-w-2xl mx-auto backdrop-blur-xl">
            {CAMPAIGNS.map((c, idx) => {
              const isActive = idx === selectedIdx;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedIdx(idx)}
                  className={`flex-1 min-w-[100px] text-center px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-[#0d60c4] to-[#00a651] text-white shadow-lg shadow-[#00a651]/15 scale-105"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {c.tabLabel}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
