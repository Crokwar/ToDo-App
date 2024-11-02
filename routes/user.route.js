import { Router } from 'express';
import { userController } from '../controller/user.controller.js';
import { verifyToken } from '../middleware/jwt.middleware.js';

const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login)
router.get('/profile', verifyToken, userController.profile);

export default router;