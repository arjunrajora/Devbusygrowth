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
    title: "Social Media Mastery",
    color: "from-[#00a651]/10 to-[#0d60c4]/10 border-[#00a651]/20 text-[#00a651]",
    description: "Social media management, strategy, content design, and platform-specific audits to drive high-impact engagement.",
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
    title: "Meta & Google Ads",
    color: "from-[#0d60c4]/10 to-[#071a3d]/10 border-[#0d60c4]/20 text-[#0d60c4]",
    description: "Paid advertising campaigns designed to decrease customer acquisition costs (CPA) and print predictable growth.",
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
    services: [
      "Landing Page Design",
      "Business Website (5-7 Pages)",
      "E-Commerce Store",
      "Custom Web Applications",
      "Responsive Design",
      "Next.js / React Dev",
      "Tailwind CSS Styling",
      "Framer Motion Animation",
      "Contact Form Integration",
      "Payment Gateway Setup",
      "WhatsApp API Integration",
      "SEO-Friendly Structure",
      "Google Analytics",
      "SSL Certificate",
      "Website Maintenance",
      "Website Redesign",
      "Speed Optimization",
      "Source Code Delivery",
    ],
  },
];

const PACKAGES = [
  {
    name: "Starter",
    tier: "Landing Page",
    time: "3-5 Days",
    desc: "Perfect for product launches and lead capture campaigns.",
    color: "border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1c3d] text-slate-700 dark:text-slate-100 shadow-sm",
    accent: "text-[#0d60c4]",
    features: [
      "1-Page Responsive Design",
      "Hero Section + Conversion CTA",
      "Contact Form",
      "WhatsApp Chat Trigger Integration",
      "Mobile Optimized",
      "SSL Certificate",
      "Basic SEO Meta Tags",
      "2 Revision Rounds",
    ],
  },
  {
    name: "Business Pro",
    tier: "Full Website",
    time: "7-10 Days",
    desc: "Complete online presence for service and local businesses.",
    color: "border-[#00a651] bg-white dark:bg-[#0b1c3d] ring-2 ring-[#00a651]/20 shadow-md",
    accent: "text-[#00a651]",
    popular: true,
    features: [
      "5-7 Responsive Pages",
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

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        // Ensure section is in DOM by showing all
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
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-600 dark:text-slate-300 sm:text-lg">
              From performance marketing strategies to automated CRM node deployments. Everything you need to scale.
            </p>
          </ScrollReveal>
        </div>

        {/* Tab Filters */}
        <ScrollReveal direction="fade" delay={400}>
          <div className="mb-12 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`rounded-full px-5 py-2 text-xs font-bold transition-all duration-300 ${
                activeTab === "all"
                  ? "bg-gradient-to-r from-[#0d60c4] to-[#00a651] text-white shadow-md scale-105"
                  : "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#071a3d] dark:hover:text-white"
              }`}
            >
              All Services
            </button>
            {SERVICES_DATA.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-5 py-2 text-xs font-bold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[#0d60c4] to-[#00a651] text-white shadow-md scale-105"
                    : "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#071a3d] dark:hover:text-white"
                }`}
              >
                {tab.title.split(" ")[0]}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Services Listing */}
        <div className="space-y-12">
          {filteredServices.map((cat, index) => (
            <ScrollReveal direction="up" delay={index * 100} key={cat.id}>
              <JSONLD type="Service" data={{ title: cat.title, description: cat.description }} />
              <section
                id={cat.id}
                className="scroll-mt-28 sm:scroll-mt-32 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1c3d] p-8 shadow-sm transition-all duration-500 hover:border-[#00a651]/40 hover:shadow-md"
              >
                {/* Category Header */}
                <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 dark:border-slate-800 pb-6">
                  <div className="flex items-center gap-3">
                    <span className="transition-transform duration-500 hover:scale-110">{getCategoryIcon(cat.id)}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-[#071a3d] dark:text-white">{cat.title}</h2>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 max-w-xl">{cat.description}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-bold text-slate-600 dark:text-slate-300">
                    {cat.services.length} services included
                  </span>
                </div>

                {/* Grid of services */}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {cat.services.map((srv, i) => {
                    const slug = slugify(srv);
                    return (
                      <Link
                        key={i}
                        href={`/services/${slug}`}
                        className="group flex items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 p-4 transition-all duration-300 hover:bg-white dark:hover:bg-slate-800 hover:border-[#00a651]/40 hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#00a651]/10 text-xs font-bold text-[#00a651] transition-colors group-hover:bg-[#00a651] group-hover:text-white font-mono">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-[#0d60c4] dark:group-hover:text-[#00a651] transition-colors">
                            {srv}
                          </span>
                        </div>
                        <ChevronRight size={14} className="text-slate-400 group-hover:text-[#00a651] transition-all group-hover:translate-x-1" />
                      </Link>
                    );
                  })}
                </div>
              </section>
            </ScrollReveal>
          ))}
        </div>

        {/* ====================================================
            WEB DEVELOPMENT PACKAGES
            ==================================================== */}
        <section className="mt-24">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00a651]">Fixed Cost Web Pricing</span>
              <h2 className="mt-2 text-3xl font-extrabold text-[#071a3d] dark:text-white sm:text-4xl">
                Web Development Packages
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm text-slate-600 dark:text-slate-300">
                Clear deliverables, fixed pricing. No surprises.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {PACKAGES.map((pkg, i) => (
              <ScrollReveal direction="up" delay={i * 100} key={pkg.name}>
                <div
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${pkg.color}`}
                >
                  {pkg.popular && (
                    <div className="absolute right-0 top-0">
                      <span className="rounded-bl-xl bg-gradient-to-r from-[#0d60c4] to-[#00a651] px-4 py-1.5 text-xs font-bold text-white shadow-md flex items-center">
                        <Zap size={10} className="mr-0.5 text-white animate-pulse" />
                        <span>Popular</span>
                      </span>
                    </div>
                  )}
                  
                  <div>
                    <div className="mb-6 border-b border-slate-100 dark:border-slate-800 pb-6 text-center">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{pkg.tier}</span>
                      <h3 className="mt-1 text-2xl font-bold text-[#071a3d] dark:text-white transition-colors group-hover:text-[#00a651]">{pkg.name}</h3>
                      <p className="mt-1.5 text-xs font-semibold text-[#00a651] inline-flex items-center gap-1.5 justify-center">
                        <Clock size={12} className="text-[#00a651] shrink-0" />
                        <span>{pkg.time}</span>
                      </p>
                      <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">{pkg.desc}</p>
                    </div>

                    <ul className="space-y-3.5 pb-6">
                      {pkg.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                          <Check size={12} className="text-[#00a651] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <Link
                      href={`/contact?service=web-development&package=${pkg.name.toLowerCase()}`}
                      className={`group flex w-full items-center justify-center gap-1.5 rounded-2xl py-3 text-xs font-bold transition-all duration-300 hover:scale-[1.02] ${
                        pkg.popular
                          ? "bg-gradient-to-r from-[#0d60c4] to-[#00a651] text-white shadow-md shadow-[#0d60c4]/20 btn-shimmer"
                          : "border border-[#071a3d] dark:border-slate-600 bg-white dark:bg-slate-800 text-[#071a3d] dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
                      }`}
                    >
                      <span>Get Quote</span>
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                    <p className="mt-3 text-center text-[10px] text-slate-400 dark:text-slate-300">
                      Or chat on WhatsApp: {BUSINESS_CONFIG.whatsappFormatted}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
