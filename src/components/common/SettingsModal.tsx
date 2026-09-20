import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useApp } from '../../context/AppContext';
import {
  Settings,
  X,
  Globe,
  Bell,
  Volume2,
  Shield,
  PhoneCall,
  Check,
  Info,
} from 'lucide-react';
import { supportedLanguages } from '../../data/mockData';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { language, setLanguage, t } = useLanguage();
  const { currentRole } = useApp();

  const [smsAlerts, setSmsAlerts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [voiceAssistance, setVoiceAssistance] = useState(true);

  if (!isOpen) return null;

  return (
    <div
      id="settings-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in"
    >
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-slate-700" />
            <h3 className="font-extrabold text-base text-slate-900">{t('settings', 'Settings & Preferences')}</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <Globe className="w-4 h-4 text-blue-600" />
            <span>Select App Language (भाषा)</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {supportedLanguages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1 ${
                  language === l.code
                    ? 'border-blue-600 bg-blue-50/60 font-bold text-blue-900 ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold'
                }`}
              >
                <span className="text-xl">{l.flag}</span>
                <span className="text-xs">{l.nativeName}</span>
                <span className="text-[10px] text-slate-400">({l.name})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Notifications & Audio Toggles */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Alerts & Voice Preferences
          </h4>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50">
              <div className="flex items-center gap-2.5">
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <div>
                  <p className="font-bold text-slate-800">Voice Assistant / Audio Readout</p>
                  <p className="text-[11px] text-slate-500">Reads out job details and wages for easy listening</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={voiceAssistance}
                onChange={(e) => setVoiceAssistance(e.target.checked)}
                className="w-4 h-4 accent-blue-600 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50">
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="font-bold text-slate-800">Instant SMS & WhatsApp Alerts</p>
                  <p className="text-[11px] text-slate-500">Get notified the second a matching job is posted</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="w-4 h-4 accent-blue-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Safety & Helpline */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-2">
          <div className="flex items-center gap-2 text-amber-900 font-bold">
            <PhoneCall className="w-4 h-4 text-amber-700" />
            <span>24/7 Rural Worker Safety & Wage Helpline</span>
          </div>
          <p className="text-[11px] text-amber-800">
            Call toll-free: <strong>1800-202-8899</strong> or contact local Panchayat Coordinator for immediate assistance.
          </p>
        </div>

        {/* About info */}
        <div className="text-[11px] text-slate-400 text-center pt-2">
          <p className="font-bold text-slate-600">Kaam Sarthi Prototype v2.4</p>
          <p>“Har skill ko kaam, aur har kaam ko sahi insaan.”</p>
        </div>

        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
