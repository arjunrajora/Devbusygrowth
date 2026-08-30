"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
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
  ChevronLeft,
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
    img: "/images/services/video-editing.jpg",
    color: "from-[#00a651]/10 to-transparent border-[#00a651]/10"
  },
  {
    num: "02",
    title: "Paid Ads",
    desc: "Meta & Google Ads structures, creative testing grids, pixel tracking & scaling budgets.",
    link: "/services#meta-ads",
    img: "/images/services/meta-google-ads.jpg",
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
  {
    category: "TECHNOLOGY & SAAS",
    name: "Technology & SaaS",
    img: "/images/industries/tech-saas-card.jpg",
    desc: "Modern websites, web applications, AI integrations and scalable digital platforms."
  },
  {
    category: "E-COMMERCE",
    name: "E-Commerce",
    img: "/images/industries/ecommerce-card.jpg",
    desc: "High-converting storefronts, automation, marketing systems and customer experiences."
  },
  {
    category: "REAL ESTATE",
    name: "Real Estate",
    img: "/images/industries/realestate-card.jpg",
    desc: "Property websites, lead-generation systems, CRM automation and digital marketing."
  },
  {
    category: "HEALTHCARE",
    name: "Healthcare",
    img: "/images/industries/healthcare-card.jpg",
    desc: "Professional digital experiences, appointment systems, automation and patient engagement."
  },
  {
    category: "EDUCATION",
    name: "Education",
    img: "/images/industries/education-card.jpg",
    desc: "Course platforms, learning websites, student portals and automated lead systems."
  },
  {
    category: "PROFESSIONAL SERVICES",
    name: "Professional Services",
    img: "/images/industries/prof-services-card.jpg",
    desc: "Premium websites, lead generation, branding and business automation."
  }
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

export default function HomeClient() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [messages, setMessages] = useState<Array<{ sender: string; text: string; time: string; avatar?: string }>>([]);
  const [isTyping, setIsTyping] = useState(true);

  // Industry Drag Slider state
  const industriesSliderRef = useRef<HTMLDivElement>(null);
  const [isDraggingIndustries, setIsDraggingIndustries] = useState(false);
  const [startXIndustries, setStartXIndustries] = useState(0);
  const [scrollLeftIndustries, setScrollLeftIndustries] = useState(0);

  const handleIndustriesMouseDown = (e: React.MouseEvent) => {
    if (!industriesSliderRef.current) return;
    setIsDraggingIndustries(true);
    setStartXIndustries(e.pageX - industriesSliderRef.current.offsetLeft);
    setScrollLeftIndustries(industriesSliderRef.current.scrollLeft);
  };

  const handleIndustriesMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingIndustries || !industriesSliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - industriesSliderRef.current.offsetLeft;
    const walk = (x - startXIndustries) * 1.8;
    industriesSliderRef.current.scrollLeft = scrollLeftIndustries - walk;
  };

  const scrollIndustries = (direction: 'left' | 'right') => {
    if (!industriesSliderRef.current) return;
    const scrollAmount = direction === 'left' ? -340 : 340;
    industriesSliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

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
    <div className="relative min-h-screen overflow-hidden bg-[#050c1a] text-slate-100 transition-colors duration-300 font-sans">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 -z-50 bg-grid-pattern opacity-80 pointer-events-none"></div>
      <div className="fixed inset-0 -z-50 bg-dot-pattern opacity-40 pointer-events-none"></div>
      <div className="fixed -right-40 top-20 -z-50 h-[500px] w-[500px] rounded-full bg-[#0d60c4]/15 blur-3xl pointer-events-none"></div>
      <div className="fixed -left-40 bottom-20 -z-50 h-[500px] w-[500px] rounded-full bg-[#00a651]/15 blur-3xl pointer-events-none"></div>

      {/* ====================================================
          1. HERO SECTION WITH FUTURISTIC 3D VR VISUAL STAGE
          ==================================================== */}
      <section className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-20 overflow-hidden">
        <BubbleEffect />
        
        {/* Subtle Glowing Cyan/Blue Ambient Light */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#0d60c4]/20 via-[#00a651]/15 to-transparent rounded-full blur-[140px] pointer-events-none animate-pulse [animation-duration:6s]" />
        
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center relative z-10">
          
          {/* Left Content (Clean Bold Layout with High-Impact Headline & Dual CTAs) */}
          <div className="space-y-6 lg:col-span-6 text-left">
            <ScrollReveal direction="fade" delay={100}>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#00a651]/40 bg-[#00a651]/10 px-4 py-1.5 text-xs font-bold tracking-wide text-[#00a651] shadow-[0_0_15px_rgba(0,166,81,0.2)]">
                <Zap size={13} className="text-[#00a651] shrink-0" />
                <span>Next-Gen Performance • AI • Growth Agency</span>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={200}>
              <h1 className="font-sans text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[62px]">
                We build digital experiences that generate{" "}
                <span className="bg-gradient-to-r from-[#0d60c4] via-[#00a651] to-[#0d60c4] bg-clip-text text-transparent font-black">
                  predictable growth.
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={300}>
              <p className="max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                A hands-on performance marketing team in Jaipur. We run Meta &amp; Google Ads, edit high-converting Reels, and build 24/7 AI automation nodes for scaling brands.
              </p>
            </ScrollReveal>

            {/* CTAs (Neon Glowing Primary + Ghost Secondary) */}
            <ScrollReveal direction="up" delay={400}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/contact"
                  className="btn-primary-green text-base px-8 py-4 shadow-[0_0_30px_rgba(0,166,81,0.55)] hover:shadow-[0_0_40px_rgba(0,166,81,0.75)] transition-all duration-300 group"
                >
                  <span>Book a Strategy Call</span>
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/services"
                  className="btn-secondary-glass text-base px-7 py-4 group hover:border-[#00a651]/50 transition-all duration-300"
                >
                  <span>Explore Services</span>
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </ScrollReveal>

            {/* Feature Pills */}
            <ScrollReveal direction="fade" delay={500}>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <span className="rounded-full border border-white/10 bg-slate-900/90 px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:border-[#00a651]/40 shadow-sm transition-colors">Video Editing &amp; Reels</span>
                <span className="rounded-full border border-white/10 bg-slate-900/90 px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:border-[#00a651]/40 shadow-sm transition-colors">Meta &amp; Google Ads</span>
                <span className="rounded-full border border-white/10 bg-slate-900/90 px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:border-[#00a651]/40 shadow-sm transition-colors">AI &amp; WhatsApp Nodes</span>
                <span className="rounded-full border border-white/10 bg-slate-900/90 px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:border-[#00a651]/40 shadow-sm transition-colors">Lead Gen Funnels</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Floating 3D VR Cyberpunk Stage & Live Simulation */}
          <div className="lg:col-span-6 relative mt-8 lg:mt-0">
            <ScrollReveal direction="scale" delay={300}>
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="relative mx-auto w-full max-w-lg overflow-hidden rounded-3xl border border-white/15 bg-[#071a3d]/90 p-3 sm:p-4 shadow-[0_20px_50px_rgba(7,26,61,0.7)] backdrop-blur-xl group hover:border-[#00a651]/50 transition-all duration-500"
              >
                
                {/* Visual Header Strip */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 mb-3 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                    <span className="ml-2 font-semibold text-slate-300">Live Client Ecosystem</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#00a651] bg-[#00a651]/10 px-2 py-0.5 rounded-full border border-[#00a651]/30">
                    CAPI Sync Active
                  </span>
                </div>

                {/* Hero 3D VR Cyberpunk Image Showcase */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-white/10 bg-[#050c1a] shadow-[0_0_35px_rgba(13,96,196,0.4)]">
                  <Image
                    src="/images/hero_visual.jpg"
                    alt="TheBusyGrowth Futuristic VR AI Digital Matrix Engine"
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    priority
                    sizes="(max-width: 1024px) 100vw, 600px"
                  />
                  {/* Soft Dark Gradient Overlay for Crisp Text & Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050c1a]/60 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Simulated Live Lead Flow Widget */}
                <div className="mt-3 rounded-2xl border border-white/10 bg-[#050c1a]/95 p-3 sm:p-4 shadow-lg text-left">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                    <div className="flex items-center gap-2">
                      <MessageCircle size={14} className="text-[#00a651]" />
                      <span className="text-xs font-extrabold text-white">Live Inbound Simulation</span>
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#00a651]">Jaipur Agency HQ</span>
                  </div>

                  <div className="space-y-2 min-h-[90px]">
                    {messages.map((msg, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex items-start gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {msg.sender === 'user' ? (
                          <div className="rounded-2xl rounded-tr-none bg-[#0d60c4] px-3 py-1.5 text-xs text-white max-w-[85%]">
                            <p className="font-medium text-[11px]">{msg.text}</p>
                            <span className="text-[8px] text-white/70 block text-right mt-0.5">{msg.time}</span>
                          </div>
                        ) : msg.sender === 'system' ? (
                          <div className="rounded-xl bg-[#071a3d] border border-[#00a651]/30 px-2.5 py-1 text-[10px] text-[#00a651] font-bold w-full text-center">
                            {msg.text}
                          </div>
                        ) : (
                          <div className="rounded-2xl rounded-tl-none bg-[#00a651]/20 border border-[#00a651]/30 px-3 py-1.5 text-xs text-slate-100 max-w-[85%]">
                            <p className="font-semibold text-[11px] text-[#00a651]">Senior Performance Lead</p>
                            <p className="font-medium text-[11px] text-slate-200">{msg.text}</p>
                            <span className="text-[8px] text-slate-400 block text-right mt-0.5">{msg.time}</span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                    {isTyping && (
                      <div className="flex items-center gap-1.5 text-[10px] text-[#00a651] font-semibold pl-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#00a651] animate-ping" />
                        <span>AI Assistant is responding...</span>
                      </div>
                    )}
                  </div>
                </div>

              </motion.div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ====================================================
          2. STATS BAR SECTION
          ==================================================== */}
      <section className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="grid grid-cols-2 gap-4 rounded-3xl border border-white/10 bg-[#0b1c3d] p-6 shadow-sm sm:grid-cols-4 md:p-8">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-extrabold text-white sm:text-4xl">
                  <AnimatedCounter
                    targetValue={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals || 0}
                  />
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ====================================================
          3. REAL ESTATE SPECIALIZED LEAD SECTION
          ==================================================== */}
      <RealEstateLeadSection />

      {/* ====================================================
          4. SERVICES OVERVIEW GRID SECTION
          ==================================================== */}
      <section id="services" className="relative mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:px-8">
        <ScrollReveal direction="up">
          <div className="text-center mb-10 max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00a651]">Full-Stack Services</span>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight font-sans">
              Built to cover every growth touchpoint.
            </h2>
            <p className="text-sm text-slate-300">
              High-converting video editing, performance Meta &amp; Google ad structures, custom landing pages, and AI automations.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((srv, i) => (
            <ScrollReveal direction="up" delay={i * 80} key={i}>
              <Link href={srv.link} className="group block h-full">
                <div className="relative rounded-3xl border border-white/10 bg-[#0b1c3d] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 h-full flex flex-col justify-between overflow-hidden">
                  
                  {/* Background Service Graphic */}
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-5 border border-white/10 bg-[#050c1a]">
                    <Image
                      src={srv.img}
                      alt={srv.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 400px"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 rounded-lg bg-[#071a3d]/90 px-2.5 py-1 text-xs font-extrabold text-[#00a651] border border-white/10 backdrop-blur-md">
                      {srv.num}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-extrabold text-white group-hover:text-[#00a651] transition-colors">
                      {srv.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-300">
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
          5. AI AUTOMATION SECTION (FIXED VISUAL MOCKUP & BALANCED POSITION)
          ==================================================== */}
      <section className="relative mx-auto max-w-7xl px-4 py-8 sm:py-12 lg:px-8">
        <ScrollReveal direction="up">
          <div className="rounded-3xl border border-white/10 bg-[#0b1c3d] p-6 sm:p-10 md:p-12 overflow-hidden relative shadow-sm transition-colors duration-300">
            
            <div className="text-center mb-6 sm:mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00a651]">AI Integration</span>
              <h2 className="mt-1.5 text-3xl font-extrabold text-white sm:text-4xl tracking-tight font-sans">
                AI-powered growth &amp; automation.
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-slate-300 text-sm sm:text-base">
                We sync lead captures to AI models, instant WhatsApp sequences, and CRM triggers to maximize conversion rates on auto-pilot.
              </p>
            </div>

            {/* Responsive Layout Box */}
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              
              {/* Left Column: Device Mockup Phone Visual Container (7 Cols) */}
              <div className="lg:col-span-7 relative flex justify-center">
                <div className="relative w-full max-w-full rounded-2xl border-2 border-slate-800 bg-[#050c1a] p-2 shadow-2xl overflow-hidden">
                  
                  {/* Device Inner Display Screen */}
                  <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-xl overflow-hidden border border-white/10 bg-[#071a3d]">
                    <Image
                      src="/images/automation_workflow.jpg"
                      alt="AI Operations & Workflow Automation Screen Visual"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 700px"
                      priority
                    />
                    
                    {/* Floating Framer Motion status indicators inside stage */}
                    <div className="absolute inset-0 p-3 sm:p-5 flex flex-col justify-between z-10 pointer-events-none">
                      
                      {/* Floating Badge 1 */}
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="self-start rounded-xl border border-white/10 bg-[#050c1a]/95 px-3 py-1.5 shadow-lg flex items-center gap-2 pointer-events-auto backdrop-blur-md"
                      >
                        <span className="h-2 w-2 rounded-full bg-[#00a651] animate-ping" />
                        <span className="text-[10px] font-bold text-slate-200">AI Agent Active • Online</span>
                      </motion.div>

                      {/* Floating Badge 2 */}
                      <motion.div
                        animate={{ y: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                        className="self-end rounded-xl border border-white/10 bg-[#050c1a]/95 px-3 py-1.5 shadow-lg flex items-center gap-2 pointer-events-auto backdrop-blur-md"
                      >
                        <Bot size={13} className="text-[#00a651]" />
                        <div className="text-left">
                          <p className="text-[9px] font-bold text-slate-200">Lead Qualified</p>
                          <p className="text-[8px] text-[#00a651] font-semibold">+1 New Lead</p>
                        </div>
                      </motion.div>

                      {/* Floating Badge 3 */}
                      <motion.div
                        animate={{ y: [0, -3.5, 0] }}
                        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                        className="self-start rounded-xl border border-white/10 bg-[#050c1a]/95 px-3 py-1.5 shadow-lg flex items-center gap-2 pointer-events-auto backdrop-blur-md"
                      >
                        <MessageCircle size={13} className="text-blue-400" />
                        <div className="text-left">
                          <p className="text-[9px] font-bold text-slate-200">WhatsApp Sent</p>
                          <p className="text-[8px] text-slate-400">2 sec ago</p>
                        </div>
                      </motion.div>

                    </div>
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
                        <h4 className="text-xs font-extrabold text-slate-100">{step.title}</h4>
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
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mt-1 font-sans">
                From Attention to Enquiry. Automatically.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
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
                  <div key={idx} className="rounded-xl border border-white/10 bg-[#071a3d]/50 p-2 group hover:border-[#00a651]/30">
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
                  sizes="(max-width: 1024px) 100vw, 600px"
                  loading="lazy"
                />
                
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
          7. INDUSTRIES SECTION ("Built for ambitious businesses across industries.")
          ==================================================== */}
      <section id="industries" className="relative py-20 lg:py-28 bg-[#050c1a] text-white overflow-hidden border-t border-white/10">
        
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#0d60c4]/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#00a651]/5 rounded-full blur-[130px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <ScrollReveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#00a651]/10 border border-[#00a651]/30 text-[#00a651] text-xs font-bold uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00a651] animate-ping" />
                <span>BUILT FOR EVERY INDUSTRY</span>
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-sans leading-tight">
                Built for ambitious businesses across industries.
              </h2>
              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
                From startups to established enterprises, we build digital experiences, automation systems, and growth solutions designed around your business goals.
              </p>
            </div>
          </ScrollReveal>

          {/* Industry Cards Grid: 3 per row desktop, 2 tablet, 1 mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INDUSTRIES.map((ind, i) => (
              <ScrollReveal key={ind.name} direction="up" delay={i * 90}>
                <div className="group relative rounded-[22px] border border-white/10 bg-[#071a3d] overflow-hidden min-h-[360px] sm:min-h-[400px] flex flex-col justify-end p-7 shadow-xl transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[#00a651]/40 hover:shadow-[0_15px_35px_rgba(0,166,81,0.22)]">
                  
                  {/* Background Image */}
                  <Image
                    src={ind.img}
                    alt={ind.name}
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-out transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 420px"
                    loading="lazy"
                  />

                  {/* Top Category Label */}
                  <span className="absolute top-5 left-5 z-10 px-3 py-1 rounded-full bg-[#050c1a]/85 border border-[#00a651]/40 text-[11px] font-bold uppercase tracking-wider text-[#00a651] backdrop-blur-md">
                    {ind.category}
                  </span>

                  {/* Card Content */}
                  <div className="relative z-10 space-y-2.5 text-left bg-[#050c1a]/85 backdrop-blur-md p-4 rounded-xl border border-white/10">
                    <h3 className="text-2xl sm:text-[26px] font-bold text-white tracking-tight leading-snug group-hover:text-white transition-colors">
                      {ind.name}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                      {ind.desc}
                    </p>
                  </div>

                </div>
              </ScrollReveal>
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
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight font-sans">
                  Learn the same playbooks we run on client accounts.
                </h2>
                <p className="text-base leading-relaxed text-slate-300">
                  Our Digital Marketing Course covers everything from baseline SEO to paid advertising campaigns, conversion funnels, and AI automation workflows. Live sessions, lifetime access.
                </p>

                {/* Course mini stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/10 bg-[#0b1c3d] p-4 shadow-sm">
                    <p className="text-2xl font-bold text-[#00a651]">47+</p>
                    <p className="text-xs text-slate-400 font-medium">Live Sessions</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-[#0b1c3d] p-4 shadow-sm">
                    <p className="text-2xl font-bold text-white">20+</p>
                    <p className="text-xs text-slate-400 font-medium">Real Projects</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-[#0b1c3d] p-4 shadow-sm">
                    <p className="text-2xl font-bold text-[#00a651]">5</p>
                    <p className="text-xs text-slate-400 font-medium">Milestones</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-[#0b1c3d] p-4 shadow-sm">
                    <p className="text-2xl font-bold text-[#00a651]">Lifetime</p>
                    <p className="text-xs text-slate-400 font-medium">Access</p>
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
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-100 hover:bg-slate-700 shadow-sm"
                  >
                    Reserve Your Seat
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Module Cards Right with imagery overlays */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Program Modules
            </h3>
            
            <div className="grid gap-4 sm:grid-cols-2">
              {COURSE_MODULES.map((mod, i) => (
                <ScrollReveal direction="up" delay={i * 100} key={i}>
                  <div className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-[#0b1c3d] min-h-[220px] shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20">
                    
                    {/* Background image of course module */}
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={mod.img}
                        alt={mod.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 350px"
                        loading="lazy"
                      />
                    </div>

                    <div className="relative z-10 p-5 flex flex-col justify-between h-full">
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="rounded-md bg-slate-800 px-2 py-0.5 text-xs font-bold text-slate-200">
                            {mod.num}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Module</span>
                        </div>

                        <h4 className="text-base font-extrabold text-white group-hover:text-[#00a651] transition-colors">
                          {mod.title}
                        </h4>
                        <p className="mt-1 text-xs text-slate-300 mb-3">{mod.subtitle}</p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {mod.topics.map((t, idx) => (
                          <span key={idx} className="rounded-full bg-slate-900/60 px-2.5 py-0.5 text-[9px] text-slate-300 border border-white/5 font-semibold">
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
          <div className="rounded-3xl border border-white/10 bg-[#0b1c3d] p-6 sm:p-10 md:p-12 overflow-hidden relative shadow-sm">
            
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              
              {/* Left Column: Image with floating badges (7 Cols) */}
              <div className="lg:col-span-7 relative">
                <div className="relative rounded-2xl border border-white/10 bg-[#071a3d] overflow-hidden aspect-[16/10] shadow-xl">
                  <Image
                    src="/images/built_for_growth.jpg"
                    alt="Business Owner scaling operations using analytics"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 700px"
                    loading="lazy"
                  />

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
                      <span className="text-[10px] font-extrabold text-[#00a651]">3.8X ROAS Achieved</span>
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
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight font-sans">
                  For Founders, Creators &amp; Builders.
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
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
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight font-sans">
              Real founders. True growth stories.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, idx) => (
            <ScrollReveal direction="up" delay={idx * 80} key={idx}>
              <div className="rounded-2xl border border-white/10 bg-[#0b1c3d] p-6 shadow-sm flex flex-col justify-between h-full hover:border-white/20 transition-all">
                <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed text-left">
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
                    <h4 className="text-xs font-extrabold text-white leading-tight">{t.name}</h4>
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
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
                  Straight answers.
                  <span className="block text-slate-500 mt-1">Zero fluff.</span>
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
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
                <div className="rounded-2xl border border-white/10 bg-[#0b1c3d] shadow-sm overflow-hidden transition-all duration-300 hover:border-white/20">
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-slate-800/30"
                  >
                    <span className="text-sm sm:text-base font-bold text-white">{faq.q}</span>
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
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-300 text-left">
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
                className="btn-primary-green text-base px-9 py-4 shadow-[0_0_35px_rgba(0,166,81,0.6)] group"
              >
                <span>Book a Strategy Call</span>
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href={BUSINESS_CONFIG.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-glass text-base px-8 py-4 group"
              >
                <span>Talk on WhatsApp</span>
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}
