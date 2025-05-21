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

/**
 * @swagger
 * tags:
 *   name: Resume
 *   description: Resume management
 */

/**
 * @swagger
 * /api/resume:
 *   post:
 *     summary: Create a new resume
 *     tags: [Resume]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Resume created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Not authorized
 */
router.post('/', protect, createResumeValidation, validateRequest as RequestHandler, createResume as RequestHandler);

/**
 * @swagger
 * /api/resume:
 *   get:
 *     summary: Get all resumes for the authenticated user
 *     tags: [Resume]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Resumes fetched successfully
 *       401:
 *         description: Not authorized
 */
router.get('/', protect, getUserResumes as RequestHandler);

/**
 * @swagger
 * /api/resume/{id}:
 *   get:
 *     summary: Get a resume by ID
 *     tags: [Resume]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Resume ID
 *     responses:
 *       200:
 *         description: Resume fetched successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Resume not found
 */
router.get('/:id', protect, getResumeById as RequestHandler);

/**
 * @swagger
 * /api/resume/{id}:
 *   put:
 *     summary: Update a resume by ID
 *     tags: [Resume]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Resume ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               profileInfo:
 *                 type: object
 *                 properties:
 *                   profileImage:
 *                     type: string
 *                     nullable: true
 *                   previewUrl:
 *                     type: string
 *                   fullName:
 *                     type: string
 *                   designation:
 *                     type: string
 *                   summary:
 *                     type: string
 *               contactInfo:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   location:
 *                     type: string
 *                   linkedin:
 *                     type: string
 *                   github:
 *                     type: string
 *                   website:
 *                     type: string
 *               workExperience:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     company:
 *                       type: string
 *                     role:
 *                       type: string
 *                     startDate:
 *                       type: string
 *                     endDate:
 *                       type: string
 *                     description:
 *                       type: string
 *               education:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     degree:
 *                       type: string
 *                     institution:
 *                       type: string
 *                     startDate:
 *                       type: string
 *                     endDate:
 *                       type: string
 *               skills:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     progress:
 *                       type: number
 *               projects:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     github:
 *                       type: string
 *                     liveDemo:
 *                       type: string
 *               certifications:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     issuer:
 *                       type: string
 *                     year:
 *                       type: string
 *               languages:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     progress:
 *                       type: number
 *               interests:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Resume updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Resume not found
 */
router.put('/:id', protect, updateResumeValidation, validateRequest as RequestHandler, updateResume as RequestHandler);

/**
 * @swagger
 * /api/resume/{id}:
 *   delete:
 *     summary: Delete a resume by ID
 *     tags: [Resume]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Resume ID
 *     responses:
 *       200:
 *         description: Resume deleted successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Resume not found
 */
router.delete('/:id', protect, deleteResume as RequestHandler);

/**
 * @swagger
 * /api/resume/{id}/upload-images:
 *   put:
 *     summary: Upload images for a resume
 *     tags: [Resume]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Resume ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Images uploaded successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Resume not found
 */
router.put('/:id/upload-images', protect, uploadResumeImages as RequestHandler);

export default router;    