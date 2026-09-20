import React from 'react';
import { motion } from 'motion/react';
import { HardHat, Briefcase, Globe, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useApp } from '../../context/AppContext';
import { LanguageCode, UserRole } from '../../types';

export const OnboardingModal: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const { setOnboardingActive, setAuthModalOpen, setCurrentRole, setCurrentView } = useApp();

  const handleSelectRoleAndStart = (role: UserRole) => {
    setCurrentRole(role);
    setCurrentView('dashboard');
    setOnboardingActive(false);
  };

  const handleLoginClick = () => {
    setOnboardingActive(false);
    setAuthModalOpen(true);
  };

  return (
    <div
      id="onboarding-container"
      className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/75 backdrop-blur-md p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-auto"
      >
        {/* Visual Top Header */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-emerald-600 text-white p-6 relative">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-xl">
                KS
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight">Kaam Sarthi</h2>
                <p className="text-xs text-blue-100">{t('tagline', 'Kaam milega, aasani se.')}</p>
              </div>
            </div>

            {/* Language Quick Selector */}
            <div className="flex items-center gap-1 bg-black/20 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold">
              <Globe className="w-3.5 h-3.5 text-emerald-300" />
              {(['hi', 'en', 'sat'] as LanguageCode[]).map((lang) => (
                <button
                  key={lang}
                  id={`onboard-lang-${lang}`}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-0.5 rounded-full transition text-[11px] ${
                    language === lang ? 'bg-white text-blue-900 font-bold shadow-sm' : 'text-blue-100 hover:text-white'
                  }`}
                >
                  {lang === 'hi' ? 'हिंदी' : lang === 'en' ? 'English' : 'ᱥᱟᱱᱛᱟᱲᱤ'}
                </button>
              ))}
            </div>
          </div>

          <h3 className="text-2xl font-bold leading-tight mb-2">
            {t('onboardingTitle', 'Find nearby work or hire trusted workers')}
          </h3>
          <p className="text-sm text-blue-100 leading-relaxed">
            {t('onboardingSubtitle', 'Apne aas-paas kaam dhoondhein ya trusted workers hire karein.')}
          </p>
        </div>

        {/* Body content */}
        <div className="p-6 space-y-6">
          {/* Language Selector block explicitly mandated in onboarding */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              {t('chooseLanguage', 'Choose Language')} / भाषा चुनें
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                id="select-hindi-btn"
                onClick={() => setLanguage('hi')}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition ${
                  language === 'hi'
                    ? 'border-blue-600 bg-blue-50/70 text-blue-950 font-bold shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                }`}
              >
                <span className="text-lg mb-0.5">🇮🇳</span>
                <span className="text-sm font-semibold">हिंदी</span>
                <span className="text-[10px] text-slate-500">Hindi</span>
              </button>

              <button
                type="button"
                id="select-english-btn"
                onClick={() => setLanguage('en')}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition ${
                  language === 'en'
                    ? 'border-blue-600 bg-blue-50/70 text-blue-950 font-bold shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                }`}
              >
                <span className="text-lg mb-0.5">🇬🇧</span>
                <span className="text-sm font-semibold">English</span>
                <span className="text-[10px] text-slate-500">English</span>
              </button>

              <button
                type="button"
                id="select-santhali-btn"
                onClick={() => setLanguage('sat')}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition ${
                  language === 'sat'
                    ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                }`}
              >
                <span className="text-lg mb-0.5">🟢</span>
                <span className="text-sm font-semibold">ᱥᱟᱱᱛᱟᱲᱤ</span>
                <span className="text-[10px] text-slate-500">Santhali</span>
              </button>
            </div>
          </div>

          {/* Role Choice Cards */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              {t('profileType', 'I am here to...')}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Worker Role */}
              <div
                id="choose-worker-card"
                onClick={() => handleSelectRoleAndStart('worker')}
                className="group relative cursor-pointer p-4 rounded-2xl border-2 border-slate-200 hover:border-blue-600 hover:bg-blue-50/50 transition flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                    <HardHat className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-base text-slate-900 mb-1 flex items-center justify-between">
                    <span>{t('worker', 'Worker')}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                      {language === 'hi' ? 'कामगार' : language === 'sat' ? 'ᱠᱟᱹᱢᱤᱭᱟᱹ' : 'Job Seeker'}
                    </span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {t('workerDesc', 'I am looking for daily, contractual or skilled work nearby.')}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-blue-600">
                  <span>{t('getStarted', 'Get Started')}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition" />
                </div>
              </div>

              {/* Employer Role */}
              <div
                id="choose-employer-card"
                onClick={() => handleSelectRoleAndStart('employer')}
                className="group relative cursor-pointer p-4 rounded-2xl border-2 border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/50 transition flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-base text-slate-900 mb-1 flex items-center justify-between">
                    <span>{t('employer', 'Employer')}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                      {language === 'hi' ? 'मालिक' : language === 'sat' ? 'ᱠᱟᱹᱢᱤ ᱮᱢᱚᱜᱤᱡ' : 'Hirer'}
                    </span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {t('employerDesc', 'I want to hire skilled or unskilled workers for site, home or farm.')}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-emerald-600">
                  <span>{t('getStarted', 'Get Started')}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition" />
                </div>
              </div>
            </div>
          </div>

          {/* Features Highlights */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{language === 'hi' ? 'सीधे मोबाइल नंबर से लॉगिन, कोई मुश्किल पासवर्ड नहीं' : 'Instant mobile number & OTP verification'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{language === 'hi' ? 'ग्राम पंचायत व ब्लॉक स्तर पर सटीक दूरी और काम' : 'Accurate local distance matching within 500m to 10km'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{language === 'hi' ? 'प्रशासन द्वारा सत्यापित कामगार और सही समय पर भुगतान' : 'Admin verified profiles and trusted on-time payments'}</span>
            </div>
          </div>

          {/* Bottom actions: Get Started / Login */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <button
              type="button"
              id="onboarding-get-started-btn"
              onClick={() => handleSelectRoleAndStart('worker')}
              className="flex-1 py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition flex items-center justify-center gap-2"
            >
              <span>{t('getStarted', 'Get Started')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              id="onboarding-login-btn"
              onClick={handleLoginClick}
              className="py-3.5 px-6 rounded-2xl border-2 border-slate-300 hover:border-slate-400 text-slate-800 font-bold text-sm bg-white hover:bg-slate-50 transition"
            >
              {t('login', 'Login')}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
