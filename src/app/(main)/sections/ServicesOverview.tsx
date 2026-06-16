"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Users, Code, Cloud, Brain, ArrowLeft, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { useMagnetic } from '@/lib/hooks/use-magnetic';
import { CardTilt } from '@/components/ui/card-tilt';

interface Capability {
  name: string;
  desc: string;
}

interface Category {
  id: string;
  title: string;
  description: string;
  icon: any;
  gradient: string;
  shadowColor: string;
  capabilities: Capability[];
}

const categories: Category[] = [
  {
    id: 'talent',
    title: 'Talent Solutions',
    description: 'Access top-tier technology professionals across all domains, from cloud architects to DevOps specialists.',
    icon: Users,
    gradient: 'from-blue-500 to-cyan-500',
    shadowColor: 'rgba(59,130,246,0.15)',
    capabilities: [
      { name: 'IT Staffing', desc: 'Direct sourcing of elite senior engineers, developers, and product leads.' },
      { name: 'Contract Staffing', desc: 'Agile scaling of technology talent for specific project durations.' },
      { name: 'Permanent Staffing', desc: 'Full-time direct hire matching aligned with culture and code standards.' },
      { name: 'Executive Search', desc: 'Recruitment of CIOs, CTOs, and high-level tech executives.' },
    ]
  },
  {
    id: 'engineering',
    title: 'Digital Engineering',
    description: 'Full-lifecycle software engineering, custom platforms, and advanced product architecture.',
    icon: Code,
    gradient: 'from-purple-500 to-pink-500',
    shadowColor: 'rgba(168,85,247,0.15)',
    capabilities: [
      { name: 'Web Development', desc: 'Next-gen enterprise web apps built with React, Next.js, and Node.js.' },
      { name: 'Mobile App Development', desc: 'Native and hybrid mobile applications for iOS and Android.' },
      { name: 'Custom Software Development', desc: 'Bespoke backend architectures, microservices, and databases.' },
      { name: 'Product Engineering', desc: 'Turning concepts into high-scale, launch-ready software products.' },
      { name: 'UI/UX Design', desc: 'User experience research, wireframing, and premium interaction layouts.' },
      { name: 'Application Modernization', desc: 'Refactoring monolithic legacy codebases into secure, cloud-native services.' },
    ]
  },
  {
    id: 'cloud',
    title: 'Cloud & Security',
    description: 'Secure cloud hosting infrastructure, automated CI/CD pipelines, and regulatory compliance.',
    icon: Cloud,
    gradient: 'from-cyan-500 to-teal-500',
    shadowColor: 'rgba(6,182,212,0.15)',
    capabilities: [
      { name: 'AWS Integration', desc: 'Serverless architecture deployment, Lambda, RDS, and CloudFormation.' },
      { name: 'Azure Architecture', desc: 'Enterprise security, AD management, AKS, and hybrid cloud hosting.' },
      { name: 'DevOps Engineering', desc: 'Automated CI/CD workflows, Docker configurations, and GitOps.' },
      { name: 'Kubernetes Orchestration', desc: 'Managing scaling container fleets via EKS, AKS, and GKE.' },
      { name: 'IAM Security systems', desc: 'Enterprise Identity and Access Management, SSO, Okta, and OAuth.' },
      { name: 'Compliance Auditing', desc: 'Meeting SOC2 Type II, ISO 27001, HIPAA, and GDPR standards.' },
      { name: 'Cloud Security Systems', desc: 'Intrusion detection, continuous network encryption, and firewall scaling.' },
    ]
  },
  {
    id: 'ai',
    title: 'AI & Automation',
    description: 'Autonomous AI agents, document processing, and robotic business flow automation.',
    icon: Brain,
    gradient: 'from-orange-500 to-red-500',
    shadowColor: 'rgba(249,115,22,0.15)',
    capabilities: [
      { name: 'AI Agents & LLMs', desc: 'Custom autonomous agents, RAG platforms, and custom model fine-tuning.' },
      { name: 'Workflow Automation', desc: 'End-to-end event routing connecting custom endpoints and SaaS tools.' },
      { name: 'RPA Engineering', desc: 'UiPath bot deployments to automate repetitive back-office inputs.' },
      { name: 'Cognitive Chatbots', desc: 'Intent-mapped natural language support bots with semantic memory.' },
      { name: 'Document Automation', desc: 'Intelligent data extraction from PDFs and tables into structured JSON.' },
      { name: 'Knowledge Systems', desc: 'Generative semantic search across multi-source corporate databases.' },
    ]
  }
];

