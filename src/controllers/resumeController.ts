import { NextFunction, Request, Response } from 'express';
import Resume from '../models/Resume';
import User from '../models/User';
import path from 'path';
import fs from 'fs';

const createResume = async (
  req: Request,
  res: Response,
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

    res.status(201).json({
      message: 'Resume created successfully',
      resume: newResume,
    });
  } catch (err) {
    next(err);
  }
};

const getUserResumes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({
      updatedAt: -1,
    });

    res.status(200).json({
      message: 'Resumes fetched successfully',
      resumes,
    });
  } catch (err) {
    next(err);
  }
};

const getResumeById = async (
  req: Request,
  res: Response,
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
      });
    }
    res.status(200).json({
      message: 'Resume fetched successfully',
      resume,
    });
  } catch (err) {
    next(err);
  }
};

const updateResume = async (
  req: Request,
  res: Response,
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
      });
    }

    Object.assign(resume, req.body);

    const updatedResume = await resume.save();

    res.status(200).json({
      message: 'Resume updated successfully',
      resume: updatedResume,
    });
  } catch (err) {
    next(err);
  }
};

const deleteResume = async (
  req: Request,
  res: Response,
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

    const deletedResume = await resume.deleteOne();

    if (!deletedResume) {
      return res.status(404).json({
        message: 'Resume not found',
      });
    }

    res.status(200).json({
      message: 'Resume deleted successfully',
      resume: deletedResume,
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
