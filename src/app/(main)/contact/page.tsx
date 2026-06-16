import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import ContactClient from './ContactClient';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await prisma.pageSeo.findUnique({
      where: { pagePath: '/contact' },
    });
    if (seo) {
      return {
        title: seo.seoTitle,
        description: seo.metaDescription,
        keywords: seo.keywords,
        openGraph: seo.ogImage ? { images: [seo.ogImage] } : undefined,
        alternates: seo.canonicalUrl ? { canonical: seo.canonicalUrl } : undefined,
        other: seo.schemaSettings ? {
          'application-ld+json': JSON.stringify(seo.schemaSettings)
        } : undefined
      };
    }
  } catch (e) {
    console.error('Failed to generate contact page SEO:', e);
  }
  return {
    title: 'Contact PrimeSource - Discuss Your Staffing & Development Needs',
    description: 'Get in touch with our tech experts for a free consultation or custom project estimate. We respond within 24 hours.',
  };
}

export default function ContactPage() {
  return <ContactClient />;
}
