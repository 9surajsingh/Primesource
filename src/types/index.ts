import type {
  User as PrismaUser,
  BlogPost as PrismaBlogPost,
  Job as PrismaJob,
  JobApplication as PrismaJobApplication,
  CaseStudy as PrismaCaseStudy,
  Contact as PrismaContact,
  Media as PrismaMedia,
  Newsletter as PrismaNewsletter,
  UserRole,
  JobType,
  ApplicationStatus,
  ContactStatus,
} from '@prisma/client';

// ─── Re-export Prisma enums ─────────────────────────────────────────────────

export type { UserRole, JobType, ApplicationStatus, ContactStatus };

// ─── Prisma Model Types ─────────────────────────────────────────────────────

export type User = PrismaUser;
export type BlogPost = PrismaBlogPost;
export type Job = PrismaJob;
export type JobApplication = PrismaJobApplication;
export type CaseStudy = PrismaCaseStudy;
export type Contact = PrismaContact;
export type Media = PrismaMedia;
export type Newsletter = PrismaNewsletter;

// ─── Extended Types with Relations ──────────────────────────────────────────

export type BlogPostWithAuthor = PrismaBlogPost & {
  author: Pick<PrismaUser, 'id' | 'name' | 'avatar'>;
};

export type JobWithApplications = PrismaJob & {
  applications: PrismaJobApplication[];
  _count?: {
    applications: number;
  };
};

export type JobApplicationWithJob = PrismaJobApplication & {
  job: Pick<PrismaJob, 'id' | 'title' | 'department' | 'location'>;
};

// ─── Navigation Types ───────────────────────────────────────────────────────

export interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon?: string;
  children?: NavItem[];
  external?: boolean;
  disabled?: boolean;
}

// ─── Service Types ──────────────────────────────────────────────────────────

export interface Service {
  icon: string;
  title: string;
  description: string;
  href: string;
  features?: string[];
  image?: string;
}

// ─── Team Member Types ──────────────────────────────────────────────────────

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  linkedIn?: string;
  twitter?: string;
  email?: string;
}

// ─── Testimonial Types ──────────────────────────────────────────────────────

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating?: number;
}

// ─── Statistics Types ───────────────────────────────────────────────────────

export interface Stat {
  label: string;
  value: string;
  suffix?: string;
  prefix?: string;
  description?: string;
  icon?: string;
}

// ─── Feature Types ──────────────────────────────────────────────────────────

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

// ─── Site Configuration ─────────────────────────────────────────────────────

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  keywords: string[];
  authors: {
    name: string;
    url?: string;
  }[];
  creator: string;
  links: {
    twitter?: string;
    github?: string;
    linkedIn?: string;
  };
}

// ─── API Response Types ─────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasMore: boolean;
  };
}

export interface ApiError {
  success: false;
  error: string;
  statusCode: number;
  details?: Record<string, string[]>;
}

// ─── Form Types ─────────────────────────────────────────────────────────────

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
}

export interface JobApplicationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  resume: string;
  coverLetter?: string;
  linkedIn?: string;
  portfolio?: string;
}

export interface NewsletterFormData {
  email: string;
}

// ─── Search & Filter Types ──────────────────────────────────────────────────

export interface SearchParams {
  query?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface BlogSearchParams extends SearchParams {
  category?: string;
  tag?: string;
  featured?: boolean;
}

export interface JobSearchParams extends SearchParams {
  department?: string;
  location?: string;
  type?: JobType;
}

// ─── Breadcrumb Types ───────────────────────────────────────────────────────

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// ─── Social Links ───────────────────────────────────────────────────────────

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

// ─── Footer Navigation ─────────────────────────────────────────────────────

export interface FooterSection {
  title: string;
  links: {
    label: string;
    href: string;
    external?: boolean;
  }[];
}
