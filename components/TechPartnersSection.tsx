"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

interface ToolSlide {
  id: string;
  name: string;
  category: string;
  desc: string;
  img: string;
  logo: string;
}

const TOOLS: ToolSlide[] = [
  {
    id: "meta-ads",
    name: "Meta Ads",
    category: "Advertising",
    desc: "Performance advertising built for measurable scaling & conversion metrics.",
    img: "/images/services/ads-growth.webp",
    logo: "Meta"
  },
  {
    id: "google-ads",
    name: "Google Ads",
    category: "Search & Video",
    desc: "Intent-based search & YouTube video campaigns that scale acquisition.",
    img: "/images/services/seo-aeo.jpg",
    logo: "Google"
  },
  {
    id: "instagram",
    name: "Instagram Reels",
    category: "Content Creation",
    desc: "Dynamic vertical visual content & short-form video hooks.",
    img: "/images/services/reels-content.webp",
    logo: "Instagram"
  },
  {
    id: "whatsapp",
    name: "WhatsApp API",
    category: "CRM & Automation",
    desc: "Interactive lead and buyer conversation flows driven by live APIs.",
    img: "/images/services/ai-automation.webp",
    logo: "WhatsApp"
  },
  {
    id: "openai",
    name: "OpenAI GPTs",
    category: "Artificial Intelligence",
    desc: "Automated intent analysis, categorization, and AI email/chat responders.",
    img: "/images/automation_workflow.jpg",
    logo: "OpenAI"
  },
  {
    id: "n8n",
    name: "n8n Automation",
    category: "Workflows",
    desc: "Seamless, logic-based multi-platform system synchronization workflows.",
    img: "/images/growth_engine.jpg",
    logo: "n8n"
  },
  {
    id: "hubspot",
    name: "HubSpot",
    category: "Lead Pipeline",
    desc: "Integrated inbound marketing, pipeline management, and CRM solutions.",
    img: "/images/lead_gen_funnel.jpg",
    logo: "HubSpot"
  },
  {
    id: "google-analytics",
    name: "GA4 / GTM",
    category: "Analytics",
    desc: "Granular user event tracking, attribution analytics, and metric dashboards.",
    img: "/images/growth_engine.jpg",
    logo: "GA4"
  },
  {
    id: "nextjs",
    name: "Next.js / React",
    category: "Web Engineering",
    desc: "Lightning-fast rendering, fluid web interfaces, and state-of-the-art SEO.",
    img: "/images/services/web-development.jpg",
    logo: "Next.js"
  },
  {
    id: "wordpress",
    name: "WordPress",
    category: "Web Platforms",
    desc: "Stable blogging engines, editorial publishing, and SEO landing pages.",
    img: "/images/built_for_growth.jpg",
    logo: "WordPress"
  },
  {
    id: "canva",
    name: "Canva Design",
    category: "Assets",
    desc: "Collaborative design templates, brand kits, and quick visual mockup iterations.",
    img: "/images/hero_visual.jpg",
    logo: "Canva"
  },
  {
    id: "youtube",
    name: "YouTube",
    category: "Content & SEO",
    desc: "Long-form authority video building, search optimization, and education.",
    img: "/images/services/courses-growth.webp",
    logo: "YouTube"
  }
];

const LOGO_MARQUEE = [
  "Meta", "Google", "WhatsApp", "OpenAI", "n8n", "HubSpot", "GA4", "Next.js", "WordPress", "Canva", "YouTube", "Instagram"
];

