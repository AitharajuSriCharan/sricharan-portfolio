export interface SkillCategory {
  title: string;
  iconName: string;
  description: string;
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  achievement?: string;
  status?: 'Completed' | 'In Progress' | 'Selected';
  image: string;
  githubUrl?: string;
  viewDetails?: {
    overview: string;
    keyTakeaways: string[];
    technicalHighlights: string[];
    hardwareStack: string[];
  };
}

export interface EventExperience {
  name: string;
  year?: string;
  role: string;
  description: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  iconName: string;
  tag: string;
  selectedEvents?: EventExperience[];
}

export interface AchievementItem {
  id: string;
  title: string;
  year: string;
  description: string;
  badge: string;
  iconName: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  organizer?: string;
  year?: string;
  description: string;
  category: string;
  certificateUrl?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution?: string;
  period?: string;
  score: string;
  scoreType: string;
  details: string;
  highlights?: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  timestamp?: string;
  errors?: Record<string, string>;
}

export interface ContactMessageItem {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface PaginatedMessages {
  content: ContactMessageItem[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

