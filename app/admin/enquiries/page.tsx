"use client";

import React, { useState } from "react";
import { Search, Filter, Mail, Phone, Calendar, CheckCircle2, Clock, Sparkles } from "lucide-react";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: "New" | "Contacted" | "Converted";
  date: string;
}

const SAMPLE_ENQUIRIES: Enquiry[] = [
  {
    id: "ENQ-1001",
    name: "Rohan Sharma",
    email: "rohan.sharma@example.com",
    phone: "+91 98290 12345",
    service: "Meta & Google Ads",
    message: "Interested in scaling our e-commerce performance marketing campaign in Jaipur.",
    status: "New",
    date: "2026-08-13",
  },
  {
    id: "ENQ-1002",
    name: "Ananya Patel",
    email: "ananya@growthbrand.co",
    phone: "+91 94140 67890",
    service: "Full Digital Marketing Course",
    message: "Inquiring about upcoming cohort dates and syllabus details.",
    status: "Contacted",
    date: "2026-08-12",
  },
  {
    id: "ENQ-1003",
    name: "Vikramaditya Singh",
    email: "vikram@singhrealestate.in",
    phone: "+91 98291 99887",
    service: "AI & Automation Flows",
    message: "Need automated lead qualification and WhatsApp chatbot integration for real estate leads.",
    status: "Converted",
    date: "2026-08-10",
  },
];

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(SAMPLE_ENQUIRIES);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  const filteredEnquiries = enquiries.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.service.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === "All" || item.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      case "Contacted":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      case "Converted":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      default:
        return "bg-slate-500/10 text-slate-600 border-slate-500/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Contact Enquiries
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Review and manage client leads submitted via website contact form
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-2xl bg-white/80 dark:bg-[#071a3d]/80 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200">
            Total Leads: <strong className="text-[#0d60c4] dark:text-[#00a651]">{enquiries.length}</strong>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-[#071a3d]/90 p-4 shadow-xl backdrop-blur-xl flex flex-col sm:flex-row gap-4 justify-between items-center">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email or service..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-[#050c1a] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0d60c4]"
          />
        </div>

        {/* Status Filter buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {["All", "New", "Contacted", "Converted"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                filterStatus === status
                  ? "bg-[#0d60c4] dark:bg-[#00a651] text-white shadow-md"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-[#071a3d]/90 overflow-hidden shadow-xl backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#050c1a] border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider font-bold">
              <tr>
                <th className="py-3.5 px-6">ID & Date</th>
                <th className="py-3.5 px-6">Lead Name</th>
                <th className="py-3.5 px-6">Service Requested</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {filteredEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    No enquiries found matching your search.
                  </td>
                </tr>
              ) : (
                filteredEnquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-slate-50/60 dark:hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900 dark:text-slate-100">{enquiry.id}</div>
                      <div className="text-slate-400 text-[11px] mt-0.5">{enquiry.date}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">{enquiry.name}</div>
                      <div className="text-slate-400 text-[11px]">{enquiry.email}</div>
                    </td>
                    <td className="py-4 px-6 text-slate-700 dark:text-slate-300">
                      {enquiry.service}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-bold ${getStatusBadge(enquiry.status)}`}>
                        {enquiry.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setSelectedEnquiry(enquiry)}
                        className="px-3 py-1.5 rounded-xl bg-[#0d60c4]/10 dark:bg-[#00a651]/10 text-[#0d60c4] dark:text-[#00a651] hover:bg-[#0d60c4]/20 dark:hover:bg-[#00a651]/20 font-bold transition-all"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-[#050c1a]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071a3d] p-6 shadow-2xl space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-[#0d60c4] dark:text-[#00a651] uppercase tracking-wider">
                  Enquiry Details • {selectedEnquiry.id}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {selectedEnquiry.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <Mail size={14} className="text-slate-400" />
                <span>{selectedEnquiry.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <Phone size={14} className="text-slate-400" />
                <span>{selectedEnquiry.phone}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#050c1a] border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Message</span>
                <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                  "{selectedEnquiry.message}"
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
