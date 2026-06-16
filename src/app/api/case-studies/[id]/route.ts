import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const caseStudyUpdateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
  client: z.string().min(1).optional(),
  industry: z.string().min(1).optional(),
  excerpt: z.string().min(1).max(500).optional(),
  challenge: z.string().min(1).optional(),
  solution: z.string().min(1).optional(),
  results: z.string().min(1).optional(),
  coverImage: z.string().url().optional().nullable().or(z.literal('')),
  technologies: z.array(z.string()).optional(),
  metrics: z.record(z.string(), z.string()).optional(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
});

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const caseStudy = await prisma.caseStudy.findUnique({ where: { id } });

    if (!caseStudy) {
      return NextResponse.json({ error: 'Case study not found' }, { status: 404 });
    }

    return NextResponse.json(caseStudy);
  } catch (error) {
    console.error('Error fetching case study:', error);
    return NextResponse.json({ error: 'Failed to fetch case study' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const validatedData = caseStudyUpdateSchema.parse(body);

    const existing = await prisma.caseStudy.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Case study not found' }, { status: 404 });
    }

    if (validatedData.slug && validatedData.slug !== existing.slug) {
      const slugExists = await prisma.caseStudy.findUnique({
        where: { slug: validatedData.slug },
      });
      if (slugExists) {
        return NextResponse.json(
          { error: 'A case study with this slug already exists' },
          { status: 409 }
        );
      }
    }

    const caseStudy = await prisma.caseStudy.update({
      where: { id },
      data: {
        ...validatedData,
        coverImage: validatedData.coverImage === '' ? null : validatedData.coverImage,
      },
    });

    return NextResponse.json(caseStudy);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Error updating case study:', error);
    return NextResponse.json({ error: 'Failed to update case study' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    const existing = await prisma.caseStudy.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Case study not found' }, { status: 404 });
    }

    await prisma.caseStudy.delete({ where: { id } });

    return NextResponse.json({ message: 'Case study deleted successfully' });
  } catch (error) {
    console.error('Error deleting case study:', error);
    return NextResponse.json({ error: 'Failed to delete case study' }, { status: 500 });
  }
}
