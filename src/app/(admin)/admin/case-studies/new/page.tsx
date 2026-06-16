'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

export default function NewCaseStudyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');

  const generateSlug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      await fetch('/api/case-studies', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: fd.get('title'), slug: fd.get('slug'), client: fd.get('client'), industry: fd.get('industry'), excerpt: fd.get('excerpt'), challenge: fd.get('challenge'), solution: fd.get('solution'), results: fd.get('results'), coverImage: fd.get('coverImage'), technologies: (fd.get('technologies') as string).split(',').map((s) => s.trim()).filter(Boolean), testimonial: fd.get('testimonial'), testimonialAuthor: fd.get('testimonialAuthor'), testimonialRole: fd.get('testimonialRole'), published: fd.get('published') === 'on', featured: fd.get('featured') === 'on' }),
      });
      router.push('/admin/case-studies');
    } catch { alert('Error creating case study'); }
    finally { setLoading(false); }
  };

  return (
    <div>
      <Link href="/admin/case-studies" className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"><ArrowLeft className="h-4 w-4" /> Back</Link>
      <h1 className="mb-8 text-2xl font-bold text-white">New Case Study</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div><label className="mb-2 block text-sm font-medium text-slate-300">Title</label><input name="title" value={title} onChange={(e) => { setTitle(e.target.value); setSlug(generateSlug(e.target.value)); }} required className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500" /></div>
          <div><label className="mb-2 block text-sm font-medium text-slate-300">Slug</label><input name="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500" /></div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div><label className="mb-2 block text-sm font-medium text-slate-300">Client</label><input name="client" required className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500" /></div>
          <div><label className="mb-2 block text-sm font-medium text-slate-300">Industry</label><input name="industry" required className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500" /></div>
        </div>
        <div><label className="mb-2 block text-sm font-medium text-slate-300">Excerpt</label><textarea name="excerpt" rows={2} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500 resize-none" /></div>
        <div><label className="mb-2 block text-sm font-medium text-slate-300">Challenge</label><textarea name="challenge" rows={4} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500 resize-none" /></div>
        <div><label className="mb-2 block text-sm font-medium text-slate-300">Solution</label><textarea name="solution" rows={4} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500 resize-none" /></div>
        <div><label className="mb-2 block text-sm font-medium text-slate-300">Results</label><textarea name="results" rows={4} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500 resize-none" /></div>
        <div><label className="mb-2 block text-sm font-medium text-slate-300">Cover Image URL</label><input name="coverImage" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500" /></div>
        <div><label className="mb-2 block text-sm font-medium text-slate-300">Technologies (comma-separated)</label><input name="technologies" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500" /></div>
        <div><label className="mb-2 block text-sm font-medium text-slate-300">Testimonial Quote</label><textarea name="testimonial" rows={3} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500 resize-none" /></div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div><label className="mb-2 block text-sm font-medium text-slate-300">Testimonial Author</label><input name="testimonialAuthor" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500" /></div>
          <div><label className="mb-2 block text-sm font-medium text-slate-300">Author Role</label><input name="testimonialRole" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500" /></div>
        </div>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm text-slate-300"><input type="checkbox" name="published" /> Published</label>
          <label className="flex items-center gap-2 text-sm text-slate-300"><input type="checkbox" name="featured" /> Featured</label>
        </div>
        <div className="flex gap-4">
          <button type="submit" disabled={loading} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white disabled:opacity-50"><Save className="h-4 w-4" /> {loading ? 'Saving...' : 'Save'}</button>
          <Link href="/admin/case-studies" className="rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm text-slate-300 hover:bg-white/10">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
