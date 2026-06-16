"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Twitter, Linkedin, Github, Instagram, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NewsletterForm } from "@/components/shared/newsletter-form";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about#team" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Partners", href: "/partners" },
  ],
  services: [
    { label: "Staffing Solutions", href: "/services/staffing" },
    { label: "Web Development", href: "/services/web-development" },
    { label: "Mobile Development", href: "/services/mobile-development" },
    { label: "AI & Automation", href: "/services/ai-automation" },
    { label: "Consulting", href: "/services/consulting" },
  ],
  resources: [
    { label: "Blog", href: "/blog" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Documentation", href: "/docs" },
    { label: "Help Center", href: "/help" },
    { label: "API", href: "/api" },
  ],
  contact: [
    { label: "hello@primesource.com", href: "mailto:hello@primesource.com" },
    { label: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { label: "New York, NY", href: "/contact" },
    { label: "San Francisco, CA", href: "/contact" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/primesource", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/primesource", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/primesource", label: "GitHub" },
  { icon: Instagram, href: "https://instagram.com/primesource", label: "Instagram" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-[#0a0a0f]/90 backdrop-blur-xl">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/[0.01] to-transparent pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">
            {/* Brand + Newsletter */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Link href="/" className="inline-flex items-center mb-4">
                <Image
                  src="/images/logo-dark-bg.png"
                  alt="PrimeSource - IT Service & Consulting Pvt Ltd"
                  width={160}
                  height={44}
                  className="h-9 w-auto"
                />
              </Link>
              <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-xs">
                Empowering businesses with exceptional talent and cutting-edge technology solutions since 2018.
              </p>
              <div className="mb-6">
                <p className="text-sm font-medium text-slate-200 mb-3">
                  Subscribe to our newsletter
                </p>
                <NewsletterForm />
              </div>
              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all duration-200"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Company */}
            <motion.div variants={itemVariants}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Company
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-blue-400 transition-colors duration-200 inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div variants={itemVariants}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Services
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-blue-400 transition-colors duration-200 inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div variants={itemVariants}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Resources
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-blue-400 transition-colors duration-200 inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div variants={itemVariants}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Contact
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.contact.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-blue-400 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        <Separator className="bg-white/5" />

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-slate-500">
            &copy; {currentYear} PrimeSource. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-slate-400 hover:text-slate-250 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-slate-400 hover:text-slate-250 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-xs text-slate-400 hover:text-slate-250 transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
