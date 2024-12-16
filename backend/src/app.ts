import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import messageRoutes from './routes/messageRoutes';
import projectRoutes from './routes/projectRoutes';
import userRoutes from './routes/userRoutes';
import sseRoutes from './routes/sseRoutes';

dotenv.config();

const app: Application = express();

// Middleware
app.use(
  cors({
    origin: 'http://localhost:3000', // Frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use('/api/messages', messageRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sse', sseRoutes); // Add SSE route

// Health Check Route
app.get('/', (req, res) => {
  res.send('Chat Tracker API is running.');
});

export default app;
