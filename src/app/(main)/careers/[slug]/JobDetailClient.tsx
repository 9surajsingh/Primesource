'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, MapPin, Briefcase, Clock, DollarSign, CheckCircle2, Send, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary: string | null;
  description: string;
  requirements: string[];
  benefits: string[];
  skills: string[];
}

interface JobDetailClientProps {
  job: Job;
}

export default function JobDetailClient({ job }: JobDetailClientProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      resume: formData.get('resume') as string,
      coverLetter: formData.get('coverLetter') as string,
      linkedIn: formData.get('linkedIn') as string,
      portfolio: formData.get('portfolio') as string,
    };

    try {
      const response = await fetch(`/api/jobs/${job.id}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit application');
      }

      setSubmitted(true);
      toast.success('Application submitted successfully!');
    } catch (err: any) {
      setError(err.message || 'An error occurred while submitting your application.');
      toast.error(err.message || 'Submission failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden bg-[#0a0a0f] border-b border-white/5 pb-12 pt-32 lg:pt-40">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/careers" className="mb-8 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to Careers
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="mb-4 inline-block rounded-full bg-blue-500/10 px-4 py-1 text-sm font-medium text-blue-300">{job.department}</span>
            <h1 className="mb-6 text-3xl font-bold text-white sm:text-4xl">{job.title}</h1>
            <div className="flex flex-wrap gap-6 text-sm text-slate-400">
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-slate-400" />{job.location}</span>
              <span className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-slate-400" />{job.type}</span>
              <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-slate-400" />{job.experience}</span>
              {job.salary && (
                <span className="flex items-center gap-2"><DollarSign className="h-4 w-4 text-slate-400" />{job.salary}</span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#08080c] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-12">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <h2 className="mb-4 text-2xl font-bold text-white">About the Role</h2>
                <div 
                  className="text-lg leading-relaxed text-slate-400 prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: job.description }}
                />
              </motion.div>

              {job.requirements.length > 0 && (
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                  <h2 className="mb-4 text-2xl font-bold text-white">Requirements</h2>
                  <ul className="space-y-3">
                    {job.requirements.map((req) => (
                      <li key={req} className="flex items-start gap-3 text-slate-400">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-500" />{req}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {job.benefits.length > 0 && (
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                  <h2 className="mb-4 text-2xl font-bold text-white">Benefits</h2>
                  <ul className="space-y-3">
                    {job.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-slate-400">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />{b}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {job.skills.length > 0 && (
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-white">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((s) => (
                      <span key={s} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300">{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Application Form */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="sticky top-32 rounded-2xl border border-white/10 bg-white/[0.02] p-8 shadow-xl shadow-black/20"
              >
                <h3 className="mb-6 text-xl font-bold text-white">Apply for this Role</h3>
                {submitted ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green-500" />
                    <p className="text-lg font-semibold text-white">Application Submitted!</p>
                    <p className="mt-2 text-sm text-slate-400">We'll review your application and get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-400">
                        <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                        <span>{error}</span>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      <input name="firstName" type="text" placeholder="First Name" required className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 placeholder-slate-400 outline-none focus:border-blue-500 focus:bg-[#0a0a0f] transition-all" />
                      <input name="lastName" type="text" placeholder="Last Name" required className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 placeholder-slate-400 outline-none focus:border-blue-500 focus:bg-[#0a0a0f] transition-all" />
                    </div>
                    <input name="email" type="email" placeholder="Email" required className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 placeholder-slate-400 outline-none focus:border-blue-500 focus:bg-[#0a0a0f] transition-all" />
                    <input name="phone" type="tel" placeholder="Phone" required className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 placeholder-slate-400 outline-none focus:border-blue-500 focus:bg-[#0a0a0f] transition-all" />
                    <input name="resume" type="url" placeholder="Resume URL (e.g. PDF Link)" required className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 placeholder-slate-400 outline-none focus:border-blue-500 focus:bg-[#0a0a0f] transition-all" />
                    <input name="linkedIn" type="url" placeholder="LinkedIn Profile URL (Optional)" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 placeholder-slate-400 outline-none focus:border-blue-500 focus:bg-[#0a0a0f] transition-all" />
                    <input name="portfolio" type="url" placeholder="Portfolio URL (Optional)" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 placeholder-slate-400 outline-none focus:border-blue-500 focus:bg-[#0a0a0f] transition-all" />
                    <textarea name="coverLetter" placeholder="Cover Letter" rows={4} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 placeholder-slate-400 outline-none focus:border-blue-500 focus:bg-[#0a0a0f] transition-all resize-none" />
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-blue-500/10 disabled:opacity-50"
                    >
                      {loading ? 'Submitting...' : <><Send className="h-4 w-4" /> Submit Application</>}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
