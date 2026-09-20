import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  Users,
  Briefcase,
  ShieldCheck,
  AlertTriangle,
  Star,
  CheckCircle2,
  XCircle,
  BarChart3,
  TrendingUp,
  MapPin,
  Send,
  Volume2,
  Filter,
  Search,
  Check,
  Eye,
  Trash2,
  Lock,
} from 'lucide-react';
import { mockStats } from '../../data/mockData';

export const AdminDashboard: React.FC = () => {
  const {
    workers,
    jobs,
    complaints,
    resolveComplaint,
    verifyWorkerStatus,
    broadcastNotification,
    deleteJobByAdmin,
    setCurrentView,
  } = useApp();

  const { t, language } = useLanguage();

  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastTarget, setBroadcastTarget] = useState<'all' | 'worker' | 'employer'>('all');
  const [broadcastSent, setBroadcastSent] = useState(false);

  const pendingComplaints = complaints.filter((c) => c.status === 'pending');
  const unverifiedWorkers = workers.filter((w) => !w.isVerified);
  const activeJobs = jobs.filter((j) => j.status === 'active');

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;

    broadcastNotification('📢 Kaam Sarthi Admin Announcement', broadcastMessage, broadcastTarget);
    setBroadcastMessage('');
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 3000);
  };

  return (
    <div id="admin-dashboard-view" className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Admin Top Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SUPER ADMIN CONSOLE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {t('appName', 'Kaam Sarthi')} Command Center
            </h2>
            <p className="text-xs text-slate-300">
              Real-time platform operations, safety compliance, worker verification, and employment logs
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="admin-quick-users-btn"
              onClick={() => setCurrentView('admin-users')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition border border-slate-700"
            >
              Manage Users
            </button>
            <button
              id="admin-quick-jobs-btn"
              onClick={() => setCurrentView('admin-jobs')}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition shadow-md"
            >
              Moderate Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Platform Live KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase">Total Workers</p>
          <p className="text-xl font-black text-blue-700 mt-1">{mockStats.totalWorkers.toLocaleString()}</p>
          <span className="text-[10px] text-emerald-600 font-bold">↑ +14% this mo</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase">Employers</p>
          <p className="text-xl font-black text-emerald-700 mt-1">{mockStats.totalEmployers.toLocaleString()}</p>
          <span className="text-[10px] text-emerald-600 font-bold">↑ +8% this mo</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase">Total Jobs</p>
          <p className="text-xl font-black text-slate-900 mt-1">{mockStats.totalJobs.toLocaleString()}</p>
          <span className="text-[10px] text-slate-400">All districts</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase">Active Jobs</p>
          <p className="text-xl font-black text-blue-600 mt-1">{activeJobs.length}</p>
          <span className="text-[10px] text-blue-600 font-bold">Live in market</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase">Filled Today</p>
          <p className="text-xl font-black text-emerald-600 mt-1">{mockStats.jobsFilledToday}</p>
          <span className="text-[10px] text-emerald-600 font-bold">Matched & hired</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase">Platform Rating</p>
          <p className="text-xl font-black text-amber-500 mt-1">⭐ {mockStats.platformRating}</p>
          <span className="text-[10px] text-slate-400">98% satisfaction</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase">Safety Alerts</p>
          <p className="text-xl font-black text-rose-600 mt-1">{pendingComplaints.length}</p>
          <span className="text-[10px] text-rose-600 font-bold">Action needed</span>
        </div>
      </div>

      {/* Analytics Breakdown Row: Trades + Districts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trade Skill Distribution */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span>Worker Registrations by Trade Category</span>
            </h3>
            <span className="text-xs text-slate-400">12,480 total</span>
          </div>

          <div className="space-y-3">
            {[
              { skill: 'Masonry (राजमिस्त्री)', pct: 32, count: '3,990', color: 'bg-blue-600' },
              { skill: 'Construction Helper (हेल्पर)', pct: 26, count: '3,244', color: 'bg-emerald-600' },
              { skill: 'Carpentry (बढ़ई)', pct: 14, count: '1,747', color: 'bg-amber-500' },
              { skill: 'Painting (पेंटर)', pct: 12, count: '1,497', color: 'bg-indigo-600' },
              { skill: 'Plumbing & Electrician', pct: 10, count: '1,248', color: 'bg-teal-600' },
              { skill: 'Agriculture & Tractor Driving', pct: 6, count: '748', color: 'bg-rose-500' },
            ].map((item) => (
              <div key={item.skill} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>{item.skill}</span>
                  <span className="text-slate-500">
                    {item.count} ({item.pct}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regional District Activity */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Active Hiring Hubs by District</span>
            </h3>
            <span className="text-xs text-slate-400">Bihar & Jharkhand</span>
          </div>

          <div className="space-y-3">
            {[
              { district: 'Saharsa (सहरसा)', activeJobs: 142, workers: '4,200', fillRate: '94%' },
              { district: 'Dumka (दुमका)', activeJobs: 98, workers: '2,950', fillRate: '91%' },
              { district: 'Muzaffarpur (मुज़फ़्फ़रपुर)', activeJobs: 45, workers: '2,400', fillRate: '89%' },
              { district: 'Deoghar (देवघर)', activeJobs: 18, workers: '1,800', fillRate: '92%' },
              { district: 'Purnia (पूर्णिया)', activeJobs: 9, workers: '1,130', fillRate: '88%' },
            ].map((d) => (
              <div
                key={d.district}
                className="p-3 rounded-2xl bg-slate-50 flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-bold text-slate-900">{d.district}</p>
                  <p className="text-[11px] text-slate-500">{d.workers} verified registered workers</p>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-blue-700">{d.activeJobs} live jobs</span>
                  <p className="text-[10px] text-emerald-700 font-bold">{d.fillRate} match rate</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Safety & Complaints Queue (Section 25) */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-100 text-rose-700">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                Safety & Complaints Moderation Queue
              </h3>
              <p className="text-xs text-slate-500">
                Reports submitted regarding fake jobs, non-payment, or harassment
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
            {pendingComplaints.length} Pending Actions
          </span>
        </div>

        {pendingComplaints.length === 0 ? (
          <div className="text-center py-6 text-xs text-slate-500">
            ✓ All safety reports resolved. Platform is clean.
          </div>
        ) : (
          <div className="space-y-3">
            {pendingComplaints.map((comp) => (
              <div
                key={comp.id}
                className="p-4 rounded-2xl bg-rose-50/40 border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-200 text-rose-900 uppercase">
                      {(comp.type || comp.category || 'general').replace('_', ' ')}
                    </span>
                    <span className="text-slate-400 font-medium">Logged on {comp.createdAt || comp.date || 'Recent'}</span>
                  </div>
                  <p className="font-bold text-slate-900 text-sm">
                    Report by: <span className="text-blue-700">{comp.reportedByName || comp.reporterName}</span> against{' '}
                    <span className="text-rose-700">{comp.targetName}</span>
                  </p>
                  <p className="text-slate-600 bg-white/80 p-2.5 rounded-xl border border-rose-100">
                    “{comp.description}”
                  </p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end gap-2 flex-shrink-0">
                  <button
                    id={`resolve-comp-${comp.id}`}
                    onClick={() => resolveComplaint(comp.id, 'Investigation verified: User cautioned.')}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs transition"
                  >
                    Mark Resolved
                  </button>
                  <button
                    id={`ban-comp-${comp.id}`}
                    onClick={() => resolveComplaint(comp.id, 'Account suspended for platform violation.')}
                    className="px-4 py-2 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-100 text-xs font-bold transition"
                  >
                    Suspend & Ban
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Worker Verification Queue */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Worker Trust & ID Verification Queue</h3>
              <p className="text-xs text-slate-500">
                Grant or revoke verified artisan status based on Aadhaar & Panchayat checks
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            {workers.filter((w) => w.isVerified).length} / {workers.length} Verified
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {workers.map((w) => (
            <div
              key={w.id}
              className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2.5">
                <img src={w.photo} alt={w.name} className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <p className="font-bold text-slate-900">{w.name}</p>
                  <p className="text-[11px] text-slate-500">
                    {w.primarySkill} • {w.location.district}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id={`toggle-worker-verify-${w.id}`}
                  onClick={() => verifyWorkerStatus(w.id, !w.isVerified)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs transition flex items-center gap-1 ${
                    w.isVerified
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-rose-50 hover:text-rose-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{w.isVerified ? 'Verified ✓' : 'Verify ID'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Broadcast Announcement Messenger */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900">Broadcast Public Notice / Helpline Alert</h3>
            <p className="text-xs text-slate-500">
              Send immediate push alerts to workers and employers across all rural districts
            </p>
          </div>
        </div>

        {broadcastSent && (
          <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs font-bold">
            ✓ Broadcast notice sent to all selected active users!
          </div>
        )}

        <form onSubmit={handleBroadcast} className="space-y-3">
          <div className="flex gap-2">
            <select
              value={broadcastTarget}
              onChange={(e) => setBroadcastTarget(e.target.value as any)}
              className="p-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-800"
            >
              <option value="all">Everyone (All Workers & Employers)</option>
              <option value="worker">Workers Only (👷 श्रमिक)</option>
              <option value="employer">Employers Only (💼 नियोक्ता)</option>
            </select>
          </div>

          <div className="relative">
            <textarea
              rows={2}
              required
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)}
              placeholder="e.g. Weather Alert: Safe working hours advised during afternoon heatwave in Saharsa & Dumka districts."
              className="w-full p-3 rounded-2xl border border-slate-200 text-xs font-medium resize-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
            />
          </div>

          <div className="flex justify-end">
            <button
              id="admin-send-broadcast-btn"
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Now</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
