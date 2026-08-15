"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { BUSINESS_CONFIG } from "@/components/businessConfig";
import JSONLD from "@/components/JSONLD";
import {
  Megaphone,
  BarChart3,
  Bot,
  Video,
  Globe,
  Check,
  Clock,
  ChevronRight,
  ArrowRight,
  Zap
} from "lucide-react";

const SERVICES_DATA = [
  {
    id: "social-media",
    title: "Social Media Mastery & Strategy",
    color: "from-[#00a651]/10 to-[#0d60c4]/10 border-[#00a651]/20 text-[#00a651]",
    description: "Social media management, strategy, content design, and platform-specific audits to drive high-impact engagement.",
    image: "/images/services/reels-content.webp",
    services: [
      "Social Media Strategy",
      "Account Setup & Optimization",
      "Content Creation",
      "Content Calendar Planning",
      "Social Media Management",
      "Audience Engagement",
      "Influencer Marketing",
      "Analytics & Reporting",
      "Brand Monitoring",
      "Hashtag & Trend Research",
      "Social Media Audit",
    ],
  },
  {
    id: "meta-ads",
    title: "Meta & Google Ads Scaling",
    color: "from-[#0d60c4]/10 to-[#071a3d]/10 border-[#0d60c4]/20 text-[#0d60c4]",
    description: "Paid advertising campaigns designed to decrease customer acquisition costs (CPA) and print predictable growth.",
    image: "/images/services/ads-growth.webp",
    services: [
      "Meta Ads Strategy & Planning",
      "Campaign Setup & Structure",
      "Audience Research & Targeting",
      "Creative Design",
      "A/B Testing",
      "Pixel Setup & Tracking",
      "Retargeting Campaigns",
      "Lead Generation Ads",
      "E-commerce Ads",
      "Budget Management",
      "Performance Monitoring",
      "Detailed Reporting",
    ],
  },
  {
    id: "ai-automation",
    title: "AI & Automation Nodes",
    color: "from-[#00a651]/10 to-[#071a3d]/10 border-[#00a651]/20 text-[#00a651]",
    description: "Build custom chatbots, CRM routing, email automation, and automated WhatsApp trigger flows for 24/7 lead operations.",
    image: "/images/services/ai-automation.webp",
    services: [
      "AI Chatbot Development",
      "Lead Generation Automation",
      "Email & WhatsApp Automation",
      "AI Content Generation",
      "Workflow Integration",
    ],
  },
  {
    id: "video-editing",
    title: "Video Editing & Reels",
    color: "from-[#0d60c4]/10 to-[#00a651]/10 border-[#0d60c4]/20 text-[#0d60c4]",
    description: "Short-form video editing, ad creatives, subtitle synchronization, sound design, and bulk post-production.",
    image: "/images/showcase/reels-showcase.svg",
    services: [
      "Social Media Video Editing",
      "Reels & Shorts Editing",
      "YouTube Video Editing",
      "Ad Video Editing",
      "Corporate Videos",
      "Color Correction",
      "Sound Design",
      "Subtitle & Captioning",
      "Platform Optimization",
      "Raw Footage Editing",
      "Bulk Video Editing",
    ],
  },
  {
    id: "web-development",
    title: "Web & Funnel Development",
    color: "from-[#00a651]/10 to-[#0d60c4]/10 border-[#00a651]/20 text-[#00a651]",
    description: "Fast, modern, SEO-optimized landing pages and full-stack custom web applications that convert traffic.",
    image: "/images/services/web-development.jpg",
    services: [
      "Landing Page Design",
      "Business Website (5-7 Pages)",
      "E-Commerce Website",
      "Custom Web Applications",
      "UI/UX Design",
      "Front-End Development",
      "Back-End Integration",
      "CMS Setup",
      "Website Maintenance",
      "Performance Optimization",
      "Security Audits",
    ],
  },
];

