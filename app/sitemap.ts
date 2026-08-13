import { MetadataRoute } from "next";
import { BUSINESS_CONFIG } from "@/components/businessConfig";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

const STATIC_ROUTES = [
  "",
  "/services",
  "/contact",
  "/course",
  "/performance-course",
];

const SERVICES_LIST = [
  // Social Media Mastery
  "Social Media Strategy",
  "Account Setup & Optimization",
  "Content Creation",
  "Content Calendar Planning",
  "Social Media Management",
  "Audience Engagement",
  "Influencer Marketing",
  "Analytics & Reporting",
  "Brand Monitoring",
  "Hashtag & Trend Research",
  "Social Media Audit",
  
  // Meta & Google Ads
  "Meta Ads Strategy & Planning",
  "Campaign Setup & Structure",
  "Audience Research & Targeting",
  "Creative Design",
  "A/B Testing",
  "Pixel Setup & Tracking",
  "Retargeting Campaigns",
  "Lead Generation Ads",
  "E-commerce Ads",
  "Budget Management",
  "Performance Monitoring",
  "Detailed Reporting",
  
  // AI & Automation Nodes
  "AI Chatbot Development",
  "Lead Generation Automation",
  "Email & WhatsApp Automation",
  "AI Content Generation",
  "Workflow Integration",
  
  // Video Editing & Reels
  "Social Media Video Editing",
  "Reels & Shorts Editing",
  "YouTube Video Editing",
  "Ad Video Editing",
  "Corporate Videos",
  "Color Correction",
  "Sound Design",
  "Subtitle & Captioning",
  "Platform Optimization",
  "Raw Footage Editing",
  "Bulk Video Editing",
  
  // Web & Funnel Development
  "Landing Page Design",
  "Business Website (5-7 Pages)",
  "E-Commerce Store",
  "Custom Web Applications",
  "Responsive Design",
  "Next.js / React Dev",
  "Tailwind CSS Styling",
  "Framer Motion Animation",
  "Contact Form Integration",
  "Payment Gateway Setup",
  "WhatsApp API Integration",
  "SEO-Friendly Structure",
  "Google Analytics",
  "SSL Certificate",
  "Website Maintenance",
  "Website Redesign",
  "Speed Optimization",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  const staticSitemap = STATIC_ROUTES.map((route) => ({
    url: `${BUSINESS_CONFIG.websiteUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: (route === "" ? "daily" : "weekly") as "daily" | "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  const dynamicSitemap = SERVICES_LIST.map((service) => {
    const slug = slugify(service);
    return {
      url: `${BUSINESS_CONFIG.websiteUrl}/services/${slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as "weekly",
      priority: 0.6,
    };
  });

  return [...staticSitemap, ...dynamicSitemap];
}
