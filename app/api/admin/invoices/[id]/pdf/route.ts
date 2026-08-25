import { NextRequest, NextResponse } from "next/server";
import { getInvoiceById } from "@/lib/invoices-store";
import { generateInvoicePDF } from "@/lib/pdf-generator";

export async function GET(
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
    const filename = `Invoice_${invoice.invoiceNumber.replace(/[^a-zA-Z0-9_-]/g, "_")}.pdf`;

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": pdfBuffer.length.toString(),
      },
    });
  } catch (error: any) {
    console.error("Error in GET /api/admin/invoices/[id]/pdf:", error);
    return NextResponse.json(
      { error: "Failed to generate invoice PDF" },
      { status: 500 }
    );
  }
}
