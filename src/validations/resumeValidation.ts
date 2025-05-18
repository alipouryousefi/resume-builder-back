import { body } from 'express-validator';

export const createResumeValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Title must be between 2 and 100 characters'),
];

export const updateResumeValidation = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Title must be between 2 and 100 characters'),
  
  body('profileInfo.fullName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Full name must be between 2 and 100 characters'),
  
  body('profileInfo.designation')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Designation must not exceed 100 characters'),
  
  body('profileInfo.summary')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Summary must not exceed 1000 characters'),
  
  body('contactInfo.email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email'),
  
  body('contactInfo.phone')
    .optional()
    .trim()
    .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
    .withMessage('Please enter a valid phone number'),
  
  body('contactInfo.linkedin')
    .optional()
    .trim()
    .isURL()
    .withMessage('Please enter a valid LinkedIn URL'),
  
  body('contactInfo.github')
    .optional()
    .trim()
    .isURL()
    .withMessage('Please enter a valid GitHub URL'),
  
  body('contactInfo.website')
    .optional()
    .trim()
    .isURL()
    .withMessage('Please enter a valid website URL'),
  
  body('workExperience.*.company')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Company name must be between 2 and 100 characters'),
  
  body('workExperience.*.role')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Role must be between 2 and 100 characters'),
  
  body('workExperience.*.startDate')
    .optional()
    .trim()
    .isDate()
    .withMessage('Please enter a valid start date'),
  
  body('workExperience.*.endDate')
    .optional()
    .trim()
    .isDate()
    .withMessage('Please enter a valid end date'),
  
  body('education.*.degree')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Degree must be between 2 and 100 characters'),
  
  body('education.*.institution')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Institution must be between 2 and 100 characters'),
  
  body('skills.*.name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Skill name must be between 2 and 50 characters'),
  
  body('skills.*.progress')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Progress must be between 0 and 100'),
  
  body('projects.*.title')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Project title must be between 2 and 100 characters'),
  
  body('projects.*.github')
    .optional()
    .trim()
    .isURL()
    .withMessage('Please enter a valid GitHub URL'),
  
  body('projects.*.liveDemo')
    .optional()
    .trim()
    .isURL()
    .withMessage('Please enter a valid live demo URL'),
  
  body('certifications.*.title')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Certification title must be between 2 and 100 characters'),
  
  body('certifications.*.issuer')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Issuer must be between 2 and 100 characters'),
  
  body('languages.*.name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Language name must be between 2 and 50 characters'),
  
  body('languages.*.progress')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Progress must be between 0 and 100'),
  
  body('interests')
    .optional()
    .isArray()
    .withMessage('Interests must be an array'),
  
  body('interests.*')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Interest must be between 2 and 50 characters'),
];