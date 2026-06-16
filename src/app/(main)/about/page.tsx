import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import AboutContent from './AboutContent';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await prisma.pageSeo.findUnique({
      where: { pagePath: '/about' },
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
    console.error('Failed to generate about page SEO:', e);
  }
  return {
    title: 'About PrimeSource',
    description:
      'Learn about PrimeSource — our mission, values, team, and 15+ years of experience transforming businesses through technology and talent solutions.',
  };
}

export default function AboutPage() {
  return <AboutContent />;
}
