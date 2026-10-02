import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MultiTCGMarket',
  description: 'Premium TCG marketplace powered by Next.js and Prisma',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="bg-brand-dark text-slate-100">{children}</body>
    </html>
  );
}
