"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Users, Brain, Code, Smartphone, Cloud, Workflow, 
  Database, Shield, Activity, GitMerge, FileCode, CheckCircle 
} from "lucide-react";

interface MockupGraphicProps {
  type: "blog" | "case-study";
  slug: string;
}

export function MockupGraphic({ type, slug }: MockupGraphicProps) {
  // Common Dark Grid Background
  const gridBackground = (
    <div className="absolute inset-0 bg-[#0d0e15] overflow-hidden">
      {/* Visual background grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px"
        }}
      />
      {/* Decorative colored glow spheres */}
      <div className="absolute -top-20 -left-20 w-48 h-48 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl" />
    </div>
  );

  // ─── BLOG POST MOCKUPS ─────────────────────────────────────────────────────

  if (type === "blog") {
    switch (slug) {
      case "future-of-it-staffing-2025":
      case "future-of-it-staffing-trends-2025": // IT Staffing Trends
        return (
          <div className="relative w-full h-full min-h-[180px] flex items-center justify-center p-4">
            {gridBackground}
            {/* Sourcing Dashboard mockup */}
            <div className="relative w-full max-w-[280px] bg-black/40 rounded-lg border border-white/5 p-3 shadow-2xl flex flex-col gap-2.5">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-[9px] font-bold text-blue-400 tracking-wider flex items-center gap-1">
                  <Users className="w-3 h-3 text-blue-400" />
                  TALENT PIPELINE
                </span>
                <span className="text-[8px] text-slate-500 font-mono">ROLE: SENIOR GO DEV</span>
              </div>
              {/* Columns */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white/[0.02] border border-white/[0.04] p-1.5 rounded flex flex-col gap-1.5">
                  <span className="text-[7px] text-slate-500 font-bold uppercase tracking-wider block">Sourced</span>
                  <div className="bg-white/5 p-1 rounded text-[7px] text-slate-300 font-medium border border-white/5">Sarah M. (98%)</div>
                  <div className="bg-white/5 p-1 rounded text-[7px] text-slate-300 font-medium border border-white/5">David C. (92%)</div>
                </div>
                <div className="bg-white/[0.02] border border-white/[0.04] p-1.5 rounded flex flex-col gap-1.5">
                  <span className="text-[7px] text-slate-500 font-bold uppercase tracking-wider block">Screened</span>
                  <div className="bg-blue-500/10 border border-blue-500/20 p-1 rounded text-[7px] text-blue-300 font-medium">Alex K. (96%)</div>
                </div>
                <div className="bg-white/[0.02] border border-white/[0.04] p-1.5 rounded flex flex-col gap-1.5">
                  <span className="text-[7px] text-slate-500 font-bold uppercase tracking-wider block">Offered</span>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 p-1 rounded text-[7px] text-emerald-300 font-medium">Emily R. (99%)</div>
                </div>
              </div>
            </div>
          </div>
        );

      case "ai-transforming-recruitment":
      case "ai-revolutionizing-recruitment-process": // AI Recruitment
        return (
          <div className="relative w-full h-full min-h-[180px] flex items-center justify-center p-4">
            {gridBackground}
            {/* AI Screening telemetry */}
            <div className="relative w-full max-w-[280px] bg-black/40 rounded-lg border border-white/5 p-3 shadow-2xl flex flex-col gap-2">
              <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                <span className="text-[9px] font-bold text-purple-400 tracking-wider flex items-center gap-1">
                  <Brain className="w-3 h-3 text-purple-400" />
                  COGNITIVE MATCHING
                </span>
                <span className="text-[8px] text-slate-500 font-mono">STATUS: SCANNING</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-full border border-purple-500/20 flex items-center justify-center">
                  <div className="absolute inset-1 rounded-full border border-dashed border-purple-500/40 animate-spin" style={{ animationDuration: "10s" }} />
                  <span className="text-purple-300 font-mono font-bold text-xs">97.4%</span>
                </div>
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center justify-between text-[7px] text-slate-400">
                    <span>NLP Keyword Score</span>
                    <span className="text-purple-400">98%</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 w-[98%]" />
                  </div>
                  <div className="flex items-center justify-between text-[7px] text-slate-400">
                    <span>Ecosystem Experience</span>
                    <span className="text-purple-400">96%</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 w-[96%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "web-development-best-practices-2025":
      case "web-development-best-practices-enterprise": // Web Development
        return (
          <div className="relative w-full h-full min-h-[180px] flex items-center justify-center p-4">
            {gridBackground}
            {/* Code editor mockup */}
            <div className="relative w-full max-w-[280px] bg-[#090b11] rounded-lg border border-white/5 overflow-hidden shadow-2xl flex flex-col">
              <div className="bg-[#10121a] px-3 py-1.5 border-b border-white/5 flex items-center justify-between">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[7.5px] font-mono text-slate-400 tracking-wide">layout.tsx</span>
                <FileCode className="w-3 h-3 text-slate-500" />
              </div>
              <div className="p-3 font-mono text-[7px] leading-relaxed text-slate-400 space-y-1">
                <div><span className="text-pink-500">import</span> React <span className="text-pink-500">from</span> <span className="text-emerald-400">&apos;react&apos;</span>;</div>
                <div><span className="text-pink-500">export default function</span> <span className="text-blue-400">App</span>() &#123;</div>
                <div className="pl-3"><span className="text-pink-500">const</span> [state, setState] = <span className="text-blue-400">useState</span>(null);</div>
                <div className="pl-3"><span className="text-pink-500">return</span> (</div>
                <div className="pl-6 text-slate-500">&lt;<span className="text-blue-400">div</span> className=<span className="text-emerald-400">&quot;grid grid-cols-12 gap-6&quot;</span>&gt;</div>
                <div className="pl-9 text-slate-500">&lt;<span className="text-blue-400">DashboardCard</span> title=<span className="text-emerald-400">&quot;Scale&quot;</span> /&gt;</div>
                <div className="pl-6 text-slate-500">&lt;/<span className="text-blue-400">div</span>&gt;</div>
                <div className="pl-3">);</div>
                <div>&#125;</div>
              </div>
            </div>
          </div>
        );

      case "mobile-app-trends":
      case "mobile-app-development-trends-2025": // Mobile App Trends
        return (
          <div className="relative w-full h-full min-h-[180px] flex items-center justify-center p-4">
            {gridBackground}
            {/* Phone Mockup frame */}
            <div className="relative w-[85px] h-[155px] bg-[#0c0d12] rounded-[14px] border-[2px] border-white/10 shadow-2xl p-1.5 flex flex-col gap-1.5">
              {/* Speaker & camera dots */}
              <div className="flex justify-center gap-1">
                <span className="w-4 h-1 rounded-full bg-white/10" />
                <span className="w-1 h-1 rounded-full bg-white/10" />
              </div>
              {/* Screen Content */}
              <div className="flex-1 bg-white/[0.01] rounded-lg border border-white/[0.04] p-1.5 flex flex-col gap-1.5 overflow-hidden">
                <div className="h-5 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-between px-1">
                  <span className="text-[5px] text-blue-300 font-bold uppercase tracking-wider">Metrics</span>
                  <Smartphone className="w-1.5 h-1.5 text-blue-400" />
                </div>
                {/* Visual Chart */}
                <div className="flex-1 bg-black/30 rounded p-1 flex flex-col justify-end gap-1">
                  <div className="flex items-end gap-[2px] h-12 justify-center">
                    <div className="w-[3px] bg-blue-500/20 rounded-full h-4" />
                    <div className="w-[3px] bg-blue-500/40 rounded-full h-8" />
                    <div className="w-[3px] bg-blue-500/60 rounded-full h-6" />
                    <div className="w-[3px] bg-blue-500 rounded-full h-10" />
                    <div className="w-[3px] bg-cyan-400 rounded-full h-12" />
                  </div>
                  <div className="h-[2px] bg-white/5 rounded-full" />
                </div>
                <div className="h-3 rounded bg-white/[0.03] border border-white/5 flex items-center justify-center">
                  <span className="text-[4px] text-slate-500 font-bold">100% ONLINE</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "digital-transformation-guide":
      case "digital-transformation-strategic-roadmap-2025": // Digital Transformation Guide
        return (
          <div className="relative w-full h-full min-h-[180px] flex items-center justify-center p-4">
            {gridBackground}
            {/* Cloud Topology diagram */}
            <div className="relative w-full max-w-[280px] bg-black/40 rounded-lg border border-white/5 p-3 shadow-2xl flex flex-col gap-2">
              <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                <span className="text-[9px] font-bold text-cyan-400 tracking-wider flex items-center gap-1">
                  <Cloud className="w-3 h-3 text-cyan-400" />
                  CLOUD TOPOLOGY
                </span>
                <span className="text-[8px] text-slate-500 font-mono">REG: AWS-US-EAST-1</span>
              </div>
              <div className="flex items-center justify-between px-2 py-1">
                {/* Gateway */}
                <div className="bg-white/5 border border-white/15 p-1 rounded flex flex-col items-center gap-0.5 w-[55px]">
                  <span className="text-[5px] text-slate-500 font-bold uppercase">Gateway</span>
                  <div className="w-3.5 h-3.5 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                    <Activity className="w-2 h-2 text-blue-400" />
                  </div>
                </div>
                {/* Connectors */}
                <div className="flex-1 flex flex-col items-center gap-2 px-1">
                  <div className="w-full h-[1px] bg-gradient-to-r from-blue-500/30 to-purple-500/30 relative">
                    <span className="absolute -top-[1.5px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400" />
                  </div>
                </div>
                {/* Pod */}
                <div className="bg-white/5 border border-white/15 p-1 rounded flex flex-col items-center gap-0.5 w-[55px]">
                  <span className="text-[5px] text-slate-500 font-bold uppercase">EKS Pod</span>
                  <div className="w-3.5 h-3.5 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                    <Database className="w-2 h-2 text-purple-400" />
                  </div>
                </div>
                {/* Connectors */}
                <div className="flex-1 flex flex-col items-center gap-2 px-1">
                  <div className="w-full h-[1px] bg-gradient-to-r from-purple-500/30 to-emerald-500/30 relative">
                    <span className="absolute -top-[1.5px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-400" />
                  </div>
                </div>
                {/* Secure DB */}
                <div className="bg-[#121c17] border border-emerald-500/20 p-1 rounded flex flex-col items-center gap-0.5 w-[55px]">
                  <span className="text-[5px] text-emerald-500 font-bold uppercase">RDS DB</span>
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                    <Shield className="w-2 h-2 text-emerald-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "remote-work-best-practices":
      case "building-high-performance-remote-engineering-teams": // Remote Work Practices
        return (
          <div className="relative w-full h-full min-h-[180px] flex items-center justify-center p-4">
            {gridBackground}
            {/* Collaboration board */}
            <div className="relative w-full max-w-[280px] bg-black/40 rounded-lg border border-white/5 p-3 shadow-2xl flex flex-col gap-2">
              <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                <span className="text-[9px] font-bold text-teal-400 tracking-wider flex items-center gap-1">
                  <Workflow className="w-3 h-3 text-teal-400" />
                  TEAM VELOCITY
                </span>
                <span className="text-[8px] text-slate-500 font-mono">SPRINT: ACTIVE</span>
              </div>
              <div className="space-y-1.5">
                <div className="bg-white/[0.01] border border-white/5 rounded px-2 py-1 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[7.5px] font-medium text-slate-300">Robert K. checked in</span>
                  </div>
                  <span className="text-[6.5px] font-mono text-slate-500">2 min ago</span>
                </div>
                <div className="bg-white/[0.01] border border-white/5 rounded px-2 py-1 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="text-[7.5px] font-medium text-slate-300">PR #402 merged into dev</span>
                  </div>
                  <span className="text-[6.5px] font-mono text-slate-500">8 min ago</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  }

  // ─── CASE STUDY MOCKUPS ───────────────────────────────────────────────────

  if (type === "case-study") {
    switch (slug) {
      case "enterprise-digital-transformation":
      case "enterprise-digital-transformation-manufacturing": // Fortune 500 Retailer
        return (
          <div className="relative w-full h-full min-h-[200px] flex items-center justify-center p-4">
            {gridBackground}
            {/* Dashboard Mockup */}
            <div className="relative w-full max-w-[320px] bg-black/40 rounded-lg border border-white/5 shadow-2xl flex flex-col overflow-hidden">
              <div className="bg-[#10121a] px-3 py-1.5 border-b border-white/5 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500/80" />
                  <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[8px] text-slate-400 font-mono">analytics.globalretail.com</span>
                <div className="w-2 h-2" />
              </div>
              <div className="p-3.5 grid grid-cols-12 gap-3.5">
                <div className="col-span-8 bg-white/[0.02] border border-white/[0.04] p-2.5 rounded-lg flex flex-col gap-2">
                  <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider block">Checkout Conversion</span>
                  <div className="h-24 flex items-end gap-1.5 pb-1">
                    <div className="flex-1 bg-blue-500/10 rounded h-10" />
                    <div className="flex-1 bg-blue-500/20 rounded h-14" />
                    <div className="flex-1 bg-blue-500/30 rounded h-8" />
                    <div className="flex-1 bg-blue-500/50 rounded h-[70px]" />
                    <div className="flex-1 bg-gradient-to-t from-blue-500 to-cyan-400 rounded h-20" />
                  </div>
                </div>
                <div className="col-span-4 flex flex-col gap-2">
                  <div className="bg-white/[0.02] border border-white/[0.04] p-2 rounded-lg flex flex-col justify-center">
                    <span className="text-[6.5px] text-slate-500 font-bold uppercase">Conversion</span>
                    <span className="text-sm font-bold text-emerald-400">+42.6%</span>
                  </div>
                  <div className="bg-white/[0.02] border border-white/[0.04] p-2 rounded-lg flex flex-col justify-center">
                    <span className="text-[6.5px] text-slate-500 font-bold uppercase">APdex Latency</span>
                    <span className="text-sm font-bold text-blue-400">12ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "ai-recruitment-platform":
      case "ai-powered-recruitment-platform": // AI recruitment platform
        return (
          <div className="relative w-full h-full min-h-[200px] flex items-center justify-center p-4">
            {gridBackground}
            {/* Applicant telemetry dashboard */}
            <div className="relative w-full max-w-[320px] bg-black/40 rounded-lg border border-white/5 p-3.5 shadow-2xl flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-[9.5px] font-bold text-purple-400 tracking-wider flex items-center gap-1">
                  <Brain className="w-3.5 h-3.5 text-purple-400" />
                  CANDIDATE INTELLIGENCE
                </span>
                <span className="text-[8px] text-slate-500 font-mono">STABILITY: 99.8%</span>
              </div>
              <div className="grid grid-cols-12 gap-3.5 items-center">
                <div className="col-span-5 flex flex-col gap-2.5">
                  <div className="relative w-16 h-16 rounded-full border-2 border-purple-500/20 flex items-center justify-center mx-auto">
                    <div className="absolute inset-1.5 rounded-full border border-dashed border-purple-500/50 animate-spin" style={{ animationDuration: "12s" }} />
                    <span className="text-purple-300 font-mono font-bold text-xs">98.2%</span>
                  </div>
                  <span className="text-[7.5px] text-slate-500 font-bold text-center block">MATCH CONFIDENCE</span>
                </div>
                <div className="col-span-7 space-y-2">
                  <div className="flex items-center justify-between text-[8px]">
                    <span className="text-slate-400">Semantic Matching</span>
                    <span className="text-purple-400 font-semibold">99.1%</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 w-[99.1%]" />
                  </div>
                  <div className="flex items-center justify-between text-[8px]">
                    <span className="text-slate-400">Technical Skillset</span>
                    <span className="text-purple-400 font-semibold">98.4%</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 w-[98.4%]" />
                  </div>
                  <div className="flex items-center justify-between text-[8px]">
                    <span className="text-slate-400">Cultural Alignment</span>
                    <span className="text-purple-400 font-semibold">97.0%</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 w-[97%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "ecommerce-mobile-app":
      case "ecommerce-mobile-app-retail": // E-Commerce mobile app
        return (
          <div className="relative w-full h-full min-h-[200px] flex items-center justify-center p-4">
            {gridBackground}
            {/* Mobile shopping mockup */}
            <div className="relative w-[100px] h-[175px] bg-[#0c0d12] rounded-[16px] border-[2px] border-white/10 shadow-2xl p-2 flex flex-col gap-2">
              {/* Speaker & camera dots */}
              <div className="flex justify-center gap-1 border-b border-white/5 pb-1">
                <span className="w-5 h-1 rounded-full bg-white/10" />
                <span className="w-1 h-1 rounded-full bg-white/10" />
              </div>
              {/* Screen Content */}
              <div className="flex-1 bg-white/[0.01] rounded-lg border border-white/[0.04] p-1.5 flex flex-col gap-1.5 overflow-hidden justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[5.5px] text-slate-300 font-bold uppercase tracking-wider">ShopEase App</span>
                  <Smartphone className="w-2 h-2 text-slate-400" />
                </div>
                {/* Product Mock card */}
                <div className="bg-white/[0.02] border border-white/5 p-1 rounded flex flex-col gap-1">
                  <div className="h-14 bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded flex items-center justify-center border border-white/5">
                    <Smartphone className="w-5 h-5 text-blue-400/40" />
                  </div>
                  <span className="text-[4.5px] text-slate-400 font-medium leading-none block">Minimalist Wallet</span>
                  <span className="text-[5px] text-blue-300 font-bold leading-none block">$42.50</span>
                </div>
                {/* Checkout CTA */}
                <div className="h-4.5 rounded bg-blue-500 border border-blue-400 flex items-center justify-center">
                  <span className="text-[4.5px] text-white font-bold tracking-wider">PURCHASE SECURE</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "cloud-migration":
      case "cloud-migration-fintech": // FinanceFirst Bank migration
        return (
          <div className="relative w-full h-full min-h-[200px] flex items-center justify-center p-4">
            {gridBackground}
            {/* High availability cloud migration model */}
            <div className="relative w-full max-w-[320px] bg-black/40 rounded-lg border border-white/5 p-3.5 shadow-2xl flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-[9.5px] font-bold text-amber-400 tracking-wider flex items-center gap-1">
                  <Cloud className="w-3.5 h-3.5 text-amber-400" />
                  HIGH-AVAILABILITY CLUSTER
                </span>
                <span className="text-[8px] text-slate-500 font-mono">STATUS: SYNCHRONIZED</span>
              </div>
              <div className="flex items-center justify-between px-2">
                {/* Legacy Data Source */}
                <div className="bg-white/[0.02] border border-white/10 p-1.5 rounded flex flex-col items-center gap-1 w-[65px]">
                  <span className="text-[5px] text-slate-500 font-bold uppercase">Legacy Db</span>
                  <div className="w-4 h-4 rounded bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <Database className="w-2.5 h-2.5 text-red-400" />
                  </div>
                </div>
                {/* Migrating arrow */}
                <div className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full h-[1px] bg-dashed border-t border-dashed border-amber-500/40 relative">
                    <span className="absolute -top-[1.5px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-400" />
                  </div>
                  <span className="text-[5px] text-amber-400 font-bold tracking-widest">MIGRATING</span>
                </div>
                {/* Secure Target EKS Cluster */}
                <div className="bg-[#121c17] border border-emerald-500/20 p-1.5 rounded flex flex-col items-center gap-1 w-[65px]">
                  <span className="text-[5px] text-emerald-500 font-bold uppercase">AWS EKS</span>
                  <div className="w-4 h-4 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <CheckCircle className="w-2.5 h-2.5 text-emerald-400" />
                  </div>
                </div>
              </div>
              <div className="bg-white/[0.01] border border-white/5 rounded px-2.5 py-1.5 flex items-center justify-between">
                <span className="text-[7px] text-slate-400">Migration Pipeline Uptime</span>
                <span className="text-[7.5px] text-emerald-400 font-bold">99.999% ACTIVE</span>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="relative w-full h-full min-h-[200px] flex items-center justify-center p-4">
            {gridBackground}
            <div className="relative w-full max-w-[280px] bg-[#0a0a0f]/60 rounded-xl border border-white/10 p-5 shadow-2xl flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent pointer-events-none" />
              <div className="relative z-10 flex items-center justify-between border-b border-white/5 pb-2.5 mb-3">
                <span className="text-[9px] font-bold text-blue-400 tracking-wider">
                  CASE INTEGRATION
                </span>
                <span className="text-[8px] text-slate-500 font-mono">STATUS: SYNCED</span>
              </div>
              <div className="relative z-10">
                <h4 className="text-xs font-extrabold text-slate-200 tracking-tight mb-2 uppercase">
                  {slug.split('-').join(' ')}
                </h4>
                <div className="h-1.5 w-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
              </div>
            </div>
          </div>
        );
    }
  }

  return null;
}
