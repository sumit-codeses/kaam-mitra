import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  FileText,
  CheckCircle2,
  XCircle,
  Sparkles,
  Star,
  MapPin,
  Calendar,
  Phone,
  MessageSquare,
  Award,
  Filter,
} from 'lucide-react';
import { ApplicationStatus } from '../../types';

export const EmployerApplicationsView: React.FC = () => {
  const {
    applications,
    jobs,
    activeEmployer,
    updateApplicationStatus,
    openChat,
    openReviewModal,
  } = useApp();

  const { t, language } = useLanguage();
  const [statusFilter, setStatusFilter] = useState<'all' | ApplicationStatus>('all');
  const [selectedJobId, setSelectedJobId] = useState<string>('all');

  // Filter applications for this employer's jobs
  const myJobIds = jobs.filter((j) => j.employerId === activeEmployer.id).map((j) => j.id);
  const myEmployerApps = applications.filter((a) => myJobIds.includes(a.jobId));

  const filteredApps = myEmployerApps.filter((a) => {
    if (statusFilter !== 'all' && a.status !== statusFilter) return false;
    if (selectedJobId !== 'all' && a.jobId !== selectedJobId) return false;
    return true;
  });

  return (
    <div id="employer-applications-view" className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header & Filter Toolbar */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {t('newApplications', 'Worker Job Applications')}
            </h2>
            <p className="text-xs text-slate-500">
              {language === 'hi'
                ? 'आवेदक कारीगरों के प्रोफाइल देखें, सीधे कॉल करें और काम पर रखें'
                : 'Review worker credentials, shortlist best matches, and hire'}
            </p>
          </div>

          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 w-fit">
            {myEmployerApps.length} Candidates Received
          </span>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-100">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {(['all', 'applied', 'shortlisted', 'accepted', 'completed', 'rejected'] as const).map(
              (tab) => (
                <button
                  key={tab}
                  id={`emp-app-tab-${tab}`}
                  onClick={() => setStatusFilter(tab)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize whitespace-nowrap transition ${
                    statusFilter === tab
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab === 'all'
                    ? `All (${myEmployerApps.length})`
                    : `${tab} (${myEmployerApps.filter((a) => a.status === tab).length})`}
                </button>
              )
            )}
          </div>

          {/* Job Filter Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Filter by Job:</span>
            <select
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="p-1.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white max-w-[200px] truncate"
            >
              <option value="all">All Posted Jobs</option>
              {jobs
                .filter((j) => j.employerId === activeEmployer.id)
                .map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.title}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      {/* Applications List */}
      {filteredApps.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <FileText className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-slate-800">No applicants found</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your status filter or post an urgent job requirement.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApps.map((app) => {
            const job = jobs.find((j) => j.id === app.jobId);
            if (!job) return null;

            return (
              <div
                key={app.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-emerald-300 transition shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  {/* Worker Card Snippet */}
                  <div className="flex items-start gap-3">
                    <img
                      src={app.workerPhoto}
                      alt={app.workerName}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-2xs"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base text-slate-900">{app.workerName}</h3>
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-800">
                          {app.workerSkill}
                        </span>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          🎯 {app.matchScore}% Match
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span className="flex items-center text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 mr-0.5" />
                          {app.workerRating}
                        </span>
                        <span>•</span>
                        <span>{app.workerExperience} Years Exp</span>
                        <span>•</span>
                        <span>Applied on {app.appliedAt}</span>
                      </div>

                      <p className="text-xs font-medium text-slate-700">
                        Applying for: <strong className="text-slate-900">{job.title}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="text-left sm:text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold capitalize inline-block ${
                        app.status === 'accepted'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : app.status === 'shortlisted'
                          ? 'bg-blue-100 text-blue-800 border border-blue-300'
                          : app.status === 'completed'
                          ? 'bg-purple-100 text-purple-800 border border-purple-300'
                          : app.status === 'rejected'
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}
                    >
                      {app.status === 'applied' ? 'Pending Review' : app.status}
                    </span>
                    <p className="text-xs text-slate-400 mt-1">₹{job.payment}/{job.paymentType}</p>
                  </div>
                </div>

                {/* Worker's Application Note */}
                {app.workerNote && (
                  <div className="p-3 bg-slate-50 rounded-2xl text-xs text-slate-700 border border-slate-100">
                    <span className="font-bold text-slate-500 mr-1.5">Note from Worker:</span>
                    “{app.workerNote}”
                  </div>
                )}

                {/* Decision Actions */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      id={`emp-app-call-${app.id}`}
                      onClick={() =>
                        openChat(
                          {
                            id: app.workerId,
                            name: app.workerName || 'Worker Candidate',
                            role: 'worker',
                            phone: '+91 98351 24789',
                            photo: app.workerPhoto || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150',
                          },
                          job.title
                        )
                      }
                      className="px-3.5 py-1.5 rounded-xl border border-emerald-200 text-emerald-800 hover:bg-emerald-50 text-xs font-bold flex items-center gap-1.5 transition"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{t('callNow', 'Call')}</span>
                    </button>

                    <button
                      id={`emp-app-chat-${app.id}`}
                      onClick={() =>
                        openChat(
                          {
                            id: app.workerId,
                            name: app.workerName || 'Worker Candidate',
                            role: 'worker',
                            phone: '+91 98351 24789',
                            photo: app.workerPhoto || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150',
                          },
                          job.title
                        )
                      }
                      className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 transition"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                      <span>{t('chatNow', 'Message')}</span>
                    </button>
                  </div>

                  {/* Hire / Shortlist / Reject Buttons */}
                  <div className="flex items-center gap-2">
                    {app.status === 'applied' && (
                      <>
                        <button
                          id={`shortlist-app-${app.id}`}
                          onClick={() => updateApplicationStatus(app.id, 'shortlisted')}
                          className="px-3 py-1.5 rounded-xl border border-blue-200 text-blue-700 hover:bg-blue-50 text-xs font-bold transition"
                        >
                          {t('shortlist', 'Shortlist')}
                        </button>
                        <button
                          id={`reject-app-${app.id}`}
                          onClick={() => updateApplicationStatus(app.id, 'rejected')}
                          className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition"
                        >
                          {t('reject', 'Decline')}
                        </button>
                      </>
                    )}

                    {app.status !== 'accepted' && app.status !== 'completed' && (
                      <button
                        id={`hire-worker-app-${app.id}`}
                        onClick={() => updateApplicationStatus(app.id, 'accepted')}
                        className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-2xs transition flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{t('acceptWorker', 'Hire Worker')}</span>
                      </button>
                    )}

                    {app.status === 'accepted' && (
                      <button
                        id={`complete-worker-app-${app.id}`}
                        onClick={() => updateApplicationStatus(app.id, 'completed')}
                        className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-2xs transition flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{language === 'hi' ? 'काम पूरा मार्क करें' : 'Mark Completed'}</span>
                      </button>
                    )}

                    {app.status === 'completed' && (
                      <button
                        id={`rate-worker-app-${app.id}`}
                        onClick={() =>
                          openReviewModal(job.id, {
                            id: app.workerId,
                            name: app.workerName,
                            role: 'worker',
                          })
                        }
                        className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-2xs transition flex items-center gap-1.5"
                      >
                        <Star className="w-3.5 h-3.5 fill-white" />
                        <span>{language === 'hi' ? 'श्रमिक को रेटिंग दें' : 'Rate Worker'}</span>
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
