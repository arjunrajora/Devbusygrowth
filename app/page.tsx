"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import { BUSINESS_CONFIG } from "@/components/businessConfig";
import BubbleEffect from "@/components/BubbleEffect";
import ParallaxScroll from "@/components/ParallaxScroll";
import CaseStudySlider from "@/components/CaseStudySlider";
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
  Image,
  DollarSign,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Zap,
  Mail,
  Settings,
  ShieldAlert,
  MessageCircle
} from "lucide-react";

// ----------------------------------------------------
// Data Maps
// ----------------------------------------------------

const STATS = [
  { value: 80, prefix: "", suffix: "+", label: "Campaigns", color: "text-[#071a3d]" },
  { value: 1, prefix: "₹", suffix: "Cr+", label: "Ad Spend", color: "text-[#0d60c4]" },
  { value: 3.2, prefix: "", suffix: "x", label: "Avg ROAS", color: "text-[#00a651]", decimals: 1 },
  { value: 100, prefix: "", suffix: "+", label: "Clients", color: "text-[#0b2857]" },
];

const SERVICES = [
  {
    num: "01",
    title: "Social Media",
    desc: "Strategy, content, management & influencer marketing.",
    link: "/services#social-media",
    color: "group-hover:border-[#00a651]/30 group-hover:bg-[#00a651]/5 text-[#00a651]",
  },
  {
    num: "02",
    title: "Meta Ads",
    desc: "Campaign setup, creative, A/B testing & scaling.",
    link: "/services#meta-ads",
    color: "group-hover:border-[#0d60c4]/30 group-hover:bg-[#0d60c4]/5 text-[#0d60c4]",
  },
  {
    num: "03",
    title: "AI & Automation",
    desc: "Chatbots, lead gen, email & WhatsApp flows.",
    link: "/services#ai-automation",
    color: "group-hover:border-[#00a651]/30 group-hover:bg-[#00a651]/5 text-[#00a651]",
  },
  {
    num: "04",
    title: "Video Editing",
    desc: "Reels, YouTube, ad videos & color grading.",
    link: "/services#video-editing",
    color: "group-hover:border-[#0d60c4]/30 group-hover:bg-[#0d60c4]/5 text-[#0d60c4]",
  },
];

