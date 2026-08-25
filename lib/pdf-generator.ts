import { SystemInvoice } from "./invoices-store";

/**
 * Escapes characters for PDF text literal syntax: ( ... )
 */
function escapePdfText(text: string): string {
  if (!text) return "";
  // PDF WinAnsi / Standard encoding text escaping
  const cleaned = text
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/[\r\n]+/g, " ");
  return cleaned;
}

/**
 * Format numbers as standard currency string with 2 decimal places
 */
function formatAmount(val: number): string {
  const num = typeof val === "number" ? val : parseFloat(val || "0");
  return num.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Generates a valid standard PDF 1.4 binary buffer for an invoice
 */
export async function generateInvoicePDF(invoice: SystemInvoice): Promise<Buffer> {
  const invoiceNum = escapePdfText(invoice.invoiceNumber);
  const userName = escapePdfText(invoice.userName);
  const mobile = escapePdfText(invoice.mobile);
  const email = escapePdfText(invoice.email);
  const invoiceDate = escapePdfText(invoice.invoiceDate);
  const dueDate = escapePdfText(invoice.dueDate);
  const description = escapePdfText(invoice.description);

  const totalStr = `INR ${formatAmount(invoice.totalAmount)}`;
  const advanceStr = `INR ${formatAmount(invoice.advanceAmount)}`;
  const remainingStr = `INR ${formatAmount(invoice.remainingAmount)}`;

  // Page dimensions (A4 in points: 595.28 x 841.89)
  const W = 595.28;
  const H = 841.89;

  // Build PDF Graphics Commands Stream
  const streamCommands: string[] = [];

  // Helper to add commands
  const add = (cmd: string) => streamCommands.push(cmd);

  // --- BACKGROUND & HEADER ---
  // Top Header Banner (Deep Navy #071a3d)
  // x=0, y=H-110, w=W, h=110
  add("0.027 0.102 0.239 rg"); // #071a3d
  add(`0 ${H - 110} ${W} 110 re f`);

  // Green accent bar below header (#00a651)
  add("0.000 0.651 0.318 rg"); // #00a651
  add(`0 ${H - 114} ${W} 4 re f`);

  // --- HEADER TEXT (White / Green) ---
  add("BT");
  // BUSYGROWTH Logo Text
  add("/F2 26 Tf");
  add("1 0 0 1 40 " + (H - 52) + " Tm");
  add("1.0 1.0 1.0 rg");
  add("(BUSYGROWTH) Tj");
  add("ET");

  // Tagline
  add("BT");
  add("/F1 9 Tf");
  add("1 0 0 1 40 " + (H - 72) + " Tm");
  add("0.7 0.8 0.9 rg");
  add("(Predictable Digital Growth & Performance Agency) Tj");
  add("ET");

  // Contact Info in Header
  add("BT");
  add("/F1 8 Tf");
  add("1 0 0 1 40 " + (H - 92) + " Tm");
  add("0.6 0.7 0.85 rg");
  add("(thebusygrowth@gmail.com  |  +91 9352757834  |  Jaipur, Rajasthan) Tj");
  add("ET");

  // INVOICE Heading on Header Right
  add("BT");
  add("/F2 28 Tf");
  add("1 0 0 1 " + (W - 200) + " " + (H - 55) + " Tm");
  add("0.000 0.651 0.318 rg"); // Green #00a651
  add("(INVOICE) Tj");
  add("ET");

  // --- INVOICE METADATA BOX (Top Right below header) ---
  const metaBoxY = H - 200;
  add("0.96 0.97 0.98 rg"); // light bg
  add(`${W - 240} ${metaBoxY} 200 65 re f`);
  add("0.85 0.88 0.92 RG"); // border color
  add("1 w");
  add(`${W - 240} ${metaBoxY} 200 65 re s`);

  add("BT");
  add("/F2 10 Tf");
  add("0.1 0.15 0.25 rg");
  add("1 0 0 1 " + (W - 230) + " " + (metaBoxY + 46) + " Tm");
  add("(Invoice No:) Tj");
  add("/F1 10 Tf");
  add("1 0 0 1 " + (W - 140) + " " + (metaBoxY + 46) + " Tm");
  add(`(${invoiceNum}) Tj`);

  add("/F2 10 Tf");
  add("1 0 0 1 " + (W - 230) + " " + (metaBoxY + 28) + " Tm");
  add("(Invoice Date:) Tj");
  add("/F1 10 Tf");
  add("1 0 0 1 " + (W - 140) + " " + (metaBoxY + 28) + " Tm");
  add(`(${invoiceDate}) Tj`);

  add("/F2 10 Tf");
  add("1 0 0 1 " + (W - 230) + " " + (metaBoxY + 10) + " Tm");
  add("(Due Date:) Tj");
  add("/F1 10 Tf");
  add("1 0 0 1 " + (W - 140) + " " + (metaBoxY + 10) + " Tm");
  add(`(${dueDate}) Tj`);
  add("ET");

  // --- ISSUED TO SECTION (Top Left) ---
  const issuedY = H - 200;
  add("BT");
  add("/F2 12 Tf");
  add("0.027 0.102 0.239 rg");
  add("1 0 0 1 40 " + (issuedY + 48) + " Tm");
  add("(ISSUED TO:) Tj");

  add("/F2 13 Tf");
  add("0.1 0.15 0.25 rg");
  add("1 0 0 1 40 " + (issuedY + 28) + " Tm");
  add(`(${userName}) Tj`);

  add("/F1 10 Tf");
  add("0.35 0.4 0.48 rg");
  add("1 0 0 1 40 " + (issuedY + 10) + " Tm");
  add(`(Phone: ${mobile}) Tj`);

  add("1 0 0 1 40 " + (issuedY - 6) + " Tm");
  add(`(Email: ${email}) Tj`);
  add("ET");

  // --- SEPARATOR LINE ---
  const sepY = H - 230;
  add("0.85 0.88 0.92 RG");
  add("1 w");
  add(`40 ${sepY} ${W - 80} 0 m ${W - 40} ${sepY} l S`);

  // --- DESCRIPTION / ITEMS TABLE ---
  const tableY = H - 275;
  const tableW = W - 80;

  // Table Header Bar (Navy #071a3d)
  add("0.027 0.102 0.239 rg");
  add(`40 ${tableY} ${tableW} 28 re f`);

  add("BT");
  add("/F2 11 Tf");
  add("1.0 1.0 1.0 rg"); // White text
  add("1 0 0 1 52 " + (tableY + 9) + " Tm");
  add("(DESCRIPTION / SERVICES) Tj");

  add("1 0 0 1 " + (W - 150) + " " + (tableY + 9) + " Tm");
  add("(AMOUNT) Tj");
  add("ET");

  // Table Body Row
  const rowY = tableY - 60;
  add("0.98 0.98 0.99 rg");
  add(`40 ${rowY} ${tableW} 60 re f`);
  add("0.88 0.9 0.94 RG");
  add(`40 ${rowY} ${tableW} 60 re s`);

  add("BT");
  add("/F1 10 Tf");
  add("0.15 0.2 0.3 rg");
  add("1 0 0 1 52 " + (rowY + 36) + " Tm");

  // Simple multi-line wrap if description is long
  const descLines = description.length > 55
    ? [description.substring(0, 55), description.substring(55, 110)]
    : [description];

  descLines.forEach((line, idx) => {
    if (idx === 0) {
      add(`(${line}) Tj`);
    } else {
      add("1 0 0 1 52 " + (rowY + 20) + " Tm");
      add(`(${line}) Tj`);
    }
  });

  add("/F2 11 Tf");
  add("0.027 0.102 0.239 rg");
  add("1 0 0 1 " + (W - 150) + " " + (rowY + 36) + " Tm");
  add(`(${totalStr}) Tj`);
  add("ET");

  // --- SUMMARY BREAKDOWN BOX (Right align under table) ---
  const sumY = rowY - 110;
  const sumW = 230;
  const sumX = W - 40 - sumW;

  add("0.97 0.98 0.99 rg");
  add(`${sumX} ${sumY} ${sumW} 95 re f`);
  add("0.85 0.88 0.92 RG");
  add(`${sumX} ${sumY} ${sumW} 95 re s`);

  add("BT");
  // Subtotal
  add("/F1 10 Tf");
  add("0.35 0.4 0.48 rg");
  add("1 0 0 1 " + (sumX + 15) + " " + (sumY + 70) + " Tm");
  add("(Subtotal:) Tj");
  add("/F2 10 Tf");
  add("0.1 0.15 0.25 rg");
  add("1 0 0 1 " + (sumX + 120) + " " + (sumY + 70) + " Tm");
  add(`(${totalStr}) Tj`);

  // Advance
  add("/F1 10 Tf");
  add("0.35 0.4 0.48 rg");
  add("1 0 0 1 " + (sumX + 15) + " " + (sumY + 48) + " Tm");
  add("(Advance Paid:) Tj");
  add("/F2 10 Tf");
  add("0.0 0.5 0.25 rg"); // Green
  add("1 0 0 1 " + (sumX + 120) + " " + (sumY + 48) + " Tm");
  add(`(${advanceStr}) Tj`);

  // Divider
  add("ET");
  add("0.82 0.85 0.9 RG");
  add(`${sumX + 15} ${sumY + 38} ${sumW - 30} 0 m ${sumX + sumW - 15} ${sumY + 38} l S`);

  // Current Remaining Box (Highlight in Green #00a651)
  add("0.000 0.651 0.318 rg");
  add(`${sumX + 10} ${sumY + 8} ${sumW - 20} 24 re f`);

  add("BT");
  add("/F2 11 Tf");
  add("1.0 1.0 1.0 rg");
  add("1 0 0 1 " + (sumX + 18) + " " + (sumY + 15) + " Tm");
  add("(Remaining Due:) Tj");
  add("1 0 0 1 " + (sumX + 120) + " " + (sumY + 15) + " Tm");
  add(`(${remainingStr}) Tj`);
  add("ET");

  // --- PAYMENT & QR CODE SECTION (Left side under table) ---
  const payY = rowY - 110;
  const payW = 250;
  const payX = 40;

  add("0.97 0.98 0.99 rg");
  add(`${payX} ${payY} ${payW} 95 re f`);
  add("0.85 0.88 0.92 RG");
  add(`${payX} ${payY} ${payW} 95 re s`);

  add("BT");
  add("/F2 11 Tf");
  add("0.027 0.102 0.239 rg");
  add("1 0 0 1 " + (payX + 15) + " " + (payY + 74) + " Tm");
  add("(PAYMENT INFORMATION) Tj");

  add("/F1 9 Tf");
  add("0.3 0.35 0.45 rg");
  add("1 0 0 1 " + (payX + 15) + " " + (payY + 56) + " Tm");
  add("(Bank / UPI Payment Available) Tj");

  add("1 0 0 1 " + (payX + 15) + " " + (payY + 40) + " Tm");
  add("(UPI ID: standardupi@busygrowth) Tj");

  add("1 0 0 1 " + (payX + 15) + " " + (payY + 24) + " Tm");
  add("(Scan QR Code below or use UPI ID for settlement) Tj");
  add("ET");

  // --- QR CODE DISPLAY BOX ---
  const qrY = payY - 120;
  add("0.95 0.96 0.98 rg");
  add(`40 ${qrY} 100 100 re f`);
  add("0.8 0.85 0.9 RG");
  add(`40 ${qrY} 100 100 re s`);

  // Outer & Inner QR placeholder graphic
  add("0.1 0.15 0.25 rg");
  add(`52 ${qrY + 12} 76 76 re s`);
  add(`58 ${qrY + 58} 24 24 re f`);
  add(`98 ${qrY + 58} 20 20 re f`);
  add(`58 ${qrY + 18} 20 20 re f`);

  add("BT");
  add("/F2 8 Tf");
  add("0.000 0.651 0.318 rg");
  add("1 0 0 1 152 " + (qrY + 60) + " Tm");
  add("(PAY VIA QR CODE) Tj");

  add("/F1 8 Tf");
  add("0.4 0.45 0.5 rg");
  add("1 0 0 1 152 " + (qrY + 44) + " Tm");
  add("(Accepts Google Pay, PhonePe, Paytm, BHIM) Tj");
  add("1 0 0 1 152 " + (qrY + 30) + " Tm");
  add("(Thank you for your prompt payment!) Tj");
  add("ET");

  // --- SIGNATURE & FOOTER SECTION ---
  const sigY = 90;
  add("0.85 0.88 0.92 RG");
  add("1 w");
  add(`40 ${sigY} ${W - 80} 0 m ${W - 40} ${sigY} l S`);

  // Company Signature Block on Right
  add("BT");
  add("/F2 10 Tf");
  add("0.027 0.102 0.239 rg");
  add("1 0 0 1 " + (W - 200) + " " + (sigY - 20) + " Tm");
  add("(For BUSYGROWTH) Tj");

  add("/F1 9 Tf");
  add("0.5 0.55 0.6 rg");
  add("1 0 0 1 " + (W - 200) + " " + (sigY - 55) + " Tm");
  add("(Authorized Signatory) Tj");

  // Left Footer Note
  add("/F1 8 Tf");
  add("0.4 0.45 0.5 rg");
  add("1 0 0 1 40 " + (sigY - 20) + " Tm");
  add("(This is a computer-generated invoice.) Tj");
  add("1 0 0 1 40 " + (sigY - 34) + " Tm");
  add("(Official Website: https://thebusygrowth.com) Tj");
  add("ET");

  // Bottom Green Accent Strip
  add("0.000 0.651 0.318 rg");
  add(`0 0 ${W} 8 re f`);

  // Construct PDF Stream
  const contentsBody = streamCommands.join("\n");
  const contentsLength = Buffer.byteLength(contentsBody, "utf-8");

  // Assemble Objects
  const pdfParts: string[] = [];

  pdfParts.push("%PDF-1.4\n");

  // Object 1: Catalog
  const obj1Offset = pdfParts.join("").length;
  pdfParts.push("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");

  // Object 2: Pages
  const obj2Offset = pdfParts.join("").length;
  pdfParts.push("2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n");

  // Object 3: Page
  const obj3Offset = pdfParts.join("").length;
  pdfParts.push(
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>\nendobj\n`
  );

  // Object 4: Font F1 (Helvetica)
  const obj4Offset = pdfParts.join("").length;
  pdfParts.push(
    "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj\n"
  );

  // Object 5: Font F2 (Helvetica-Bold)
  const obj5Offset = pdfParts.join("").length;
  pdfParts.push(
    "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\nendobj\n"
  );

  // Object 6: Stream Contents
  const obj6Offset = pdfParts.join("").length;
  pdfParts.push(
    `6 0 obj\n<< /Length ${contentsLength} >>\nstream\n${contentsBody}\nendstream\nendobj\n`
  );

  // Xref table
  const startXref = pdfParts.join("").length;
  pdfParts.push("xref\n0 7\n");
  pdfParts.push("0000000000 65535 f \n");
  pdfParts.push(obj1Offset.toString().padStart(10, "0") + " 00000 n \n");
  pdfParts.push(obj2Offset.toString().padStart(10, "0") + " 00000 n \n");
  pdfParts.push(obj3Offset.toString().padStart(10, "0") + " 00000 n \n");
  pdfParts.push(obj4Offset.toString().padStart(10, "0") + " 00000 n \n");
  pdfParts.push(obj5Offset.toString().padStart(10, "0") + " 00000 n \n");
  pdfParts.push(obj6Offset.toString().padStart(10, "0") + " 00000 n \n");

  pdfParts.push("trailer\n<< /Size 7 /Root 1 0 R >>\n");
  pdfParts.push("startxref\n" + startXref + "\n%%EOF\n");

  return Buffer.from(pdfParts.join(""), "utf-8");
}
