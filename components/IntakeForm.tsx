'use client';

import { useState } from 'react';

export default function IntakeForm({ sessionId }: { sessionId: string }) {
  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOk(false);

    try {
      const res = await fetch('/api/intake/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          senderName,
          recipientName,
          recipientEmail,
          message,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || 'Failed to submit.');

      setOk(true);
    } catch (err: any) {
      setError(err?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-10 text-white">
      <h1 className="text-2xl font-semibold">Write your message</h1>
      <p className="mt-2 text-sm text-white/70">
        Payment confirmed. Session: <span className="font-mono">{sessionId}</span>
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div>
          <label className="text-sm text-white/80">Your name</label>
          <input
            className="mt-1 w-full rounded-lg bg-white/10 px-3 py-2 outline-none ring-1 ring-white/15 focus:ring-2"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm text-white/80">Recipient name</label>
          <input
            className="mt-1 w-full rounded-lg bg-white/10 px-3 py-2 outline-none ring-1 ring-white/15 focus:ring-2"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-white/80">Recipient email</label>
          <input
            className="mt-1 w-full rounded-lg bg-white/10 px-3 py-2 outline-none ring-1 ring-white/15 focus:ring-2"
            type="email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm text-white/80">Message</label>
          <textarea
            className="mt-1 min-h-[160px] w-full rounded-lg bg-white/10 px-3 py-2 outline-none ring-1 ring-white/15 focus:ring-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-white text-black px-5 py-3 font-semibold disabled:opacity-60"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>

        {ok ? <p className="text-green-300 text-sm">✅ Submitted.</p> : null}
        {error ? <p className="text-red-300 text-sm">❌ {error}</p> : null}
      </form>
    </main>
  );
}
