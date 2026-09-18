import React from "react";
import { BUSINESS_CONFIG } from "./businessConfig";

interface JSONLDProps {
  type: "Organization" | "LocalBusiness" | "WebSite" | "Service" | "Course" | "Breadcrumb";
  data?: any;
}

export default function JSONLD({ type, data }: JSONLDProps) {
  let schema: any = {};

  const baseSameAs = [
    BUSINESS_CONFIG.socials.instagram,
    BUSINESS_CONFIG.socials.youtube,
  ];

  if (type === "Organization") {
    schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": BUSINESS_CONFIG.name,
      "url": BUSINESS_CONFIG.websiteUrl,
      "logo": `${BUSINESS_CONFIG.websiteUrl}/logo-transparent.png`,
      "description": BUSINESS_CONFIG.description,
      "sameAs": baseSameAs,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": BUSINESS_CONFIG.phone,
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": ["en", "hi"],
      },
    };
  } else if (type === "LocalBusiness") {
    schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": BUSINESS_CONFIG.name,
      "image": [
        `${BUSINESS_CONFIG.websiteUrl}/logo-transparent.png`,
      ],
      "@id": `${BUSINESS_CONFIG.websiteUrl}/#localbusiness`,
      "url": BUSINESS_CONFIG.websiteUrl,
      "telephone": BUSINESS_CONFIG.phone,
      "priceRange": "₹₹",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": BUSINESS_CONFIG.address,
        "addressLocality": BUSINESS_CONFIG.city,
        "addressRegion": BUSINESS_CONFIG.state,
        "postalCode": BUSINESS_CONFIG.postalCode,
        "addressCountry": "IN",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 26.9124, // Jaipur latitude
        "longitude": 75.7873, // Jaipur longitude
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:00",
        "closes": "21:00"
      },
      "sameAs": baseSameAs,
    };
  } else if (type === "WebSite") {
    schema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": BUSINESS_CONFIG.name,
      "url": BUSINESS_CONFIG.websiteUrl,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${BUSINESS_CONFIG.websiteUrl}/services?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };
  } else if (type === "Service") {
    schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": data?.title || "Digital Marketing",
      "provider": {
        "@type": "LocalBusiness",
        "name": BUSINESS_CONFIG.name,
        "url": BUSINESS_CONFIG.websiteUrl,
        "telephone": BUSINESS_CONFIG.phone,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": BUSINESS_CONFIG.address,
          "addressLocality": BUSINESS_CONFIG.city,
          "addressRegion": BUSINESS_CONFIG.state,
          "addressCountry": "IN",
        }
      },
      "areaServed": [
        {
          "@type": "City",
          "name": BUSINESS_CONFIG.city,
          "sameAs": "https://en.wikipedia.org/wiki/Jaipur"
        },
        {
          "@type": "State",
          "name": BUSINESS_CONFIG.state,
          "sameAs": "https://en.wikipedia.org/wiki/Rajasthan"
        },
        {
          "@type": "Country",
          "name": "India",
          "sameAs": "https://en.wikipedia.org/wiki/India"
        }
      ],
      "description": data?.description || BUSINESS_CONFIG.description,
      "name": data?.title || BUSINESS_CONFIG.name,
    };
  } else if (type === "Course") {
    schema = {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": data?.title || "Digital Marketing Course",
      "description": data?.description || "Comprehensive training program covering paid ads, SEO, social media content, and workflow automation.",
      "provider": {
        "@type": "Organization",
        "name": BUSINESS_CONFIG.name,
        "sameAs": BUSINESS_CONFIG.websiteUrl
      }
    };
  } else if (type === "Breadcrumb") {
    const itemListElement = (data?.items || []).map((item: any, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith("http") ? item.url : `${BUSINESS_CONFIG.websiteUrl}${item.url}`,
    }));

    schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": itemListElement,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
