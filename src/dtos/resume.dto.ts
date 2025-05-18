import { IResume } from '../types/models';

// Create Resume DTOs
export interface CreateResumeDto {
  title: string;
}

export interface CreateResumeResponseDto {
  message: string;
  resume: IResume;
}

// Get User Resumes DTOs
export interface GetUserResumesResponseDto {
  message: string;
  resumes: IResume[];
}

// Get Resume by ID DTOs
export interface GetResumeByIdResponseDto {
  message: string;
  resume: IResume;
}

// Update Resume DTOs
export interface UpdateResumeDto {
  title?: string;
  profileInfo?: {
    profileImage?: string | null;
    previewUrl?: string;
    fullName?: string;
    designation?: string;
    summary?: string;
  };
  contactInfo?: {
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  workExperience?: Array<{
    company?: string;
    role?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
  }>;
  education?: Array<{
    degree?: string;
    institution?: string;
    startDate?: string;
    endDate?: string;
  }>;
  skills?: Array<{
    name?: string;
    progress?: number;
  }>;
  projects?: Array<{
    title?: string;
    description?: string;
    github?: string;
    liveDemo?: string;
  }>;
  certifications?: Array<{
    title?: string;
    issuer?: string;
    year?: string;
  }>;
  languages?: Array<{
    name?: string;
    progress?: number;
  }>;
  interests?: string[];
}

export interface UpdateResumeResponseDto {
  message: string;
  resume: IResume;
}

// Delete Resume DTOs
export interface DeleteResumeResponseDto {
  message: string;
  resume: IResume;
}