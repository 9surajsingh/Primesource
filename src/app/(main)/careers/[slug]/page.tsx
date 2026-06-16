import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import JobDetailClient from './JobDetailClient';
import { notFound } from 'next/navigation';

export const revalidate = 0;

const jobTypeMap: Record<string, string> = {
  'FULL_TIME': 'Full-Time',
  'PART_TIME': 'Part-Time',
  'CONTRACT': 'Contract',
  'FREELANCE': 'Freelance',
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const job = await prisma.job.findUnique({
      where: { slug },
      select: {
        title: true,
        department: true,
        location: true,
        experience: true,
      },
    });

    if (job) {
      return {
        title: `${job.title} | ${job.department} Careers at PrimeSource`,
        description: `Apply for the ${job.title} position in our ${job.department} department. Location: ${job.location}. Experience required: ${job.experience}.`,
      };
    }
  } catch (e) {
    console.error('Failed to generate job detail page metadata:', e);
  }
  return {
    title: 'Job Opening | PrimeSource Careers',
    description: 'Join our elite engineering and technology teams.',
  };
}

export default async function JobDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const dbJob = await prisma.job.findUnique({
    where: { slug },
  });

  if (!dbJob) {
    notFound();
  }

  const job = {
    ...dbJob,
    type: jobTypeMap[dbJob.type] || dbJob.type,
  };

  return <JobDetailClient job={job} />;
}
