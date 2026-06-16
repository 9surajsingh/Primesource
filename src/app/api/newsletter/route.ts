import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = newsletterSchema.parse(body);

    const existing = await prisma.newsletter.findUnique({ where: { email } });
    if (existing) {
      if (existing.subscribed) {
        return NextResponse.json({ message: 'Already subscribed' }, { status: 200 });
      }
      await prisma.newsletter.update({ where: { email }, data: { subscribed: true } });
      return NextResponse.json({ message: 'Re-subscribed successfully' });
    }

    await prisma.newsletter.create({ data: { email } });
    return NextResponse.json({ message: 'Subscribed successfully' }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
