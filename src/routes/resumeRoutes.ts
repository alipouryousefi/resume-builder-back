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

const router = express.Router();

router.post('/', protect, createResume as RequestHandler);
router.get('/', protect, getUserResumes as RequestHandler);
router.get('/:id', protect, getResumeById as RequestHandler);
router.put('/:id', protect, updateResume as RequestHandler);
router.delete('/:id', protect, deleteResume as RequestHandler);
router.put('/:id/upload-images', protect, uploadResumeImages as RequestHandler);

export default router;
