"use client";

import React from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { BUSINESS_CONFIG } from "@/components/businessConfig";
import JSONLD from "@/components/JSONLD";
import { Zap, ArrowRight, Check } from "lucide-react";

const OVERVIEW_WEEKS = [
  {
    week: "Weeks 1-2",
    title: "Meta Ads Foundation",
    image: "/images/courses/meta-google-ads.webp",
    color: "border-[#00a651]/20 text-[#00a651] bg-[#00a651]/5",
    bullets: ["Business Manager Setup", "Campaign Structure Mappings", "Setting Ad Objectives", "Budgeting Calculations"],
  },
  {
    week: "Weeks 3-4",
    title: "Audience & Targeting",
    image: "/images/courses/foundation-ai.webp",
    color: "border-[#071a3d]/20 text-[#071a3d] bg-[#071a3d]/5",
    bullets: ["Custom Audiences & Stacks", "Lookalike Segment Models", "Interest Stack Testing", "Retargeting Funnels"],
  },
  {
    week: "Weeks 5-6",
    title: "Creative & Copywriting",
    image: "/images/courses/social-content.webp",
    color: "border-[#0d60c4]/20 text-[#0d60c4] bg-[#0d60c4]/5",
    bullets: ["Ad Creative Wireframes", "Persuasive Copy Hooks", "A/B Dynamic Creative Testing", "Dynamic Creative Nodes"],
  },
  {
    week: "Weeks 7-8",
    title: "Google Search Ads",
    image: "/images/courses/seo-aeo.webp",
    color: "border-[#0b2857]/20 text-[#0b2857] bg-[#0b2857]/5",
    bullets: ["Keyword Intent Stacking", "Match Type Optimization", "High CTR Copy Hooks", "Ad Extensions Setup"],
  },
  {
    week: "Weeks 9-10",
    title: "Google Display & Video",
    image: "/images/courses/automation-ai.webp",
    color: "border-[#00a651]/20 text-[#00a651] bg-[#00a651]/5",
    bullets: ["Google Display Networks", "YouTube Ad Positioning", "Placement Blacklists", "Video Remarketing"],
  },
  {
    week: "Weeks 11-12",
    title: "Tracking & Scaling",
    image: "/images/courses/meta-google-ads.webp",
    color: "border-[#0d60c4]/20 text-[#0d60c4] bg-[#0d60c4]/5",
    bullets: ["Pixel & Conversions API", "GA4 Event Customizations", "Performance Max (PMax)", "Ad Budget Scaling Nodes"],
  },
];

const MASTER_TOOLS = [
  "Meta Ads Manager",
  "Google Ads Console",
  "Google Tag Manager",
  "GA4 (Google Analytics)",
  "Meta Pixel & CAPI",
  "Google Analytics Events",
  "Canva Design Flow",
  "ChatGPT Prompting",
];

