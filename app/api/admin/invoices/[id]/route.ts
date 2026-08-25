import { NextRequest, NextResponse } from "next/server";
import { getInvoiceById } from "@/lib/invoices-store";

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

    return NextResponse.json({ invoice });
  } catch (error: any) {
    console.error("Error in GET /api/admin/invoices/[id]:", error);
    return NextResponse.json(
      { error: "Failed to fetch invoice details" },
      { status: 500 }
    );
  }
}
