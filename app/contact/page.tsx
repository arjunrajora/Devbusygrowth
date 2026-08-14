"use client";

import React, { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { BUSINESS_CONFIG } from "@/components/businessConfig";
import JSONLD from "@/components/JSONLD";
import { Mail, CheckCircle2, ArrowRight, XCircle, AlertCircle, Phone, MessageCircle, MapPin } from "lucide-react";

interface FormDataState {
  name: string;
  email: string;
  phone: string;
  businessType: string;
  interest: string;
  message: string;
}

interface ValidationErrorsState {
  name?: string;
  email?: string;
  phone?: string;
  businessType?: string;
  interest?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    email: "",
    phone: "",
    businessType: "",
    interest: "",
    message: "",
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrorsState>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Validate a single field
  const validateField = (fieldName: keyof FormDataState, value: string): string => {
    const cleanValue = value.trim();

    switch (fieldName) {
      case "name":
        if (!cleanValue) return "Full Name is required.";
        if (cleanValue.length < 2) return "Name must be at least 2 characters.";
        return "";

      case "email":
        if (!cleanValue) return "Email Address is required.";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(cleanValue)) return "Please enter a valid email address.";
        return "";

      case "phone":
        if (!cleanValue) return "WhatsApp / Phone number is required.";
        const phoneDigits = cleanValue.replace(/[^0-9]/g, "");
        if (phoneDigits.length < 10 || phoneDigits.length > 15) {
          return "Please enter a valid WhatsApp number (at least 10 digits).";
        }
        return "";

      case "businessType":
        if (!cleanValue) return "Please select your business type.";
        return "";

      case "interest":
        if (!cleanValue) return "Please select the service required.";
        return "";

      case "message":
        if (!cleanValue) return "Project description is required.";
        if (cleanValue.length < 5) return "Please describe your project (at least 5 characters).";
        return "";

      default:
        return "";
    }
  };

  // Real-time onChange handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const fieldKey = name as keyof FormDataState;

    setFormData((prev) => ({ ...prev, [fieldKey]: value }));

    // If field was already touched, perform immediate correction validation
    if (touchedFields[name]) {
      const errorMsg = validateField(fieldKey, value);
      setValidationErrors((prev) => ({ ...prev, [fieldKey]: errorMsg }));
    }
  };

  // Field Blur Handler
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const fieldKey = name as keyof FormDataState;

    setTouchedFields((prev) => ({ ...prev, [name]: true }));
    const errorMsg = validateField(fieldKey, value);
    setValidationErrors((prev) => ({ ...prev, [fieldKey]: errorMsg }));
  };

  // Validate entire form on submit
  const validateAllFields = (): boolean => {
    const errors: ValidationErrorsState = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof FormDataState>).forEach((field) => {
      const errorMsg = validateField(field, formData[field]);
      if (errorMsg) {
        errors[field] = errorMsg;
        isValid = false;
      }
    });

    setValidationErrors(errors);
    // Mark all fields as touched to display red borders
    const allTouched: Record<string, boolean> = {
      name: true,
      email: true,
      phone: true,
      businessType: true,
      interest: true,
      message: true,
    };
    setTouchedFields(allTouched);

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateAllFields()) {
      return;
    }

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
        throw new Error(result.error || "Submission failed. Please check details.");
      }

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setSubmitError("");

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        businessType: "",
        interest: "",
        message: "",
      });
      setValidationErrors({});
      setTouchedFields({});

      // Open WhatsApp direct connection in new tab
      setTimeout(() => {
        const whatsappText = `Hi ${BUSINESS_CONFIG.name} team, I just submitted the project enquiry form on the website! Looking forward to connecting.`;
        const encodedText = encodeURIComponent(whatsappText);
        const url = `https://wa.me/${BUSINESS_CONFIG.whatsapp}?text=${encodedText}`;
        window.open(url, "_blank");
      }, 1000);

    } catch (err: any) {
      setIsSubmitting(false);
      setSubmitError(err.message || "Failed to submit enquiry. Please try again.");
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

          {/* Left Column: Official Contact Information */}
          <div className="space-y-8">
            <ScrollReveal direction="left" delay={100}>
              <div className="space-y-4">
                <span className="inline-flex items-center rounded-full border border-[#00a651]/30 bg-[#00a651]/10 px-3.5 py-1 text-xs font-bold text-[#00a651]">
                  Let's Grow Your Business
                </span>
                <h1 className="text-3xl font-extrabold text-[#071a3d] dark:text-white sm:text-4xl lg:text-5xl tracking-tight leading-tight">
                  Have a project, business idea or growth challenge?
                </h1>
                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  Let's talk about how Reels, Ads, AI Automation and Lead Generation can help your business grow.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={200}>
              <div className="space-y-6 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0b1c3d] p-6 sm:p-8 shadow-sm transition-colors hover:border-[#00a651]/30 duration-500">
                <h3 className="text-lg font-bold text-[#071a3d] dark:text-white pb-3 border-b border-slate-100 dark:border-white/5">
                  Contact Information
                </h3>
                
                <div className="space-y-5">
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-[#0d60c4]/10 dark:bg-[#0d60c4]/20 p-2.5 text-[#0d60c4] shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone</p>
                      <a href="tel:+919352757834" className="text-base font-bold text-slate-700 dark:text-slate-100 hover:text-[#00a651] transition-colors mt-0.5 block">
                        9352757834
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-[#00a651]/10 dark:bg-[#00a651]/20 p-2.5 text-[#00a651] shrink-0">
                      <MessageCircle size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">WhatsApp</p>
                      <a href="https://wa.me/919352757834" target="_blank" rel="noopener noreferrer" className="text-base font-bold text-slate-700 dark:text-slate-100 hover:text-[#00a651] transition-colors mt-0.5 block">
                        Chat with us
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-[#0d60c4]/10 dark:bg-[#0d60c4]/20 p-2.5 text-[#0d60c4] shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email</p>
                      <a href="mailto:thebusygrowth@gmail.com" className="text-base font-bold text-slate-700 dark:text-slate-100 hover:text-[#00a651] transition-colors mt-0.5 block">
                        thebusygrowth@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-[#00a651]/10 dark:bg-[#00a651]/20 p-2.5 text-[#00a651] shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Address</p>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-200 mt-1 leading-relaxed">
                        A95, Mathur's Villa,<br />
                        Patel Nagar, Block 1,<br />
                        Bindayaka,<br />
                        Jaipur, Rajasthan – 302041, India
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Follow Us:</span>
                  <a
                    href="https://www.instagram.com/thebusygrowth"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-pink-400 hover:bg-pink-500/10 hover:text-pink-500 transition-all hover:scale-110"
                    aria-label="Instagram"
                  >
                    <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/@THEBUSYGROWTH"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-red-400 hover:bg-red-500/10 hover:text-red-500 transition-all hover:scale-110"
                    aria-label="YouTube"
                  >
                    <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                </div>

              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Tell Us About Your Project Form */}
          <div>
            <ScrollReveal direction="right" delay={200}>
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1c3d] p-6 shadow-sm backdrop-blur-sm sm:p-8 transition-colors hover:border-[#00a651]/30 duration-500">
                <h2 className="mb-6 text-xl font-bold text-[#071a3d] dark:text-white sm:text-2xl">
                  Tell Us About Your Project
                </h2>

                {submitSuccess ? (
                  <div className="rounded-2xl border border-[#00a651]/30 bg-[#00a651]/10 p-6 text-center flex flex-col items-center">
                    <CheckCircle2 size={44} className="text-[#00a651] mb-3 animate-bounce" />
                    <h3 className="text-lg font-bold text-[#00a651]">Enquiry Submitted Successfully!</h3>
                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 max-w-sm leading-relaxed">
                      Thank you for reaching out to <strong>TheBusyGrowth</strong>. A confirmation email has been sent to your address. Our team will review your project and get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="mt-6 rounded-xl bg-gradient-to-r from-[#0d60c4] to-[#00a651] text-white px-6 py-2.5 text-xs font-bold shadow-md hover:scale-105 transition-all"
                    >
                      Submit Another Project
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">

                    {submitError && (
                      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 flex items-start gap-2.5 text-xs text-red-500 font-medium">
                        <XCircle size={16} className="shrink-0 mt-0.5" />
                        <p>{submitError}</p>
                      </div>
                    )}

                    {/* 1. Full Name Field */}
                    <div>
                      <label htmlFor="contact-name" className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-300">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your full name"
                        className={`w-full rounded-xl border bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-xs text-[#071a3d] dark:text-white placeholder-slate-400 focus:outline-none transition-all duration-200 ${
                          validationErrors.name
                            ? "border-red-500 text-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-slate-200 dark:border-slate-700 focus:border-[#00a651] focus:ring-1 focus:ring-[#00a651]/20"
                        }`}
                      />
                      {validationErrors.name && (
                        <p className="mt-1 text.xs text-red-500 font-semibold flex items-center gap-1">
                          <AlertCircle size={12} />
                          <span>{validationErrors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* 2. Email Address Field */}
                    <div>
                      <label htmlFor="contact-email" className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-300">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="you@company.com"
                        className={`w-full rounded-xl border bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-xs text-[#071a3d] dark:text-white placeholder-slate-400 focus:outline-none transition-all duration-200 ${
                          validationErrors.email
                            ? "border-red-500 text-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-slate-200 dark:border-slate-700 focus:border-[#00a651] focus:ring-1 focus:ring-[#00a651]/20"
                        }`}
                      />
                      {validationErrors.email && (
                        <p className="mt-1 text-xs text-red-500 font-semibold flex items-center gap-1">
                          <AlertCircle size={12} />
                          <span>{validationErrors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* 3. Phone / WhatsApp Field */}
                    <div>
                      <label htmlFor="contact-phone" className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-300">
                        WhatsApp / Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="+91 98765 43210"
                        className={`w-full rounded-xl border bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-xs text-[#071a3d] dark:text-white placeholder-slate-400 focus:outline-none transition-all duration-200 ${
                          validationErrors.phone
                            ? "border-red-500 text-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-slate-200 dark:border-slate-700 focus:border-[#00a651] focus:ring-1 focus:ring-[#00a651]/20"
                        }`}
                      />
                      {validationErrors.phone && (
                        <p className="mt-1 text-xs text-red-500 font-semibold flex items-center gap-1">
                          <AlertCircle size={12} />
                          <span>{validationErrors.phone}</span>
                        </p>
                      )}
                    </div>

                    {/* 4. Business Type / Company Field */}
                    <div>
                      <label htmlFor="contact-business" className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-300">
                        Business Type / Company <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="contact-business"
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full rounded-xl border bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-xs text-[#071a3d] dark:text-white focus:outline-none transition-all duration-200 ${
                          validationErrors.businessType
                            ? "border-red-500 text-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-slate-200 dark:border-slate-700 focus:border-[#00a651] focus:ring-1 focus:ring-[#00a651]/20"
                        }`}
                      >
                        <option value="" disabled>Select your business type</option>
                        <option value="E-Commerce / D2C Brand">E-Commerce / D2C Brand</option>
                        <option value="Service Agency / B2B">Service Agency / B2B</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Education / Coaching">Education / Coaching</option>
                        <option value="Local Retail Business">Local Retail Business</option>
                        <option value="SaaS / Tech Company">SaaS / Tech Company</option>
                        <option value="Content Creator / Influencer">Content Creator / Influencer</option>
                        <option value="Other Business">Other Business</option>
                      </select>
                      {validationErrors.businessType && (
                        <p className="mt-1 text-xs text-red-500 font-semibold flex items-center gap-1">
                          <AlertCircle size={12} />
                          <span>{validationErrors.businessType}</span>
                        </p>
                      )}
                    </div>

                    {/* 5. Services Required / Interest Field */}
                    <div>
                      <label htmlFor="contact-interest" className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-300">
                        Services Required <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="contact-interest"
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full rounded-xl border bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-xs text-[#071a3d] dark:text-white focus:outline-none transition-all duration-200 ${
                          validationErrors.interest
                            ? "border-red-500 text-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-slate-200 dark:border-slate-700 focus:border-[#00a651] focus:ring-1 focus:ring-[#00a651]/20"
                        }`}
                      >
                        <option value="" disabled>Select service required</option>
                        <option value="Free Growth Strategy Call">Free Growth Strategy Call</option>
                        <option value="Meta & Google Ads Management">Meta &amp; Google Ads Management</option>
                        <option value="Social Media & Video Editing">Social Media &amp; Video Editing</option>
                        <option value="AI & Automation Flows">AI &amp; Automation Flows</option>
                        <option value="Full Digital Marketing Course">Full Digital Marketing Course</option>
                        <option value="Performance Marketing Course">Performance Marketing Course</option>
                        <option value="SEO & Custom Web Development">SEO &amp; Custom Web Development</option>
                      </select>
                      {validationErrors.interest && (
                        <p className="mt-1 text-xs text-red-500 font-semibold flex items-center gap-1">
                          <AlertCircle size={12} />
                          <span>{validationErrors.interest}</span>
                        </p>
                      )}
                    </div>

                    {/* 6. Project Description / Message Field */}
                    <div>
                      <label htmlFor="contact-message" className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-300">
                        Project Description / Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Tell us about your business goals, sales targets, or current marketing bottlenecks..."
                        className={`w-full rounded-xl border bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-xs text-[#071a3d] dark:text-white placeholder-slate-400 focus:outline-none transition-all duration-200 ${
                          validationErrors.message
                            ? "border-red-500 text-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-slate-200 dark:border-slate-700 focus:border-[#00a651] focus:ring-1 focus:ring-[#00a651]/20"
                        }`}
                      />
                      {validationErrors.message && (
                        <p className="mt-1 text-xs text-red-500 font-semibold flex items-center gap-1">
                          <AlertCircle size={12} />
                          <span>{validationErrors.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0d60c4] to-[#00a651] py-3.5 text-xs font-bold text-white shadow-lg shadow-[#0d60c4]/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 btn-shimmer"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Submitting Enquiry...
                        </span>
                      ) : (
                        <>
                          <span>Submit Project Enquiry</span>
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
