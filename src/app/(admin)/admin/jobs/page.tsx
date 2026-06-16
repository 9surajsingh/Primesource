'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Edit, Trash2, Eye, Briefcase, MapPin, Users as UsersIcon } from 'lucide-react';

const sampleJobs = [
  { id: '1', title: 'Senior Full Stack Developer', department: 'Engineering', location: 'Remote / San Francisco', type: 'Full-Time', published: true, applications: 24 },
  { id: '2', title: 'React Developer', department: 'Engineering', location: 'Remote / New York', type: 'Full-Time', published: true, applications: 18 },
  { id: '3', title: 'DevOps Engineer', department: 'Infrastructure', location: 'Remote', type: 'Full-Time', published: true, applications: 12 },
  { id: '4', title: 'Data Scientist', department: 'AI & Data', location: 'Remote / Boston', type: 'Full-Time', published: true, applications: 15 },
  { id: '5', title: 'Project Manager', department: 'Operations', location: 'San Francisco', type: 'Full-Time', published: false, applications: 8 },
  { id: '6', title: 'UI/UX Designer', department: 'Design', location: 'Remote / Austin', type: 'Full-Time', published: true, applications: 22 },
  { id: '7', title: 'Mobile Developer', department: 'Engineering', location: 'Remote', type: 'Contract', published: true, applications: 10 },
  { id: '8', title: 'AI/ML Engineer', department: 'AI & Data', location: 'Remote / Seattle', type: 'Full-Time', published: true, applications: 19 },
];

export default function AdminJobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState(sampleJobs);
  const filtered = jobs.filter((j) => j.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this job?')) {
      setJobs(jobs.filter((j) => j.id !== id));
    }
  };

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-white">Job Listings</h1>
        <Link href="/admin/jobs/new" className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:from-blue-600 hover:to-cyan-600">
          <Plus className="h-4 w-4" /> New Job
        </Link>
      </div>

      <div className="mb-6 flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-2">
        <Search className="h-4 w-4 text-slate-400" />
        <input type="text" placeholder="Search jobs..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-transparent text-sm text-white placeholder-slate-500 outline-none" />
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-6 py-4 text-left font-semibold text-slate-400">Title</th>
              <th className="px-6 py-4 text-left font-semibold text-slate-400">Department</th>
              <th className="px-6 py-4 text-left font-semibold text-slate-400">Location</th>
              <th className="px-6 py-4 text-left font-semibold text-slate-400">Type</th>
              <th className="px-6 py-4 text-left font-semibold text-slate-400">Status</th>
              <th className="px-6 py-4 text-left font-semibold text-slate-400">Applications</th>
              <th className="px-6 py-4 text-left font-semibold text-slate-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((job) => (
              <tr key={job.id} className="border-b border-white/5 transition-colors hover:bg-white/5">
                <td className="px-6 py-4 font-medium text-white">{job.title}</td>
                <td className="px-6 py-4 text-slate-400">{job.department}</td>
                <td className="px-6 py-4 text-slate-400">{job.location}</td>
                <td className="px-6 py-4"><span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">{job.type}</span></td>
                <td className="px-6 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${job.published ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                    {job.published ? 'Active' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-400">{job.applications}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/jobs/${job.id}/edit`} className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"><Edit className="h-4 w-4" /></Link>
                    <button onClick={() => handleDelete(job.id)} className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
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
