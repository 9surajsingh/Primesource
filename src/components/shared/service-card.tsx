"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  href?: string;
  className?: string;
}

export function ServiceCard({
  icon,
  title,
  description,
  href = "#",
  className,
}: ServiceCardProps) {
  // Dynamically resolve the icon component from lucide-react
  const IconComponent = (LucideIcons as any)[icon] ?? LucideIcons.Layers;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn("group", className)}
    >
      <Link href={href} className="block h-full">
        <div className="relative h-full rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 transition-all duration-300 hover:border-blue-500/30 hover:bg-white/[0.05] hover:shadow-lg hover:shadow-blue-500/5 overflow-hidden">
          {/* Hover glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative">
            {/* Icon */}
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 group-hover:border-blue-500/30 transition-colors duration-300">
              <IconComponent className="h-6 w-6 text-blue-400" />
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-slate-50 mb-2 group-hover:text-blue-300 transition-colors duration-300">
              {title}
            </h3>

            {/* Description */}
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              {description}
            </p>

            {/* Arrow Link */}
            <div className="flex items-center gap-1.5 text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
              <span>Learn more</span>
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
