'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Globe, Code2, Database, Layout, Server, ShieldCheck, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PageHero } from '@/components/shared/page-hero';
import { CTASection } from '@/components/shared/cta-section';

const technologies = [
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'Vue.js', category: 'Frontend' },
  { name: 'Angular', category: 'Frontend' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'Go', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'Redis', category: 'Database' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Kubernetes', category: 'DevOps' },
  { name: 'GraphQL', category: 'API' },
  { name: 'Tailwind CSS', category: 'Frontend' },
];

const services = [
  { icon: Globe, title: 'Custom Web Applications', description: 'Tailored web applications built from the ground up to solve your specific business challenges with modern architectures and scalable infrastructure.' },
  { icon: Layout, title: 'E-Commerce Platforms', description: 'High-converting online stores with seamless checkout, inventory management, and integrations with payment gateways and shipping providers.' },
  { icon: Code2, title: 'Progressive Web Apps', description: 'Apps that work offline, load instantly, and feel native—combining the reach of the web with the experience of a mobile app.' },
  { icon: Server, title: 'API Development', description: 'Robust RESTful and GraphQL APIs that power your applications, enable third-party integrations, and scale with your business.' },
  { icon: Database, title: 'CMS & Portal Development', description: 'Content management systems and client portals that empower your team to manage content, users, and workflows effortlessly.' },
  { icon: ShieldCheck, title: 'Performance & Security', description: 'Optimization for speed, SEO, and security with best practices including OWASP standards, SSL, and regular audits.' },
];

const processSteps = [
  { phase: 'Discovery', description: 'We analyze your business requirements, user needs, and competitive landscape to define a comprehensive project roadmap.', duration: '1-2 weeks' },
  { phase: 'Design', description: 'Our designers create wireframes, prototypes, and pixel-perfect UI designs that prioritize user experience and brand consistency.', duration: '2-3 weeks' },
  { phase: 'Development', description: 'Agile sprints with continuous integration ensure rapid, iterative delivery with regular demos and feedback loops.', duration: '6-12 weeks' },
  { phase: 'Testing', description: 'Comprehensive QA including unit tests, integration tests, performance testing, security audits, and cross-browser validation.', duration: '2-3 weeks' },
  { phase: 'Launch', description: 'Smooth deployment with zero-downtime strategies, monitoring setup, and post-launch support to ensure everything runs perfectly.', duration: '1 week' },
];

export default function WebDevelopmentPage() {
  return (
    <>
      <PageHero
        title="Web Development"
        description="Build powerful, scalable web applications that deliver exceptional user experiences and drive business growth."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Web Development' },
        ]}
      />

      {/* Services Grid */}
      <section className="bg-[#0a0a0f] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            {/* Info + Image (Left) */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-blue-400">What We Build</span>
              <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">Web Development Services</h2>
              <p className="mb-8 text-slate-400 leading-relaxed">From single-page applications to enterprise platforms, we build web solutions that perform and scale.</p>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:shadow-md transition-shadow">
                <Image
                  src="/images/services/web_dev.png"
                  alt="Web Development Illustration"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
            </div>

            {/* Cards (Right) */}
            <div className="lg:col-span-8">
              <div className="grid gap-6 sm:grid-cols-2">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <motion.div
                      key={service.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      className="rounded-2xl border border-white/10 bg-white/[0.02]/[0.02] p-8 transition-all hover:border-blue-500/20 hover:shadow-2xl"
                    >
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-400">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-3 text-lg font-bold text-white">{service.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{service.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="bg-[#08080c] border-t border-b border-white/5 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-16 text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-blue-400">Tech Stack</span>
            <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">Technologies We Use</h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="rounded-full border border-slate-200 bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-750 transition-all hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400"
              >
                {tech.name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#0a0a0f] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-16 text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-blue-400">Our Process</span>
            <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">Development Process</h2>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-5">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.phase}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-lg font-bold text-white">
                  {index + 1}
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">{step.phase}</h3>
                <p className="mb-2 text-xs text-slate-400">{step.description}</p>
                <span className="text-xs font-semibold text-cyan-400">{step.duration}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Let's Build Something Amazing"
        description="Ready to turn your vision into a high-performance web application? Let's talk."
        primaryAction={{ label: 'Start a Project', href: '/contact' }}
        secondaryAction={{ label: 'View Our Work', href: '/case-studies' }}
      />
    </>
  );
}
