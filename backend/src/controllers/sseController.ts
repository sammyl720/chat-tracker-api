import { Request, Response } from 'express';

// Store connected clients
let clients: Response[] = [];

export const sseHandler = (req: Request, res: Response) => {
  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Send initial comment to keep connection alive in some proxies
  res.write(': connected\n\n');

  // Add this client to the list
  clients.push(res);

  // Remove client when connection closes
  req.on('close', () => {
    clients = clients.filter((client) => client !== res);
  });
};

// Function to send events to all connected clients
export const sendSSE = (data: any) => {
  clients.forEach((client) => {
    client.write(`data: ${JSON.stringify(data)}\n\n`);
  });
};
