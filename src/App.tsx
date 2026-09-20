import React, { useState } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import { AppProvider, useApp } from './context/AppContext';

// Common Layout & Nav
import { RoleSwitcherBanner } from './components/common/RoleSwitcherBanner';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { BottomNav } from './components/common/BottomNav';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { AuthModal } from './components/common/AuthModal';
import { ChatModal } from './components/common/ChatModal';
import { ReviewModal } from './components/common/ReviewModal';
import { OnboardingLanguageModal } from './components/common/OnboardingLanguageModal';
import { SettingsModal } from './components/common/SettingsModal';

// Worker Views
import { WorkerDashboard } from './components/worker/WorkerDashboard';
import { FindJobsView } from './components/worker/FindJobsView';
import { WorkerApplicationsView } from './components/worker/WorkerApplicationsView';
import { WorkerProfileView } from './components/worker/WorkerProfileView';
import { WorkerEarningsView } from './components/worker/WorkerEarningsView';
import { JobDetailsModal } from './components/worker/JobDetailsModal';

// Employer Views
import { EmployerDashboard } from './components/employer/EmployerDashboard';
import { PostJobView } from './components/employer/PostJobView';
import { FindWorkersView } from './components/employer/FindWorkersView';
import { EmployerJobsView } from './components/employer/EmployerJobsView';
import { EmployerApplicationsView } from './components/employer/EmployerApplicationsView';
import { EmployerProfileView } from './components/employer/EmployerProfileView';

// Admin Views
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminUsersView } from './components/admin/AdminUsersView';
import { AdminJobsView } from './components/admin/AdminJobsView';
import { AdminSkillsView } from './components/admin/AdminSkillsView';
import { AdminLanguagesView } from './components/admin/AdminLanguagesView';

const MainContentRouter: React.FC<{
  onOpenSettings: () => void;
  onOpenLanguageModal: () => void;
}> = ({ onOpenSettings, onOpenLanguageModal }) => {
  const { currentRole, currentView } = useApp();

  // WORKER VIEWS
  if (currentRole === 'worker') {
    switch (currentView) {
      case 'jobs':
        return <FindJobsView />;
      case 'applications':
        return <WorkerApplicationsView />;
      case 'profile':
        return <WorkerProfileView />;
      case 'earnings':
        return <WorkerEarningsView />;
      case 'dashboard':
      default:
        return <WorkerDashboard />;
    }
  }

  // EMPLOYER VIEWS
  if (currentRole === 'employer') {
    switch (currentView) {
      case 'post-job':
        return <PostJobView />;
      case 'workers':
        return <FindWorkersView />;
      case 'my-jobs':
        return <EmployerJobsView />;
      case 'applications':
        return <EmployerApplicationsView />;
      case 'profile':
        return <EmployerProfileView />;
      case 'dashboard':
      default:
        return <EmployerDashboard />;
    }
  }

  // ADMIN VIEWS
  if (currentRole === 'admin') {
    switch (currentView) {
      case 'admin-users':
        return <AdminUsersView />;
      case 'admin-jobs':
        return <AdminJobsView />;
      case 'admin-skills':
        return <AdminSkillsView />;
      case 'admin-languages':
        return <AdminLanguagesView />;
      case 'dashboard':
      default:
        return <AdminDashboard />;
    }
  }

  return <WorkerDashboard />;
};

const AppShell: React.FC = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased">
      {/* 1. Top interactive role switcher bar for easy prototype review */}
      <RoleSwitcherBanner />

      {/* 2. Global Header */}
      <Header onOpenNotifications={() => setIsNotificationsOpen(true)} />

      {/* 3. Main Workspace with Sidebar and View Router */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar */}
        <Sidebar onOpenNotifications={() => setIsNotificationsOpen(true)} />

        {/* Dynamic Main View Area */}
        <main className="flex-1 p-3 sm:p-6 lg:p-8 overflow-y-auto pb-24 lg:pb-12">
          <MainContentRouter
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenLanguageModal={() => setIsLangModalOpen(true)}
          />
        </main>
      </div>

      {/* 4. Mobile Bottom Navigation */}
      <BottomNav onOpenNotifications={() => setIsNotificationsOpen(true)} />

      {/* Global Modals */}
      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
      <JobDetailsModal />
      <ChatModal />
      <ReviewModal />
      <AuthModal />
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
      <OnboardingLanguageModal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <AppShell />
      </AppProvider>
    </LanguageProvider>
  );
}
