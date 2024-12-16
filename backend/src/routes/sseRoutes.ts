import express from 'express';
import { sseHandler } from '../controllers/sseController';

const router = express.Router();

router.get('/events', sseHandler);

export default router;
