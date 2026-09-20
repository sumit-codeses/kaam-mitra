export type LanguageCode = 'hi' | 'en' | 'sat';
export type Language = LanguageCode;

export type UserRole = 'worker' | 'employer' | 'admin';

export type WorkerSkill =
  | 'Mason'
  | 'Carpenter'
  | 'Electrician'
  | 'Plumber'
  | 'Painter'
  | 'Driver'
  | 'Farm Worker'
  | 'Construction Helper'
  | 'Welder'
  | 'Domestic Worker'
  | 'Delivery Worker'
  | 'Tailor'
  | 'Mechanic'
  | 'Other';

export interface LocationInfo {
  state: string;
  district: string;
  block: string;
  villageOrCity: string;
  coordinates?: { lat: number; lng: number };
  pincode?: string;
}

export interface WorkerProfile {
  id: string;
  name: string;
  photo: string;
  phone: string;
  location: LocationInfo;
  primarySkill: WorkerSkill;
  skills: WorkerSkill[];
  secondarySkills?: string[];
  experienceYears: number;
  expectedDailyWage: number;
  isAvailable: boolean;
  languagesKnown: string[];
  languages?: string[];
  rating: number;
  ratingCount: number;
  completedJobsCount: number;
  isVerified: boolean;
  registeredDate: string;
  status: 'active' | 'suspended';
  bio?: string;
}

export type Worker = WorkerProfile;

export interface EmployerProfile {
  id: string;
  name: string;
  companyOrOrg?: string;
  companyName?: string;
  photo: string;
  phone: string;
  location: LocationInfo;
  rating: number;
  ratingCount: number;
  completedJobsCount: number;
  isVerified: boolean;
  registeredDate: string;
  status: 'active' | 'suspended';
  activeJobsCount: number;
  totalSpending: number;
  totalJobsPosted?: number;
}

export type JobStatus = 'active' | 'pending' | 'closed' | 'reported' | 'filled' | 'completed' | 'cancelled';
export type PaymentType = 'daily' | 'hourly' | 'fixed' | 'day' | 'hour';
export type WorkType = PaymentType | string;

export interface Job {
  id: string;
  employerId: string;
  employerName: string;
  employerPhoto: string;
  employerRating: number;
  employerVerified: boolean;
  title: string;
  description: string;
  requiredSkill: WorkerSkill;
  workersNeeded: number;
  workersHired: number;
  location: LocationInfo;
  distanceKm: number;
  payment: number;
  paymentType: PaymentType;
  workDate: string;
  startTime: string;
  endTime: string;
  durationDays: number;
  experienceRequiredYears: number;
  contactPreference: 'call' | 'chat' | 'both';
  status: JobStatus;
  postedDate: string;
  applicantsCount: number;
  isUrgent?: boolean;
  workType?: WorkType;
  createdAt?: string;
}

export type ApplicationStatus = 'applied' | 'shortlisted' | 'accepted' | 'rejected' | 'completed';

export interface Application {
  id: string;
  jobId: string;
  workerId: string;
  employerId: string;
  status: ApplicationStatus;
  appliedDate: string;
  appliedAt?: string;
  matchScore: number;
  matchBreakdown: {
    skillMatch: number;
    locationMatch: number;
    availabilityMatch: number;
    wageMatch: number;
  };
  workerNotes?: string;
  workerNote?: string;
  workerName?: string;
  workerPhoto?: string;
  workerSkill?: string;
  workerRating?: number;
  workerExperience?: number;
}

export interface NotificationItem {
  id: string;
  userId: string;
  targetRole: UserRole | 'all';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'job' | 'application' | 'contact' | 'reminder' | 'broadcast' | 'verification';
  actionUrl?: string;
}

export interface Complaint {
  id: string;
  reporterId: string;
  reporterName: string;
  reportedByName?: string;
  reporterRole: UserRole;
  targetId: string;
  targetName: string;
  targetType: 'job' | 'worker' | 'employer';
  category: 'fake_job' | 'fake_worker' | 'payment_issue' | 'misbehavior' | 'spam' | 'other';
  type?: string;
  description: string;
  status: 'pending' | 'investigating' | 'resolved';
  date: string;
  createdAt?: string;
  adminNotes?: string;
}

export interface Review {
  id: string;
  jobId: string;
  fromId: string;
  fromName: string;
  fromRole: UserRole;
  toId: string;
  toName: string;
  rating: number;
  comment: string;
  tags?: string[];
  date: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  jobId?: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}
