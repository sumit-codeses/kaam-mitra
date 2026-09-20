import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { supportedLanguages } from '../../data/mockData';
import { Globe, Check, Volume2, ArrowRight } from 'lucide-react';
import { Language } from '../../types';

interface OnboardingLanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingLanguageModal: React.FC<OnboardingLanguageModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { language, setLanguage, t } = useLanguage();

  if (!isOpen) return null;

  const handleSelect = (code: Language) => {
    setLanguage(code);
    // Speak simulated phrase
    if ('speechSynthesis' in window) {
      try {
        const text =
          code === 'hi'
            ? 'काम सारथी में आपका स्वागत है'
            : code === 'sat'
            ? 'ᱠᱟᱹᱢᱤ ᱥᱟᱨᱛᱷᱤ ᱨᱮ ᱥᱟᱹᱜᱩᱱ ᱫᱟᱨᱟᱢ'
            : 'Welcome to Kaam Sarthi';
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = code === 'hi' ? 'hi-IN' : 'en-IN';
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        // ignore
      }
    }
  };

  return (
    <div
      id="onboarding-language-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-7 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
            <Globe className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-black text-slate-900">
            अपनी भाषा चुनें / Choose Language
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            ᱟᱯᱱᱟᱨᱟᱜ ᱯᱟᱹᱨᱥᱤ ᱵᱟᱪᱷᱟᱣ ᱢᱮ • Kaam Sarthi supports your local mother tongue
          </p>
        </div>

        {/* 3 Language Cards */}
        <div className="space-y-2.5">
          {supportedLanguages.map((lang) => {
            const isSelected = language === lang.code;

            return (
              <button
                key={lang.code}
                id={`lang-select-${lang.code}`}
                onClick={() => handleSelect(lang.code)}
                className={`w-full p-4 rounded-2xl border text-left transition flex items-center justify-between group ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-600/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="text-3xl filter drop-shadow-xs">{lang.flag}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-base text-slate-900 group-hover:text-blue-700 transition">
                        {lang.nativeName}
                      </span>
                      <span className="text-xs text-slate-400">({lang.name})</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {lang.code === 'hi' && 'हिन्दी में सभी काम व आवेदन'}
                      {lang.code === 'en' && 'Explore all opportunities in English'}
                      {lang.code === 'sat' && 'ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱠᱟᱹᱢᱤ ᱟᱨ ᱟᱵᱮᱫᱚᱱ'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      isSelected ? 'bg-blue-600 text-white' : 'border border-slate-300 text-transparent'
                    }`}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Confirm Button */}
        <div className="pt-2">
          <button
            id="onboarding-lang-confirm-btn"
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
          >
            <span>{t('applyNow', 'Continue')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
