"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import { BUSINESS_CONFIG } from "@/components/businessConfig";
import BubbleEffect from "@/components/BubbleEffect";
import ParallaxScroll from "@/components/ParallaxScroll";
import ActiveCampaignsSection from "@/components/ActiveCampaignsSection";
import TechPartnersSection from "@/components/TechPartnersSection";
import BlueprintSection from "@/components/BlueprintSection";
import RealEstateLeadSection from "@/components/RealEstateLeadSection";
import {
  Megaphone,
  BarChart3,
  Bot,
  Video,
  Globe,
  TrendingUp,
  Search,
  Layers,
  CreditCard,
  DollarSign,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Zap,
  Mail,
  Settings,
  ShieldAlert,
  MessageCircle,
  CheckCircle2,
  ChevronRight,
  User,
  Image as ImageIcon
} from "lucide-react";

// ----------------------------------------------------
// Data Maps
// ----------------------------------------------------

const STATS = [
  { value: 80, prefix: "", suffix: "+", label: "Campaigns" },
  { value: 1, prefix: "₹", suffix: "Cr+", label: "Ad Spend" },
  { value: 3.2, prefix: "", suffix: "x", label: "Avg ROAS", decimals: 1 },
  { value: 100, prefix: "", suffix: "+", label: "Clients" },
];

const SERVICES = [
  {
    num: "01",
    title: "Reels & Content",
    desc: "Hook-first video scripting, custom video editing, dynamic captioning & platform SEO.",
    link: "/services#video-editing",
    img: "/images/services/reels-content.webp",
    color: "from-[#00a651]/10 to-transparent border-[#00a651]/10"
  },
  {
    num: "02",
    title: "Paid Ads",
    desc: "Meta & Google Ads structures, creative testing grids, pixel tracking & scaling budgets.",
    link: "/services#meta-ads",
    img: "/images/services/ads-growth.webp",
    color: "from-[#0d60c4]/10 to-transparent border-[#0d60c4]/10"
  },
  {
    num: "03",
    title: "AI Automation",
    desc: "Autonomous workflow pipelines, WhatsApp APIs, custom n8n nodes & CRM integrations.",
    link: "/services#ai-automation",
    img: "/images/services/ai-automation.webp",
    color: "from-[#00a651]/10 to-transparent border-[#00a651]/10"
  },
  {
    num: "04",
    title: "Lead Generation",
    desc: "High-converting landing pages, interactive lead capture forms, lead routing & email automation.",
    link: "/services#social-media",
    img: "/images/services/lead-generation.webp",
    color: "from-[#0d60c4]/10 to-transparent border-[#0d60c4]/10"
  },
  {
    num: "05",
    title: "Website Development",
    desc: "Premium Next.js/React websites, modern UI interfaces, fast rendering & responsive components.",
    link: "/services#web-development",
    img: "/images/services/web-development.jpg",
    color: "from-[#00a651]/10 to-transparent border-[#00a651]/10"
  },
  {
    num: "06",
    title: "SEO / AEO",
    desc: "Search engine visibility, keyword intent strategy & AI answer engine optimization.",
    link: "/services#social-media",
    img: "/images/services/seo-aeo.jpg",
    color: "from-[#0d60c4]/10 to-transparent border-[#0d60c4]/10"
  }
];

const INDUSTRIES = [
  { name: "D2C Brands", img: "/images/industries/d2c-brands.webp", desc: "Scaling Shopify & Woocommerce revenue" },
  { name: "Real Estate", img: "/images/industries/real-estate.webp", desc: "Generating qualified site-visit leads" },
  { name: "Education", img: "/images/industries/education.svg", desc: "Mentorship & admission campaigns" },
  { name: "B2B SaaS", img: "/images/industries/b2b-saas.webp", desc: "Driving product signups & bookings" },
  { name: "Creator Economy", img: "/images/industries/creator-economy.webp", desc: "Personal branding & channel growth" },
  { name: "Finance & Wealth", img: "/images/industries/finance.webp", desc: "High-ticket lead funnels" },
  { name: "Healthcare", img: "/images/industries/healthcare.webp", desc: "Patient acquisition & automation" },
  { name: "Fashion & Retail", img: "/images/industries/fashion.webp", desc: "High engagement video creatives" },
];

