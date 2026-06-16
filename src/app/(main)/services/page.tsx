import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import ServicesClient from './ServicesClient';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await prisma.pageSeo.findUnique({
      where: { pagePath: '/services' },
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
    console.error('Failed to generate services page SEO:', e);
  }
  return {
    title: 'Our Services - Custom Software Development & Tech Staffing',
    description: 'Explore the tech services provided by PrimeSource, including custom development, mobile apps, and elite IT staffing.',
  };
}

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
    select: {
      title: true,
      slug: true,
      icon: true,
      description: true,
      features: true,
    },
  });

  return <ServicesClient services={services} />;
}
