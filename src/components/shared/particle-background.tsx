"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ParticleBackgroundProps {
  className?: string;
}

export function ParticleBackground({ className }: ParticleBackgroundProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.01] to-transparent" />

      {/* Floating particles - CSS animated */}
      <div className="absolute top-[10%] left-[15%] w-1.5 h-1.5 rounded-full bg-blue-400/20 animate-float-slow" />
      <div className="absolute top-[25%] right-[20%] w-1 h-1 rounded-full bg-cyan-400/20 animate-float-medium" />
      <div className="absolute top-[45%] left-[8%] w-1 h-1 rounded-full bg-purple-400/15 animate-float-slow-reverse" />
      <div className="absolute top-[60%] right-[12%] w-1.5 h-1.5 rounded-full bg-blue-300/15 animate-float-medium" />
      <div className="absolute top-[75%] left-[35%] w-1 h-1 rounded-full bg-cyan-300/20 animate-float-slow" />
      <div className="absolute top-[15%] left-[55%] w-1 h-1 rounded-full bg-blue-400/15 animate-float-medium-reverse" />
      <div className="absolute top-[85%] right-[30%] w-1 h-1 rounded-full bg-purple-300/15 animate-float-slow" />
      <div className="absolute top-[35%] left-[75%] w-1.5 h-1.5 rounded-full bg-blue-500/10 animate-float-slow-reverse" />
      <div className="absolute top-[55%] left-[45%] w-1 h-1 rounded-full bg-cyan-400/15 animate-float-medium" />
      <div className="absolute top-[90%] left-[65%] w-1 h-1 rounded-full bg-blue-300/20 animate-float-medium-reverse" />

      {/* Larger floating orbs */}
      <div className="absolute top-[20%] left-[30%] w-32 h-32 rounded-full bg-blue-500/[0.03] blur-3xl animate-float-slow" />
      <div className="absolute top-[60%] right-[25%] w-48 h-48 rounded-full bg-purple-500/[0.02] blur-3xl animate-float-medium-reverse" />
      <div className="absolute top-[40%] left-[60%] w-40 h-40 rounded-full bg-cyan-500/[0.02] blur-3xl animate-float-slow-reverse" />

      {/* Inline keyframes */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-15px) translateX(5px); }
          50% { transform: translateY(-8px) translateX(-3px); }
          75% { transform: translateY(-20px) translateX(8px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-12px) translateX(-8px); }
          66% { transform: translateY(-18px) translateX(4px); }
        }
        @keyframes float-slow-reverse {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(10px) translateX(-6px); }
          50% { transform: translateY(-5px) translateX(4px); }
          75% { transform: translateY(15px) translateX(-3px); }
        }
        @keyframes float-medium-reverse {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(12px) translateX(-5px); }
        }
        :global(.animate-float-slow) {
          animation: float-slow 8s ease-in-out infinite;
        }
        :global(.animate-float-medium) {
          animation: float-medium 6s ease-in-out infinite;
        }
        :global(.animate-float-slow-reverse) {
          animation: float-slow-reverse 10s ease-in-out infinite;
        }
        :global(.animate-float-medium-reverse) {
          animation: float-medium-reverse 7s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
