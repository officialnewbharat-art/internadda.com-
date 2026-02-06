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
  status: 'ACTIVE' | 'CLOSED';
  description: string;
  skills: string[];
  duration?: string; // Added: e.g., "6 Months"
  applicationFee?: number; // Added: e.g., 199
  createdAt?: string;
  updatedAt?: string;
  companyLogo?: string;
  requirements?: string[]; // Added: Job requirements
  responsibilities?: string[]; // Added: Key responsibilities
  benefits?: string[]; // Added: Internship benefits
  applicationDeadline?: string;
  openings?: number;
  appliedCount?: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string; // Added: Explanation for answer
  category?: string; // Added: Question category/topic
  difficulty?: 'Easy' | 'Medium' | 'Hard'; // Added: Difficulty level
  timeLimit?: number; // Added: Time limit in seconds
  domain?: string; // Added: Domain specific (Python, Web Dev, etc.)
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  education: string;
  domain: string;
  unlockedRealTest: boolean;
  skills?: string[]; // Added: User skills array
  profileImage?: string; // Added: Profile picture URL
  college?: string; // Added: College/University
  yearOfStudy?: string; // Added: e.g., "3rd Year", "Final Year"
  resumeUrl?: string; // Added: Resume file URL
  linkedinUrl?: string; // Added: LinkedIn profile
  githubUrl?: string; // Added: GitHub profile
  portfolioUrl?: string; // Added: Portfolio website
  bio?: string; // Added: Short bio/about
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: string;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  preferences?: UserPreferences; // Added: User preferences
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
  paymentGateway: 'CASFREE' | 'RAZORPAY' | 'STRIPE' | 'PAYPAL' | 'OTHER';
  orderId: string;
  currency: string; // Added: e.g., "INR", "USD"
  paymentMethod?: string; // Added: e.g., "UPI", "Card", "NetBanking"
  paymentDate?: string;
  refundDate?: string;
  refundAmount?: number;
  refundReason?: string;
  gatewayResponse?: Record<string, any>; // Added: Raw response from payment gateway
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
  totalQuestions: number; // Added: Total questions in test
  correctAnswers: number; // Added: Number of correct answers
  timeTaken: number; // Added: Time taken in seconds
  testType: 'PRACTICE' | 'REAL'; // Added: Test type
  domain?: string; // Added: Test domain/category
  answers?: UserAnswer[]; // Added: Detailed answers
  percentile?: number; // Added: Percentile score
  rank?: number; // Added: Rank among test takers
  certificateId?: string; // Added: Certificate ID if passed
  createdAt?: string;
  updatedAt?: string;
}

export interface UserAnswer {
  questionId: string;
  selectedOption: number;
  isCorrect: boolean;
  timeSpent: number; // Added: Time spent on question in seconds
  questionDifficulty?: 'Easy' | 'Medium' | 'Hard';
}

export interface TestSession {
  id: string;
  userId: string;
  internshipId: string;
  paymentId?: string; // Added: Link to payment
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'TIMED_OUT' | 'CANCELLED';
  startTime: string;
  endTime?: string;
  totalTime?: number; // Added: Total test duration in seconds
  warnings: number; // Added: Number of warnings (tab switching, etc.)
  isFullscreen: boolean; // Added: Was test taken in fullscreen
  deviceInfo?: { // Added: Device information
    userAgent: string;
    platform: string;
    screenResolution: string;
  };
  ipAddress?: string; // Added: For security
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
  paymentId?: string; // Added: Link to payment
  testResultId?: string; // Added: Link to test result
  interviewScheduleId?: string; // Added: Link to interview
  offerLetterId?: string; // Added: Link to offer letter
  notes?: string; // Added: Internal notes
  resumeVersion?: string; // Added: Resume version used
  coverLetter?: string; // Added: Cover letter text
  applicationSource?: string; // Added: How they applied
  expectedStipend?: string; // Added: Expected stipend
  availabilityDate?: string; // Added: When available to start
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
  duration: number; // Added: Duration in minutes
  interviewerName?: string;
  interviewerEmail?: string;
  interviewType: 'VIDEO' | 'PHONE' | 'IN_PERSON';
  platform?: string; // Added: e.g., "Zoom", "Google Meet", "Microsoft Teams"
  meetingLink?: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'RESCHEDULED' | 'NO_SHOW';
  feedback?: string;
  rating?: number; // Added: Interview rating 1-5
  notes?: string;
  followUpDate?: string;
  createdAt: string;
  updatedAt?: string;
}

// ==================== CERTIFICATE & OFFER LETTER INTERFACES ====================

export interface Certificate {
  id: string;
  certificateId: string; // Added: Unique certificate number
  userId: string;
  internshipId: string;
  testResultId: string;
  issuedDate: string;
  expiryDate?: string;
  verificationUrl: string; // Added: URL to verify certificate
  qrCodeUrl: string; // Added: QR code for verification
  issuerName: string; // Added: "Internadda" or "Partner Company"
  issuerLogo: string;
  skillsVerified: string[]; // Added: Skills verified by test
  certificateType: 'SKILL_ASSESSMENT' | 'INTERNSHIP_COMPLETION' | 'PARTICIPATION';
  downloadUrl: string;
  isRevoked: boolean;
  revokedReason?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface OfferLetter {
  id: string;
  offerId: string; // Added: Unique offer ID
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
  documentUrl: string; // Added: PDF download URL
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
  data?: Record<string, any>; // Added: Additional data
  isRead: boolean;
  isArchived: boolean;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  actionUrl?: string; // Added: URL to navigate on click
  actionLabel?: string; // Added: Action button label
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
  streakDays: number; // Added: Login/activity streak
  rank: number; // Added: Overall rank
  percentile: number; // Added: Percentile among users
  lastActivity: string;
}

export interface PlatformStats {
  totalUsers: number;
  activeUsers: number;
  totalInternships: number;
  activeInternships: number;
  totalApplications: number;
  successfulPlacements: number;
  averagePlacementTime: number; // Added: in days
  totalRevenue: number;
  partnerCompanies: number;
  userSatisfaction: number; // Added: Average rating 1-5
}

// ==================== ADMIN INTERFACES ====================

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'MODERATOR' | 'SUPPORT';
  permissions: string[];
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  adminId: string;
  action: string;
  entityType: string;
  entityId: string;
  changes?: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
}

// ==================== SETTINGS & CONFIGURATION ====================

export interface AppSettings {
  maintenanceMode: boolean;
  registrationOpen: boolean;
  applicationFee: number;
  testDuration: number; // Added: in minutes
  passingScore: number; // Added: percentage
  maxRetakeDays: number; // Added: Days before retake allowed
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
