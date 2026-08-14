"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Play,
  Pause,
  Megaphone,
  BarChart3,
  Bot,
  TrendingUp,
  GraduationCap,
  CheckCircle2,
  Zap,
  ChevronRight
} from "lucide-react";

interface StepData {
  num: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  img: string;
  isVideo?: boolean;
  videoUrl?: string;
  posterUrl?: string;
  icon: React.ReactNode;
  statBadge: string;
  link: string;
}

const SHOWCASE_STEPS: StepData[] = [
  {
    num: "01",
    badge: "Attention Engine",
    title: "Reels & Short-Form Video Production",
    subtitle: "Hook your target audience in the first 3 seconds",
    description: "High-impact short-form video content, viral reel scripting, and platform-native post production designed to convert scrollers into loyal audience leads.",
    features: ["Hook-first video scripting", "Platform SEO optimization", "Dynamic subtitle design"],
    img: "/images/services/reels-content.webp",
    isVideo: true,
    videoUrl: "/videos/thebusygrowth-showcase.mp4",
    posterUrl: "/images/video/thebusygrowth-video-poster.webp",
    icon: <Megaphone size={18} className="text-[#00a651]" />,
    statBadge: "⚡ 1.2M+ Viral Views",
    link: "/services#video-editing",
  },
  {
    num: "02",
    badge: "Traffic Scaling",
    title: "Meta & Google Ad Performance",
    subtitle: "Reach high-intent buyers with predictable ROI",
    description: "Data-backed advertising structures, dynamic creative testing matrices, and conversion pixel tracking engineered to lower CPA and scale ad spend.",
    features: ["A/B creative testing", "Pixel & CAPI setup", "ROAS budget scaling"],
    img: "/images/services/ads-growth.webp",
    icon: <BarChart3 size={18} className="text-[#0d60c4]" />,
    statBadge: "📈 3.8x Avg ROAS",
    link: "/services#meta-ads",
  },
  {
    num: "03",
    badge: "Autopilot Operations",
    title: "AI & WhatsApp Automation Nodes",
    subtitle: "Eliminate manual lead follow-up bottlenecks",
    description: "Sync website lead submissions directly to instant WhatsApp sequences, n8n workflow nodes, ChatGPT qualification agents, and CRM databases.",
    features: ["n8n workflow triggers", "WhatsApp API auto-replies", "Instant CRM lead sync"],
    img: "/images/services/ai-automation.webp",
    icon: <Bot size={18} className="text-[#00a651]" />,
    statBadge: "🤖 24/7 AI Lead Agent",
    link: "/services#ai-automation",
  },
  {
    num: "04",
    badge: "Funnel Conversion",
    title: "High-Converting Lead Funnels",
    subtitle: "Turn digital attention into qualified business enquiries",
    description: "Structured lead capture pages, interactive quotation forms, and automated calendar routing built to convert cold traffic into booked strategy calls.",
    features: ["High-converting UI design", "Interactive quote tools", "Automated lead alerts"],
    img: "/images/services/lead-generation.webp",
    icon: <TrendingUp size={18} className="text-[#0d60c4]" />,
    statBadge: "🎯 850+ Qualified Leads",
    link: "/contact",
  },
  {
    num: "05",
    badge: "Operator Playbooks",
    title: "Practical Marketing Mentorship",
    subtitle: "Master performance marketing alongside active operators",
    description: "Hands-on 20-week mentorship covering SEO, paid ad accounts, lead automation, and agency scaling playbooks with live account access.",
    features: ["Live strategy sessions", "20+ real client projects", "Lifetime operator access"],
    img: "/images/services/courses-growth.webp",
    icon: <GraduationCap size={18} className="text-[#00a651]" />,
    statBadge: "🎓 20+ Week Curriculum",
    link: "/course",
  },
];

