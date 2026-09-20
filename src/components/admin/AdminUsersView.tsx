import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  Users,
  Search,
  ShieldCheck,
  ShieldAlert,
  Star,
  Check,
  X,
  Phone,
  MapPin,
  Lock,
  Unlock,
} from 'lucide-react';

export const AdminUsersView: React.FC = () => {
  const { workers, employers, verifyWorkerStatus, verifyEmployerStatus } = useApp();
  const { t, language } = useLanguage();

  const [activeTab, setActiveTab] = useState<'workers' | 'employers'>('workers');
  const [search, setSearch] = useState('');
  const [blockedUserIds, setBlockedUserIds] = useState<string[]>([]);

  const toggleBlockUser = (id: string) => {
    setBlockedUserIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const filteredWorkers = workers.filter((w) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      w.name.toLowerCase().includes(q) ||
      w.primarySkill.toLowerCase().includes(q) ||
      w.location.district.toLowerCase().includes(q)
    );
  });

  const filteredEmployers = employers.filter((e) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      e.name.toLowerCase().includes(q) ||
      (e.companyName || e.companyOrOrg || '').toLowerCase().includes(q) ||
      e.location.district.toLowerCase().includes(q)
    );
  });

  return (
    <div id="admin-users-view" className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">User Management Directory</h2>
            <p className="text-xs text-slate-500">
              Verify identity documents, grant trust badges, and moderate accounts
            </p>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('workers')}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition ${
                activeTab === 'workers' ? 'bg-white text-blue-800 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Workers ({workers.length})
            </button>
            <button
              onClick={() => setActiveTab('employers')}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition ${
                activeTab === 'employers' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Employers ({employers.length})
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users by name, skill, company, or district..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-xs font-semibold focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
          />
        </div>
      </div>

      {/* Directory Table / Cards */}
      {activeTab === 'workers' ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
                <tr>
                  <th className="p-4">Worker Profile</th>
                  <th className="p-4">Trade Skill</th>
                  <th className="p-4">District / Location</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredWorkers.map((w) => {
                  const isBlocked = blockedUserIds.includes(w.id);

                  return (
                    <tr key={w.id} className={`hover:bg-slate-50/80 transition ${isBlocked ? 'bg-rose-50/50' : ''}`}>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={w.photo} alt={w.name} className="w-10 h-10 rounded-xl object-cover" />
                          <div>
                            <p className="font-bold text-slate-900">{w.name}</p>
                            <p className="text-[11px] text-slate-400">{w.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-bold text-blue-700">
                        {w.primarySkill}
                        <span className="block text-[10px] text-slate-400 font-normal">{w.experienceYears} yrs exp</span>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-slate-800">{w.location.villageOrCity}</span>
                        <span className="block text-[10px] text-slate-400">{w.location.district}, {w.location.state}</span>
                      </td>
                      <td className="p-4 font-bold text-amber-500">
                        ⭐ {w.rating} ({w.ratingCount})
                      </td>
                      <td className="p-4">
                        {isBlocked ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                            Suspended
                          </span>
                        ) : w.isVerified ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            Verified ✓
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                            Unverified
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => verifyWorkerStatus(w.id, !w.isVerified)}
                            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition ${
                              w.isVerified
                                ? 'bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-700'
                                : 'bg-emerald-600 text-white hover:bg-emerald-700'
                            }`}
                          >
                            {w.isVerified ? 'Revoke' : 'Verify'}
                          </button>
                          <button
                            onClick={() => toggleBlockUser(w.id)}
                            className={`p-1.5 rounded-lg border transition ${
                              isBlocked
                                ? 'border-emerald-300 text-emerald-700 bg-emerald-50'
                                : 'border-rose-200 text-rose-600 hover:bg-rose-50'
                            }`}
                            title={isBlocked ? 'Unblock User' : 'Block / Suspend'}
                          >
                            {isBlocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
                <tr>
                  <th className="p-4">Employer / Company</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Jobs Posted</th>
                  <th className="p-4">Trust Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEmployers.map((e) => {
                  const isBlocked = blockedUserIds.includes(e.id);

                  return (
                    <tr key={e.id} className={`hover:bg-slate-50/80 transition ${isBlocked ? 'bg-rose-50/50' : ''}`}>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={e.photo} alt={e.name} className="w-10 h-10 rounded-xl object-cover" />
                          <div>
                            <p className="font-bold text-slate-900">{e.companyName}</p>
                            <p className="text-[11px] text-slate-500">{e.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-slate-700 font-medium">{e.phone}</td>
                      <td className="p-4 font-semibold text-slate-800">
                        {e.location.district}, {e.location.state}
                      </td>
                      <td className="p-4 font-black text-slate-900">{e.totalJobsPosted}</td>
                      <td className="p-4">
                        {isBlocked ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                            Suspended
                          </span>
                        ) : e.isVerified ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            Verified ✓
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                            Standard
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => verifyEmployerStatus(e.id, !e.isVerified)}
                            className="px-2.5 py-1 rounded-lg font-bold text-[11px] bg-slate-100 text-slate-700 hover:bg-slate-200"
                          >
                            {e.isVerified ? 'Unverify' : 'Verify'}
                          </button>
                          <button
                            onClick={() => toggleBlockUser(e.id)}
                            className={`p-1.5 rounded-lg border transition ${
                              isBlocked
                                ? 'border-emerald-300 text-emerald-700 bg-emerald-50'
                                : 'border-rose-200 text-rose-600 hover:bg-rose-50'
                            }`}
                          >
                            {isBlocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
