import { NextRequest, NextResponse } from "next/server";
import { getAllEnquiries, saveEnquiry } from "@/lib/enquiries-store";

export async function GET() {
  try {
    const enquiries = await getAllEnquiries();
    return NextResponse.json(enquiries);
  } catch (error: any) {
    console.error("Error in GET /api/enquiries:", error);
    return NextResponse.json(
      { error: "Failed to fetch enquiries from database" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, businessType, interest, message } = body;

    const cleanName = typeof name === "string" ? name.trim() : "";
    const cleanEmail = typeof email === "string" ? email.trim() : "";
    const cleanPhone = typeof phone === "string" ? phone.trim() : "";
    const cleanBusinessType = typeof businessType === "string" ? businessType.trim() : "";
    const cleanInterest = typeof interest === "string" ? interest.trim() : "";
    const cleanMessage = typeof message === "string" ? message.trim() : "";

    // Validation
    if (!cleanName || cleanName.length < 2) {
      return NextResponse.json(
        { error: "Full Name is required (minimum 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const phoneDigits = cleanPhone.replace(/[^0-9]/g, "");
    if (!cleanPhone || phoneDigits.length < 10 || phoneDigits.length > 15) {
      return NextResponse.json(
        { error: "A valid WhatsApp / Phone number is required (at least 10 digits)." },
        { status: 400 }
      );
    }

    if (!cleanBusinessType) {
      return NextResponse.json(
        { error: "Business type selection is required." },
        { status: 400 }
      );
    }

    if (!cleanInterest) {
      return NextResponse.json(
        { error: "Services required selection is required." },
        { status: 400 }
      );
    }

    if (!cleanMessage || cleanMessage.length < 5) {
      return NextResponse.json(
        { error: "Project description is required (minimum 5 characters)." },
        { status: 400 }
      );
    }

    const savedRecord = await saveEnquiry({
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      businessType: cleanBusinessType,
      interest: cleanInterest,
      message: cleanMessage,
    });

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully",
      enquiryId: savedRecord.id,
    });
  } catch (error: any) {
    console.error("Error in POST /api/enquiries:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your enquiry. Please try again." },
      { status: 500 }
    );
  }
}
