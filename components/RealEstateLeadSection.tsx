"use client";

import React from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Sparkles, ArrowRight, Building2, CheckCircle2, MessageSquare, Zap, TrendingUp, Users } from "lucide-react";

export default function RealEstateLeadSection() {
  return (
    <section className="relative py-16 sm:py-24 border-y border-white/10 bg-[#050c1a] text-white overflow-hidden select-none">
      
      {/* Background Ambient Lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-[#00a651]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#0d60c4]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Business Content & Statistics (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal direction="up">
              <div className="space-y-4">
                
                {/* Small Label */}
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#00a651]/10 border border-[#00a651]/30 text-[#00a651] text-xs font-extrabold uppercase tracking-widest">
                  <Building2 size={14} />
                  <span>Real Estate Lead Generation</span>
                </span>

                {/* Main Heading */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Qualified Real Estate Leads in Jaipur
                </h2>

                {/* Supporting Description */}
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
                  We engineer hyper-targeted search ads and performance funnels connected via n8n automation nodes. Inbound buyer inquiries are pushed directly into CRM databases and trigger instant WhatsApp notifications to your sales team within 3 minutes.
                </p>

              </div>
            </ScrollReveal>

            {/* Real Business Statistics & Animated Counters */}
            <ScrollReveal direction="up" delay={150}>
              <div className="grid grid-cols-3 gap-4 pt-2 border-t border-b border-white/10 py-4">
                
                {/* Metric 1 */}
                <div className="space-y-1">
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#00a651] tracking-tight">
                    <AnimatedCounter targetValue={850} suffix="+" />
                  </p>
                  <p className="text-xs text-slate-400 font-extrabold uppercase tracking-wider">
                    Qualified Leads
                  </p>
                </div>

                {/* Metric 2 */}
                <div className="space-y-1">
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#0d60c4] dark:text-[#00a651] tracking-tight">
                    <AnimatedCounter targetValue={3} suffix=" min" />
                  </p>
                  <p className="text-xs text-slate-400 font-extrabold uppercase tracking-wider">
                    Response Time
                  </p>
                </div>

                {/* Metric 3 */}
                <div className="space-y-1">
                  <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    <AnimatedCounter targetValue={184} prefix="+" suffix="%" />
                  </p>
                  <p className="text-xs text-slate-400 font-extrabold uppercase tracking-wider">
                    Conversion Boost
                  </p>
                </div>

              </div>
            </ScrollReveal>

            {/* Key Service Highlights */}
            <ScrollReveal direction="up" delay={250}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {[
                  "Jaipur Buyer Audience Stacking",
                  "Automated WhatsApp Alert Nodes",
                  "Verified Property Site-Visits",
                  "Live Lead Scoring & CRM Sync"
                ].map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                    <CheckCircle2 size={15} className="text-[#00a651] shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Strong Call to Action */}
            <ScrollReveal direction="up" delay={300}>
              <div className="pt-4">
                <Link
                  href="/contact?interest=meta-ads"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0d60c4] to-[#00a651] px-8 py-3.5 text-sm font-extrabold text-white shadow-xl shadow-[#00a651]/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl btn-shimmer"
                >
                  <span>Get Qualified Leads</span>
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </ScrollReveal>

          </div>

          {/* Right Column: Hero Real Estate Visual Stage & UI Notifications (6 Cols) */}
          <div className="lg:col-span-6">
            <ScrollReveal direction="scale" delay={200}>
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 bg-[#071a3d] shadow-2xl group">
                
                {/* Real Estate Photograph */}
                <img
                  src="/images/real-estate/jaipur-real-estate.webp"
                  alt="Qualified Real Estate Leads in Jaipur — TheBusyGrowth"
                  className="w-full h-full object-cover transition-transform duration-700 transform group-hover:scale-105"
                />

                {/* Floating UI Lead Notification Badges (Overlays) */}
                <div className="absolute top-4 left-4 right-4 sm:left-6 sm:right-6 space-y-2 z-10 pointer-events-none">
                  
                  {/* Notification 1: Lead Alert */}
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#050c1a]/90 border border-white/10 backdrop-blur-md shadow-lg animate-fadeIn">
                    <div className="h-8 w-8 rounded-xl bg-[#00a651]/20 border border-[#00a651]/40 flex items-center justify-center text-[#00a651] shrink-0">
                      <Users size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-extrabold text-white truncate">New High-Intent Property Buyer</p>
                      <p className="text-[10px] text-[#00a651] font-semibold">Verified Jaipur Site Visit Request</p>
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold shrink-0">Just now</span>
                  </div>

                  {/* Notification 2: WhatsApp Automation */}
                  <div className="hidden sm:flex items-center gap-3 p-3 rounded-2xl bg-[#050c1a]/90 border border-white/10 backdrop-blur-md shadow-lg animate-fadeIn delay-100">
                    <div className="h-8 w-8 rounded-xl bg-[#0d60c4]/20 border border-[#0d60c4]/40 flex items-center justify-center text-[#0d60c4] shrink-0">
                      <MessageSquare size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-extrabold text-white truncate">WhatsApp Auto-Response Dispatched</p>
                      <p className="text-[10px] text-[#0d60c4] font-semibold">Sales Representative Alerted (2.4m)</p>
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold shrink-0">Automated</span>
                  </div>

                </div>

                {/* Bottom Tag Overlay */}
                <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 p-3.5 rounded-2xl bg-[#050c1a]/90 border border-white/10 backdrop-blur-md flex items-center justify-between pointer-events-none z-10">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#00a651] animate-ping" />
                    <span className="text-xs font-extrabold text-white">Live Campaign Node: Jaipur Real Estate</span>
                  </div>
                  <span className="text-[10px] font-extrabold text-[#00a651] uppercase tracking-wider">
                    850+ Leads Generated
                  </span>
                </div>

              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
}
