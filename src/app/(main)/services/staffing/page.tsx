'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Users, FileCheck, UserCheck, Search, ArrowRight, CheckCircle2, Building2, Briefcase, HeartPulse, GraduationCap, Factory, Landmark, ShoppingBag, Plane } from 'lucide-react';
import { PageHero } from '@/components/shared/page-hero';
import { StatsSection } from '@/components/shared/stats-section';
import { CTASection } from '@/components/shared/cta-section';

const staffingServices = [
  {
    icon: Users,
    title: 'IT Staffing',
    description: 'Access a vast network of pre-vetted technology professionals spanning software engineering, cloud architecture, data science, cybersecurity, and more. Our rigorous screening process ensures you get candidates who are not just technically proficient but also culturally aligned.',
    features: ['Full-stack developers', 'Cloud architects', 'Data engineers', 'DevOps specialists', 'QA engineers', 'Project managers'],
  },
  {
    icon: FileCheck,
    title: 'Contract Staffing',
    description: 'Scale your workforce dynamically with our contract staffing solutions. Whether you need specialized talent for a three-month sprint or ongoing project support, we provide flexible arrangements that keep your operations running smoothly.',
    features: ['Short & long-term contracts', 'Staff augmentation', 'Managed services', 'SOW-based engagement', 'Compliance handled', 'Rapid onboarding'],
  },
  {
    icon: UserCheck,
    title: 'Permanent Staffing',
    description: 'Build your dream team with our permanent placement services. We invest the time to understand your company culture, growth trajectory, and technical requirements to deliver candidates who stay and thrive.',
    features: ['Deep cultural assessment', '90-day guarantee', 'Salary benchmarking', 'Reference verification', 'Background checks', 'Onboarding support'],
  },
  {
    icon: Search,
    title: 'Executive Search',
    description: 'Our executive search practice identifies transformational leaders who drive innovation and growth. Using proprietary research methods and an extensive network, we connect you with C-suite and VP-level talent discreetly and efficiently.',
    features: ['Board-level placements', 'CTO/CIO searches', 'VP Engineering', 'Confidential searches', 'Succession planning', 'Market intelligence'],
  },
];

const processSteps = [
  { step: '01', title: 'Understand', description: 'We begin with a deep-dive into your organization, culture, technical requirements, and team dynamics to create a precise candidate profile.' },
  { step: '02', title: 'Source', description: 'Our recruiters leverage AI-powered tools, proprietary databases, and professional networks to identify and engage top talent.' },
  { step: '03', title: 'Screen', description: 'Candidates undergo rigorous technical assessments, behavioral interviews, and reference checks to ensure quality and fit.' },
  { step: '04', title: 'Place', description: 'We coordinate interviews, manage offers, and facilitate smooth transitions to ensure a seamless placement experience.' },
  { step: '05', title: 'Support', description: 'Post-placement support including check-ins, performance tracking, and ongoing relationship management for long-term success.' },
];

const industries = [
  { icon: Building2, name: 'Technology' },
  { icon: Landmark, name: 'Financial Services' },
  { icon: HeartPulse, name: 'Healthcare' },
  { icon: GraduationCap, name: 'Education' },
  { icon: Factory, name: 'Manufacturing' },
  { icon: ShoppingBag, name: 'Retail & E-Commerce' },
  { icon: Briefcase, name: 'Consulting' },
  { icon: Plane, name: 'Travel & Hospitality' },
];

const stats = [
  { value: 10000, suffix: '+', label: 'Placements Made' },
  { value: 500, suffix: '+', label: 'Client Companies' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 72, suffix: 'hrs', label: 'Avg. Time to Fill' },
];

export default function StaffingPage() {
  return (
    <>
      <PageHero
        title="Staffing Solutions"
        description="Find exceptional talent that drives results. From contract specialists to C-suite executives, we deliver the right people at the right time."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Staffing' },
        ]}
      />

      {/* Services Detail */}
      <section className="bg-[#0a0a0f] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {staffingServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`flex flex-col gap-12 lg:flex-row lg:items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                >
                  <div className="flex-1">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-400">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mb-4 text-2xl font-bold text-white lg:text-3xl">{service.title}</h3>
                    <p className="mb-6 text-lg text-slate-400 leading-relaxed">{service.description}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm text-slate-400">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1">
                    {index === 0 ? (
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-200 shadow-md bg-slate-100">
                        <Image
                          src="/images/services/staffing.png"
                          alt="IT Staffing Solutions"
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 lg:p-12 shadow-sm">
                        <div className="grid grid-cols-2 gap-6">
                          {service.features.slice(0, 4).map((feature, i) => (
                            <div key={i} className="rounded-xl bg-white/[0.02] p-4 text-center border border-white/5">
                              <p className="text-sm font-semibold text-slate-200">{feature}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#08080c] border-t border-b border-white/5 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-16 text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-blue-400">Our Process</span>
            <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">How We Work</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-400">A proven five-step methodology that consistently delivers exceptional hiring outcomes.</p>
          </motion.div>
          <div className="relative">
            <div className="absolute left-8 top-0 hidden h-full w-px bg-slate-800 lg:block" />
            <div className="space-y-12">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-8"
                >
                  <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-800 border border-slate-700 text-xl font-bold text-blue-400 shadow-sm">
                    {step.step}
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-sm">
                    <h3 className="mb-2 text-xl font-bold text-white">{step.title}</h3>
                    <p className="text-slate-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-[#0a0a0f] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-16 text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-blue-400">Industries</span>
            <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">Industries We Serve</h2>
          </motion.div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <motion.div
                  key={industry.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center transition-all hover:border-blue-500/30 hover:bg-white/[0.05] hover:shadow-md"
                >
                  <Icon className="h-8 w-8 text-blue-400" />
                  <p className="font-semibold text-white">{industry.name}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <StatsSection stats={stats} />

      <CTASection
        title="Need the Right Talent?"
        description="Let our staffing experts help you build a world-class team. Get started with a free consultation today."
        primaryAction={{ label: 'Get Started', href: '/contact' }}
        secondaryAction={{ label: 'View Open Roles', href: '/careers' }}
      />
    </>
  );
}
