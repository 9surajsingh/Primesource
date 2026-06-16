'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { PageHero } from '@/components/shared/page-hero';
import { BlogCard } from '@/components/shared/blog-card';
import { CTASection } from '@/components/shared/cta-section';

interface Author {
  name: string;
  avatar: string | null;
}

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string | null;
  featured: boolean;
  createdAt: Date | string;
  author: Author;
}

interface BlogClientProps {
  posts: BlogPost[];
  categories: string[];
}

export default function BlogClient({ posts, categories }: BlogClientProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  const featuredPost = posts.find((p) => p.featured);
  const filteredPosts = activeCategory === 'All' 
    ? posts.filter((p) => !p.featured) 
    : posts.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase() && !p.featured);

  return (
    <>
      <PageHero
        title="Blog & Insights"
        description="Expert insights on technology, staffing, and digital transformation to help you stay ahead of the curve."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog' },
        ]}
      />

      <section className="bg-[#0a0a0f] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Featured Post */}
          {featuredPost && activeCategory === 'All' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16">
              <BlogCard 
                title={featuredPost.title}
                excerpt={featuredPost.excerpt}
                coverImage={featuredPost.coverImage || '/images/blog/placeholder.jpg'}
                category={featuredPost.category}
                author={{
                  name: featuredPost.author.name,
                  avatar: featuredPost.author.avatar || undefined
                }}
                date={new Date(featuredPost.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                readTime="6 min read"
                slug={featuredPost.slug}
                featured
              />
            </motion.div>
          )}

          {/* Category Filter */}
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                  activeCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-blue-500 text-white'
                    : 'border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <BlogCard 
                  title={post.title}
                  excerpt={post.excerpt}
                  coverImage={post.coverImage || '/images/blog/placeholder.jpg'}
                  category={post.category}
                  author={{
                    name: post.author.name,
                    avatar: post.author.avatar || undefined
                  }}
                  date={new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  readTime="6 min read"
                  slug={post.slug}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Stay Updated"
        description="Subscribe to our newsletter for the latest insights on technology and staffing."
        primaryAction={{ label: 'Subscribe', href: '#newsletter' }}
        secondaryAction={{ label: 'Contact Us', href: '/contact' }}
      />
    </>
  );
}
