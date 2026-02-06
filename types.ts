
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
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  education: string;
  domain: string;
  unlockedRealTest: boolean;
}

export interface TestResult {
  id: string;
  userId: string;
  internshipId: string;
  score: number;
  passed: boolean;
  date: string;
}
