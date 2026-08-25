import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/admin/invoices/:id/pdf",
        destination: "/api/admin/invoices/:id/pdf",
      },
      {
        source: "/admin/invoices/:id/resend-email",
        destination: "/api/admin/invoices/:id/resend-email",
      },
    ];
  },
};

export default nextConfig;

