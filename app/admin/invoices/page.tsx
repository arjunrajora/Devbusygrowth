"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  Plus,
  Search,
  Mail,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface Invoice {
  _id: string;
  id: string;
  title?: string;
  invoiceNumber: string;
  userName: string;
  mobile: string;
  email: string;
  invoiceDate: string;
  dueDate?: string;
  description: string;
  totalAmount: number;
  advanceAmount: number;
  remainingAmount: number;
  status?: "active" | "disabled";
  emailSent: boolean;
  emailSentAt?: string;
  createdBy?: string;
  createdAt: string;
}

export default function ViewInvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Action states
  const [resendingId, setResendingId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchInvoices();
  }, [page, searchQuery]);

  const fetchInvoices = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        search: searchQuery,
      });
      const res = await fetch(`/api/admin/invoices?${params.toString()}`);
      const data = await res.json();
      if (data.invoices) {
        setInvoices(data.invoices);
        setTotalCount(data.total || 0);
        setTotalPages(data.totalPages || 1);
      }
    } catch (err) {
      console.error("Failed to fetch invoices:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async (invoice: Invoice) => {
    setResendingId(invoice.id || invoice._id || invoice.invoiceNumber);
    setToastMsg(null);
    try {
      const id = invoice.id || invoice._id || invoice.invoiceNumber;
      const res = await fetch(`/api/admin/invoices/${id}/resend-email`, {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setToastMsg({
          type: "success",
          text: `Email resent successfully to ${invoice.email}`,
        });
        fetchInvoices();
      } else {
        throw new Error(data.error || "Failed to resend email");
      }
    } catch (err: any) {
      setToastMsg({
        type: "error",
        text: err.message || "Could not resend email.",
      });
    } finally {
      setResendingId(null);
    }
  };

  const formatCurrency = (val: number) => {
    return (val || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="w-full space-y-8 pb-12">
      {/* Toast Notification */}
      {toastMsg && (
        <div
          className={`fixed top-20 right-6 z-50 rounded-2xl p-4 shadow-2xl flex items-center gap-3 border backdrop-blur-xl text-sm font-bold animate-in fade-in slide-in-from-top-4 ${
            toastMsg.type === "success"
              ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-300"
              : "bg-red-950/90 border-red-500/30 text-red-300"
          }`}
        >
          {toastMsg.type === "success" ? (
            <CheckCircle2 size={20} className="text-emerald-400" />
          ) : (
            <AlertCircle size={20} className="text-red-400" />
          )}
          <span>{toastMsg.text}</span>
          <button
            onClick={() => setToastMsg(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Top Title & Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <FileText className="text-[#0d60c4] dark:text-[#00a651]" size={30} />
            <span>Invoice Management</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            View, manage, and resend customer invoices.
          </p>
        </div>

        <Link
          href="/admin/invoices/add"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#0d60c4] to-[#00a651] px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-[#0d60c4]/20 hover:opacity-95 transition-all"
        >
          <Plus size={18} />
          <span>Add New Invoice</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-[#071a3d]/90 p-4 shadow-xl backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search size={18} className="absolute left-4 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Invoice #, Name, Mobile, Email..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#050c1a] text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0d60c4] dark:focus:ring-[#00a651]"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setPage(1);
              }}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="text-xs font-bold text-slate-500 dark:text-slate-400 self-end sm:self-center">
          Total Invoices: <span className="text-slate-900 dark:text-white">{totalCount}</span>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-[#071a3d]/90 shadow-xl backdrop-blur-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-[#050c1a]/50 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-4 px-6">Invoice #</th>
                <th className="py-4 px-6">Customer / User</th>
                <th className="py-4 px-6">Contact Info</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Total (₹)</th>
                <th className="py-4 px-6">Advance (₹)</th>
                <th className="py-4 px-6">Remaining (₹)</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-medium">
              {isLoading ? (
                // Loading Skeleton Rows
                Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="py-4 px-6">
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-20"></div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-28"></div>
                    </td>
                    <td className="py-4 px-6 space-y-1">
                      <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-32"></div>
                      <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-24"></div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-20"></div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-16"></div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-16"></div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-16"></div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="h-7 bg-slate-200 dark:bg-slate-800 rounded-xl w-24 ml-auto"></div>
                    </td>
                  </tr>
                ))
              ) : invoices.length === 0 ? (
                // Empty State
                <tr>
                  <td colSpan={8} className="py-16 text-center text-slate-400">
                    <div className="max-w-xs mx-auto space-y-3">
                      <FileText size={40} className="mx-auto text-slate-300 dark:text-slate-600 stroke-[1.5]" />
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        No invoices found
                      </p>
                      <p className="text-xs text-slate-400">
                        {searchQuery
                          ? "Try searching with a different term."
                          : "Create your first invoice to get started."}
                      </p>
                      {!searchQuery && (
                        <Link
                          href="/admin/invoices/add"
                          className="inline-flex items-center gap-2 text-xs font-bold text-[#0d60c4] dark:text-[#00a651] hover:underline pt-2"
                        >
                          <Plus size={14} />
                          <span>Create Invoice</span>
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                // Data Rows
                invoices.map((inv) => (
                  <tr
                    key={inv._id || inv.invoiceNumber}
                    className="hover:bg-slate-50/60 dark:hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Invoice # */}
                    <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">
                      <span className="inline-block px-2.5 py-1 rounded-lg bg-blue-500/10 text-[#0d60c4] dark:text-[#00a651] font-extrabold tracking-wide">
                        {inv.invoiceNumber}
                      </span>
                    </td>

                    {/* Customer Name */}
                    <td className="py-4 px-6 font-semibold text-slate-800 dark:text-slate-200">
                      {inv.userName}
                    </td>

                    {/* Mobile & Email */}
                    <td className="py-4 px-6 space-y-0.5">
                      <div className="text-slate-700 dark:text-slate-300 font-medium">
                        {inv.mobile}
                      </div>
                      <div className="text-[11px] text-slate-400 font-normal">
                        {inv.email}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 space-y-0.5">
                      <div className="text-slate-700 dark:text-slate-300 text-xs font-semibold">
                        {inv.invoiceDate}
                      </div>
                      {inv.dueDate && (
                        <div className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                          Due: {inv.dueDate}
                        </div>
                      )}
                    </td>

                    {/* Total Amount */}
                    <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">
                      ₹ {formatCurrency(inv.totalAmount)}
                    </td>

                    {/* Advance Amount */}
                    <td className="py-4 px-6 font-semibold text-slate-600 dark:text-slate-400">
                      ₹ {formatCurrency(inv.advanceAmount)}
                    </td>

                    {/* Remaining Amount */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-lg font-extrabold text-xs ${
                          inv.remainingAmount > 0
                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                            : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        }`}
                      >
                        ₹ {formatCurrency(inv.remainingAmount)}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleResendEmail(inv)}
                        disabled={resendingId === (inv.id || inv._id || inv.invoiceNumber)}
                        title="Resend Invoice Email"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all text-xs font-bold disabled:opacity-50"
                      >
                        {resendingId === (inv.id || inv._id || inv.invoiceNumber) ? (
                          <RefreshCw size={13} className="animate-spin" />
                        ) : (
                          <Mail size={13} />
                        )}
                        <span>Resend Email</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {!isLoading && totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-[#050c1a]/30 flex items-center justify-between">
            <div className="text-xs text-slate-400">
              Page <span className="font-bold text-slate-700 dark:text-slate-200">{page}</span> of{" "}
              <span className="font-bold text-slate-700 dark:text-slate-200">{totalPages}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-white/10"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-white/10"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
