"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, Play, X, Volume2, Maximize2 } from "lucide-react";
import { CardTilt } from "@/components/ui/card-tilt";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  duration: string;
  metrics: string;
  metricLabel: string;
  videoPreviewColor: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "Chief Technology Officer",
    company: "Meridian Financial Group",
    content: "PrimeSource transformed our engineering team velocity. They didn't just fill positions — they deployed experts who understood high-frequency fintech latency structures and hit the ground running. Our core platform throughput scaled 12x in the first quarter.",
    rating: 5,
    duration: "1:24",
    metrics: "12ms Latency",
    metricLabel: "Trading Engine Benchmark",
    videoPreviewColor: "from-blue-600/30 to-cyan-500/10"
  },
  {
    name: "Marcus Williams",
    role: "VP of Digital Engineering",
    company: "HealthBridge Systems",
    content: "The custom PyTorch DICOM classification pipeline PrimeSource built for us was game-changing. Their technical leadership, DevOps container orchestration (GCP/Kubernetes), and compliance audit speed were world-class. Scans now compile 3.5x faster.",
    rating: 5,
    duration: "1:48",
    metrics: "97.4% Precision",
    metricLabel: "Segmentation Model Success",
    videoPreviewColor: "from-purple-600/30 to-pink-500/10"
  },
  {
    name: "Jennifer Rodriguez",
    role: "Director of Architecture & Cloud",
    company: "NovaTech Retail",
    content: "Working with PrimeSource on our Azure migration was exceptional. They provided 120+ vetted developers and built an AKS-orchestrated inventory management platform that saved us $2.4M in cloud operational spend. A premier engineering partner.",
    rating: 5,
    duration: "2:05",
    metrics: "$2.4M Saved",
    metricLabel: "Annual Cloud Database Costs",
    videoPreviewColor: "from-orange-600/30 to-yellow-500/10"
  }
];

interface TestimonialType {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string | null;
  videoUrl?: string | null;
}

interface TestimonialsProps {
  testimonials?: TestimonialType[];
}

