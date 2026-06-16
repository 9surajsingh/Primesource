import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import CareersClient from './CareersClient';

export const revalidate = 0;

const jobTypeMap: Record<string, string> = {
  'FULL_TIME': 'Full-Time',
  'PART_TIME': 'Part-Time',
  'CONTRACT': 'Contract',
  'FREELANCE': 'Freelance',
};

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await prisma.pageSeo.findUnique({
      where: { pagePath: '/careers' },
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
    console.error('Failed to generate careers page SEO:', e);
  }
  return {
    title: 'Careers at PrimeSource - Join Our Elite Technology Team',
    description: 'Explore open job roles in engineering, product development, design, and product management.',
  };
}

export default async function CareersPage() {
  const dbJobs = await prisma.job.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    select: {
      slug: true,
      title: true,
      department: true,
      location: true,
      type: true,
      experience: true,
      skills: true,
    },
  });

  const jobs = dbJobs.map((job) => ({
    ...job,
    type: jobTypeMap[job.type] || job.type,
  }));

  return <CareersClient jobs={jobs} />;
}
