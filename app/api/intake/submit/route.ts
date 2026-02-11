import { resend } from "@/lib/resend";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { session_id, senderName, recipientName, recipientEmail, message } = body;

        if (!session_id || !senderName || !recipientEmail || !message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        console.log("INTAKE RECEIVED:", body);

        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
        const intakeLink = `${baseUrl}/intake?session_id=${encodeURIComponent(session_id)}`;

        // Send confirmation email (THIS IS JUST A TEST EMAIL FOR NOW)
        const emailResult = await resend.emails.send({
            from: "Verba Non Dicta <onboarding@resend.dev>",
            to: recipientEmail,
            subject: "Your space is open",
            html: `
        <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial; line-height: 1.5">
          <h2 style="margin:0 0 12px 0;">Your space is open.</h2>
          <p style="margin:0 0 12px 0;">We received your words${recipientName ? ` for <b>${recipientName}</b>` : ""}.</p>
          <p style="margin:0 0 12px 0;">
            If you closed the page, you can return using this link (valid for 24 hours):
            <br/>
            <a href="${intakeLink}">${intakeLink}</a>
          </p>
          <hr style="border:none;border-top:1px solid #333; margin:16px 0;" />
          <p style="margin:0; color:#999; font-size: 13px;">
            From: ${senderName}
          </p>
        </div>
      `,
        });

        console.log("RESEND RESULT:", emailResult);

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("INTAKE ERROR:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
