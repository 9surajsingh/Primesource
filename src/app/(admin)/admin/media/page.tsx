'use client';

import { useState } from 'react';
import { Upload, Image as ImageIcon, Trash2, Copy, CheckCircle2 } from 'lucide-react';

export default function AdminMediaPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Media Manager</h1>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:from-blue-600 hover:to-cyan-600">
          <Upload className="h-4 w-4" /> Upload Files
          <input type="file" multiple accept="image/*" className="hidden" onChange={() => alert('Upload functionality requires backend setup')} />
        </label>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 py-20">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
          <ImageIcon className="h-10 w-10 text-slate-500" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-white">No media files yet</h3>
        <p className="mb-6 max-w-sm text-center text-sm text-slate-400">
          Upload images, documents, and other media files to use across your website content.
        </p>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white hover:from-blue-600 hover:to-cyan-600">
          <Upload className="h-4 w-4" /> Upload Your First File
          <input type="file" multiple accept="image/*" className="hidden" onChange={() => alert('Upload functionality requires backend setup with file storage')} />
        </label>
      </div>

      {/* Info */}
      <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-6">
        <h3 className="mb-3 text-sm font-semibold text-white">Supported File Types</h3>
        <div className="flex flex-wrap gap-2">
          {['JPG', 'PNG', 'GIF', 'SVG', 'WebP', 'PDF', 'MP4'].map((type) => (
            <span key={type} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">{type}</span>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-500">Maximum file size: 10MB. Files are stored in /public/uploads/</p>
      </div>
    </div>
  );
}
