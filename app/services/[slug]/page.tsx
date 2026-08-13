import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BUSINESS_CONFIG } from "@/components/businessConfig";
import JSONLD from "@/components/JSONLD";
import {
  Megaphone,
  BarChart3,
  Bot,
  Video,
  Globe,
  Settings,
  Sparkles,
  Calendar,
  TrendingUp,
  Users,
  Award,
  ShieldCheck,
  Zap,
  Search,
  Check,
  Star,
  ArrowLeft,
  ArrowRight,
  ClipboardList
} from "lucide-react";

// Helper function to turn strings into clean URL slugs
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

interface ServiceDetail {
  slug: string;
  category: string;
  categorySlug: string;
  icon: string;
  title: string;
  tagline: string;
  image: string;
  description: string;
  deliverables: string[];
  benefits: string[];
  plans: {
    name: string;
    price: string;
    period: string;
    description: string;
    popular?: boolean;
    features: string[];
  }[];
}

// Comprehensive data repository for Social Media services and common offerings
const SERVICES_DETAILS_DATABASE: Record<string, ServiceDetail> = {
  "social-media-strategy": {
    slug: "social-media-strategy",
    category: "Social Media Mastery",
    categorySlug: "social-media",
    icon: "📱",
    title: "Social Media Strategy",
    tagline: "Data-driven, algorithm-proof social strategies aligned with your revenue goals.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80",
    description:
      "We craft comprehensive social media roadmaps that analyze your competitive landscape, define target audience personas, map content funnels, and pinpoint high-converting content hooks. No guesswork — just structured execution built for predictable brand growth.",
    deliverables: [
      "In-depth Competitor & Market Positioning Audit",
      "Target Audience Persona & Psychology Mapping",
      "Multi-Platform Channel Architecture (IG, LinkedIn, YouTube, X)",
      "Content Pillars & Brand Voice Guidelines",
      "Monthly Editorial Calendar & KPI Benchmarks",
      "Funnel Mapping from Organic Impression to Lead Conversion",
    ],
    benefits: [
      "Build a distinct brand identity that stands out in crowded feeds",
      "Eliminate random posting and establish consistent brand authority",
      "Turn casual followers into engaged brand advocates and customers",
      "Maximize return on content investments with strategic distribution",
    ],
    plans: [
      {
        name: "Starter Strategy",
        price: "₹14,999",
        period: "/one-time",
        description: "Essential strategy blueprint for new brands and solo creators.",
        features: [
          "Complete Account & Competitor Audit",
          "Audience Persona Identification",
          "3 Core Content Pillars",
          "Brand Voice & Guidelines Deck",
          "15 Content Hook Ideas",
          "1 Strategy Consultation Call",
        ],
      },
      {
        name: "Growth Strategy",
        price: "₹29,999",
        period: "/month",
        popular: true,
        description: "Full multi-channel roadmap with bi-weekly optimization.",
        features: [
          "Everything in Starter Strategy",
          "Full 30-Day Editorial Content Calendar",
          "5 Content Pillars & Carousel Templates",
          "Reel & Short-Form Video Hook Scripts",
          "Bi-Weekly Performance Reviews",
          "Direct WhatsApp Support Access",
        ],
      },
      {
        name: "Enterprise Scale",
        price: "₹59,999",
        period: "/month",
        description: "Dedicated strategist & custom omnichannel growth execution.",
        features: [
          "Everything in Growth Strategy",
          "Dedicated Social Media Strategist",
          "Omnichannel Funnel & Retargeting Blueprint",
          "Influencer & Collaboration Strategy",
          "Weekly Analytics & Conversion Tracking",
          "Priority 24/7 Slack / WhatsApp Channel",
        ],
      },
    ],
  },
  "account-setup-optimization": {
    slug: "account-setup-optimization",
    category: "Social Media Mastery",
    categorySlug: "social-media",
    icon: "⚙️",
    title: "Account Setup & Optimization",
    tagline: "Convert casual profile visitors into loyal followers and paying leads.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    description:
      "Transform your social profiles into high-converting digital storefronts. We optimize your bio copy, highlight covers, link tree funnels, branding assets, and verification settings across Instagram, Facebook, LinkedIn, and YouTube.",
    deliverables: [
      "High-Converting SEO Bio Copy & CTA Funnels",
      "Custom Story Highlights Cover Designs",
      "Link-in-Bio Setup & UTM Tracking Integration",
      "Profile Verification & Security Hardening",
      "Search Keyword & Category Optimization",
      "Banner & Profile Picture Graphic Optimization",
    ],
    benefits: [
      "Increase profile-to-follower conversion rate immediately",
      "Establish professional credibility and trust at first glance",
      "Direct profile traffic efficiently to sales pages or WhatsApp",
      "Ensure search engines & platform search algorithms find your profile",
    ],
    plans: [
      {
        name: "Basic Audit & Fix",
        price: "₹7,999",
        period: "/one-time",
        description: "Quick setup cleanup for single platform profiles.",
        features: [
          "Single Platform Optimization (IG or LinkedIn)",
          "SEO Bio Copywriting",
          "5 Highlight Cover Designs",
          "Link Tree Setup",
          "Profile Security Check",
        ],
      },
      {
        name: "Multi-Platform Pro",
        price: "₹14,999",
        period: "/one-time",
        popular: true,
        description: "Complete overhaul across 3 social media channels.",
        features: [
          "Optimization for Instagram, LinkedIn & Facebook",
          "SEO Bio & Keyword Optimization",
          "Custom Branding Banners & Covers",
          "WhatsApp CTA Integration",
          "Highlights Architecture (up to 10 covers)",
          "1-on-1 Walkthrough Call",
        ],
      },
      {
        name: "Full Brand Storefront",
        price: "₹24,999",
        period: "/one-time",
        description: "All platforms + custom landing page / link hub.",
        features: [
          "All Social Channels + YouTube Channel Art",
          "Custom Branded Link Hub Landing Page",
          "Pixel & Event Tracking Verification",
          "Security Hardening & 2FA Setup",
          "Social Proof Badge Setup",
          "Lifetime Profile Maintenance Guide",
        ],
      },
    ],
  },
  "content-creation": {
    slug: "content-creation",
    category: "Social Media Mastery",
    categorySlug: "social-media",
    icon: "🎨",
    title: "Content Creation",
    tagline: "High-performing graphics, carousels, and visual assets designed to capture attention.",
    image: "https://images.unsplash.com/photo-1542744094-3a3172720188?auto=format&fit=crop&w=1200&q=80",
    description:
      "Attention is the currency of the digital age. Our creative team designs scroll-stopping carousels, sleek infographics, motion graphics, and brand-aligned visual assets engineered for maximum engagement and viral reach.",
    deliverables: [
      "Custom Multi-Slide Carousels & Infographics",
      "Motion Graphics & Short Visual Loops",
      "On-Brand Typography & Visual Style Guide",
      "High-CTR Copywriting Hooks & Captions",
      "Raw Editable Source Files Handover",
      "Format Variations for Stories, Feeds & LinkedIn",
    ],
    benefits: [
      "Capture immediate viewer focus in competitive social feeds",
      "Elevate brand perception with agency-grade visual design",
      "Increase saves and shares with high-value educational carousels",
      "Save 40+ hours per month on design and copywriting production",
    ],
    plans: [
      {
        name: "Starter Pack",
        price: "₹19,999",
        period: "/month",
        description: "12 custom visual posts for steady brand activity.",
        features: [
          "12 High-Quality Graphics / Carousels",
          "Copywriting & Caption Writing",
          "Hashtag Strategy Included",
          "2 Rounds of Revisions",
          "Source File Delivery",
        ],
      },
      {
        name: "Growth Creator",
        price: "₹34,999",
        period: "/month",
        popular: true,
        description: "20 posts including high-converting carousels.",
        features: [
          "20 Custom Posts (12 Single + 8 Carousels)",
          "Engaging Caption Copywriting & CTA Hooks",
          "Story Graphics & Interactive Poll Templates",
          "Unlimited Minor Revisions",
          "Dedicated Graphic Designer",
        ],
      },
      {
        name: "Scale Omnichannel",
        price: "₹59,999",
        period: "/month",
        description: "30+ posts with motion graphics & multi-format export.",
        features: [
          "30 Visual Assets (Graphics + Motion + Carousels)",
          "Cross-Platform Re-formatting (IG, LinkedIn, Twitter)",
          "Brand Style Kit & Custom Illustration",
          "Fast 24-Hour Turnaround Times",
          "Dedicated Content Team & Project Manager",
        ],
      },
    ],
  },
  "content-calendar-planning": {
    slug: "content-calendar-planning",
    category: "Social Media Mastery",
    categorySlug: "social-media",
    icon: "📅",
    title: "Content Calendar Planning",
    tagline: "Never run out of ideas with strategic 30-day organized content roadmaps.",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80",
    description:
      "Consistency is key to social media growth. We plan, structure, and schedule your entire content calendar 30 days in advance, matching industry trends, product launches, seasonal campaigns, and your sales funnel objectives.",
    deliverables: [
      "30-Day Automated Editorial Calendar Dashboard",
      "Strategic Ratio of Educational, Entertaining & Promotional Content",
      "Optimal Posting Schedule Based on Audience Peak Engagement Hours",
      "Caption & Hashtag Vault Organization",
      "Approval & Revision Workflow Dashboard",
      "Holiday & Trend Mapping Alerts",
    ],
    benefits: [
      "Eliminate last-minute panic and inconsistent posting schedules",
      "Ensure every piece of content maps to a business goal or conversion point",
      "Streamline team approval workflows with a clear centralized view",
      "Capitalize early on seasonal holidays and trending industry events",
    ],
    plans: [
      {
        name: "Monthly Calendar",
        price: "₹9,999",
        period: "/month",
        description: "Structured 30-day posting schedule & topic framework.",
        features: [
          "30-Day Topic & Angle Strategy",
          "Best Time-to-Post Schedule",
          "Caption Outline & Hook Prompts",
          "Hashtag Bank Included",
          "Notion / Trello Calendar Delivery",
        ],
      },
      {
        name: "Full Editorial Plan",
        price: "₹18,999",
        period: "/month",
        popular: true,
        description: "Complete calendar with ready-to-publish captions & hooks.",
        features: [
          "30-Day Full Content Calendar",
          "Done-For-You Captions & Call-To-Actions",
          "Reel Audio & Video Concept Prompts",
          "Multi-Platform Scheduling Integration",
          "Monthly Content Planning Call",
        ],
      },
      {
        name: "Quarterly Masterplan",
        price: "₹44,999",
        period: "/quarter",
        description: "90-day comprehensive campaign & product launch planning.",
        features: [
          "90-Day Omnichannel Editorial Masterplan",
          "Product Launch & Event Campaign Funnels",
          "A/B Testing Framework for Content Angles",
          "Real-time Calendar Adjustments & Monitoring",
          "Dedicated Content Strategist",
        ],
      },
    ],
  },
  "social-media-management": {
    slug: "social-media-management",
    category: "Social Media Mastery",
    categorySlug: "social-media",
    icon: "📈",
    title: "Social Media Management",
    tagline: "Complete end-to-end management of your social channels so you can build your business.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    description:
      "Hand off your daily social media operations to dedicated growth managers. From publishing and community moderation to active engagement and performance tracking, we run your accounts like clockwork.",
    deliverables: [
      "Daily Publishing & Multi-Platform Moderation",
      "Community Management & Active Comment Responses",
      "Story Management & Interactive Engagement Polls",
      "Monthly Performance Snapshot & Growth Reports",
      "Strategic Optimization Based on Monthly Analytics",
      "Spam Filter & Brand Reputation Oversight",
    ],
    benefits: [
      "Free up hundreds of hours of executive time every month",
      "Maintain active, responsive community interaction 7 days a week",
      "Scale brand reach with zero operational friction",
      "Receive detailed data reports showing real audience growth",
    ],
    plans: [
      {
        name: "Essential Management",
        price: "₹24,999",
        period: "/month",
        description: "Core account publishing and community moderation.",
        features: [
          "1 Social Media Platform (Instagram or LinkedIn)",
          "15 Posts Published per Month",
          "Daily Comment & DM Moderation",
          "Monthly Performance Report",
          "Dedicated Account Manager",
        ],
      },
      {
        name: "Growth Management",
        price: "₹44,999",
        period: "/month",
        popular: true,
        description: "Complete management for 2 major social platforms.",
        features: [
          "2 Social Media Platforms (Instagram + LinkedIn/FB)",
          "24 Posts + Stories Management",
          "Active Outbound Community Engagement",
          "Bi-Weekly Analytics Review Calls",
          "WhatsApp Direct Support Group",
        ],
      },
      {
        name: "Full Dominance",
        price: "₹79,999",
        period: "/month",
        description: "Total omnichannel management & growth team.",
        features: [
          "All Major Channels (IG, FB, LinkedIn, YouTube, X)",
          "Daily Posting & High-Touch Moderation",
          "Dedicated Social Team (Strategist, Copywriter, Designer)",
          "Weekly Growth Calls & Strategy Pivots",
          "Priority 24/7 VIP Support",
        ],
      },
    ],
  },
  "audience-engagement": {
    slug: "audience-engagement",
    category: "Social Media Mastery",
    categorySlug: "social-media",
    icon: "🤝",
    title: "Audience Engagement",
    tagline: "Build an active, thriving community around your brand with proactive interaction.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
    description:
      "Turn passive lurkers into passionate brand advocates. We conduct outbound engagement, interact with target niche communities, reply to DMs, and spark meaningful conversations that build trust and authority.",
    deliverables: [
      "Proactive Outbound Niche Community Engagement",
      "Direct Message (DM) Lead Qualification & Escalation",
      "Live Q&A & Community Interactive Story Sequences",
      "Relationship Building with Key Industry Peers",
      "Brand Sentiment & Reputation Protection Monitoring",
      "Custom Response Scripting Aligned with Tone of Voice",
    ],
    benefits: [
      "Trigger platform algorithms through high engagement signals",
      "Convert casual profile visitors into high-intent inbound leads",
      "Build genuine brand affinity and customer loyalty",
      "Identify customer pain points and product feedback early",
    ],
    plans: [
      {
        name: "Core Engagement",
        price: "₹12,999",
        period: "/month",
        description: "Outbound engagement for growing accounts.",
        features: [
          "1 Hour Daily Targeted Engagement",
          "Comment Response Guarantee within 4 Hours",
          "Basic DM Qualification",
          "Monthly Engagement Growth Report",
        ],
      },
      {
        name: "Pro Growth Engagement",
        price: "₹24,999",
        period: "/month",
        popular: true,
        description: "High-touch community building & lead routing.",
        features: [
          "2.5 Hours Daily Targeted Niche Engagement",
          "Comment Response Guarantee within 1 Hour",
          "DM Lead Qualification & WhatsApp Routing",
          "Weekly Engagement Metrics Dashboard",
          "Custom Conversation Playbook",
        ],
      },
      {
        name: "VIP Brand Community",
        price: "₹44,999",
        period: "/month",
        description: "Full-time community manager & instant response team.",
        features: [
          "Dedicated Full-Time Community Manager",
          "Instant Comment & DM Response Protocol",
          "Strategic Industry Peer Outreach",
          "Customer Support Integration",
          "24/7 Crisis & Sentiment Monitoring",
        ],
      },
    ],
  },
  "influencer-marketing": {
    slug: "influencer-marketing",
    category: "Social Media Mastery",
    categorySlug: "social-media",
    icon: "🌟",
    title: "Influencer Marketing",
    tagline: "Amplify your reach with vetted creator partnerships and authentic brand endorsements.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    description:
      "Harness creator authority to scale your brand. We identify, negotiate with, and manage high-ROI creators and micro-influencers whose followers match your ideal customer profile.",
    deliverables: [
      "Influencer Discovery & Vetting (Fake Follower Checks)",
      "Campaign Briefing & Creative Direction Documents",
      "Contract Negotiation & Content Usage Rights Management",
      "Product Gifting & UGC Campaign Coordination",
      "ROI & Sales Conversion Attribution Tracking",
      "Asset Handover for Paid Ad Retargeting",
    ],
    benefits: [
      "Gain immediate trust through authentic creator endorsements",
      "Generate high-converting User Generated Content (UGC) for ad campaigns",
      "Tap into targeted micro-audiences at lower acquisition costs",
      "Hand off contract negotiations and logistics completely",
    ],
    plans: [
      {
        name: "Micro Campaign",
        price: "₹29,999",
        period: "/campaign",
        description: "Campaign setup with 5 vetted micro-influencers.",
        features: [
          "Discovery & Vetting of 5 Micro-Influencers",
          "Creative Campaign Brief",
          "Contracting & Product Delivery Coordination",
          "Content Quality Control",
          "Campaign Performance Summary",
        ],
      },
      {
        name: "Growth Creator Drive",
        price: "₹59,999",
        period: "/campaign",
        popular: true,
        description: "12-15 influencer partnerships with ad usage rights.",
        features: [
          "Discovery & Vetting of 12-15 Influencers",
          "Full Contract & Licensing Negotiation",
          "Paid Ad Usage Rights Acquisition",
          "UGC Content Vault Handover",
          "Detailed Sales Attribution Analytics",
        ],
      },
      {
        name: "Enterprise Ambassador",
        price: "₹1,19,999",
        period: "/campaign",
        description: "Scale creator campaign with macro influencers.",
        features: [
          "Macro & Tier-1 Creator Partnerships",
          "Multi-Channel Endorsement Campaign",
          "Exclusive Brand Ambassador Agreements",
          "Dedicated Influencer Manager",
          "Full Legal & Rights Licensing Handover",
        ],
      },
    ],
  },
  "analytics-reporting": {
    slug: "analytics-reporting",
    category: "Social Media Mastery",
    categorySlug: "social-media",
    icon: "📊",
    title: "Analytics & Reporting",
    tagline: "Transparent, data-driven reporting that tracks revenue, engagement, and growth metrics.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    description:
      "Cut through vanity metrics and see what actually drives ROI. We deliver clear, actionable monthly dashboards breaking down reach, follower growth, website click-throughs, and campaign performance.",
    deliverables: [
      "Custom Data Studio / Looker Performance Dashboards",
      "Full Metric Breakdown (Reach, Impressions, CTR, Conversions)",
      "Content Performance Rankings (Top Performing Reels & Posts)",
      "Competitor Benchmark Comparisons",
      "Actionable Optimization Recommendations for Next Month",
      "Executive Video Walkthrough Briefing",
    ],
    benefits: [
      "Know exactly which content formats generate business revenue",
      "Eliminate guessing with empirical monthly data trends",
      "Present executive-ready reports to stakeholders and leadership",
      "Reallocate marketing budget to highest performing social assets",
    ],
    plans: [
      {
        name: "Monthly Audit Report",
        price: "₹8,999",
        period: "/month",
        description: "Standard monthly performance overview report.",
        features: [
          "PDF Performance Report",
          "Core Metrics Breakdown (Reach, Engagement, Clicks)",
          "Top 5 Posts Analysis",
          "Key Takeaways & Next Month Recommendations",
        ],
      },
      {
        name: "Live Data Dashboard",
        price: "₹16,999",
        period: "/month",
        popular: true,
        description: "Real-time custom dashboard & monthly strategy call.",
        features: [
          "Interactive 24/7 Custom Looker Dashboard",
          "Competitor Benchmark Comparison",
          "Funnel Conversion & Traffic Attribution",
          "Monthly 45-Min Strategy Briefing Call",
          "Loom Video Summary Included",
        ],
      },
      {
        name: "Full BI & Attribution",
        price: "₹34,999",
        period: "/month",
        description: "Enterprise Business Intelligence & CRM integration.",
        features: [
          "Omnichannel Data Integration (Social + Ads + CRM)",
          "Customer Lifetime Value (LTV) & CPA Attribution",
          "Custom Predictive Analytics Models",
          "Weekly Data Digest & Executive Call",
          "Dedicated Data Analyst Support",
        ],
      },
    ],
  },
  "brand-monitoring": {
    slug: "brand-monitoring",
    category: "Social Media Mastery",
    categorySlug: "social-media",
    icon: "🛡️",
    title: "Brand Monitoring",
    tagline: "Protect your online reputation and track brand mentions across the web 24/7.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    description:
      "Stay informed on what customers and competitors are saying about your brand. We monitor brand mentions, hashtags, product feedback, and industry discussions in real-time to mitigate risks and capitalize on positive PR.",
    deliverables: [
      "Real-Time Brand Mention & Hashtag Tracking",
      "Sentiment Analysis (Positive, Neutral, Negative Alerts)",
      "Crisis Prevention & Emergency Response Protocols",
      "Competitor Keyword & Campaign Monitoring",
      "Monthly Reputation Health Score Summary",
      "User Feedback Aggregation for Product Teams",
    ],
    benefits: [
      "Catch customer complaints or PR risks before they escalate",
      "Discover un-tagged viral mentions and turn them into marketing assets",
      "Benchmark public perception directly against your top competitors",
      "Engage instantly with high-intent customer inquiries",
    ],
    plans: [
      {
        name: "Standard Monitor",
        price: "₹11,999",
        period: "/month",
        description: "24/7 mention tracking for growing brands.",
        features: [
          "Brand Name & Keyword Tracking",
          "Daily Mention Digests",
          "Basic Sentiment Analysis",
          "Monthly PR Health Summary",
        ],
      },
      {
        name: "Pro Reputation Guard",
        price: "₹22,999",
        period: "/month",
        popular: true,
        description: "Real-time alerts & crisis mitigation support.",
        features: [
          "Real-Time Instant Alerts for Negative Mentions",
          "Competitor Keyword Tracking (up to 3 competitors)",
          "UGC Content Identification & Licensing Support",
          "Emergency PR Response Playbook",
          "Weekly Sentiment Dashboard",
        ],
      },
      {
        name: "Enterprise Defense",
        price: "₹44,999",
        period: "/month",
        description: "Complete web & social listening infrastructure.",
        features: [
          "Omnichannel Web, News, Reddit & Social Listening",
          "24/7 Dedicated Crisis Response Team",
          "Executive Sentiment Briefings",
          "Copyright & Trademark Infringement Takedown Support",
          "Custom API Integration",
        ],
      },
    ],
  },
  "hashtag-trend-research": {
    slug: "hashtag-trend-research",
    category: "Social Media Mastery",
    categorySlug: "social-media",
    icon: "🔥",
    title: "Hashtag & Trend Research",
    tagline: "Ride viral trends early and expand organic reach with data-backed keyword strategies.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    description:
      "Don't let algorithms leave you behind. We continuously research viral audio, trending formats, and low-competition niche hashtags to give your posts maximum organic visibility.",
    deliverables: [
      "Niche-Specific Hashtag Vaults (Low, Medium, High Volume)",
      "Weekly Trending Audio & Reel Format Alerts",
      "Algorithm Update Analysis & Strategy Adjustments",
      "Platform SEO Keyword Mapping (Instagram & TikTok Search)",
      "Trend Adaptation Guides for Fast Content Production",
      "Competitor Hashtag Strategy Breakdown",
    ],
    benefits: [
      "Increase organic post reach and explore page placements",
      "Jump on viral trends days before your competitors",
      "Optimize content for in-app search engines (Social SEO)",
      "Save hours of manual trend hunting every week",
    ],
    plans: [
      {
        name: "Weekly Trend Alert",
        price: "₹6,999",
        period: "/month",
        description: "Weekly trending audio & format updates.",
        features: [
          "Weekly PDF Trend Digest (Audio + Concepts)",
          "Categorized Hashtag Bank (30 Hashtags)",
          "Social SEO Keyword Prompts",
          "WhatsApp Broadcast Delivery",
        ],
      },
      {
        name: "Pro SEO & Trend Pack",
        price: "₹14,999",
        period: "/month",
        popular: true,
        description: "Custom hashtag vaults & fast-trend execution blueprints.",
        features: [
          "Custom Segmented Hashtag Vaults (Updated Weekly)",
          "Immediate Viral Audio Alerts",
          "Done-For-You Trend Adaptation Scripts",
          "Platform SEO Optimization Guide",
          "Monthly Trend Review Call",
        ],
      },
      {
        name: "Viral Dominance",
        price: "₹28,999",
        period: "/month",
        description: "Dedicated trend strategist & rapid production briefing.",
        features: [
          "Dedicated Trend & Audio Researcher",
          "24-Hour Custom Script Delivery for Breaking Trends",
          "Omnichannel Keyword & SEO Matrix",
          "Exclusive Creator Audio Database Access",
          "Priority WhatsApp Direct Support",
        ],
      },
    ],
  },
  "social-media-audit": {
    slug: "social-media-audit",
    category: "Social Media Mastery",
    categorySlug: "social-media",
    icon: "🔍",
    title: "Social Media Audit",
    tagline: "Deep-dive audit of your existing accounts to uncover hidden leaks and growth opportunities.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    description:
      "Uncover why your social growth has stalled. We perform an exhaustive 40-point audit evaluating your bio, content performance, posting frequency, visual aesthetics, audience sentiment, and funnel conversion bottlenecks.",
    deliverables: [
      "40-Point Comprehensive Account Evaluation Report",
      "Detailed Content Performance & Engagement Analysis",
      "Bio & Conversion Funnel Optimization Breakdown",
      "Competitor Gap Analysis & Positioning Review",
      "Actionable 30-Day Quick-Fix Action Plan",
      "1-on-1 Strategy Walkthrough Call with Senior Growth Lead",
    ],
    benefits: [
      "Pinpoint exact bottlenecks preventing account growth",
      "Receive step-by-step instructions to fix low engagement",
      "Identify high-performing content types you should double down on",
      "Get clarity on your social media ROI without committing to monthly retainers",
    ],
    plans: [
      {
        name: "Single Channel Audit",
        price: "₹9,999",
        period: "/one-time",
        description: "Deep audit of 1 social media profile.",
        features: [
          "25-Point Checklist Audit Report",
          "Bio & Link Funnel Review",
          "Top 10 Content Post Analysis",
          "PDF Report Delivery",
          "30-Min Walkthrough Call",
        ],
      },
      {
        name: "Omnichannel Master Audit",
        price: "₹18,999",
        period: "/one-time",
        popular: true,
        description: "Full 40-point audit across up to 3 accounts.",
        features: [
          "40-Point Comprehensive Audit across 3 Channels",
          "Competitor Benchmarking (2 Competitors)",
          "Visual Grid & Brand Identity Evaluation",
          "Actionable 30-Day Growth Roadmap",
          "60-Min Interactive Strategy Video Call",
        ],
      },
      {
        name: "Audit + Execution Blueprint",
        price: "₹32,999",
        period: "/one-time",
        description: "Comprehensive audit + ready-to-publish content templates.",
        features: [
          "Everything in Omnichannel Master Audit",
          "5 Custom Carousel Templates Designed",
          "15 Ready-to-Publish Caption Scripts",
          "Hashtag & SEO Keyword Vault Handover",
          "30-Day Follow-Up Performance Check",
        ],
      },
    ],
  },
};

