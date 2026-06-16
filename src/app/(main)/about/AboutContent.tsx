'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  Target,
  Eye,
  Heart,
  Lightbulb,
  Users,
  Shield,
  Zap,
  Award,
  Globe,
  Building,
  Rocket,
} from 'lucide-react';

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description:
      'We embrace emerging technologies and creative thinking to deliver solutions that keep our clients ahead of the curve.',
  },
  {
    icon: Heart,
    title: 'Client Commitment',
    description:
      'Your success is our success. We build lasting partnerships grounded in transparency, trust, and measurable outcomes.',
  },
  {
    icon: Users,
    title: 'People-Centric',
    description:
      'We invest in our people and the talent we place, fostering environments where professionals thrive and grow.',
  },
  {
    icon: Shield,
    title: 'Integrity',
    description:
      'We operate with the highest ethical standards, ensuring honest communication and accountability in every engagement.',
  },
  {
    icon: Zap,
    title: 'Agility',
    description:
      'We adapt quickly to changing requirements and market conditions, delivering flexible solutions at the speed of business.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description:
      'We set the highest bar for quality in everything we do — from the talent we source to the code we ship.',
  },
];

const team = [
  {
    name: 'Jonathan Rivera',
    role: 'Chief Executive Officer',
    bio: 'Former VP at Accenture with 20+ years in technology consulting. Jonathan founded PrimeSource to bridge the gap between world-class talent and transformative technology.',
  },
  {
    name: 'Dr. Ananya Gupta',
    role: 'Chief Technology Officer',
    bio: 'PhD in Computer Science from MIT. Previously led engineering teams at Google Cloud. Oversees all technology strategy, architecture, and innovation initiatives.',
  },
  {
    name: 'Marcus Thompson',
    role: 'VP of Staffing Solutions',
    bio: '15 years in executive recruitment across Fortune 500 companies. Marcus has placed over 2,000 technology professionals in leadership and specialist roles.',
  },
  {
    name: 'Elena Vasquez',
    role: 'VP of Engineering',
    bio: 'Former engineering lead at Stripe. Elena directs our software development practice, specializing in scalable microservices and cloud-native architectures.',
  },
  {
    name: 'David Kim',
    role: 'Director of AI & Automation',
    bio: 'Machine learning researcher with publications in NeurIPS and ICML. David leads our AI practice, building intelligent automation solutions for enterprise clients.',
  },
  {
    name: 'Rachel Okonkwo',
    role: 'Chief People Officer',
    bio: '12 years in HR leadership at Deloitte and Microsoft. Rachel builds the culture and talent programs that make PrimeSource a top workplace in the industry.',
  },
];

const milestones = [
  { year: '2010', title: 'Founded', description: 'PrimeSource launched in Austin, TX with a vision to transform staffing through technology.' },
  { year: '2013', title: 'Technology Division', description: 'Expanded into custom software development, building our first enterprise platform.' },
  { year: '2016', title: '100+ Clients', description: 'Surpassed 100 enterprise clients across healthcare, finance, and technology sectors.' },
  { year: '2019', title: 'AI Practice Launch', description: 'Established our AI & Automation practice to meet growing demand for intelligent solutions.' },
  { year: '2022', title: 'Global Expansion', description: 'Opened offices in London, Singapore, and Toronto to serve our international client base.' },
  { year: '2025', title: '500+ Annual Placements', description: 'Reached milestone of 500+ professional placements annually with 98% satisfaction rate.' },
];

export default function AboutContent() {
  return (
    <>
      {/* Page Hero */}
      <section className="pt-32 pb-20 bg-[#0a0a0f] relative overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-3 mb-6">
              About PrimeSource
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
              Transforming businesses through the power of exceptional talent and
              innovative technology since 2010.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>
                  PrimeSource was founded in 2010 by Jonathan Rivera, a seasoned
                  technology executive who recognized a fundamental gap in how
                  businesses access talent and build technology. Traditional staffing
                  agencies treated placement as a transaction. Technology firms
                  operated in silos. Neither approach served the holistic needs of
                  modern enterprises.
                </p>
                <p>
                  Our vision was different: create a single, trusted partner that
                  could deliver both world-class talent and cutting-edge technology
                  solutions. By deeply understanding our clients&apos; industries,
                  cultures, and strategic goals, we could provide integrated services
                  that drive real business outcomes — not just fill seats or ship code.
                </p>
                <p>
                  Today, PrimeSource serves over 200 enterprise clients across
                  healthcare, financial services, technology, retail, and
                  manufacturing. With offices in Austin, New York, London, Singapore,
                  and Toronto, we&apos;ve helped organizations of all sizes accelerate
                  their digital transformation journeys and build high-performing
                  technology teams.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 border border-slate-200 flex items-center justify-center">
                <div className="text-center px-8">
                  <Building className="w-16 h-16 text-blue-500/30 mx-auto mb-4" />
                  <p className="text-slate-700 text-lg font-medium">
                    Headquartered in Austin, TX
                  </p>
                  <p className="text-slate-500 text-sm mt-2">
                    5 Global Offices • 350+ Team Members
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="p-8 rounded-2xl bg-white/[0.02] border border-white/10/80 shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-slate-400 leading-relaxed">
                To empower organizations with the right talent and technology to
                achieve their most ambitious goals. We bridge the gap between human
                potential and digital innovation, creating partnerships that deliver
                measurable, lasting impact for businesses, communities, and careers.
              </p>
            </motion.div>

            <motion.div
              className="p-8 rounded-2xl bg-white/[0.02] border border-white/10/80 shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-slate-400 leading-relaxed">
                To be the world&apos;s most trusted partner for technology talent
                and digital transformation. We envision a future where every
                organization — regardless of size or industry — can access the
                people and platforms they need to thrive in the digital economy.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-5">
              What Drives Us
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="group p-6 rounded-2xl bg-slate-50/50 border border-slate-200 hover:border-slate-350 hover:bg-slate-50 hover:shadow-lg hover:shadow-slate-100 transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">
              Leadership
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-5">
              Meet Our Team
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Industry veterans and innovators united by a shared passion for
              delivering exceptional results.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100/60 transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl mb-4">
                  {member.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <h3 className="text-lg font-bold text-white">{member.name}</h3>
                <p className="text-blue-400 text-sm mb-3">{member.role}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-5">
              Milestones
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-blue-400/50 via-purple-400/50 to-transparent" />

            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className={`relative flex items-start gap-8 mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500 border-2 border-white z-10 mt-1.5" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <span className="text-blue-400 font-bold text-lg">{milestone.year}</span>
                  <h3 className="text-white font-bold text-lg mt-1">{milestone.title}</h3>
                  <p className="text-slate-400 text-sm mt-1">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#08080c] border-t border-white/5 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.04)_0%,transparent_60%)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Partner with PrimeSource?
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Discover how our integrated approach to talent and technology can
              accelerate your business goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Get in Touch
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-8 py-4 border border-slate-300 bg-white text-slate-700 font-semibold rounded-xl hover:bg-slate-100 transition-all duration-300"
              >
                View Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
