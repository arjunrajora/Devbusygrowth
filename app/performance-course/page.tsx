import type { Metadata } from "next";
import PerformanceCourseClient from "./PerformanceCourseClient";
import { BUSINESS_CONFIG } from "@/components/businessConfig";

export const metadata: Metadata = {
  title: `Performance Marketing Course | Meta & Google Ads Mastery — ${BUSINESS_CONFIG.name}`,
  description: "12-week intensive performance marketing course covering ad structures, creative testing grids, CAPI pixel tracking, GA4, and ROAS budget scaling.",
  alternates: {
    canonical: "/performance-course",
  },
  openGraph: {
    title: `Performance Marketing Course | Meta & Google Ads Mastery — ${BUSINESS_CONFIG.name}`,
    description: "12-week intensive performance marketing course covering ad structures, creative testing grids, CAPI pixel tracking, and budget scaling.",
    url: `${BUSINESS_CONFIG.websiteUrl}/performance-course`,
    siteName: BUSINESS_CONFIG.name,
    locale: "en_IN",
    type: "website",
  },
};

export default function PerformanceCoursePage() {
  return <PerformanceCourseClient />;
}
