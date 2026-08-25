import { NextRequest, NextResponse } from "next/server";
import { getInvoiceById } from "@/lib/invoices-store";
import { generateInvoicePDF } from "@/lib/pdf-generator";
import { sendInvoiceEmail } from "@/lib/invoice-email";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { error: "Invoice ID is required" },
        { status: 400 }
      );
    }

    const invoice = await getInvoiceById(id);
    if (!invoice) {
      return NextResponse.json(
        { error: "Invoice not found" },
        { status: 404 }
      );
    }

    const pdfBuffer = await generateInvoicePDF(invoice);
    const emailResult = await sendInvoiceEmail(invoice, pdfBuffer);

    if (!emailResult.success) {
      return NextResponse.json(
        { error: emailResult.message || "Failed to resend email" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Invoice email resent successfully to ${invoice.email}`,
      emailResult,
    });
  } catch (error: any) {
    console.error("Error in POST /api/admin/invoices/[id]/resend-email:", error);
    return NextResponse.json(
      { error: "Failed to resend invoice email" },
      { status: 500 }
    );
  }
}
