import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const caseStudySchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: z.string().min(1, 'Slug is required').max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'),
  client: z.string().min(1, 'Client is required'),
  industry: z.string().min(1, 'Industry is required'),
  excerpt: z.string().min(1, 'Excerpt is required').max(500),
  challenge: z.string().min(1, 'Challenge is required'),
  solution: z.string().min(1, 'Solution is required'),
  results: z.string().min(1, 'Results are required'),
  coverImage: z.string().url('Invalid URL').optional().or(z.literal('')),
  technologies: z.array(z.string()).default([]),
  metrics: z.record(z.string(), z.string()).optional().default({}),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const industry = searchParams.get('industry');
    const published = searchParams.get('published');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (industry) where.industry = industry;
    if (published !== null && published !== undefined && published !== '') {
      where.published = published === 'true';
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { client: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [caseStudies, total] = await Promise.all([
      prisma.caseStudy.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.caseStudy.count({ where }),
    ]);

    return NextResponse.json({
      caseStudies,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return NextResponse.json({ error: 'Failed to fetch case studies' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = caseStudySchema.parse(body);

    const existing = await prisma.caseStudy.findUnique({
      where: { slug: validatedData.slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'A case study with this slug already exists' },
        { status: 409 }
      );
    }

    const caseStudy = await prisma.caseStudy.create({
      data: {
        ...validatedData,
        coverImage: validatedData.coverImage || null,
      },
    });

    return NextResponse.json(caseStudy, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Error creating case study:', error);
    return NextResponse.json({ error: 'Failed to create case study' }, { status: 500 });
  }
}
