import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Globe, Check, Sparkles } from 'lucide-react';
import { supportedLanguages } from '../../data/mockData';

export const AdminLanguagesView: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const phraseKeys = [
    { key: 'appName', label: 'Platform Name' },
    { key: 'findJobs', label: 'Find Jobs Action' },
    { key: 'postJob', label: 'Post Job Action' },
    { key: 'availableForWork', label: 'Availability Toggle' },
    { key: 'urgentJobBanner', label: 'Urgent Banner' },
    { key: 'callNow', label: 'Direct Call CTA' },
    { key: 'applyNow', label: 'Job Application CTA' },
  ];

  return (
    <div id="admin-languages-view" className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
          Multilingual Localization Matrix
        </h2>
        <p className="text-xs text-slate-500">
          Dynamic language support for Hindi, English, and Santhali (ओल चिकी / Ol Chiki)
        </p>
      </div>

      {/* Language Switch Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {supportedLanguages.map((lang) => (
          <div
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`p-5 rounded-3xl border cursor-pointer transition ${
              language === lang.code
                ? 'bg-blue-50/70 border-blue-500 shadow-sm ring-2 ring-blue-500/20'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-2xl">{lang.flag}</span>
                <h3 className="font-extrabold text-base text-slate-900 mt-2">{lang.name}</h3>
                <p className="text-xs text-slate-500 font-medium">{lang.nativeName}</p>
              </div>
              {language === lang.code && (
                <span className="p-1.5 rounded-full bg-blue-600 text-white">
                  <Check className="w-3.5 h-3.5" />
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 mt-3 border-t border-slate-100 pt-2">
              Code: <strong className="text-slate-700">{lang.code}</strong> • Full UI Coverage
            </p>
          </div>
        ))}
      </div>

      {/* Live Preview Table */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
          <Globe className="w-4 h-4 text-blue-600" />
          <span>Active Translation Dictionary Preview</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
              <tr>
                <th className="p-3">UI Token</th>
                <th className="p-3">English (en)</th>
                <th className="p-3">Hindi (hi)</th>
                <th className="p-3">Santhali (sat)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              <tr>
                <td className="p-3 font-mono text-[11px] text-slate-500">findJobs</td>
                <td className="p-3">Find Jobs</td>
                <td className="p-3 text-slate-900 font-bold">काम खोजें</td>
                <td className="p-3 text-emerald-800 font-bold">ᱠᱟᱹᱢᱤ ᱧᱟᱢ</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[11px] text-slate-500">postJob</td>
                <td className="p-3">Post a Job</td>
                <td className="p-3 text-slate-900 font-bold">काम पोस्ट करें</td>
                <td className="p-3 text-emerald-800 font-bold">ᱠᱟᱹᱢᱤ ᱯᱳᱥᱴ</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[11px] text-slate-500">availableForWork</td>
                <td className="p-3">Available for Work</td>
                <td className="p-3 text-slate-900 font-bold">काम के लिए उपलब्ध</td>
                <td className="p-3 text-emerald-800 font-bold">ᱠᱟᱹᱢᱤ ᱞᱟᱹᱜᱤᱫ ᱢᱮᱱᱟᱜᱼᱟ</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[11px] text-slate-500">applyNow</td>
                <td className="p-3">Apply Now</td>
                <td className="p-3 text-slate-900 font-bold">आवेदन करें</td>
                <td className="p-3 text-emerald-800 font-bold">ᱟᱵᱮᱫᱚᱱ ᱢᱮ</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[11px] text-slate-500">callNow</td>
                <td className="p-3">Call Directly</td>
                <td className="p-3 text-slate-900 font-bold">सीधे कॉल करें</td>
                <td className="p-3 text-emerald-800 font-bold">ᱥᱚᱡᱷᱮ ᱯᱷᱳᱱ ᱢᱮ</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
