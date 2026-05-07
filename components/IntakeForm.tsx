"use client";

import { useState } from "react";

type IntakeFormProps = {
  sessionId: string;
  paid?: boolean;
};

export default function IntakeForm({ sessionId }: IntakeFormProps) {
  const [activeSessionId] = useState(sessionId);
  const [senderName, setSenderName] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitted || loading) return;

    setError(null);

    setLoading(true);
    try {
      const res = await fetch("/api/intake/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderName,
          recipientName,
          recipientEmail,
          message,
          sessionId: activeSessionId,
        }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setSubmitted(true);
      } else {
        setError(data.error || "Failed to send message.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const disabled = submitted || loading;

  return (
    <div className="max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
      <form onSubmit={onSubmit} className="space-y-6">
        <input type="hidden" name="session_id" value={activeSessionId} />

        <div>
          <label className="text-sm text-white/80">
            How should the reply address you?
          </label>
          <input
            className="mt-1 w-full rounded-lg bg-white/10 px-3 py-2 outline-none ring-1 ring-white/15 focus:ring-white/30"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            disabled={disabled}
            required
          />
          <p className="mt-2 text-xs text-white/60">
            Use your first name, nickname, or the name they would have used for you.
          </p>
        </div>

        <div>
          <label className="text-sm text-white/80">This message is for</label>
          <input
            className="mt-1 w-full rounded-lg bg-white/10 px-3 py-2 outline-none ring-1 ring-white/15 focus:ring-white/30"
            placeholder="A person / Someone I miss / Someone important"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            disabled={disabled}
            required
          />
        </div>

        <div>
          <label className="text-sm text-white/80">Your message</label>
          <p className="mt-2 text-xs text-white/60">
            Write in any language that feels natural.
          </p>
          <textarea
            className="mt-1 min-h-[180px] w-full rounded-lg bg-white/10 px-3 py-2 outline-none ring-1 ring-white/15 focus:ring-white/30"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={disabled}
            required
          />
        </div>

        <div>
          <label className="text-sm text-white/80">
            Your email (where the reply will arrive)
          </label>
          <input
            type="email"
            className="mt-1 w-full rounded-lg bg-white/10 px-3 py-2 outline-none ring-1 ring-white/15 focus:ring-white/30"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            disabled={disabled}
            required
          />
        </div>

        <button
          type="submit"
          disabled={disabled}
          className="w-full rounded-full bg-[#D4AF37] px-5 py-3 font-semibold text-black disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send your message"}
        </button>

        {submitted ? (
          <p className="text-sm text-white/80">
            Your words are sent. Watch your email for a private link. If it does
            not arrive within a few minutes, check your spam or promotions folder
            and mark the message as ‘Not spam.’
          </p>
        ) : null}

        {error ? <p className="text-sm text-red-300">{error}</p> : null}
      </form>
    </div>
  );
}
