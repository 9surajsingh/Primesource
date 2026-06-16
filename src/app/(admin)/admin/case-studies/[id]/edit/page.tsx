'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EditCaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = require('react').use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: 'Enterprise Digital Transformation', slug: 'enterprise-digital-transformation', client: 'GlobalRetail Corp', industry: 'Retail',
    excerpt: 'Modernized legacy systems...', challenge: 'Legacy systems...', solution: 'Comprehensive transformation...', results: 'Extraordinary results...',
    coverImage: '', technologies: 'React, Next.js, AWS', testimonial: 'Amazing work...', testimonialAuthor: 'Sarah Chen', testimonialRole: 'CTO',
    published: true, featured: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`/api/case-studies/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, technologies: form.technologies.split(',').map((s) => s.trim()) }) });
      router.push('/admin/case-studies');
    } catch { alert('Error'); } finally { setLoading(false); }
  };

  return (
    <div>
      <Link href="/admin/case-studies" className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"><ArrowLeft className="h-4 w-4" /> Back</Link>
      <h1 className="mb-8 text-2xl font-bold text-white">Edit Case Study</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div><label className="mb-2 block text-sm font-medium text-slate-300">Title</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500" /></div>
          <div><label className="mb-2 block text-sm font-medium text-slate-300">Client</label><input value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500" /></div>
        </div>
        <div><label className="mb-2 block text-sm font-medium text-slate-300">Challenge</label><textarea value={form.challenge} onChange={(e) => setForm({ ...form, challenge: e.target.value })} rows={4} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500 resize-none" /></div>
        <div><label className="mb-2 block text-sm font-medium text-slate-300">Solution</label><textarea value={form.solution} onChange={(e) => setForm({ ...form, solution: e.target.value })} rows={4} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500 resize-none" /></div>
        <div><label className="mb-2 block text-sm font-medium text-slate-300">Results</label><textarea value={form.results} onChange={(e) => setForm({ ...form, results: e.target.value })} rows={4} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500 resize-none" /></div>
        <div><label className="mb-2 block text-sm font-medium text-slate-300">Technologies</label><input value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500" /></div>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm text-slate-300"><input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Published</label>
          <label className="flex items-center gap-2 text-sm text-slate-300"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured</label>
        </div>
        <div className="flex gap-4">
          <button type="submit" disabled={loading} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white disabled:opacity-50"><Save className="h-4 w-4" /> {loading ? 'Saving...' : 'Update'}</button>
          <Link href="/admin/case-studies" className="rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm text-slate-300 hover:bg-white/10">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
