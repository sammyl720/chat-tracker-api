import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Message, Project, User } from '../../types';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const MessageList: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<Message | null>(null);
  const [project_id, setProjectId] = useState('');
  const [user_id, setUserId] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const fetchMessages = async () => {
    try {
      const response = await api.get<Message[]>('/messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setSnackbar({ open: true, message: 'Failed to fetch messages.', severity: 'error' });
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await api.get<Project[]>('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setSnackbar({ open: true, message: 'Failed to fetch projects.', severity: 'error' });
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get<User[]>('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setSnackbar({ open: true, message: 'Failed to fetch users.', severity: 'error' });
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchProjects();
    fetchUsers();
  }, []);

  const handleOpen = (message?: Message) => {
    if (message) {
      setCurrentMessage(message);
      setProjectId(message.project_id);
      setUserId(message.user_id);
      setMessageContent(message.message);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentMessage(null);
    setProjectId('');
    setUserId('');
    setMessageContent('');
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      if (currentMessage) {
        // Update
        await api.put(`/messages/${currentMessage.id}`, {
          project_id,
          user_id,
          message: messageContent,
        });
        setSnackbar({ open: true, message: 'Message updated successfully.', severity: 'success' });
      } else {
        // Create
        await api.post('/messages', {
          project_id,
          user_id,
          message: messageContent,
        });
        setSnackbar({ open: true, message: 'Message created successfully.', severity: 'success' });
      }
      fetchMessages();
      handleClose();
    } catch (error) {
      console.error('Error saving message:', error);
      setSnackbar({ open: true, message: 'Failed to save message.', severity: 'error' });
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this message? This action cannot be undone.')) return;
    try {
      await api.delete(`/messages/${id}`);
      setSnackbar({ open: true, message: 'Message deleted successfully.', severity: 'success' });
      fetchMessages();
    } catch (error) {
      console.error('Error deleting message:', error);
      setSnackbar({ open: true, message: 'Failed to delete message.', severity: 'error' });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
        <Typography variant="h4">Messages</Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Add Message
        </Button>
      </Box>
      <List>
        {messages.map((msg) => (
          <ListItem
            key={msg.id}
            secondaryAction={
              <>
                <IconButton edge="end" aria-label="edit" onClick={() => handleOpen(msg)}>
                  <Edit />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(msg.id!)}>
                  <Delete />
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={`Project: ${projects.find((p) => p.id === msg.project_id)?.name || 'Unknown'} | User: ${
                users.find((u) => u.id === msg.user_id)?.name || 'Unknown'
              }`}
              secondary={`Message: ${msg.message} | Created at: ${new Date(msg.created_at!).toLocaleString()}`}
            />
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{currentMessage ? 'Edit Message' : 'Add Message'}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel id="project-label">Project</InputLabel>
            <Select
              labelId="project-label"
              value={project_id}
              label="Project"
              onChange={(e) => setProjectId(e.target.value)}
            >
              {projects.map((project) => (
                <MenuItem key={project.id} value={project.id}>
                  {project.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="dense">
            <InputLabel id="user-label">User</InputLabel>
            <Select
              labelId="user-label"
              value={user_id}
              label="User"
              onChange={(e) => setUserId(e.target.value)}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            margin="dense"
            label="Message"
            type="text"
            fullWidth
            multiline
            minRows={3}
            variant="standard"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            {currentMessage ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default MessageList;