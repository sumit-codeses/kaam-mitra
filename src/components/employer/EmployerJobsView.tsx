import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  Briefcase,
  PlusCircle,
  Users,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  AlertCircle,
  XCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { JobStatus } from '../../types';

export const EmployerJobsView: React.FC = () => {
  const {
    jobs,
    activeEmployer,
    applications,
    updateJobStatus,
    setSelectedJobForDetails,
    setCurrentView,
  } = useApp();

  const { t, language } = useLanguage();
  const [statusFilter, setStatusFilter] = useState<'all' | JobStatus>('all');

  const myJobs = jobs.filter((j) => j.employerId === activeEmployer.id);
  const filteredJobs = myJobs.filter((j) => {
    if (statusFilter === 'all') return true;
    return j.status === statusFilter;
  });

  const getStatusBadge = (status: JobStatus) => {
    switch (status) {
      case 'active':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            🟢 Active Hiring
          </span>
        );
      case 'filled':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
            ✓ Position Filled
          </span>
        );
      case 'completed':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-300">
            ⭐ Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
            Cancelled
          </span>
        );
    }
  };

  return (
    <div id="employer-jobs-view" className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header & Status Filter Tabs */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {t('myJobs', 'Manage My Job Postings')}
            </h2>
            <p className="text-xs text-slate-500">
              {language === 'hi'
                ? 'अपने द्वारा पोस्ट किए गए सभी कामों का प्रबंधन करें'
                : 'Track applicants, hire workers, and close finished projects'}
            </p>
          </div>

          <button
            id="emp-jobs-post-new-btn"
            onClick={() => setCurrentView('post-job')}
            className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-2 self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t('postJob', 'Post a New Job')}</span>
          </button>
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2">
          {(['all', 'active', 'filled', 'completed', 'cancelled'] as const).map((tab) => (
            <button
              key={tab}
              id={`job-status-tab-${tab}`}
              onClick={() => setStatusFilter(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize whitespace-nowrap transition ${
                statusFilter === tab
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab === 'all'
                ? `All Jobs (${myJobs.length})`
                : `${tab} (${myJobs.filter((j) => j.status === tab).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs List */}
      {filteredJobs.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <Briefcase className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-slate-800">No jobs found in this category</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Create a new requirement to connect with thousands of local artisans.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job) => {
            const jobApps = applications.filter((a) => a.jobId === job.id);
            const pendingCount = jobApps.filter((a) => a.status === 'applied').length;

            return (
              <div
                key={job.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-emerald-300 transition shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {getStatusBadge(job.status)}
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-slate-100 text-slate-700">
                        {job.requiredSkill}
                      </span>
                      {job.isUrgent && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-amber-100 text-amber-900">
                          ⚡ Urgent Job
                        </span>
                      )}
                    </div>

                    <h3
                      onClick={() => setSelectedJobForDetails(job)}
                      className="text-base sm:text-lg font-bold text-slate-900 hover:text-emerald-700 cursor-pointer transition leading-snug"
                    >
                      {job.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-0.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{job.location.villageOrCity}, {job.location.district}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{job.workDate} ({job.startTime} - {job.endTime})</span>
                      </span>
                    </div>
                  </div>

                  <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                    <p className="text-xl font-black text-slate-900">
                      ₹{job.payment}
                      <span className="text-xs font-normal text-slate-500"> /{job.paymentType}</span>
                    </p>
                    <p className="text-xs text-slate-500">
                      Hired: <strong>{job.workersHired}/{job.workersNeeded}</strong> Workers
                    </p>
                  </div>
                </div>

                {/* Bottom Actions Bar */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      id={`emp-view-applicants-${job.id}`}
                      onClick={() => setCurrentView('applications')}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shadow-2xs flex items-center gap-1.5"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>{language === 'hi' ? 'आवेदन देखें' : 'View Applicants'} ({jobApps.length})</span>
                      {pendingCount > 0 && (
                        <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black">
                          {pendingCount} new
                        </span>
                      )}
                    </button>

                    <button
                      id={`emp-job-details-btn-${job.id}`}
                      onClick={() => setSelectedJobForDetails(job)}
                      className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700"
                    >
                      {t('viewDetails', 'Job Details')}
                    </button>
                  </div>

                  {/* Status Modification options */}
                  <div className="flex items-center gap-2">
                    {job.status === 'active' && (
                      <button
                        id={`mark-job-completed-${job.id}`}
                        onClick={() => updateJobStatus(job.id, 'completed')}
                        className="px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 text-xs font-bold transition flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                        <span>{language === 'hi' ? 'काम पूरा हुआ' : 'Mark Completed'}</span>
                      </button>
                    )}

                    {job.status === 'active' && (
                      <button
                        id={`close-job-btn-${job.id}`}
                        onClick={() => updateJobStatus(job.id, 'filled')}
                        className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold"
                      >
                        Close / Filled
                      </button>
                    )}

                    {job.status !== 'active' && (
                      <button
                        id={`reopen-job-btn-${job.id}`}
                        onClick={() => updateJobStatus(job.id, 'active')}
                        className="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold transition"
                      >
                        Reopen Job
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
