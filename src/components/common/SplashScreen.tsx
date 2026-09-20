import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, HardHat, Briefcase, Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useApp } from '../../context/AppContext';

export const SplashScreen: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const { setSplashActive, setOnboardingActive } = useApp();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setSplashActive(false);
            setOnboardingActive(true);
          }, 300);
          return 100;
        }
        return prev + 4;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [setSplashActive, setOnboardingActive]);

  const handleSkip = () => {
    setSplashActive(false);
    setOnboardingActive(true);
  };

  return (
    <div
      id="splash-screen"
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-gradient-to-b from-blue-900 via-blue-800 to-emerald-900 text-white p-6 select-none"
    >
      {/* Top bar with quick language switch */}
      <div className="w-full flex justify-between items-center max-w-md pt-2">
        <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-medium border border-white/15">
          <button
            id="lang-hi-btn"
            onClick={() => setLanguage('hi')}
            className={`px-2 py-0.5 rounded-full transition ${
              language === 'hi' ? 'bg-emerald-500 text-white font-bold' : 'text-blue-100 hover:text-white'
            }`}
          >
            हिंदी
          </button>
          <span>|</span>
          <button
            id="lang-en-btn"
            onClick={() => setLanguage('en')}
            className={`px-2 py-0.5 rounded-full transition ${
              language === 'en' ? 'bg-emerald-500 text-white font-bold' : 'text-blue-100 hover:text-white'
            }`}
          >
            English
          </button>
          <span>|</span>
          <button
            id="lang-sat-btn"
            onClick={() => setLanguage('sat')}
            className={`px-2 py-0.5 rounded-full transition ${
              language === 'sat' ? 'bg-emerald-500 text-white font-bold' : 'text-blue-100 hover:text-white'
            }`}
          >
            ᱥᱟᱱᱛᱟᱲᱤ
          </button>
        </div>

        <button
          id="skip-splash-btn"
          onClick={handleSkip}
          className="text-xs text-blue-200 hover:text-white flex items-center gap-1 font-medium bg-black/20 px-3 py-1.5 rounded-full hover:bg-black/30 transition"
        >
          {t('skip', 'Skip')}
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Logo & Rural/Semi-Urban Visual */}
      <div className="flex flex-col items-center text-center my-auto px-4 max-w-md">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-6"
        >
          <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-blue-600 to-emerald-500 p-1 shadow-2xl shadow-emerald-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-slate-900/90 rounded-[22px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-emerald-500/30 rounded-full blur-xl"></div>
              <div className="absolute -left-4 -top-4 w-16 h-16 bg-blue-500/30 rounded-full blur-xl"></div>
              
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1">
                  <HardHat className="w-8 h-8 text-amber-400" />
                  <Briefcase className="w-7 h-7 text-blue-400" />
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span className="text-[10px] tracking-widest font-black text-emerald-300 uppercase">SARTHI</span>
                </div>
              </div>
            </div>
          </div>
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
          </span>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2"
        >
          {t('appName', 'Kaam Sarthi')}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg sm:text-xl font-medium text-emerald-300 mb-4"
        >
          “{t('tagline', 'Kaam milega, aasani se.')}”
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-xs sm:text-sm text-blue-100 max-w-xs"
        >
          <div className="flex items-center justify-center gap-1.5 text-amber-300 font-semibold mb-1">
            <Sparkles className="w-4 h-4" />
            <span>{language === 'hi' ? 'हमारा संकल्प' : language === 'sat' ? 'ᱟᱞᱮᱭᱟᱜ ᱠᱟᱛᱷᱟ' : 'Our Mission'}</span>
          </div>
          <p className="italic">
            “{t('mission', 'Har skill ko kaam, aur har kaam ko sahi insaan.')}”
          </p>
        </motion.div>
      </div>

      {/* Loading Progress & Bottom tagline */}
      <div className="w-full max-w-xs flex flex-col items-center pb-6">
        <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden mb-3">
          <div
            className="bg-gradient-to-r from-blue-400 to-emerald-400 h-full rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between w-full text-[11px] text-blue-200">
          <span>{language === 'hi' ? 'लोड हो रहा है...' : language === 'sat' ? 'ᱞᱳᱰ ᱠᱟᱱᱟ...' : 'Connecting community...'}</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
};
