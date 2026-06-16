import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const [blogCount, jobCount, caseStudyCount, contactCount, recentContacts, recentApplications] = await Promise.all([
      prisma.blogPost.count(),
      prisma.job.count(),
      prisma.caseStudy.count(),
      prisma.contact.count({ where: { status: 'NEW' } }),
      prisma.contact.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
      prisma.jobApplication.findMany({ take: 5, orderBy: { createdAt: 'desc' }, include: { job: { select: { title: true } } } }),
    ]);

    return NextResponse.json({
      stats: {
        blogPosts: blogCount,
        jobs: jobCount,
        caseStudies: caseStudyCount,
        unreadContacts: contactCount,
      },
      recentContacts,
      recentApplications,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
  }
}
