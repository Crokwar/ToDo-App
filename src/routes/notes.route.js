import { Router } from 'express';
import { verifyToken } from '../middleware/jwt.middleware.js';
import { notesController } from '../controller/notes.controller.js';
import { createSchema } from '../schema/notes.schema.js';
import { validateSchema } from '../middleware/validator.middleware.js';

const router = Router();

router.get('/notes', verifyToken, notesController.getNotes);
router.get('/notes/:id', verifyToken, notesController.getNote);
router.post('/notes', verifyToken, validateSchema(createSchema),notesController.createNote);
router.delete('/notes/:id', verifyToken, notesController.deleteNote);
router.put('/notes/:id', verifyToken, notesController.updateNote);

export default router;