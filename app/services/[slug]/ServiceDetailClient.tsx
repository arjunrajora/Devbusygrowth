"use client";

import React from "react";
import Link from "next/link";
import JSONLD from "@/components/JSONLD";
import {
  Megaphone,
  BarChart3,
  Bot,
  Video,
  Globe,
  Settings,
  Sparkles,
  Calendar,
  TrendingUp,
  Users,
  Award,
  ShieldCheck,
  Zap,
  Search,
  Check,
  ArrowLeft,
  ArrowRight
} from "lucide-react";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export interface ServiceDetail {
  slug: string;
  category: string;
  categorySlug: string;
  icon: string;
  title: string;
  tagline: string;
  image: string;
  description: string;
  deliverables: string[];
  benefits: string[];
  plans: {
    name: string;
    price: string;
    period: string;
    description: string;
    popular?: boolean;
    features: string[];
  }[];
}

interface ServiceDetailClientProps {
  service: ServiceDetail;
  breadcrumbs: { name: string; url: string }[];
}

export default function ServiceDetailClient({ service, breadcrumbs }: ServiceDetailClientProps) {
  const getSlugIcon = (iconName: string) => {
    const size = 14;
    switch (iconName) {
      case "📱": return <Megaphone size={size} className="shrink-0" />;
      case "⚙️": return <Settings size={size} className="shrink-0" />;
      case "🎨": return <Sparkles size={size} className="shrink-0" />;
      case "📅": return <Calendar size={size} className="shrink-0" />;
      case "📈": return <TrendingUp size={size} className="shrink-0" />;
      case "🤝": return <Users size={size} className="shrink-0" />;
      case "🌟": return <Award size={size} className="shrink-0" />;
      case "📊": return <BarChart3 size={size} className="shrink-0" />;
      case "🛡️": return <ShieldCheck size={size} className="shrink-0" />;
      case "🔥": return <Zap size={size} className="shrink-0" />;
      case "🔍": return <Search size={size} className="shrink-0" />;
      default: return <Sparkles size={size} className="shrink-0" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050c1a] text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <JSONLD type="Breadcrumb" data={{ items: breadcrumbs }} />
      <JSONLD type="Service" data={{ title: service.title, description: service.description }} />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          
          <nav className="mb-8 flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-[#00a651] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-[#00a651] transition-colors">Services</Link>
            <span>/</span>
            <span className="text-[#071a3d] dark:text-white font-bold">{service.title}</span>
          </nav>

          {/* 2-Column Desktop / Responsive Mobile Hero Section */}
          <div className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:items-center pb-12 border-b border-slate-200 dark:border-slate-800/80">
            
            {/* Left Column: Title, Tagline, CTAs (7 Cols = ~55%) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#00a651]/30 bg-[#00a651]/10 px-3.5 py-1 text-xs font-bold text-[#00a651]">
                {getSlugIcon(service.icon)}
                <span>{service.category}</span>
              </div>

              <h1 className="text-3xl font-extrabold text-[#071a3d] dark:text-white sm:text-4xl lg:text-5xl tracking-tight leading-tight">
                {service.title}
              </h1>

              <p className="text-lg sm:text-xl font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
                {service.tagline}
              </p>

              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
                {service.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href={`/contact?service=${service.slug}`}
                  className="btn-primary-green text-sm sm:text-base px-7 py-3.5 shadow-[0_0_20px_rgba(0,166,81,0.4)] group"
                >
                  <span>Book Free Growth Call</span>
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/services"
                  className="btn-secondary-glass text-sm sm:text-base px-6 py-3.5 group"
                >
                  <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
                  <span>All Services</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Service-Specific Photograph (5 Cols = ~45%) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[22px] border border-white/10 bg-[#071a3d] p-3.5 sm:p-4 shadow-2xl overflow-hidden group">
                {/* Ambient Glow */}
                <div className="absolute -right-16 -top-16 h-60 w-60 rounded-full bg-[#00a651]/20 blur-3xl pointer-events-none" />
                
                {/* Image Container */}
                <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/10 bg-slate-950">
                  <img
                    src={service.image}
                    alt={`${service.title} visual showcase`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Glassmorphic Overlay Badge */}
                  <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-[#050c1a]/85 backdrop-blur-md p-3 border border-white/10 shadow-xl">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#00a651] text-white shadow-md">
                        {getSlugIcon(service.icon)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-extrabold text-white leading-tight truncate">
                          {service.title}
                        </h4>
                        <span className="text-[10px] font-bold text-[#00a651] block uppercase tracking-wider">
                          Active Solution Architecture
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          <div className="mb-20 grid gap-12 lg:grid-cols-12">
            
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl font-bold text-[#071a3d] dark:text-white">
                Detailed Service Scope
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {service.description}
              </p>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#00a651]">
                  Strategic Growth Deliverables
                </h3>
                <div className="space-y-3">
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-white dark:bg-[#0b1c3d] p-3.5 shadow-sm">
                      <div className="rounded-lg bg-[#00a651]/10 p-1 text-[#00a651] shrink-0 mt-0.5">
                        <Check size={14} />
                      </div>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1c3d] p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg font-bold text-[#071a3d] dark:text-white mb-4">
                  Expected Business Impact
                </h3>
                <div className="space-y-4">
                  {service.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-[#00a651] shrink-0 mt-2" />
                      <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
                        {b}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-4 border border-slate-100 dark:border-slate-700">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Need Custom Scope?
                  </p>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                    We tailor our media buying and creative packages for specific revenue targets.
                  </p>
                  <Link
                    href={`/contact?service=${service.slug}`}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#00a651] hover:underline"
                  >
                    <span>Request Custom Proposal</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>

          </div>

          <div className="mb-20">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00a651]">
                Transparent Pricing
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-[#071a3d] dark:text-white sm:text-4xl">
                Choose Your Content Creation Package
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 dark:text-slate-300">
                Fixed deliverables, zero hidden fees. Scale as your business grows.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {service.plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative flex flex-col justify-between rounded-3xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    plan.popular
                      ? "border-[#00a651] bg-white dark:bg-[#0b1c3d] ring-2 ring-[#00a651]/20"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1c3d]"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute right-0 top-0">
                      <span className="rounded-bl-xl bg-gradient-to-r from-[#0d60c4] to-[#00a651] px-4 py-1 text-[11px] font-bold text-white shadow-sm flex items-center">
                        <Zap size={10} className="mr-0.5 text-white animate-pulse" />
                        <span>Most Popular</span>
                      </span>
                    </div>
                  )}

                  <div>
                    <div className="mb-6 border-b border-slate-100 dark:border-slate-800 pb-5">
                      <h3 className="text-xl font-bold text-[#071a3d] dark:text-white">
                        {plan.name}
                      </h3>
                      <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                        {plan.description}
                      </p>
                    </div>

                    <ul className="space-y-3 pb-6">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                          <Check size={12} className="text-[#00a651] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <Link
                      href={`/contact?service=${service.slug}&plan=${slugify(plan.name)}`}
                      className="group flex w-full items-center justify-center gap-1.5 rounded-2xl py-3 text-xs font-bold transition-all border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <span>Get Started</span>
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-r from-[#071a3d] via-[#0b2857] to-[#071a3d] p-8 sm:p-12 text-center text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -z-10 h-64 w-64 rounded-full bg-[#00a651]/20 blur-3xl"></div>
            <h2 className="text-2xl font-extrabold sm:text-3xl lg:text-4xl">
              Ready to scale your {service.title}?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-slate-300">
              Speak with our performance growth leads today and get a customized execution plan for your business.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href={`/contact?service=${service.slug}`}
                className="group inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#0d60c4] to-[#00a651] px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 btn-shimmer"
              >
                <span>Book a Free 30-Min Strategy Call</span>
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
