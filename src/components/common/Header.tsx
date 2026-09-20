import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  Bell,
  MapPin,
  HardHat,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  Globe,
  ChevronDown,
  User,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { mockLocations } from '../../data/mockData';
import { LanguageCode } from '../../types';

interface HeaderProps {
  onOpenNotifications: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenNotifications }) => {
  const {
    currentRole,
    activeWorker,
    activeEmployer,
    selectedLocation,
    setSelectedLocation,
    toggleWorkerAvailability,
    notifications,
    setCurrentView,
    setAuthModalOpen,
  } = useApp();

  const { t, language, setLanguage } = useLanguage();
  const [locDropdownOpen, setLocDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const currentProfile =
    currentRole === 'worker'
      ? {
          name: activeWorker.name,
          photo: activeWorker.photo,
          roleLabel: t('worker', 'Worker'),
          verified: activeWorker.isVerified,
          badgeColor: 'bg-blue-100 text-blue-800',
        }
      : currentRole === 'employer'
      ? {
          name: activeEmployer.name,
          photo: activeEmployer.photo,
          roleLabel: t('employer', 'Employer'),
          verified: activeEmployer.isVerified,
          badgeColor: 'bg-emerald-100 text-emerald-800',
        }
      : {
          name: 'Super Admin',
          photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          roleLabel: 'Administrator',
          verified: true,
          badgeColor: 'bg-purple-100 text-purple-800',
        };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Left: Brand / Logo */}
        <div className="flex items-center gap-3">
          <button
            id="brand-home-link"
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-emerald-600 p-0.5 shadow-sm group-hover:scale-105 transition">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-blue-700 to-emerald-600 text-lg">
                  KS
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">
                  {t('appName', 'Kaam Sarthi')}
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  {currentRole.toUpperCase()}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden md:block leading-none">
                “{t('tagline', 'Kaam milega, aasani se.')}”
              </p>
            </div>
          </button>

          {/* Location Selector Pill */}
          <div className="relative hidden sm:block">
            <button
              id="location-picker-btn"
              onClick={() => setLocDropdownOpen(!locDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition border border-slate-200"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>{selectedLocation || 'Saharsa, Bihar'}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {locDropdownOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1 text-[11px] font-bold uppercase text-slate-400">
                  {t('location', 'Select Location')}
                </div>
                {mockLocations.map((loc) => (
                  <button
                    key={loc.district}
                    id={`loc-option-${loc.district}`}
                    onClick={() => {
                      setSelectedLocation(loc.district);
                      setLocDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-blue-50 transition ${
                      selectedLocation === loc.district ? 'font-bold text-blue-600 bg-blue-50/50' : 'text-slate-700'
                    }`}
                  >
                    <div>
                      <p className="font-semibold">{loc.district}</p>
                      <p className="text-[10px] text-slate-400">{loc.state} • {loc.block}</p>
                    </div>
                    {selectedLocation === loc.district && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                  </button>
                ))}
                <div className="border-t border-slate-100 mt-1 pt-1">
                  <button
                    onClick={() => {
                      setSelectedLocation('All');
                      setLocDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 font-medium"
                  >
                    🌐 {t('allDistricts', 'All Locations')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Worker Availability Quick Toggle */}
          {currentRole === 'worker' && (
            <button
              id="header-availability-toggle"
              onClick={() => toggleWorkerAvailability()}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition border ${
                activeWorker.isAvailable
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                  : 'bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100'
              }`}
              title={activeWorker.isAvailable ? 'Click to set Busy' : 'Click to set Available'}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  activeWorker.isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
                }`}
              />
              <span className="hidden xs:inline">
                {activeWorker.isAvailable ? t('availableBadge', 'Available') : t('notAvailableBadge', 'Off')}
              </span>
            </button>
          )}

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              id="header-lang-btn"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>
                {language === 'hi' ? 'हिंदी' : language === 'en' ? 'EN' : 'ᱥᱟᱱᱛᱟᱲᱤ'}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50">
                <button
                  id="header-lang-hi"
                  onClick={() => {
                    setLanguage('hi');
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-blue-50 ${
                    language === 'hi' ? 'font-bold text-blue-600 bg-blue-50/50' : 'text-slate-700'
                  }`}
                >
                  <span>🇮🇳 हिंदी (Hindi)</span>
                  {language === 'hi' && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                </button>
                <button
                  id="header-lang-en"
                  onClick={() => {
                    setLanguage('en');
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-blue-50 ${
                    language === 'en' ? 'font-bold text-blue-600 bg-blue-50/50' : 'text-slate-700'
                  }`}
                >
                  <span>🇬🇧 English</span>
                  {language === 'en' && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                </button>
                <button
                  id="header-lang-sat"
                  onClick={() => {
                    setLanguage('sat');
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 ${
                    language === 'sat' ? 'font-bold text-emerald-600 bg-emerald-50/50' : 'text-slate-700'
                  }`}
                >
                  <span>🟢 ᱥᱟᱱᱛᱟᱲᱤ (Santhali)</span>
                  {language === 'sat' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
              </div>
            )}
          </div>

          {/* Notification Button */}
          <button
            id="header-notification-btn"
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
            title="View Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-xs">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Profile Avatar & Dropdown */}
          <div className="relative">
            <button
              id="header-profile-btn"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition"
            >
              <div className="relative">
                <img
                  src={currentProfile.photo}
                  alt={currentProfile.name}
                  className="w-9 h-9 rounded-xl object-cover border border-slate-200"
                />
                {currentProfile.verified && (
                  <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white rounded-full p-0.5 shadow-xs">
                    <ShieldCheck className="w-3 h-3" />
                  </span>
                )}
              </div>
              <div className="hidden lg:block text-left pr-1">
                <p className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[120px]">
                  {currentProfile.name}
                </p>
                <p className="text-[10px] text-slate-500 font-medium">
                  {currentProfile.roleLabel}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50">
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900">{currentProfile.name}</p>
                  <p className="text-[11px] text-emerald-600 font-medium">
                    {currentProfile.verified ? '✓ Verified Account' : 'Standard Account'}
                  </p>
                </div>

                <button
                  id="profile-dropdown-view-btn"
                  onClick={() => {
                    setCurrentView('profile');
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-blue-50 flex items-center gap-2"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>{t('profile', 'My Profile')}</span>
                </button>

                <button
                  id="profile-dropdown-switch-acc-btn"
                  onClick={() => {
                    setAuthModalOpen(true);
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-blue-50 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>{t('login', 'Switch / Login')}</span>
                </button>

                <div className="border-t border-slate-100 my-1"></div>

                <button
                  id="profile-dropdown-logout-btn"
                  onClick={() => {
                    setAuthModalOpen(true);
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t('logout', 'Logout')}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
