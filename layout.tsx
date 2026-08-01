import type { Metadata, Viewport } from 'next';
import { Sora, Inter } from 'next/font/google';
import './globals.css';
import BottomNav from '@/components/BottomNav';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';

const sora = Sora({ subsets: ['latin'], variable: '--font-display', weight: ['600', '700', '800'] });
const inter = Inter({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
  title: 'Disha AI — दिशा | India\u2019s Student Super App',
  description:
    'Every real government + private exam, scholarship, internship, job and competition — verified, one tap from the official site. Plus an AI homework helper, timetable and offline practice quiz. No fake portals, ever.',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#09090B',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${sora.variable} ${inter.variable}`}>
      <body className="min-h-screen pb-20 font-body">
        <ServiceWorkerRegister />
        <main className="mx-auto max-w-2xl px-4 pt-6">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
