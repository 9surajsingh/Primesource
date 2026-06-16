'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { PageHero } from '@/components/shared/page-hero';
import { CaseStudyCard } from '@/components/shared/case-study-card';
import { CTASection } from '@/components/shared/cta-section';

interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  excerpt: string;
  coverImage: string | null;
  technologies: string[];
}

interface CaseStudiesClientProps {
  caseStudies: CaseStudy[];
  industries: string[];
}

export default function CaseStudiesClient({ caseStudies, industries }: CaseStudiesClientProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filtered = activeFilter === 'All' 
    ? caseStudies 
    : caseStudies.filter((cs) => cs.industry.toLowerCase() === activeFilter.toLowerCase());

  return (
    <>
      <PageHero
        title="Case Studies"
        description="Explore how we've helped businesses across industries achieve transformational results through technology and talent."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Case Studies' },
        ]}
      />

      <section className="bg-[#0a0a0f] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filter Tabs */}
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => setActiveFilter(industry)}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                  activeFilter.toLowerCase() === industry.toLowerCase()
                    ? 'bg-blue-500 text-white'
                    : 'border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {industry}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {filtered.map((study, index) => (
              <motion.div
                key={study.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CaseStudyCard 
                  title={study.title}
                  client={study.client}
                  industry={study.industry}
                  coverImage={study.coverImage || '/images/case-studies/placeholder.jpg'}
                  technologies={study.technologies}
                  slug={study.slug}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Have a Project in Mind?"
        description="Let's discuss how we can help you achieve similar results for your business."
        primaryAction={{ label: 'Contact Us', href: '/contact' }}
        secondaryAction={{ label: 'Our Services', href: '/services' }}
      />
    </>
  );
}
