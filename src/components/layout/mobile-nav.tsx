"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavChild {
  label: string;
  href: string;
  description?: string;
}

interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  hidden: { x: "100%" },
  visible: { x: 0 },
};

const itemVariants = {
  hidden: { x: 30, opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.1 + i * 0.05,
      duration: 0.3,
      ease: "easeOut",
    },
  }),
};

export function MobileNav({ isOpen, onClose, items }: MobileNavProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleExpand = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-sm bg-[#0a0a0f]/95 backdrop-blur-2xl border-l border-white/5 lg:hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <span className="flex items-center">
                <Image
                  src="/images/logo-dark-bg.png"
                  alt="PrimeSource"
                  width={150}
                  height={42}
                  className="h-8 w-auto"
                />
              </span>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-50 hover:bg-white/5 rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 overflow-y-auto py-4 px-4">
              <div className="space-y-1">
                {items.map((item, i) => (
                  <motion.div
                    key={item.label}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {item.children ? (
                      <div>
                        <button
                          onClick={() => toggleExpand(item.label)}
                          className="flex items-center justify-between w-full px-4 py-3 text-base font-medium text-slate-300 hover:text-slate-50 hover:bg-white/5 rounded-lg transition-colors"
                        >
                          {item.label}
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform duration-200",
                              expandedItem === item.label && "rotate-180"
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {expandedItem === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 py-1 space-y-1">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.label}
                                    href={child.href}
                                    onClick={onClose}
                                    className="flex flex-col gap-0.5 px-4 py-2.5 rounded-lg text-sm text-slate-400 hover:text-slate-50 hover:bg-white/5 transition-colors"
                                  >
                                    <span className="font-medium text-slate-300">
                                      {child.label}
                                    </span>
                                    {child.description && (
                                      <span className="text-xs text-slate-500">
                                        {child.description}
                                      </span>
                                    )}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="block px-4 py-3 text-base font-medium text-slate-300 hover:text-slate-50 hover:bg-white/5 rounded-lg transition-colors"
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </nav>

            {/* Bottom CTA */}
            <div className="p-4 border-t border-white/5">
              <Button className="w-full" onClick={onClose} asChild>
                <Link href="/contact">Get Started</Link>
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
