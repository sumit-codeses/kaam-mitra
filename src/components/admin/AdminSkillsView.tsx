import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { allSkillsList, mockDistricts } from '../../data/mockData';
import { Plus, Tag, MapPin, Check, Trash2 } from 'lucide-react';

export const AdminSkillsView: React.FC = () => {
  const { t } = useLanguage();

  const [skills, setSkills] = useState<string[]>(allSkillsList);
  const [districts, setDistricts] = useState<string[]>(mockDistricts);

  const [newSkill, setNewSkill] = useState('');
  const [newDistrict, setNewDistrict] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim() || skills.includes(newSkill.trim())) return;
    setSkills([...skills, newSkill.trim()]);
    setNewSkill('');
    setSuccessMsg('Trade skill added successfully!');
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  const handleAddDistrict = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDistrict.trim() || districts.includes(newDistrict.trim())) return;
    setDistricts([...districts, newDistrict.trim()]);
    setNewDistrict('');
    setSuccessMsg('Operational district added successfully!');
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  const removeSkill = (sk: string) => {
    setSkills(skills.filter((s) => s !== sk));
  };

  const removeDistrict = (d: string) => {
    setDistricts(districts.filter((x) => x !== d));
  };

  return (
    <div id="admin-skills-view" className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
          Skills & Operational Territories Management
        </h2>
        <p className="text-xs text-slate-500">
          Configure recognized vocational job trades and district expansion boundaries
        </p>

        {successMsg && (
          <div className="mt-3 p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold border border-emerald-200">
            ✓ {successMsg}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trade Skills Manager */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Tag className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="font-bold text-sm text-slate-900">Recognized Trade Categories</h3>
              <p className="text-xs text-slate-400">Total {skills.length} available trades</p>
            </div>
          </div>

          <form onSubmit={handleAddSkill} className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="e.g. Solar Pump Technician"
              className="flex-1 p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Skill</span>
            </button>
          </form>

          <div className="flex flex-wrap gap-2 pt-2">
            {skills.map((s) => (
              <span
                key={s}
                className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold flex items-center gap-2 group hover:bg-slate-200 transition"
              >
                <span>{s}</span>
                <button
                  onClick={() => removeSkill(s)}
                  className="text-slate-400 hover:text-rose-600 transition"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Operational Territory Manager */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <div>
              <h3 className="font-bold text-sm text-slate-900">Active Districts & Coverage</h3>
              <p className="text-xs text-slate-400">Total {districts.length} active service districts</p>
            </div>
          </div>

          <form onSubmit={handleAddDistrict} className="flex gap-2">
            <input
              type="text"
              value={newDistrict}
              onChange={(e) => setNewDistrict(e.target.value)}
              placeholder="e.g. Madhepura"
              className="flex-1 p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add District</span>
            </button>
          </form>

          <div className="flex flex-wrap gap-2 pt-2">
            {districts.map((d) => (
              <span
                key={d}
                className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold flex items-center gap-2"
              >
                <span>📍 {d}</span>
                <button
                  onClick={() => removeDistrict(d)}
                  className="text-emerald-500 hover:text-rose-600 transition"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
