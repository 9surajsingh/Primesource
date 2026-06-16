"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedCounter } from "@/components/shared/animated-counter";

interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

interface StatsSectionProps {
  stats: Stat[];
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function StatsSection({ stats, className }: StatsSectionProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6",
        className
      )}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          variants={cardVariants}
          className="relative rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 text-center overflow-hidden group hover:border-blue-500/20 transition-colors duration-300"
        >
          {/* Subtle glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-50 mb-2 tabular-nums">
              {stat.prefix && (
                <span className="text-blue-400">{stat.prefix}</span>
              )}
              <AnimatedCounter target={stat.value} />
              {stat.suffix && (
                <span className="text-blue-400">{stat.suffix}</span>
              )}
            </div>
            <p className="text-sm text-slate-400 font-medium">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
