'use client';

import { motion } from 'framer-motion';
import { Shield, Target, Award, Headphones } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Industry Expertise',
    description:
      'Over 15 years of experience across healthcare, finance, technology, and manufacturing. Our domain specialists understand the unique challenges and compliance requirements of every sector we serve.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Target,
    title: 'Tailored Solutions',
    description:
      'No cookie-cutter approaches. Every engagement begins with deep discovery to understand your specific needs, culture, and objectives. We design solutions that fit your organization perfectly.',
    gradient: 'from-purple-500 to-blue-500',
  },
  {
    icon: Award,
    title: 'Proven Track Record',
    description:
      'With a 98% client satisfaction rate and 500+ successful placements annually, our results speak for themselves. We consistently deliver measurable outcomes that exceed expectations.',
    gradient: 'from-cyan-500 to-teal-500',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description:
      'Our dedicated account managers and support teams are available around the clock. From initial onboarding to ongoing optimization, we ensure continuous success for every engagement.',
    gradient: 'from-orange-500 to-pink-500',
  },
];

import * as LucideIcons from 'lucide-react';

interface Point {
  title: string;
  description: string;
  icon: string;
}

interface WhyChooseUsProps {
  points?: Point[];
}

function getIcon(iconName: string) {
  const IconComponent = (LucideIcons as any)[iconName];
  return IconComponent || LucideIcons.HelpCircle;
}

const gradients = [
  'from-blue-500 to-cyan-500',
  'from-purple-500 to-blue-500',
  'from-cyan-500 to-teal-500',
  'from-orange-500 to-pink-500',
];

export default function WhyChooseUs({ points }: WhyChooseUsProps) {
  const displayFeatures = points && points.length > 0
    ? points.map((p, i) => ({
        icon: getIcon(p.icon),
        title: p.title,
        description: p.description,
        gradient: gradients[i % gradients.length],
      }))
    : features;

  return (
    <section className="py-24 md:py-32 bg-[#0a0a0f] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.04)_0%,transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">
            Why PrimeSource
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-3 mb-5">
            Why Choose Us
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We combine deep industry knowledge with technical excellence to
            deliver outcomes that matter. Here&apos;s what sets PrimeSource apart.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {displayFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="group p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-500 backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex gap-5">
                  <div
                    className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
