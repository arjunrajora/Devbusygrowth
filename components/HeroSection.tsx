"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="hero"
      role="region"
      aria-label="Digital Marketing & Performance Growth Hero"
      className="relative w-full min-h-screen lg:h-screen lg:max-h-[960px] flex flex-col justify-between overflow-hidden bg-black text-white -mt-20 pt-28 sm:pt-32 lg:pt-36 pb-8 sm:pb-12 px-6 sm:px-12 lg:px-16 selection:bg-[#00a651]/30 selection:text-white"
    >
      
      {/* ----------------------------------------------------
          FULL-SCREEN BACKGROUND IMAGE (DIGITAL MARKETING COMMAND CENTER)
          Clearly visible with cinematic high-contrast text overlay
          ---------------------------------------------------- */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/digital_marketing_hero.jpg"
          alt="TheBusyGrowth - AI-Powered Digital Marketing Agency & Performance Growth Engine in Jaipur"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-[1.01] transition-transform duration-1000"
        />
        {/* Balanced contrast overlays: keeps image clearly visible while making white typography crisp */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/65" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* ----------------------------------------------------
          2. COMPACT & IMPACTFUL MAIN HEADING
          Centered horizontally across the upper-middle of the screen,
          bold, responsive typography (Desktop: 72–90px, Tablet: 52–68px, Mobile: 36–48px)
          ---------------------------------------------------- */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto my-auto py-4 sm:py-6 lg:py-8 text-center">
        <h1 className="text-4xl sm:text-[3.25rem] md:text-[3.75rem] lg:text-[4.75rem] xl:text-[5.25rem] [font-size:clamp(2.25rem,4.2vw+0.5rem,5.25rem)] font-extrabold tracking-tight text-white leading-[1.03] max-w-6xl lg:max-w-7xl mx-auto drop-shadow-[0_12px_35px_rgba(0,0,0,0.9)]">
          We Build Digital Experiences That Generate{" "}
          <span className="text-[#00a651] inline-block drop-shadow-[0_0_40px_rgba(0,166,81,0.5)]">
            Predictable Growth
          </span>
        </h1>
      </div>

      {/* ----------------------------------------------------
          LOWER CONTENT ROW:
          Left-Aligned: 3. Subheading Block, 4. Body Text & Two CTA Buttons
          Right-Aligned: 5. Circular Text Badge / Rotating Seal
          ---------------------------------------------------- */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto mt-auto flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-12 pb-2">
        
        {/* LEFT-ALIGNED CONTENT BLOCK */}
        <div className="max-w-2xl text-left space-y-4 sm:space-y-5">
          
          {/* 3. Subheading Block: Two-line subheading in a clean, medium-weight font */}
          <h2 className="text-xl sm:text-2xl md:text-[28px] font-medium text-white tracking-tight leading-snug drop-shadow-md">
            Next-Gen Performance &amp; AI Growth Agency.<br />
            <span className="text-slate-300 font-normal">Jaipur&apos;s Dedicated Performance &amp; Scaling Team.</span>
          </h2>

          {/* 4. Body Text: Small paragraph of body text */}
          <p className="text-sm sm:text-base leading-relaxed text-slate-200 max-w-xl font-normal drop-shadow-sm">
            We run high-converting Meta and Google advertising campaigns, produce viral Reels video editing, and engineer 24/7 AI WhatsApp automation nodes for scaling businesses. No fluff — just real growth.
          </p>

          {/* 4. Two Distinct Call-To-Action Buttons Placed Side-By-Side */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Left Button: Filled with a solid color */}
            <Link
              href="/contact"
              title="Book a Digital Marketing Strategy Call with TheBusyGrowth"
              aria-label="Book a Strategy Call with TheBusyGrowth Performance Marketing Team"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#00a651] px-7 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white shadow-[0_0_25px_rgba(0,166,81,0.45)] hover:bg-[#008f45] hover:shadow-[0_0_35px_rgba(0,166,81,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group"
            >
              <span>Book a Strategy Call</span>
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Right Button: White background with a dark border */}
            <Link
              href="/services"
              title="Explore Performance Marketing, Ads, and Automation Services"
              aria-label="Explore Full-Stack Digital Marketing Services"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-slate-950 border-2 border-slate-950 hover:bg-slate-100 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/30 transition-all duration-300 group"
            >
              <span>Explore Services</span>
              <ArrowRight size={18} className="text-slate-950 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

        </div>

        {/* 5. CIRCULAR BADGE (RIGHT-ALIGNED) */}
        <div className="flex items-center lg:justify-end shrink-0 pt-4 lg:pt-0">
          <div
            role="img"
            aria-label="TheBusyGrowth Performance Marketing & AI Verified Seal"
            className="group relative flex items-center justify-center w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-white/30 bg-black/60 backdrop-blur-xl shadow-2xl shadow-black/80 hover:border-[#00a651]/70 transition-all duration-300"
          >
            
            {/* Rotating Seal / Text Badge */}
            <svg
              className="absolute inset-0 w-full h-full animate-spin [animation-duration:14s] pointer-events-none"
              viewBox="0 0 160 160"
            >
              <path
                id="slowSprintBadge"
                d="M 80, 80 m -58, 0 a 58,58 0 1,1 116,0 a 58,58 0 1,1 -116,0"
                fill="none"
              />
              <text className="text-[10px] sm:text-[10.5px] font-semibold tracking-[0.24em] fill-white/90">
                <textPath href="#slowSprintBadge" startOffset="0%">
                  The Busy Growth • Performance • AI Nodes •
                </textPath>
              </text>
            </svg>

            {/* Center Core Monogram */}
            <div className="flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/80 border border-[#00a651]/50 shadow-inner group-hover:scale-110 group-hover:border-[#00a651] transition-transform duration-300">
              <img
                src="/logo-icon-transparent.png"
                alt="TheBusyGrowth Logo Monogram"
                className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
              />
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
