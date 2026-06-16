import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://primesource.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '', '/about', '/services', '/services/staffing', '/services/web-development',
    '/services/mobile-development', '/services/ai-automation', '/case-studies',
    '/blog', '/careers', '/contact', '/privacy-policy', '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const blogSlugs = [
    'future-of-it-staffing-2025', 'ai-transforming-recruitment', 'web-development-best-practices-2025',
    'mobile-app-trends', 'digital-transformation-guide', 'remote-work-best-practices',
  ];

  const blogPages = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const caseStudySlugs = [
    'enterprise-digital-transformation', 'ai-recruitment-platform', 'ecommerce-mobile-app', 'cloud-migration',
  ];

  const caseStudyPages = caseStudySlugs.map((slug) => ({
    url: `${baseUrl}/case-studies/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const jobSlugs = [
    'senior-full-stack-developer', 'react-developer', 'devops-engineer', 'data-scientist',
    'project-manager', 'ui-ux-designer', 'mobile-developer', 'ai-ml-engineer',
  ];

  const jobPages = jobSlugs.map((slug) => ({
    url: `${baseUrl}/careers/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages, ...caseStudyPages, ...jobPages];
}
