// app/intake/page.tsx
import IntakeForm from "@/components/IntakeForm";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function IntakePage({
  searchParams,
}: {
  searchParams: { session_id?: string; paid?: string };
}) {
  const sessionId = (searchParams?.session_id ?? "").toString().trim();
  const paid = (searchParams?.paid ?? "").toString().trim() === "1";

  return (
    <main style={{ maxWidth: 760, margin: "0 auto", padding: 24 }}>
      <IntakeForm sessionId={sessionId} paid={paid} />
    </main>
  );
}
