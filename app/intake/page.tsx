import IntakeForm from '@/components/IntakeForm';

export default function IntakePage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams?.session_id ?? '';
  return <IntakeForm sessionId={sessionId} />;
}
