// ==================== CORE INTERFACES ====================

export interface Internship {
  id: string;
  title: string;
  company: string;
  category: string;
  image: string;
  stipend: string;
  location: string;
  type: 'Remote' | 'On-site' | 'Hybrid';
  status: 'ACTIVE' | 'CLOSED' | 'DRAFT' | 'UPCOMING';
  description: string;
  skills: string[];
  duration?: string; // e.g., "6 Months"
  applicationFee?: number; // e.g., 199
  createdAt?: string;
  updatedAt?: string;
  companyLogo?: string;
  requirements?: string[];
  responsibilities?: string[];
  benefits?: string[];
  applicationDeadline?: string;
  openings?: number;
  appliedCount?: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  category?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  timeLimit?: number; // in seconds
  domain?: string; // e.g., "Python", "Web Dev"
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  education: string;
  domain: string;
  unlockedRealTest: boolean;
  skills?: string[];
  profileImage?: string;
  college?: string;
  yearOfStudy?: string;
  resumeUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  bio?: string;
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: string;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  preferences?: UserPreferences;
}

// Alias for backward compatibility
export type UserProfile = User;

export interface UserPreferences {
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  jobAlerts?: boolean;
  preferredCategories?: string[];
  preferredLocations?: string[];
  minStipend?: number;
  internshipType?: ('Remote' | 'On-site' | 'Hybrid')[];
}

// ==================== PAYMENT INTERFACES ====================

export interface PaymentDetails {
  id: string;
  userId: string;
  internshipId: string;
  amount: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED' | 'CANCELLED';
  transactionId?: string;
  paymentGateway: 'CASHFREE' | 'RAZORPAY' | 'STRIPE' | 'PAYPAL' | 'OTHER';
  orderId: string;
  currency: string; // e.g., "INR"
  paymentMethod?: string; // e.g., "UPI", "Card"
  paymentDate?: string;
  refundDate?: string;
  refundAmount?: number;
  refundReason?: string;
  gatewayResponse?: Record<string, any>;
  createdAt: string;
  updatedAt?: string;
}

export interface PaymentWebhookPayload {
  event: 'PAYMENT_SUCCESS' | 'PAYMENT_FAILED' | 'ORDER_PAID' | 'REFUND_INITIATED' | 'REFUND_PROCESSED';
  data: {
    order: {
      order_id: string;
      order_amount: number;
      order_currency: string;
      customer_details: {
        customer_id: string;
        customer_name: string;
        customer_email: string;
        customer_phone: string;
      };
      order_status: string;
      payment?: {
        payment_method: string;
        bank_reference: string;
        payment_time: string;
      };
    };
  };
  signature: string;
  timestamp: string;
}

// ==================== TEST & ASSESSMENT INTERFACES ====================

