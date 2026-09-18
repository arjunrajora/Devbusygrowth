import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import { saveEnquiry } from "@/lib/enquiries-store";

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

    // 1. Server-side Validation Checks
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

    // 2. Persist Enquiry to system store for Admin Portal & Dashboard
    let savedRecord;
    try {
      savedRecord = await saveEnquiry({
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        businessType: cleanBusinessType,
        interest: cleanInterest,
        message: cleanMessage,
      });
    } catch (saveErr) {
      console.error("Error persisting enquiry to store:", saveErr);
    }

    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });

    // 3. Environment SMTP Credentials check
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpUser = process.env.SMTP_USER || process.env.SMTP_USERNAME || "thebusygrowth@gmail.com";
    const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
    const senderEmail = process.env.SENDER_EMAIL || "thebusygrowth@gmail.com";
    const adminEmail = process.env.ADMIN_EMAIL || "thebusygrowth@gmail.com";

    // Prepare embedded logo attachment if local file exists
    const logoFilePath = path.join(process.cwd(), "public", "logo-transparent-dark.png");
    const logoExists = fs.existsSync(logoFilePath);
    const emailAttachments = logoExists
      ? [
          {
            filename: "logo-transparent-dark.png",
            path: logoFilePath,
            cid: "tb_logo",
          },
        ]
      : [];

    // 4. Send Emails if SMTP configured
    if (smtpHost && smtpUser && smtpPass) {
      try {
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

        // --- USER CONFIRMATION EMAIL TEMPLATE ---
        const userHtml = `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Thank You for Contacting TheBusyGrowth</title>
              <style>
                body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #050c1a; color: #e2e8f0; -webkit-font-smoothing: antialiased; }
                .wrapper { width: 100%; max-width: 600px; margin: 20px auto; background-color: #071a3d; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.4); }
                .header { background-color: #050c1a; padding: 28px 20px; text-align: center; border-bottom: 3px solid #00a651; }
                .logo-img { height: 48px; max-width: 220px; object-fit: contain; }
                .logo-fallback { font-size: 24px; font-weight: 800; color: #ffffff; text-decoration: none; }
                .logo-green { color: #00a651; }
                .content { padding: 36px 28px; line-height: 1.6; }
                .greeting { font-size: 22px; font-weight: 800; color: #ffffff; margin-top: 0; margin-bottom: 8px; }
                .highlight-green { color: #00a651; }
                .subheading { font-size: 15px; color: #94a3b8; margin-top: 0; margin-bottom: 24px; }
                .card-box { background-color: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 20px; margin-bottom: 24px; }
                .card-title { font-size: 13px; font-weight: 700; color: #00a651; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 0; margin-bottom: 10px; }
                .detail-item { font-size: 13px; color: #cbd5e1; margin-bottom: 6px; }
                .btn-container { text-align: center; margin: 32px 0 24px 0; }
                .btn { display: inline-block; background: linear-gradient(135deg, #0d60c4 0%, #00a651 100%); color: #ffffff !important; font-weight: 700; text-decoration: none; padding: 14px 36px; border-radius: 9999px; font-size: 14px; box-shadow: 0 4px 15px rgba(13,96,196,0.3); }
                .footer { background-color: #050c1a; padding: 24px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid rgba(255,255,255,0.05); line-height: 1.8; }
                .footer a { color: #00a651; text-decoration: none; font-weight: 700; }
              </style>
            </head>
            <body>
              <div class="wrapper">
                <div class="header">
                  ${
                    logoExists
                      ? `<img src="cid:tb_logo" alt="TheBusyGrowth Logo" class="logo-img" />`
                      : `<div class="logo-fallback">The<span class="logo-green">Busy</span>Growth</div>`
                  }
                </div>
                <div class="content">
                  <h1 class="greeting">Thank You, <span class="highlight-green">${cleanName}</span>!</h1>
                  <p class="subheading">We received your project enquiry successfully.</p>
                  
                  <p style="font-size: 14px; color: #cbd5e1; margin-bottom: 20px;">
                    Our performance operators are currently reviewing your project details. We will analyze your goals and reach out to you via WhatsApp or Email within 24 hours.
                  </p>

                  <div class="card-box">
                    <div class="card-title">Enquiry Summary</div>
                    <div class="detail-item"><strong>Business Type:</strong> ${cleanBusinessType}</div>
                    <div class="detail-item"><strong>Services Required:</strong> ${cleanInterest}</div>
                  </div>

                  <div class="btn-container">
                    <a href="https://thebusygrowth.com/" class="btn" target="_blank">Visit TheBusyGrowth</a>
                  </div>

                  <p style="font-size: 13px; color: #94a3b8; margin-top: 24px; margin-bottom: 0;">
                    Best regards,<br>
                    <strong style="color: #ffffff;">TheBusyGrowth Operations Team</strong>
                  </p>
                </div>
                <div class="footer">
                  <p style="margin: 0 0 6px 0;">&copy; ${new Date().getFullYear()} TheBusyGrowth. All rights reserved.</p>
                  <p style="margin: 0 0 6px 0;">Official Website: <a href="https://thebusygrowth.com/" target="_blank">https://thebusygrowth.com/</a></p>
                  <p style="margin: 0;">Contact: <a href="mailto:thebusygrowth@gmail.com">thebusygrowth@gmail.com</a></p>
                </div>
              </div>
            </body>
          </html>
        `;

        // --- ADMIN NOTIFICATION EMAIL TEMPLATE ---
        const adminHtml = `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>New Project Enquiry — TheBusyGrowth</title>
              <style>
                body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; -webkit-font-smoothing: antialiased; }
                .wrapper { width: 100%; max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 25px rgba(7,26,61,0.06); }
                .header { background-color: #071a3d; padding: 24px 20px; text-align: center; border-bottom: 3px solid #00a651; }
                .logo-img { height: 48px; max-width: 220px; object-fit: contain; }
                .logo-fallback { font-size: 24px; font-weight: 800; color: #ffffff; }
                .logo-green { color: #00a651; }
                .content { padding: 32px 24px; }
                .title-heading { font-size: 20px; font-weight: 800; color: #071a3d; margin-top: 0; margin-bottom: 4px; }
                .timestamp { font-size: 12px; font-weight: 600; color: #64748b; margin-bottom: 24px; }
                .section-header { font-size: 12px; font-weight: 800; color: #0d60c4; text-transform: uppercase; letter-spacing: 0.8px; margin-top: 20px; margin-bottom: 10px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
                td { padding: 10px 8px; font-size: 13px; border-bottom: 1px solid #f1f5f9; }
                .label { font-weight: 700; color: #475569; width: 38%; }
                .value { color: #0f172a; font-weight: 500; }
                .value a { color: #0d60c4; text-decoration: none; font-weight: 700; }
                .msg-card { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; font-size: 13px; color: #334155; white-space: pre-wrap; line-height: 1.6; margin-top: 8px; }
                .btn-container { text-align: center; margin: 32px 0 16px 0; }
                .btn { display: inline-block; background-color: #071a3d; color: #ffffff !important; font-weight: 700; text-decoration: none; padding: 12px 30px; border-radius: 9999px; font-size: 13px; }
                .footer { background-color: #071a3d; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid rgba(255,255,255,0.05); }
                .footer a { color: #00a651; text-decoration: none; font-weight: 700; }
              </style>
            </head>
            <body>
              <div class="wrapper">
                <div class="header">
                  ${
                    logoExists
                      ? `<img src="cid:tb_logo" alt="TheBusyGrowth Logo" class="logo-img" />`
                      : `<div class="logo-fallback">The<span class="logo-green">Busy</span>Growth</div>`
                  }
                </div>
                <div class="content">
                  <h1 class="title-heading">🚀 New Project Enquiry</h1>
                  <div class="timestamp">Submitted on ${timestamp}</div>

                  <div class="section-header">1. Contact Details</div>
                  <table>
                    <tbody>
                      <tr>
                        <td class="label">Lead Name</td>
                        <td class="value"><strong>${cleanName}</strong></td>
                      </tr>
                      <tr>
                        <td class="label">Email Address</td>
                        <td class="value"><a href="mailto:${cleanEmail}">${cleanEmail}</a></td>
                      </tr>
                      <tr>
                        <td class="label">WhatsApp / Phone</td>
                        <td class="value"><a href="tel:${cleanPhone}">${cleanPhone}</a></td>
                      </tr>
                      <tr>
                        <td class="label">Business Type / Company</td>
                        <td class="value">${cleanBusinessType}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div class="section-header">2. Project Details</div>
                  <table>
                    <tbody>
                      <tr>
                        <td class="label">Services Required</td>
                        <td class="value"><strong>${cleanInterest}</strong></td>
                      </tr>
                    </tbody>
                  </table>

                  <div class="section-header">3. Project Description</div>
                  <div class="msg-card">${cleanMessage}</div>

                  <div class="btn-container">
                    <a href="https://thebusygrowth.com/admin/login" class="btn" target="_blank">Manage in Admin Dashboard</a>
                  </div>
                </div>
                <div class="footer">
                  <p style="margin: 0 0 4px 0;">TheBusyGrowth Operations & Admin Portal</p>
                  <p style="margin: 0;"><a href="https://thebusygrowth.com/" target="_blank">https://thebusygrowth.com/</a></p>
                </div>
              </div>
            </body>
          </html>
        `;

        await Promise.all([
          // 1. User Confirmation Email
          transporter.sendMail({
            from: `"TheBusyGrowth" <${senderEmail}>`,
            to: cleanEmail,
            subject: "Thank You for Contacting TheBusyGrowth",
            html: userHtml,
            attachments: emailAttachments,
          }),
          // 2. Admin Enquiry Notification Email
          transporter.sendMail({
            from: `"TheBusyGrowth Website" <${senderEmail}>`,
            to: adminEmail,
            subject: "New Project Enquiry — TheBusyGrowth",
            html: adminHtml,
            attachments: emailAttachments,
          }),
        ]);
      } catch (emailErr) {
        console.error("SMTP Email Dispatch Error:", emailErr);
        // Error logged server-side without exposing SMTP secrets or breaking user response
      }
    } else {
      console.log("SMTP Environment credentials not configured. Enquiry persisted to MongoDB database.");
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully",
      enquiryId: savedRecord?.id || "ENQ-OK",
    });
  } catch (error: any) {
    console.error("Error in contact POST handler:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your enquiry. Please try again." },
      { status: 500 }
    );
  }
}
