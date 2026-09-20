import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  WorkerProfile,
  EmployerProfile,
  Job,
  Application,
  NotificationItem,
  Complaint,
  Review,
  ApplicationStatus,
  WorkerSkill,
} from '../types';
import {
  mockWorkers,
  mockEmployers,
  mockJobs,
  mockApplications,
  mockNotifications,
  mockComplaints,
  mockReviews,
} from '../data/mockData';
import confetti from 'canvas-confetti';

interface AppContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  activeWorker: WorkerProfile;
  activeEmployer: EmployerProfile;
  currentView: string;
  setCurrentView: (view: string) => void;
  splashActive: boolean;
  setSplashActive: (active: boolean) => void;
  onboardingActive: boolean;
  setOnboardingActive: (active: boolean) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  jobs: Job[];
  workers: WorkerProfile[];
  employers: EmployerProfile[];
  applications: Application[];
  notifications: NotificationItem[];
  complaints: Complaint[];
  reviews: Review[];
  savedJobIds: string[];
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  selectedJobForDetails: Job | null;
  setSelectedJobForDetails: (job: Job | null) => void;
  selectedWorkerForDetails: WorkerProfile | null;
  setSelectedWorkerForDetails: (worker: WorkerProfile | null) => void;
  chatModal: {
    isOpen: boolean;
    targetUser: { id: string; name: string; role: 'worker' | 'employer'; phone: string; photo: string } | null;
    jobTitle?: string;
  };
  openChat: (targetUser: { id: string; name: string; role: 'worker' | 'employer'; phone: string; photo: string }, jobTitle?: string) => void;
  closeChat: () => void;
  reviewModal: {
    isOpen: boolean;
    jobId: string;
    jobTitle: string;
    targetUser: { id: string; name: string; role: UserRole } | null;
  };
  openReviewModal: (jobId: string, arg2: any, arg3?: any) => void;
  closeReviewModal: () => void;
  
  // Actions
  toggleWorkerAvailability: (workerId?: string) => void;
  applyForJob: (jobId: string, workerNotes?: string) => void;
  postJob: (jobData: Omit<Job, 'id' | 'postedDate' | 'applicantsCount' | 'workersHired' | 'employerId' | 'employerName' | 'employerPhoto' | 'employerRating' | 'employerVerified'>) => void;
  updateApplicationStatus: (applicationId: string, status: ApplicationStatus) => void;
  updateJobStatus: (jobId: string, status: any) => void;
  deleteJobByAdmin: (jobId: string) => void;
  toggleSaveJob: (jobId: string) => void;
  updateWorkerProfile: (updated: Partial<WorkerProfile>) => void;
  updateEmployerProfile: (updated: Partial<EmployerProfile>) => void;
  verifyUser: (userId: string, role: 'worker' | 'employer') => void;
  verifyWorkerStatus: (workerId: string, isVerified: boolean) => void;
  verifyEmployerStatus: (employerId: string, isVerified: boolean) => void;
  suspendUser: (userId: string, role: 'worker' | 'employer') => void;
  activateUser: (userId: string, role: 'worker' | 'employer') => void;
  submitComplaint: (complaint: Omit<Complaint, 'id' | 'date' | 'status'>) => void;
  addComplaint: (data: any) => void;
  resolveComplaint: (complaintId: string, adminNotes?: string) => void;
  submitReview: (jobId: string, rating: number, comment: string, tags: string[]) => void;
  broadcastNotice: (targetRole: UserRole | 'all', title: string, message: string) => void;
  broadcastNotification: (title: string, message: string, targetRole?: any) => void;
  markAllNotificationsRead: () => void;
  deleteNotification: (id: string) => void;
  calculateJobMatch: (worker: WorkerProfile, job: Job) => {
    totalScore: number;
    skillMatch: number;
    locationMatch: number;
    availabilityMatch: number;
    wageMatch: number;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRoleState] = useState<UserRole>('worker');
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [splashActive, setSplashActive] = useState<boolean>(true);
  const [onboardingActive, setOnboardingActive] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);

  const [workers, setWorkers] = useState<WorkerProfile[]>(() => {
    const saved = localStorage.getItem('kaam_sarthi_workers');
    return saved ? JSON.parse(saved) : mockWorkers;
  });

  const [employers, setEmployers] = useState<EmployerProfile[]>(() => {
    const saved = localStorage.getItem('kaam_sarthi_employers');
    return saved ? JSON.parse(saved) : mockEmployers;
  });

  const [jobs, setJobs] = useState<Job[]>(() => {
    const saved = localStorage.getItem('kaam_sarthi_jobs');
    return saved ? JSON.parse(saved) : mockJobs;
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem('kaam_sarthi_applications');
    return saved ? JSON.parse(saved) : mockApplications;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('kaam_sarthi_notifications');
    return saved ? JSON.parse(saved) : mockNotifications;
  });

  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    const saved = localStorage.getItem('kaam_sarthi_complaints');
    return saved ? JSON.parse(saved) : mockComplaints;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('kaam_sarthi_reviews');
    return saved ? JSON.parse(saved) : mockReviews;
  });

  const [savedJobIds, setSavedJobIds] = useState<string[]>(['job-102']);
  const [selectedLocation, setSelectedLocation] = useState<string>('Saharsa');

  const [selectedJobForDetails, setSelectedJobForDetails] = useState<Job | null>(null);
  const [selectedWorkerForDetails, setSelectedWorkerForDetails] = useState<WorkerProfile | null>(null);

  const [chatModal, setChatModal] = useState<{
    isOpen: boolean;
    targetUser: { id: string; name: string; role: 'worker' | 'employer'; phone: string; photo: string } | null;
    jobTitle?: string;
  }>({
    isOpen: false,
    targetUser: null,
  });

  const [reviewModal, setReviewModal] = useState<{
    isOpen: boolean;
    jobId: string;
    jobTitle: string;
    targetUser: { id: string; name: string; role: UserRole } | null;
  }>({
    isOpen: false,
    jobId: '',
    jobTitle: '',
    targetUser: null,
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('kaam_sarthi_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('kaam_sarthi_workers', JSON.stringify(workers));
  }, [workers]);

  useEffect(() => {
    localStorage.setItem('kaam_sarthi_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('kaam_sarthi_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const activeWorker = workers[0]; // Ramesh Kumar
  const activeEmployer = employers[0]; // Rajesh Sharma

  const setCurrentRole = (role: UserRole) => {
    setCurrentRoleState(role);
    setCurrentView('dashboard');
  };

  const openChat = (
    targetUser: { id: string; name: string; role: 'worker' | 'employer'; phone: string; photo: string },
    jobTitle?: string
  ) => {
    setChatModal({
      isOpen: true,
      targetUser,
      jobTitle,
    });
  };

  const closeChat = () => {
    setChatModal({ isOpen: false, targetUser: null });
  };

  const openReviewModal = (
    jobId: string,
    arg2: any,
    arg3?: any
  ) => {
    const jobTitle = typeof arg2 === 'string' ? arg2 : 'Job Performance Review';
    const targetUser = typeof arg2 === 'object' && arg2 ? arg2 : arg3 || null;
    setReviewModal({
      isOpen: true,
      jobId,
      jobTitle,
      targetUser,
    });
  };

  const closeReviewModal = () => {
    setReviewModal({ isOpen: false, jobId: '', jobTitle: '', targetUser: null });
  };

  const toggleWorkerAvailability = (workerId?: string) => {
    const id = workerId || activeWorker.id;
    setWorkers((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isAvailable: !w.isAvailable } : w))
    );
  };

  const calculateJobMatch = (worker: WorkerProfile, job: Job) => {
    // Skill match: 100% if exact match, 80% if secondary skill, 40% if not
    let skillMatch = 40;
    if (worker.primarySkill === job.requiredSkill) {
      skillMatch = 100;
    } else if (worker.skills.includes(job.requiredSkill)) {
      skillMatch = 85;
    }

    // Location match based on district / distance
    let locationMatch = 60;
    if (worker.location.district.toLowerCase() === job.location.district.toLowerCase()) {
      if (job.distanceKm <= 3) locationMatch = 98;
      else if (job.distanceKm <= 5) locationMatch = 92;
      else locationMatch = 85;
    } else if (worker.location.state === job.location.state) {
      locationMatch = 70;
    }

    // Availability match
    const availabilityMatch = worker.isAvailable ? 100 : 50;

    // Wage match
    let wageMatch = 80;
    if (job.payment >= worker.expectedDailyWage) {
      wageMatch = 100;
    } else {
      const diff = worker.expectedDailyWage - job.payment;
      wageMatch = Math.max(50, Math.round(100 - (diff / worker.expectedDailyWage) * 50));
    }

    const totalScore = Math.round(
      skillMatch * 0.4 + locationMatch * 0.3 + availabilityMatch * 0.15 + wageMatch * 0.15
    );

    return { totalScore, skillMatch, locationMatch, availabilityMatch, wageMatch };
  };

  const applyForJob = (jobId: string, workerNotes?: string) => {
    const targetJob = jobs.find((j) => j.id === jobId);
    if (!targetJob) return;

    // Check if already applied
    const existing = applications.find((a) => a.jobId === jobId && a.workerId === activeWorker.id);
    if (existing) return;

    const match = calculateJobMatch(activeWorker, targetJob);

    const newApp: Application = {
      id: `app-${Date.now()}`,
      jobId,
      workerId: activeWorker.id,
      employerId: targetJob.employerId,
      status: 'applied',
      appliedDate: new Date().toISOString().split('T')[0],
      appliedAt: 'Just now',
      matchScore: match.totalScore,
      matchBreakdown: {
        skillMatch: match.skillMatch,
        locationMatch: match.locationMatch,
        availabilityMatch: match.availabilityMatch,
        wageMatch: match.wageMatch,
      },
      workerNotes: workerNotes || `Ready for work. Expected wage ₹${activeWorker.expectedDailyWage}/day.`,
      workerNote: workerNotes || `Ready for work. Expected wage ₹${activeWorker.expectedDailyWage}/day.`,
      workerName: activeWorker.name,
      workerPhoto: activeWorker.photo,
      workerSkill: activeWorker.primarySkill,
      workerRating: activeWorker.rating,
      workerExperience: activeWorker.experienceYears,
    };

    setApplications((prev) => [newApp, ...prev]);

    // Increment applicantsCount on job
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, applicantsCount: j.applicantsCount + 1 } : j))
    );

    // Add notification for employer
    const newNotifEmployer: NotificationItem = {
      id: `notif-${Date.now()}-emp`,
      userId: targetJob.employerId,
      targetRole: 'employer',
      title: '👷 New Worker Application',
      message: `${activeWorker.name} (${activeWorker.primarySkill}, ⭐${activeWorker.rating}) applied for "${targetJob.title}".`,
      time: 'Just now',
      isRead: false,
      type: 'application',
    };

    // Add confirmation notification for worker
    const newNotifWorker: NotificationItem = {
      id: `notif-${Date.now()}-wrk`,
      userId: activeWorker.id,
      targetRole: 'worker',
      title: '✅ Application Submitted',
      message: `Your application for "${targetJob.title}" at ₹${targetJob.payment}/day has been sent to ${targetJob.employerName}.`,
      time: 'Just now',
      isRead: false,
      type: 'application',
    };

    setNotifications((prev) => [newNotifWorker, newNotifEmployer, ...prev]);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {
      // ignore
    }
  };

  const postJob = (
    jobData: Omit<
      Job,
      | 'id'
      | 'postedDate'
      | 'applicantsCount'
      | 'workersHired'
      | 'employerId'
      | 'employerName'
      | 'employerPhoto'
      | 'employerRating'
      | 'employerVerified'
    >
  ) => {
    const newJob: Job = {
      ...jobData,
      id: `job-${Date.now()}`,
      employerId: activeEmployer.id,
      employerName: activeEmployer.name,
      employerPhoto: activeEmployer.photo,
      employerRating: activeEmployer.rating,
      employerVerified: activeEmployer.isVerified,
      postedDate: new Date().toISOString().split('T')[0],
      applicantsCount: 0,
      workersHired: 0,
    };

    setJobs((prev) => [newJob, ...prev]);

    // Send notification to nearby workers
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: 'all',
      targetRole: 'worker',
      title: '🔔 New Job Available Near You',
      message: `New requirement: "${newJob.title}" in ${newJob.location.villageOrCity}, ${newJob.location.district} offering ₹${newJob.payment}/${newJob.paymentType}.`,
      time: 'Just now',
      isRead: false,
      type: 'job',
    };

    setNotifications((prev) => [notif, ...prev]);

    // update employer active job count
    setEmployers((prev) =>
      prev.map((e) =>
        e.id === activeEmployer.id ? { ...e, activeJobsCount: e.activeJobsCount + 1 } : e
      )
    );

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  };

  const updateApplicationStatus = (applicationId: string, status: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === applicationId ? { ...a, status } : a))
    );

    const app = applications.find((a) => a.id === applicationId);
    if (!app) return;
    const targetJob = jobs.find((j) => j.id === app.jobId);
    const targetWorker = workers.find((w) => w.id === app.workerId);

    if (status === 'accepted') {
      // Worker notification
      const notif: NotificationItem = {
        id: `notif-${Date.now()}`,
        userId: app.workerId,
        targetRole: 'worker',
        title: '🎉 Application Accepted!',
        message: `${activeEmployer.name} accepted your application for "${targetJob?.title}". Please reach at ${targetJob?.startTime || '9:00 AM'}.`,
        time: 'Just now',
        isRead: false,
        type: 'application',
      };
      setNotifications((prev) => [notif, ...prev]);

      // increment workers hired on job
      if (targetJob) {
        setJobs((prev) =>
          prev.map((j) => (j.id === targetJob.id ? { ...j, workersHired: j.workersHired + 1 } : j))
        );
      }
    } else if (status === 'shortlisted') {
      const notif: NotificationItem = {
        id: `notif-${Date.now()}`,
        userId: app.workerId,
        targetRole: 'worker',
        title: '⭐ Application Shortlisted',
        message: `${activeEmployer.name} shortlisted your application for "${targetJob?.title}". Keep your phone handy for call.`,
        time: 'Just now',
        isRead: false,
        type: 'application',
      };
      setNotifications((prev) => [notif, ...prev]);
    }
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const updateWorkerProfile = (updated: Partial<WorkerProfile>) => {
    setWorkers((prev) =>
      prev.map((w) => (w.id === activeWorker.id ? { ...w, ...updated } : w))
    );
  };

  const updateEmployerProfile = (updated: Partial<EmployerProfile>) => {
    setEmployers((prev) =>
      prev.map((e) => (e.id === activeEmployer.id ? { ...e, ...updated } : e))
    );
  };

  const verifyUser = (userId: string, role: 'worker' | 'employer') => {
    if (role === 'worker') {
      setWorkers((prev) =>
        prev.map((w) => (w.id === userId ? { ...w, isVerified: true } : w))
      );
    } else {
      setEmployers((prev) =>
        prev.map((e) => (e.id === userId ? { ...e, isVerified: true } : e))
      );
    }

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId,
      targetRole: role,
      title: '✓ Account Verified by Admin',
      message: 'Congratulations! Your Kaam Sarthi profile has been verified with the official green badge.',
      time: 'Just now',
      isRead: false,
      type: 'verification',
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const suspendUser = (userId: string, role: 'worker' | 'employer') => {
    if (role === 'worker') {
      setWorkers((prev) =>
        prev.map((w) => (w.id === userId ? { ...w, status: 'suspended' } : w))
      );
    } else {
      setEmployers((prev) =>
        prev.map((e) => (e.id === userId ? { ...e, status: 'suspended' } : e))
      );
    }
  };

  const activateUser = (userId: string, role: 'worker' | 'employer') => {
    if (role === 'worker') {
      setWorkers((prev) =>
        prev.map((w) => (w.id === userId ? { ...w, status: 'active' } : w))
      );
    } else {
      setEmployers((prev) =>
        prev.map((e) => (e.id === userId ? { ...e, status: 'active' } : e))
      );
    }
  };

  const verifyWorkerStatus = (workerId: string, isVerified: boolean) => {
    setWorkers((prev) =>
      prev.map((w) => (w.id === workerId ? { ...w, isVerified } : w))
    );
  };

  const verifyEmployerStatus = (employerId: string, isVerified: boolean) => {
    setEmployers((prev) =>
      prev.map((e) => (e.id === employerId ? { ...e, isVerified } : e))
    );
  };

  const updateJobStatus = (jobId: string, status: any) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status } : j))
    );
  };

  const deleteJobByAdmin = (jobId: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
  };

  const broadcastNotification = (title: string, message: string, targetRole: UserRole | 'all' = 'all') => {
    broadcastNotice(targetRole, title, message);
  };

  const addComplaint = (data: any) => {
    submitComplaint({
      reporterId: data.reportedById || activeWorker.id,
      reporterName: data.reportedByName || activeWorker.name,
      reporterRole: data.reportedByRole || currentRole,
      targetId: data.targetId || 'target',
      targetName: data.targetName || 'Reported Target',
      targetType: data.targetType || 'employer',
      category: data.type || 'payment_issue',
      description: data.description || '',
    });
  };

  const submitComplaint = (complaintData: Omit<Complaint, 'id' | 'date' | 'status'>) => {
    const newComplaint: Complaint = {
      ...complaintData,
      id: `cmp-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    setComplaints((prev) => [newComplaint, ...prev]);
  };

  const resolveComplaint = (complaintId: string, adminNotes?: string) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === complaintId
          ? { ...c, status: 'resolved', adminNotes: adminNotes || 'Resolved by Administrator.' }
          : c
      )
    );
  };

  const submitReview = (jobId: string, rating: number, comment: string, tags: string[]) => {
    const fromId = currentRole === 'worker' ? activeWorker.id : activeEmployer.id;
    const fromName = currentRole === 'worker' ? activeWorker.name : activeEmployer.name;
    const toId = reviewModal.targetUser?.id || '';
    const toName = reviewModal.targetUser?.name || '';

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      jobId,
      fromId,
      fromName,
      fromRole: currentRole,
      toId,
      toName,
      rating,
      comment,
      tags,
      date: new Date().toISOString().split('T')[0],
    };

    setReviews((prev) => [newRev, ...prev]);

    // Recalculate target user's rating
    if (reviewModal.targetUser?.role === 'worker') {
      setWorkers((prev) =>
        prev.map((w) => {
          if (w.id === toId) {
            const nextCount = w.ratingCount + 1;
            const nextRating = Number(((w.rating * w.ratingCount + rating) / nextCount).toFixed(1));
            return { ...w, rating: nextRating, ratingCount: nextCount, completedJobsCount: w.completedJobsCount + 1 };
          }
          return w;
        })
      );
    } else if (reviewModal.targetUser?.role === 'employer') {
      setEmployers((prev) =>
        prev.map((e) => {
          if (e.id === toId) {
            const nextCount = e.ratingCount + 1;
            const nextRating = Number(((e.rating * e.ratingCount + rating) / nextCount).toFixed(1));
            return { ...e, rating: nextRating, ratingCount: nextCount, completedJobsCount: e.completedJobsCount + 1 };
          }
          return e;
        })
      );
    }

    closeReviewModal();
  };

  const broadcastNotice = (targetRole: UserRole | 'all', title: string, message: string) => {
    const notice: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: 'all',
      targetRole,
      title: `📢 ${title}`,
      message,
      time: 'Just now',
      isRead: false,
      type: 'broadcast',
    };
    setNotifications((prev) => [notice, ...prev]);
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        activeWorker,
        activeEmployer,
        currentView,
        setCurrentView,
        splashActive,
        setSplashActive,
        onboardingActive,
        setOnboardingActive,
        authModalOpen,
        setAuthModalOpen,
        jobs,
        workers,
        employers,
        applications,
        notifications,
        complaints,
        reviews,
        savedJobIds,
        selectedLocation,
        setSelectedLocation,
        selectedJobForDetails,
        setSelectedJobForDetails,
        selectedWorkerForDetails,
        setSelectedWorkerForDetails,
        chatModal,
        openChat,
        closeChat,
        reviewModal,
        openReviewModal,
        closeReviewModal,
        toggleWorkerAvailability,
        applyForJob,
        postJob,
        updateApplicationStatus,
        updateJobStatus,
        deleteJobByAdmin,
        toggleSaveJob,
        updateWorkerProfile,
        updateEmployerProfile,
        verifyUser,
        verifyWorkerStatus,
        verifyEmployerStatus,
        suspendUser,
        activateUser,
        submitComplaint,
        addComplaint,
        resolveComplaint,
        submitReview,
        broadcastNotice,
        broadcastNotification,
        markAllNotificationsRead,
        deleteNotification,
        calculateJobMatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
