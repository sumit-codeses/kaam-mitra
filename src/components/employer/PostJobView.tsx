import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  PlusCircle,
  Briefcase,
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Users,
  AlertCircle,
  Phone,
  Sparkles,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { allSkillsList } from '../../data/mockData';
import { WorkerSkill, WorkType } from '../../types';

export const PostJobView: React.FC = () => {
  const { postJob, activeEmployer, setCurrentView } = useApp();
  const { t, language } = useLanguage();

  const [title, setTitle] = useState('Urgent 2 Brickwork Masons Needed for Boundary Construction');
  const [description, setDescription] = useState(
    'Require skilled masons with experience in English bond brickwork and mortar leveling for commercial site boundary wall. Daily evening cash payment guaranteed.'
  );
  const [requiredSkill, setRequiredSkill] = useState<WorkerSkill>('Mason');
  const [workersNeeded, setWorkersNeeded] = useState(2);
  const [workType, setWorkType] = useState<WorkType>('daily');
  const [payment, setPayment] = useState(700);
  const [paymentType, setPaymentType] = useState<'day' | 'fixed' | 'hour'>('day');
  const [durationDays, setDurationDays] = useState(4);
  const [workDate, setWorkDate] = useState('Tomorrow');
  const [startTime, setStartTime] = useState('8:30 AM');
  const [endTime, setEndTime] = useState('5:30 PM');
  const [stateName, setStateName] = useState(activeEmployer.location.state);
  const [district, setDistrict] = useState(activeEmployer.location.district);
  const [block, setBlock] = useState(activeEmployer.location.block);
  const [village, setVillage] = useState(activeEmployer.location.villageOrCity);
  const [pincode, setPincode] = useState('852201');
  const [isUrgent, setIsUrgent] = useState(true);
  const [contactPhone, setContactPhone] = useState(activeEmployer.phone);
  const [perks, setPerks] = useState<string[]>(['Lunch Provided', 'Tea Provided']);

  const perkOptions = [
    'Lunch Provided',
    'Morning/Evening Tea Provided',
    'Tools Provided on Site',
    'Transport Pick-up from Bus Stand',
    'Overtime Pay for Extra Hours',
  ];

  const togglePerk = (p: string) => {
    setPerks((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postJob({
      title,
      description: `${description} ${perks.length > 0 ? '• Perks: ' + perks.join(', ') : ''}`,
      requiredSkill,
      workersNeeded: Number(workersNeeded),
      workType,
      payment: Number(payment),
      paymentType,
      durationDays: Number(durationDays),
      experienceRequiredYears: 1,
      contactPreference: 'both',
      status: 'active',
      workDate,
      startTime,
      endTime,
      isUrgent,
      location: {
        state: stateName,
        district,
        block,
        villageOrCity: village,
        pincode,
      },
      distanceKm: 2.1,
    });
  };

  return (
    <div id="post-job-view" className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <PlusCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {t('postJob', 'Post a New Job')}
            </h2>
            <p className="text-xs text-slate-500">
              {language === 'hi'
                ? 'नजदीकी श्रमिकों तक तुरंत सूचना भेजें (SMS व मोबाइल ऐप के माध्यम से)'
                : 'Broadcast your requirement instantly to verified local workers'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        {/* Section: Job Basics */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
            1. {language === 'hi' ? 'काम की मुख्य जानकारी' : 'Basic Requirement Details'}
          </h3>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              {language === 'hi' ? 'काम का शीर्षक (Job Title)' : 'Job Title'} *
            </label>
            <input
              id="post-job-title-input"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 2 Masons required for house foundation work"
              className="w-full p-3 rounded-2xl border border-slate-200 text-sm font-semibold focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                {t('requiredSkill', 'Required Trade Skill')} *
              </label>
              <select
                id="post-job-skill-select"
                value={requiredSkill}
                onChange={(e) => setRequiredSkill(e.target.value as WorkerSkill)}
                className="w-full p-3 rounded-2xl border border-slate-200 text-sm font-semibold bg-white"
              >
                {allSkillsList.map((sk) => (
                  <option key={sk} value={sk}>
                    {sk}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                {t('workersNeeded', 'Number of Workers Needed')} *
              </label>
              <div className="relative">
                <Users className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  id="post-job-workers-needed-input"
                  type="number"
                  min="1"
                  max="50"
                  required
                  value={workersNeeded}
                  onChange={(e) => setWorkersNeeded(Number(e.target.value))}
                  className="w-full pl-9 pr-3 py-3 rounded-2xl border border-slate-200 text-sm font-semibold"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              {language === 'hi' ? 'काम का विवरण (Description)' : 'Job Description'} *
            </label>
            <textarea
              id="post-job-desc-input"
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail the work duties, site condition, materials, etc."
              className="w-full p-3 rounded-2xl border border-slate-200 text-xs font-medium resize-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
            />
          </div>
        </div>

        {/* Section: Pay & Timings */}
        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
            2. {language === 'hi' ? 'भुगतान व समय' : 'Payment & Timing'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                {language === 'hi' ? 'मजदूरी राशि (₹)' : 'Payment Amount (₹)'} *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-slate-500 font-bold">₹</span>
                <input
                  id="post-job-pay-input"
                  type="number"
                  min="100"
                  required
                  value={payment}
                  onChange={(e) => setPayment(Number(e.target.value))}
                  className="w-full pl-8 pr-3 py-3 rounded-2xl border border-slate-200 text-sm font-black text-emerald-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                {language === 'hi' ? 'भुगतान प्रकार' : 'Payment Frequency'}
              </label>
              <select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value as any)}
                className="w-full p-3 rounded-2xl border border-slate-200 text-sm font-semibold bg-white"
              >
                <option value="day">Per Day (प्रति दिन)</option>
                <option value="fixed">Fixed Lumpsum (कुल ठेका)</option>
                <option value="hour">Per Hour (प्रति घंटा)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                {language === 'hi' ? 'अवधि (दिन)' : 'Duration (Days)'}
              </label>
              <input
                type="number"
                min="1"
                max="90"
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full p-3 rounded-2xl border border-slate-200 text-sm font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                {t('workDate', 'Work Date')}
              </label>
              <input
                type="text"
                value={workDate}
                onChange={(e) => setWorkDate(e.target.value)}
                placeholder="Tomorrow, or 25 May"
                className="w-full p-3 rounded-2xl border border-slate-200 text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                {t('workTiming', 'Start Time')}
              </label>
              <input
                type="text"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-3 rounded-2xl border border-slate-200 text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                End Time
              </label>
              <input
                type="text"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-3 rounded-2xl border border-slate-200 text-sm font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Section: Location */}
        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
            3. {language === 'hi' ? 'कार्य स्थल का पता' : 'Work Site Location'}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Village / City</label>
              <input
                type="text"
                required
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Block</label>
              <input
                type="text"
                required
                value={block}
                onChange={(e) => setBlock(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">District</label>
              <input
                type="text"
                required
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">PIN Code</label>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Section: Priority & Perks */}
        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
            4. {language === 'hi' ? 'प्राथमिकता व सुविधाएं' : 'Urgency & Perks'}
          </h3>

          {/* Urgent switch */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-amber-200 rounded-xl text-amber-900 font-bold">⚡</span>
              <div>
                <p className="font-bold text-xs sm:text-sm text-amber-950">
                  {t('urgentJobBanner', 'Mark as Urgent Job')}
                </p>
                <p className="text-[11px] text-amber-800">
                  Sends instant priority WhatsApp and SMS push to all active workers within 10 km
                </p>
              </div>
            </div>
            <input
              id="post-job-urgent-checkbox"
              type="checkbox"
              checked={isUrgent}
              onChange={(e) => setIsUrgent(e.target.checked)}
              className="w-5 h-5 accent-amber-600 rounded-md cursor-pointer"
            />
          </div>

          {/* Perks selection */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-2">
              {language === 'hi' ? 'अतिरिक्त सुविधाएं' : 'Perks & Site Facilities'}
            </label>
            <div className="flex flex-wrap gap-2">
              {perkOptions.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => togglePerk(p)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition border flex items-center gap-1.5 ${
                    perks.includes(p)
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {perks.includes(p) && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  <span>{p}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            ✓ Free prototype posting • Workers will receive immediate alert
          </p>

          <div className="flex gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setCurrentView('dashboard')}
              className="flex-1 sm:flex-none px-5 py-3 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              id="submit-post-job-btn"
              type="submit"
              className="flex-1 sm:flex-none px-8 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t('postJob', 'Publish Job Now')}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
