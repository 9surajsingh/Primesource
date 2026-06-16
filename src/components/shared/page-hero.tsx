"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ParticleBackground } from "@/components/shared/particle-background";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

export function PageHero({
  title,
  description,
  breadcrumbs,
  ctaLabel,
  ctaHref,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative min-h-[50vh] flex items-center py-32 lg:py-40 overflow-hidden",
        className
      )}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0a0a0f] to-[#111827]" />
      <ParticleBackground />

      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            aria-label="Breadcrumb"
            className="mb-6"
          >
            <ol className="flex items-center gap-1.5 text-sm text-slate-400">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={crumb.href || index}>
                  <li>
                    {crumb.href ? (
                      <Link
                        href={crumb.href}
                        className="hover:text-blue-400 transition-colors duration-200"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-slate-200">{crumb.label}</span>
                    )}
                  </li>
                  {index < breadcrumbs.length - 1 && (
                    <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
                  )}
                </React.Fragment>
              ))}
            </ol>
          </motion.nav>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight max-w-4xl"
        >
          <span className="bg-gradient-to-r from-slate-50 via-slate-200 to-slate-400 bg-clip-text text-transparent">
            {title}
          </span>
        </motion.h1>

        {/* Description */}
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-lg sm:text-xl text-slate-400 leading-relaxed max-w-2xl"
          >
            {description}
          </motion.p>
        )}

        {/* CTA */}
        {ctaLabel && ctaHref && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <Button size="lg" asChild>
              <Link href={ctaHref}>{ctaLabel}</Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