export default function Testimonials({ testimonials: customTestimonials }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const displayTestimonials = customTestimonials && customTestimonials.length > 0
    ? customTestimonials.map((t, idx) => ({
        name: t.name,
        role: t.role,
        company: t.company,
        content: t.content,
        rating: t.rating,
        duration: "1:30",
        metrics: t.rating === 5 ? "5.0 Rating" : `${t.rating}.0 Rating`,
        metricLabel: "Client Feedback",
        videoPreviewColor: idx % 3 === 0 
          ? "from-blue-600/30 to-cyan-500/10" 
          : idx % 3 === 1 
            ? "from-purple-600/30 to-pink-500/10" 
            : "from-orange-600/30 to-yellow-500/10"
      }))
    : testimonials;

  const activeTestimonial = displayTestimonials[activeIndex];


  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % displayTestimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length);
  };


  // Simulated video canvas animation inside popup
  useEffect(() => {
    if (!isVideoPlaying || !videoCanvasRef.current) return;

    const canvas = videoCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = canvas.clientWidth;
    let height = canvas.height = canvas.clientHeight;

    const particles: { x: number; y: number; r: number; s: number; color: string }[] = [];
    const colors = ["#3b82f6", "#06b6d4", "#a78bfa", "#f59e0b"];

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 3 + 1,
        s: Math.random() * 1.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    let animId: number;
    let frame = 0;

    const draw = () => {
      frame++;
      ctx.fillStyle = "#0c0d12";
      ctx.fillRect(0, 0, width, height);

      // Grid background
      ctx.strokeStyle = "rgba(255,255,255,0.02)";
      ctx.lineWidth = 1;
      const size = 30;
      for (let x = 0; x < width; x += size) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += size) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Drawing audio waveform visualizer at bottom
      ctx.fillStyle = activeTestimonial.name === "Sarah Chen" ? "#3b82f6" : activeTestimonial.name === "Marcus Williams" ? "#ec4899" : "#fb923c";
      ctx.globalAlpha = 0.8;
      const barWidth = 6;
      const spacing = 4;
      const barCount = Math.floor(width / (barWidth + spacing));
      for (let i = 0; i < barCount; i++) {
        const h = Math.abs(Math.sin(i * 0.15 + frame * 0.08)) * 60 + 10;
        ctx.fillRect(
          i * (barWidth + spacing),
          height - h - 40,
          barWidth,
          h
        );
      }
      ctx.globalAlpha = 1.0;

      // Draw floating code particle elements
      particles.forEach((p) => {
        p.y -= p.s;
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Drawing simulated video camera recording UI overlay
      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.arc(30, 30, (frame % 60 < 30) ? 6 : 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "white";
      ctx.font = "bold 10px system-ui";
      ctx.textAlign = "left";
      ctx.fillText("REC LIVE // TESTIMONIAL", 44, 33);

      ctx.fillText(`00:${(frame / 60).toFixed(0).padStart(2, "0")}`, width - 70, 33);

      // Watermark text in center
      ctx.fillStyle = "rgba(255,255,255,0.08)";
      ctx.font = "bold 24px system-ui";
      ctx.textAlign = "center";
      ctx.fillText(`${activeTestimonial.name} // ${activeTestimonial.company}`, width / 2, height / 2);

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isVideoPlaying, activeTestimonial]);

  return (
    <section className="py-24 md:py-32 bg-[#0a0a0f] relative overflow-hidden" id="testimonials">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.06)_0%,transparent_50%)]" />
 
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/50 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-4">
            <Quote className="w-3.5 h-3.5" />
            Client Reviews
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-5">
            What Our Partners Say
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            From early-stage scaleups to Fortune 500 corporations, read how we engineer high-performance platforms.
          </p>
        </div>
 
        {/* Testimonials double-pane frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left: Video preview thumbnail wrapper */}
          <div className="lg:col-span-5 h-[320px] lg:h-auto min-h-[350px]">
            <CardTilt className="h-full">
              <div 
                onClick={() => setIsVideoPlaying(true)}
                className={`group relative h-full rounded-3xl border border-white/10 bg-gradient-to-br ${activeTestimonial.videoPreviewColor} p-8 flex flex-col justify-between overflow-hidden shadow-xl cursor-pointer hover:border-white/20 transition-colors`}
              >
                {/* Visual mesh design overlay inside preview */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
 
                <div className="flex items-center justify-between relative z-10">
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest bg-black/40 px-3 py-1.5 rounded-md border border-white/5 backdrop-blur-sm">
                    VIDEO CASE TESTIMONIAL
                  </span>
                  <span className="text-xs font-semibold text-slate-300">
                    {activeTestimonial.duration} Mins
                  </span>
                </div>
 
                {/* Big play button centered */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-2xl shadow-blue-500/25 group-hover:scale-110 transition-transform duration-300 relative z-10">
                  <Play className="w-6 h-6 fill-white ml-1 text-white" />
                </div>
 
                <div className="relative z-10">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    {activeTestimonial.metricLabel}
                  </span>
                  <span className="text-3xl font-extrabold text-white tracking-tight">
                    {activeTestimonial.metrics}
                  </span>
                </div>
              </div>
            </CardTilt>
          </div>
 
          {/* Right: Written quotes panel */}
          <div className="lg:col-span-7 flex flex-col justify-between p-8 md:p-12 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {Array.from({ length: activeTestimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4.5 h-4.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-10 h-10 text-blue-500/20" />
                </div>
 
                {/* Written Content */}
                <p className="text-xl md:text-2xl text-white font-medium leading-relaxed tracking-tight">
                  &ldquo;{activeTestimonial.content}&rdquo;
                </p>
 
                {/* Author Metadata */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {activeTestimonial.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white tracking-tight">
                      {activeTestimonial.name}
                    </h4>
                    <p className="text-slate-400 text-xs font-medium mt-0.5">
                      {activeTestimonial.role} at <span className="text-slate-300">{activeTestimonial.company}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
 
            {/* Slider navigation controller */}
            <div className="flex items-center justify-between mt-12 pt-6 border-t border-white/5">
              {/* Slide dots indicators */}
              <div className="flex gap-2">
                {displayTestimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIndex ? "w-8 bg-blue-500" : "w-2 bg-white/10"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
 
              {/* Navigation button arrows */}
              <div className="flex gap-3">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-300 hover:text-white hover:border-slate-400 hover:bg-slate-100 active:scale-95 transition-all"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-300 hover:text-white hover:border-slate-400 hover:bg-slate-100 active:scale-95 transition-all"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
 
          </div>
 
        </div>

      </div>

      {/* Simulated High-End Video Dialog Popup overlay */}
      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 md:p-10"
          >
            <div className="relative w-full max-w-4xl bg-black rounded-3xl border border-white/10 shadow-2xl overflow-hidden aspect-video flex flex-col justify-between">
              
              {/* Interactive HTML5 simulated video canvas */}
              <canvas ref={videoCanvasRef} className="absolute inset-0 w-full h-full" />

              {/* Header inside video popup */}
              <div className="relative z-10 p-5 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between">
                <div>
                  <h4 className="text-white font-bold tracking-tight">{activeTestimonial.name}</h4>
                  <p className="text-slate-400 text-xs">{activeTestimonial.role} - {activeTestimonial.company}</p>
                </div>
                <button
                  onClick={() => setIsVideoPlaying(false)}
                  className="p-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full text-slate-300 hover:text-white active:scale-90 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Controls bar inside video popup */}
              <div className="relative z-10 p-5 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between text-slate-300 text-xs font-semibold">
                <div className="flex items-center gap-4">
                  <button className="hover:text-white transition-colors">
                    <Play className="w-4 h-4 fill-white text-white" />
                  </button>
                  <span className="text-[10px]">00:14 / {activeTestimonial.duration}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Volume2 className="w-4 h-4 hover:text-white cursor-pointer" />
                  <Maximize2 className="w-4 h-4 hover:text-white cursor-pointer" />
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
