import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import CaseStudiesClient from './CaseStudiesClient';

// Ensure the page is revalidated dynamically
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await prisma.pageSeo.findUnique({
      where: { pagePath: '/case-studies' },
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
    console.error('Failed to generate case studies page SEO:', e);
  }
  return {
    title: 'Technology Case Studies & Client Success Stories - PrimeSource',
    description: 'Discover how we helped Fortune 500 companies and fast-growing startups modernize legacy architectures.',
  };
}

export default async function CaseStudiesPage() {
  const caseStudies = await prisma.caseStudy.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    select: {
      slug: true,
      title: true,
      client: true,
      industry: true,
      excerpt: true,
      coverImage: true,
      technologies: true,
    },
  });

  // Dynamically extract unique industries from the database records
  const uniqueIndustries = Array.from(new Set(caseStudies.map((cs) => cs.industry)));
  const industries = ['All', ...uniqueIndustries];

  return <CaseStudiesClient caseStudies={caseStudies} industries={industries} />;
}