const INDUSTRIES = [
  { name: "D2C Brands", img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=600&q=80", desc: "Scaling Shopify & Woocommerce revenue" },
  { name: "Real Estate", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80", desc: "Generating qualified site-visit leads" },
  { name: "Education", img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80", desc: "Mentorship & admission campaigns" },
  { name: "B2B SaaS", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80", desc: "Driving product signups & bookings" },
  { name: "Creator Economy", img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80", desc: "Personal branding & channel growth" },
  { name: "Finance & Wealth", img: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80", desc: "High-ticket lead funnels" },
  { name: "Healthcare", img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80", desc: "Patient acquisition & automation" },
  { name: "Fashion & Retail", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80", desc: "High engagement video creatives" },
];

const PROCESS_STEPS = [
  { num: "01", name: "Discover", desc: "Understand your unit economics, audience personas, and bottleneck areas." },
  { num: "02", name: "Strategize", desc: "Map exact traffic channels, high-converting offer hooks, and lead flows." },
  { num: "03", name: "Build", desc: "Produce video creatives, configure campaign architectures, and build nodes." },
  { num: "04", name: "Launch", desc: "Go live with structured A/B tests, pixel tracking, and workflow automation." },
  { num: "05", name: "Scale", desc: "Analyze campaign snapshots hourly and allocate budgets to winning creatives." },
];

const COURSE_MODULES = [
  {
    num: "M1",
    title: "Foundation & AI",
    subtitle: "Websites, funnels & AI mindset",
    topics: ["Digital ecosystem", "ICP & personas", "WordPress", "AI funnel planning"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    color: "group-hover:border-[#071a3d]/40 text-[#071a3d]",
  },
  {
    num: "M2",
    title: "SEO & AEO",
    subtitle: "Search dominance in the AI era",
    topics: ["Keyword strategy", "Technical SEO", "AI-search mapping", "AEO optimization"],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    color: "group-hover:border-[#00a651]/40 text-[#00a651]",
  },
  {
    num: "M3",
    title: "Social & Content",
    subtitle: "Platform-led growth engines",
    topics: ["Algorithms", "Short-form hooks", "Content planning", "Influencer deals"],
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80",
    color: "group-hover:border-[#0d60c4]/40 text-[#0d60c4]",
  },
  {
    num: "M4",
    title: "Meta & Google Ads",
    subtitle: "Performance marketing scaling",
    topics: ["Meta setup", "Search campaigns", "A/B creative test", "Budget scaling"],
    img: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80",
    color: "group-hover:border-[#0b2857]/40 text-[#0b2857]",
  },
  {
    num: "M5",
    title: "Automation & AI",
    subtitle: "Workflows & WhatsApp funnels",
    topics: ["n8n workflows", "WhatsApp APIs", "Email automation", "CRM triggers"],
    img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80",
    color: "group-hover:border-[#00a651]/40 text-[#00a651]",
  },
];

const FAQS = [
  { q: "What makes TheBusyGrowth different?", a: "We are active operators, not standard account managers. We write the copy, run the ads, edit the videos, and write the automation scripts ourselves. No agency fluff—just real growth." },
  { q: "Do you only work in Jaipur?", a: "No, we are based in Jaipur, Rajasthan, but work with founders and brands all across India and globally through a streamlined, remote-first workflow." },
  { q: "What is the recommended minimum ad budget?", a: "We recommend a minimum Meta/Google ad spend of ₹50,000/month. We review each brand's unit economics individually before starting." },
  { q: "Which course is right for me?", a: "Our Full Digital Marketing Course covers the complete stack in 20 weeks. If you only want to focus on advertising and media buying, the 12-week Performance Marketing Course is recommended." },
];

const PARTNER_LOGOS = [
  { name: "Meta Ads" },
  { name: "Google Ads" },
  { name: "n8n" },
  { name: "WhatsApp API" },
  { name: "Shopify" },
  { name: "WordPress" },
  { name: "GA4" },
  { name: "Razorpay" },
  { name: "Canva" },
  { name: "ChatGPT" },
];

export default function Home() {
  // ----------------------------------------------------
  // Interactive States
  // ----------------------------------------------------
  
  // WhatsApp Chat Simulator States
  const [messages, setMessages] = useState<Array<{ sender: string; text: string; time: string; avatar: string }>>([]);
  const [isTyping, setIsTyping] = useState(true);

  // Active FAQ Accordion index
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Blueprint Active Step Index
  const [activeStep, setActiveStep] = useState(0);

  // ----------------------------------------------------
  // Helpers
  // ----------------------------------------------------
  const getServiceIcon = (title: string) => {
    const size = 32;
    switch (title) {
      case "Social Media":
        return <Megaphone size={size} className="text-[#00a651]" />;
      case "Meta Ads":
        return <BarChart3 size={size} className="text-[#0d60c4]" />;
      case "AI & Automation":
        return <Bot size={size} className="text-[#00a651]" />;
      case "Video Editing":
        return <Video size={size} className="text-[#0d60c4]" />;
      default:
        return null;
    }
  };

  const getPartnerIcon = (name: string) => {
    const size = 18;
    switch (name) {
      case "Meta Ads":
        return <BarChart3 size={size} className="text-[#0d60c4]" />;
      case "Google Ads":
        return <Search size={size} className="text-[#00a651]" />;
      case "n8n":
        return <Layers size={size} className="text-[#0d60c4]" />;
      case "WhatsApp API":
        return (
          <svg className="h-4.5 w-4.5 text-[#00a651]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.077 4.928C17.191 3.041 14.683 2 12.006 2 6.499 2 2.006 6.493 2.006 12c0 1.76.46 3.483 1.333 5l-1.333 4.86 5.013-1.313c1.452.793 3.087 1.207 4.78 1.207h.004c5.507 0 10-4.493 10-10 0-2.677-1.041-5.185-2.926-7.072z"></path>
          </svg>
        );
      case "Shopify":
        return <Globe size={size} className="text-[#0d60c4]" />;
      case "WordPress":
        return <Globe size={size} className="text-[#00a651]" />;
      case "GA4":
        return <TrendingUp size={size} className="text-[#0d60c4]" />;
      case "Razorpay":
        return <DollarSign size={size} className="text-[#00a651]" />;
      case "Canva":
        return <Sparkles size={size} className="text-[#0d60c4]" />;
      case "ChatGPT":
        return <Bot size={size} className="text-[#00a651]" />;
      default:
        return null;
    }
  };

  // ----------------------------------------------------
  // Effects
  // ----------------------------------------------------
  
  // WhatsApp Chat Simulator Loop
  useEffect(() => {
    const scenario = [
      { sender: "user", text: "Hey! I want to scale my store but my current ROAS is stuck at 1.5x. Can you help?", time: "11:02 AM", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" },
      { sender: "system", text: "⚡ AI Routing Node: Assigning lead to performance manager...", time: "11:02 AM", avatar: "" },
      { sender: "agent", text: "Hi! Absolutely, we usually see that due to fatigued creatives. Let's set up a custom strategy call to map a 3x funnel for your catalog.", time: "11:03 AM", avatar: "" }
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

    // Loop the simulation every 15 seconds
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
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-800 dark:bg-[#050c1a] dark:text-slate-100 transition-colors duration-300">
      {/* Background Grids & Ambient Lights */}
      <div className="fixed inset-0 -z-50 bg-grid-pattern opacity-80"></div>
      <div className="fixed inset-0 -z-50 bg-dot-pattern opacity-40"></div>
      <div className="fixed -right-40 top-20 -z-50 h-[500px] w-[500px] rounded-full bg-[#0d60c4]/10 dark:bg-[#0d60c4]/15 blur-3xl"></div>
      <div className="fixed -left-40 bottom-20 -z-50 h-[500px] w-[500px] rounded-full bg-[#00a651]/10 dark:bg-[#00a651]/15 blur-3xl"></div>

      {/* ====================================================
          1. HERO SECTION
          ==================================================== */}
      <section className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 overflow-hidden">
        <BubbleEffect />
        
        {/* Parallax Background Blob */}
        <ParallaxScroll speed={-0.12} className="absolute right-10 top-1/4 -z-10 opacity-30 pointer-events-none">
          <div className="h-48 w-48 rounded-full bg-[#00a651]/15 blur-3xl animate-pulse"></div>
        </ParallaxScroll>
        <ParallaxScroll speed={0.15} className="absolute left-1/4 bottom-10 -z-10 opacity-35 pointer-events-none">
          <div className="h-64 w-64 rounded-full bg-[#0d60c4]/10 blur-3xl"></div>
        </ParallaxScroll>

        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12 relative z-10">
          
          {/* Left Content */}
          <div className="space-y-6 lg:col-span-6">
            {/* Badge */}
            <ScrollReveal direction="fade" delay={100}>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#00a651]/30 bg-[#00a651]/10 px-3.5 py-1 text-xs font-bold tracking-wide text-[#00a651] shadow-sm animate-bounce [animation-duration:4s]">
                <Zap size={12} className="text-[#00a651] shrink-0" />
                <span>Performance • AI • Growth Agency</span>
              </div>
            </ScrollReveal>
            
            {/* Main Heading */}
            <ScrollReveal direction="up" delay={200}>
              <h1 className="font-sans text-4xl font-extrabold leading-[1.12] tracking-tight text-[#071a3d] dark:text-white sm:text-5xl lg:text-6xl xl:text-[62px]">
                We build digital experiences that generate{" "}
                <span className="bg-gradient-to-r from-[#0d60c4] via-[#00a651] to-[#0d60c4] bg-clip-text text-transparent font-black">
                  predictable growth.
                </span>
              </h1>
            </ScrollReveal>

            {/* Subtitle */}
            <ScrollReveal direction="up" delay={300}>
              <p className="max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
                A hands-on performance marketing team in Jaipur. We run Meta &amp; Google Ads, edit high-converting Reels, and build 24/7 AI automation nodes for scaling brands.
              </p>
            </ScrollReveal>

            {/* Call to Actions */}
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
                  className="group inline-flex items-center justify-center rounded-full border border-[#071a3d] dark:border-slate-600 bg-white dark:bg-slate-800 px-7 py-3.5 text-sm font-bold text-[#071a3d] dark:text-slate-100 transition-all hover:bg-slate-100 dark:hover:bg-slate-700 hover:shadow-md gap-1.5"
                >
                  <span>Explore Services</span>
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </ScrollReveal>

            {/* Feature Badges */}
            <ScrollReveal direction="fade" delay={500}>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <span className="rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 px-3.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-[#00a651]/40 shadow-sm transition-colors">Video Editing &amp; Reels</span>
                <span className="rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 px-3.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-[#0d60c4]/40 shadow-sm transition-colors">Meta &amp; Google Ads</span>
                <span className="rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 px-3.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-[#00a651]/40 shadow-sm transition-colors">WhatsApp &amp; Email Automation</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Content - Visual Dashboard Mockup */}
          <div className="lg:col-span-6">
            <ScrollReveal direction="scale" delay={300}>
              <div className="relative rounded-3xl border border-white/10 bg-[#071a3d] p-6 shadow-2xl backdrop-blur-md text-white">
                
                {/* Ambient glows behind dashboard */}
                <div className="absolute -top-10 -left-10 -z-10 h-36 w-36 rounded-full bg-[#00a651]/20 blur-2xl animate-float"></div>
                <div className="absolute -bottom-10 -right-10 -z-10 h-36 w-36 rounded-full bg-[#0d60c4]/20 blur-2xl animate-float-reverse"></div>
                
                {/* Header elements */}
                <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00a651] opacity-75"></span>
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#00a651]"></span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-200">Live Campaign Performance</span>
                  </div>
                  <span className="rounded-md bg-[#00a651]/20 px-2.5 py-1 text-[10px] font-extrabold text-[#00a651]">
                    AI Engine Active
                  </span>
                </div>

                {/* Grid of Metric Cards */}
                <div className="grid gap-4 sm:grid-cols-2">
                  
                  {/* Card 1: Leads Counting */}
                  <div className="rounded-2xl border border-white/10 bg-[#0b2857] p-4 transition-all hover:bg-white/10">
                    <p className="text-xs font-medium text-slate-300">Live Leads Generated</p>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-[#00a651] tracking-tight">
                        <AnimatedCounter targetValue={850} suffix="+" />
                      </span>
                      <span className="text-xs font-semibold text-[#00a651]">↑ 18.4%</span>
                    </div>
                    <div className="mt-2.5 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#0d60c4] to-[#00a651] transition-all duration-1000" style={{ width: "85%" }}></div>
                    </div>
                  </div>

                  {/* Card 2: ROAS */}
                  <div className="rounded-2xl border border-white/10 bg-[#0b2857] p-4 transition-all hover:bg-white/10">
                    <p className="text-xs font-medium text-slate-300">Average Campaign ROAS</p>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-[#0d60c4] tracking-tight">
                        <AnimatedCounter targetValue={3.8} suffix="x" decimals={1} />
                      </span>
                      <span className="text-xs font-semibold text-[#00a651]">D2C Brand</span>
                    </div>
                    <div className="mt-2.5 text-[10px] text-slate-400 font-medium">Targeted Meta &amp; Google Ads</div>
                  </div>

                  {/* Card 3: Interactive SVG Growth Graph */}
                  <div className="rounded-2xl border border-white/10 bg-[#0b2857] p-4 sm:col-span-2">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-xs font-medium text-slate-300">Campaign Scaling Trend</p>
                      <span className="text-xs font-bold text-[#00a651]">Growth Stage: 4x</span>
                    </div>
                    {/* SVG Graph */}
                    <div className="h-28 w-full bg-[#071a3d]/60 rounded-xl p-2">
                      <svg className="h-full w-full overflow-visible" viewBox="0 0 300 100">
                        <defs>
                          <linearGradient id="gradient-hero-dark" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#00a651" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#00a651" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 0 90 Q 50 80, 80 50 T 150 40 T 220 20 T 300 10 L 300 100 L 0 100 Z"
                          fill="url(#gradient-hero-dark)"
                        />
                        <path
                          d="M 0 90 Q 50 80, 80 50 T 150 40 T 220 20 T 300 10"
                          fill="none"
                          stroke="#00a651"
                          strokeWidth="3.5"
                          className="animate-draw-graph"
                        />
                        <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.06)" />
                        <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(255,255,255,0.06)" />
                      </svg>
                    </div>
                  </div>

                  {/* Card 4: WhatsApp Leads Real-time Simulator */}
                  <div className="rounded-2xl border border-white/10 bg-[#0b2857] p-4 sm:col-span-2 overflow-hidden">
                    <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2">
                      <div className="flex items-center gap-2">
                        <MessageCircle size={16} className="text-[#00a651]" />
                        <span className="text-xs font-semibold text-slate-200">WhatsApp Lead Automation Flow</span>
                      </div>
                      <span className="h-2 w-2 rounded-full bg-[#00a651] animate-pulse"></span>
                    </div>
                    
                    {/* Messages Panel */}
                    <div className="space-y-2.5 min-h-[130px] flex flex-col justify-end">
                      {messages.map((msg, i) => (
                        <div key={i} className={`flex items-start gap-2.5 transition-all duration-500 translate-y-0 opacity-100 ${
                          msg.sender === 'agent' ? 'justify-end' : 'justify-start'
                        }`}>
                          {msg.sender !== 'agent' && msg.avatar && (
                            <img src={msg.avatar} alt="User" className="h-6 w-6 rounded-full object-cover border border-white/10" />
                          )}
                          <div className={`rounded-xl px-3 py-2 text-xs max-w-[82%] ${
                            msg.sender === 'agent' 
                              ? 'bg-[#00a651] text-white rounded-tr-none font-medium' 
                              : msg.sender === 'system' 
                                ? 'bg-slate-800/90 text-slate-300 font-mono text-[10px]' 
                                : 'bg-[#071a3d] text-slate-200 rounded-tl-none border border-white/10'
                          }`}>
                            <p>{msg.text}</p>
                            <span className="mt-0.5 block text-[8px] text-slate-300 text-right">{msg.time}</span>
                          </div>
                        </div>
                      ))}

                      {/* Typing Indicator */}
                      {isTyping && (
                        <div className="flex items-center gap-2 pl-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#00a651] animate-bounce"></span>
                          <span className="h-1.5 w-1.5 rounded-full bg-[#00a651] animate-bounce [animation-delay:150ms]"></span>
                          <span className="h-1.5 w-1.5 rounded-full bg-[#00a651] animate-bounce [animation-delay:300ms]"></span>
                        </div>
                      )}
                    </div>
                  </div>

                </div>

                <div className="mt-4 border-t border-white/10 pt-3 text-center text-xs text-slate-300 font-medium">
                  ⚡ "Scaled D2C brand from 0 to ₹5L/mo revenue in 90 days."
                </div>

              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* INFINITE RUNNING SERVICE TICKER */}
      <div className="relative py-4 border-y border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-[#071a3d]/50 overflow-hidden w-full select-none">
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
      <section className="relative my-8 border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1c3d] py-8 shadow-sm transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <ScrollReveal direction="scale" delay={i * 100} key={i}>
                <div className="flex flex-col items-center justify-center p-2 group">
                  <span className={`text-3xl sm:text-4xl font-extrabold text-[#0d60c4] dark:text-[#00a651] tracking-tight transition-transform duration-300 group-hover:scale-105`}>
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
          3. SERVICES SECTION
          ==================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:px-8 lg:py-20">
        
        {/* Heading */}
        <ScrollReveal direction="up">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00a651]">What We Do</span>
              <h2 className="text-3xl font-extrabold text-[#071a3d] dark:text-white sm:text-4xl lg:text-[40px] tracking-tight">
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((srv, i) => (
            <ScrollReveal direction="up" delay={i * 100} key={i}>
              <Link
                href={srv.link}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1c3d] p-6 shadow-sm card-lift"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="transition-transform duration-500 group-hover:scale-110">{getServiceIcon(srv.title)}</span>
                    <span className="text-xs font-bold tracking-widest text-slate-400 dark:text-slate-500">{srv.num}</span>
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-[#071a3d] dark:text-white transition-colors group-hover:text-[#00a651]">
                    {srv.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {srv.desc}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-[#00a651] transition-all duration-300 group-hover:translate-x-1">
                  <span>Explore service</span>
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ====================================================
          4. PERFORMANCE / CASE STUDY SECTION
          ==================================================== */}
      <section className="relative mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:px-8 lg:py-20 overflow-hidden">
        <BubbleEffect />
        <ScrollReveal direction="up">
          <CaseStudySlider />
        </ScrollReveal>
      </section>

      {/* ====================================================
          5. INDUSTRIES SECTION
          ==================================================== */}
      <section id="industries" className="relative py-12 sm:py-16 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 text-center mb-10 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00a651]">Who We Work With</span>
          <h2 className="mt-2 text-3xl font-extrabold text-[#071a3d] dark:text-white sm:text-4xl lg:text-[40px] tracking-tight">
            Built for ambitious businesses across industries.
          </h2>
        </div>

        {/* Infinite Horizontal Industry Scrolling Carousel */}
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee flex gap-6 whitespace-nowrap py-4">
            {[...INDUSTRIES, ...INDUSTRIES].map((ind, i) => (
              <div
                key={i}
                className="relative h-64 w-80 shrink-0 overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#0b1c3d] p-5 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:border-[#00a651]/30 hover:shadow-md"
              >
                <div className="absolute inset-0 z-0">
                  <img
                    src={ind.img}
                    alt={ind.name}
                    className="h-full w-full object-cover opacity-15 dark:opacity-10 transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0b1c3d] via-transparent to-transparent"></div>
                </div>

                <div className="relative z-10 flex h-full flex-col justify-end">
                  <h3 className="text-xl font-bold text-[#071a3d] dark:text-white">{ind.name}</h3>
                  <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    {ind.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          6. HOW WE WORK (BLUEPRINT)
          ==================================================== */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:px-8 lg:py-20">
        <ScrollReveal direction="up">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00a651]">Our Blueprint</span>
            <h2 className="mt-2 text-3xl font-extrabold text-[#071a3d] dark:text-white sm:text-4xl lg:text-[40px] tracking-tight">
              The growth pipeline. Step by step.
            </h2>
          </div>
        </ScrollReveal>

        {/* Process Grid */}
        <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {PROCESS_STEPS.map((step, i) => (
            <ScrollReveal direction="up" delay={i * 100} key={i}>
              <div
                onMouseEnter={() => setActiveStep(i)}
                className={`relative h-full flex flex-col justify-between rounded-2xl border p-6 transition-all duration-500 ${
                  activeStep === i
                    ? "bg-[#071a3d] border-[#00a651] text-white shadow-xl -translate-y-1.5"
                    : "bg-white dark:bg-[#0b1c3d] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 shadow-sm"
                }`}
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className={`text-xs font-bold tracking-widest transition-colors ${activeStep === i ? 'text-[#00a651]' : 'text-slate-400'}`}>
                      {step.num}
                    </span>
                    <span className={`h-2.5 w-2.5 rounded-full transition-all duration-500 ${
                      activeStep >= i ? 'bg-[#00a651] scale-125' : 'bg-slate-300 dark:bg-slate-700'
                    }`}></span>
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${activeStep === i ? 'text-white' : 'text-[#071a3d] dark:text-white'}`}>{step.name}</h3>
                  <p className={`text-xs leading-relaxed ${activeStep === i ? 'text-slate-300' : 'text-slate-600 dark:text-slate-300'}`}>{step.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ====================================================
          7. AI + AUTOMATION SECTION
          ==================================================== */}
      <section className="relative mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:px-8 lg:py-20">
        <ScrollReveal direction="up">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1c3d] p-8 md:p-12 overflow-hidden relative shadow-sm transition-colors duration-300">
            
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00a651]">AI Integration</span>
              <h2 className="mt-2 text-3xl font-extrabold text-[#071a3d] dark:text-white sm:text-4xl lg:text-[40px] tracking-tight">
                AI-powered growth &amp; automation.
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-slate-600 dark:text-slate-300 text-base">
                We sync lead captures to AI models, instant WhatsApp sequences, and CRM triggers to maximize conversion rates on auto-pilot.
              </p>
            </div>

            {/* Central AI diagram */}
            <div className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:gap-12">
              
              {/* Connected Node Visualizer */}
              <div className="relative flex flex-wrap items-center justify-center gap-4 py-6 max-w-2xl">
                {[
                  { label: "Lead", icon: <Mail size={20} className="text-[#0d60c4]" /> },
                  { label: "AI Routing", icon: <Bot size={20} className="text-[#00a651]" />, active: true },
                  { label: "WhatsApp", icon: (
                    <svg className="h-5 w-5 text-[#00a651]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.077 4.928C17.191 3.041 14.683 2 12.006 2 6.499 2 2.006 6.493 2.006 12c0 1.76.46 3.483 1.333 5l-1.333 4.86 5.013-1.313c1.452.793 3.087 1.207 4.78 1.207h.004c5.507 0 10-4.493 10-10 0-2.677-1.041-5.185-2.926-7.072z"></path>
                    </svg>
                  ) },
                  { label: "CRM Sync", icon: <Settings size={20} className="text-slate-400" /> },
                  { label: "Email Seq", icon: <Mail size={20} className="text-[#0d60c4]" /> },
                  { label: "Conversion", icon: <Zap size={20} className="text-[#00a651]" />, active: true },
                ].map((node, i) => (
                  <div
                    key={i}
                    className={`flex flex-col items-center gap-2.5 rounded-2xl border p-4 bg-[#071a3d] text-white min-w-[100px] transition-all duration-500 hover:border-[#00a651]/60 hover:-translate-y-1 ${
                      node.active ? "border-[#00a651] shadow-lg shadow-[#00a651]/20 animate-pulse-node" : "border-white/10"
                    }`}
                  >
                    <span className="transition-transform duration-500 hover:scale-110">{node.icon}</span>
                    <span className="text-xs font-bold text-slate-200">{node.label}</span>
                  </div>
                ))}
              </div>

              {/* Float badges detail */}
              <div className="space-y-3.5 max-w-sm">
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 p-4 transition-all hover:bg-white dark:hover:bg-slate-800 hover:border-[#00a651]/40 shadow-sm flex gap-3">
                  <Bot size={16} className="text-[#00a651] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#00a651]">AI Lead Agent</span>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Instantly drafts context-aware replies to incoming WhatsApp inquiries.</p>
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 p-4 transition-all hover:bg-white dark:hover:bg-slate-800 hover:border-[#0d60c4]/40 shadow-sm flex gap-3">
                  <TrendingUp size={16} className="text-[#0d60c4] dark:text-[#00a651] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#0d60c4] dark:text-[#00a651]">n8n Automated CRM</span>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Saves lead coordinates directly to spreadsheets and client panels.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ====================================================
          8. COURSES / MENTORSHIP SECTION
          ==================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          
          {/* Course Details Left */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal direction="left">
              <div className="space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#00a651]">
                  20+ Week Mentorship Program
                </span>
                <h2 className="text-3xl font-extrabold text-[#071a3d] dark:text-white sm:text-4xl lg:text-[40px] tracking-tight">
                  Learn the same playbooks we run on client accounts.
                </h2>
                <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
                  Our Digital Marketing Course covers everything from baseline SEO to paid advertising campaigns, conversion funnels, and AI automation workflows. Live sessions, lifetime access.
                </p>

                {/* Course mini stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1c3d] p-4 shadow-sm">
                    <p className="text-2xl font-bold text-[#00a651]">47+</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Live Sessions</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1c3d] p-4 shadow-sm">
                    <p className="text-2xl font-bold text-[#071a3d] dark:text-white">20+</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Real Projects</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1c3d] p-4 shadow-sm">
                    <p className="text-2xl font-bold text-[#0d60c4] dark:text-[#00a651]">5</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Milestones</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1c3d] p-4 shadow-sm">
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
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#071a3d] dark:border-slate-600 bg-white dark:bg-slate-800 px-6 py-3 text-sm font-semibold text-[#071a3d] dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm"
                  >
                    Reserve Your Seat
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Module Cards Right */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Program Modules (Click to compare)
            </h3>
            
            <div className="grid gap-4 sm:grid-cols-2">
              {COURSE_MODULES.map((mod, i) => (
                <ScrollReveal direction="up" delay={i * 100} key={i}>
                  <div className="group relative block overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1c3d] p-5 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-[#00a651]/40 hover:shadow-md">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-xs font-bold text-[#071a3d] dark:text-slate-200 transition-colors">
                        {mod.num}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">Module</span>
                    </div>

                    <h4 className="text-base font-bold text-[#071a3d] dark:text-white group-hover:text-[#00a651] transition-colors">
                      {mod.title}
                    </h4>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 mb-3">{mod.subtitle}</p>

                    <div className="flex flex-wrap gap-1.5">
                      {mod.topics.map((t, idx) => (
                        <span key={idx} className="rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-[10px] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ====================================================
          9. TOOLS & TECHNOLOGY PARTNERS (MARQUEE)
          ==================================================== */}
      <section className="relative py-12 overflow-hidden border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1c3d] shadow-sm transition-colors duration-300">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Integrations</span>
          <h3 className="text-base font-bold text-[#071a3d] dark:text-white">Tools &amp; Technology Partners</h3>
        </div>

        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee flex gap-8 whitespace-nowrap items-center">
            {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-5 py-2.5 transition-all duration-300 hover:scale-105 hover:border-[#00a651]/40 hover:bg-white dark:hover:bg-slate-800 shadow-sm"
              >
                {getPartnerIcon(p.name)}
                <span className="text-xs font-bold text-[#071a3d] dark:text-slate-200">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          10. FAQ SECTION
          ==================================================== */}
      <section id="faq" className="mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          
          {/* FAQ Headline Left */}
          <div className="lg:col-span-5 space-y-4">
            <ScrollReveal direction="left">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#00a651]">FAQ</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071a3d] dark:text-white tracking-tight">
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
                <div
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1c3d] shadow-sm overflow-hidden transition-all duration-300 hover:border-[#00a651]/40"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="flex w-full items-center justify-between px-6 py-4.5 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <span className="text-base font-bold text-[#071a3d] dark:text-white">{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-slate-400 transition-transform duration-300 ${
                        activeFaq === i ? "rotate-180 text-[#00a651]" : ""
                      }`}
                    />
                  </button>
                  
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      activeFaq === i ? "max-h-40 border-t border-slate-100 dark:border-slate-800 py-4 px-6" : "max-h-0"
                    }`}
                  >
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
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
          11. FINAL CTA BANNER
          ==================================================== */}
      <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <ScrollReveal direction="scale">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#071a3d] via-[#0b2857] to-[#071a3d] px-6 py-12 text-center shadow-2xl md:px-12 md:py-16 text-white">
            <BubbleEffect />
            
            {/* Background Grid */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            {/* Glow spots */}
            <div className="absolute top-1/2 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00a651]/20 blur-3xl"></div>

            <span className="text-xs font-bold uppercase tracking-widest text-[#00a651]">Let's Work Together</span>
            <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-extrabold text-white sm:text-4xl md:text-5xl leading-tight relative z-10">
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
