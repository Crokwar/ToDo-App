import { Router } from 'express';
import { userController } from '../controller/user.controller.js';
import { verifyToken } from '../middleware/jwt.middleware.js';
import { validateSchema } from '../middleware/validator.middleware.js';
import { registerSchema, loginSchema } from '../schema/auth.schema.js'

const router = Router();

router.post('/register', validateSchema(registerSchema), userController.register);
router.post('/login', validateSchema(loginSchema), userController.login);
router.post('/logout', userController.logout);
router.get('/profile', verifyToken, userController.profile);

export default router;