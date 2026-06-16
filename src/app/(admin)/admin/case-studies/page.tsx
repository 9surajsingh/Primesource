'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

const sampleStudies = [
  { id: '1', title: 'Enterprise Digital Transformation', client: 'GlobalRetail Corp', industry: 'Retail', published: true },
  { id: '2', title: 'AI-Powered Recruitment Platform', client: 'TalentFlow Inc', industry: 'Technology', published: true },
  { id: '3', title: 'E-Commerce Mobile App', client: 'ShopEase', industry: 'E-Commerce', published: true },
  { id: '4', title: 'Cloud Migration & Modernization', client: 'FinanceFirst Bank', industry: 'Finance', published: true },
];

export default function AdminCaseStudiesPage() {
  const [studies, setStudies] = useState(sampleStudies);
  const [searchQuery, setSearchQuery] = useState('');
  const filtered = studies.filter((s) => s.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-white">Case Studies</h1>
        <Link href="/admin/case-studies/new" className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white hover:from-blue-600 hover:to-cyan-600">
          <Plus className="h-4 w-4" /> New Case Study
        </Link>
      </div>
      <div className="mb-6 flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-2">
        <Search className="h-4 w-4 text-slate-400" />
        <input type="text" placeholder="Search case studies..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-transparent text-sm text-white placeholder-slate-500 outline-none" />
      </div>
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-white/10">
            <th className="px-6 py-4 text-left font-semibold text-slate-400">Title</th>
            <th className="px-6 py-4 text-left font-semibold text-slate-400">Client</th>
            <th className="px-6 py-4 text-left font-semibold text-slate-400">Industry</th>
            <th className="px-6 py-4 text-left font-semibold text-slate-400">Status</th>
            <th className="px-6 py-4 text-left font-semibold text-slate-400">Actions</th>
          </tr></thead>
          <tbody>
            {filtered.map((study) => (
              <tr key={study.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="px-6 py-4 font-medium text-white">{study.title}</td>
                <td className="px-6 py-4 text-slate-400">{study.client}</td>
                <td className="px-6 py-4 text-slate-400">{study.industry}</td>
                <td className="px-6 py-4"><span className={`rounded-full px-3 py-1 text-xs font-medium ${study.published ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>{study.published ? 'Published' : 'Draft'}</span></td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/case-studies/${study.id}/edit`} className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"><Edit className="h-4 w-4" /></Link>
                    <button onClick={() => setStudies(studies.filter((s) => s.id !== study.id))} className="rounded-lg p-2 text-slate-400 hover:bg-red-500/10 hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
