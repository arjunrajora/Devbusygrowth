import { NextRequest, NextResponse } from "next/server";
import {
  getAllInvoices,
  saveInvoice,
  generateNextInvoiceNumber,
  isInvoiceNumberUnique,
} from "@/lib/invoices-store";
import { generateInvoicePDF } from "@/lib/pdf-generator";
import { sendInvoiceEmail } from "@/lib/invoice-email";
import { getAdminSession } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action");

    if (action === "next-number") {
      const nextNum = await generateNextInvoiceNumber();
      return NextResponse.json({ invoiceNumber: nextNum });
    }

    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const result = await getAllInvoices({ search, page, limit });
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error in GET /api/admin/invoices:", error);
    return NextResponse.json(
      { error: "Failed to fetch invoices" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      invoiceNumber,
      userName,
      mobile,
      email,
      invoiceDate,
      dueDate,
      description,
      totalAmount,
      advanceAmount,
    } = body;

    // 1. Validation checks
    const cleanUserName = typeof userName === "string" ? userName.trim() : "";
    if (!cleanUserName || cleanUserName.length < 2) {
      return NextResponse.json(
        { error: "User/Customer Name is required (minimum 2 characters)." },
        { status: 400 }
      );
    }

    const cleanMobile = typeof mobile === "string" ? mobile.trim() : "";
    const mobileDigits = cleanMobile.replace(/[^0-9]/g, "");
    if (!cleanMobile || mobileDigits.length < 10 || mobileDigits.length > 15) {
      return NextResponse.json(
        { error: "A valid mobile number is required (at least 10 digits)." },
        { status: 400 }
      );
    }

    const cleanEmail = typeof email === "string" ? email.trim() : "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!invoiceDate) {
      return NextResponse.json(
        { error: "Invoice Date is required." },
        { status: 400 }
      );
    }

    if (!dueDate) {
      return NextResponse.json(
        { error: "Due Date is required." },
        { status: 400 }
      );
    }

    const cleanDescription = typeof description === "string" ? description.trim() : "";
    if (!cleanDescription) {
      return NextResponse.json(
        { error: "Description cannot be empty." },
        { status: 400 }
      );
    }

    const numTotal = typeof totalAmount === "number" ? totalAmount : parseFloat(totalAmount);
    if (isNaN(numTotal) || numTotal <= 0) {
      return NextResponse.json(
        { error: "Total Amount must be a valid positive number." },
        { status: 400 }
      );
    }

    const numAdvance = typeof advanceAmount === "number" ? advanceAmount : parseFloat(advanceAmount || 0);
    if (isNaN(numAdvance) || numAdvance < 0) {
      return NextResponse.json(
        { error: "Advance Amount must be a valid non-negative number." },
        { status: 400 }
      );
    }

    if (numAdvance > numTotal) {
      return NextResponse.json(
        { error: "Advance Amount cannot be greater than Total Amount." },
        { status: 400 }
      );
    }

    let finalInvoiceNumber = typeof invoiceNumber === "string" ? invoiceNumber.trim() : "";
    if (!finalInvoiceNumber) {
      finalInvoiceNumber = await generateNextInvoiceNumber();
    }

    const isUnique = await isInvoiceNumberUnique(finalInvoiceNumber);
    if (!isUnique) {
      return NextResponse.json(
        { error: `Invoice Number "${finalInvoiceNumber}" already exists. Please use a unique number.` },
        { status: 400 }
      );
    }

    // Get current admin user email if authenticated
    const session = await getAdminSession();
    const createdBy = session.email || "Admin";

    // 2. Save Invoice in MongoDB
    const savedInvoice = await saveInvoice({
      invoiceNumber: finalInvoiceNumber,
      userName: cleanUserName,
      mobile: cleanMobile,
      email: cleanEmail,
      invoiceDate,
      dueDate,
      description: cleanDescription,
      totalAmount: numTotal,
      advanceAmount: numAdvance,
      createdBy,
    });

    // 3. Generate Invoice PDF
    const pdfBuffer = await generateInvoicePDF(savedInvoice);

    // 4. Send Email with PDF Attachment
    const emailResult = await sendInvoiceEmail(savedInvoice, pdfBuffer);

    return NextResponse.json({
      success: true,
      message: "Invoice created successfully and email dispatched to customer.",
      invoice: savedInvoice,
      emailResult,
    });
  } catch (error: any) {
    console.error("Error in POST /api/admin/invoices:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred while creating invoice." },
      { status: 500 }
    );
  }
}
