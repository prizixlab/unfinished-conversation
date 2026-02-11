import Link from "next/link";
import { CheckoutButton } from "@/components/CheckoutButton";

export default function StartPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-5">
        <p className="text-sm uppercase tracking-[0.28em] text-muted">Begin</p>

        <h1 className="font-[var(--font-lora)] text-4xl md:text-5xl leading-tight">
          A simple three-step process.
        </h1>

        <ol className="space-y-2 text-muted">
          <li>1. Pay $27 for a single private response.</li>
          <li>
            2. Write one message to someone you loved — someone who is no longer
            here.
          </li>
          <li>
            3. Wait. A private reply arrives within 24 hours (often sooner).
          </li>
        </ol>
      </div>

      <div className="rounded-3xl border border-border bg-surface px-6 py-6 md:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-muted">
              One Conversation
            </p>
            <p className="mt-1 text-4xl font-semibold text-text">$27</p>
          </div>

          <CheckoutButton />
        </div>
      </div>

      <p className="max-w-3xl text-sm text-muted leading-relaxed">
        After payment, a short prompt guides the message. The reply is delivered
        privately by email link. Write in any language.
        <br />
        If the email isn’t visible, check Spam/Promotions and mark it as “Not
        spam” so the link isn’t missed.
        <span className="ml-2">
          <Link href="/faq" className="underline underline-offset-4 hover:text-text">
            FAQ
          </Link>
        </span>
      </p>
    </div>
  );
}
