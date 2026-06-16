'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Quote } from 'lucide-react';
import { CTASection } from '@/components/shared/cta-section';
import { AnimatedCounter } from '@/components/shared/animated-counter';

interface CaseStudyDetailClientProps {
  study: {
    title: string;
    client: string;
    industry: string;
    challenge: string;
    solution: string;
    results: string;
    coverImage: string | null;
    technologies: string[];
    metrics: any; // Json representing key-value metric string mappings
    testimonial: string | null;
    testimonialAuthor: string | null;
    testimonialRole: string | null;
  };
}

// Robust helper to extract numbers and prefixes/suffixes from metric values
function parseMetric(key: string, val: string) {
  const match = val.match(/([0-9]+)(\.[0-9]+)?/);
  if (match) {
    const value = parseInt(match[1], 10);
    const decimalPart = match[2] || '';
    const numIndex = val.indexOf(match[0]);
    const prefix = val.substring(0, numIndex);
    const suffix = decimalPart + val.substring(numIndex + match[0].length);
    return { value, prefix, suffix, label: key };
  }
  return { value: 0, prefix: '', suffix: val, label: key };
}

export default function CaseStudyDetailClient({ study }: CaseStudyDetailClientProps) {
  // Parse metrics Json from database
  const rawMetrics = study.metrics && typeof study.metrics === 'object' ? study.metrics : {};
  const parsedMetrics = Object.entries(rawMetrics).map(([key, val]) => 
    parseMetric(key, String(val))
  );

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0a0a0f] border-b border-white/5 pb-16 pt-32 lg:pt-40">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/case-studies" className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to Case Studies
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-4 flex gap-3">
              <span className="rounded-full bg-blue-500/10 px-4 py-1 text-sm font-medium text-blue-300">{study.industry}</span>
              <span className="rounded-full bg-white/5 px-4 py-1 text-sm font-medium text-slate-300">{study.client}</span>
            </div>
            <h1 className="mb-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{study.title}</h1>
          </motion.div>
        </div>
      </section>

      {/* Metrics */}
      {parsedMetrics.length > 0 && (
        <section className="bg-[#08080c] border-b border-white/5 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {parsedMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center"
                >
                  <div className="mb-1 text-3xl font-bold text-white">
                    {metric.prefix}
                    {metric.value > 0 ? (
                      <AnimatedCounter target={metric.value} />
                    ) : (
                      '0'
                    )}
                    {metric.suffix}
                  </div>
                  <p className="text-sm text-slate-400">{metric.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="bg-[#0a0a0f] py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="mb-6 text-2xl font-bold text-white">The Challenge</h2>
              <div 
                className="text-lg leading-relaxed text-slate-400 prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: study.challenge }}
              />
            </motion.div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="mb-6 text-2xl font-bold text-white">Our Solution</h2>
              <div 
                className="text-lg leading-relaxed text-slate-400 prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: study.solution }}
              />
            </motion.div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="mb-6 text-2xl font-bold text-white">The Results</h2>
              <div 
                className="text-lg leading-relaxed text-slate-400 prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: study.results }}
              />
            </motion.div>

            {/* Technologies */}
            {study.technologies.length > 0 && (
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <h2 className="mb-6 text-2xl font-bold text-white">Technologies Used</h2>
                <div className="flex flex-wrap gap-3">
                  {study.technologies.map((tech) => (
                    <span key={tech} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-300">{tech}</span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Testimonial */}
            {study.testimonial && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8 lg:p-12"
              >
                <Quote className="mb-6 h-10 w-10 text-blue-500/30" />
                <p className="mb-6 text-xl italic leading-relaxed text-slate-300 font-medium">&ldquo;{study.testimonial}&rdquo;</p>
                <div>
                  <p className="font-semibold text-white">{study.testimonialAuthor}</p>
                  <p className="text-sm text-slate-400">{study.testimonialRole}</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready for Similar Results?"
        description="Let's discuss how we can help transform your business."
        primaryAction={{ label: 'Start a Conversation', href: '/contact' }}
        secondaryAction={{ label: 'More Case Studies', href: '/case-studies' }}
      />
    </>
  );
}
