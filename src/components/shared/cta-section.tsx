"use client";

import React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CtaSectionProps {
  title: string;
  description: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  className?: string;
}

export function CtaSection({
  title,
  description,
  primaryCta,
  secondaryCta,
  primaryAction,
  secondaryAction,
  className,
}: CtaSectionProps) {
  const finalPrimary = primaryCta || primaryAction;
  const finalSecondary = secondaryCta || secondaryAction;

  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section ref={ref} className={cn("relative py-20 lg:py-28 overflow-hidden bg-[#0a0a0f] border-t border-white/5", className)}>
      {/* Background */}
      <div className="absolute inset-0 bg-slate-900/50" />

      {/* Floating decorative elements */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-10 left-10 w-72 h-72 rounded-full bg-blue-600/5 blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-slate-600/5 blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: y1 }}
        className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-blue-800/5 blur-3xl pointer-events-none"
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E")`,
      }} />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            {title}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {finalPrimary && (
              <Button size="lg" asChild>
                <Link href={finalPrimary.href} className="gap-2">
                  {finalPrimary.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
            {finalSecondary && (
              <Button variant="outline" size="lg" asChild className="border-slate-700 text-slate-300 hover:bg-white/10 hover:text-white">
                <Link href={finalSecondary.href}>{finalSecondary.label}</Link>
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { CtaSection as CTASection };