// Fallback generator for non-predefined slugs
function getServiceBySlug(slug: string): ServiceDetail {
  if (SERVICES_DETAILS_DATABASE[slug]) {
    return SERVICES_DETAILS_DATABASE[slug];
  }

  // Generate fallback details gracefully
  const cleanTitle = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    slug,
    category: "Digital Growth Services",
    categorySlug: "social-media",
    icon: "🚀",
    title: cleanTitle,
    tagline: `Professional ${cleanTitle} designed to scale your business predictability.`,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    description: `Our ${cleanTitle} service provides data-driven strategies, premium execution, and transparent reporting to help your brand stand out and convert qualified traffic into revenue.`,
    deliverables: [
      `Custom ${cleanTitle} Strategy & Execution Plan`,
      "Dedicated Project Lead & Account Management",
      "Full Performance Metrics & Monthly Dashboard",
      "Continuous Optimization & A/B Testing",
      "High-Converting Asset Handover",
    ],
    benefits: [
      `Accelerate brand growth with specialized ${cleanTitle}`,
      "Save valuable internal bandwidth and executive time",
      "Drive measurable return on investment (ROI)",
      "Leverage modern AI tools and agency-proven workflows",
    ],
    plans: [
      {
        name: "Starter Package",
        price: "₹14,999",
        period: "/month",
        description: `Essential ${cleanTitle} execution for growing brands.`,
        features: [
          "Core Campaign Setup & Strategy",
          "Monthly Analytics Report",
          "Standard Turnaround Time",
          "Email & WhatsApp Support",
        ],
      },
      {
        name: "Growth Package",
        price: "₹29,999",
        period: "/month",
        popular: true,
        description: `Comprehensive ${cleanTitle} with active optimization.`,
        features: [
          `Full ${cleanTitle} Suite Included`,
          "Bi-Weekly Strategy Calls",
          "Dedicated Account Strategist",
          "Priority Turnaround Times",
        ],
      },
      {
        name: "Scale Package",
        price: "₹59,999",
        period: "/month",
        description: `Custom enterprise-grade ${cleanTitle} execution.`,
        features: [
          "Omnichannel Integration",
          "24/7 Dedicated Support",
          "Weekly Analytics & Performance Briefings",
          "Custom Creative & Technical Workflows",
        ],
      },
    ],
  };
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  return {
    title: `${service.title} | ${BUSINESS_CONFIG.name} Digital Marketing Agency`,
    description: service.description,
    alternates: {
      canonical: `/services/${slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: service.title, url: `/services/${slug}` },
  ];

  const getSlugIcon = (iconName: string) => {
    const size = 14;
    switch (iconName) {
      case "📱": return <Megaphone size={size} className="shrink-0" />;
      case "⚙️": return <Settings size={size} className="shrink-0" />;
      case "🎨": return <Sparkles size={size} className="shrink-0" />;
      case "📅": return <Calendar size={size} className="shrink-0" />;
      case "📈": return <TrendingUp size={size} className="shrink-0" />;
      case "🤝": return <Users size={size} className="shrink-0" />;
      case "🌟": return <Award size={size} className="shrink-0" />;
      case "📊": return <BarChart3 size={size} className="shrink-0" />;
      case "🛡️": return <ShieldCheck size={size} className="shrink-0" />;
      case "🔥": return <Zap size={size} className="shrink-0" />;
      case "🔍": return <Search size={size} className="shrink-0" />;
      default: return <Sparkles size={size} className="shrink-0" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050c1a] text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <JSONLD type="Breadcrumb" data={{ items: breadcrumbs }} />
      <JSONLD type="Service" data={{ title: service.title, description: service.description }} />
      <Navbar />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          
          {/* Breadcrumb Navigation */}
          <div className="mb-8">
            <Link
              href={`/services#${service.categorySlug}`}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#0d60c4] dark:text-[#00a651] hover:underline group"
            >
              <ArrowLeft size={12} className="transition-transform duration-350 group-hover:-translate-x-0.5" />
              <span>Back to {service.category}</span>
            </Link>
          </div>

          {/* Hero Section */}
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center mb-16">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#00a651]/30 bg-[#00a651]/10 px-3.5 py-1 text-xs font-bold text-[#00a651]">
                {getSlugIcon(service.icon)}
                <span>{service.category}</span>
              </span>

              <h1 className="text-3xl font-extrabold text-[#071a3d] dark:text-white sm:text-4xl lg:text-5xl tracking-tight leading-tight">
                {service.title}
              </h1>

              <p className="text-base font-semibold text-[#0d60c4] dark:text-[#00a651]">
                {service.tagline}
              </p>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {service.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href={`/contact?service=${service.slug}`}
                  className="rounded-full bg-gradient-to-r from-[#0d60c4] to-[#00a651] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0d60c4]/20 transition-all hover:scale-105 active:scale-95 btn-shimmer"
                >
                  Book a Strategy Call
                </Link>
                <a
                  href={`https://wa.me/${BUSINESS_CONFIG.whatsapp}?text=${encodeURIComponent(
                    `Hi ${BUSINESS_CONFIG.name}, I want to learn more about ${service.title}!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-3.5 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                >
                  WhatsApp Inquiry
                </a>
              </div>
            </div>

            {/* Featured Image */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl group">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-80 sm:h-96 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071a3d]/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/90 dark:bg-[#071a3d]/90 backdrop-blur-md border border-white/20">
                  <p className="text-xs font-bold text-[#0d60c4] dark:text-[#00a651]">
                    Why choose {service.title}?
                  </p>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                    Engineered for maximum reach, brand authority, and revenue conversion.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Deliverables & Benefits Grid */}
          <div className="grid gap-8 md:grid-cols-2 mb-20">
            {/* Deliverables */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1c3d] p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <ClipboardList size={20} className="text-[#0d60c4] dark:text-[#00a651]" />
                <h2 className="text-xl font-bold text-[#071a3d] dark:text-white">
                  What's Included & Deliverables
                </h2>
              </div>
              <ul className="space-y-4">
                {service.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <Check size={12} className="text-[#00a651] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Benefits */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1c3d] p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp size={20} className="text-[#00a651]" />
                <h2 className="text-xl font-bold text-[#071a3d] dark:text-white">
                  Expected Business Benefits
                </h2>
              </div>
              <ul className="space-y-4">
                {service.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <Star size={12} className="text-[#0d60c4] dark:text-[#00a651] fill-[#0d60c4] dark:fill-[#00a651] shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pricing & Packages Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00a651]">
                Transparent Pricing
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-[#071a3d] dark:text-white sm:text-4xl">
                Choose Your {service.title} Package
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 dark:text-slate-300">
                Fixed deliverables, zero hidden fees. Scale as your business grows.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {service.plans.map((plan, i) => (
                <div
                  key={plan.name}
                  className={`relative flex flex-col justify-between rounded-3xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    plan.popular
                      ? "border-[#00a651] bg-white dark:bg-[#0b1c3d] ring-2 ring-[#00a651]/20"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1c3d]"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute right-0 top-0">
                      <span className="rounded-bl-xl bg-gradient-to-r from-[#0d60c4] to-[#00a651] px-4 py-1 text-[11px] font-bold text-white shadow-sm flex items-center">
                        <Zap size={10} className="mr-0.5 text-white animate-pulse" />
                        <span>Most Popular</span>
                      </span>
                    </div>
                  )}

                  <div>
                    <div className="mb-6 border-b border-slate-100 dark:border-slate-800 pb-6">
                      <h3 className="text-xl font-bold text-[#071a3d] dark:text-white">
                        {plan.name}
                      </h3>
                      <div className="mt-3 flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-[#0d60c4] dark:text-[#00a651]">
                          {plan.price}
                        </span>
                        <span className="text-xs text-slate-500">{plan.period}</span>
                      </div>
                      <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                        {plan.description}
                      </p>
                    </div>

                    <ul className="space-y-3 pb-6">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                          <Check size={12} className="text-[#00a651] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <Link
                      href={`/contact?service=${service.slug}&plan=${slugify(plan.name)}`}
                      className="group flex w-full items-center justify-center gap-1.5 rounded-2xl py-3 text-xs font-bold transition-all border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <span>Get Started</span>
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA Card */}
          <div className="rounded-3xl bg-gradient-to-r from-[#071a3d] via-[#0b2857] to-[#071a3d] p-8 sm:p-12 text-center text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -z-10 h-64 w-64 rounded-full bg-[#00a651]/20 blur-3xl"></div>
            <h2 className="text-2xl font-extrabold sm:text-3xl lg:text-4xl">
              Ready to scale your {service.title}?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-slate-300">
              Speak with our performance growth leads today and get a customized execution plan for your business.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href={`/contact?service=${service.slug}`}
                className="group inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#0d60c4] to-[#00a651] px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 btn-shimmer"
              >
                <span>Book a Free 30-Min Strategy Call</span>
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
