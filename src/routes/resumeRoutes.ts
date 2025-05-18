import express, { RequestHandler } from 'express';
import protect from '../middlewares/authMiddleware';
import {
  createResume,
  deleteResume,
  getResumeById,
  getUserResumes,
  updateResume,
} from '../controllers/resumeController';
import uploadResumeImages from '../controllers/uploadImages';
import { createResumeValidation, updateResumeValidation } from '../validations/resumeValidation';
import { validateRequest } from '../validations/validateRequest';

const router = express.Router();

router.post('/', protect, createResumeValidation, validateRequest as RequestHandler, createResume as RequestHandler);
router.get('/', protect, getUserResumes as RequestHandler);
router.get('/:id', protect, getResumeById as RequestHandler);
router.put('/:id', protect, updateResumeValidation, validateRequest as RequestHandler, updateResume as RequestHandler);
router.delete('/:id', protect, deleteResume as RequestHandler);
router.put('/:id/upload-images', protect, uploadResumeImages as RequestHandler);

export default router;    