const COURSE_MODULES = [
  {
    num: "M1",
    title: "Foundation & AI",
    subtitle: "Websites, funnels & AI mindset",
    topics: ["Digital ecosystem", "ICP & personas", "WordPress", "AI funnel planning"],
    img: "/images/courses/foundation-ai.webp",
  },
  {
    num: "M2",
    title: "SEO & AEO",
    subtitle: "Search dominance in the AI era",
    topics: ["Keyword strategy", "Technical SEO", "AI-search mapping", "AEO optimization"],
    img: "/images/courses/seo-aeo.webp",
  },
  {
    num: "M3",
    title: "Social & Content",
    subtitle: "Platform-led growth engines",
    topics: ["Algorithms", "Short-form hooks", "Content planning", "Influencer deals"],
    img: "/images/courses/social-content.webp",
  },
  {
    num: "M4",
    title: "Meta & Google Ads",
    subtitle: "Performance marketing scaling",
    topics: ["Meta setup", "Search campaigns", "A/B creative test", "Budget scaling"],
    img: "/images/courses/meta-google-ads.webp",
  },
  {
    num: "M5",
    title: "Automation & AI",
    subtitle: "Workflows & WhatsApp funnels",
    topics: ["n8n workflows", "WhatsApp APIs", "Email automation", "CRM triggers"],
    img: "/images/courses/automation-ai.webp",
  },
];

const FAQS = [
  { q: "What makes TheBusyGrowth different?", a: "We are active operators, not standard account managers. We write the copy, run the ads, edit the videos, and write the automation scripts ourselves. No agency fluff—just real growth." },
  { q: "Do you only work in Jaipur?", a: "No, we are based in Jaipur, Rajasthan, but work with founders and brands all across India and globally through a streamlined, remote-first workflow." },
  { q: "What is the recommended minimum ad budget?", a: "We recommend a minimum Meta/Google ad spend of ₹50,000/month. We review each brand's unit economics individually before starting." },
  { q: "Which course is right for me?", a: "Our Full Digital Marketing Course covers the complete stack in 20 weeks. If you only want to focus on advertising and media buying, the 12-week Performance Marketing Course is recommended." },
];

