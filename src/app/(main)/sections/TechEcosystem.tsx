"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Monitor, Database, Cloud, Brain, Lock, Layers } from "lucide-react";
import { CardTilt } from "@/components/ui/card-tilt";

interface TechStackItem {
  name: string;
  category: string;
}

interface EcosystemHub {
  id: string;
  name: string;
  icon: any;
  color: string;
  glow: string;
  desc: string;
  tools: string[];
  metrics: string;
}

const hubs: EcosystemHub[] = [
  {
    id: "frontend",
    name: "Frontend Engineering",
    icon: Monitor,
    color: "#60a5fa",
    glow: "rgba(96,165,250,0.15)",
    desc: "Building highly interactive, latency-optimized, and pixel-perfect customer-facing interfaces.",
    tools: ["Next.js", "React", "TypeScript", "TailwindCSS", "Framer Motion", "GSAP"],
    metrics: "98+ PageSpeed Average"
  },
  {
    id: "backend",
    name: "Backend Platforms",
    icon: Layers,
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.15)",
    desc: "Robust microservices architectures designed for high concurrency, throughput, and low response times.",
    tools: ["Node.js", "FastAPI", "Go", "NestJS", "GraphQL", "gRPC"],
    metrics: "99.99% Core API Uptime"
  },
  {
    id: "cloud",
    name: "Cloud & Devops",
    icon: Cloud,
    color: "#22d3ee",
    glow: "rgba(34,211,238,0.15)",
    desc: "Scalable container infrastructure, continuous integration pipelines, and automated cloud systems.",
    tools: ["AWS", "Azure", "Kubernetes", "Docker", "Terraform", "GitHub Actions"],
    metrics: "Sub-Second Deployment Rolls"
  },
  {
    id: "ai",
    name: "AI & Automation",
    icon: Brain,
    color: "#fb923c",
    glow: "rgba(251,146,60,0.15)",
    desc: "Automating enterprise decisions and documents using large language models, agents, and custom workflows.",
    tools: ["LangChain", "OpenAI API", "HuggingFace", "UiPath", "Python", "PyTorch"],
    metrics: "25k+ Automations Delivered"
  },
  {
    id: "data",
    name: "Data Pipelines",
    icon: Database,
    color: "#34d399",
    glow: "rgba(52,211,153,0.15)",
    desc: "Designing resilient relational tables, high-performance caches, and analytic data warehouses.",
    tools: ["PostgreSQL", "Prisma", "Redis", "Snowflake", "MongoDB", "Kafka"],
    metrics: "Multi-Terabyte Storage Architecture"
  },
  {
    id: "security",
    name: "Security & IAM",
    icon: Lock,
    color: "#f87171",
    glow: "rgba(248,113,113,0.15)",
    desc: "Integrating single sign-on authentication, continuous encryption, and regulatory audit compliance.",
    tools: ["OAuth2", "OpenID Connect", "Okta", "Vault", "SOC2 Type II", "GDPR Guardlands"],
    metrics: "Zero Leak Security Guarantee"
  }
];

