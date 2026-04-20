import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unfinished Conversation',
  description: 'A one-scenario ritual to write what was never said and receive a private response.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      style={
        {
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          '--font-lora': 'Lora, Georgia, "Times New Roman", Times, serif',
        } as React.CSSProperties
      }
    >
      <body className="min-h-screen bg-background text-text">
        <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-6 py-12 md:px-10">
          {children}
        </main>
      </body>
    </html>
  );
}
