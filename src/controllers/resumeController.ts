import { NextFunction, Request, Response } from 'express';
import Resume from '../models/Resume';
import User from '../models/User';
import path from 'path';
import fs from 'fs';
import {
  CreateResumeDto,
  CreateResumeResponseDto,
  GetUserResumesResponseDto,
  GetResumeByIdResponseDto,
  UpdateResumeDto,
  UpdateResumeResponseDto,
  DeleteResumeResponseDto,
} from '../dtos/resume.dto';
import { IResume } from '../types/models';

// ... existing code ...

const createResume = async (
  req: Request<{}, {}, CreateResumeDto>,
  res: Response<CreateResumeResponseDto>,
  next: NextFunction,
) => {
  try {
    const { title } = req.body;

    const defaultResumeData = {
      profileInfo: {
        profileImage: null,
        previewUrl: '',
        fullName: '',
        designation: '',
        summary: '',
      },
      contactInfo: {
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        github: '',
        website: '',
      },
      workExperience: [
        {
          company: '',
          role: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
      education: [
        {
          degree: '',
          institution: '',
          startDate: '',
          endDate: '',
        },
      ],
      skills: [
        {
          name: '',
          progress: 0,
        },
      ],
      projects: [
        {
          title: '',
          description: '',
          github: '',
          liveDemo: '',
        },
      ],
      certifications: [
        {
          title: '',
          issuer: '',
          year: '',
        },
      ],
      languages: [
        {
          name: '',
          progress: 0,
        },
      ],
      interests: [],
    };

    const newResume = await Resume.create({
      title,
      ...defaultResumeData,
      userId: req.user._id,
    });

    const resumeData = newResume.toObject() as unknown as IResume;

    res.status(201).json({
      message: 'Resume created successfully',
      resume: resumeData,
    });
  } catch (err) {
    next(err);
  }
};

const getUserResumes = async (
  req: Request,
  res: Response<GetUserResumesResponseDto>,
  next: NextFunction,
) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({
      updatedAt: -1,
    });

    const resumeData = resumes.map(resume => resume.toObject() as unknown as IResume);

    res.status(200).json({
      message: 'Resumes fetched successfully',
      resumes: resumeData,
    });
  } catch (err) {
    next(err);
  }
};

const getResumeById = async (
  req: Request<{ id: string }>,
  res: Response<GetResumeByIdResponseDto>,
  next: NextFunction,
) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        message: 'Resume not found',
        resume: null as unknown as IResume,
      });
    }

    const resumeData = resume.toObject() as unknown as IResume;

    res.status(200).json({
      message: 'Resume fetched successfully',
      resume: resumeData,
    });
  } catch (err) {
    next(err);
  }
};

const updateResume = async (
  req: Request<{ id: string }, {}, UpdateResumeDto>,
  res: Response<UpdateResumeResponseDto>,
  next: NextFunction,
) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        message: 'Resume not found',
        resume: null as unknown as IResume,
      });
    }

    Object.assign(resume, req.body);

    const updatedResume = await resume.save();
    const resumeData = updatedResume.toObject() as unknown as IResume;

    res.status(200).json({
      message: 'Resume updated successfully',
      resume: resumeData,
    });
  } catch (err) {
    next(err);
  }
};

const deleteResume = async (
  req: Request<{ id: string }>,
  res: Response<DeleteResumeResponseDto>,
  next: NextFunction,
) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        message: 'Resume not found',
        resume: null as unknown as IResume,
      });
    }

    const uploadsFolder = path.join(__dirname, '..', 'uploads');
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    if(resume.thumbnailLink){
      const oldThumbnail = path.join(
        uploadsFolder,
        path.basename(resume.thumbnailLink),
      );
      if (fs.existsSync(oldThumbnail)) {
        fs.unlinkSync(oldThumbnail);
      }
    }

    if (resume.profileInfo?.profilePreviewUrl) {
      const oldPreview = path.join(
        uploadsFolder,
        path.basename(resume.profileInfo.profilePreviewUrl),
      );
      if (fs.existsSync(oldPreview)) {
        fs.unlinkSync(oldPreview);
      }
    }

    const resumeData = resume.toObject() as unknown as IResume;
    await resume.deleteOne();

    res.status(200).json({
      message: 'Resume deleted successfully',
      resume: resumeData,
    });
  } catch (err) {
    next(err);
  }
};

export {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
};