'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate(count, target, { duration: 2, ease: 'easeOut' });
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [count, target]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

const stats = [
  { value: 500, suffix: '+', label: 'Placements Annually' },
  { value: 200, suffix: '+', label: 'Enterprise Clients' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 15, suffix: '+', label: 'Years of Excellence' },
];

interface StatType {
  label: string;
  value: string;
  suffix: string;
}

interface AboutPreviewProps {
  stats?: StatType[];
}

export default function AboutPreview({ stats: customStats }: AboutPreviewProps) {
  const displayStats = customStats && customStats.length > 0
    ? customStats.map(s => ({
        value: parseInt(s.value.replace(/[^0-9]/g, ''), 10) || 0,
        suffix: s.suffix || '',
        label: s.label
      }))
    : [
        { value: 500, suffix: '+', label: 'Placements Annually' },
        { value: 200, suffix: '+', label: 'Enterprise Clients' },
        { value: 98, suffix: '%', label: 'Client Satisfaction' },
        { value: 15, suffix: '+', label: 'Years of Excellence' },
      ];

  return (
    <section className="py-24 md:py-32 bg-[#0a0a0f] relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/[0.03] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">
              About PrimeSource
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3 mb-6 leading-tight">
              Building the Future of{' '}
              <span className="text-blue-400">
                Business Excellence
              </span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              Founded with a mission to bridge the gap between exceptional talent
               and transformative technology, PrimeSource has grown into a trusted
              partner for enterprises across healthcare, finance, technology, and
              manufacturing sectors.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Our integrated approach combines deep industry expertise with
              cutting-edge technical capabilities, enabling organizations to
              accelerate innovation, optimize operations, and achieve sustainable
              competitive advantage in an increasingly digital world.
            </p>
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
            >
              Learn More About Us
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-5">
              {displayStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index + 0.3 }}
                  whileHover={{ scale: 1.03, borderColor: 'rgba(59,130,246,0.3)', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)' }}
                >
                  <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-slate-300 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Additional visual element */}
            <div className="mt-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-slate-800 border-2 border-[#0a0a0f] flex items-center justify-center text-xs font-bold text-blue-400"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-white font-semibold">Trusted by Industry Leaders</p>
                  <p className="text-slate-400 text-sm">Fortune 500 companies and innovative startups</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
