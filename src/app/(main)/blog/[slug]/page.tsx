import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import BlogDetailClient from './BlogDetailClient';
import { notFound } from 'next/navigation';

export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      select: {
        title: true,
        excerpt: true,
        seoTitle: true,
        seoDescription: true,
        seoKeywords: true,
      },
    });

    if (post) {
      return {
        title: post.seoTitle || `${post.title} | PrimeSource Blog`,
        description: post.seoDescription || post.excerpt,
        keywords: post.seoKeywords,
      };
    }
  } catch (e) {
    console.error('Failed to generate blog detail page metadata:', e);
  }
  return {
    title: 'Blog Post | PrimeSource',
    description: 'Read the latest insights and tech analysis from our team.',
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: {
      author: {
        select: {
          name: true,
          avatar: true,
        },
      },
    },
  });

  if (!post) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ? [post.coverImage] : undefined,
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogDetailClient post={post} />
    </>
  );
}
