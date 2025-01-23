import { Router } from 'express';
import { authorizePermissions } from '../middleware/authMiddleware.js';
import upload from '../middleware/multerMiddleware.js';
import {validateUpdateUserInput} from '../middleware/validationMiddleware.js';

const router = Router();

import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
} from '../controllers/userController.js';

router.get('/current-user', getCurrentUser);
router.patch('/update-user', updateUser);
router.get('/admin/app-stats', [
  authorizePermissions('admin'),
  getApplicationStats,
]);

router.patch('/update-user',
  upload.single('avatar'),
  validateUpdateUserInput,
  updateUser,
);

export default router;