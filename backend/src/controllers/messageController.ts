// src/controllers/messageController.ts
import { Request, Response } from 'express';
import { pool } from '../db/index.js';

// Create a new message
export const createMessage = async (req: Request, res: Response) => {
  const { project_id, user_id, message } = req.body;

  if (!project_id || !user_id || !message) {
    return res.status(400).json({ error: 'project_id, user_id, and message are required.' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO messages (project_id, user_id, message) VALUES ($1, $2, $3) RETURNING *',
      [project_id, user_id, message]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating message:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Get all messages by project ID
export const getMessagesByProjectId = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  try {
    const messages = await pool.query(
      `
      SELECT messages.id, messages.project_id, messages.user_id, messages.message, messages.created_at, users.name as user_name
      FROM messages
      JOIN users ON messages.user_id = users.id
      WHERE messages.project_id = $1
      ORDER BY messages.created_at DESC
      `,
      [projectId]
    );
    res.json(messages.rows);
  } catch (error) {
    console.error('Error fetching messages by project ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Optionally, if you want an endpoint to get all messages:
export const getAllMessages = async (req: Request, res: Response) => {
  try {
    const messages = await pool.query(
      `
      SELECT messages.id, messages.project_id, messages.user_id, messages.message, messages.created_at, users.name as user_name, projects.name as project_name
      FROM messages
      JOIN users ON messages.user_id = users.id
      JOIN projects ON messages.project_id = projects.id
      ORDER BY messages.created_at DESC
      `
    );
    res.json(messages.rows);
  } catch (error) {
    console.error('Error fetching all messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single message by ID
export const getMessageById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM messages WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Message not found.' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching message:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Update a message by ID
export const updateMessage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message content is required.' });
  }

  try {
    const result = await pool.query(
      'UPDATE messages SET message = $1 WHERE id = $2 RETURNING *',
      [message, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Message not found.' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error updating message:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Delete a message by ID
export const deleteMessage = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM messages WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Message not found.' });
    }

    res.status(200).json({ message: 'Message deleted successfully.' });
  } catch (err) {
    console.error('Error deleting message:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
