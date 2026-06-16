'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FileText,
  Briefcase,
  FolderKanban,
  Mail,
  TrendingUp,
  TrendingDown,
  Plus,
  ArrowRight,
  Eye,
  Clock,
  User,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const chartData = [
  { name: 'Jan', visits: 4000, leads: 24 },
  { name: 'Feb', visits: 3000, leads: 13 },
  { name: 'Mar', visits: 5000, leads: 32 },
  { name: 'Apr', visits: 4500, leads: 27 },
  { name: 'May', visits: 6000, leads: 38 },
  { name: 'Jun', visits: 5500, leads: 35 },
  { name: 'Jul', visits: 7000, leads: 42 },
];

interface StatCard {
  label: string;
  value: number;
  change: number;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

const statsCards: StatCard[] = [
  {
    label: 'Total Blog Posts',
    value: 24,
    change: 12,
    icon: FileText,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
  {
    label: 'Total Jobs',
    value: 18,
    change: 8,
    icon: Briefcase,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
  },
  {
    label: 'Total Case Studies',
    value: 12,
    change: -3,
    icon: FolderKanban,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
  {
    label: 'Unread Contacts',
    value: 7,
    change: 23,
    icon: Mail,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
  },
];

const recentContacts = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah@techcorp.com', company: 'TechCorp', service: 'IT Staffing', date: '2 hours ago', status: 'new' },
  { id: '2', name: 'Michael Chen', email: 'michael@innovate.io', company: 'Innovate.io', service: 'Web Development', date: '5 hours ago', status: 'new' },
  { id: '3', name: 'Emily Rodriguez', email: 'emily@startup.co', company: 'StartUp Co', service: 'Cloud Solutions', date: '1 day ago', status: 'read' },
  { id: '4', name: 'David Kim', email: 'david@enterprise.com', company: 'Enterprise Inc', service: 'IT Consulting', date: '2 days ago', status: 'responded' },
  { id: '5', name: 'Lisa Wang', email: 'lisa@globaltech.com', company: 'GlobalTech', service: 'DevOps', date: '3 days ago', status: 'read' },
];

const recentApplications = [
  { id: '1', name: 'John Smith', position: 'Senior React Developer', date: '1 hour ago', status: 'pending' },
  { id: '2', name: 'Anna Petrov', position: 'DevOps Engineer', date: '3 hours ago', status: 'reviewing' },
  { id: '3', name: 'Carlos Mendez', position: 'Full Stack Developer', date: '6 hours ago', status: 'pending' },
  { id: '4', name: 'Priya Sharma', position: 'UI/UX Designer', date: '1 day ago', status: 'shortlisted' },
  { id: '5', name: 'James Wilson', position: 'Cloud Architect', date: '1 day ago', status: 'pending' },
];

const quickActions = [
  { label: 'New Post', href: '/admin/blogs/new', icon: FileText, color: 'from-blue-500 to-blue-600' },
  { label: 'New Job', href: '/admin/jobs/new', icon: Briefcase, color: 'from-emerald-500 to-emerald-600' },
  { label: 'New Case Study', href: '/admin/case-studies/new', icon: FolderKanban, color: 'from-purple-500 to-purple-600' },
];

const statusColors: Record<string, string> = {
  new: 'bg-blue-500/20 text-blue-400',
  read: 'bg-gray-500/20 text-gray-400',
  responded: 'bg-green-500/20 text-green-400',
  pending: 'bg-amber-500/20 text-amber-400',
  reviewing: 'bg-blue-500/20 text-blue-400',
  shortlisted: 'bg-emerald-500/20 text-emerald-400',
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function AdminDashboard() {
  const [stats, setStats] = useState(statsCards);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/dashboard/stats');
        if (res.ok) {
          const data = await res.json();
          setStats((prev) =>
            prev.map((card) => {
              if (card.label === 'Total Blog Posts' && data.blogPosts !== undefined) return { ...card, value: data.blogPosts };
              if (card.label === 'Total Jobs' && data.jobs !== undefined) return { ...card, value: data.jobs };
              if (card.label === 'Total Case Studies' && data.caseStudies !== undefined) return { ...card, value: data.caseStudies };
              if (card.label === 'Unread Contacts' && data.unreadContacts !== undefined) return { ...card, value: data.unreadContacts };
              return card;
            })
          );
        }
      } catch {
        // Use default sample data on error
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome back. Here&apos;s what&apos;s happening.</p>
      </div>

      {/* Stats Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              variants={item}
              className="glass rounded-xl p-5 hover:border-white/20 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${stat.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {stat.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {Math.abs(stat.change)}%
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-white">{stat.value.toLocaleString()}</p>
                <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap gap-3"
      >
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              href={action.href}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r ${action.color} text-white text-sm font-medium hover:shadow-lg hover:shadow-primary-500/20 transition-all hover:scale-105`}
            >
              <Plus className="w-4 h-4" />
              {action.label}
            </Link>
          );
        })}
      </motion.div>

      {/* Chart and Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Traffic Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="xl:col-span-2 glass rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Site Traffic</h2>
              <p className="text-sm text-gray-400">Visits and leads over time</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-primary-400" />
                <span className="text-gray-400">Visits</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-accent-cyan" />
                <span className="text-gray-400">Leads</span>
              </div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a2e',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Line type="monotone" dataKey="visits" stroke="#60a5fa" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="leads" stroke="#06b6d4" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-xl p-5"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Eye className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">1,234</p>
                <p className="text-xs text-gray-400">Page views today</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <User className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">56</p>
                <p className="text-xs text-gray-400">New visitors today</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Mail className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">3</p>
                <p className="text-xs text-gray-400">New inquiries today</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Clock className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">4m 32s</p>
                <p className="text-xs text-gray-400">Avg. session duration</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Contacts and Applications */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Recent Contacts</h2>
            <Link href="/admin/contacts" className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentContacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-white">{contact.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{contact.name}</p>
                    <p className="text-xs text-gray-400 truncate">{contact.company} · {contact.service}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColors[contact.status]}`}>
                    {contact.status}
                  </span>
                  <span className="text-xs text-gray-500">{contact.date}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Applications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Recent Applications</h2>
            <Link href="/admin/jobs" className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentApplications.map((app) => (
              <div key={app.id} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-white">{app.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{app.name}</p>
                    <p className="text-xs text-gray-400 truncate">{app.position}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColors[app.status]}`}>
                    {app.status}
                  </span>
                  <span className="text-xs text-gray-500">{app.date}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