export default function TechEcosystem() {
  const [activeHub, setActiveHub] = useState<EcosystemHub>(hubs[0]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mousePos = useRef({ x: 0, y: 0, currentX: 0, currentY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mousePos.current.x = x * 0.05;
      mousePos.current.y = y * 0.05;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = canvas.clientWidth;
    let height = canvas.height = canvas.clientHeight;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.clientWidth;
      height = canvas.height = canvas.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Node definition
    interface NodePoint {
      x: number;
      y: number;
      label: string;
      color: string;
      angle: number;
      speed: number;
      distance: number;
    }

    const coreX = () => width / 2;
    const coreY = () => height / 2;

    const nodes: NodePoint[] = hubs.map((h, i) => {
      return {
        x: 0,
        y: 0,
        label: h.name,
        color: h.color,
        angle: (i * Math.PI) / 3,
        speed: 0.003 + Math.random() * 0.002,
        distance: Math.min(width, height) * 0.32
      };
    });

    // Sub-orbiting technology nodes
    interface SubNode {
      parentIndex: number;
      angle: number;
      speed: number;
      distance: number;
      label: string;
    }

    const subNodes: SubNode[] = [];
    hubs.forEach((h, parentIdx) => {
      h.tools.forEach((tool, toolIdx) => {
        subNodes.push({
          parentIndex: parentIdx,
          angle: (toolIdx * Math.PI * 2) / h.tools.length,
          speed: 0.01 + Math.random() * 0.005,
          distance: 35 + Math.random() * 10,
          label: tool
        });
      });
    });

    let animId: number;
    let packetTimer = 0;
    const packets: { x: number; y: number; tx: number; ty: number; progress: number; color: string }[] = [];

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse position update
      mousePos.current.currentX += (mousePos.current.x - mousePos.current.currentX) * 0.08;
      mousePos.current.currentY += (mousePos.current.y - mousePos.current.currentY) * 0.08;

      const cx = coreX() + mousePos.current.currentX;
      const cy = coreY() + mousePos.current.currentY;

      // Draw central hub background glow
      const coreGlow = ctx.createRadialGradient(cx, cy, 5, cx, cy, 75);
      coreGlow.addColorStop(0, "rgba(59, 130, 246, 0.2)");
      coreGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, 75, 0, Math.PI * 2);
      ctx.fill();

      // Draw lines between orbiting layer nodes and core
      nodes.forEach((node) => {
        node.angle += node.speed;
        node.x = cx + Math.cos(node.angle) * node.distance;
        node.y = cy + Math.sin(node.angle) * node.distance;

        // Draw path connecting line
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(node.x, node.y);
        ctx.stroke();

        // Draw outer orbits lines
        ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
        ctx.beginPath();
        ctx.arc(node.x, node.y, 45, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Spawn data packet animations along connection lines
      packetTimer++;
      if (packetTimer % 45 === 0) {
        const destNodeIdx = Math.floor(Math.random() * nodes.length);
        const destNode = nodes[destNodeIdx];
        packets.push({
          x: cx,
          y: cy,
          tx: destNode.x,
          ty: destNode.y,
          progress: 0,
          color: destNode.color
        });
      }

      // Update and draw data packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const packet = packets[i];
        packet.progress += 0.015;

        // Recalculate based on moving nodes
        const currentTargetNode = nodes.find(n => n.color === packet.color);
        if (currentTargetNode) {
          packet.tx = currentTargetNode.x;
          packet.ty = currentTargetNode.y;
        }

        packet.x = cx + (packet.tx - cx) * packet.progress;
        packet.y = cy + (packet.ty - cy) * packet.progress;

        ctx.fillStyle = packet.color;
        ctx.beginPath();
        ctx.arc(packet.x, packet.y, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = packet.color;
        ctx.beginPath();
        ctx.arc(packet.x, packet.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        if (packet.progress >= 1) {
          packets.splice(i, 1);
        }
      }

      // Draw subnodes (orbiting tools)
      subNodes.forEach((sub) => {
        const parent = nodes[sub.parentIndex];
        sub.angle += sub.speed;
        const sx = parent.x + Math.cos(sub.angle) * sub.distance;
        const sy = parent.y + Math.sin(sub.angle) * sub.distance;

        // Draw connections
        ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
        ctx.beginPath();
        ctx.moveTo(parent.x, parent.y);
        ctx.lineTo(sx, sy);
        ctx.stroke();

        // Draw minor tool node
        ctx.fillStyle = parent.color;
        ctx.globalAlpha = 0.55;
        ctx.beginPath();
        ctx.arc(sx, sy, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      // Draw primary hubs
      nodes.forEach((node, idx) => {
        const hub = hubs[idx];
        const isHovered = activeHub.id === hub.id;

        // Draw connection hub point
        ctx.fillStyle = isHovered ? node.color : "#1f2937";
        ctx.strokeStyle = node.color;
        ctx.lineWidth = isHovered ? 3 : 1.5;
        ctx.beginPath();
        ctx.arc(node.x, node.y, isHovered ? 11 : 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        if (isHovered) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = node.color;
          ctx.fillStyle = "white";
          ctx.beginPath();
          ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Draw text label on nodes
        ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
        ctx.font = "bold 11px system-ui";
        ctx.textAlign = "center";
        ctx.fillText(hub.name.split(" ")[0], node.x, node.y + (isHovered ? 26 : 22));
      });

      // Draw central platform hub core circle
      ctx.fillStyle = "#0a0a0f";
      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#60a5fa";
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [activeHub]);

  return (
    <section className="py-24 md:py-32 bg-[#0a0a0f] border-t border-white/5 relative overflow-hidden" id="ecosystem">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Integrations & Architecture
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-5">
            Technology Ecosystem
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Our active core capabilities map across major cloud providers, artificial intelligence frameworks, database backends, and frontend libraries.
          </p>
        </div>

        {/* Dynamic Display Layout */}
        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Animated node visualization canvas */}
          <div className="lg:col-span-7 h-[420px] md:h-[500px] bg-white/[0.02] rounded-2xl border border-white/5 relative overflow-hidden flex items-center justify-center">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            {/* Click nodes prompt overlay */}
            <div className="absolute bottom-5 left-5 text-[10px] text-slate-450 font-semibold tracking-wider uppercase pointer-events-none bg-black/40 px-3 py-1.5 rounded-md backdrop-blur-sm border border-white/5">
              Hover nodes or select panel to connect
            </div>
          </div>

          {/* Details & description panel */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-3 gap-2 mb-4">
              {hubs.map((hub) => {
                const Icon = hub.icon;
                const isActive = activeHub.id === hub.id;
                return (
                  <button
                    key={hub.id}
                    onClick={() => setActiveHub(hub)}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-semibold ${
                      isActive
                        ? "bg-blue-500/10 text-blue-300 border-blue-500/20 shadow-sm"
                        : "bg-white/5 text-slate-400 border-white/10 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon className="w-4 h-4" style={{ color: isActive ? hub.color : undefined }} />
                    <span className="truncate max-w-full text-[10px]">{hub.name.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeHub.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CardTilt>
                  <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl relative overflow-hidden flex flex-col justify-between min-h-[300px] shadow-lg shadow-black/10">
                    {/* Shadow overlay glow */}
                    <div
                      className="absolute -top-1/2 -right-1/2 w-80 h-80 rounded-full blur-[100px] opacity-75 pointer-events-none"
                      style={{ background: `radial-gradient(circle, ${activeHub.glow} 0%, transparent 65%)` }}
                    />

                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/10"
                          style={{ backgroundColor: `${activeHub.color}15`, color: activeHub.color }}
                        >
                          <activeHub.icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold text-white tracking-tight">{activeHub.name}</h3>
                      </div>

                      <p className="text-slate-400 text-sm leading-relaxed mb-6">
                        {activeHub.desc}
                      </p>

                      <div className="mb-6">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">
                          Tools & Libraries
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {activeHub.tools.map((t) => (
                            <span
                              key={t}
                              className="px-2.5 py-1 text-xs rounded-md bg-slate-100 border border-white/10 text-slate-400 font-medium"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                        Production Benchmark
                      </span>
                      <span className="text-sm font-bold text-white" style={{ color: activeHub.color }}>
                        {activeHub.metrics}
                      </span>
                    </div>
                  </div>
                </CardTilt>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
