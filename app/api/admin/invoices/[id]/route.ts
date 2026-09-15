import { NextRequest, NextResponse } from "next/server";
import { getInvoiceById, updateInvoiceStatus } from "@/lib/invoices-store";

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

export async function PATCH(
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

    const body = await req.json();
    const { status } = body;

    if (status !== "active" && status !== "disabled") {
      return NextResponse.json(
        { error: "Invalid status value. Expected 'active' or 'disabled'." },
        { status: 400 }
      );
    }

    const success = await updateInvoiceStatus(id, status);
    if (!success) {
      return NextResponse.json(
        { error: "Failed to update invoice status" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Invoice status updated to ${status}`,
      status,
    });
  } catch (error: any) {
    console.error("Error in PATCH /api/admin/invoices/[id]:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update status" },
      { status: 500 }
    );
  }
}
