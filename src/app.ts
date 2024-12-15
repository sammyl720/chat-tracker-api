// src/app.ts
import express, { Application } from 'express';
import dotenv from 'dotenv';
import messageRoutes from './routes/messageRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/messages', messageRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);

// Health Check Route
app.get('/', (req, res) => {
  res.send('Chat Tracker API is running.');
});

export default app;
