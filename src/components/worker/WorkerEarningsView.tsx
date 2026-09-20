import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Calendar,
  Download,
  Filter,
  Star,
  MapPin,
  ArrowUpRight,
  Briefcase,
} from 'lucide-react';

export const WorkerEarningsView: React.FC = () => {
  const { activeWorker, applications, jobs, openReviewModal } = useApp();
  const { t, language } = useLanguage();

  const [selectedMonth, setSelectedMonth] = useState('All');

  // Completed jobs & earnings simulation data
  const completedEntries = [
    {
      id: 'earn-1',
      title: 'Commercial Boundary Wall Brickwork',
      employer: 'Rajesh Sharma Construction',
      amount: 4200,
      days: 6,
      rate: 700,
      date: 'May 12, 2026',
      month: 'May',
      location: 'Kahra, Saharsa',
      ratingGiven: 5,
      status: 'Paid (Cash + UPI)',
    },
    {
      id: 'earn-2',
      title: 'Residential 2nd Floor Plaster Work',
      employer: 'Mukesh Choudhary',
      amount: 3500,
      days: 5,
      rate: 700,
      date: 'Apr 28, 2026',
      month: 'April',
      location: 'Bangaon, Saharsa',
      ratingGiven: 5,
      status: 'Paid (Direct UPI)',
    },
    {
      id: 'earn-3',
      title: 'Water Sump Tank RCC Masonry',
      employer: 'Kisan Agro Cold Storage',
      amount: 5600,
      days: 8,
      rate: 700,
      date: 'Apr 10, 2026',
      month: 'April',
      location: 'Dumka Rural',
      ratingGiven: 4,
      status: 'Paid (Cash)',
    },
    {
      id: 'earn-4',
      title: 'School Boundary Gate Pillar Construction',
      employer: 'Gram Panchayat Works',
      amount: 2800,
      days: 4,
      rate: 700,
      date: 'Mar 22, 2026',
      month: 'March',
      location: 'Saharsa Bazar',
      ratingGiven: 5,
      status: 'Paid (Bank Transfer)',
    },
  ];

  const filteredEntries = completedEntries.filter(
    (e) => selectedMonth === 'All' || e.month === selectedMonth
  );

  const totalEarnings = completedEntries.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div id="worker-earnings-view" className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Earnings Overview Card */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
              {t('myEarnings', 'Total Verified Earnings')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
              ₹{totalEarnings.toLocaleString('en-IN')}
            </h2>
            <p className="text-xs text-blue-200 mt-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100% on-time settlement rate through Kaam Sarthi safe platform</span>
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 text-center">
            <div>
              <p className="text-[11px] text-blue-200 font-semibold">{t('completedJobs', 'Jobs')}</p>
              <p className="text-lg font-extrabold text-white mt-0.5">{activeWorker.completedJobsCount}</p>
            </div>
            <div>
              <p className="text-[11px] text-blue-200 font-semibold">Avg Rate</p>
              <p className="text-lg font-extrabold text-white mt-0.5">₹{activeWorker.expectedDailyWage}</p>
            </div>
            <div>
              <p className="text-[11px] text-blue-200 font-semibold">{t('rating', 'Rating')}</p>
              <p className="text-lg font-extrabold text-amber-300 mt-0.5">⭐ {activeWorker.rating}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and History Table */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">{t('workHistory', 'Completed Work & Payout History')}</h3>
            <p className="text-xs text-slate-500">
              {language === 'hi' ? 'सभी संपन्न कामों और प्राप्त राशि की रसीद' : 'Record of completed jobs and received payments'}
            </p>
          </div>

          {/* Month Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">{t('filterJobs', 'Month')}:</span>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="p-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
            >
              <option value="All">All Months</option>
              <option value="May">May 2026</option>
              <option value="April">April 2026</option>
              <option value="March">March 2026</option>
            </select>
          </div>
        </div>

        {/* History Cards */}
        <div className="space-y-3">
          {filteredEntries.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl border border-slate-200 hover:border-blue-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  {item.employer} • 📍 {item.location}
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>{item.date}</span>
                  <span>•</span>
                  <span>{item.days} days work (@ ₹{item.rate}/day)</span>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                <p className="text-lg font-black text-emerald-700">
                  + ₹{item.amount.toLocaleString('en-IN')}
                </p>
                <div className="flex items-center text-amber-500 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                  <span>{item.ratingGiven}.0 Employer Rating</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
