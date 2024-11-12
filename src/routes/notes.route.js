import { Router } from 'express';
import { verifyToken } from '../middleware/jwt.middleware.js';
import { notesController } from '../controller/notes.controller.js';

const router = Router();

router.get('/notes', verifyToken, notesController.getNotes);
router.get('/notes/:id', verifyToken, notesController.getNote);
router.post('/notes', verifyToken, notesController.createNote);
router.delete('/notes/:id', verifyToken, notesController.deleteNote);
router.put('/notes/:id', verifyToken, notesController.updateNote);

export default router;