const TESTIMONIALS = [
  {
    name: "Karan Sharma",
    role: "Founder",
    company: "BloomD2C",
    text: "TheBusyGrowth scaled our Meta Ads performance to 3.8x ROAS in 90 days. Their video editors are creative genius, and response times are unmatched.",
    img: "/images/testimonials/profile_1.jpg"
  },
  {
    name: "Priya Mehta",
    role: "CEO",
    company: "Jaipur Stones",
    text: "Their WhatsApp API and lead routing automation changed our sales efficiency entirely. Verified buyer leads land on our phones within seconds.",
    img: "/images/testimonials/profile_2.jpg"
  },
  {
    name: "Rahul Verma",
    role: "Director",
    company: "Apex Academy",
    text: "The funnel they built converts traffic automatically. Working with active performance operators rather than generic account executives is a game changer.",
    img: "/images/testimonials/profile_3.jpg"
  }
];

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [messages, setMessages] = useState<Array<{ sender: string; text: string; time: string; avatar?: string }>>([]);
  const [isTyping, setIsTyping] = useState(true);

  // WhatsApp Simulation Effect
  useEffect(() => {
    const scenario = [
      { sender: "user", text: "Hey! I want to scale my store but my current ROAS is stuck at 1.5x. Can you help?", time: "11:02 AM", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" },
      { sender: "system", text: "⚡ AI Routing Node: Assigning lead to performance manager...", time: "11:02 AM" },
      { sender: "agent", text: "Hi! Absolutely, we usually see that due to fatigued creatives. Let's set up a custom strategy call to map a 3x funnel for your catalog.", time: "11:03 AM" }
    ];

    setMessages([scenario[0]]);
    setIsTyping(true);

    const timer1 = setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, scenario[1]]);
      setIsTyping(true);
    }, 2800);

    const timer2 = setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, scenario[2]]);
    }, 5500);

    const repeatTimer = setInterval(() => {
      setMessages([scenario[0]]);
      setIsTyping(true);
      
      const t1 = setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, scenario[1]]);
        setIsTyping(true);
      }, 2800);

      const t2 = setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, scenario[2]]);
      }, 5500);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }, 15000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(repeatTimer);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-800 dark:bg-[#050c1a] dark:text-slate-100 transition-colors duration-300 font-sans">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 -z-50 bg-grid-pattern opacity-80 pointer-events-none"></div>
      <div className="fixed inset-0 -z-50 bg-dot-pattern opacity-40 pointer-events-none"></div>
      <div className="fixed -right-40 top-20 -z-50 h-[500px] w-[500px] rounded-full bg-[#0d60c4]/10 dark:bg-[#0d60c4]/15 blur-3xl pointer-events-none"></div>
      <div className="fixed -left-40 bottom-20 -z-50 h-[500px] w-[500px] rounded-full bg-[#00a651]/10 dark:bg-[#00a651]/15 blur-3xl pointer-events-none"></div>

      {/* ====================================================
          1. HERO SECTION WITH PREMIUM IMAGE OVERLAYS
          ==================================================== */}
      <section className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-20 overflow-hidden">
        <BubbleEffect />
        
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center relative z-10">
          {/* Left Content */}
          <div className="space-y-6 lg:col-span-6">
            <ScrollReveal direction="fade" delay={100}>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#00a651]/30 bg-[#00a651]/10 px-3.5 py-1 text-xs font-bold tracking-wide text-[#00a651] shadow-sm animate-bounce [animation-duration:4s]">
                <Zap size={12} className="text-[#00a651] shrink-0" />
                <span>Performance • AI • Growth Agency</span>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={200}>
              <h1 className="font-sans text-4xl font-extrabold leading-[1.12] tracking-tight text-[#071a3d] dark:text-white sm:text-5xl lg:text-6xl xl:text-[62px]">
                We build digital experiences that generate{" "}
                <span className="bg-gradient-to-r from-[#0d60c4] via-[#00a651] to-[#0d60c4] bg-clip-text text-transparent font-black">
                  predictable growth.
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={300}>
              <p className="max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
                A hands-on performance marketing team in Jaipur. We run Meta &amp; Google Ads, edit high-converting Reels, and build 24/7 AI automation nodes for scaling brands.
              </p>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal direction="up" delay={400}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#0d60c4] to-[#00a651] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0d60c4]/20 transition-all hover:scale-105 active:scale-95 btn-shimmer gap-1.5"
                >
                  <span>Get a Free Growth Plan</span>
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/services"
                  className="group inline-flex items-center justify-center rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 px-7 py-3.5 text-sm font-bold text-[#071a3d] dark:text-slate-100 transition-all hover:bg-slate-100 dark:hover:bg-slate-700 hover:shadow-md gap-1.5"
                >
                  <span>Explore Services</span>
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="fade" delay={500}>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <span className="rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800/80 px-3.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-[#00a651]/40 shadow-sm transition-colors">Video Editing &amp; Reels</span>
                <span className="rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800/80 px-3.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-[#0d60c4]/40 shadow-sm transition-colors">Meta &amp; Google Ads</span>
                <span className="rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800/80 px-3.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-[#00a651]/40 shadow-sm transition-colors">WhatsApp &amp; Email Automation</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Visual Composition */}
          <div className="lg:col-span-6">
            <ScrollReveal direction="scale" delay={300}>
              <div className="relative rounded-3xl border border-white/10 bg-[#071a3d] overflow-hidden shadow-2xl group min-h-[380px] sm:min-h-[480px]">
                
                {/* Background Image of Entrepreneur */}
                <Image
                  src="/images/hero_visual.jpg"
                  alt="Modern Digital Creator & Business Owner"
                  fill
                  className="object-cover opacity-60 transition-transform duration-700 transform group-hover:scale-105"
                  priority
                />
                
                {/* Overlay gradients for dark, premium look */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050c1a] via-[#050c1a]/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050c1a]/50 via-transparent to-[#050c1a]/30" />

                {/* Floating HUD Cards representing AI Growth Engine */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10 pointer-events-none">
                  
                  {/* Top Bar Info */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050c1a]/95 border border-white/10 text-[10px] font-extrabold uppercase tracking-widest text-slate-200 shadow-md">
                      <span className="h-2 w-2 rounded-full bg-[#00a651] animate-ping shrink-0" />
                      <span>AI Growth Engine</span>
                    </span>
                    <span className="rounded-md bg-[#00a651]/20 px-2 py-0.5 text-[9px] font-bold text-[#00a651] border border-[#00a651]/30">
                      Live Scaling
                    </span>
                  </div>

                  {/* Overlaid Stats Dashboard (3 Grid Cards) */}
                  <div className="grid grid-cols-3 gap-2.5 sm:gap-4 my-auto">
                    {/* Leads Card */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="rounded-2xl border border-white/10 bg-[#050c1a]/95 p-3 shadow-lg flex flex-col justify-between"
                    >
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Leads</span>
                      <span className="text-lg sm:text-xl font-extrabold text-[#00a651] mt-1">1,284</span>
                      <span className="text-[9px] font-semibold text-[#00a651] mt-0.5">↑ 18.4%</span>
                    </motion.div>

                    {/* AI Automation Active */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="rounded-2xl border border-white/10 bg-[#050c1a]/95 p-3 shadow-lg flex flex-col justify-between"
                    >
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">AI Node</span>
                      <span className="text-xs sm:text-sm font-extrabold text-blue-400 mt-1.5 truncate">ACTIVE</span>
                      <span className="text-[9px] font-semibold text-slate-400 mt-0.5">Online</span>
                    </motion.div>

                    {/* Sales Growth */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.0 }}
                      className="rounded-2xl border border-white/10 bg-[#050c1a]/95 p-3 shadow-lg flex flex-col justify-between"
                    >
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Sales</span>
                      <span className="text-lg sm:text-xl font-extrabold text-emerald-400 mt-1">+42%</span>
                      <span className="text-[9px] font-semibold text-slate-400 mt-0.5">MoM Boost</span>
                    </motion.div>
                  </div>

                  {/* Bottom: Simulated Realtime Chat Box */}
                  <div className="w-full rounded-2xl border border-white/10 bg-[#050c1a]/95 p-3 shadow-lg pointer-events-auto">
                    <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2 text-[10px] text-slate-400">
                      <span className="font-bold flex items-center gap-1.5">
                        <MessageCircle size={12} className="text-[#00a651]" />
                        WhatsApp Lead Routing
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00a651]" />
                    </div>
                    <div className="space-y-1.5 max-h-[85px] overflow-y-auto pr-1">
                      {messages.map((msg, idx) => (
                        <div key={idx} className={`flex items-start gap-2 ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}>
                          {msg.sender === 'user' && msg.avatar && (
                            <img src={msg.avatar} className="h-5 w-5 rounded-full object-cover border border-white/10" alt="client" />
                          )}
                          <div className={`rounded-xl px-2.5 py-1.5 text-[10px] max-w-[85%] ${
                            msg.sender === 'agent' 
                              ? 'bg-[#00a651] text-white font-medium rounded-tr-none' 
                              : msg.sender === 'system'
                                ? 'bg-slate-900 text-slate-400 font-mono text-[8px]'
                                : 'bg-[#071a3d] text-slate-200 border border-white/10 rounded-tl-none'
                          }`}>
                            {msg.text}
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex items-center gap-1 pl-1">
                          <span className="h-1 w-1 rounded-full bg-[#00a651] animate-bounce" />
                          <span className="h-1 w-1 rounded-full bg-[#00a651] animate-bounce [animation-delay:150ms]" />
                          <span className="h-1 w-1 rounded-full bg-[#00a651] animate-bounce [animation-delay:300ms]" />
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* INFINITE RUNNING SERVICE TICKER */}
      <div className="relative py-4 border-y border-white/10 bg-slate-100 dark:bg-[#071a3d]/50 overflow-hidden w-full select-none">
        <div className="flex animate-marquee whitespace-nowrap gap-10 text-xs font-bold uppercase tracking-widest text-[#00a651]/80 dark:text-[#00a651]/70">
          <span>Reels & Video Editing ⚡</span>
          <span>Meta & Google Ads ⚡</span>
          <span>AI & WhatsApp Automation ⚡</span>
          <span>Lead Generation Stacks ⚡</span>
          <span>Practical Marketing Courses ⚡</span>
          
          <span>Reels & Video Editing ⚡</span>
          <span>Meta & Google Ads ⚡</span>
          <span>AI & WhatsApp Automation ⚡</span>
          <span>Lead Generation Stacks ⚡</span>
          <span>Practical Marketing Courses ⚡</span>
        </div>
      </div>

      {/* ====================================================
          2. TRUST / PERFORMANCE STRIP
          ==================================================== */}
      <section className="relative my-8 border-y border-white/10 bg-white dark:bg-[#0b1c3d] py-6 shadow-sm transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <ScrollReveal direction="scale" delay={i * 100} key={i}>
                <div className="flex flex-col items-center justify-center p-2 group">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#0d60c4] dark:text-[#00a651] tracking-tight transition-transform duration-300 group-hover:scale-105">
                    <AnimatedCounter
                      targetValue={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      decimals={stat.decimals || 0}
                    />
                  </span>
                  <span className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          3. NEW SEAMLESS IMAGE / GROWTH VISUAL BREAK
          ==================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="relative rounded-3xl border border-white/10 bg-[#071a3d] p-4 sm:p-6 shadow-xl overflow-hidden aspect-[21/9] min-h-[220px]">
            <Image
              src="/images/growth_engine.jpg"
              alt="Predictable Revenue Growth Systems Dashboard"
              fill
              className="object-cover opacity-80"
              sizes="(max-w-1280px) 100vw, 1280px"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050c1a] via-[#050c1a]/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-10 text-white">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00a651]">Growth Visualization</span>
                <h3 className="text-lg sm:text-2xl font-black mt-1">Predictable Revenue Models</h3>
                <p className="text-xs text-slate-300 mt-1 max-w-md hidden sm:block">
                  We wire automated dashboards and conversion metrics to scale budgets based on unit economics.
                </p>
              </div>
              <span className="rounded-full bg-[#00a651]/20 border border-[#00a651]/30 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[#00a651] backdrop-blur-md">
                Active Client Node
              </span>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ====================================================
          4. SERVICES SECTION
          ==================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:px-8">
        
        {/* Heading */}
        <ScrollReveal direction="up">
          <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00a651]">Our Services</span>
              <h2 className="text-3xl font-extrabold text-[#071a3d] dark:text-white sm:text-4xl tracking-tight font-sans">
                Our core pillars of growth.
              </h2>
            </div>
            <Link
              href="/services"
              className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#00a651] hover:underline"
            >
              <span>View all 35+ services</span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Services Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((srv, i) => (
            <ScrollReveal direction="up" delay={i * 80} key={i}>
              <Link
                href={srv.link}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white dark:bg-[#0b1c3d] shadow-sm transition-all duration-300 hover:scale-[1.03] hover:border-white/20 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Service Card Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={srv.img}
                    alt={srv.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                    loading="lazy"
                  />
                  {/* Subtle hover gradient + category label */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050c1a] via-[#050c1a]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  <span className="absolute top-3 left-3 rounded-md bg-[#050c1a]/90 px-2 py-0.5 text-[9px] font-bold tracking-widest text-[#00a651] border border-white/10 uppercase">
                    {srv.num}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-[#071a3d] dark:text-white transition-colors group-hover:text-[#00a651]">
                      {srv.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {srv.desc}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center gap-1 text-xs font-bold text-[#00a651]">
                    <span>Explore Service</span>
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ====================================================
          5. AI AUTOMATION SECTION (MAJOR VISUAL UPGRADE & SPACE FIX)
          ==================================================== */}
      <section className="relative mx-auto max-w-7xl px-4 py-8 sm:py-12 lg:px-8">
        <ScrollReveal direction="up">
          <div className="rounded-3xl border border-white/10 bg-white dark:bg-[#0b1c3d] p-6 sm:p-10 md:p-12 overflow-hidden relative shadow-sm transition-colors duration-300">
            
            {/* Reduced bottom margin from mb-12 to mb-6 to pull content upwards */}
            <div className="text-center mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00a651]">AI Integration</span>
              <h2 className="mt-1.5 text-3xl font-extrabold text-[#071a3d] dark:text-white sm:text-4xl tracking-tight font-sans">
                AI-powered growth &amp; automation.
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-slate-600 dark:text-slate-300 text-sm sm:text-base">
                We sync lead captures to AI models, instant WhatsApp sequences, and CRM triggers to maximize conversion rates on auto-pilot.
              </p>
            </div>

            {/* Layout Box */}
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              
              {/* Left Column: Visual Workflow Backdrop (7 Cols) */}
              <div className="lg:col-span-7 relative">
                
                {/* Automation graphic backdrop */}
                <div className="relative rounded-2xl border border-white/10 bg-[#071a3d] overflow-hidden aspect-[16/10] shadow-xl">
                  <Image
                    src="/images/automation_workflow.jpg"
                    alt="AI Operations workflow backdrop"
                    fill
                    className="object-cover opacity-60"
                    sizes="(max-w-1024px) 100vw, 700px"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050c1a] via-[#050c1a]/30 to-transparent" />
                  
                  {/* Floating Framer Motion status indicators inside stage */}
                  <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between z-10 pointer-events-none">
                    
                    {/* Floating Badge 1 */}
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                      className="self-start rounded-xl border border-white/10 bg-[#050c1a]/95 px-3 py-2 shadow-lg flex items-center gap-2 pointer-events-auto"
                    >
                      <span className="h-2 w-2 rounded-full bg-[#00a651] animate-ping" />
                      <span className="text-[10px] font-bold text-slate-200">AI Agent Active • Online</span>
                    </motion.div>

                    {/* Floating Badge 2 */}
                    <motion.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                      className="self-end rounded-xl border border-white/10 bg-[#050c1a]/95 px-3 py-2 shadow-lg flex items-center gap-2 pointer-events-auto"
                    >
                      <Bot size={12} className="text-[#00a651]" />
                      <div className="text-left">
                        <p className="text-[9px] font-bold text-slate-200">Lead Qualified</p>
                        <p className="text-[8px] text-[#00a651] font-semibold">+1 New Lead</p>
                      </div>
                    </motion.div>

                    {/* Floating Badge 3 */}
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                      className="self-start rounded-xl border border-white/10 bg-[#050c1a]/95 px-3 py-2 shadow-lg flex items-center gap-2 pointer-events-auto"
                    >
                      <MessageCircle size={12} className="text-blue-400" />
                      <div className="text-left">
                        <p className="text-[9px] font-bold text-slate-200">WhatsApp Sent</p>
                        <p className="text-[8px] text-slate-400">2 sec ago</p>
                      </div>
                    </motion.div>

                  </div>
                </div>

              </div>

              {/* Right Column: Workflow path (5 Cols) */}
              <div className="lg:col-span-5 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#00a651]">Automation Pipeline</h3>
                
                {/* Vertical Workflow Nodes */}
                <div className="space-y-2 font-semibold">
                  {[
                    { title: "NEW LEAD", desc: "User fills inquiry form or clicks advertisement hook." },
                    { title: "AI QUALIFICATION", desc: "Automated agent analyzes lead intent & profile info." },
                    { title: "CRM UPDATE", desc: "Values synchronized instantly to Google Sheets & CRM." },
                    { title: "WHATSAPP FLOW", desc: "Instant follow-up catalog sent directly to user phone." },
                    { title: "FOLLOW-UP", desc: "24h notification trigger to maximize booking rate." },
                    { title: "SALES", desc: "Hot conversion achieved under 3 minutes." }
                  ].map((step, idx, arr) => (
                    <div key={idx} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <span className="h-6 w-6 rounded-full bg-[#050c1a] border border-white/10 text-[10px] flex items-center justify-center font-bold text-[#00a651]">
                          {idx + 1}
                        </span>
                        {idx < arr.length - 1 && (
                          <span className="w-px h-8 bg-gradient-to-b from-[#00a651] to-[#0d60c4] my-0.5" />
                        )}
                      </div>
                      <div className="text-left">
                        <h4 className="text-xs font-extrabold text-slate-700 dark:text-slate-100">{step.title}</h4>
                        <p className="text-[10px] text-slate-400 font-medium">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </ScrollReveal>
      </section>

      {/* ====================================================
          6. LEAD GENERATION SECTION
          ==================================================== */}
      <section className="relative mx-auto max-w-7xl px-4 py-8 sm:py-12 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column: Visual Pipeline (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal direction="up">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00a651]">Lead Funnels</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071a3d] dark:text-white tracking-tight leading-tight mt-1 font-sans">
                From Attention to Enquiry. Automatically.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                We engineer user acquisition paths that guide attention into conversion. Below is our visual client blueprint framework:
              </p>
            </ScrollReveal>

            {/* Horizontal Workflow Flow Grid */}
            <ScrollReveal direction="up" delay={150}>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center">
                {[
                  { node: "REELS", desc: "Short video" },
                  { node: "ADS", desc: "Meta paid" },
                  { node: "LANDING", desc: "Fast UI" },
                  { node: "ENQUIRY", desc: "Lead form" },
                  { node: "WHATSAPP", desc: "Instant flow" },
                  { node: "SALES", desc: "ROAS gain" }
                ].map((item, idx) => (
                  <div key={idx} className="rounded-xl border border-white/10 bg-[#071a3d]/5 dark:bg-[#071a3d]/50 p-2 group hover:border-[#00a651]/30">
                    <span className="text-[9px] font-extrabold text-[#00a651] tracking-wide block">{item.node}</span>
                    <span className="text-[8px] text-slate-400 mt-0.5 block">{item.desc}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={200}>
              <div className="flex gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#0d60c4] to-[#00a651] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:scale-105 transition-all"
                >
                  <span>Build your funnel</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: CRM Screenshot Visual (6 Cols) */}
          <div className="lg:col-span-6">
            <ScrollReveal direction="scale" delay={200}>
              <div className="relative rounded-3xl border border-white/10 bg-[#071a3d] overflow-hidden aspect-[16/10] shadow-2xl">
                <Image
                  src="/images/lead_gen_funnel.jpg"
                  alt="CRM Sales Funnel and Analytics Dashboard"
                  fill
                  className="object-cover"
                  sizes="(max-w-1024px) 100vw, 600px"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050c1a]/90 via-[#050c1a]/20 to-transparent" />
                
                {/* Small indicator label */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#050c1a]/95 border border-white/10 flex items-center justify-between text-[10px] text-slate-300">
                  <span className="font-bold flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#00a651] animate-ping" />
                    Inbound Pipeline Sync
                  </span>
                  <span className="font-extrabold text-[#00a651]">Meta Pixel Enabled</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ====================================================
          7. INDUSTRIES SECTION
          ==================================================== */}
      <section id="industries" className="relative py-12 sm:py-16 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 text-center mb-10 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00a651]">Who We Work With</span>
          <h2 className="mt-2 text-3xl font-extrabold text-[#071a3d] dark:text-white sm:text-4xl tracking-tight font-sans">
            Built for ambitious businesses across industries.
          </h2>
        </div>

        {/* Infinite Scrolling Carousel */}
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee flex gap-6 whitespace-nowrap py-4">
            {[...INDUSTRIES, ...INDUSTRIES].map((ind, i) => (
              <div
                key={i}
                className="relative h-64 w-80 shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-[#071a3d] p-6 shadow-xl transition-all duration-300 hover:scale-[1.03] hover:border-white/20"
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src={ind.img}
                    alt={ind.name}
                    fill
                    className="object-cover opacity-60 transition-transform duration-500 hover:scale-105"
                    sizes="320px"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071a3d] via-[#071a3d]/60 to-transparent"></div>
                </div>

                <div className="relative z-10 flex h-full flex-col justify-end text-white">
                  <h3 className="text-xl font-extrabold">{ind.name}</h3>
                  <p className="mt-1.5 text-xs text-slate-300 font-medium leading-relaxed">
                    {ind.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          8. CASE STUDIES / ACTIVE CAMPAIGNS SECTION
          ==================================================== */}
      <ActiveCampaignsSection />

      {/* ====================================================
          9. HOW WE WORK (BLUEPRINT SCROLL SHOWCASE)
          ==================================================== */}
      <BlueprintSection />

      {/* ====================================================
          10. COURSES / MENTORSHIP SECTION
          ==================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          
          {/* Details Left */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal direction="left">
              <div className="space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#00a651]">
                  20+ Week Mentorship Program
                </span>
                <h2 className="text-3xl font-extrabold text-[#071a3d] dark:text-white sm:text-4xl tracking-tight font-sans">
                  Learn the same playbooks we run on client accounts.
                </h2>
                <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
                  Our Digital Marketing Course covers everything from baseline SEO to paid advertising campaigns, conversion funnels, and AI automation workflows. Live sessions, lifetime access.
                </p>

                {/* Course mini stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/10 bg-white dark:bg-[#0b1c3d] p-4 shadow-sm">
                    <p className="text-2xl font-bold text-[#00a651]">47+</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Live Sessions</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white dark:bg-[#0b1c3d] p-4 shadow-sm">
                    <p className="text-2xl font-bold text-[#071a3d] dark:text-white">20+</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Real Projects</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white dark:bg-[#0b1c3d] p-4 shadow-sm">
                    <p className="text-2xl font-bold text-[#0d60c4] dark:text-[#00a651]">5</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Milestones</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white dark:bg-[#0b1c3d] p-4 shadow-sm">
                    <p className="text-2xl font-bold text-[#00a651]">Lifetime</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Access</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    href="/course"
                    className="group inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#0d60c4] to-[#00a651] px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 btn-shimmer"
                  >
                    <span>Explore Full Curriculum</span>
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 px-6 py-3 text-sm font-semibold text-[#071a3d] dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm"
                  >
                    Reserve Your Seat
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Module Cards Right with imagery overlays */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Program Modules
            </h3>
            
            <div className="grid gap-4 sm:grid-cols-2">
              {COURSE_MODULES.map((mod, i) => (
                <ScrollReveal direction="up" delay={i * 100} key={i}>
                  <div className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-white dark:bg-[#0b1c3d] min-h-[220px] shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20">
                    
                    {/* Backdrop background image of course module */}
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={mod.img}
                        alt={mod.title}
                        fill
                        className="object-cover opacity-15 transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-w-768px) 100vw, 350px"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0b1c3d] via-white/90 dark:via-[#0b1c3d]/90 to-transparent" />
                    </div>

                    <div className="relative z-10 p-5 flex flex-col justify-between h-full">
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-xs font-bold text-[#071a3d] dark:text-slate-200">
                            {mod.num}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Module</span>
                        </div>

                        <h4 className="text-base font-extrabold text-[#071a3d] dark:text-white group-hover:text-[#00a651] transition-colors">
                          {mod.title}
                        </h4>
                        <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 mb-3">{mod.subtitle}</p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {mod.topics.map((t, idx) => (
                          <span key={idx} className="rounded-full bg-slate-100/50 dark:bg-slate-900/60 px-2.5 py-0.5 text-[9px] text-slate-700 dark:text-slate-300 border border-white/5 font-semibold">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ====================================================
          11. TOOLS / TECHNOLOGY SECTION (LOGO STRIP)
          ==================================================== */}
      <TechPartnersSection />

      {/* ====================================================
          12. REAL PEOPLE SECTION ("BUILT FOR PEOPLE WHO WANT TO GROW")
          ==================================================== */}
      <section className="relative mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:px-8">
        <ScrollReveal direction="up">
          <div className="rounded-3xl border border-white/10 bg-white dark:bg-[#0b1c3d] p-6 sm:p-10 md:p-12 overflow-hidden relative shadow-sm">
            
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              
              {/* Left Column: Image with floating badges (7 Cols) */}
              <div className="lg:col-span-7 relative">
                <div className="relative rounded-2xl border border-white/10 bg-[#071a3d] overflow-hidden aspect-[16/10] shadow-xl">
                  <Image
                    src="/images/built_for_growth.jpg"
                    alt="Business Owner scaling operations using analytics"
                    fill
                    className="object-cover"
                    sizes="(max-w-1024px) 100vw, 700px"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050c1a] via-transparent to-transparent opacity-80" />

                  {/* Overlaid Floating Metrics */}
                  <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between z-10 pointer-events-none">
                    
                    {/* Leads floating card */}
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                      className="self-start rounded-xl border border-white/10 bg-[#050c1a]/95 px-3 py-2 shadow-lg flex items-center gap-2 pointer-events-auto"
                    >
                      <span className="text-[10px] font-extrabold text-[#00a651]">+284 Leads</span>
                    </motion.div>

                    {/* ROAS card */}
                    <motion.div
                      animate={{ y: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut" }}
                      className="self-end rounded-xl border border-white/10 bg-[#050c1a]/95 px-3 py-2 shadow-lg flex items-center gap-2 pointer-events-auto"
                    >
                      <span className="text-[10px] font-extrabold text-[#0d60c4] dark:text-[#00a651]">3.8X ROAS Achieved</span>
                    </motion.div>

                    {/* AI Automation Active */}
                    <motion.div
                      animate={{ y: [0, -3.5, 0] }}
                      transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
                      className="self-start rounded-xl border border-white/10 bg-[#050c1a]/95 px-3 py-2 shadow-lg flex items-center gap-2 pointer-events-auto"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00a651] animate-ping" />
                      <span className="text-[9px] font-bold text-slate-200">AI Automation Active</span>
                    </motion.div>

                  </div>
                </div>
              </div>

              {/* Right Column: Narrative (5 Cols) */}
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#00a651]">Built for People Who Want to Grow.</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#071a3d] dark:text-white tracking-tight leading-tight font-sans">
                  For Founders, Creators &amp; Builders.
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  We build tools, ad campaigns, and content playbooks specifically for operators who look at unit economics rather than vanity impressions. Our workflow connects tech frameworks to actual revenue maps.
                </p>
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#00a651] hover:underline"
                  >
                    <span>Partner with active operators</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </ScrollReveal>
      </section>

      {/* ====================================================
          13. TESTIMONIALS SECTION WITH PROFILE IMAGES
          ==================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:px-8">
        <ScrollReveal direction="up">
          <div className="text-center mb-10 max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00a651]">Testimonials</span>
            <h2 className="text-3xl font-extrabold text-[#071a3d] dark:text-white sm:text-4xl tracking-tight font-sans">
              Real founders. True growth stories.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, idx) => (
            <ScrollReveal direction="up" delay={idx * 80} key={idx}>
              <div className="rounded-2xl border border-white/10 bg-white dark:bg-[#0b1c3d] p-6 shadow-sm flex flex-col justify-between h-full hover:border-white/20 transition-all">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed text-left">
                  "{t.text}"
                </p>
                
                <div className="flex items-center gap-3.5 mt-6 pt-4 border-t border-white/5">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/10 shrink-0">
                    <Image
                      src={t.img}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-extrabold text-slate-800 dark:text-white leading-tight">{t.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 mt-0.5">{t.role}, {t.company}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ====================================================
          14. FAQ SECTION
          ==================================================== */}
      <section id="faq" className="mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          
          {/* FAQ Headline Left */}
          <div className="lg:col-span-5 space-y-4">
            <ScrollReveal direction="left">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-[#00a651]">FAQ</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071a3d] dark:text-white tracking-tight font-sans">
                  Straight answers.
                  <span className="block text-slate-400 dark:text-slate-500 mt-1">Zero fluff.</span>
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Clear information about our agency performance methods and mentorship modules.
                </p>
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-1 text-sm font-bold text-[#00a651] hover:underline"
                  >
                    <span>Still have questions? Book a strategy call</span>
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Accordion Right */}
          <div className="lg:col-span-7 space-y-4">
            {FAQS.map((faq, i) => (
              <ScrollReveal direction="up" delay={i * 100} key={i}>
                <div className="rounded-2xl border border-white/10 bg-white dark:bg-[#0b1c3d] shadow-sm overflow-hidden transition-all duration-300 hover:border-white/20">
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/30"
                  >
                    <span className="text-sm sm:text-base font-bold text-[#071a3d] dark:text-white">{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-slate-400 transition-transform duration-300 ${
                        activeFaq === i ? "rotate-180 text-[#00a651]" : ""
                      }`}
                    />
                  </button>
                  
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      activeFaq === i ? "max-h-40 border-t border-white/5 py-4 px-6" : "max-h-0"
                    }`}
                  >
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300 text-left">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* ====================================================
          15. FINAL CTA BANNER
          ==================================================== */}
      <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <ScrollReveal direction="scale">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#071a3d] via-[#0b2857] to-[#071a3d] px-6 py-12 text-center shadow-2xl md:px-12 md:py-16 text-white">
            <BubbleEffect />
            
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="absolute top-1/2 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00a651]/20 blur-3xl"></div>

            <span className="text-xs font-bold uppercase tracking-widest text-[#00a651]">Let's Work Together</span>
            <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-extrabold text-white sm:text-4xl md:text-5xl leading-tight relative z-10 font-sans">
              Ready to turn attention into growth?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-slate-300 relative z-10">
              Book a call with our Jaipur-based performance operators to map your strategy.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4 relative z-10">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0d60c4] to-[#00a651] px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 btn-shimmer"
              >
                <span>Book a Strategy Call</span>
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <a
                href={BUSINESS_CONFIG.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-[#00a651]/30 bg-[#00a651]/20 px-8 py-3.5 text-sm font-bold text-white hover:bg-[#00a651]/30"
              >
                <span>Talk on WhatsApp</span>
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}
