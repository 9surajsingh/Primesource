'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';

const blogFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  slug: z.string().min(1, 'Slug is required').max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'),
  excerpt: z.string().min(1, 'Excerpt is required').max(500, 'Excerpt too long'),
  content: z.string().min(1, 'Content is required'),
  category: z.string().min(1, 'Category is required'),
  tags: z.string().default(''),
  coverImage: z.string().url('Must be a valid URL').or(z.literal('')).default(''),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
});

type BlogFormData = z.infer<typeof blogFormSchema>;

const categories = [
  'Technology',
  'Cloud',
  'DevOps',
  'Engineering',
  'Staffing',
  'Security',
  'AI & ML',
  'Industry News',
];

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: '',
      tags: '',
      coverImage: '',
      published: false,
      featured: false,
    },
  });

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        if (!res.ok) throw new Error('Failed to fetch post');
        const post = await res.json();

        reset({
          title: post.title || '',
          slug: post.slug || '',
          excerpt: post.excerpt || '',
          content: post.content || '',
          category: post.category || '',
          tags: Array.isArray(post.tags) ? post.tags.join(', ') : '',
          coverImage: post.coverImage || '',
          published: post.published || false,
          featured: post.featured || false,
        });
      } catch (error) {
        setSubmitError('Failed to load blog post data');
      } finally {
        setIsLoading(false);
      }
    }
    fetchPost();
  }, [id, reset]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setValue('title', title);
    setValue('slug', generateSlug(title));
  };

  const onSubmit = async (data: BlogFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        ...data,
        tags: data.tags ? data.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
        coverImage: data.coverImage || undefined,
      };

      const res = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to update blog post');
      }

      router.push('/admin/blogs');
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary-400" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/blogs"
          className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Blog Post</h1>
          <p className="text-gray-400 mt-1">Update the blog post details</p>
        </div>
      </div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {submitError && (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {submitError}
          </div>
        )}

        {/* Title & Slug */}
        <div className="glass rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">Basic Information</h2>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Title *</label>
            <input
              type="text"
              {...register('title')}
              onChange={handleTitleChange}
              placeholder="Enter post title"
              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-primary-500/50 focus:bg-white/[0.07] transition-all text-sm"
            />
            {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Slug *</label>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm">/blog/</span>
              <input
                type="text"
                {...register('slug')}
                placeholder="post-slug"
                className="flex-1 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-primary-500/50 focus:bg-white/[0.07] transition-all text-sm"
              />
            </div>
            {errors.slug && <p className="text-red-400 text-xs mt-1">{errors.slug.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Excerpt *</label>
            <textarea
              {...register('excerpt')}
              placeholder="Brief summary of the post"
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-primary-500/50 focus:bg-white/[0.07] transition-all text-sm resize-none"
            />
            {errors.excerpt && <p className="text-red-400 text-xs mt-1">{errors.excerpt.message}</p>}
          </div>
        </div>

        {/* Content */}
        <div className="glass rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">Content</h2>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Body Content *</label>
            <textarea
              {...register('content')}
              placeholder="Write your blog post content here... (Markdown supported)"
              rows={16}
              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-primary-500/50 focus:bg-white/[0.07] transition-all text-sm font-mono resize-y"
            />
            {errors.content && <p className="text-red-400 text-xs mt-1">{errors.content.message}</p>}
          </div>
        </div>

        {/* Metadata */}
        <div className="glass rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">Metadata</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Category *</label>
              <select
                {...register('category')}
                className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-primary-500/50 focus:bg-white/[0.07] transition-all text-sm appearance-none cursor-pointer"
              >
                <option value="" className="bg-surface">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-surface">{cat}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Tags</label>
              <input
                type="text"
                {...register('tags')}
                placeholder="react, nextjs, typescript"
                className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-primary-500/50 focus:bg-white/[0.07] transition-all text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">Comma-separated list of tags</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Cover Image URL</label>
            <input
              type="text"
              {...register('coverImage')}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-primary-500/50 focus:bg-white/[0.07] transition-all text-sm"
            />
            {errors.coverImage && <p className="text-red-400 text-xs mt-1">{errors.coverImage.message}</p>}
          </div>
        </div>

        {/* Publishing Options */}
        <div className="glass rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">Publishing</h2>

          <div className="flex flex-col sm:flex-row gap-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input type="checkbox" {...register('published')} className="sr-only peer" />
                <div className="w-10 h-5 rounded-full bg-white/10 peer-checked:bg-primary-500 transition-colors" />
                <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
              </div>
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Published</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input type="checkbox" {...register('featured')} className="sr-only peer" />
                <div className="w-10 h-5 rounded-full bg-white/10 peer-checked:bg-amber-500 transition-colors" />
                <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
              </div>
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Featured</span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pb-6">
          <Link
            href="/admin/blogs"
            className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-primary-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Update Post
              </>
            )}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