export default function TechPartnersSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3); // Default to desktop 3 visible cards
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive logic to count visible cards
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2); // Tablet
      } else {
        setVisibleCount(3); // Desktop
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay functionality
  const startAutoplay = () => {
    if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    autoplayTimerRef.current = setInterval(() => {
      if (!isPaused) {
        handleNext();
      }
    }, 3500);
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [currentIndex, isPaused, visibleCount]);

  const handleNext = () => {
    // Loop back to start if we exceed the length minus visible count
    const maxIndex = TOOLS.length - visibleCount;
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    const maxIndex = TOOLS.length - visibleCount;
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section 
      className="relative py-16 sm:py-24 bg-[#050c1a] text-white overflow-hidden select-none border-y border-white/10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#0d60c4]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-[#00a651]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00a651]">
                Powered by the tools your business already uses.
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-sans">
                We connect platforms that fuel growth.
              </h2>
              <p className="text-sm sm:text-base text-slate-400 font-medium">
                We connect the platforms, content, advertising and automation tools that keep your growth engine moving.
              </p>
            </div>
            
            {/* Slider Controls */}
            <div className="flex items-center gap-3 self-start md:self-end">
              <button
                onClick={handlePrev}
                className="w-11 h-11 rounded-full border border-white/10 bg-[#071a3d]/50 hover:bg-[#00a651]/20 hover:border-[#00a651]/40 flex items-center justify-center text-slate-400 hover:text-white transition-all shadow-md"
                aria-label="Previous Slide"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                className="w-11 h-11 rounded-full border border-white/10 bg-[#071a3d]/50 hover:bg-[#00a651]/20 hover:border-[#00a651]/40 flex items-center justify-center text-slate-400 hover:text-white transition-all shadow-md"
                aria-label="Next Slide"
              >
                <ChevronRight size={20} />
              </button>
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="w-11 h-11 rounded-full border border-white/10 bg-[#071a3d]/50 hover:bg-[#0d60c4]/20 hover:border-[#0d60c4]/40 flex items-center justify-center text-slate-400 hover:text-white transition-all shadow-md"
                aria-label={isPaused ? "Play Autoplay" : "Pause Autoplay"}
              >
                {isPaused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />}
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Outer Carousel Stage */}
        <div className="relative w-full overflow-hidden py-4">
          <motion.div
            className="flex gap-6"
            animate={{
              x: `calc(-${currentIndex * (100 / visibleCount)}% - ${currentIndex * (24 * (visibleCount - 1) / visibleCount)}px)`
            }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            {TOOLS.map((tool) => (
              <div
                key={tool.id}
                style={{
                  width: `calc((100% - ${(visibleCount - 1) * 24}px) / ${visibleCount})`
                }}
                className="shrink-0 group"
              >
                <div className="relative rounded-[22px] border border-white/10 bg-[#071a3d] shadow-xl overflow-hidden min-h-[320px] sm:min-h-[360px] flex flex-col justify-end p-6 group-hover:border-[#00a651]/40 group-hover:shadow-[0_15px_35px_rgba(0,166,81,0.18)] transition-all duration-500">
                  
                  {/* Visual Background with smooth hover zoom */}
                  <Image
                    src={tool.img}
                    alt={tool.name}
                    fill
                    className="object-cover opacity-45 transition-transform duration-700 ease-out transform group-hover:scale-110 group-hover:opacity-55"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                    loading="lazy"
                  />

                  {/* Dark Gradient Overlay for text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050c1a] via-[#050c1a]/75 to-transparent pointer-events-none" />

                  {/* Green Category Label */}
                  <span className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-full bg-[#00a651]/20 border border-[#00a651]/40 text-[10px] font-bold uppercase tracking-wider text-[#00a651] pointer-events-none backdrop-blur-md">
                    {tool.category}
                  </span>

                  {/* Text Content */}
                  <div className="relative z-10 space-y-2 text-left">
                    <span className="text-xs font-semibold text-slate-400 tracking-wide">{tool.logo}</span>
                    <h3 className="text-2xl font-bold text-white tracking-tight leading-tight group-hover:text-[#00a651] transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed font-normal">
                      {tool.desc}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Pagination Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: TOOLS.length - visibleCount + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "w-6 bg-[#00a651]" : "w-2 bg-slate-700 hover:bg-slate-500"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Continuous logo/tag marquee below the slider */}
        <div className="mt-16 pt-12 border-t border-white/5 relative overflow-hidden w-full">
          <div className="flex animate-marquee whitespace-nowrap gap-12 text-xs font-bold uppercase tracking-widest text-slate-500">
            {/* Row 1 */}
            {LOGO_MARQUEE.map((tag, idx) => (
              <span key={idx} className="hover:text-white transition-colors cursor-default">
                {tag} <span className="text-[#00a651]/40 ml-4">●</span>
              </span>
            ))}
            {/* Row 2 duplication for seamless looping */}
            {LOGO_MARQUEE.map((tag, idx) => (
              <span key={`dup-${idx}`} className="hover:text-white transition-colors cursor-default">
                {tag} <span className="text-[#00a651]/40 ml-4">●</span>
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
