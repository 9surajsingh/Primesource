'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import { useMagnetic } from '@/lib/hooks/use-magnetic';

const HeroThreeCanvas = dynamic(() => import('./HeroThreeCanvas'), { ssr: false });

interface HeroSectionProps {
  heading?: string;
  subheading?: string;
  ctaText1?: string;
  ctaLink1?: string;
  ctaText2?: string;
  ctaLink2?: string;
  mediaUrl?: string | null;
}

export default function HeroSection({
  heading = 'Engineering the Future of Digital Architecture & AI Automation',
  subheading = 'We construct resilient digital ecosystems, cloud infrastructure, and enterprise AI workflows. From strategic talent acquisition to bespoke application development, we enable technology transformation.',
  ctaText1 = 'Capabilities & Showcase',
  ctaLink1 = '/services',
  ctaText2 = 'Launch Project',
  ctaLink2 = '/contact',
  mediaUrl,
}: HeroSectionProps) {
  const exploreRef = useMagnetic(0.22);
  const contactRef = useMagnetic(0.22);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f] pt-20">
      <HeroThreeCanvas />
 
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
 
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#0a0a0f_90%)] pointer-events-none" />
 
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[130px] animate-bounce pointer-events-none" style={{ animationDuration: '12s' }} />
 
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm text-blue-300 font-medium shadow-sm">
            <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
            World-Class Digital Engineering & AI Platforms
          </span>
        </motion.div>
 
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-8 text-white"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span dangerouslySetInnerHTML={{ __html: heading }} />
        </motion.h1>
 
        <motion.p
          className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subheading}
        </motion.p>
 
        <motion.div
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            ref={exploreRef}
            href={ctaLink1}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/20 active:scale-[0.98] transition-all duration-300 text-lg border border-blue-400/10"
          >
            {ctaText1}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            ref={contactRef}
            href={ctaLink2}
            className="inline-flex items-center gap-2 px-8 py-4 border border-slate-300 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-100 active:scale-[0.98] transition-all duration-300 text-lg shadow-sm"
          >
            {ctaText2}
          </Link>
        </motion.div>
 
        <motion.div
          className="mt-20 flex flex-wrap justify-center gap-x-12 gap-y-4 text-slate-400 text-sm font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            Cloud-Native Orchestration
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            AI-Driven Automation Workflows
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
            High-Performance Tech Teams
          </span>
        </motion.div>
      </div>
 
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-slate-500"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-500">Discover</span>
          <ChevronDown className="w-4 h-4 text-slate-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
