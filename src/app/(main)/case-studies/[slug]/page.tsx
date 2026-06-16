import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import CaseStudyDetailClient from './CaseStudyDetailClient';
import { notFound } from 'next/navigation';

export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const study = await prisma.caseStudy.findUnique({
      where: { slug },
      select: {
        title: true,
        excerpt: true,
        seoTitle: true,
        seoDescription: true,
        seoKeywords: true,
      },
    });

    if (study) {
      return {
        title: study.seoTitle || `${study.title} | PrimeSource Case Study`,
        description: study.seoDescription || study.excerpt,
        keywords: study.seoKeywords,
      };
    }
  } catch (e) {
    console.error('Failed to generate case study details metadata:', e);
  }
  return {
    title: 'Case Study | PrimeSource',
    description: 'Read about our client success stories and technology solution outcomes.',
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const study = await prisma.caseStudy.findUnique({
    where: { slug },
  });

  if (!study) {
    notFound();
  }

  return <CaseStudyDetailClient study={study} />;
}
