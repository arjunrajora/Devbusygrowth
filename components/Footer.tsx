"use client";

import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import { BUSINESS_CONFIG } from "./businessConfig";
import { MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-[#071a3d] py-16 text-slate-300">
      {/* Glow highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00a651]/40 to-transparent"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Logo darkBackground={true} className="logo-spin-subtle" />
            <p className="text-sm leading-relaxed text-slate-300">
              Jaipur-based performance team for founders & creators. We build digital experiences that generate predictable business growth.
            </p>
            {/* Social Media Links */}
            <div className="flex gap-3 pt-2">
              <a
                href={BUSINESS_CONFIG.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-red-400 transition-all hover:bg-red-500/20 hover:scale-110"
                aria-label="YouTube"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
                </svg>
              </a>
              <a
                href={BUSINESS_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-pink-400 transition-all hover:bg-pink-500/20 hover:scale-110"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path>
                </svg>
              </a>
              <a
                href={BUSINESS_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-cyan-400 transition-all hover:bg-cyan-500/20 hover:scale-110"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="transition-colors hover:text-[#00a651]">Home</Link>
              </li>
              <li>
                <Link href="/services" className="transition-colors hover:text-[#00a651]">Services</Link>
              </li>
              <li>
                <Link href="/course" className="transition-colors hover:text-[#00a651]">Full DM Course</Link>
              </li>
              <li>
                <Link href="/performance-course" className="transition-colors hover:text-[#00a651]">Performance Course</Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-[#00a651]">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Services Quicklist */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Services</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/services#social-media" className="transition-colors hover:text-[#00a651]">Social Media Mastery</Link>
              </li>
              <li>
                <Link href="/services#meta-ads" className="transition-colors hover:text-[#00a651]">Meta & Google Ads</Link>
              </li>
              <li>
                <Link href="/services#ai-automation" className="transition-colors hover:text-[#00a651]">AI & Automation Flows</Link>
              </li>
              <li>
                <Link href="/services#video-editing" className="transition-colors hover:text-[#00a651]">Video Editing & Reels</Link>
              </li>
            </ul>
          </div>

          {/* Connect Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Let's Connect</h3>
            <div className="space-y-3">
              <a
                href={BUSINESS_CONFIG.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-[#00a651]/30 bg-[#00a651]/10 p-3 transition-all hover:bg-[#00a651]/20"
              >
                <div className="rounded-lg bg-[#00a651]/20 p-2 text-[#00a651]">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.077 4.928C17.191 3.041 14.683 2 12.006 2 6.499 2 2.006 6.493 2.006 12c0 1.76.46 3.483 1.333 5l-1.333 4.86 5.013-1.313c1.452.793 3.087 1.207 4.78 1.207h.004c5.507 0 10-4.493 10-10 0-2.677-1.041-5.185-2.926-7.072z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-400">WhatsApp us</p>
                  <p className="text-sm font-medium text-white group-hover:text-[#00a651]">{BUSINESS_CONFIG.whatsappFormatted}</p>
                </div>
              </a>
              
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="rounded-lg bg-white/10 p-2 text-[#0d60c4]">
                  <MapPin size={20} className="shrink-0" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Based in</p>
                  <p className="text-sm font-medium text-white">{BUSINESS_CONFIG.address}</p>
                  <p className="text-xs text-slate-400">Working worldwide 🌍</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-center">
          <p className="text-xs text-slate-400 font-medium">
            © {new Date().getFullYear()} {BUSINESS_CONFIG.name}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
