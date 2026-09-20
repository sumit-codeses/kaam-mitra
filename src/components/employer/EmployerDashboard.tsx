import React from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  PlusCircle,
  Users,
  Briefcase,
  FileText,
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  ArrowRight,
  Phone,
  MessageSquare,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const EmployerDashboard: React.FC = () => {
  const {
    activeEmployer,
    jobs,
    applications,
    workers,
    setCurrentView,
    setSelectedJobForDetails,
    openChat,
  } = useApp();

  const { t, language } = useLanguage();

  const myJobs = jobs.filter((j) => j.employerId === activeEmployer.id);
  const activeJobs = myJobs.filter((j) => j.status === 'active');
  const myJobIds = myJobs.map((j) => j.id);
  const myApps = applications.filter((a) => myJobIds.includes(a.jobId));
  const pendingApps = myApps.filter((a) => a.status === 'applied');
  const hiredWorkersCount = myApps.filter((a) => a.status === 'accepted').length;

  return (
    <div id="employer-dashboard" className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Employer Greeting & Organization Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={activeEmployer.photo}
              alt={activeEmployer.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-500/30 shadow-md"
            />
            {activeEmployer.isVerified && (
              <span
                className="absolute -bottom-1 -right-1 bg-emerald-600 text-white rounded-full p-1 shadow-sm"
                title={t('verifiedEmployer', 'Verified Employer')}
              >
                <ShieldCheck className="w-4 h-4" />
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {activeEmployer.name}
              </h2>
              {activeEmployer.isVerified && (
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  ✓ {t('verifiedEmployer', 'Verified')}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
              <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                {activeEmployer.companyName}
              </span>
              <span>•</span>
              <MapPin className="w-3.5 h-3.5 text-emerald-600 inline" />
              <span>
                {activeEmployer.location.district}, {activeEmployer.location.state}
              </span>
            </p>

            <div className="flex items-center gap-2 mt-2 text-xs font-semibold text-slate-600">
              <span className="flex items-center text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 mr-0.5" />
                {activeEmployer.rating} ({activeEmployer.totalJobsPosted} jobs posted)
              </span>
              <span>•</span>
              <span>{activeEmployer.phone}</span>
            </div>
          </div>
        </div>

        {/* Quick Post Job Primary CTA */}
        <div className="flex sm:items-center gap-2">
          <button
            id="employer-dash-post-job-cta"
            onClick={() => setCurrentView('post-job')}
            className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-5 h-5" />
            <span>{t('postJob', 'Post a New Job')}</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {language === 'hi' ? 'सक्रिय नौकरियां' : 'Active Jobs'}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{activeJobs.length}</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {t('newApplications', 'New Applicants')}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl sm:text-3xl font-black text-blue-600">{pendingApps.length}</span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {language === 'hi' ? 'नियुक्त श्रमिक' : 'Hired Workers'}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl sm:text-3xl font-black text-purple-600">{hiredWorkersCount}</span>
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {language === 'hi' ? 'कुल पोस्ट' : 'Lifetime Posts'}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{myJobs.length}</span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          id="emp-quick-post-job"
          onClick={() => setCurrentView('post-job')}
          className="p-4 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100/70 border border-emerald-200 transition text-left group"
        >
          <PlusCircle className="w-6 h-6 text-emerald-700 mb-2 group-hover:scale-110 transition" />
          <p className="font-bold text-xs sm:text-sm text-emerald-950">{t('postJob', 'Post a Job')}</p>
          <p className="text-[10px] text-emerald-800">Find workers in minutes</p>
        </button>

        <button
          id="emp-quick-find-workers"
          onClick={() => setCurrentView('workers')}
          className="p-4 rounded-2xl bg-white hover:bg-blue-50/60 border border-slate-200 hover:border-blue-300 transition text-left group"
        >
          <Users className="w-6 h-6 text-blue-600 mb-2 group-hover:scale-110 transition" />
          <p className="font-bold text-xs sm:text-sm text-slate-900">{t('findWorkers', 'Find Workers')}</p>
          <p className="text-[10px] text-slate-500">{workers.length} verified artisans</p>
        </button>

        <button
          id="emp-quick-my-jobs"
          onClick={() => setCurrentView('my-jobs')}
          className="p-4 rounded-2xl bg-white hover:bg-purple-50/60 border border-slate-200 hover:border-purple-300 transition text-left group"
        >
          <Briefcase className="w-6 h-6 text-purple-600 mb-2 group-hover:scale-110 transition" />
          <p className="font-bold text-xs sm:text-sm text-slate-900">{t('myJobs', 'Manage Jobs')}</p>
          <p className="text-[10px] text-slate-500">{myJobs.length} listings</p>
        </button>

        <button
          id="emp-quick-applicants"
          onClick={() => setCurrentView('applications')}
          className="p-4 rounded-2xl bg-white hover:bg-amber-50/60 border border-slate-200 hover:border-amber-300 transition text-left group"
        >
          <FileText className="w-6 h-6 text-amber-600 mb-2 group-hover:scale-110 transition" />
          <p className="font-bold text-xs sm:text-sm text-slate-900">{t('newApplications', 'Applications')}</p>
          <p className="text-[10px] text-slate-500">{myApps.length} candidates</p>
        </button>
      </div>

      {/* Active Jobs Pipeline Section */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {language === 'hi' ? 'सक्रिय कार्य सूचियाँ (Active Hiring)' : 'Active Job Postings'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'hi' ? 'आवेदकों की समीक्षा करें और तुरंत काम पर रखें' : 'Review incoming applications and hire workers'}
            </p>
          </div>
          <button
            id="view-all-emp-jobs-btn"
            onClick={() => setCurrentView('my-jobs')}
            className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
          >
            <span>{language === 'hi' ? 'सभी प्रबंधित करें' : 'Manage All'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {activeJobs.length === 0 ? (
          <div className="text-center py-8 bg-slate-50 rounded-2xl border border-slate-200">
            <p className="text-sm font-bold text-slate-700">No active job postings right now</p>
            <button
              onClick={() => setCurrentView('post-job')}
              className="mt-3 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
            >
              Post your first job
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeJobs.slice(0, 4).map((job) => {
              const jobApps = applications.filter((a) => a.jobId === job.id);
              const pendingCount = jobApps.filter((a) => a.status === 'applied').length;

              return (
                <div
                  key={job.id}
                  className="p-4 sm:p-5 rounded-2xl border border-slate-200 hover:border-emerald-400 transition bg-white shadow-2xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {job.requiredSkill}
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      ₹{job.payment}/{job.paymentType}
                    </span>
                  </div>

                  <h4
                    onClick={() => setSelectedJobForDetails(job)}
                    className="font-bold text-sm text-slate-900 hover:text-emerald-700 cursor-pointer transition"
                  >
                    {job.title}
                  </h4>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
                    <span>
                      Workers: <strong>{job.workersHired}/{job.workersNeeded}</strong> hired
                    </span>
                    <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-md">
                      {pendingCount} New Applicants
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      id={`emp-view-apps-${job.id}`}
                      onClick={() => setCurrentView('applications')}
                      className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition"
                    >
                      {language === 'hi' ? 'आवेदन देखें' : 'View Applicants'} ({jobApps.length})
                    </button>
                    <button
                      id={`emp-job-details-${job.id}`}
                      onClick={() => setSelectedJobForDetails(job)}
                      className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs"
                    >
                      Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Available Workers in Your Area Preview */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>{language === 'hi' ? 'आपके क्षेत्र में उपलब्ध कुशल कामगार' : 'Available Skilled Workers Nearby'}</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Active Today
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'hi' ? 'सीधे कॉल करें या तुरंत काम के लिए आमंत्रित करें' : 'Call directly or send a job invitation'}
            </p>
          </div>
          <button
            id="view-all-workers-btn"
            onClick={() => setCurrentView('workers')}
            className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
          >
            <span>{language === 'hi' ? 'सभी कामगार देखें' : 'View all workers'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {workers.slice(0, 3).map((w) => (
            <div
              key={w.id}
              className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-emerald-300 transition shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={w.photo}
                      alt={w.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{w.name}</h4>
                      <p className="text-xs font-semibold text-blue-700">{w.primarySkill}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      w.isAvailable ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {w.isAvailable ? 'Available' : 'Busy'}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl mb-3">
                  <p className="flex items-center justify-between">
                    <span className="text-slate-400">Experience:</span>
                    <span className="font-bold">{w.experienceYears} Years</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-slate-400">Location:</span>
                    <span className="font-bold">{w.location.villageOrCity}, {w.location.district}</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-slate-400">Expected Rate:</span>
                    <span className="font-bold text-slate-900">₹{w.expectedDailyWage}/day</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <button
                  id={`emp-contact-call-${w.id}`}
                  onClick={() =>
                    openChat(
                      {
                        id: w.id,
                        name: w.name,
                        role: 'worker',
                        phone: w.phone,
                        photo: w.photo,
                      },
                      'Urgent Work Requirement'
                    )
                  }
                  className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-2xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{t('callNow', 'Call')}</span>
                </button>
                <button
                  id={`emp-contact-chat-${w.id}`}
                  onClick={() =>
                    openChat(
                      {
                        id: w.id,
                        name: w.name,
                        role: 'worker',
                        phone: w.phone,
                        photo: w.photo,
                      },
                      'Job Discussion'
                    )
                  }
                  className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
                  title="Message"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
