import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  Briefcase,
  Search,
  Trash2,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  AlertTriangle,
  Eye,
} from 'lucide-react';
import { JobStatus } from '../../types';

export const AdminJobsView: React.FC = () => {
  const { jobs, updateJobStatus, deleteJobByAdmin, setSelectedJobForDetails } = useApp();
  const { t } = useLanguage();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | JobStatus>('all');

  const filteredJobs = jobs.filter((j) => {
    if (statusFilter !== 'all' && j.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        j.title.toLowerCase().includes(q) ||
        j.employerName.toLowerCase().includes(q) ||
        j.requiredSkill.toLowerCase().includes(q) ||
        j.location.district.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div id="admin-jobs-view" className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">Job Moderation & Control</h2>
            <p className="text-xs text-slate-500">
              Audit listings, remove spam/exploitative postings, and oversee market fairness
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="p-2 rounded-xl border border-slate-200 text-xs font-bold bg-white"
            >
              <option value="all">All Statuses ({jobs.length})</option>
              <option value="active">Active ({jobs.filter((j) => j.status === 'active').length})</option>
              <option value="filled">Filled ({jobs.filter((j) => j.status === 'filled').length})</option>
              <option value="completed">Completed ({jobs.filter((j) => j.status === 'completed').length})</option>
            </select>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search listings by job title, contractor name, or district..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-xs font-semibold focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
          />
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
              <tr>
                <th className="p-4">Job Title & Trade</th>
                <th className="p-4">Employer / Contractor</th>
                <th className="p-4">Location</th>
                <th className="p-4">Pay & Workers</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-4 max-w-xs">
                    <p
                      onClick={() => setSelectedJobForDetails(job)}
                      className="font-bold text-slate-900 hover:text-purple-700 cursor-pointer line-clamp-1"
                    >
                      {job.title}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="px-2 py-0.2 rounded-md bg-blue-50 text-blue-800 text-[10px] font-bold">
                        {job.requiredSkill}
                      </span>
                      {job.isUrgent && (
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 rounded">
                          ⚡ Urgent
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-slate-800">{job.employerName}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-slate-700">{job.location.villageOrCity}</span>
                    <span className="block text-[10px] text-slate-400">{job.location.district}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-slate-900">₹{job.payment}/{job.paymentType}</span>
                    <span className="block text-[10px] text-slate-400">
                      {job.workersHired}/{job.workersNeeded} hired
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                        job.status === 'active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : job.status === 'completed'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedJobForDetails(job)}
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100"
                        title="View Full Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {job.status === 'active' && (
                        <button
                          onClick={() => updateJobStatus(job.id, 'filled')}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px]"
                        >
                          Close
                        </button>
                      )}

                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to remove this job from the platform?')) {
                            deleteJobByAdmin(job.id);
                          }
                        }}
                        className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50"
                        title="Delete Fake / Violating Job"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
