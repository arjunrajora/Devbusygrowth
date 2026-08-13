import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { BUSINESS_CONFIG } from "@/components/businessConfig";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, businessType, interest, message } = body;

    // 1. Basic validation checks
    if (!name || !email || !phone || !businessType || !interest) {
      return NextResponse.json(
        { error: "Missing required fields in submission." },
        { status: 400 }
      );
    }

    // 2. Load and verify SMTP credentials from environment variables
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const senderEmail = process.env.SENDER_EMAIL || BUSINESS_CONFIG.email;
    const adminEmail = process.env.ADMIN_EMAIL || BUSINESS_CONFIG.email;

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error("Missing SMTP credentials. Please define SMTP_HOST, SMTP_USER, and SMTP_PASS.");
      return NextResponse.json(
        { error: "Email configuration is not set up on this server." },
        { status: 500 }
      );
    }

    // 3. Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for port 465, false for 587
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    // 4. Branded User Confirmation Email HTML Template
    const userHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You for Contacting TheBusyGrowth</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: #f8fafc; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
            .wrapper { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(7, 26, 61, 0.03); }
            .header { background-color: #071a3d; padding: 30px; text-align: center; border-bottom: 3px solid #00a651; }
            .logo-text { color: #ffffff; font-size: 24px; font-weight: 800; tracking-spacing: 1px; margin: 0; }
            .content { padding: 40px 30px; color: #334155; line-height: 1.6; }
            h1 { font-size: 20px; font-weight: 700; color: #071a3d; margin-top: 0; }
            p { font-size: 14px; margin-bottom: 20px; }
            .btn-container { text-align: center; margin: 30px 0; }
            .btn { display: inline-block; background-color: #0d60c4; color: #ffffff !important; font-weight: 700; text-decoration: none; padding: 12px 30px; border-radius: 9999px; font-size: 14px; transition: transform 0.2s ease; }
            .footer { background-color: #071a3d; color: #cbd5e1; padding: 25px 30px; text-align: center; font-size: 12px; }
            .footer a { color: #00a651; text-decoration: none; font-weight: bold; }
            .social-links { margin-top: 15px; }
            .social-links a { color: #ffffff; margin: 0 8px; text-decoration: underline; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="header">
              <div class="logo-text">The<span style="color: #00a651;">Busy</span>Growth</div>
            </div>
            <div class="content">
              <h1>Thank you for contacting TheBusyGrowth!</h1>
              <p>Hi ${name},</p>
              <p>We have successfully received your project enquiry. Our team of performance operators will review your requirements and get back to you shortly.</p>
              <p><strong>Here is what happens next:</strong></p>
              <ol style="font-size: 14px; padding-left: 20px; margin-bottom: 25px;">
                <li style="margin-bottom: 8px;">Our strategy team will analyze your business type and interest area.</li>
                <li style="margin-bottom: 8px;">We will reach out to you via WhatsApp or Email within 24 hours.</li>
                <li style="margin-bottom: 8px;">We will schedule a free 30-minute strategy call to map your growth funnel.</li>
              </ol>
              <div class="btn-container">
                <a href="${BUSINESS_CONFIG.websiteUrl}/services" class="btn" target="_blank">Explore Our Services</a>
              </div>
              <p style="margin-bottom: 0;">Best regards,<br><strong>TheBusyGrowth Operations Team</strong></p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} ${BUSINESS_CONFIG.name}. All rights reserved.</p>
              <p>Based in ${BUSINESS_CONFIG.address} | Phone: ${BUSINESS_CONFIG.whatsappFormatted}</p>
              <p><a href="${BUSINESS_CONFIG.websiteUrl}" target="_blank">Visit our Website</a></p>
            </div>
          </div>
        </body>
      </html>
    `;

    // 5. Clean Admin Notification Email HTML Template
    const adminHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Project Enquiry — TheBusyGrowth</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: #f1f5f9; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
            .title-bar { background-color: #071a3d; color: #ffffff; padding: 20px; font-size: 18px; font-weight: 700; border-bottom: 3px solid #00a651; }
            .body { padding: 30px; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            td { padding: 12px 10px; font-size: 14px; border-bottom: 1px solid #e2e8f0; }
            .label { font-weight: bold; color: #475569; width: 35%; }
            .val { color: #0f172a; }
            .message-box { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin-top: 20px; font-size: 13px; color: #334155; white-space: pre-wrap; line-height: 1.5; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="title-bar">🚀 New Lead: Tell Us About Your Project</div>
            <div class="body">
              <p style="font-size: 14px; margin-top: 0; color: #334155;">A new strategy enquiry has been submitted on the website. Here are the submission details:</p>
              <table>
                <tbody>
                  <tr>
                    <td class="label">Lead Name</td>
                    <td class="val"><strong>${name}</strong></td>
                  </tr>
                  <tr>
                    <td class="label">Email Address</td>
                    <td class="val"><a href="mailto:${email}">${email}</a></td>
                  </tr>
                  <tr>
                    <td class="label">WhatsApp Number</td>
                    <td class="val"><a href="tel:${phone}">${phone}</a></td>
                  </tr>
                  <tr>
                    <td class="label">Business Type</td>
                    <td class="val">${businessType}</td>
                  </tr>
                  <tr>
                    <td class="label">Interest Area</td>
                    <td class="val">${interest}</td>
                  </tr>
                  <tr>
                    <td class="label">Submission Time</td>
                    <td class="val">${timestamp}</td>
                  </tr>
                </tbody>
              </table>
              
              <h4 style="margin: 20px 0 8px 0; font-size: 13px; color: #475569; uppercase tracking-wide">Project Details / Message:</h4>
              <div class="message-box">${message || "No message provided."}</div>
            </div>
          </div>
        </body>
      </html>
    `;

    // 6. Dispatch emails concurrently
    await Promise.all([
      // Send to User
      transporter.sendMail({
        from: `"${BUSINESS_CONFIG.name}" <${senderEmail}>`,
        to: email,
        subject: "Thank You for Contacting TheBusyGrowth",
        html: userHtml,
      }),
      // Send to Admin
      transporter.sendMail({
        from: `"${BUSINESS_CONFIG.name} Website" <${senderEmail}>`,
        to: adminEmail,
        subject: `New Project Enquiry — ${name}`,
        html: adminHtml,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error in contact API route:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error occurred while sending emails." },
      { status: 500 }
    );
  }
}
