'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

export default function NewJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');

  const generateSlug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.get('title'),
          slug: formData.get('slug'),
          department: formData.get('department'),
          location: formData.get('location'),
          type: formData.get('type'),
          experience: formData.get('experience'),
          salary: formData.get('salary'),
          description: formData.get('description'),
          requirements: (formData.get('requirements') as string).split('\n').filter(Boolean),
          benefits: (formData.get('benefits') as string).split('\n').filter(Boolean),
          skills: (formData.get('skills') as string).split(',').map((s) => s.trim()).filter(Boolean),
          published: formData.get('published') === 'on',
          featured: formData.get('featured') === 'on',
        }),
      });
      router.push('/admin/jobs');
    } catch (err) {
      alert('Error creating job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Link href="/admin/jobs" className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Back to Jobs
      </Link>
      <h1 className="mb-8 text-2xl font-bold text-white">New Job Listing</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Title</label>
            <input name="title" value={title} onChange={(e) => { setTitle(e.target.value); setSlug(generateSlug(e.target.value)); }} required className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Slug</label>
            <input name="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500" />
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Department</label>
            <input name="department" required className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Location</label>
            <input name="location" required className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500" />
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Type</label>
            <select name="type" className="w-full rounded-lg border border-white/10 bg-[#0a0a0f] px-4 py-3 text-sm text-white outline-none focus:border-blue-500">
              <option value="FULL_TIME">Full-Time</option>
              <option value="PART_TIME">Part-Time</option>
              <option value="CONTRACT">Contract</option>
              <option value="FREELANCE">Freelance</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Experience</label>
            <input name="experience" placeholder="e.g., 5+ years" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Salary</label>
            <input name="salary" placeholder="e.g., $120K - $160K" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500" />
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Description</label>
          <textarea name="description" rows={5} required className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500 resize-none" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Requirements (one per line)</label>
          <textarea name="requirements" rows={5} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500 resize-none" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Benefits (one per line)</label>
          <textarea name="benefits" rows={4} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500 resize-none" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Skills (comma-separated)</label>
          <input name="skills" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500" />
        </div>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm text-slate-300"><input type="checkbox" name="published" className="rounded" /> Published</label>
          <label className="flex items-center gap-2 text-sm text-slate-300"><input type="checkbox" name="featured" className="rounded" /> Featured</label>
        </div>
        <div className="flex gap-4">
          <button type="submit" disabled={loading} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50">
            <Save className="h-4 w-4" /> {loading ? 'Saving...' : 'Save Job'}
          </button>
          <Link href="/admin/jobs" className="rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-300 hover:bg-white/10">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
