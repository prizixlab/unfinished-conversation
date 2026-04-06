import { NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const to = searchParams.get("to") || "";

    if (!to) {
        return NextResponse.json({ error: "Missing ?to=" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ error: "Missing RESEND_API_KEY" }, { status: 500 });
    }

    const resend = new Resend(apiKey);

    try {
        const result = await resend.emails.send({
            // NOTE: this works in dev without domain setup
            from: "Verba Non Dicta <onboarding@resend.dev>",
            to,
            subject: "Verba Non Dicta test email",
            html: "<p>If you got this, Resend delivery works ✅</p>",
        });

        return NextResponse.json({ ok: true, result });
    } catch (e: any) {
        return NextResponse.json(
            { ok: false, error: e?.message || "Send failed", details: e },
            { status: 500 }
        );
    }
}
