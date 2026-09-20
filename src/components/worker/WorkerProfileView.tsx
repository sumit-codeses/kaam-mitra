import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  User,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  DollarSign,
  Calendar,
  Languages,
  Wrench,
  Edit3,
  Check,
  Plus,
  X,
  Clock,
  Briefcase,
  Headphones,
} from 'lucide-react';
import { allSkillsList } from '../../data/mockData';
import { WorkerSkill } from '../../types';

export const WorkerProfileView: React.FC = () => {
  const { activeWorker, updateWorkerProfile, toggleWorkerAvailability, setAuthModalOpen } = useApp();
  const { t, language } = useLanguage();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(activeWorker.name);
  const [phone, setPhone] = useState(activeWorker.phone);
  const [primarySkill, setPrimarySkill] = useState<WorkerSkill>(activeWorker.primarySkill);
  const [secondarySkills, setSecondarySkills] = useState<WorkerSkill[]>((activeWorker.secondarySkills as WorkerSkill[]) || activeWorker.skills || []);
  const [experienceYears, setExperienceYears] = useState(activeWorker.experienceYears);
  const [expectedDailyWage, setExpectedDailyWage] = useState(activeWorker.expectedDailyWage);
  const [village, setVillage] = useState(activeWorker.location.villageOrCity);
  const [block, setBlock] = useState(activeWorker.location.block);
  const [district, setDistrict] = useState(activeWorker.location.district);
  const [stateName, setStateName] = useState(activeWorker.location.state);
  const [bio, setBio] = useState(activeWorker.bio || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateWorkerProfile({
      name,
      phone,
      primarySkill,
      secondarySkills,
      experienceYears: Number(experienceYears),
      expectedDailyWage: Number(expectedDailyWage),
      bio,
      location: {
        state: stateName,
        district,
        block,
        villageOrCity: village,
      },
    });
    setIsEditing(false);
  };

  const addSkill = (skill: WorkerSkill) => {
    if (!secondarySkills.includes(skill) && skill !== primarySkill) {
      setSecondarySkills([...secondarySkills, skill]);
    }
  };

  const removeSkill = (skill: WorkerSkill) => {
    setSecondarySkills(secondarySkills.filter((s) => s !== skill));
  };

  return (
    <div id="worker-profile-view" className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={activeWorker.photo}
                alt={activeWorker.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-4 border-slate-100 shadow-md"
              />
              {activeWorker.isVerified && (
                <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white rounded-full p-1.5 shadow-sm">
                  <ShieldCheck className="w-4 h-4" />
                </span>
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">{activeWorker.name}</h2>
                {activeWorker.isVerified ? (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{t('verifiedWorker', 'Verified Worker')}</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                    Verification In Progress
                  </span>
                )}
              </div>

              <p className="text-sm font-semibold text-blue-700 mt-0.5">
                {activeWorker.primarySkill} ({activeWorker.experienceYears} {t('yearsExperience', 'years exp.')})
              </p>

              <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  {activeWorker.location.villageOrCity}, Block {activeWorker.location.block},{' '}
                  {activeWorker.location.district}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              id="edit-worker-profile-btn"
              onClick={() => setIsEditing(!isEditing)}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition flex items-center justify-center gap-2"
            >
              <Edit3 className="w-4 h-4 text-blue-600" />
              <span>{isEditing ? 'Cancel Edit' : t('editProfile', 'Edit Profile')}</span>
            </button>

            <button
              id="worker-profile-availability-toggle"
              onClick={() => toggleWorkerAvailability()}
              className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                activeWorker.isAvailable
                  ? 'bg-emerald-600 text-white shadow-xs hover:bg-emerald-700'
                  : 'bg-rose-50 text-rose-700 border border-rose-300 hover:bg-rose-100'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeWorker.isAvailable ? 'bg-white' : 'bg-rose-500'}`} />
              <span>{activeWorker.isAvailable ? t('availableForWork', 'Available') : t('notAvailable', 'Busy')}</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-100">
          <div className="bg-slate-50 p-3 rounded-2xl">
            <p className="text-[11px] font-bold text-slate-400 uppercase">{t('rating', 'Rating')}</p>
            <p className="text-lg font-black text-amber-500 flex items-center gap-1 mt-0.5">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{activeWorker.rating}</span>
              <span className="text-xs text-slate-400 font-normal">({activeWorker.ratingCount})</span>
            </p>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl">
            <p className="text-[11px] font-bold text-slate-400 uppercase">{t('completedJobs', 'Completed Jobs')}</p>
            <p className="text-lg font-black text-slate-900 mt-0.5">{activeWorker.completedJobsCount}</p>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl">
            <p className="text-[11px] font-bold text-slate-400 uppercase">{t('expectedWage', 'Expected Wage')}</p>
            <p className="text-lg font-black text-blue-900 mt-0.5">₹{activeWorker.expectedDailyWage}<span className="text-xs text-slate-500 font-normal">/day</span></p>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl">
            <p className="text-[11px] font-bold text-slate-400 uppercase">{t('mobileNumber', 'Mobile Number')}</p>
            <p className="text-sm font-bold text-slate-800 mt-1">{activeWorker.phone}</p>
          </div>
        </div>
      </div>

      {/* Profile Edit Mode Form */}
      {isEditing ? (
        <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            {language === 'hi' ? 'श्रमिक प्रोफ़ाइल संपादित करें' : 'Update Worker Profile Details'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">{t('name', 'Full Name')}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">{t('mobileNumber', 'Mobile Number')}</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                {t('primarySkill', 'Primary Trade Skill')}
              </label>
              <select
                value={primarySkill}
                onChange={(e) => setPrimarySkill(e.target.value as WorkerSkill)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium bg-white"
              >
                {allSkillsList.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                {language === 'hi' ? 'अपेक्षित दैनिक मजदूरी (₹)' : 'Expected Daily Wage (₹)'}
              </label>
              <input
                type="number"
                value={expectedDailyWage}
                onChange={(e) => setExpectedDailyWage(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                {language === 'hi' ? 'अनुभव (वर्ष)' : 'Experience (Years)'}
              </label>
              <input
                type="number"
                value={experienceYears}
                onChange={(e) => setExperienceYears(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Village / City</label>
              <input
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Block</label>
              <input
                type="text"
                value={block}
                onChange={(e) => setBlock(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">District</label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
              />
            </div>
          </div>

          {/* Secondary skills selection */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
              {language === 'hi' ? 'अतिरिक्त हुनर (Secondary Skills)' : 'Additional Trade Skills'}
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {secondarySkills.map((sk) => (
                <span
                  key={sk}
                  className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200 flex items-center gap-1.5"
                >
                  <span>{sk}</span>
                  <button type="button" onClick={() => removeSkill(sk)}>
                    <X className="w-3.5 h-3.5 text-slate-400 hover:text-red-600" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {allSkillsList
                .filter((s) => s !== primarySkill && !secondarySkills.includes(s))
                .slice(0, 6)
                .map((sk) => (
                  <button
                    key={sk}
                    type="button"
                    onClick={() => addSkill(sk)}
                    className="px-2.5 py-1 rounded-full text-[11px] border border-slate-200 hover:bg-slate-50 text-slate-600 flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>{sk}</span>
                  </button>
                ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              {language === 'hi' ? 'अपने बारे में संक्षेप में लिखें' : 'Bio / Trade Summary'}
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
            />
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md"
            >
              {t('saveProfile', 'Save Profile')}
            </button>
          </div>
        </form>
      ) : null}

      {/* Skills & Verification Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-blue-600" />
            <span>{language === 'hi' ? 'हुनर व कार्य योग्यता' : 'Skills & Capabilities'}</span>
          </h3>

          <div>
            <p className="text-xs font-bold text-slate-400 uppercase mb-1.5">{t('primarySkill', 'Primary Skill')}</p>
            <span className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs inline-block shadow-2xs">
              {activeWorker.primarySkill} ({activeWorker.experienceYears} years)
            </span>
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 uppercase mb-1.5">
              {language === 'hi' ? 'अन्य हुनर' : 'Other Skills'}
            </p>
            <div className="flex flex-wrap gap-2">
              {(activeWorker.secondarySkills || activeWorker.skills || []).map((s: string) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 uppercase mb-1.5">
              {language === 'hi' ? 'बोली जाने वाली भाषाएं' : 'Languages Known'}
            </p>
            <div className="flex flex-wrap gap-2">
              {(activeWorker.languages || activeWorker.languagesKnown || []).map((l: string) => (
                <span
                  key={l}
                  className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200 flex items-center gap-1"
                >
                  <Languages className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{l}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Verification & Trust Badge */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{language === 'hi' ? 'सत्यापन व सुरक्षा स्थिति' : 'Verification & Safety Trust'}</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-emerald-950">Aadhaar ID Verification</span>
              </div>
              <span className="font-extrabold text-emerald-700">✓ Completed</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-emerald-950">Mobile OTP Verified</span>
              </div>
              <span className="font-extrabold text-emerald-700">✓ Active</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-emerald-950">Panchayat / Local Reference</span>
              </div>
              <span className="font-extrabold text-emerald-700">✓ Endorsed</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-between">
            <div>
              <p className="font-bold text-xs text-blue-950">{t('contactSupport', 'Need Help or Verification?')}</p>
              <p className="text-[11px] text-blue-700">Free Call to Sarthi Sahayak Center</p>
            </div>
            <a
              href="tel:18008892026"
              className="p-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
              title="Call Helpline"
            >
              <Headphones className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
