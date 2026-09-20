import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  Search,
  Filter,
  Star,
  MapPin,
  Phone,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Briefcase,
  X,
  User,
  Sparkles,
} from 'lucide-react';
import { allSkillsList } from '../../data/mockData';
import { Worker, WorkerSkill } from '../../types';

export const FindWorkersView: React.FC = () => {
  const { workers, openChat, jobs, activeEmployer } = useApp();
  const { t, language } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'available' | 'busy'>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedWorkerDetails, setSelectedWorkerDetails] = useState<Worker | null>(null);

  // Filtered workers
  const filteredWorkers = useMemo(() => {
    return workers.filter((w) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          w.name.toLowerCase().includes(q) ||
          w.primarySkill.toLowerCase().includes(q) ||
          w.location.villageOrCity.toLowerCase().includes(q) ||
          w.location.district.toLowerCase().includes(q);
        if (!matches) return false;
      }

      if (selectedSkill !== 'All' && w.primarySkill !== selectedSkill) return false;

      if (availabilityFilter === 'available' && !w.isAvailable) return false;
      if (availabilityFilter === 'busy' && w.isAvailable) return false;

      if (w.rating < minRating) return false;

      return true;
    });
  }, [workers, searchQuery, selectedSkill, availabilityFilter, minRating]);

  return (
    <div id="find-workers-view" className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Search and Filters Header */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {t('findWorkers', 'Find Local Workers & Artisans')}
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'hi'
              ? 'अपने गांव व आसपास के सत्यापित कारीगरों से सीधे संपर्क करें'
              : 'Directly discover and hire verified local workers without middlemen'}
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            id="worker-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              language === 'hi'
                ? 'कारीगर का नाम, हुनर या स्थान खोजें...'
                : 'Search workers by trade, name or village...'
            }
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50/50"
          />
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Skill Selector */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setSelectedSkill('All')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
                selectedSkill === 'All'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Trades
            </button>
            {allSkillsList.map((skill) => (
              <button
                key={skill}
                onClick={() => setSelectedSkill(skill)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
                  selectedSkill === skill
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>

          {/* Availability and Rating filters */}
          <div className="flex items-center gap-2">
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value as any)}
              className="p-1.5 rounded-xl border border-slate-200 text-xs font-bold bg-white text-slate-700"
            >
              <option value="all">All Status</option>
              <option value="available">🟢 Available Only</option>
              <option value="busy">🔴 Busy</option>
            </select>

            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="p-1.5 rounded-xl border border-slate-200 text-xs font-bold bg-white text-slate-700"
            >
              <option value="0">All Ratings</option>
              <option value="4">⭐ 4.0 & above</option>
              <option value="4.5">⭐ 4.5 & above</option>
            </select>
          </div>
        </div>
      </div>

      {/* Workers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWorkers.map((w) => (
          <div
            key={w.id}
            className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-emerald-400 hover:shadow-md transition flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={w.photo}
                      alt={w.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-xs"
                    />
                    {w.isVerified && (
                      <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white rounded-full p-0.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-emerald-700 transition">
                        {w.name}
                      </h3>
                      {w.isVerified && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                          ✓
                        </span>
                      )}
                    </div>
                    <span className="inline-block text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md mt-0.5">
                      {w.primarySkill}
                    </span>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                    w.isAvailable
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {w.isAvailable ? '🟢 Available' : 'Busy'}
                </span>
              </div>

              {/* Skills & Experience chips */}
              <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-2xl mb-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{language === 'hi' ? 'अनुभव:' : 'Experience:'}</span>
                  <span className="font-bold text-slate-800">{w.experienceYears} Years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{t('location', 'Location')}:</span>
                  <span className="font-semibold text-slate-800 truncate max-w-[160px]">
                    {w.location.villageOrCity}, {w.location.district}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{language === 'hi' ? 'दैनिक दर:' : 'Expected Rate:'}</span>
                  <span className="font-black text-emerald-800 text-sm">₹{w.expectedDailyWage}/day</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="flex items-center text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                  {w.rating} ({w.ratingCount} reviews)
                </span>
                <span>{w.completedJobsCount} jobs completed</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
              <button
                id={`worker-view-prof-${w.id}`}
                onClick={() => setSelectedWorkerDetails(w)}
                className="flex-1 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition"
              >
                {language === 'hi' ? 'प्रोफ़ाइल' : 'View Profile'}
              </button>

              <button
                id={`worker-call-btn-${w.id}`}
                onClick={() =>
                  openChat(
                    {
                      id: w.id,
                      name: w.name,
                      role: 'worker',
                      phone: w.phone,
                      photo: w.photo,
                    },
                    'Direct Job Invitation'
                  )
                }
                className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{t('callNow', 'Call')}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Worker Detailed Profile Modal (when clicking View Profile) */}
      {selectedWorkerDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedWorkerDetails.photo}
                  alt={selectedWorkerDetails.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm"
                />
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">{selectedWorkerDetails.name}</h3>
                  <p className="text-xs font-bold text-emerald-700">{selectedWorkerDetails.primarySkill}</p>
                  <p className="text-xs text-slate-500">
                    {selectedWorkerDetails.location.villageOrCity}, {selectedWorkerDetails.location.district}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedWorkerDetails(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl leading-relaxed">
              {selectedWorkerDetails.bio || 'Experienced trade craftsman verified on Kaam Sarthi network.'}
            </p>

            <div>
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Additional Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {(selectedWorkerDetails.secondarySkills || selectedWorkerDetails.skills || []).map((s: string) => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => {
                  const w = selectedWorkerDetails;
                  setSelectedWorkerDetails(null);
                  openChat(
                    {
                      id: w.id,
                      name: w.name,
                      role: 'worker',
                      phone: w.phone,
                      photo: w.photo,
                    },
                    'Direct Job Offer'
                  );
                }}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition"
              >
                <Phone className="w-4 h-4" />
                <span>Call & Send Job Offer to {selectedWorkerDetails.name}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
