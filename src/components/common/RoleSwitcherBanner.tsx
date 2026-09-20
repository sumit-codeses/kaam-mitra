import React from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { UserRole, LanguageCode } from '../../types';
import { HardHat, Briefcase, ShieldAlert, Globe, Sparkles } from 'lucide-react';

export const RoleSwitcherBanner: React.FC = () => {
  const { currentRole, setCurrentRole, setCurrentView, setSplashActive, setOnboardingActive } = useApp();
  const { language, setLanguage } = useLanguage();

  return (
    <aside
      id="demo-role-switcher-banner"
      aria-label="Demo Prototype Controls"
      className="bg-slate-900 text-white text-xs border-b border-slate-800 px-3 py-2 select-none z-30 relative"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Role Switch buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Prototype Demo Role:</span>
          </span>

          {/* Worker Switch */}
          <button
            id="role-switch-worker"
            onClick={() => {
              setCurrentRole('worker');
              setCurrentView('dashboard');
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition text-xs ${
              currentRole === 'worker'
                ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400/40'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <HardHat className="w-3.5 h-3.5 text-amber-300" />
            <span>Worker</span>
            <span className="text-[10px] opacity-75 font-normal hidden md:inline">(Ramesh - Mason)</span>
          </button>

          {/* Employer Switch */}
          <button
            id="role-switch-employer"
            onClick={() => {
              setCurrentRole('employer');
              setCurrentView('dashboard');
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition text-xs ${
              currentRole === 'employer'
                ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-400/40'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-emerald-300" />
            <span>Employer</span>
            <span className="text-[10px] opacity-75 font-normal hidden md:inline">(Rajesh Sharma)</span>
          </button>

          {/* Admin Switch */}
          <button
            id="role-switch-admin"
            onClick={() => {
              setCurrentRole('admin');
              setCurrentView('dashboard');
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition text-xs ${
              currentRole === 'admin'
                ? 'bg-purple-600 text-white shadow-sm ring-2 ring-purple-400/40'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-purple-300" />
            <span>Admin Console</span>
          </button>
        </div>

        {/* Right: Quick language toggle + Restart Demo */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-lg text-[11px] font-semibold">
            <Globe className="w-3 h-3 text-slate-400" />
            {(['hi', 'en', 'sat'] as LanguageCode[]).map((code) => (
              <button
                key={code}
                id={`banner-lang-${code}`}
                onClick={() => setLanguage(code)}
                className={`px-1.5 py-0.5 rounded transition ${
                  language === code ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {code === 'hi' ? 'हिंदी' : code === 'en' ? 'EN' : 'ᱥᱟᱱᱛᱟᱲᱤ'}
              </button>
            ))}
          </div>

          <button
            id="btn-replay-splash"
            onClick={() => setSplashActive(true)}
            className="text-[11px] text-slate-400 hover:text-white hover:underline hidden sm:inline"
            title="Replay Splash Screen"
          >
            Splash
          </button>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <button
            id="btn-replay-onboarding"
            onClick={() => setOnboardingActive(true)}
            className="text-[11px] text-slate-400 hover:text-white hover:underline hidden sm:inline"
            title="Replay Onboarding Guide"
          >
            Onboarding
          </button>
        </div>
      </div>
    </aside>
  );
};
