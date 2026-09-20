import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Star,
  MapPin,
  Calendar,
  MessageSquare,
  Phone,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { ApplicationStatus } from '../../types';

export const WorkerApplicationsView: React.FC = () => {
  const {
    applications,
    activeWorker,
    jobs,
    setSelectedJobForDetails,
    openChat,
    openReviewModal,
  } = useApp();

  const { t, language } = useLanguage();
  const [filter, setFilter] = useState<'all' | ApplicationStatus>('all');

  // Filter applications belonging to active worker
  const workerApps = applications.filter((app) => app.workerId === activeWorker.id);

  const filteredApps = workerApps.filter((app) => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'accepted':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('accepted', 'Accepted')}</span>
          </span>
        );
      case 'shortlisted':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>{t('shortlisted', 'Shortlisted')}</span>
          </span>
        );
      case 'completed':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-300 flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-purple-600 text-purple-600" />
            <span>{t('completed', 'Completed')}</span>
          </span>
        );
      case 'rejected':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>{t('rejected', 'Rejected')}</span>
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>{t('applied', 'Applied (Under Review)')}</span>
          </span>
        );
    }
  };

  return (
    <div id="worker-applications-view" className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header & Filter Tabs */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {t('myApplications', 'My Job Applications')}
            </h2>
            <p className="text-xs text-slate-500">
              {language === 'hi'
                ? 'आपके द्वारा भेजे गए सभी काम के आवेदनों की स्थिति'
                : 'Track responses, interview calls, and completed jobs'}
            </p>
          </div>

          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 w-fit">
            Total {workerApps.length} Applications
          </span>
        </div>

        {/* Status Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2">
          {(['all', 'applied', 'shortlisted', 'accepted', 'completed', 'rejected'] as const).map(
            (tab) => (
              <button
                key={tab}
                id={`app-filter-${tab}`}
                onClick={() => setFilter(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize whitespace-nowrap transition ${
                  filter === tab
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab === 'all'
                  ? 'All (' + workerApps.length + ')'
                  : `${tab} (${workerApps.filter((a) => a.status === tab).length})`}
              </button>
            )
          )}
        </div>
      </div>

      {/* Applications List */}
      {filteredApps.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <FileText className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-slate-800">
            {language === 'hi' ? 'कोई आवेदन नहीं मिला' : 'No applications in this category'}
          </h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {language === 'hi'
              ? 'काम खोजें और नजदीकी नौकरियों के लिए आज ही आवेदन करें।'
              : 'Browse opportunities and apply to begin earning.'}
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
                className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-blue-400 transition shadow-xs flex flex-col justify-between"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {getStatusBadge(app.status)}
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-slate-100 text-slate-700">
                        {job.requiredSkill}
                      </span>
                      <span className="text-xs text-slate-400">Applied on {app.appliedAt}</span>
                    </div>

                    <h3
                      onClick={() => setSelectedJobForDetails(job)}
                      className="text-base sm:text-lg font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition"
                    >
                      {job.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="font-semibold text-slate-800">Employer: {job.employerName}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{job.location.villageOrCity}, {job.location.district}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{job.workDate}</span>
                      </span>
                    </div>
                  </div>

                  <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                    <p className="text-xl font-black text-blue-900">
                      ₹{job.payment}
                      <span className="text-xs font-normal text-slate-500"> /{job.paymentType}</span>
                    </p>
                    <p className="text-xs text-emerald-700 font-semibold">
                      {app.status === 'accepted' ? 'Payment Escrow Ready' : 'Direct Payout'}
                    </p>
                  </div>
                </div>

                {/* Bottom Actions Bar */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-slate-500">
                    {app.status === 'accepted' && (
                      <span className="text-emerald-700 font-bold">
                        🎉 Accepted! Please coordinate timings with the employer.
                      </span>
                    )}
                    {app.status === 'shortlisted' && (
                      <span className="text-blue-700 font-bold">
                        ⭐ Employer viewed your profile and shortlisted you.
                      </span>
                    )}
                    {app.status === 'applied' && (
                      <span className="text-slate-500">
                        Employer has been notified via SMS & App.
                      </span>
                    )}
                    {app.status === 'completed' && (
                      <span className="text-purple-700 font-bold">
                        ✓ Work finished. ₹{job.payment * job.durationDays} earned.
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      id={`app-details-btn-${app.id}`}
                      onClick={() => setSelectedJobForDetails(job)}
                      className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700"
                    >
                      {t('viewDetails', 'Job Details')}
                    </button>

                    {(app.status === 'accepted' || app.status === 'shortlisted') && (
                      <button
                        id={`app-chat-btn-${app.id}`}
                        onClick={() =>
                          openChat(
                            {
                              id: job.employerId,
                              name: job.employerName,
                              role: 'employer',
                              phone: '+91 94312 88765',
                              photo: job.employerPhoto,
                            },
                            job.title
                          )
                        }
                        className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{t('chatNow', 'Contact Employer')}</span>
                      </button>
                    )}

                    {app.status === 'completed' && (
                      <button
                        id={`app-rate-btn-${app.id}`}
                        onClick={() =>
                          openReviewModal(job.id, {
                            id: job.employerId,
                            name: job.employerName,
                            role: 'employer',
                          })
                        }
                        className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
                      >
                        <Star className="w-3.5 h-3.5 fill-white" />
                        <span>{t('rateYourExperience', 'Rate Employer')}</span>
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