export interface TestResult {
  id: string;
  userId: string;
  internshipId: string;
  score: number;
  passed: boolean;
  date: string;
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: number; // in seconds
  testType: 'PRACTICE' | 'REAL';
  domain?: string;
  answers?: UserAnswer[];
  percentile?: number;
  rank?: number;
  certificateId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserAnswer {
  questionId: string;
  selectedOption: number;
  isCorrect: boolean;
  timeSpent: number; // in seconds
  questionDifficulty?: 'Easy' | 'Medium' | 'Hard';
}

export interface TestSession {
  id: string;
  userId: string;
  internshipId: string;
  paymentId?: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'TIMED_OUT' | 'CANCELLED';
  startTime: string;
  endTime?: string;
  totalTime?: number; // duration in seconds
  warnings: number; // tab switching, etc.
  isFullscreen: boolean;
  deviceInfo?: {
    userAgent: string;
    platform: string;
    screenResolution: string;
  };
  ipAddress?: string;
  createdAt: string;
  updatedAt?: string;
}

// ==================== APPLICATION INTERFACES ====================

export interface Application {
  id: string;
  userId: string;
  internshipId: string;
  status: 'PENDING' | 'UNDER_REVIEW' | 'SHORTLISTED' | 'REJECTED' | 'SELECTED' | 'WITHDRAWN';
  appliedDate: string;
  lastUpdated: string;
  paymentId?: string;
  testResultId?: string;
  interviewScheduleId?: string;
  offerLetterId?: string;
  notes?: string;
  resumeVersion?: string;
  coverLetter?: string;
  applicationSource?: string;
  expectedStipend?: string;
  availabilityDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface InterviewSchedule {
  id: string;
  applicationId: string;
  userId: string;
  internshipId: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: number; // in minutes
  interviewerName?: string;
  interviewerEmail?: string;
  interviewType: 'VIDEO' | 'PHONE' | 'IN_PERSON';
  platform?: string; // e.g., "Google Meet"
  meetingLink?: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'RESCHEDULED' | 'NO_SHOW';
  feedback?: string;
  rating?: number;
  notes?: string;
  followUpDate?: string;
  createdAt: string;
  updatedAt?: string;
}

// ==================== CERTIFICATE & OFFER LETTER INTERFACES ====================

export interface Certificate {
  id: string;
  certificateId: string;
  userId: string;
  internshipId: string;
  testResultId: string;
  issuedDate: string;
  expiryDate?: string;
  verificationUrl: string;
  qrCodeUrl: string;
  issuerName: string;
  issuerLogo: string;
  skillsVerified: string[];
  certificateType: 'SKILL_ASSESSMENT' | 'INTERNSHIP_COMPLETION' | 'PARTICIPATION';
  downloadUrl: string;
  isRevoked: boolean;
  revokedReason?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface OfferLetter {
  id: string;
  offerId: string;
  userId: string;
  internshipId: string;
  applicationId: string;
  status: 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED' | 'WITHDRAWN';
  position: string;
  stipend: string;
  duration: string;
  location: string;
  startDate: string;
  endDate?: string;
  reportingManager?: string;
  reportingManagerEmail?: string;
  termsAndConditions?: string[];
  companyName: string;
  companyLogo: string;
  companyAddress?: string;
  responsibilities?: string[];
  learningOutcomes?: string[];
  mentorshipDetails?: string;
  probationPeriod?: string;
  terminationClause?: string;
  confidentialityClause?: boolean;
  intellectualPropertyClause?: boolean;
  documentUrl: string;
  acceptedDate?: string;
  responseDeadline?: string;
  createdAt: string;
  updatedAt?: string;
}

// ==================== NOTIFICATION INTERFACES ====================

export interface Notification {
  id: string;
  userId: string;
  type: 'APPLICATION' | 'TEST' | 'INTERVIEW' | 'OFFER' | 'PAYMENT' | 'SYSTEM' | 'REMINDER';
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  isArchived: boolean;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  actionUrl?: string;
  actionLabel?: string;
  sentAt: string;
  readAt?: string;
  expiresAt?: string;
}

// ==================== ANALYTICS & STATS INTERFACES ====================

export interface UserStats {
  testsTaken: number;
  testsPassed: number;
  applicationsSubmitted: number;
  interviewsAttended: number;
  offersReceived: number;
  profileCompletion: number;
  skillScore: number;
  averageTestScore: number;
  streakDays: number;
  rank: number;
  percentile: number;
  lastActivity: string;
}

export interface PlatformStats {
  totalUsers: number;
  activeUsers: number;
  totalInternships: number;
  activeInternships: number;
  totalApplications: number;
  successfulPlacements: number;
  averagePlacementTime: number; // in days
  totalRevenue: number;
  partnerCompanies: number;
  userSatisfaction: number;
}

// ==================== SETTINGS & CONFIGURATION ====================

export interface AppSettings {
  maintenanceMode: boolean;
  registrationOpen: boolean;
  applicationFee: number;
  testDuration: number; // in minutes
  passingScore: number; // percentage
  maxRetakeDays: number;
  refundPolicy: string;
  privacyPolicy: string;
  termsOfService: string;
  contactEmail: string;
  contactPhone: string;
  supportHours: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
  createdAt: string;
  updatedAt: string;
}

// ==================== API RESPONSE INTERFACES ====================

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  code: number;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// ==================== ENUM TYPES ====================

export type InternshipType = 'Remote' | 'On-site' | 'Hybrid';
export type InternshipStatus = 'ACTIVE' | 'CLOSED' | 'DRAFT' | 'UPCOMING';
export type ApplicationStatus = 'PENDING' | 'UNDER_REVIEW' | 'SHORTLISTED' | 'REJECTED' | 'SELECTED' | 'WITHDRAWN';
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED' | 'CANCELLED';
export type TestType = 'PRACTICE' | 'REAL';
export type TestSessionStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'TIMED_OUT' | 'CANCELLED';
export type NotificationType = 'APPLICATION' | 'TEST' | 'INTERVIEW' | 'OFFER' | 'PAYMENT' | 'SYSTEM' | 'REMINDER';
export type NotificationPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type CertificateType = 'SKILL_ASSESSMENT' | 'INTERNSHIP_COMPLETION' | 'PARTICIPATION';
export type InterviewType = 'VIDEO' | 'PHONE' | 'IN_PERSON';
