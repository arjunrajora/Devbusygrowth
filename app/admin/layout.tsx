"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import {
  LayoutDashboard,
  Users,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Render login page directly without admin layout
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Enquiries",
      href: "/admin/enquiries",
      icon: Users,
    },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="h-screen bg-slate-50 dark:bg-[#050c1a] text-slate-800 dark:text-slate-100 flex overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed left-0 top-0 bottom-0 w-64 z-40 bg-slate-50 dark:bg-[#050c1a] border-r border-slate-200/20 dark:border-slate-800/20 p-4 overflow-y-auto">
        <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-[#071a3d]/80 p-4 shadow-xl backdrop-blur-xl space-y-1">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-[#0d60c4] to-[#00a651] text-white shadow-md shadow-[#0d60c4]/20"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-white/10 hover:text-[#0d60c4] dark:hover:text-[#00a651]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} />
                  <span>{item.name}</span>
                </div>
                {isActive && <ChevronRight size={16} />}
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Right Column: Fixed Header + Scrollable Content */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative overflow-hidden ml-0 md:ml-64">
        {/* Top Header Navbar */}
        <header className="fixed top-0 right-0 left-0 md:left-64 h-16 z-50 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-[#071a3d]/90 backdrop-blur-xl">
          <div className="px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
            {/* Left: Mobile Menu Toggle + Logo */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                className="md:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                aria-label="Toggle Menu"
              >
                {mobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <Logo />
            </div>

            {/* Right: ONLY Logout Button */}
            <div>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="inline-flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-2 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-all disabled:opacity-50"
              >
                <LogOut size={15} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 min-w-0 overflow-y-auto pt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#050c1a]/80 backdrop-blur-md flex flex-col p-6">
          <div className="flex items-center justify-between mb-8">
            <Logo />
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>
          <div className="space-y-2 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center gap-4 rounded-2xl px-4 py-3.5 text-base font-semibold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-[#0d60c4] to-[#00a651] text-white"
                      : "text-slate-300 hover:bg-white/10"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
