import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import BlogClient from './BlogClient';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await prisma.pageSeo.findUnique({
      where: { pagePath: '/blog' },
    });
    if (seo) {
      return {
        title: seo.seoTitle,
        description: seo.metaDescription,
        keywords: seo.keywords,
        openGraph: seo.ogImage ? { images: [seo.ogImage] } : undefined,
        alternates: seo.canonicalUrl ? { canonical: seo.canonicalUrl } : undefined,
        other: seo.schemaSettings ? {
          'application-ld+json': JSON.stringify(seo.schemaSettings)
        } : undefined
      };
    }
  } catch (e) {
    console.error('Failed to generate blog page SEO:', e);
  }
  return {
    title: 'PrimeSource Tech Blog - Insights on Staffing, Dev & Cloud Trends',
    description: 'Stay informed with the latest updates from our engineering leaders, recruitment experts, and technology strategists.',
  };
}

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    include: {
      author: {
        select: {
          name: true,
          avatar: true,
        },
      },
    },
  });

  // Extract unique categories dynamically from database blog posts
  const uniqueCategories = Array.from(new Set(posts.map((p) => p.category)));
  const categories = ['All', ...uniqueCategories];

  return <BlogClient posts={posts} categories={categories} />;
}
