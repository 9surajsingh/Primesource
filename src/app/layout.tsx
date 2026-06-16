import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { BackToTop } from '@/components/shared/back-to-top';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | PrimeSource',
    default: 'PrimeSource - Transforming Business Through Technology & Talent',
  },
  description:
    'PrimeSource is a leading staffing and technology company delivering IT staffing, custom software development, and AI automation solutions to enterprises worldwide.',
  keywords: [
    'IT Staffing',
    'Contract Staffing',
    'Permanent Staffing',
    'Executive Search',
    'Web Development',
    'Mobile App Development',
    'Custom Software Development',
    'AI Automation',
    'Workflow Automation',
    'Business Process Automation',
    'Technology Consulting',
    'Digital Transformation',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://primesource.com',
    siteName: 'PrimeSource',
    title: 'PrimeSource - Transforming Business Through Technology & Talent',
    description:
      'PrimeSource is a leading staffing and technology company delivering IT staffing, custom software development, and AI automation solutions to enterprises worldwide.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PrimeSource - Technology & Talent Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PrimeSource - Transforming Business Through Technology & Talent',
    description:
      'Leading staffing and technology company delivering IT staffing, custom software development, and AI automation solutions.',
    images: ['/og-image.png'],
  },
  metadataBase: new URL('https://primesource.com'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans bg-[#0a0a0f] text-white antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1e293b',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              color: '#f1f5f9',
            },
          }}
        />
        <BackToTop />
      </body>
    </html>
  );
}
