"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
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
    const size = 16;
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-white/85 dark:bg-[#050c1a]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm shadow-slate-900/5"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
            <Link
              href="/"
              className="transition-colors hover:text-[#0d60c4] dark:hover:text-[#00a651]"
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative py-2"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link
                href="/services"
                onClick={(e) => handleServiceClick(e, "/services")}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-[#0d60c4] dark:hover:text-[#00a651]"
              >
                <span>Services</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    servicesOpen
                      ? "rotate-180 text-[#0d60c4] dark:text-[#00a651]"
                      : "text-slate-400"
                  }`}
                />
              </Link>

              {/* Floating Menu Container */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 top-full pt-2 w-64 transition-all duration-200 origin-top ${
                  servicesOpen
                    ? "opacity-100 scale-100 pointer-events-auto translate-y-0"
                    : "opacity-0 scale-95 pointer-events-none -translate-y-1"
                }`}
              >
                <div className="overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white/95 dark:bg-[#071a3d]/95 p-2 shadow-xl shadow-slate-900/10 backdrop-blur-xl">
                  <div className="space-y-0.5">
                    {SERVICES_DROPDOWN.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={(e) => handleServiceClick(e, item.href)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all hover:bg-slate-100/80 dark:hover:bg-white/10 hover:text-[#0d60c4] dark:hover:text-[#00a651]"
                      >
                        {getServiceIcon(item.name)}
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-1.5 border-t border-slate-100 dark:border-slate-800/80 pt-1.5">
                    <Link
                      href="/services"
                      onClick={(e) => handleServiceClick(e, "/services")}
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-bold text-[#0d60c4] dark:text-[#00a651] transition-all hover:bg-[#0d60c4]/10 dark:hover:bg-[#00a651]/10"
                    >
                      <span>View All Services</span>
                      <ArrowRight size={14} className="transition-transform duration-350 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/#industries"
              className="transition-colors hover:text-[#0d60c4] dark:hover:text-[#00a651]"
            >
              Industries
            </Link>
            <Link
              href="/course"
              className="transition-colors hover:text-[#0d60c4] dark:hover:text-[#00a651]"
            >
              Courses
            </Link>
            <Link
              href="/#about"
              className="transition-colors hover:text-[#0d60c4] dark:hover:text-[#00a651]"
            >
              About
            </Link>
            <Link
              href="/#faq"
              className="transition-colors hover:text-[#0d60c4] dark:hover:text-[#00a651]"
            >
              FAQ
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="/contact"
              className="btn-primary-green text-sm px-6 py-2.5 shadow-[0_0_20px_rgba(0,166,81,0.4)]"
            >
              Book a Strategy Call
            </Link>
          </div>

          {/* Mobile Menu Toggle & Direct Call */}
          <div className="flex items-center gap-2.5 md:hidden">
            <a
              href={`tel:${BUSINESS_CONFIG.phone}`}
              className="rounded-full bg-[#00a651]/10 border border-[#00a651]/20 px-3.5 py-1.5 text-xs font-semibold text-[#00a651] shadow-sm"
            >
              Call
            </a>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative z-50 flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 p-2 text-[#071a3d] dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X size={18} className="shrink-0" />
              ) : (
                <Menu size={18} className="shrink-0" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-[#071a3d]/95 dark:bg-[#050c1a]/95 backdrop-blur-2xl transition-all duration-500 md:hidden ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center flex-1 gap-6 text-xl font-semibold text-slate-200 overflow-y-auto py-12">
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
            className="mt-4 btn-primary-green text-base px-8 py-3.5 shadow-[0_0_25px_rgba(0,166,81,0.5)]"
          >
            Book a Strategy Call
          </Link>
        </div>
      </div>
    </header>
  );
}