export default function CinematicShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-advance step every 6 seconds if not paused
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SHOWCASE_STEPS.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Ensure video plays smoothly when active
  useEffect(() => {
    if (activeIndex === 0 && videoRef.current) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [activeIndex]);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const activeStep = SHOWCASE_STEPS[activeIndex];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full py-12 md:py-20 bg-gradient-to-b from-[#050c1a] via-[#071a3d]/50 to-[#050c1a] border-y border-slate-800 text-white select-none overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#0d60c4]/15 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#00a651]/15 rounded-full blur-[110px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00a651]/10 border border-[#00a651]/30 text-[#00a651] text-xs font-extrabold uppercase tracking-widest mb-3">
              <Sparkles size={14} />
              <span>Cinematic Growth Engine</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              The Growth Pipeline in Action
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-xl">
              Explore how we convert attention into predictable business revenue step by step.
            </p>
          </div>

          {/* Tab Switcher Pills */}
          <div className="flex flex-wrap gap-2 bg-[#071a3d]/80 border border-slate-800 p-1.5 rounded-2xl backdrop-blur-xl">
            {SHOWCASE_STEPS.map((step, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={step.num}
                  onClick={() => setActiveIndex(idx)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-[#0d60c4] to-[#00a651] text-white shadow-lg shadow-[#00a651]/20 scale-105"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{step.num}</span>
                  <span className="hidden sm:inline">{step.badge}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cinematic Main Stage (12 Columns Compact Section) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl border border-slate-800/90 bg-[#071a3d]/80 p-6 md:p-8 shadow-2xl backdrop-blur-2xl">
          
          {/* Left Column: 16:9 Aspect Video & Photograph Visual Stage (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-slate-700/80 bg-[#050c1a] shadow-2xl group">
              {activeStep.isVideo && activeStep.videoUrl ? (
                /* Video Player */
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    src={activeStep.videoUrl}
                    poster={activeStep.posterUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover transition-all duration-700 transform scale-105"
                  />
                  <button
                    onClick={togglePlayPause}
                    className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#050c1a]/80 border border-slate-700 text-white hover:bg-[#00a651] transition-all shadow-lg"
                    aria-label={isPlaying ? "Pause Video" : "Play Video"}
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                  </button>
                </div>
              ) : (
                /* Real Product Photography */
                <img
                  key={activeStep.img}
                  src={activeStep.img}
                  alt={activeStep.title}
                  className="w-full h-full object-cover transition-all duration-700 transform scale-105"
                />
              )}

              {/* Floating Stat Badge Overlay */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-xl bg-[#050c1a]/90 border border-slate-700/90 backdrop-blur-md text-xs font-extrabold text-[#00a651] shadow-lg">
                {activeStep.statBadge}
              </div>

              {/* Bottom Gradient Title Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#050c1a] via-[#050c1a]/70 to-transparent flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#00a651] animate-ping" />
                  <span className="text-sm font-extrabold text-white">{activeStep.title}</span>
                </div>
                <span className="text-xs font-bold text-slate-400">
                  Step {activeStep.num} / 05
                </span>
              </div>
            </div>

            {/* Quick Step Indicator Progress Bar */}
            <div className="flex items-center gap-2 pt-1">
              {SHOWCASE_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 flex-1 rounded-full cursor-pointer transition-all duration-500 ${
                    idx === activeIndex
                      ? "bg-gradient-to-r from-[#0d60c4] to-[#00a651] scale-y-125"
                      : "bg-slate-800 hover:bg-slate-700"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Content & Feature Card (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div
              key={activeStep.num}
              className="space-y-4 animate-fadeIn transition-all duration-500"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#050c1a] border border-slate-700 text-xs font-extrabold text-[#00a651]">
                {activeStep.icon}
                <span>Step {activeStep.num} • {activeStep.badge}</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {activeStep.title}
              </h3>

              <p className="text-sm font-bold text-[#0d60c4] dark:text-[#00a651]">
                {activeStep.subtitle}
              </p>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#050c1a]/70 border border-slate-800 p-4 rounded-2xl backdrop-blur-xl">
                {activeStep.description}
              </p>

              {/* Feature Highlights List */}
              <div className="space-y-2 pt-1">
                {activeStep.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                    <CheckCircle2 size={15} className="text-[#00a651] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <Link
                  href={activeStep.link}
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0d60c4] to-[#00a651] px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg transition-all hover:scale-105 btn-shimmer"
                >
                  <span>Explore {activeStep.title}</span>
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
