"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  FileText,
  User,
  Phone,
  Mail,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

export default function AddInvoicePage() {
  const router = useRouter();

  // Form State
  const [userName, setUserName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [totalAmount, setTotalAmount] = useState<string>("");
  const [advanceAmount, setAdvanceAmount] = useState<string>("");

  // Calculated state
  const [remainingAmount, setRemainingAmount] = useState<number>(0);

  // Status & Error states
  const [loadingNextNum, setLoadingNextNum] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Initialize dates and fetch auto-generated invoice number on mount
  useEffect(() => {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];

    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    const nextWeekStr = nextWeek.toISOString().split("T")[0];

    setInvoiceDate(todayStr);
    setDueDate(nextWeekStr);

    fetchNextInvoiceNumber();
  }, []);

  // Recalculate remaining amount whenever total or advance changes
  useEffect(() => {
    const total = parseFloat(totalAmount) || 0;
    const advance = parseFloat(advanceAmount) || 0;
    // Accurate float subtraction to 2 decimal places precision without rounding away valid decimals
    const rem = Math.round((total - advance) * 10000) / 10000;
    setRemainingAmount(rem);
  }, [totalAmount, advanceAmount]);

  // Sanitize numeric amount inputs: allow only digits and a single decimal point
  const handleAmountChange = (val: string, setter: (v: string) => void) => {
    let cleaned = val.replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");
    if (parts.length > 2) {
      cleaned = parts[0] + "." + parts.slice(1).join("");
    }
    setter(cleaned);
  };

  const fetchNextInvoiceNumber = async () => {
    setLoadingNextNum(true);
    try {
      const res = await fetch("/api/admin/invoices?action=next-number");
      const data = await res.json();
      if (data.invoiceNumber) {
        setInvoiceNumber(data.invoiceNumber);
      }
    } catch {
      // Fallback
      setInvoiceNumber(`BG-INV-${1000 + Math.floor(Math.random() * 9000)}`);
    } finally {
      setLoadingNextNum(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // Client-side validations
    if (!userName.trim()) {
      setErrorMsg("User/Customer Name is required.");
      return;
    }

    const cleanMobile = mobile.trim();
    const digits = cleanMobile.replace(/[^0-9]/g, "");
    if (!cleanMobile || digits.length < 10) {
      setErrorMsg("A valid Mobile Number with at least 10 digits is required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMsg("A valid Email Address is required.");
      return;
    }

    if (!invoiceNumber.trim()) {
      setErrorMsg("Invoice Number is required.");
      return;
    }

    if (!invoiceDate) {
      setErrorMsg("Invoice Date is required.");
      return;
    }

    if (!dueDate) {
      setErrorMsg("Due Date is required.");
      return;
    }

    if (!description.trim()) {
      setErrorMsg("Description cannot be empty.");
      return;
    }

    const totalVal = parseFloat(totalAmount);
    if (isNaN(totalVal) || totalVal <= 0) {
      setErrorMsg("Total Amount must be a valid positive number.");
      return;
    }

    const advanceVal = parseFloat(advanceAmount) || 0;
    if (isNaN(advanceVal) || advanceVal < 0) {
      setErrorMsg("Advance Amount cannot be negative.");
      return;
    }

    if (advanceVal > totalVal) {
      setErrorMsg("Advance Amount cannot be greater than Total Amount.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceNumber: invoiceNumber.trim(),
          userName: userName.trim(),
          mobile: cleanMobile,
          email: email.trim(),
          invoiceDate,
          dueDate,
          description: description.trim(),
          totalAmount: totalVal,
          advanceAmount: advanceVal,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create invoice");
      }

      setSuccessMsg("Invoice created successfully & PDF emailed to customer!");

      setTimeout(() => {
        router.push("/admin/invoices");
        router.refresh();
      }, 1800);
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred while creating invoice.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full space-y-8 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link
            href="/admin/invoices"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-[#0d60c4] dark:hover:text-[#00a651] transition-colors mb-2"
          >
            <ArrowLeft size={14} />
            <span>Back to Invoices</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <FileText className="text-[#0d60c4] dark:text-[#00a651]" size={30} />
            <span>Create New Invoice</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Fill customer & billing details. Invoice PDF will be generated and emailed automatically.
          </p>
        </div>
      </div>

      {/* Alert Notifications */}
      {errorMsg && (
        <div className="w-full rounded-2xl bg-red-500/10 border border-red-500/20 p-4 flex items-start gap-3 text-red-600 dark:text-red-400 text-sm font-medium">
          <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="w-full rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-4 flex items-start gap-3 text-emerald-600 dark:text-emerald-400 text-sm font-medium animate-in fade-in">
          <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="w-full space-y-8">
        {/* Section 1: Customer Details */}
        <div className="w-full rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-[#071a3d]/90 p-6 sm:p-8 shadow-xl backdrop-blur-xl space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800/80 pb-4 flex items-center gap-3">
            <User className="text-[#0d60c4] dark:text-[#00a651]" size={20} />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Customer Details
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Customer Name */}
            <div className="space-y-2 lg:col-span-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                User / Customer Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#050c1a] text-slate-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0d60c4] dark:focus:ring-[#00a651]"
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#050c1a] text-slate-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0d60c4] dark:focus:ring-[#00a651]"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="e.g. rahul@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#050c1a] text-slate-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0d60c4] dark:focus:ring-[#00a651]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Invoice Details */}
        <div className="w-full rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-[#071a3d]/90 p-6 sm:p-8 shadow-xl backdrop-blur-xl space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800/80 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="text-[#0d60c4] dark:text-[#00a651]" size={20} />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Invoice & Billing Details
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Invoice Number */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Invoice Number <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={fetchNextInvoiceNumber}
                  disabled={loadingNextNum}
                  className="text-[10px] font-bold text-[#0d60c4] dark:text-[#00a651] hover:underline flex items-center gap-1"
                >
                  <RefreshCw size={10} className={loadingNextNum ? "animate-spin" : ""} />
                  Regenerate
                </button>
              </div>
              <input
                type="text"
                required
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#050c1a] text-slate-900 dark:text-white text-sm font-bold tracking-wide focus:outline-none focus:ring-2 focus:ring-[#0d60c4] dark:focus:ring-[#00a651]"
              />
            </div>

            {/* Invoice Date */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Invoice Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="date"
                  required
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#050c1a] text-slate-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0d60c4] dark:focus:ring-[#00a651]"
                />
              </div>
            </div>

            {/* Due Date */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Due Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="date"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#050c1a] text-slate-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0d60c4] dark:focus:ring-[#00a651]"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Description / Services <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              placeholder="e.g. Website Development & Performance Marketing Retainer (Phase 1)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#050c1a] text-slate-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0d60c4] dark:focus:ring-[#00a651]"
            />
          </div>

          {/* Financial Amounts Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            {/* Total Amount */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Total Amount (₹) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 font-extrabold text-slate-400 text-sm">₹</span>
                <input
                  type="text"
                  inputMode="decimal"
                  required
                  placeholder="0.00"
                  value={totalAmount}
                  onChange={(e) => handleAmountChange(e.target.value, setTotalAmount)}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#050c1a] text-slate-900 dark:text-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#0d60c4] dark:focus:ring-[#00a651]"
                />
              </div>
            </div>

            {/* Advance Amount */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Advance Amount (₹) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 font-extrabold text-slate-400 text-sm">₹</span>
                <input
                  type="text"
                  inputMode="decimal"
                  required
                  placeholder="0.00"
                  value={advanceAmount}
                  onChange={(e) => handleAmountChange(e.target.value, setAdvanceAmount)}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#050c1a] text-slate-900 dark:text-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#0d60c4] dark:focus:ring-[#00a651]"
                />
              </div>
            </div>

            {/* Remaining Amount (Auto Calculated) */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Remaining Amount (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">₹</span>
                <input
                  type="text"
                  inputMode="decimal"
                  readOnly
                  value={
                    isNaN(remainingAmount)
                      ? "0.00"
                      : remainingAmount.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                  }
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 text-sm font-extrabold focus:outline-none cursor-default"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit & Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Link
            href="/admin/invoices"
            className="px-6 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-[#0d60c4] to-[#00a651] text-white text-sm font-extrabold shadow-lg shadow-[#0d60c4]/20 hover:opacity-95 transition-all disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Saving & Emailing PDF...</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>Save Invoice & Send Email</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
