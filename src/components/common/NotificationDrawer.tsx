import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, Check, Trash2, CheckCircle2, AlertCircle, Briefcase, Calendar, Volume2, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { notifications, markAllNotificationsRead, deleteNotification, currentRole } = useApp();
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  if (!isOpen) return null;

  const relevantNotifications = notifications.filter((n) => {
    if (n.targetRole !== 'all' && n.targetRole !== currentRole) return false;
    if (filter === 'unread') return !n.isRead;
    return true;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'application':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'job':
        return <Briefcase className="w-5 h-5 text-blue-600" />;
      case 'reminder':
        return <Calendar className="w-5 h-5 text-amber-600" />;
      case 'verification':
        return <Shield className="w-5 h-5 text-emerald-600" />;
      case 'broadcast':
        return <Volume2 className="w-5 h-5 text-purple-600" />;
      default:
        return <Bell className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <div
      id="notification-drawer-backdrop"
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs"
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">{t('notifications', 'Notifications')}</h3>
              <p className="text-xs text-slate-500">
                {relevantNotifications.length} {language === 'hi' ? 'सूचनाएं' : 'updates'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="notif-mark-all-read"
              onClick={markAllNotificationsRead}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition text-xs font-semibold flex items-center gap-1"
              title="Mark all as read"
            >
              <Check className="w-4 h-4" />
              <span className="hidden sm:inline">{t('markAllRead', 'Read all')}</span>
            </button>
            <button
              id="close-notif-drawer"
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="px-4 py-2 bg-slate-100/70 border-b border-slate-200 flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
              filter === 'all' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'hi' ? 'सभी सूचनाएं' : 'All'}
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
              filter === 'unread' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'hi' ? 'अनपढ़ी' : 'Unread'}
          </button>
        </div>

        {/* Notification list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {relevantNotifications.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <Bell className="w-6 h-6" />
              </div>
              <p className="font-semibold text-slate-700 text-sm">{t('noNotifications', 'No new notifications')}</p>
              <p className="text-xs text-slate-500 mt-1">
                {language === 'hi'
                  ? 'नए काम या आवेदन की जानकारी यहाँ दिखाई देगी।'
                  : 'You will receive alerts here when someone applies or contacts you.'}
              </p>
            </div>
          ) : (
            relevantNotifications.map((n) => (
              <div
                key={n.id}
                className={`p-3.5 rounded-2xl border transition relative group ${
                  n.isRead
                    ? 'bg-white border-slate-200 opacity-90'
                    : 'bg-blue-50/60 border-blue-200 shadow-xs'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs mt-0.5">
                    {getIcon(n.type)}
                  </div>
                  <div className="flex-1 pr-6">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">{n.title}</h4>
                      {!n.isRead && (
                        <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-1.5">{n.message}</p>
                    <span className="text-[10px] text-slate-400 font-medium">{n.time}</span>
                  </div>
                </div>

                <button
                  id={`delete-notif-${n.id}`}
                  onClick={() => deleteNotification(n.id)}
                  className="absolute top-3 right-3 text-slate-400 hover:text-red-600 p-1 rounded-md opacity-0 group-hover:opacity-100 transition"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 flex justify-between items-center">
          <span>🔔 Kaam Sarthi Alerts</span>
          <span className="text-emerald-700 font-semibold">SMS & WhatsApp alerts active</span>
        </div>
      </motion.div>
    </div>
  );
};
