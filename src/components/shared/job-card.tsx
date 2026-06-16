"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Briefcase, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface JobCardProps {
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  skills: string[];
  slug: string;
  className?: string;
}

export function JobCard({
  title,
  department,
  location,
  type,
  experience,
  skills,
  slug,
  className,
}: JobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn("group", className)}
    >
      <div className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 transition-all duration-300 hover:border-blue-500/20 hover:bg-white/[0.05]">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            {/* Department Badge */}
            <Badge variant="secondary" className="mb-3">
              {department}
            </Badge>

            {/* Title */}
            <h3 className="text-lg font-semibold text-slate-50 mb-3 group-hover:text-blue-300 transition-colors duration-300">
              {title}
            </h3>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {location}
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase className="h-3.5 w-3.5" />
                {type}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {experience}
              </span>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded-md bg-white/5 border border-white/10 px-2.5 py-0.5 text-xs font-medium text-slate-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <div className="sm:ml-4 flex-shrink-0">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/careers/${slug}`} className="gap-1.5">
                Apply
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