interface Service {
  title: string;
  slug: string;
  icon: string;
  description: string;
  features: string[];
}

interface ServicesOverviewProps {
  services?: Service[];
}

export default function ServicesOverview({ services }: ServicesOverviewProps) {
  const [selectedCat, setSelectedCat] = useState<Category | null>(null);
  const deckRefs = useRef<{ [key: string]: HTMLDivElement[] }>({});
  const explosionGridRef = useRef<HTMLDivElement>(null);
  const backBtnRef = useMagnetic(0.25);

  const categoriesList = React.useMemo(() => {
    if (!services || services.length === 0) return categories;

    const talent = services.filter(s => s.slug.includes('staffing') || s.slug.includes('recruitment') || s.slug.includes('talent'));
    const engineering = services.filter(s => s.slug.includes('web') || s.slug.includes('mobile') || s.slug.includes('software') || s.slug.includes('design') || s.slug.includes('product'));
    const cloud = services.filter(s => s.slug.includes('cloud') || s.slug.includes('devops') || s.slug.includes('security') || s.slug.includes('kubernetes') || s.slug.includes('infrastructure'));
    const ai = services.filter(s => s.slug.includes('ai') || s.slug.includes('ml') || s.slug.includes('analytics') || s.slug.includes('data') || s.slug.includes('automation'));

    const list = [];
    if (talent.length > 0) {
      list.push({
        id: 'talent',
        title: 'Talent Solutions',
        description: 'Access top-tier technology professionals across all domains, from cloud architects to DevOps specialists.',
        icon: Users,
        gradient: 'from-blue-500 to-cyan-500',
        shadowColor: 'rgba(59,130,246,0.15)',
        capabilities: talent.map(s => ({ name: s.title, desc: s.description }))
      });
    }
    if (engineering.length > 0) {
      list.push({
        id: 'engineering',
        title: 'Digital Engineering',
        description: 'Full-lifecycle software engineering, custom platforms, and advanced product architecture.',
        icon: Code,
        gradient: 'from-purple-500 to-pink-500',
        shadowColor: 'rgba(168,85,247,0.15)',
        capabilities: engineering.map(s => ({ name: s.title, desc: s.description }))
      });
    }
    if (cloud.length > 0) {
      list.push({
        id: 'cloud',
        title: 'Cloud & Security',
        description: 'Secure cloud hosting infrastructure, automated CI/CD pipelines, and regulatory compliance.',
        icon: Cloud,
        gradient: 'from-cyan-500 to-teal-500',
        shadowColor: 'rgba(6,182,212,0.15)',
        capabilities: cloud.map(s => ({ name: s.title, desc: s.description }))
      });
    }
    if (ai.length > 0) {
      list.push({
        id: 'ai',
        title: 'AI & Automation',
        description: 'Autonomous AI agents, document processing, and robotic business flow automation.',
        icon: Brain,
        gradient: 'from-orange-500 to-red-500',
        shadowColor: 'rgba(249,115,22,0.15)',
        capabilities: ai.map(s => ({ name: s.title, desc: s.description }))
      });
    }
    return list;
  }, [services]);

  const initDeckRefs = (catId: string, index: number, el: HTMLDivElement | null) => {
    if (!deckRefs.current[catId]) {
      deckRefs.current[catId] = [];
    }
    if (el) {
      deckRefs.current[catId][index] = el;
    }
  };

  const handleDeckHoverEnter = (catId: string) => {
    const cards = deckRefs.current[catId];
    if (!cards || cards.length < 3) return;

    // Fan deck animation
    gsap.to(cards[0], { x: -25, y: -5, rotate: -8, duration: 0.35, ease: 'power2.out' });
    gsap.to(cards[1], { x: 0, y: -15, rotate: 0, duration: 0.35, ease: 'power2.out' });
    gsap.to(cards[2], { x: 25, y: -5, rotate: 8, duration: 0.35, ease: 'power2.out' });
  };

  const handleDeckHoverLeave = (catId: string) => {
    const cards = deckRefs.current[catId];
    if (!cards) return;

    // Reset stack
    cards.forEach((card) => {
      gsap.to(card, { x: 0, y: 0, rotate: 0, duration: 0.4, ease: 'power3.out' });
    });
  };

  // Card Explosion Animation
  useEffect(() => {
    if (selectedCat && explosionGridRef.current) {
      const items = explosionGridRef.current.children;
      if (items.length > 0) {
        gsap.fromTo(
          items,
          {
            opacity: 0,
            scale: 0.4,
            y: 40,
            filter: 'blur(4px)',
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.5,
            stagger: 0.05,
            ease: 'back.out(1.5)',
          }
        );
      }
    }
  }, [selectedCat]);


  return (
    <section className="py-24 md:py-32 bg-[#0a0a0f] border-y border-white/5 relative min-h-[700px] overflow-hidden" id="capabilities">
      {/* Background glow lines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.04)_0%,transparent_60%)]" />
      <div className="absolute -bottom-1/2 left-0 right-0 h-96 bg-blue-500/10 blur-[150px] pointer-events-none" />
 
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <AnimatePresence mode="wait">
          {!selectedCat ? (
            <motion.div
              key="main-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Section Header */}
              <div className="text-center mb-20">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-300 uppercase tracking-wider mb-4">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                  Capabilities & Platforms
                </span>
                <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
                  Interactive Showcase
                </h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                  Click on any core technological discipline to reveal the sub-capabilities and explore our production-grade engineering competence.
                </p>
              </div>
 
              {/* Fanning Category Decks */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-10">
                {categoriesList.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <CardTilt key={cat.id} className="h-full">
                      <div
                        onClick={() => setSelectedCat(cat)}
                        onMouseEnter={() => handleDeckHoverEnter(cat.id)}
                        onMouseLeave={() => handleDeckHoverLeave(cat.id)}
                        className="group relative h-[400px] cursor-pointer rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl hover:bg-white/[0.05] hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 p-8 flex flex-col justify-between overflow-hidden"
                      >
                        {/* Glow effect */}
                        <div
                          className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full blur-[100px] transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"
                          style={{ background: `radial-gradient(circle, ${cat.shadowColor} 0%, transparent 65%)` }}
                        />
 
                        {/* Deck Animations Layer */}
                        <div className="absolute top-10 right-10 w-24 h-20 relative flex items-center justify-center">
                          {/* Mini deck card stacked background */}
                          <div
                            ref={(el) => initDeckRefs(cat.id, 0, el)}
                            className={`absolute w-12 h-16 rounded-lg bg-gradient-to-br ${cat.gradient} opacity-20 border border-white/20`}
                          />
                          <div
                            ref={(el) => initDeckRefs(cat.id, 1, el)}
                            className={`absolute w-12 h-16 rounded-lg bg-gradient-to-br ${cat.gradient} opacity-40 border border-white/20`}
                          />
                          <div
                            ref={(el) => initDeckRefs(cat.id, 2, el)}
                            className={`absolute w-12 h-16 rounded-lg bg-gradient-to-br ${cat.gradient} flex items-center justify-center border border-white/30 shadow-lg shadow-blue-500/10`}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
 
                        <div>
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.gradient} opacity-20 flex items-center justify-center mb-6`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-blue-400 transition-colors">
                            {cat.title}
                          </h3>
                          <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            {cat.description}
                          </p>
                        </div>
 
                        <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 group-hover:text-blue-300">
                          Explore Capabilities
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </CardTilt>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="explosion-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              {/* Back button */}
              <button
                ref={backBtnRef}
                onClick={() => setSelectedCat(null)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-sm font-medium mb-12 shadow-lg shadow-black/5"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to disciplines
              </button>
 
              {/* Title Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 pb-8 border-b border-white/10">
                <div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r ${selectedCat.gradient} bg-opacity-20 text-xs font-semibold text-white uppercase tracking-wider mb-3`}>
                    Capability Area
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    {selectedCat.title}
                  </h2>
                </div>
                <p className="text-slate-400 text-lg max-w-xl">
                  {selectedCat.description}
                </p>
              </div>
 
              {/* Capability cards explosion grid */}
              <div
                ref={explosionGridRef}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {selectedCat.capabilities.map((cap, i) => (
                  <CardTilt key={i} className="h-full">
                    <div className="h-full p-6 rounded-2xl border border border-white/10 bg-white/[0.03] backdrop-blur-xl hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 relative group overflow-hidden shadow-xl shadow-black/10 flex flex-col justify-between">
                      {/* Top Corner Arrow */}
                      <div className="absolute top-5 right-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
 
                      <div>
                        {/* Glow dot */}
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${selectedCat.gradient} mb-4 shadow-[0_0_10px_rgba(59,130,246,0.5)]`} />
                        <h3 className="text-xl font-bold text-white mb-2.5 tracking-tight group-hover:text-blue-400 transition-colors">
                          {cap.name}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          {cap.desc}
                        </p>
                      </div>
 
                      <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-slate-400 group-hover:text-blue-400 transition-colors">
                        Explore competence
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      </div>
                    </div>
                  </CardTilt>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
