import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  Search,
  MapPin,
  Filter,
  ArrowUpDown,
  Calendar,
  Clock,
  Star,
  Users,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';
import { allSkillsList, mockLocations } from '../../data/mockData';
import { WorkerSkill, Job } from '../../types';

export const FindJobsView: React.FC = () => {
  const {
    jobs,
    activeWorker,
    savedJobIds,
    toggleSaveJob,
    applyForJob,
    applications,
    setSelectedJobForDetails,
    calculateJobMatch,
  } = useApp();

  const { t, language } = useLanguage();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [maxDistance, setMaxDistance] = useState<number>(25); // 500m (0.5), 2, 5, 10, 25
  const [selectedWorkType, setSelectedWorkType] = useState<string>('All');
  const [minPayment, setMinPayment] = useState<number>(300);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'match' | 'distance' | 'pay' | 'newest'>('match');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Filter logic
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Must be active
      if (job.status !== 'active') return false;

      // Search query in title, desc, employer, location
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          job.title.toLowerCase().includes(q) ||
          job.description.toLowerCase().includes(q) ||
          job.employerName.toLowerCase().includes(q) ||
          job.requiredSkill.toLowerCase().includes(q) ||
          job.location.villageOrCity.toLowerCase().includes(q) ||
          job.location.district.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // Skill filter
      if (selectedSkill !== 'All' && job.requiredSkill !== selectedSkill) return false;

      // Distance filter
      if (job.distanceKm > maxDistance) return false;

      // Work Type filter
      if (selectedWorkType !== 'All' && job.workType !== selectedWorkType) return false;

      // Min Payment filter
      if (job.payment < minPayment) return false;

      // Employer rating filter
      if (job.employerRating < minRating) return false;

      return true;
    });
  }, [jobs, searchQuery, selectedSkill, maxDistance, selectedWorkType, minPayment, minRating]);

  // Sorting
  const sortedJobs = useMemo(() => {
    return [...filteredJobs].sort((a, b) => {
      if (sortBy === 'distance') {
        return a.distanceKm - b.distanceKm;
      }
      if (sortBy === 'pay') {
        return b.payment - a.payment;
      }
      if (sortBy === 'newest') {
        const timeB = new Date(b.createdAt || b.postedDate || 0).getTime();
        const timeA = new Date(a.createdAt || a.postedDate || 0).getTime();
        return timeB - timeA;
      }
      // 'match' default
      const matchA = calculateJobMatch(activeWorker, a).totalScore;
      const matchB = calculateJobMatch(activeWorker, b).totalScore;
      return matchB - matchA;
    });
  }, [filteredJobs, sortBy, activeWorker, calculateJobMatch]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedSkill('All');
    setMaxDistance(25);
    setSelectedWorkType('All');
    setMinPayment(300);
    setMinRating(0);
    setSortBy('match');
  };

  return (
    <div id="find-jobs-view" className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Search Bar & Header */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {t('findJobs', 'Find Jobs Near You')}
            </h2>
            <p className="text-xs text-slate-500">
              {language === 'hi'
                ? 'अपने हुनर, दूरी और पगार के अनुसार काम खोजें'
                : 'Browse local work opportunities matched to your trade skills'}
            </p>
          </div>

          <button
            id="toggle-filters-mobile-btn"
            onClick={() => setShowFiltersMobile(!showFiltersMobile)}
            className="sm:hidden flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-slate-50"
          >
            <SlidersHorizontal className="w-4 h-4 text-blue-600" />
            <span>{showFiltersMobile ? 'Hide Filters' : 'Filter & Sort'}</span>
          </button>
        </div>

        {/* Search input with trade tag suggestions */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            id="job-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              language === 'hi'
                ? 'काम सर्च करें... (उदा. राजमिस्त्री, हेल्पर, पेंटर, सहरसा)'
                : 'Search jobs, trade skills, employer or village...'
            }
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-sm font-medium bg-slate-50/50"
          />
        </div>

        {/* Skill Pill quick chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          <button
            id="skill-pill-all"
            onClick={() => setSelectedSkill('All')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
              selectedSkill === 'All'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {t('allSkills', 'All Skills')}
          </button>
          {allSkillsList.map((skill) => (
            <button
              key={skill}
              id={`skill-pill-${skill.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelectedSkill(skill)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                selectedSkill === skill
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Filters + Right Job Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filter Sidebar on desktop, collapsible on mobile */}
        <div className={`lg:block ${showFiltersMobile ? 'block' : 'hidden'} space-y-4`}>
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-5 sticky top-20">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-blue-600" />
                <span>{t('filterJobs', 'Filters')}</span>
              </span>
              <button
                id="reset-filters-btn"
                onClick={resetFilters}
                className="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{language === 'hi' ? 'रीसेट' : 'Reset'}</span>
              </button>
            </div>

            {/* Distance Filter */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-700">
                  {t('distanceRadius', 'Maximum Distance')}
                </label>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                  {maxDistance} km
                </span>
              </div>
              <div className="grid grid-cols-5 gap-1 text-[11px] font-bold">
                {[0.5, 2, 5, 10, 25].map((dist) => (
                  <button
                    key={dist}
                    id={`dist-filter-${dist}`}
                    onClick={() => setMaxDistance(dist)}
                    className={`py-1.5 rounded-lg border transition ${
                      maxDistance === dist
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {dist === 0.5 ? '500m' : `${dist}km`}
                  </button>
                ))}
              </div>
            </div>

            {/* Work Type Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {language === 'hi' ? 'काम का प्रकार' : 'Work Type'}
              </label>
              <select
                id="filter-work-type"
                value={selectedWorkType}
                onChange={(e) => setSelectedWorkType(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
              >
                <option value="All">All Types (सभी)</option>
                <option value="daily">Daily Wage (दैनिक)</option>
                <option value="contract">Contract (ठेका)</option>
                <option value="part_time">Part-time (अंशकालिक)</option>
                <option value="full_time">Full-time (पूर्णकालिक)</option>
              </select>
            </div>

            {/* Min Wage Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-700">
                  {language === 'hi' ? 'न्यूनतम पगार (प्रति दिन)' : 'Min Daily Wage'}
                </label>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  ₹{minPayment}+
                </span>
              </div>
              <input
                id="wage-range-input"
                type="range"
                min="300"
                max="1200"
                step="50"
                value={minPayment}
                onChange={(e) => setMinPayment(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>₹300</span>
                <span>₹750</span>
                <span>₹1200+</span>
              </div>
            </div>

            {/* Employer Rating Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {language === 'hi' ? 'मालिक रेटिंग' : 'Employer Rating'}
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-xs font-bold">
                {[0, 4, 4.5].map((rating) => (
                  <button
                    key={rating}
                    id={`rating-filter-${rating}`}
                    onClick={() => setMinRating(rating)}
                    className={`py-1.5 px-2 rounded-xl border transition flex items-center justify-center gap-1 ${
                      minRating === rating
                        ? 'bg-amber-50 border-amber-400 text-amber-900'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{rating === 0 ? 'All' : `${rating}+`}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Job Cards List */}
        <div className="lg:col-span-3 space-y-4">
          {/* Top Sort & Count Toolbar */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="font-semibold text-slate-600">
              {language === 'hi' ? 'दिखाए जा रहे हैं:' : 'Showing'}{' '}
              <strong className="text-slate-900 font-bold">{sortedJobs.length}</strong>{' '}
              {language === 'hi' ? 'उपलब्ध काम' : 'verified jobs'}
            </span>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">{t('sortBy', 'Sort by')}:</span>
              <select
                id="job-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="p-1.5 rounded-lg border border-slate-200 text-xs font-bold bg-white text-slate-800"
              >
                <option value="match">🎯 Best Match (सर्वश्रेष्ठ मेल)</option>
                <option value="distance">📍 Nearest (निकटतम दूरी)</option>
                <option value="pay">💰 Highest Pay (अधिकतम पगार)</option>
                <option value="newest">🕒 Newest (नवीनतम)</option>
              </select>
            </div>
          </div>

          {/* Jobs List */}
          {sortedJobs.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
              <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mx-auto mb-3">
                <Search className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-800">
                {language === 'hi' ? 'कोई काम नहीं मिला' : 'No jobs matched your filter'}
              </h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                {language === 'hi'
                  ? 'कृपया दूरी का दायरा बढ़ाएं या अन्य हुनर चुनें।'
                  : 'Try expanding the distance radius or resetting your skill and wage filters.'}
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition"
              >
                {language === 'hi' ? 'फ़िल्टर रीसेट करें' : 'Reset All Filters'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedJobs.map((job) => {
                const match = calculateJobMatch(activeWorker, job);
                const isSaved = savedJobIds.includes(job.id);
                const existingApp = applications.find(
                  (a) => a.jobId === job.id && a.workerId === activeWorker.id
                );

                return (
                  <div
                    key={job.id}
                    className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-blue-400 hover:shadow-md transition flex flex-col justify-between group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-100">
                            {job.requiredSkill}
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-xs font-bold text-emerald-800 bg-emerald-50 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-emerald-600" />
                            <span>{job.distanceKm} km {t('distanceAway', 'away')}</span>
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-xs font-bold text-blue-700 bg-blue-50">
                            🎯 {match.totalScore}% Match
                          </span>
                        </div>

                        <h3
                          onClick={() => setSelectedJobForDetails(job)}
                          className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 cursor-pointer transition leading-snug"
                        >
                          {job.title}
                        </h3>

                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span>{job.location.villageOrCity}, {job.location.district}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>{job.workDate}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{job.startTime} - {job.endTime}</span>
                          </span>
                        </div>
                      </div>

                      {/* Pay & Save toggle */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                        <div className="text-left sm:text-right">
                          <p className="text-xl font-black text-blue-900">
                            ₹{job.payment}
                            <span className="text-xs font-normal text-slate-500"> /{job.paymentType}</span>
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {job.durationDays} {job.durationDays === 1 ? 'Day' : 'Days'} work
                          </p>
                        </div>

                        <button
                          id={`bookmark-job-${job.id}`}
                          onClick={() => toggleSaveJob(job.id)}
                          className={`p-2 rounded-xl border transition ${
                            isSaved
                              ? 'bg-amber-50 border-amber-300 text-amber-600'
                              : 'border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                          }`}
                          title="Save Job"
                        >
                          {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Card Footer: Employer snippet + Actions */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={job.employerPhoto}
                          alt={job.employerName}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <span className="text-xs font-semibold text-slate-800">{job.employerName}</span>
                        <span className="text-xs text-amber-500 font-bold flex items-center">
                          <Star className="w-3 h-3 fill-amber-400 mr-0.5" />
                          {job.employerRating}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          ({job.workersNeeded - job.workersHired} spots left)
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          id={`view-details-btn-${job.id}`}
                          onClick={() => setSelectedJobForDetails(job)}
                          className="flex-1 sm:flex-none px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition"
                        >
                          {t('viewDetails', 'View Details')}
                        </button>

                        {existingApp ? (
                          <span className="px-3 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold">
                            ✓ {t('applied', 'Applied')}
                          </span>
                        ) : (
                          <button
                            id={`apply-now-btn-${job.id}`}
                            onClick={() => applyForJob(job.id)}
                            className="flex-1 sm:flex-none px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs"
                          >
                            {t('applyNow', 'Apply Now')}
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
      </div>
    </div>
  );
};
