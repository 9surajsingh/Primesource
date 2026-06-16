"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarSrc?: string;
  rating?: number;
  className?: string;
}

export function TestimonialCard({
  quote,
  author,
  role,
  company,
  avatarSrc,
  rating = 5,
  className,
}: TestimonialCardProps) {
  const initials = author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "relative rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 lg:p-8 transition-all duration-300 hover:border-white/15 group",
        className
      )}
    >
      {/* Quote Icon */}
      <div className="mb-4">
        <Quote className="h-8 w-8 text-blue-500/30" />
      </div>

      {/* Rating */}
      {rating > 0 && (
        <div className="flex items-center gap-0.5 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-4 w-4",
                i < rating
                  ? "fill-amber-400 text-amber-400"
                  : "fill-slate-700 text-slate-700"
              )}
            />
          ))}
        </div>
      )}

      {/* Quote Text */}
      <blockquote className="text-base text-slate-300 leading-relaxed mb-6">
        &ldquo;{quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          {avatarSrc && <AvatarImage src={avatarSrc} alt={author} />}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold text-slate-50">{author}</p>
          <p className="text-xs text-slate-400">
            {role}, {company}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