export default function PerformanceCoursePage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Courses", url: "/course" },
    { name: "Performance Mastery", url: "/performance-course" },
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#050c1a] text-slate-800 dark:text-slate-100 px-4 py-16 sm:px-6 lg:px-8 transition-colors duration-300">
      <JSONLD type="Breadcrumb" data={{ items: breadcrumbs }} />
      <JSONLD
        type="Course"
        data={{
          title: "Performance Marketing Mastery Course",
          description: "12 weeks intensive training covering Meta Ads, Google Ads, Pixel APIs, and scaling formulas with active operators in Jaipur.",
        }}
      />
      
      {/* Background lights */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-[#00a651]/5 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-72 w-72 rounded-full bg-[#0d60c4]/5 blur-3xl"></div>

      <div className="mx-auto max-w-7xl">
        
        {/* Course Header */}
        <div className="mb-16">
          <ScrollReveal direction="fade" delay={100}>
            <span className="inline-flex items-center rounded-full border border-[#00a651]/30 bg-[#00a651]/10 px-3.5 py-1 text-xs font-bold text-[#00a651] mb-4 animate-pulse gap-1.5">
              <Zap size={12} className="text-[#00a651] shrink-0" />
              <span>12 Weeks Intensive</span>
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={200}>
            <h1 className="text-4xl font-extrabold text-[#071a3d] dark:text-white sm:text-5xl lg:text-6xl max-w-3xl leading-tight">
              Performance Marketing{" "}
              <span className="bg-gradient-to-r from-[#0d60c4] via-[#00a651] to-[#0d60c4] bg-clip-text text-transparent font-black">
                Mastery
              </span>
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={300}>
            <p className="mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300 sm:text-lg">
              Master Meta Ads and Google Ads. Learn to draft strategy documents, design creative experiments, and scale client accounts with real advertising budgets.
            </p>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={400}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact?interest=performance-course"
                className="group inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#0d60c4] to-[#00a651] px-8 py-3 text-sm font-bold text-white shadow-lg shadow-[#0d60c4]/20 transition-all duration-300 hover:scale-105"
              >
                <span>Enroll Now</span>
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/course"
                className="rounded-full border border-[#071a3d] dark:border-slate-700 bg-white dark:bg-slate-800 px-8 py-3 text-sm font-semibold text-[#071a3d] dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm"
              >
                Compare with Full DM Course
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Statistics grid */}
        <ScrollReveal direction="scale" delay={300}>
          <div className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1c3d] p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#00a651]/40">
              <p className="text-3xl font-extrabold text-[#00a651]">12</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Weeks Course</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1c3d] p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#00a651]/40">
              <p className="text-3xl font-extrabold text-[#071a3d] dark:text-white">24+</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Sessions</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1c3d] p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0d60c4]">
              <p className="text-3xl font-extrabold text-[#0d60c4]">8+</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Real Projects</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1c3d] p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#00a651]/40">
              <p className="text-3xl font-extrabold text-[#00a651]">Certificate</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Recognized</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Curriculum Overview */}
        <div className="space-y-6">
          <ScrollReveal direction="up">
            <h2 className="text-2xl font-extrabold text-[#071a3d] dark:text-white sm:text-3xl">Curriculum Overview</h2>
          </ScrollReveal>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {OVERVIEW_WEEKS.map((ow, i) => (
              <ScrollReveal direction="up" delay={i * 100} key={ow.week}>
                <div
                  className={`group overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1c3d] transition-all duration-500 hover:-translate-y-2 hover:border-[#00a651]/40 hover:shadow-xl`}
                >
                  {/* Image header */}
                  <div className="relative h-40 w-full overflow-hidden">
                    <img
                      src={ow.image}
                      alt={ow.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071a3d] via-[#071a3d]/40 to-transparent"></div>
                    <span className="absolute bottom-3 left-4 text-base font-extrabold text-white">
                      {ow.week}
                    </span>
                  </div>
                  
                  {/* Text content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-[#071a3d] dark:text-white transition-colors group-hover:text-[#00a651]">
                      {ow.title}
                    </h3>
                    <ul className="mt-4 space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4">
                      {ow.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-300 transition-transform duration-300 hover:translate-x-1">
                          <Check size={12} className="text-[#00a651] shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Tools You'll Master */}
        <ScrollReveal direction="up">
          <section className="mt-20 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1c3d] p-8 shadow-sm transition-colors hover:border-[#00a651]/40 duration-500">
            <h3 className="text-lg font-extrabold text-[#071a3d] dark:text-white sm:text-xl">Tools You'll Master</h3>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {MASTER_TOOLS.map((tool, i) => (
                <span
                  key={i}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all duration-300 hover:scale-105 hover:border-[#00a651]/40 hover:bg-white dark:hover:bg-slate-800 shadow-sm"
                >
                  {tool}
                </span>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Final CTA Strip */}
        <ScrollReveal direction="scale">
          <section className="mt-20 rounded-3xl bg-gradient-to-br from-[#071a3d] via-[#0b2857] to-[#071a3d] p-8 text-center sm:p-12 border border-white/10 shadow-2xl text-white">
            <h3 className="text-2xl font-extrabold text-white sm:text-3xl">
              Ready to become a Performance Marketing Specialist?
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Limited seats are available for the upcoming batch. Build your career with operators.
            </p>
            <Link
              href="/contact?interest=performance-course"
              className="group inline-flex items-center gap-1.5 mt-6 rounded-full bg-gradient-to-r from-[#0d60c4] to-[#00a651] px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 btn-shimmer"
            >
              <span>Apply for Next Batch</span>
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </section>
        </ScrollReveal>

      </div>
    </div>
  );
}
