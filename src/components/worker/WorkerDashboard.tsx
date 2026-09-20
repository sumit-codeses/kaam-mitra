import React from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  Search,
  MapPin,
  FileText,
  DollarSign,
  History,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Star,
  Users,
  ShieldCheck,
  Calendar,
  AlertCircle,
  Briefcase,
} from 'lucide-react';
import { Job } from '../../types';

export const WorkerDashboard: React.FC = () => {
  const {
    activeWorker,
    toggleWorkerAvailability,
    jobs,
    applications,
    setCurrentView,
    setSelectedJobForDetails,
    applyForJob,
    calculateJobMatch,
  } = useApp();

  const { t, language } = useLanguage();

  // Find best smart match job for worker
  const activeJobs = jobs.filter((j) => j.status === 'active');
  const matchedJobs = activeJobs
    .map((j) => ({ job: j, match: calculateJobMatch(activeWorker, j) }))
    .sort((a, b) => b.match.totalScore - a.match.totalScore);

  const topMatch = matchedJobs[0];
  const nearbyJobs = activeJobs.filter((j) => j.distanceKm <= 5);

  return (
    <div id="worker-dashboard" className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Worker Greeting & Availability Status Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={activeWorker.photo}
              alt={activeWorker.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-blue-500/30 shadow-md"
            />
            {activeWorker.isVerified && (
              <span
                className="absolute -bottom-1 -right-1 bg-emerald-600 text-white rounded-full p-1 shadow-sm"
                title={t('verifiedWorker', 'Verified Worker')}
              >
                <ShieldCheck className="w-4 h-4" />
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {language === 'hi' ? 'नमस्ते' : language === 'sat' ? 'ᱡᱚᱦᱟᱨ' : 'Namaste'}, {activeWorker.name}!
              </h2>
              {activeWorker.isVerified && (
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full hidden sm:inline-block">
                  ✓ {t('verified', 'Verified')}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
              <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                {activeWorker.primarySkill}
              </span>
              <span>•</span>
              <MapPin className="w-3.5 h-3.5 text-emerald-600 inline" />
              <span>
                {activeWorker.location.villageOrCity}, {activeWorker.location.district}
              </span>
            </p>
            <div className="flex items-center gap-2 mt-2 text-xs font-semibold text-slate-600">
              <span className="flex items-center text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 mr-0.5" />
                {activeWorker.rating} ({activeWorker.ratingCount} reviews)
              </span>
              <span>•</span>
              <span>₹{activeWorker.expectedDailyWage}/day expected</span>
            </div>
          </div>
        </div>

        {/* Worker Status Toggle Component */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between min-w-[240px]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t('availableForWork', 'Worker Status')}
            </span>
            <span
              className={`w-3 h-3 rounded-full ${
                activeWorker.isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-rose-400'
              }`}
            />
          </div>
          <button
            id="worker-status-toggle-btn"
            onClick={() => toggleWorkerAvailability()}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-2xs ${
              activeWorker.isAvailable
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {activeWorker.isAvailable
                ? t('availableForWork', 'Available for Work')
                : t('notAvailable', 'Not Available')}
            </span>
          </button>
        </div>
      </div>

      {/* Section 6: Quick Actions */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-1">
          {t('quickActions', 'Quick Actions')}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <button
            id="qa-find-jobs"
            onClick={() => setCurrentView('jobs')}
            className="p-4 rounded-2xl bg-white hover:bg-blue-50/60 border border-slate-200 hover:border-blue-400 transition shadow-2xs text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-2 group-hover:scale-105 transition">
              <Search className="w-5 h-5" />
            </div>
            <p className="font-bold text-xs sm:text-sm text-slate-900">{t('findJobs', 'Find Jobs')}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">{activeJobs.length} active jobs</p>
          </button>

          <button
            id="qa-nearby-jobs"
            onClick={() => setCurrentView('jobs')}
            className="p-4 rounded-2xl bg-white hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-400 transition shadow-2xs text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2 group-hover:scale-105 transition">
              <MapPin className="w-5 h-5" />
            </div>
            <p className="font-bold text-xs sm:text-sm text-slate-900">{t('nearbyJobs', 'Nearby Jobs')}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Within 5 km radius</p>
          </button>

          <button
            id="qa-my-applications"
            onClick={() => setCurrentView('applications')}
            className="p-4 rounded-2xl bg-white hover:bg-purple-50/60 border border-slate-200 hover:border-purple-400 transition shadow-2xs text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-2 group-hover:scale-105 transition">
              <FileText className="w-5 h-5" />
            </div>
            <p className="font-bold text-xs sm:text-sm text-slate-900">{t('myApplications', 'My Applications')}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">
              {applications.filter((a) => a.workerId === activeWorker.id).length} applied
            </p>
          </button>

          <button
            id="qa-my-earnings"
            onClick={() => setCurrentView('earnings')}
            className="p-4 rounded-2xl bg-white hover:bg-amber-50/60 border border-slate-200 hover:border-amber-400 transition shadow-2xs text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-2 group-hover:scale-105 transition">
              <DollarSign className="w-5 h-5" />
            </div>
            <p className="font-bold text-xs sm:text-sm text-slate-900">{t('myEarnings', 'My Earnings')}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">₹33,600 received</p>
          </button>

          <button
            id="qa-work-history"
            onClick={() => setCurrentView('history')}
            className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-white hover:bg-teal-50/60 border border-slate-200 hover:border-teal-400 transition shadow-2xs text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-2 group-hover:scale-105 transition">
              <History className="w-5 h-5" />
            </div>
            <p className="font-bold text-xs sm:text-sm text-slate-900">{t('workHistory', 'Work History')}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">{activeWorker.completedJobsCount} jobs completed</p>
          </button>
        </div>
      </div>

      {/* Section 14: Smart Match Banner */}
      {topMatch && (
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 rounded-3xl p-5 sm:p-6 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 text-xs font-black">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>🎯 {topMatch.match.totalScore}% {t('matchFound', 'Match Found')}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                {topMatch.job.title}
              </h3>
              <p className="text-xs text-blue-100">
                {topMatch.job.employerName} • 📍 {topMatch.job.location.villageOrCity} ({topMatch.job.distanceKm} km)
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-semibold text-blue-200">
                <span className="bg-white/10 px-2.5 py-1 rounded-lg">
                  {t('skillMatch', 'Skill Match')}: <strong>{topMatch.match.skillMatch}%</strong>
                </span>
                <span className="bg-white/10 px-2.5 py-1 rounded-lg">
                  {t('locationMatch', 'Location Match')}: <strong>{topMatch.match.locationMatch}%</strong>
                </span>
                <span className="bg-white/10 px-2.5 py-1 rounded-lg">
                  {t('availabilityMatch', 'Availability Match')}: <strong>{topMatch.match.availabilityMatch}%</strong>
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-between gap-3">
              <div className="text-left md:text-right">
                <p className="text-xs uppercase font-bold text-blue-200">{language === 'hi' ? 'दैनिक भुगतान' : 'Daily Wage'}</p>
                <p className="text-2xl font-black text-amber-300">₹{topMatch.job.payment} <span className="text-xs font-normal text-white">/ day</span></p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  id="smart-match-view-job-btn"
                  onClick={() => setSelectedJobForDetails(topMatch.job)}
                  className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-white text-blue-900 hover:bg-blue-50 font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
                >
                  <span>{t('viewDetails', 'View Job')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section 6: Nearby Jobs list */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>{t('nearbyJobs', 'Nearby Jobs')}</span>
              <span className="text-xs font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">
                {nearbyJobs.length} available
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'hi' ? 'आपके 5 किमी के दायरे में काम' : 'Opportunities within 5 km of your location'}
            </p>
          </div>
          <button
            id="see-all-jobs-btn"
            onClick={() => setCurrentView('jobs')}
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
          >
            <span>{language === 'hi' ? 'सभी देखें' : 'View all'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nearbyJobs.slice(0, 6).map((job) => {
            const hasApplied = applications.some(
              (a) => a.jobId === job.id && a.workerId === activeWorker.id
            );

            return (
              <div
                key={job.id}
                className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 hover:border-blue-400 hover:shadow-md transition flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-100">
                      {job.requiredSkill}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-600" />
                      <span>{job.distanceKm} km {t('distanceAway', 'away')}</span>
                    </span>
                  </div>

                  <h4
                    onClick={() => setSelectedJobForDetails(job)}
                    className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 cursor-pointer transition line-clamp-2"
                  >
                    {job.title}
                  </h4>

                  <div className="flex items-center gap-2 mt-2 text-xs text-slate-600">
                    <span className="flex items-center text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 mr-0.5" />
                      {job.employerRating}
                    </span>
                    <span>•</span>
                    <span className="truncate">{job.employerName}</span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs py-2 px-3 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-1 text-slate-500">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{job.workDate}</span>
                    </div>
                    <div className="font-extrabold text-blue-900 text-sm">
                      ₹{job.payment}
                      <span className="text-[10px] font-normal text-slate-500"> / {job.paymentType}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    id={`view-job-details-${job.id}`}
                    onClick={() => setSelectedJobForDetails(job)}
                    className="flex-1 py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition"
                  >
                    {t('viewDetails', 'Details')}
                  </button>

                  {hasApplied ? (
                    <button
                      disabled
                      className="flex-1 py-2 px-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold cursor-default"
                    >
                      ✓ {t('applied', 'Applied')}
                    </button>
                  ) : (
                    <button
                      id={`apply-quick-${job.id}`}
                      onClick={() => applyForJob(job.id)}
                      className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs"
                    >
                      {t('applyNow', 'Apply Now')}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
