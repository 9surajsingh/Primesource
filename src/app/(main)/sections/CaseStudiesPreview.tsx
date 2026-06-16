"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, TrendingUp, Cpu, Server, CheckCircle2, ArrowRight } from "lucide-react";
import { CardTilt } from "@/components/ui/card-tilt";
import { MockupGraphic } from "@/components/shared/mockup-graphic";

// Register GSAP ScrollTrigger plugin client-side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CaseStudy {
  title: string;
  category: string;
  gradient: string;
  challenge: string;
  solution: string;
  impact: string[];
  tech: string[];
  mockup: React.ReactNode;
}

interface CaseStudyType {
  id: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  excerpt: string;
  challenge: string;
  solution: string;
  results: string;
  coverImage?: string | null;
  images: string[];
  videos: string[];
  technologies: string[];
  metrics?: any;
}

interface CaseStudiesPreviewProps {
  studies?: CaseStudyType[];
}

const defaultStudies: CaseStudy[] = [
  {
    title: "Fintech Platform Modernization",
    category: "High-Frequency Financial Services",
    gradient: "from-blue-500 via-indigo-500 to-cyan-500",
    challenge: "Legacy trading architecture struggled with connection pooling and high latency (320ms average), bottlenecking concurrent transactional volume.",
    solution: "Rebuilt core transaction logic into a Go/Node.js microservices framework deployed on AWS EKS, utilizing Redis replication and PostgreSQL read-pools.",
    tech: ["Next.js", "Go", "AWS EKS", "Redis", "Terraform", "PostgreSQL"],
    impact: ["96% Latency Reduction (320ms to 12ms)", "12x Concurrent Transaction Capacity", "45% Cloud Operational Cost Savings"],
    mockup: (
      <svg viewBox="0 0 400 250" className="w-full h-full text-slate-400 fill-none">
        {/* Frame */}
        <rect x="10" y="10" width="380" height="230" rx="10" fill="#0d0e14" stroke="#1f2937" strokeWidth="1.5" />
        <line x1="10" y1="40" x2="390" y2="40" stroke="#1f2937" strokeWidth="1.5" />
        <circle cx="30" cy="25" r="4" fill="#ef4444" />
        <circle cx="42" cy="25" r="4" fill="#f59e0b" />
        <circle cx="54" cy="25" r="4" fill="#10b981" />
        <text x="350" y="28" fill="#4b5563" fontSize="8" fontWeight="bold">HTTPS // 10.0.4.12</text>

        {/* Grids */}
        <line x1="40" y1="90" x2="360" y2="90" stroke="#1e293b" strokeDasharray="3 3" />
        <line x1="40" y1="130" x2="360" y2="130" stroke="#1e293b" strokeDasharray="3 3" />
        <line x1="40" y1="170" x2="360" y2="170" stroke="#1e293b" strokeDasharray="3 3" />

        {/* Latency Drop Line */}
        <path d="M 40 80 L 120 75 L 200 160 L 280 178 L 360 180" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 40 80 L 120 75 L 200 160 L 280 178 L 360 180 L 360 190 L 40 190 Z" fill="url(#blue-gradient)" opacity="0.1" />

        {/* Glowing Points */}
        <circle cx="200" cy="160" r="5" fill="#3b82f6" stroke="rgba(59,130,246,0.3)" strokeWidth="4" />
        <circle cx="360" cy="180" r="5" fill="#22d3ee" stroke="rgba(34,211,238,0.3)" strokeWidth="4" />

        {/* Metrics */}
        <rect x="40" y="55" width="80" height="25" rx="4" fill="#1e293b" opacity="0.5" />
        <text x="48" y="65" fill="#6b7280" fontSize="7">LATENCY</text>
        <text x="48" y="76" fill="#f1f5f9" fontSize="9" fontWeight="bold">12 ms</text>

        <rect x="280" y="55" width="80" height="25" rx="4" fill="#1e293b" opacity="0.5" />
        <text x="288" y="65" fill="#6b7280" fontSize="7">LOAD</text>
        <text x="288" y="76" fill="#10b981" fontSize="9" fontWeight="bold">100% OK</text>

        <defs>
          <linearGradient id="blue-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    title: "AI-Powered Diagnostics Engine",
    category: "Modern Healthcare Platforms",
    gradient: "from-purple-500 via-pink-500 to-red-500",
    challenge: "Clinical radiologist backlogs occurred due to manual metadata annotation and latency-heavy medical image processing pipelines.",
    solution: "Implemented an asynchronous processing queue on GCP using PyTorch, converting raw DICOM layers into segmented classification nodes.",
    tech: ["React", "Python", "PyTorch", "GCP Cloud Run", "FastAPI", "Docker"],
    impact: ["3.5x Faster Patient Scan Processing", "97.4% Validation Precision Rate", "Automated Compliance Reporting Logs"],
    mockup: (
      <svg viewBox="0 0 400 250" className="w-full h-full text-slate-400 fill-none">
        <rect x="10" y="10" width="380" height="230" rx="10" fill="#0d0e14" stroke="#1f2937" strokeWidth="1.5" />
        <line x1="10" y1="40" x2="390" y2="40" stroke="#1f2937" strokeWidth="1.5" />
        <circle cx="30" cy="25" r="4" fill="#ef4444" />
        <circle cx="42" cy="25" r="4" fill="#f59e0b" />
        <circle cx="54" cy="25" r="4" fill="#10b981" />
        <text x="320" y="28" fill="#4b5563" fontSize="8" fontWeight="bold">MODEL // PYTORCH_V4</text>

        {/* Scanner Grid mockup */}
        <rect x="50" y="65" width="130" height="130" rx="8" fill="#161824" stroke="#8b5cf6" strokeWidth="1.5" />
        <line x1="50" y1="130" x2="180" y2="130" stroke="#8b5cf6" strokeOpacity="0.3" />
        <line x1="115" y1="65" x2="115" y2="195" stroke="#8b5cf6" strokeOpacity="0.3" />

        {/* Telemetry Brain Scan Wave lines */}
        <path d="M 65 130 C 80 80, 150 80, 165 130 C 150 180, 80 180, 65 130 Z" stroke="#ec4899" strokeWidth="2" strokeDasharray="3 1" />
        <path d="M 85 130 C 95 100, 135 100, 145 130 C 135 160, 95 160, 85 130 Z" fill="url(#pink-grad)" opacity="0.3" />
        <line x1="50" y1="105" x2="180" y2="105" stroke="#ef4444" strokeWidth="1.5" />

        {/* Metadata Display right */}
        <rect x="200" y="65" width="150" height="130" rx="8" fill="#161824" stroke="#1f2937" strokeWidth="1" />
        <text x="215" y="85" fill="#9ca3af" fontSize="8" fontWeight="bold">AI SEGMENTATION STATUS</text>
        <text x="215" y="105" fill="#f1f5f9" fontSize="11" fontWeight="bold">PRECISION: 97.4%</text>

        {/* Progress Bar */}
        <rect x="215" y="125" width="120" height="6" rx="3" fill="#1f2937" />
        <rect x="215" y="125" width="105" height="6" rx="3" fill="#ec4899" />

        <text x="215" y="155" fill="#6b7280" fontSize="8">VOLUME INTERPOLATION</text>
        <text x="215" y="170" fill="#10b981" fontSize="9" fontWeight="bold">READY FOR SIGN-OFF</text>

        <defs>
          <linearGradient id="pink-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    title: "Enterprise Logistics Cloud ERP",
    category: "Supply Chain & Workforce Solutions",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    challenge: "A global retail operator had inventory data fragmentation across 18 regional warehouses, causing stock-out drops and delays.",
    solution: "Engineered a unified event streaming platform using Kafka clusters and Azure AKS, routing real-time stock balances to logistics clients.",
    tech: ["AKS Azure", "Apache Kafka", "PostgreSQL", "React", "Node.js", "Docker"],
    impact: ["Zero Stock Registry Mismatches", "1.6s Universal Event Replication", "$2.4M Yearly Operational Savings"],
    mockup: (
      <svg viewBox="0 0 400 250" className="w-full h-full text-slate-400 fill-none">
        <rect x="10" y="10" width="380" height="230" rx="10" fill="#0d0e14" stroke="#1f2937" strokeWidth="1.5" />
        <line x1="10" y1="40" x2="390" y2="40" stroke="#1f2937" strokeWidth="1.5" />
        <circle cx="30" cy="25" r="4" fill="#ef4444" />
        <circle cx="42" cy="25" r="4" fill="#f59e0b" />
        <circle cx="54" cy="25" r="4" fill="#10b981" />
        <text x="320" y="28" fill="#4b5563" fontSize="8" fontWeight="bold">INFRA // AZURE_AKS</text>

        {/* Network Node Map */}
        <circle cx="200" cy="135" r="16" fill="#1f2937" stroke="#f59e0b" strokeWidth="2" />
        <text x="200" y="138" fill="#f1f5f9" fontSize="8" fontWeight="bold" textAnchor="middle">AKS</text>

        {/* Outer satellite nodes */}
        <circle cx="100" cy="95" r="10" fill="#111827" stroke="#e2e8f0" strokeWidth="1.5" strokeOpacity="0.4" />
        <circle cx="300" cy="95" r="10" fill="#111827" stroke="#e2e8f0" strokeWidth="1.5" strokeOpacity="0.4" />
        <circle cx="100" cy="175" r="10" fill="#111827" stroke="#e2e8f0" strokeWidth="1.5" strokeOpacity="0.4" />
        <circle cx="300" cy="175" r="10" fill="#111827" stroke="#e2e8f0" strokeWidth="1.5" strokeOpacity="0.4" />

        {/* Network connection paths */}
        <line x1="110" y1="95" x2="184" y2="125" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="290" y1="95" x2="216" y2="125" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="110" y1="175" x2="184" y2="145" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="290" y1="175" x2="216" y2="145" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />

        {/* Animated data particle indicators */}
        <circle cx="147" cy="110" r="3.5" fill="#f59e0b" />
        <circle cx="253" cy="110" r="3.5" fill="#fb923c" />

        {/* Labels */}
        <text x="100" y="78" fill="#6b7280" fontSize="6" textAnchor="middle">NY NODE</text>
        <text x="300" y="78" fill="#6b7280" fontSize="6" textAnchor="middle">LON NODE</text>
        <text x="100" y="196" fill="#6b7280" fontSize="6" textAnchor="middle">TOK NODE</text>
        <text x="300" y="196" fill="#6b7280" fontSize="6" textAnchor="middle">SGP NODE</text>

        <rect x="150" y="202" width="100" height="20" rx="4" fill="#1e293b" opacity="0.5" />
        <text x="200" y="214" fill="#f59e0b" fontSize="8" fontWeight="bold" textAnchor="middle">EVENT REPLICATION: 1.6s</text>
      </svg>
    )
  }
];

export default function CaseStudiesPreview({ studies: customStudies }: CaseStudiesPreviewProps) {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollSection = scrollSectionRef.current;
    if (!container || !scrollSection) return;

    const panels = gsap.utils.toArray(".case-panel") as HTMLElement[];
    if (panels.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.to(scrollSection, {
        x: () => -(scrollSection.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 0.8,
          start: "top top",
          end: () => `+=${scrollSection.scrollWidth - window.innerWidth + 500}`,
          invalidateOnRefresh: true,
        }
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, [customStudies]);

  const studies = customStudies && customStudies.length > 0
    ? customStudies.map((cs, idx) => {
        const impact: string[] = [];
        if (cs.metrics && typeof cs.metrics === "object") {
          Object.entries(cs.metrics).forEach(([key, val]) => {
            impact.push(`${key}: ${val}`);
          });
        }
        if (impact.length === 0 && cs.results) {
          impact.push(...cs.results.split(/[.\n]+/).map(s => s.trim()).filter(Boolean).slice(0, 3));
        }

        const gradients = [
          "from-blue-500 via-indigo-500 to-cyan-500",
          "from-purple-500 via-pink-500 to-red-500",
          "from-orange-500 via-amber-500 to-yellow-500",
        ];

        const truncate = (text: string, limit: number = 115) => {
          if (!text) return "";
          if (text.length <= limit) return text;
          return text.substring(0, limit).trim() + "...";
        };

        return {
          title: cs.title,
          category: cs.industry,
          gradient: gradients[idx % gradients.length],
          challenge: truncate(cs.challenge),
          solution: truncate(cs.solution),
          impact: impact,
          tech: cs.technologies,
          mockup: <MockupGraphic type="case-study" slug={cs.slug} />
        };
      })
    : defaultStudies;

  return (
    <div ref={outerRef}>
      <div ref={containerRef} className="relative bg-[#0a0a0f] overflow-hidden">
        {/* Horizontal Scroll viewport container */}
        <div className="flex flex-col min-h-screen justify-center py-20 relative">
          
          {/* Scrollable Container fanned out horizontally */}
          <div 
            ref={scrollSectionRef} 
            className="flex whitespace-nowrap pl-4 sm:pl-12 pr-48 items-center gap-12 select-none"
            style={{ willChange: "transform" }}
          >
            {/* Dedicated Intro Slide */}
            <div className="case-panel inline-block w-[85vw] md:w-[40vw] flex-shrink-0 whitespace-normal text-left align-middle pr-8 md:pr-12">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-300 uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Case Studies
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
                Production<br />Records
              </h2>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 max-w-sm">
                Explore how we have engineered high-scale platforms, AI diagnostics engines, and event-driven logistics systems for leading global enterprises.
              </p>
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-400 uppercase tracking-widest">
                <span>Swipe or scroll to explore</span>
                <motion.span
                  animate={{ x: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-blue-400 font-bold"
                >
                  →
                </motion.span>
              </div>
            </div>
            {studies.map((study, idx) => (
              <div 
                key={idx} 
                className="case-panel inline-block w-[85vw] md:w-[52vw] lg:w-[44vw] flex-shrink-0 whitespace-normal text-left align-middle"
              >
                <CardTilt className="h-full">
                  <div className="h-full p-6 md:p-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl relative overflow-hidden flex flex-col gap-6 shadow-xl hover:border-white/20 hover:shadow-2xl transition-all duration-500">
                    
                    {/* Neon top accent strip */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${study.gradient}`} />

                    {/* Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-white/5">
                      <div>
                        <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest block mb-1">
                          {study.category}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                          {study.title}
                        </h3>
                      </div>
                      <span className="text-sm font-bold text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Structured Core */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      
                      {/* Left text column */}
                      <div className="md:col-span-7 space-y-3.5">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                            The Challenge
                          </span>
                          <p className="text-slate-400 text-sm leading-relaxed">
                            {study.challenge}
                          </p>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                            The Solution
                          </span>
                          <p className="text-slate-400 text-sm leading-relaxed">
                            {study.solution}
                          </p>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                            Business Impact
                          </span>
                          <div className="space-y-1.5">
                            {study.impact.map((imp, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-300">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                                <span>{imp}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                            Technology Stack
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {study.tech.map((t, i) => (
                              <span key={i} className="px-2 py-0.5 text-[10px] font-semibold bg-slate-50 border border-slate-200 text-slate-400 rounded-md">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Mockup column */}
                      <div className="md:col-span-5 bg-slate-950 rounded-2xl border border-slate-800 p-3 shadow-inner">
                        {study.mockup}
                      </div>

                    </div>

                  </div>
                </CardTilt>
              </div>
            ))}
            
            {/* Landing slide to CTA */}
            <div className="case-panel inline-block w-[300px] flex-shrink-0 text-center align-middle">
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                className="p-8 rounded-2xl border border-dashed border-white/20 bg-white/[0.03] flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-blue-500/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-400">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h4 className="text-white font-bold text-lg">Partner with Us</h4>
                <p className="text-slate-400 text-xs leading-normal">
                  Ready to architect a high-scale platform or AI integration system? Let&apos;s talk.
                </p>
                <a href="/contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-700">
                  Initiate Architecture
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
