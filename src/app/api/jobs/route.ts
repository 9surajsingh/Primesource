import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const jobSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: z.string().min(1, 'Slug is required').max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'),
  department: z.string().min(1, 'Department is required'),
  location: z.string().min(1, 'Location is required'),
  type: z.enum(['Full-Time', 'Part-Time', 'Contract', 'Freelance']),
  experience: z.string().min(1, 'Experience is required'),
  salary: z.string().optional().default(''),
  description: z.string().min(1, 'Description is required'),
  requirements: z.array(z.string()).default([]),
  benefits: z.array(z.string()).default([]),
  skills: z.array(z.string()).default([]),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const department = searchParams.get('department');
    const type = searchParams.get('type');
    const location = searchParams.get('location');
    const published = searchParams.get('published');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (department) where.department = department;
    if (type) where.type = type;
    if (location) where.location = { contains: location, mode: 'insensitive' };
    if (published !== null && published !== undefined && published !== '') {
      where.published = published === 'true';
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { department: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          _count: {
            select: { applications: true },
          },
        },
      }),
      prisma.job.count({ where }),
    ]);

    return NextResponse.json({
      jobs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = jobSchema.parse(body);

    const existingJob = await prisma.job.findUnique({
      where: { slug: validatedData.slug },
    });

    if (existingJob) {
      return NextResponse.json(
        { error: 'A job with this slug already exists' },
        { status: 409 }
      );
    }

    const jobTypeMap: Record<string, any> = {
      'Full-Time': 'FULL_TIME',
      'Part-Time': 'PART_TIME',
      'Contract': 'CONTRACT',
      'Freelance': 'FREELANCE',
    };

    const job = await prisma.job.create({
      data: {
        ...validatedData,
        type: jobTypeMap[validatedData.type],
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Error creating job:', error);
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }
}
