import fs from 'fs'; 
import path from 'path';
import Resume from '../models/Resume';
import upload from '../middlewares/uploadMiddleware';
import { NextFunction, Request, Response } from 'express';

interface FileArray {
  [fieldname: string]: Express.Multer.File[];
}

const uploadResumeImages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    upload.fields([{name:"thumbnail"},{name:"profileImage"}])(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          message: "Error uploading images",
          error: err.message,
        });
      }

      const resumeId = req.params.id;
      const resume = await Resume.findOne({
        _id: resumeId,
        userId: req.user._id,
      });

      if (!resume) {
        return res.status(404).json({
          message: "Resume not found",
        });
      }
  
      const uploadsFolder = path.join(__dirname, '..', 'uploads');   
      const baseUrl = `${req.protocol}://${req.get('host')}`;

      const files = req.files as FileArray;
      const newThumbnail = files?.thumbnail?.[0];
      const newProfileImage = files?.profileImage?.[0];

      if (newThumbnail) {
        if (resume.thumbnailLink) {
          const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
          if (fs.existsSync(oldThumbnail)) {
            fs.unlinkSync(oldThumbnail);
          }
        }
        resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
      }

      if (newProfileImage) {
        if (resume.profileInfo?.profilePreviewUrl) {
          const oldPreview = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl));
          if (fs.existsSync(oldPreview)) {
            fs.unlinkSync(oldPreview);
          }
        }
        if (!resume.profileInfo) {
          resume.profileInfo = {};
        }
        resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;
      }

      await resume.save();

      res.status(200).json({
        message: "Images uploaded successfully",
        resume,
      });
    });
  } catch (error) {
    next(error);
  }
};

export default uploadResumeImages;