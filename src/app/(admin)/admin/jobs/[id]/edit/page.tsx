'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

export default function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = require('react').use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: '', slug: '', department: '', location: '', type: 'FULL_TIME', experience: '', salary: '', description: '', requirements: '', benefits: '', skills: '', published: false, featured: false });

  useEffect(() => {
    // In production, fetch from API
    setForm({ title: 'Senior Full Stack Developer', slug: 'senior-full-stack-developer', department: 'Engineering', location: 'Remote / San Francisco', type: 'FULL_TIME', experience: '5+ years', salary: '$150,000 - $200,000', description: 'Lead the development of core products...', requirements: '5+ years experience\nStrong React skills\nAWS experience', benefits: 'Competitive salary\nHealth insurance\nFlexible remote', skills: 'React, Node.js, TypeScript, AWS', published: true, featured: false });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`/api/jobs/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, requirements: form.requirements.split('\n').filter(Boolean), benefits: form.benefits.split('\n').filter(Boolean), skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean) }) });
      router.push('/admin/jobs');
    } catch { alert('Error updating job'); }
    finally { setLoading(false); }
  };

  return (
    <div>
      <Link href="/admin/jobs" className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"><ArrowLeft className="h-4 w-4" /> Back to Jobs</Link>
      <h1 className="mb-8 text-2xl font-bold text-white">Edit Job</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div><label className="mb-2 block text-sm font-medium text-slate-300">Title</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500" /></div>
          <div><label className="mb-2 block text-sm font-medium text-slate-300">Slug</label><input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500" /></div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div><label className="mb-2 block text-sm font-medium text-slate-300">Department</label><input value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500" /></div>
          <div><label className="mb-2 block text-sm font-medium text-slate-300">Location</label><input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500" /></div>
        </div>
        <div><label className="mb-2 block text-sm font-medium text-slate-300">Description</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={5} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500 resize-none" /></div>
        <div><label className="mb-2 block text-sm font-medium text-slate-300">Requirements (one per line)</label><textarea value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} rows={5} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500 resize-none" /></div>
        <div><label className="mb-2 block text-sm font-medium text-slate-300">Skills (comma-separated)</label><input value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500" /></div>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm text-slate-300"><input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Published</label>
          <label className="flex items-center gap-2 text-sm text-slate-300"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured</label>
        </div>
        <div className="flex gap-4">
          <button type="submit" disabled={loading} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white disabled:opacity-50"><Save className="h-4 w-4" /> {loading ? 'Saving...' : 'Update Job'}</button>
          <Link href="/admin/jobs" className="rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-300 hover:bg-white/10">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
