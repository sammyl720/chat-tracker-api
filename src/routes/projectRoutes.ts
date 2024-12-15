// src/routes/projectRoutes.ts
import { Router } from 'express';
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';

const router = Router();

// Create a new project
router.post('/', createProject);

// Get all projects
router.get('/', getAllProjects);

// Get a project by ID
router.get('/:id', getProjectById);

// Update a project by ID
router.put('/:id', updateProject);

// Delete a project by ID
router.delete('/:id', deleteProject);

export default router;
