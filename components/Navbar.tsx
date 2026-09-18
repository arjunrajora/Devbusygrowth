"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BUSINESS_CONFIG } from "./businessConfig";
import { Menu, X, ChevronDown, ArrowRight, Megaphone, BarChart3, Bot, Video, Globe } from "lucide-react";

const SERVICES_DROPDOWN = [
  { name: "Social Media", href: "/services#social-media" },
  { name: "Meta Ads", href: "/services#meta-ads" },
  { name: "AI & Automation", href: "/services#ai-automation" },
  { name: "Video Editing", href: "/services#video-editing" },
  { name: "Web Development", href: "/services#web-development" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleServiceClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    setServicesOpen(false);
    setMobileMenuOpen(false);

    const parts = href.split("#");
    const targetPath = parts[0];
    const targetHash = parts[1];

    if (window.location.pathname === "/services") {
      if (targetHash) {
        e.preventDefault();
        window.history.pushState(null, "", `#${targetHash}`);
        window.dispatchEvent(new HashChangeEvent("hashchange"));

        const element = document.getElementById(targetHash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else if (targetPath === "/services" && !targetHash) {
        e.preventDefault();
        window.history.pushState(null, "", "/services");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const getServiceIcon = (name: string) => {
    const size = 15;
    switch (name) {
      case "Social Media":
        return <Megaphone size={size} className="text-[#00a651]" />;
      case "Meta Ads":
        return <BarChart3 size={size} className="text-[#0d60c4]" />;
      case "AI & Automation":
        return <Bot size={size} className="text-[#00a651]" />;
      case "Video Editing":
        return <Video size={size} className="text-[#0d60c4]" />;
      case "Web Development":
        return <Globe size={size} className="text-[#00a651]" />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Centered Floating Pill-Shaped Top Navigation Bar */}
      <header role="banner" className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
        <div
          className={`pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 md:gap-8 rounded-full border px-3 sm:px-4 py-2 sm:py-2.5 transition-all duration-300 ${
            scrolled
              ? "border-white/25 bg-black/85 text-white shadow-[0_12px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl scale-[0.98]"
              : "border-white/20 bg-black/60 text-white shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl"
          }`}
        >
          {/* 1. Small Circular Logo Icon on Far Left */}
          <Link
            href="/"
            className="flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-black/80 border border-white/20 p-1.5 shrink-0 hover:scale-105 hover:border-[#00a651]/60 transition-all duration-200 overflow-hidden shadow-sm"
            aria-label="TheBusyGrowth Home"
            title="TheBusyGrowth - Digital Marketing & AI Growth Agency"
          >
            <img
              src="/logo-icon-transparent.png"
              alt={BUSINESS_CONFIG.name}
              className="h-full w-full object-contain"
            />
          </Link>

          {/* 2. Five Evenly Spaced Text Links in Middle (Normal Capitalization) */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm font-medium text-slate-200">
            {/* Link 1: Home */}
            <Link
              href="/"
              className="transition-colors hover:text-white px-1 py-1"
            >
              Home
            </Link>

            {/* Link 2: Services with Dropdown */}
            <div
              className="relative py-1"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link
                href="/services"
                onClick={(e) => handleServiceClick(e, "/services")}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-white px-1 py-1"
              >
                <span>Services</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    servicesOpen ? "rotate-180 text-[#00a651]" : "text-slate-400"
                  }`}
                />
              </Link>

              {/* Dropdown Panel */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 w-64 transition-all duration-200 origin-top ${
                  servicesOpen
                    ? "opacity-100 scale-100 pointer-events-auto translate-y-0"
                    : "opacity-0 scale-95 pointer-events-none -translate-y-1"
                }`}
              >
                <div className="overflow-hidden rounded-2xl border border-white/20 bg-black/90 p-2 shadow-2xl shadow-black backdrop-blur-2xl">
                  <div className="space-y-1">
                    {SERVICES_DROPDOWN.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={(e) => handleServiceClick(e, item.href)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 transition-all hover:bg-white/10 hover:text-[#00a651]"
                      >
                        {getServiceIcon(item.name)}
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-1.5 border-t border-white/10 pt-1.5">
                    <Link
                      href="/services"
                      onClick={(e) => handleServiceClick(e, "/services")}
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-bold text-[#00a651] transition-all hover:bg-[#00a651]/10"
                    >
                      <span>View All Services</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Link 3: Industries */}
            <Link
              href="/#industries"
              className="transition-colors hover:text-white px-1 py-1"
            >
              Industries
            </Link>

            {/* Link 4: Courses */}
            <Link
              href="/course"
              className="transition-colors hover:text-white px-1 py-1"
            >
              Courses
            </Link>

            {/* Link 5: About */}
            <Link
              href="/#about"
              className="transition-colors hover:text-white px-1 py-1"
            >
              About
            </Link>
          </nav>

          {/* 3. Highlighted Button at Far Right End of Pill */}
          <div className="hidden md:flex items-center shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#00a651] px-4 lg:px-5 py-2 text-xs lg:text-sm font-semibold text-white shadow-[0_0_20px_rgba(0,166,81,0.4)] hover:bg-[#008f45] hover:shadow-[0_0_28px_rgba(0,166,81,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shrink-0"
            >
              Book a Strategy Call
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 md:hidden shrink-0">
            <Link
              href="/contact"
              className="rounded-full bg-[#00a651] px-3.5 py-1.5 text-[11px] font-semibold text-white shadow-sm"
            >
              Book Call
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-black/95 backdrop-blur-2xl transition-all duration-500 md:hidden ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center flex-1 gap-6 text-xl font-semibold text-slate-100 overflow-y-auto py-16 px-6">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="transition-colors hover:text-[#00a651]"
          >
            Home
          </Link>

          {/* Mobile Services Accordion */}
          <div className="w-full flex flex-col items-center">
            <div className="flex items-center gap-2">
              <Link
                href="/services"
                onClick={(e) => handleServiceClick(e, "/services")}
                className="transition-colors hover:text-[#00a651]"
              >
                Services
              </Link>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="p-1 text-slate-400 hover:text-white transition-colors"
                aria-label="Toggle Services Submenu"
              >
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-200 ${
                    mobileServicesOpen ? "rotate-180 text-[#00a651]" : ""
                  }`}
                />
              </button>
            </div>

            {mobileServicesOpen && (
              <div className="mt-3 flex flex-col items-center gap-3 rounded-2xl bg-white/5 p-4 w-64 border border-white/10 text-sm font-medium">
                {SERVICES_DROPDOWN.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleServiceClick(e, item.href)}
                    className="flex items-center gap-2.5 text-slate-300 hover:text-[#00a651] transition-colors"
                  >
                    {getServiceIcon(item.name)}
                    <span>{item.name}</span>
                  </Link>
                ))}
                <div className="mt-1 w-full border-t border-white/10 pt-2 text-center">
                  <Link
                    href="/services"
                    onClick={(e) => handleServiceClick(e, "/services")}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#00a651] hover:underline"
                  >
                    <span>View All Services</span>
                    <ArrowRight size={12} className="ml-0.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/#industries"
            onClick={() => setMobileMenuOpen(false)}
            className="transition-colors hover:text-[#00a651]"
          >
            Industries
          </Link>
          <Link
            href="/course"
            onClick={() => setMobileMenuOpen(false)}
            className="transition-colors hover:text-[#00a651]"
          >
            Courses
          </Link>
          <Link
            href="/#about"
            onClick={() => setMobileMenuOpen(false)}
            className="transition-colors hover:text-[#00a651]"
          >
            About
          </Link>
          <Link
            href="/#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="transition-colors hover:text-[#00a651]"
          >
            FAQ
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4 rounded-full bg-[#00a651] text-base font-semibold text-white px-8 py-3.5 shadow-lg shadow-[#00a651]/30 hover:bg-[#008f45]"
          >
            Book a Strategy Call
          </Link>
        </div>
      </div>
    </>
  );
}
