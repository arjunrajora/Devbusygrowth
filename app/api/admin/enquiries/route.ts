import { NextResponse } from "next/server";
import { getAllEnquiries, getMonthlyEnquiriesChartData } from "@/lib/enquiries-store";

export async function GET() {
  try {
    const enquiries = getAllEnquiries();
    const monthlyStats = getMonthlyEnquiriesChartData();

    return NextResponse.json({
      totalCount: enquiries.length,
      enquiries,
      monthlyStats,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch admin enquiry data" },
      { status: 500 }
    );
  }
}
