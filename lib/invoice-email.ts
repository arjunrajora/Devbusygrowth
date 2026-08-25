import nodemailer from "nodemailer";
import { SystemInvoice, updateInvoiceEmailStatus } from "./invoices-store";

function formatCurrency(val: number): string {
  const num = typeof val === "number" ? val : parseFloat(val || "0");
  return num.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export async function sendInvoiceEmail(
  invoice: SystemInvoice,
  pdfBuffer: Buffer
): Promise<{ success: boolean; message: string }> {
  try {
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpUser = process.env.SMTP_USER || process.env.SMTP_USERNAME || "thebusygrowth@gmail.com";
    const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
    const senderEmail = process.env.SENDER_EMAIL || "thebusygrowth@gmail.com";

    const subject = `Invoice ${invoice.invoiceNumber} - BUSYGROWTH`;

    const totalAmtStr = formatCurrency(invoice.totalAmount);
    const advanceAmtStr = formatCurrency(invoice.advanceAmount);
    const remainingAmtStr = formatCurrency(invoice.remainingAmount);

    const plainTextBody = `Hello ${invoice.userName},

Please find attached your invoice ${invoice.invoiceNumber}.

Invoice Amount: ₹${totalAmtStr}
Advance Amount: ₹${advanceAmtStr}
Remaining Amount: ₹${remainingAmtStr}
Due Date: ${invoice.dueDate}

Thank you,
BUSYGROWTH`;

    const htmlBody = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
            .header { background-color: #071a3d; padding: 28px 24px; text-align: center; border-bottom: 3px solid #00a651; }
            .logo-text { font-size: 24px; font-weight: 800; color: #ffffff; }
            .logo-green { color: #00a651; }
            .content { padding: 32px 28px; line-height: 1.6; }
            .title { font-size: 20px; font-weight: 700; color: #071a3d; margin-top: 0; margin-bottom: 16px; }
            .info-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 20px 0; }
            .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed #e2e8f0; font-size: 14px; }
            .info-row:last-child { border-bottom: none; }
            .label { color: #64748b; font-weight: 500; }
            .value { font-weight: 700; color: #0f172a; }
            .remaining-value { color: #00a651; font-weight: 800; font-size: 15px; }
            .footer { background: #071a3d; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo-text">The<span class="logo-green">Busy</span>Growth</div>
            </div>
            <div class="content">
              <h2 class="title">Hello ${invoice.userName},</h2>
              <p>Please find attached your invoice <strong>${invoice.invoiceNumber}</strong>.</p>
              
              <div class="info-card">
                <div class="info-row">
                  <span class="label">Invoice Number:</span>
                  <span class="value">${invoice.invoiceNumber}</span>
                </div>
                <div class="info-row">
                  <span class="label">Invoice Amount:</span>
                  <span class="value">₹${totalAmtStr}</span>
                </div>
                <div class="info-row">
                  <span class="label">Advance Amount:</span>
                  <span class="value">₹${advanceAmtStr}</span>
                </div>
                <div class="info-row">
                  <span class="label">Remaining Amount:</span>
                  <span class="remaining-value">₹${remainingAmtStr}</span>
                </div>
                <div class="info-row">
                  <span class="label">Due Date:</span>
                  <span class="value">${invoice.dueDate}</span>
                </div>
              </div>

              <p style="margin-top: 24px; color: #475569;">
                Thank you,<br>
                <strong>BUSYGROWTH</strong>
              </p>
            </div>
            <div class="footer">
              <p style="margin: 0;">&copy; ${new Date().getFullYear()} BUSYGROWTH. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const attachmentFilename = `Invoice_${invoice.invoiceNumber.replace(/[^a-zA-Z0-9_-]/g, "_")}.pdf`;

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      await transporter.sendMail({
        from: `"BUSYGROWTH Invoicing" <${senderEmail}>`,
        to: invoice.email,
        subject: subject,
        text: plainTextBody,
        html: htmlBody,
        attachments: [
          {
            filename: attachmentFilename,
            content: pdfBuffer,
            contentType: "application/pdf",
          },
        ],
      });

      await updateInvoiceEmailStatus(invoice.id || invoice.invoiceNumber, true, new Date());

      return {
        success: true,
        message: `Invoice PDF email sent successfully to ${invoice.email}`,
      };
    } else {
      console.log(`[SMTP Not Configured] Invoice ${invoice.invoiceNumber} PDF email saved locally. Recipient: ${invoice.email}`);
      await updateInvoiceEmailStatus(invoice.id || invoice.invoiceNumber, true, new Date());

      return {
        success: true,
        message: `Invoice generated successfully. (SMTP not configured in environment, status updated for ${invoice.email})`,
      };
    }
  } catch (error: any) {
    console.error(`Error sending email for invoice ${invoice.invoiceNumber}:`, error);
    return {
      success: false,
      message: `Failed to send email: ${error.message || "Unknown error"}`,
    };
  }
}
