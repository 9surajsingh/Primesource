import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import HeroSection from './sections/HeroSection';
import ServicesOverview from './sections/ServicesOverview';
import TechEcosystem from './sections/TechEcosystem';
import AboutPreview from './sections/AboutPreview';
import CaseStudiesPreview from './sections/CaseStudiesPreview';
import WhyChooseUs from './sections/WhyChooseUs';
import Testimonials from './sections/Testimonials';
import BlogPreview from './sections/BlogPreview';
import CTASection from './sections/CTASection';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await prisma.pageSeo.findUnique({
      where: { pagePath: '/' },
    });
    if (seo) {
      return {
        title: seo.seoTitle,
        description: seo.metaDescription,
        keywords: seo.keywords,
        openGraph: seo.ogImage ? { images: [seo.ogImage] } : undefined,
        alternates: seo.canonicalUrl ? { canonical: seo.canonicalUrl } : undefined,
        // Using JSON-LD structured schema as metadata other format if supplied
        other: seo.schemaSettings ? {
          'application-ld+json': JSON.stringify(seo.schemaSettings)
        } : undefined
      };
    }
  } catch (e) {
    console.error('Failed to generate SEO metadata:', e);
  }
  return {
    title: 'PrimeSource - Transforming Business Through Technology & Talent',
    description:
      'PrimeSource delivers world-class IT staffing, custom software development, and AI automation solutions. Partner with us to accelerate your digital transformation.',
  };
}

export default async function HomePage() {
  const [homeContent, testimonials, services, caseStudies, blogPosts] = await Promise.all([
    prisma.homepageContent.findFirst(),
    prisma.testimonial.findMany({
      where: { showOnHomepage: true },
      orderBy: { order: 'asc' },
    }),
    prisma.service.findMany({
      where: { published: true, featured: true },
      orderBy: { order: 'asc' },
    }),
    prisma.caseStudy.findMany({
      where: { published: true, featured: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 3,
      include: {
        author: {
          select: { name: true },
        },
      },
    }),
  ]);

  const defaultSectionOrder = [
    'hero',
    'services',
    'tech',
    'about',
    'case_studies',
    'why_choose_us',
    'testimonials',
    'blog',
    'cta',
  ];

  const sectionOrder = homeContent?.sectionOrder || defaultSectionOrder;

  return (
    <>
      {sectionOrder.map((sectionName) => {
        switch (sectionName) {
          case 'hero':
            return (
              <HeroSection
                key="hero"
                heading={homeContent?.heroHeading}
                subheading={homeContent?.heroSubheading}
                ctaText1={homeContent?.heroCtaText1}
                ctaLink1={homeContent?.heroCtaLink1}
                ctaText2={homeContent?.heroCtaText2}
                ctaLink2={homeContent?.heroCtaLink2}
                mediaUrl={homeContent?.heroMediaUrl}
              />
            );
          case 'services':
            return <ServicesOverview key="services" services={services} />;
          case 'tech':
            return <TechEcosystem key="tech" />;
          case 'about':
            return <AboutPreview key="about" stats={homeContent?.stats as any} />;
          case 'case_studies':
            return <CaseStudiesPreview key="case_studies" studies={caseStudies} />;
          case 'why_choose_us':
            return <WhyChooseUs key="why_choose_us" points={homeContent?.whyChooseUs as any} />;
          case 'testimonials':
            return <Testimonials key="testimonials" testimonials={testimonials} />;
          case 'blog':
            return <BlogPreview key="blog" posts={blogPosts} />;
          case 'cta':
            return (
              <CTASection
                key="cta"
                heading={homeContent?.ctaHeading}
                subheading={homeContent?.ctaSubheading}
                buttonText={homeContent?.ctaButtonText}
                buttonLink={homeContent?.ctaButtonLink}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
