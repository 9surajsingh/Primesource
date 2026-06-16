import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const applicationSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required').max(20),
  resume: z.string().url('Resume must be a valid URL'),
  coverLetter: z.string().optional().default(''),
  linkedIn: z.string().url('LinkedIn must be a valid URL').optional().or(z.literal('')),
  portfolio: z.string().url('Portfolio must be a valid URL').optional().or(z.literal('')),
});

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    // Verify job exists and is published
    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }
    if (!job.published) {
      return NextResponse.json({ error: 'This job is not currently accepting applications' }, { status: 400 });
    }

    const body = await request.json();
    const validatedData = applicationSchema.parse(body);

    // Check for duplicate application
    const existingApplication = await prisma.jobApplication.findFirst({
      where: {
        jobId: id,
        email: validatedData.email,
      },
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: 'You have already applied for this position' },
        { status: 409 }
      );
    }

    const application = await prisma.jobApplication.create({
      data: {
        ...validatedData,
        jobId: id,
        linkedIn: validatedData.linkedIn || null,
        portfolio: validatedData.portfolio || null,
        status: 'PENDING',
      },
    });

    return NextResponse.json(
      { message: 'Application submitted successfully', application },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Error submitting application:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}
