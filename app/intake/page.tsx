import IntakeForm from '@/components/IntakeForm';

export default function IntakePage({
  searchParams,
}: {
  searchParams: { session_id?: string; paid?: string };
}) {
  const paidBypass = searchParams?.paid === '1';
  const sessionId = searchParams?.session_id ?? (paidBypass ? `cs_bypass_${Date.now()}` : '');
  return <IntakeForm sessionId={sessionId} />;
}
