// src/routes/messageRoutes.ts
import { Router } from 'express';
import {
  createMessage,
  getMessagesByProjectId,
  getMessageById,
  updateMessage,
  deleteMessage,
} from '../controllers/messageController.js';

const router = Router();

// Create a new message
router.post('/', createMessage);

// Get all messages by project ID
router.get('/project/:projectId', getMessagesByProjectId);

// Get a single message by ID
router.get('/:id', getMessageById);

// Update a message by ID
router.put('/:id', updateMessage);

// Delete a message by ID
router.delete('/:id', deleteMessage);

export default router;
