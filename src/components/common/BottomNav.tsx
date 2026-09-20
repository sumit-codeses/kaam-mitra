import React from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  Home,
  Search,
  FileText,
  Bell,
  User,
  Users,
  PlusCircle,
  Briefcase,
  AlertTriangle,
  BarChart3,
  Settings,
} from 'lucide-react';

interface BottomNavProps {
  onOpenNotifications: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ onOpenNotifications }) => {
  const { currentRole, currentView, setCurrentView, notifications, applications } = useApp();
  const { t } = useLanguage();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <nav
      id="mobile-bottom-nav"
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-lg select-none"
    >
      <div className="flex items-center justify-around">
        {/* WORKER BOTTOM NAV */}
        {currentRole === 'worker' && (
          <>
            <button
              id="mob-nav-worker-home"
              onClick={() => setCurrentView('dashboard')}
              className={`flex flex-col items-center py-1 px-2 rounded-xl transition min-w-[56px] ${
                currentView === 'dashboard' ? 'text-blue-600 font-bold' : 'text-slate-500'
              }`}
            >
              <Home className="w-5 h-5 mb-0.5" />
              <span className="text-[10px]">{t('home', 'Home')}</span>
            </button>

            <button
              id="mob-nav-worker-jobs"
              onClick={() => setCurrentView('jobs')}
              className={`flex flex-col items-center py-1 px-2 rounded-xl transition min-w-[56px] ${
                currentView === 'jobs' ? 'text-blue-600 font-bold' : 'text-slate-500'
              }`}
            >
              <Search className="w-5 h-5 mb-0.5" />
              <span className="text-[10px]">{t('jobs', 'Jobs')}</span>
            </button>

            <button
              id="mob-nav-worker-apps"
              onClick={() => setCurrentView('applications')}
              className={`flex flex-col items-center py-1 px-2 rounded-xl transition min-w-[56px] relative ${
                currentView === 'applications' ? 'text-blue-600 font-bold' : 'text-slate-500'
              }`}
            >
              <FileText className="w-5 h-5 mb-0.5" />
              <span className="text-[10px]">{t('myApplications', 'Apps')}</span>
            </button>

            <button
              id="mob-nav-worker-notifs"
              onClick={onOpenNotifications}
              className="flex flex-col items-center py-1 px-2 rounded-xl transition min-w-[56px] text-slate-500 relative"
            >
              <Bell className="w-5 h-5 mb-0.5" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-3 w-3.5 h-3.5 rounded-full bg-red-600 text-white text-[9px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
              <span className="text-[10px]">{t('notifications', 'Alerts')}</span>
            </button>

            <button
              id="mob-nav-worker-profile"
              onClick={() => setCurrentView('profile')}
              className={`flex flex-col items-center py-1 px-2 rounded-xl transition min-w-[56px] ${
                currentView === 'profile' ? 'text-blue-600 font-bold' : 'text-slate-500'
              }`}
            >
              <User className="w-5 h-5 mb-0.5" />
              <span className="text-[10px]">{t('profile', 'Profile')}</span>
            </button>
          </>
        )}

        {/* EMPLOYER BOTTOM NAV */}
        {currentRole === 'employer' && (
          <>
            <button
              id="mob-nav-employer-home"
              onClick={() => setCurrentView('dashboard')}
              className={`flex flex-col items-center py-1 px-2 rounded-xl transition min-w-[56px] ${
                currentView === 'dashboard' ? 'text-emerald-700 font-bold' : 'text-slate-500'
              }`}
            >
              <Home className="w-5 h-5 mb-0.5" />
              <span className="text-[10px]">{t('home', 'Home')}</span>
            </button>

            <button
              id="mob-nav-employer-workers"
              onClick={() => setCurrentView('workers')}
              className={`flex flex-col items-center py-1 px-2 rounded-xl transition min-w-[56px] ${
                currentView === 'workers' ? 'text-emerald-700 font-bold' : 'text-slate-500'
              }`}
            >
              <Users className="w-5 h-5 mb-0.5" />
              <span className="text-[10px]">{t('workers', 'Workers')}</span>
            </button>

            <button
              id="mob-nav-employer-post"
              onClick={() => setCurrentView('post-job')}
              className="flex flex-col items-center py-1 px-2 -mt-4 transition group"
            >
              <div className="w-11 h-11 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 group-hover:scale-105 transition">
                <PlusCircle className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-emerald-800 mt-0.5">{t('postJob', 'Post')}</span>
            </button>

            <button
              id="mob-nav-employer-apps"
              onClick={() => setCurrentView('applications')}
              className={`flex flex-col items-center py-1 px-2 rounded-xl transition min-w-[56px] ${
                currentView === 'applications' ? 'text-emerald-700 font-bold' : 'text-slate-500'
              }`}
            >
              <FileText className="w-5 h-5 mb-0.5" />
              <span className="text-[10px]">{t('newApplications', 'Applicants')}</span>
            </button>

            <button
              id="mob-nav-employer-profile"
              onClick={() => setCurrentView('profile')}
              className={`flex flex-col items-center py-1 px-2 rounded-xl transition min-w-[56px] ${
                currentView === 'profile' ? 'text-emerald-700 font-bold' : 'text-slate-500'
              }`}
            >
              <User className="w-5 h-5 mb-0.5" />
              <span className="text-[10px]">{t('profile', 'Profile')}</span>
            </button>
          </>
        )}

        {/* ADMIN BOTTOM NAV */}
        {currentRole === 'admin' && (
          <>
            <button
              id="mob-nav-admin-dashboard"
              onClick={() => setCurrentView('dashboard')}
              className={`flex flex-col items-center py-1 px-2 rounded-xl transition min-w-[56px] ${
                currentView === 'dashboard' ? 'text-purple-700 font-bold' : 'text-slate-500'
              }`}
            >
              <BarChart3 className="w-5 h-5 mb-0.5" />
              <span className="text-[10px]">{t('analytics', 'Overview')}</span>
            </button>

            <button
              id="mob-nav-admin-users"
              onClick={() => setCurrentView('admin-users')}
              className={`flex flex-col items-center py-1 px-2 rounded-xl transition min-w-[56px] ${
                currentView === 'admin-users' ? 'text-purple-700 font-bold' : 'text-slate-500'
              }`}
            >
              <Users className="w-5 h-5 mb-0.5" />
              <span className="text-[10px]">{t('users', 'Users')}</span>
            </button>

            <button
              id="mob-nav-admin-jobs"
              onClick={() => setCurrentView('admin-jobs')}
              className={`flex flex-col items-center py-1 px-2 rounded-xl transition min-w-[56px] ${
                currentView === 'admin-jobs' ? 'text-purple-700 font-bold' : 'text-slate-500'
              }`}
            >
              <Briefcase className="w-5 h-5 mb-0.5" />
              <span className="text-[10px]">{t('jobs', 'Jobs')}</span>
            </button>

            <button
              id="mob-nav-admin-complaints"
              onClick={() => setCurrentView('admin-complaints')}
              className={`flex flex-col items-center py-1 px-2 rounded-xl transition min-w-[56px] ${
                currentView === 'admin-complaints' ? 'text-purple-700 font-bold' : 'text-slate-500'
              }`}
            >
              <AlertTriangle className="w-5 h-5 mb-0.5" />
              <span className="text-[10px]">{t('complaints', 'Safety')}</span>
            </button>

            <button
              id="mob-nav-admin-more"
              onClick={() => setCurrentView('admin-languages')}
              className={`flex flex-col items-center py-1 px-2 rounded-xl transition min-w-[56px] ${
                currentView === 'admin-languages' ? 'text-purple-700 font-bold' : 'text-slate-500'
              }`}
            >
              <Settings className="w-5 h-5 mb-0.5" />
              <span className="text-[10px]">Tools</span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
