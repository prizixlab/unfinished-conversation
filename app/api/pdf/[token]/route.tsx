import { NextResponse } from "next/server";
import { Document, Page, StyleSheet, Text, pdf } from "@react-pdf/renderer";
import { supabaseAdmin } from "@/lib/supabase";

const RESULT_VISIBLE_STATUSES = new Set([
  "reply_generated",
  "sending_email",
  "completed",
  "failed_email",
]);

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontSize: 12,
    lineHeight: 1.6,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 16,
    marginBottom: 16,
  },
});

export async function GET(_: Request, { params }: { params: { token: string } }) {
  const { data, error } = await supabaseAdmin
    .from("requests")
    .select("status, reply_text")
    .eq("token", params.token)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data || !RESULT_VISIBLE_STATUSES.has(data.status) || !data.reply_text) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const doc = (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Verba Non Dicta</Text>
        <Text>{data.reply_text}</Text>
      </Page>
    </Document>
  );

  const pdfBlob = await pdf(doc).toBlob();

  return new NextResponse(pdfBlob, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="verba-non-dicta.pdf"',
    },
  });
}

export const dynamic = "force-dynamic";