const PACKAGES = [
  {
    name: "Starter Funnel",
    tier: "Foundational Lead Engine",
    time: "7-10 Days",
    desc: "Single high-converting landing page with pixel CAPI tracking, form routing & initial ad campaign setup.",
    color: "border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1c3d] text-slate-700 dark:text-slate-100 shadow-sm",
    accent: "text-[#00a651]",
    features: [
      "1 Custom High-Converting Landing Page",
      "Mobile Responsive UI Architecture",
      "Meta Pixel & GA4 CAPI Integration",
      "Inquiry Lead Form + Email Alerts",
      "WhatsApp Chat Trigger Button",
      "1 Campaign Meta Ad Structure Setup",
      "1 Revision Round",
    ],
  },
  {
    name: "Growth Engine",
    tier: "Full Stack Growth",
    time: "14-21 Days",
    desc: "Complete business website, Meta + Google Ads matrix, video reels editing & automated CRM lead routing.",
    color: "border-[#00a651]/40 bg-[#071a3d] text-white shadow-xl relative scale-105",
    badge: "MOST POPULAR",
    accent: "text-[#00a651]",
    features: [
      "5-7 Custom Website Pages (Next.js/React)",
      "Reels & Short Video Editing (4 Videos)",
      "Meta & Google Ads Campaign Setup",
      "n8n / WhatsApp AI Lead Routing",
      "Premium Modern Design Grid",
      "Contact Form + Email Notification",
      "WhatsApp Business Setup",
      "Advanced SEO Optimization",
      "Google Analytics (GA4) Integration",
      "Social Media Embeds",
      "3 Revision Rounds",
    ],
  },
  {
    name: "E-Commerce",
    tier: "Online Store",
    time: "30-45 Days",
    desc: "Full-featured shopping platform for D2C scaling brands.",
    color: "border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1c3d] text-slate-700 dark:text-slate-100 shadow-sm",
    accent: "text-[#0d60c4]",
    features: [
      "10+ Responsive Pages",
      "Product Catalog & Search Filters",
      "Cart + Checkout Pages",
      "Razorpay / Stripe Payment Gateway",
      "Automated Order Management",
      "Inventory Tracking Node",
      "Customer Accounts",
      "Full SEO Optimization",
      "5 Revision Rounds",
    ],
  },
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function ServicesClient() {
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setActiveTab("all");
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 150);
      }
    };

    handleHashScroll();
    window.addEventListener("hashchange", handleHashScroll);
    return () => window.removeEventListener("hashchange", handleHashScroll);
  }, []);

  const filteredServices =
    activeTab === "all"
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => s.id === activeTab);

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
  ];

  const getCategoryIcon = (id: string) => {
    const size = 32;
    switch (id) {
      case "social-media":
        return <Megaphone size={size} className="text-[#00a651]" />;
      case "meta-ads":
        return <BarChart3 size={size} className="text-[#0d60c4]" />;
      case "ai-automation":
        return <Bot size={size} className="text-[#00a651]" />;
      case "video-editing":
        return <Video size={size} className="text-[#0d60c4]" />;
      case "web-development":
        return <Globe size={size} className="text-[#00a651]" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#050c1a] text-slate-800 dark:text-slate-100 px-4 py-16 sm:px-6 lg:px-8 transition-colors duration-300">
      <JSONLD type="Breadcrumb" data={{ items: breadcrumbs }} />
      
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 -z-10 h-72 w-72 rounded-full bg-[#00a651]/5 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-72 w-72 rounded-full bg-[#0d60c4]/5 blur-3xl"></div>

      <div className="mx-auto max-w-7xl">
        
        {/* Page Header */}
        <div className="mb-16 text-center">
          <ScrollReveal direction="fade" delay={100}>
            <span className="inline-flex items-center rounded-full border border-[#00a651]/30 bg-[#00a651]/10 px-3.5 py-1 text-xs font-bold text-[#00a651] mb-4">
              Our Offerings
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={200}>
            <h1 className="text-4xl font-extrabold text-[#071a3d] dark:text-white sm:text-5xl lg:text-6xl">
              Comprehensive{" "}
              <span className="bg-gradient-to-r from-[#0d60c4] via-[#00a651] to-[#0d60c4] bg-clip-text text-transparent">
                Digital Growth
              </span>{" "}
              Services
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={300}>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300 sm:text-lg">
              From performance ad campaigns and high-converting Reels editing to autonomous AI automations and lead funnels, we execute end-to-end growth strategies.
            </p>
          </ScrollReveal>

          {/* Interactive Category Filter Pills */}
          <ScrollReveal direction="fade" delay={400}>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setActiveTab("all")}
                className={`rounded-full px-5 py-2 text-xs font-extrabold transition-all duration-300 ${
                  activeTab === "all"
                    ? "bg-gradient-to-r from-[#0d60c4] to-[#00a651] text-white shadow-md shadow-[#00a651]/20 scale-105"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-[#00a651]/50"
                }`}
              >
                All Services
              </button>
              {SERVICES_DATA.map((srv) => (
                <button
                  key={srv.id}
                  onClick={() => setActiveTab(srv.id)}
                  className={`rounded-full px-5 py-2 text-xs font-extrabold transition-all duration-300 ${
                    activeTab === srv.id
                      ? "bg-gradient-to-r from-[#0d60c4] to-[#00a651] text-white shadow-md shadow-[#00a651]/20 scale-105"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-[#00a651]/50"
                  }`}
                >
                  {srv.title.split(" ")[0]} {srv.title.split(" ")[1]}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Services List */}
        <div className="space-y-16">
          {filteredServices.map((cat, idx) => (
            <ScrollReveal direction="up" delay={idx * 100} key={cat.id}>
              <div
                id={cat.id}
                className="scroll-mt-24 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0b1c3d] p-8 shadow-sm transition-all duration-300 hover:border-white/20"
              >
                <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
                  
                  {/* Category Info */}
                  <div className="lg:col-span-5 space-y-4">
                    {cat.image && (
                      <div className="overflow-hidden rounded-2xl border border-slate-100 dark:border-white/10 aspect-video w-full bg-slate-900 shadow-md">
                        <img
                          src={cat.image}
                          alt={cat.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    )}

                    <div className="inline-flex p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10">
                      {getCategoryIcon(cat.id)}
                    </div>
                    
                    <h2 className="text-2xl font-extrabold text-[#071a3d] dark:text-white sm:text-3xl">
                      {cat.title}
                    </h2>
                    
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                      {cat.description}
                    </p>

                    <div className="pt-4">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0d60c4] to-[#00a651] px-6 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:scale-105"
                      >
                        <span>Request Service Blueprint</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>

                  {/* Sub-services Grid */}
                  <div className="lg:col-span-7">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#00a651] mb-4">
                      Included Capabilities
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {cat.services.map((srvName, sIdx) => {
                        const slug = slugify(srvName);
                        return (
                          <Link
                            key={sIdx}
                            href={`/services/${slug}`}
                            className="group flex items-center justify-between rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-[#050c1a]/60 p-3.5 transition-all hover:border-[#00a651]/40 hover:bg-white dark:hover:bg-[#071a3d]"
                          >
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 group-hover:text-[#00a651]">
                              {srvName}
                            </span>
                            <ChevronRight size={14} className="text-slate-400 group-hover:text-[#00a651] transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Development & Growth Packages */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00a651]">Transparent Execution</span>
            <h2 className="text-3xl font-extrabold text-[#071a3d] dark:text-white sm:text-4xl mt-1">
              Curated Growth Packages
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Clear scope packages engineered for predictable turnarounds.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3 items-stretch">
            {PACKAGES.map((pkg, idx) => (
              <ScrollReveal direction="up" delay={idx * 100} key={idx}>
                <div className={`rounded-3xl p-8 flex flex-col justify-between h-full border transition-all ${pkg.color}`}>
                  {pkg.badge && (
                    <span className="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-[#0d60c4] to-[#00a651] px-3.5 py-1 text-[10px] font-extrabold text-white uppercase tracking-wider shadow-md">
                      {pkg.badge}
                    </span>
                  )}
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-extrabold">{pkg.name}</h3>
                      <span className="text-[11px] font-extrabold text-[#00a651] flex items-center gap-1">
                        <Clock size={12} />
                        {pkg.time}
                      </span>
                    </div>
                    <p className={`text-xs font-bold mt-1 ${pkg.accent}`}>{pkg.tier}</p>
                    <p className="mt-3 text-xs leading-relaxed opacity-90">{pkg.desc}</p>

                    <div className="mt-6 pt-6 border-t border-slate-200 dark:border-white/10 space-y-2.5">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider opacity-70 block mb-2">
                        Deliverable Features
                      </span>
                      {pkg.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs font-medium">
                          <Check size={14} className="text-[#00a651] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4">
                    <Link
                      href="/contact"
                      className="block w-full text-center rounded-full bg-gradient-to-r from-[#0d60c4] to-[#00a651] py-3 text-xs font-bold text-white shadow-md transition-all hover:scale-105"
                    >
                      Book Strategy Call
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
