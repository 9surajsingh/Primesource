'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User, Share2, Twitter, Linkedin, Copy } from 'lucide-react';
import { NewsletterForm } from '@/components/shared/newsletter-form';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

interface Author {
  name: string;
  avatar: string | null;
}

interface BlogPost {
  title: string;
  category: string;
  content: string; // Markdown content
  createdAt: Date | string;
  coverImage?: string | null;
  author: Author;
}

interface BlogDetailClientProps {
  post: BlogPost;
}

export default function BlogDetailClient({ post }: BlogDetailClientProps) {
  const authorInitials = post.author.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0a0a0f] border-b border-white/5 pb-12 pt-32 lg:pt-40">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="mb-4 inline-block rounded-full bg-blue-500/10 px-4 py-1 text-sm font-medium text-blue-300">{post.category}</span>
            <h1 className="mb-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
              <span className="flex items-center gap-2"><User className="h-4 w-4 text-slate-400" />{post.author.name}</span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-400" />
                {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-slate-400" />6 min read</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-[#08080c] py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          {post.coverImage && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-12 relative aspect-[21/9] w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
            >
              <Image 
                src={post.coverImage} 
                alt={post.title} 
                fill 
                className="object-cover"
                priority
              />
            </motion.div>
          )}

          <div className="lg:flex lg:gap-12">
            <motion.article
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-slate-300 prose-a:text-blue-400 prose-strong:text-white prose-ul:text-slate-300 prose-ol:text-slate-300 prose-li:marker:text-blue-500"
            >
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </motion.article>
          </div>

          {/* Author Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 rounded-2xl border border-white/10 bg-white/5 p-8"
          >
            <div className="flex items-start gap-6">
              {post.author.avatar ? (
                <img src={post.author.avatar} alt={post.author.name} className="h-16 w-16 rounded-full object-cover shrink-0" />
              ) : (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-xl font-bold text-white">
                  {authorInitials}
                </div>
              )}
              <div>
                <p className="text-lg font-bold text-white">{post.author.name}</p>
                <p className="mt-2 text-slate-400">
                  Author at PrimeSource, sharing technical expertise, staffing strategies, and insights on the future of work and technology.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Share */}
          <div className="mt-8 flex items-center gap-4">
            <span className="text-sm font-medium text-slate-500">Share this article:</span>
            <div className="flex gap-3">
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all hover:bg-white/10 hover:text-white hover:border-white/20"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a 
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&title=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all hover:bg-white/10 hover:text-white hover:border-white/20"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <button 
                onClick={handleCopyLink}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all hover:bg-white/10 hover:text-white hover:border-white/20"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8 text-center lg:p-12"
          >
            <h3 className="mb-3 text-2xl font-bold text-white">Subscribe to Our Newsletter</h3>
            <p className="mb-6 text-slate-400">Get the latest insights delivered straight to your inbox. No spam, ever.</p>
            <div className="mx-auto max-w-md">
              <NewsletterForm />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
