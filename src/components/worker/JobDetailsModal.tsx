import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Briefcase,
  Users,
  ShieldCheck,
  Star,
  Bookmark,
  BookmarkCheck,
  Phone,
  MessageSquare,
  CheckCircle2,
  Navigation,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';

export const JobDetailsModal: React.FC = () => {
  const {
    selectedJobForDetails,
    setSelectedJobForDetails,
    savedJobIds,
    toggleSaveJob,
    applyForJob,
    applications,
    activeWorker,
    openChat,
    calculateJobMatch,
  } = useApp();

  const { t, language } = useLanguage();
  const [workerNote, setWorkerNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);

  if (!selectedJobForDetails) return null;

  const job = selectedJobForDetails;
  const isSaved = savedJobIds.includes(job.id);
  const existingApp = applications.find(
    (a) => a.jobId === job.id && a.workerId === activeWorker.id
  );
  const match = calculateJobMatch(activeWorker, job);

  const handleApply = () => {
    applyForJob(job.id, workerNote);
    setShowNoteInput(false);
  };

  return (
    <div
      id="job-details-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-auto max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-5 relative flex-shrink-0">
          <button
            id="close-job-details-btn"
            onClick={() => setSelectedJobForDetails(null)}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-slate-950">
              {job.requiredSkill}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-300" />
              <span>{job.distanceKm} km {t('distanceAway', 'away')}</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
              🎯 {match.totalScore}% Match
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold leading-tight text-white mb-2">
            {job.title}
          </h3>

          <div className="flex items-center gap-3 text-xs text-blue-100">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-blue-300" />
              {job.workDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-300" />
              {job.startTime} - {job.endTime}
            </span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-700 text-sm">
          {/* Compensation & Workers Needed Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-blue-50/60 p-4 rounded-2xl border border-blue-100">
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase">{language === 'hi' ? 'दैनिक भुगतान' : 'Payment'}</p>
              <p className="text-xl font-black text-blue-900 mt-0.5">
                ₹{job.payment}
                <span className="text-xs font-normal text-slate-600"> /{job.paymentType}</span>
              </p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase">{t('workersNeeded', 'Workers Needed')}</p>
              <p className="text-xl font-black text-slate-900 mt-0.5 flex items-center gap-1">
                <Users className="w-5 h-5 text-blue-600" />
                <span>{job.workersNeeded - job.workersHired}</span>
                <span className="text-xs font-normal text-slate-500">left of {job.workersNeeded}</span>
              </p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-[11px] font-bold text-slate-500 uppercase">{language === 'hi' ? 'काम की अवधि' : 'Work Duration'}</p>
              <p className="text-base font-bold text-slate-800 mt-1">
                {job.durationDays} {job.durationDays === 1 ? 'Day' : 'Days'}
              </p>
            </div>
          </div>

          {/* Smart Match Breakdown Indicator */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                <span>🎯 {t('matchFound', 'Match Breakdown for your profile')}</span>
              </span>
              <span className="text-xs font-black text-emerald-700">{match.totalScore}%</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
              <div className="bg-white p-1.5 rounded-xl border border-emerald-100">
                <p className="text-slate-400 font-semibold">{t('skillMatch', 'Skill')}</p>
                <p className="font-bold text-emerald-800">{match.skillMatch}%</p>
              </div>
              <div className="bg-white p-1.5 rounded-xl border border-emerald-100">
                <p className="text-slate-400 font-semibold">{t('locationMatch', 'Location')}</p>
                <p className="font-bold text-emerald-800">{match.locationMatch}%</p>
              </div>
              <div className="bg-white p-1.5 rounded-xl border border-emerald-100">
                <p className="text-slate-400 font-semibold">{t('availabilityMatch', 'Availability')}</p>
                <p className="font-bold text-emerald-800">{match.availabilityMatch}%</p>
              </div>
              <div className="bg-white p-1.5 rounded-xl border border-emerald-100">
                <p className="text-slate-400 font-semibold">{t('wageMatch', 'Wage')}</p>
                <p className="font-bold text-emerald-800">{match.wageMatch}%</p>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              {language === 'hi' ? 'काम का विवरण (Job Description)' : 'Job Description'}
            </h4>
            <p className="text-sm leading-relaxed text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              {job.description}
            </p>
          </div>

          {/* Location details with Map representation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>{language === 'hi' ? 'काम का स्थान व दूरी' : 'Work Site Location & Map'}</span>
            </h4>
            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50">
              <div className="p-3.5 flex items-start justify-between border-b border-slate-200 bg-white">
                <div>
                  <p className="font-bold text-slate-900">{job.location.villageOrCity}</p>
                  <p className="text-xs text-slate-500">
                    {job.location.block}, {job.location.district}, {job.location.state}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                    <Navigation className="w-3 h-3" />
                    <span>{job.distanceKm} km</span>
                  </span>
                </div>
              </div>

              {/* Graphical Map Representation */}
              <div className="relative h-32 bg-slate-200 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="relative z-10 flex flex-col items-center bg-white/90 backdrop-blur-xs px-4 py-2 rounded-2xl shadow-sm border border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <MapPin className="w-4 h-4 text-rose-600 animate-bounce" />
                    <span>{job.location.villageOrCity}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-0.5">
                    Approx {Math.round(job.distanceKm * 4)} mins on cycle / foot
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Employer Card */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              {language === 'hi' ? 'काम देने वाले का विवरण' : 'Employer Information'}
            </h4>
            <div className="p-4 rounded-2xl border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={job.employerPhoto}
                    alt={job.employerName}
                    className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                  />
                  {job.employerVerified && (
                    <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white rounded-full p-0.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-slate-900 text-sm">{job.employerName}</p>
                    {job.employerVerified && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        ✓ Verified Employer
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span className="flex items-center text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 mr-0.5" />
                      {job.employerRating}
                    </span>
                    <span>•</span>
                    <span>38 jobs completed</span>
                  </div>
                </div>
              </div>

              {/* Direct Employer Contact Options */}
              <div className="flex items-center gap-2">
                <button
                  id="job-contact-chat-btn"
                  onClick={() => {
                    openChat(
                      {
                        id: job.employerId,
                        name: job.employerName,
                        role: 'employer',
                        phone: '+91 94312 88765',
                        photo: job.employerPhoto,
                      },
                      job.title
                    );
                  }}
                  className="px-3.5 py-2 rounded-xl border border-blue-200 text-blue-700 hover:bg-blue-50 text-xs font-bold transition flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{t('chatNow', 'Chat')}</span>
                </button>
                <button
                  id="job-contact-call-btn"
                  onClick={() => {
                    openChat(
                      {
                        id: job.employerId,
                        name: job.employerName,
                        role: 'employer',
                        phone: '+91 94312 88765',
                        photo: job.employerPhoto,
                      },
                      job.title
                    );
                  }}
                  className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold transition flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{t('callNow', 'Call')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <button
            id="job-save-toggle-btn"
            onClick={() => toggleSaveJob(job.id)}
            className={`w-full sm:w-auto px-4 py-3 rounded-2xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
              isSaved
                ? 'bg-amber-50 border-amber-300 text-amber-800'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4 text-amber-600" /> : <Bookmark className="w-4 h-4" />}
            <span>{isSaved ? t('saved', 'Saved') : t('saveJob', 'Save Job')}</span>
          </button>

          <div className="w-full sm:w-auto flex-1 flex gap-2">
            {existingApp ? (
              <div className="w-full py-3 px-4 rounded-2xl bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>
                  {existingApp.status === 'accepted'
                    ? '🎉 Application Accepted! Work starts tomorrow.'
                    : existingApp.status === 'shortlisted'
                    ? '⭐ You are Shortlisted! Employer will call soon.'
                    : 'Application Submitted • Status: Pending Review'}
                </span>
              </div>
            ) : (
              <button
                id="modal-apply-now-btn"
                onClick={handleApply}
                className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                <span>{t('applyNow', 'Apply Now for ₹' + job.payment + '/day')}</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
