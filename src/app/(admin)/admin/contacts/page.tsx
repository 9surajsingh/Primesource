'use client';

import { useState } from 'react';
import { Mail, Building2, Phone, MessageSquare, CheckCircle2, Clock, Eye, Archive } from 'lucide-react';

const sampleContacts = [
  { id: '1', firstName: 'John', lastName: 'Smith', email: 'john@acmecorp.com', phone: '+1 555-123-4567', company: 'Acme Corp', service: 'IT Staffing', budget: '$50K - $100K', message: 'We need to scale our engineering team by 15 developers within the next quarter. Looking for React and Node.js specialists.', status: 'NEW', createdAt: '2024-11-14T10:30:00Z' },
  { id: '2', firstName: 'Emily', lastName: 'Davis', email: 'emily@techstart.io', phone: '+1 555-234-5678', company: 'TechStart', service: 'Web Development', budget: '$100K - $250K', message: 'We are looking to build a new SaaS platform from scratch. Need full-stack development team for a 6-month project.', status: 'READ', createdAt: '2024-11-13T14:15:00Z' },
  { id: '3', firstName: 'Michael', lastName: 'Johnson', email: 'mjohnson@globalfinance.com', phone: '+1 555-345-6789', company: 'Global Finance', service: 'AI Automation', budget: '$250K+', message: 'Interested in implementing AI-powered fraud detection and automated compliance reporting for our banking operations.', status: 'RESPONDED', createdAt: '2024-11-12T09:00:00Z' },
];

const statusColors: Record<string, string> = {
  NEW: 'bg-blue-500/10 text-blue-400',
  READ: 'bg-yellow-500/10 text-yellow-400',
  RESPONDED: 'bg-green-500/10 text-green-400',
  ARCHIVED: 'bg-slate-500/10 text-slate-400',
};

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState(sampleContacts);
  const [activeStatus, setActiveStatus] = useState('ALL');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const tabs = ['ALL', 'NEW', 'READ', 'RESPONDED', 'ARCHIVED'];
  const filtered = activeStatus === 'ALL' ? contacts : contacts.filter((c) => c.status === activeStatus);

  const updateStatus = (id: string, status: string) => {
    setContacts(contacts.map((c) => c.id === id ? { ...c, status } : c));
  };

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-white">Contact Leads</h1>

      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveStatus(tab)} className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${activeStatus === tab ? 'bg-blue-500 text-white' : 'border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'}`}>
            {tab} {tab !== 'ALL' && `(${contacts.filter((c) => c.status === tab).length})`}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((contact) => (
          <div key={contact.id} className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
            <button onClick={() => setExpandedId(expandedId === contact.id ? null : contact.id)} className="flex w-full items-center justify-between p-6 text-left">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-sm font-bold text-blue-400">
                  {contact.firstName[0]}{contact.lastName[0]}
                </div>
                <div>
                  <p className="font-semibold text-white">{contact.firstName} {contact.lastName}</p>
                  <p className="text-xs text-slate-400">{contact.email} • {contact.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="hidden text-xs text-slate-400 sm:block">{new Date(contact.createdAt).toLocaleDateString()}</span>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[contact.status]}`}>{contact.status}</span>
              </div>
            </button>
            {expandedId === contact.id && (
              <div className="border-t border-white/5 px-6 pb-6">
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4 text-slate-500" /><span className="text-slate-400">{contact.phone}</span></div>
                  <div className="flex items-center gap-2 text-sm"><Building2 className="h-4 w-4 text-slate-500" /><span className="text-slate-400">{contact.service}</span></div>
                  <div className="flex items-center gap-2 text-sm"><MessageSquare className="h-4 w-4 text-slate-500" /><span className="text-slate-400">Budget: {contact.budget}</span></div>
                </div>
                <div className="mt-4 rounded-lg bg-white/5 p-4">
                  <p className="text-sm text-slate-300">{contact.message}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button onClick={() => updateStatus(contact.id, 'READ')} className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-400 hover:bg-white/5"><Eye className="h-3 w-3" /> Mark Read</button>
                  <button onClick={() => updateStatus(contact.id, 'RESPONDED')} className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-400 hover:bg-white/5"><CheckCircle2 className="h-3 w-3" /> Responded</button>
                  <button onClick={() => updateStatus(contact.id, 'ARCHIVED')} className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-400 hover:bg-white/5"><Archive className="h-3 w-3" /> Archive</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
