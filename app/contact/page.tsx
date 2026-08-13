"use client";

import React, { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { BUSINESS_CONFIG } from "@/components/businessConfig";
import JSONLD from "@/components/JSONLD";
import { Mail, Phone, CheckCircle2, ArrowRight, XCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessType: "",
    interest: "growth-plan",
    message: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    phone: "",
    businessType: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when user types
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = { name: "", email: "", phone: "", businessType: "" };

    if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters.";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
      isValid = false;
    }

    // Validation for international/Indian numbers (10 to 15 digits)
    const phoneDigits = formData.phone.replace(/[^0-9]/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      errors.phone = "Please enter a valid WhatsApp number (at least 10 digits).";
      isValid = false;
    }

    if (!formData.businessType) {
      errors.businessType = "Please select a business type.";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong while sending enquiry.");
      }

      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Auto-trigger WhatsApp fallback in separate window after brief timeout
      setTimeout(() => {
        const whatsappText = `Hi ${BUSINESS_CONFIG.name} team, I just filled out your strategy call form! Here are my details:
- Name: ${formData.name}
- Email: ${formData.email}
- WhatsApp: ${formData.phone}
- Business Type: ${formData.businessType}
- Interest: ${formData.interest}
- Message: ${formData.message || "None"}`;

        const encodedText = encodeURIComponent(whatsappText);
        const url = `https://wa.me/${BUSINESS_CONFIG.whatsapp}?text=${encodedText}`;
        window.open(url, "_blank");
      }, 800);

    } catch (err: any) {
      setIsSubmitting(false);
      setSubmitError(err.message || "Submission failed. Please check your internet connection.");
    }
  };

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#050c1a] text-slate-800 dark:text-slate-100 px-4 py-16 sm:px-6 lg:px-8 transition-colors duration-300">
      <JSONLD type="Breadcrumb" data={{ items: breadcrumbs }} />
      
      {/* Background ambient glows */}
      <div className="absolute top-10 left-10 -z-10 h-72 w-72 rounded-full bg-[#00a651]/5 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 -z-10 h-72 w-72 rounded-full bg-[#0d60c4]/5 blur-3xl"></div>

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          
          {/* Info Column */}
          <div className="space-y-6">
            <ScrollReveal direction="left" delay={100}>
              <span className="inline-flex items-center rounded-full border border-[#00a651]/30 bg-[#00a651]/10 px-3.5 py-1 text-xs font-bold text-[#00a651]">
                Let's Talk Growth
              </span>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={200}>
              <h1 className="text-4xl font-extrabold text-[#071a3d] dark:text-white sm:text-5xl">
                Book your free{" "}
                <span className="bg-gradient-to-r from-[#0d60c4] via-[#00a651] to-[#0d60c4] bg-clip-text text-transparent">
                  strategy call
                </span>
              </h1>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={300}>
              <p className="text-base text-slate-600 dark:text-slate-300 sm:text-lg">
                No pressure. Just a structured conversation with our operators about where you want to scale.
              </p>
            </ScrollReveal>

            {/* Steps Container */}
            <ScrollReveal direction="left" delay={400}>
              <div className="space-y-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1c3d] p-6 shadow-sm transition-colors hover:border-[#00a651]/30 duration-500">
                <h3 className="text-base font-bold text-[#071a3d] dark:text-white mb-2">What happens next?</h3>
                <ul className="space-y-3.5 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#00a651]/10 text-[#00a651] text-[10px] font-bold">
                      1
                    </span>
                    <span>Fill out this form — takes less than 60 seconds.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#00a651]/10 text-[#00a651] text-[10px] font-bold">
                      2
                    </span>
                    <span>We will reach out on WhatsApp/Email within 24 hours.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#00a651]/10 text-[#00a651] text-[10px] font-bold">
                      3
                    </span>
                    <span>Schedule a 30-45 min strategy call to map your funnel.</span>
                  </li>
                </ul>
                
                <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                  <p className="text-xs text-slate-400 mb-2">Want to contact us directly?</p>
                  <div className="flex flex-col gap-2.5">
                    <a
                      href={`https://wa.me/${BUSINESS_CONFIG.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-[#00a651] hover:underline"
                    >
                      {/* WhatsApp Brand Logo */}
                      <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.077 4.928C17.191 3.041 14.683 2 12.006 2 6.499 2 2.006 6.493 2.006 12c0 1.76.46 3.483 1.333 5l-1.333 4.86 5.013-1.313c1.452.793 3.087 1.207 4.78 1.207h.004c5.507 0 10-4.493 10-10 0-2.677-1.041-5.185-2.926-7.072z"></path>
                      </svg>
                      <span>WhatsApp: {BUSINESS_CONFIG.whatsappFormatted}</span>
                    </a>
                    <a
                      href={`mailto:${BUSINESS_CONFIG.email}`}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-[#0d60c4] hover:underline"
                    >
                      <Mail size={14} className="shrink-0" />
                      <span>Email: {BUSINESS_CONFIG.email}</span>
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Form Column */}
          <div>
            <ScrollReveal direction="right" delay={200}>
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1c3d] p-6 shadow-sm backdrop-blur-sm sm:p-8 transition-colors hover:border-[#00a651]/30 duration-500">
                <h2 className="mb-6 text-xl font-bold text-[#071a3d] dark:text-white sm:text-2xl">Tell us about your project</h2>
                
                {submitSuccess ? (
                  <div className="rounded-2xl border border-[#00a651]/30 bg-[#00a651]/10 p-6 text-center flex flex-col items-center">
                    <CheckCircle2 size={44} className="text-[#00a651] mb-3 animate-bounce" />
                    <h3 className="text-lg font-bold text-[#00a651]">Form Submitted Successfully!</h3>
                    <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 max-w-sm">
                      We have sent confirmation emails to your address. We are now redirecting you to WhatsApp to connect with our operators immediately.
                    </p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="mt-6 rounded-xl bg-[#071a3d] dark:bg-white text-white dark:text-[#071a3d] px-5 py-2 text-xs font-bold hover:opacity-90 transition-opacity"
                    >
                      Fill Form Again
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {submitError && (
                      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 flex items-start gap-2.5 text-xs text-red-500 font-medium">
                        <XCircle size={16} className="shrink-0 mt-0.5" />
                        <p>{submitError}</p>
                      </div>
                    )}

                    {/* Name */}
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className={`w-full rounded-xl border bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-xs text-[#071a3d] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a651]/20 transition-all duration-300 ${
                          validationErrors.name ? "border-red-500 focus:border-red-500" : "border-slate-200 dark:border-slate-700 focus:border-[#00a651]"
                        }`}
                      />
                      {validationErrors.name && (
                        <p className="mt-1 text-[10px] text-red-500 font-medium">{validationErrors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className={`w-full rounded-xl border bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-xs text-[#071a3d] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a651]/20 transition-all duration-300 ${
                          validationErrors.email ? "border-red-500 focus:border-red-500" : "border-slate-200 dark:border-slate-700 focus:border-[#00a651]"
                        }`}
                      />
                      {validationErrors.email && (
                        <p className="mt-1 text-[10px] text-red-500 font-medium">{validationErrors.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300">WhatsApp Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className={`w-full rounded-xl border bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-xs text-[#071a3d] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a651]/20 transition-all duration-300 ${
                          validationErrors.phone ? "border-red-500 focus:border-red-500" : "border-slate-200 dark:border-slate-700 focus:border-[#00a651]"
                        }`}
                      />
                      {validationErrors.phone && (
                        <p className="mt-1 text-[10px] text-red-500 font-medium">{validationErrors.phone}</p>
                      )}
                    </div>

                    {/* Business Type */}
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300">Business Type *</label>
                      <select
                        name="businessType"
                        required
                        value={formData.businessType}
                        onChange={handleChange}
                        className={`w-full rounded-xl border bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-xs text-[#071a3d] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00a651]/20 transition-all duration-300 ${
                          validationErrors.businessType ? "border-red-500 focus:border-red-500" : "border-slate-200 dark:border-slate-700 focus:border-[#00a651]"
                        }`}
                      >
                        <option value="" disabled>Select business type</option>
                        <option value="D2C Brand">D2C Brand</option>
                        <option value="Service Business">Service Business</option>
                        <option value="Creator / Influencer">Content Creator / Influencer</option>
                        <option value="Local Business">Local Business</option>
                        <option value="SaaS / Tech">SaaS / Tech</option>
                        <option value="Other">Other</option>
                      </select>
                      {validationErrors.businessType && (
                        <p className="mt-1 text-[10px] text-red-500 font-medium">{validationErrors.businessType}</p>
                      )}
                    </div>

                    {/* Interested In */}
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300">Interested In *</label>
                      <select
                        name="interest"
                        required
                        value={formData.interest}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-xs text-[#071a3d] dark:text-white focus:border-[#00a651] focus:outline-none focus:ring-2 focus:ring-[#00a651]/20 transition-all duration-300"
                      >
                        <option value="growth-plan">Free Growth Plan (Strategy Call)</option>
                        <option value="ads">Meta / Google Ads Management</option>
                        <option value="content">Reels &amp; Content Creation</option>
                        <option value="automation">WhatsApp / Email Automation</option>
                        <option value="course">Full DM Course</option>
                        <option value="performance-course">Performance Marketing Course</option>
                        <option value="web-development">Web Development</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300">Message (Optional)</label>
                      <textarea
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your sales goals or current marketing bottlenecks..."
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-xs text-[#071a3d] dark:text-white placeholder-slate-400 focus:border-[#00a651] focus:outline-none focus:ring-2 focus:ring-[#00a651]/20 transition-all duration-300"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#0d60c4] to-[#00a651] py-3.5 text-xs font-bold text-white shadow-lg shadow-[#0d60c4]/25 transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 btn-shimmer"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        <>
                          <span>Submit &amp; book free call</span>
                          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                        </>
                      )}
                    </button>
                    
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </div>
  );
}
