const fs = require('fs');
const path = require('path');

function escapePdfText(text) {
  if (!text) return "";
  return text
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/[\r\n]+/g, " ");
}

function formatAmount(val) {
  const num = typeof val === "number" ? val : parseFloat(val || "0");
  return num.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

async function testGeneratePDF() {
  const invoice = {
    invoiceNumber: "BG-INV-1001",
    userName: "Sandeep Kumawat",
    mobile: "9876543210",
    email: "sandeep@example.com",
    invoiceDate: "2026-09-15",
    dueDate: "2026-09-22",
    description: "Website Development & Performance Marketing Retainer (Phase 1)",
    totalAmount: 25000,
    advanceAmount: 10000,
    remainingAmount: 15000,
    title: "TAX INVOICE",
  };

  const invoiceNum = escapePdfText(invoice.invoiceNumber);
  const userName = escapePdfText(invoice.userName);
  const mobile = escapePdfText(invoice.mobile);
  const email = escapePdfText(invoice.email);
  const invoiceDate = escapePdfText(invoice.invoiceDate);
  const dueDate = escapePdfText(invoice.dueDate);
  const description = escapePdfText(invoice.description);
  const billTitle = escapePdfText(invoice.title || "TAX INVOICE");

  const totalStr = `INR ${formatAmount(invoice.totalAmount)}`;
  const advanceStr = `INR ${formatAmount(invoice.advanceAmount)}`;
  const remainingStr = `INR ${formatAmount(invoice.remainingAmount)}`;

  const W = 595.28;
  const H = 841.89;

  let qrBuffer = null;
  const qrPath = path.join(__dirname, '../public/assets/images/payment-qr.jpg');
  if (fs.existsSync(qrPath)) {
    qrBuffer = fs.readFileSync(qrPath);
    console.log(`Loaded QR buffer: ${qrBuffer.length} bytes`);
  }

  const streamCommands = [];
  const add = (cmd) => streamCommands.push(cmd);

  add("0.027 0.102 0.239 rg");
  add(`0 ${H - 110} ${W} 110 re f`);
  add("0.000 0.651 0.318 rg");
  add(`0 ${H - 114} ${W} 4 re f`);

  add("BT");
  add("/F2 26 Tf");
  add("1 0 0 1 40 " + (H - 52) + " Tm");
  add("1.0 1.0 1.0 rg");
  add("(BUSYGROWTH) Tj");
  add("ET");

  add("BT");
  add("/F1 9 Tf");
  add("1 0 0 1 40 " + (H - 72) + " Tm");
  add("0.7 0.8 0.9 rg");
  add("(Predictable Digital Growth & Performance Agency) Tj");
  add("ET");

  add("BT");
  add("/F1 8 Tf");
  add("1 0 0 1 40 " + (H - 92) + " Tm");
  add("0.6 0.7 0.85 rg");
  add("(thebusygrowth@gmail.com  |  +91 9352757834  |  Jaipur, Rajasthan) Tj");
  add("ET");

  add("BT");
  add("/F2 22 Tf");
  add("1 0 0 1 " + (W - 220) + " " + (H - 55) + " Tm");
  add("0.000 0.651 0.318 rg");
  add(`(${billTitle}) Tj`);
  add("ET");

  const metaBoxY = H - 200;
  add("0.96 0.97 0.98 rg");
  add(`${W - 240} ${metaBoxY} 200 65 re f`);
  add("0.85 0.88 0.92 RG");
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

  const sepY = H - 230;
  add("0.85 0.88 0.92 RG");
  add("1 w");
  add(`40 ${sepY} ${W - 80} 0 m ${W - 40} ${sepY} l S`);

  const tableY = H - 275;
  const tableW = W - 80;

  add("0.027 0.102 0.239 rg");
  add(`40 ${tableY} ${tableW} 28 re f`);

  add("BT");
  add("/F2 11 Tf");
  add("1.0 1.0 1.0 rg");
  add("1 0 0 1 52 " + (tableY + 9) + " Tm");
  add("(DESCRIPTION / SERVICES) Tj");
  add("1 0 0 1 " + (W - 150) + " " + (tableY + 9) + " Tm");
  add("(AMOUNT) Tj");
  add("ET");

  const rowY = tableY - 60;
  add("0.98 0.98 0.99 rg");
  add(`40 ${rowY} ${tableW} 60 re f`);
  add("0.88 0.9 0.94 RG");
  add(`40 ${rowY} ${tableW} 60 re s`);

  add("BT");
  add("/F1 10 Tf");
  add("0.15 0.2 0.3 rg");
  add("1 0 0 1 52 " + (rowY + 36) + " Tm");

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

  const sumY = rowY - 110;
  const sumW = 230;
  const sumX = W - 40 - sumW;

  add("0.97 0.98 0.99 rg");
  add(`${sumX} ${sumY} ${sumW} 95 re f`);
  add("0.85 0.88 0.92 RG");
  add(`${sumX} ${sumY} ${sumW} 95 re s`);

  add("BT");
  add("/F1 10 Tf");
  add("0.35 0.4 0.48 rg");
  add("1 0 0 1 " + (sumX + 15) + " " + (sumY + 70) + " Tm");
  add("(Subtotal:) Tj");
  add("/F2 10 Tf");
  add("0.1 0.15 0.25 rg");
  add("1 0 0 1 " + (sumX + 120) + " " + (sumY + 70) + " Tm");
  add(`(${totalStr}) Tj`);

  add("/F1 10 Tf");
  add("0.35 0.4 0.48 rg");
  add("1 0 0 1 " + (sumX + 15) + " " + (sumY + 48) + " Tm");
  add("(Advance Paid:) Tj");
  add("/F2 10 Tf");
  add("0.0 0.5 0.25 rg");
  add("1 0 0 1 " + (sumX + 120) + " " + (sumY + 48) + " Tm");
  add(`(${advanceStr}) Tj`);
  add("ET");

  add("0.82 0.85 0.9 RG");
  add(`${sumX + 15} ${sumY + 38} ${sumW - 30} 0 m ${sumX + sumW - 15} ${sumY + 38} l S`);

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

  const qrY = payY - 120;
  add("0.95 0.96 0.98 rg");
  add(`40 ${qrY} 100 100 re f`);
  add("0.8 0.85 0.9 RG");
  add(`40 ${qrY} 100 100 re s`);

  if (qrBuffer) {
    add("q");
    add(`46 0 0 88 45 ${qrY + 6} cm`);
    add("/Im1 Do");
    add("Q");
  }

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

  const sigY = 90;
  add("0.85 0.88 0.92 RG");
  add("1 w");
  add(`40 ${sigY} ${W - 80} 0 m ${W - 40} ${sigY} l S`);

  add("BT");
  add("/F2 10 Tf");
  add("0.027 0.102 0.239 rg");
  add("1 0 0 1 " + (W - 200) + " " + (sigY - 20) + " Tm");
  add("(For BUSYGROWTH) Tj");

  add("/F1 9 Tf");
  add("0.5 0.55 0.6 rg");
  add("1 0 0 1 " + (W - 200) + " " + (sigY - 55) + " Tm");
  add("(Authorized Signatory) Tj");

  add("/F1 8 Tf");
  add("0.4 0.45 0.5 rg");
  add("1 0 0 1 40 " + (sigY - 20) + " Tm");
  add("(This is a computer-generated invoice.) Tj");
  add("1 0 0 1 40 " + (sigY - 34) + " Tm");
  add("(Official Website: https://thebusygrowth.com) Tj");
  add("ET");

  add("0.000 0.651 0.318 rg");
  add(`0 0 ${W} 8 re f`);

  const contentsBody = streamCommands.join("\n");
  const contentsLength = Buffer.byteLength(contentsBody, "utf-8");

  const pdfChunks = [];
  let currentOffset = 0;
  const offsets = [];

  function pushString(str) {
    const buf = Buffer.from(str, "utf-8");
    pdfChunks.push(buf);
    currentOffset += buf.length;
  }

  function pushBuffer(buf) {
    pdfChunks.push(buf);
    currentOffset += buf.length;
  }

  pushString("%PDF-1.4\n");

  offsets[1] = currentOffset;
  pushString("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");

  offsets[2] = currentOffset;
  pushString("2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n");

  offsets[3] = currentOffset;
  const xObjRes = qrBuffer ? " /XObject << /Im1 7 0 R >>" : "";
  pushString(`3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >>${xObjRes} >> /Contents 6 0 R >>\nendobj\n`);

  offsets[4] = currentOffset;
  pushString("4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj\n");

  offsets[5] = currentOffset;
  pushString("5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\nendobj\n");

  offsets[6] = currentOffset;
  pushString(`6 0 obj\n<< /Length ${contentsLength} >>\nstream\n${contentsBody}\nendstream\nendobj\n`);

  if (qrBuffer) {
    offsets[7] = currentOffset;
    pushString(`7 0 obj\n<< /Type /XObject /Subtype /Image /Width 533 /Height 1024 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${qrBuffer.length} >>\nstream\n`);
    pushBuffer(qrBuffer);
    pushString("\nendstream\nendobj\n");
  }

  const startXref = currentOffset;
  const totalObjCount = qrBuffer ? 8 : 7;
  pushString(`xref\n0 ${totalObjCount}\n`);
  pushString("0000000000 65535 f \n");
  for (let i = 1; i < totalObjCount; i++) {
    pushString(offsets[i].toString().padStart(10, "0") + " 00000 n \n");
  }

  pushString(`trailer\n<< /Size ${totalObjCount} /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF\n`);

  const finalPdf = Buffer.concat(pdfChunks);
  const outputPath = path.join(__dirname, 'test_output.pdf');
  fs.writeFileSync(outputPath, finalPdf);
  console.log(`Generated test PDF at ${outputPath}, size: ${finalPdf.length} bytes`);
}

testGeneratePDF();
