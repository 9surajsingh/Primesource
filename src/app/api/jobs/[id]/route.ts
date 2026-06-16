import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const jobUpdateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
  department: z.string().min(1).optional(),
  location: z.string().min(1).optional(),
  type: z.enum(['Full-Time', 'Part-Time', 'Contract', 'Freelance']).optional(),
  experience: z.string().min(1).optional(),
  salary: z.string().optional(),
  description: z.string().min(1).optional(),
  requirements: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  skills: z.array(z.string()).optional(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
});

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        applications: {
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: { applications: true },
        },
      },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json({ error: 'Failed to fetch job' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const validatedData = jobUpdateSchema.parse(body);

    const existingJob = await prisma.job.findUnique({ where: { id } });
    if (!existingJob) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    if (validatedData.slug && validatedData.slug !== existingJob.slug) {
      const slugExists = await prisma.job.findUnique({
        where: { slug: validatedData.slug },
      });
      if (slugExists) {
        return NextResponse.json(
          { error: 'A job with this slug already exists' },
          { status: 409 }
        );
      }
    }

    const jobTypeMap: Record<string, any> = {
      'Full-Time': 'FULL_TIME',
      'Part-Time': 'PART_TIME',
      'Contract': 'CONTRACT',
      'Freelance': 'FREELANCE',
    };

    const updateData: any = { ...validatedData };
    if (validatedData.type) {
      updateData.type = jobTypeMap[validatedData.type];
    }

    const job = await prisma.job.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(job);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Error updating job:', error);
    return NextResponse.json({ error: 'Failed to update job' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    const existingJob = await prisma.job.findUnique({ where: { id } });
    if (!existingJob) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // Delete associated applications first
    await prisma.jobApplication.deleteMany({ where: { jobId: id } });
    await prisma.job.delete({ where: { id } });

    return NextResponse.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
  }
}
