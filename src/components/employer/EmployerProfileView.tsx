import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  Briefcase,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Building,
  CheckCircle2,
  Calendar,
  Edit3,
  Award,
} from 'lucide-react';

export const EmployerProfileView: React.FC = () => {
  const { activeEmployer, updateEmployerProfile, jobs } = useApp();
  const { t, language } = useLanguage();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(activeEmployer.name);
  const [companyName, setCompanyName] = useState(activeEmployer.companyName);
  const [phone, setPhone] = useState(activeEmployer.phone);
  const [village, setVillage] = useState(activeEmployer.location.villageOrCity);
  const [block, setBlock] = useState(activeEmployer.location.block);
  const [district, setDistrict] = useState(activeEmployer.location.district);
  const [stateName, setStateName] = useState(activeEmployer.location.state);

  const myJobs = jobs.filter((j) => j.employerId === activeEmployer.id);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateEmployerProfile({
      name,
      companyName,
      phone,
      location: {
        state: stateName,
        district,
        block,
        villageOrCity: village,
      },
    });
    setIsEditing(false);
  };

  return (
    <div id="employer-profile-view" className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={activeEmployer.photo}
                alt={activeEmployer.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-4 border-slate-100 shadow-md"
              />
              {activeEmployer.isVerified && (
                <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white rounded-full p-1.5 shadow-sm">
                  <ShieldCheck className="w-4 h-4" />
                </span>
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">{activeEmployer.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{t('verifiedEmployer', 'Verified Employer')}</span>
                </span>
              </div>

              <p className="text-sm font-semibold text-emerald-800 mt-0.5 flex items-center gap-1.5">
                <Building className="w-4 h-4 text-emerald-600" />
                <span>{activeEmployer.companyName}</span>
              </p>

              <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  {activeEmployer.location.villageOrCity}, {activeEmployer.location.district},{' '}
                  {activeEmployer.location.state}
                </span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition flex items-center gap-2"
          >
            <Edit3 className="w-4 h-4 text-emerald-600" />
            <span>{isEditing ? 'Cancel' : t('editProfile', 'Edit Profile')}</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-100">
          <div className="bg-slate-50 p-3 rounded-2xl">
            <p className="text-[11px] font-bold text-slate-400 uppercase">{t('rating', 'Rating')}</p>
            <p className="text-lg font-black text-amber-500 flex items-center gap-1 mt-0.5">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{activeEmployer.rating}</span>
            </p>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl">
            <p className="text-[11px] font-bold text-slate-400 uppercase">Jobs Posted</p>
            <p className="text-lg font-black text-slate-900 mt-0.5">{myJobs.length}</p>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl">
            <p className="text-[11px] font-bold text-slate-400 uppercase">Payment Record</p>
            <p className="text-lg font-black text-emerald-700 mt-0.5">100% On-Time</p>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl">
            <p className="text-[11px] font-bold text-slate-400 uppercase">{t('mobileNumber', 'Mobile')}</p>
            <p className="text-sm font-bold text-slate-800 mt-1">{activeEmployer.phone}</p>
          </div>
        </div>
      </div>

      {/* Edit Form if toggle is active */}
      {isEditing && (
        <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            Update Employer Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-500 mb-1">Contact Person Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-500 mb-1">Company / Enterprise Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-500 mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-500 mb-1">District</label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-xs"
            >
              Save Details
            </button>
          </div>
        </form>
      )}

      {/* Trust & Safety verification */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-600" />
          <span>Employer Trust Score & Badges</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
            <p className="font-bold text-emerald-950">✓ GST / MSME Verified</p>
            <p className="text-[11px] text-emerald-800 mt-0.5">Legally registered contractor</p>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
            <p className="font-bold text-emerald-950">✓ Fair Wage Guarantee</p>
            <p className="text-[11px] text-emerald-800 mt-0.5">Adheres to state minimum wage</p>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
            <p className="font-bold text-emerald-950">✓ Prompt Payouts</p>
            <p className="text-[11px] text-emerald-800 mt-0.5">Average payment release &lt; 2 hrs</p>
          </div>
        </div>
      </div>
    </div>
  );
};
