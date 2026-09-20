import React from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  LayoutDashboard,
  Search,
  Users,
  PlusCircle,
  Briefcase,
  FileText,
  DollarSign,
  History,
  User,
  Settings,
  Bell,
  MessageSquare,
  ShieldCheck,
  AlertTriangle,
  Star,
  MapPin,
  Wrench,
  Languages,
  BarChart3,
  CheckCircle2,
} from 'lucide-react';

interface SidebarProps {
  onOpenNotifications: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenNotifications }) => {
  const {
    currentRole,
    currentView,
    setCurrentView,
    activeWorker,
    activeEmployer,
    toggleWorkerAvailability,
    applications,
    notifications,
    complaints,
  } = useApp();

  const { t, language } = useLanguage();

  const unreadNotifs = notifications.filter((n) => !n.isRead).length;
  const pendingApps = applications.filter((a) => a.status === 'applied').length;
  const pendingReports = complaints.filter((c) => c.status === 'pending').length;

  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-slate-200 hidden lg:flex flex-col justify-between py-4 px-3 min-h-[calc(100vh-6.5rem)]">
      <div className="space-y-4">
        {/* Worker Status Banner (if Worker) */}
        {currentRole === 'worker' && (
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                {t('availableForWork', 'Work Availability')}
              </span>
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  activeWorker.isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                }`}
              />
            </div>
            <button
              id="sidebar-worker-availability-btn"
              onClick={() => toggleWorkerAvailability()}
              className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border shadow-2xs ${
                activeWorker.isAvailable
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {activeWorker.isAvailable
                  ? t('availableForWork', 'Available for Work')
                  : t('notAvailable', 'Not Available')}
              </span>
            </button>
            <p className="text-[10px] text-slate-500 text-center mt-1.5">
              {activeWorker.isAvailable
                ? language === 'hi'
                  ? 'ठेकेदार और मालिक आपको कॉल कर सकते हैं'
                  : 'Employers can call & send jobs'
                : language === 'hi'
                ? 'अभी आपको नए जॉब अलर्ट नहीं आएंगे'
                : 'Hidden from new job invitations'}
            </p>
          </div>
        )}

        {/* Employer Quick Post Job Banner (if Employer) */}
        {currentRole === 'employer' && (
          <button
            id="sidebar-quick-post-job-btn"
            onClick={() => setCurrentView('post-job')}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-md hover:from-emerald-700 hover:to-teal-700 transition flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t('postJob', 'Post a Job Now')}</span>
          </button>
        )}

        {/* Navigation Items based on current role */}
        <nav className="space-y-1">
          {/* Worker Navigation */}
          {currentRole === 'worker' && (
            <>
              <button
                id="sidebar-worker-dashboard"
                onClick={() => setCurrentView('dashboard')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                  currentView === 'dashboard'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>{t('dashboard', 'Dashboard')}</span>
              </button>

              <button
                id="sidebar-worker-find-jobs"
                onClick={() => setCurrentView('jobs')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                  currentView === 'jobs'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Search className="w-4 h-4" />
                <span>{t('findJobs', 'Find Jobs')}</span>
              </button>

              <button
                id="sidebar-worker-applications"
                onClick={() => setCurrentView('applications')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                  currentView === 'applications'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4" />
                  <span>{t('myApplications', 'My Applications')}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-100 text-blue-800">
                  {applications.filter((a) => a.workerId === activeWorker.id).length}
                </span>
              </button>

              <button
                id="sidebar-worker-earnings"
                onClick={() => setCurrentView('earnings')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                  currentView === 'earnings'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>{t('myEarnings', 'My Earnings')}</span>
              </button>

              <button
                id="sidebar-worker-history"
                onClick={() => setCurrentView('history')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                  currentView === 'history'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <History className="w-4 h-4" />
                <span>{t('workHistory', 'Work History')}</span>
              </button>

              <button
                id="sidebar-worker-profile"
                onClick={() => setCurrentView('profile')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                  currentView === 'profile'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <User className="w-4 h-4" />
                <span>{t('profile', 'Worker Profile')}</span>
              </button>
            </>
          )}

          {/* Employer Navigation */}
          {currentRole === 'employer' && (
            <>
              <button
                id="sidebar-employer-dashboard"
                onClick={() => setCurrentView('dashboard')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                  currentView === 'dashboard'
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>{t('dashboard', 'Dashboard')}</span>
              </button>

              <button
                id="sidebar-employer-post-job"
                onClick={() => setCurrentView('post-job')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                  currentView === 'post-job'
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <PlusCircle className="w-4 h-4" />
                <span>{t('postJob', 'Post a Job')}</span>
              </button>

              <button
                id="sidebar-employer-find-workers"
                onClick={() => setCurrentView('workers')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                  currentView === 'workers'
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>{t('findWorkers', 'Find Workers')}</span>
              </button>

              <button
                id="sidebar-employer-my-jobs"
                onClick={() => setCurrentView('my-jobs')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                  currentView === 'my-jobs'
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>{t('myJobs', 'My Jobs')}</span>
              </button>

              <button
                id="sidebar-employer-applications"
                onClick={() => setCurrentView('applications')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                  currentView === 'applications'
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4" />
                  <span>{t('newApplications', 'Applications')}</span>
                </div>
                {pendingApps > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800">
                    {pendingApps}
                  </span>
                )}
              </button>

              <button
                id="sidebar-employer-history"
                onClick={() => setCurrentView('history')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                  currentView === 'history'
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <History className="w-4 h-4" />
                <span>{t('workHistory', 'Hiring History')}</span>
              </button>

              <button
                id="sidebar-employer-profile"
                onClick={() => setCurrentView('profile')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                  currentView === 'profile'
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <User className="w-4 h-4" />
                <span>{t('profile', 'Employer Profile')}</span>
              </button>
            </>
          )}

          {/* Admin Navigation */}
          {currentRole === 'admin' && (
            <>
              <button
                id="sidebar-admin-overview"
                onClick={() => setCurrentView('dashboard')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                  currentView === 'dashboard'
                    ? 'bg-purple-50 text-purple-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>{t('analytics', 'Dashboard Overview')}</span>
              </button>

              <button
                id="sidebar-admin-users"
                onClick={() => setCurrentView('admin-users')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                  currentView === 'admin-users'
                    ? 'bg-purple-50 text-purple-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>{t('users', 'User Management')}</span>
              </button>

              <button
                id="sidebar-admin-jobs"
                onClick={() => setCurrentView('admin-jobs')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                  currentView === 'admin-jobs'
                    ? 'bg-purple-50 text-purple-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>{t('jobs', 'Job Management')}</span>
              </button>

              <button
                id="sidebar-admin-complaints"
                onClick={() => setCurrentView('admin-complaints')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                  currentView === 'admin-complaints'
                    ? 'bg-purple-50 text-purple-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>{t('complaints', 'Complaints & Safety')}</span>
                </div>
                {pendingReports > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-red-100 text-red-700">
                    {pendingReports}
                  </span>
                )}
              </button>

              <button
                id="sidebar-admin-skills-locations"
                onClick={() => setCurrentView('admin-skills')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                  currentView === 'admin-skills'
                    ? 'bg-purple-50 text-purple-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Wrench className="w-4 h-4" />
                <span>{t('skillsManagement', 'Skills & Locations')}</span>
              </button>

              <button
                id="sidebar-admin-languages"
                onClick={() => setCurrentView('admin-languages')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                  currentView === 'admin-languages'
                    ? 'bg-purple-50 text-purple-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Languages className="w-4 h-4" />
                <span>{t('languages', 'Language Manager')}</span>
              </button>

              <button
                id="sidebar-admin-broadcast"
                onClick={() => setCurrentView('admin-broadcast')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                  currentView === 'admin-broadcast'
                    ? 'bg-purple-50 text-purple-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Bell className="w-4 h-4" />
                <span>{t('broadcastAnnouncement', 'Broadcast Notice')}</span>
              </button>
            </>
          )}

          <div className="pt-2 border-t border-slate-100">
            <button
              id="sidebar-notifications-btn"
              onClick={onOpenNotifications}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
            >
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4" />
                <span>{t('notifications', 'Notifications')}</span>
              </div>
              {unreadNotifs > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500 text-white">
                  {unreadNotifs}
                </span>
              )}
            </button>

            <button
              id="sidebar-settings-btn"
              onClick={() => setCurrentView('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                currentView === 'settings'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>{t('settings', 'Settings')}</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Support Box */}
      <div className="p-3 bg-blue-50/70 rounded-2xl border border-blue-100 text-xs">
        <p className="font-bold text-blue-900 mb-1 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{t('contactSupport', 'Help & Helpline')}</span>
        </p>
        <p className="text-[11px] text-blue-800">
          Toll-Free Kisan & Mazdoor Sathi: <strong>1800-889-2026</strong>
        </p>
      </div>
    </aside>
  );
};
