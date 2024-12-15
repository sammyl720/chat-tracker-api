// src/app.ts
import express, { Application } from 'express';
import dotenv from 'dotenv';
import messageRoutes from './routes/messageRoutes.js';

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/messages', messageRoutes);

// Health Check Route
app.get('/', (req, res) => {
  res.send('Chat Tracker API is running.');
});

export default app;
