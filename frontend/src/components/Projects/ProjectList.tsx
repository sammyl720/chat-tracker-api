// src/components/Projects/ProjectList.tsx

import React, { useEffect, useState } from 'react';
import api from '../../services/api.js';
import { Project } from '../../types.js';
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
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [open, setOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [name, setName] = useState('');

  const fetchProjects = async () => {
    try {
      const response = await api.get<Project[]>('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpen = (project?: Project) => {
    if (project) {
      setCurrentProject(project);
      setName(project.name);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentProject(null);
    setName('');
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      if (currentProject) {
        // Update
        await api.put(`/projects/${currentProject.id}`, { name });
      } else {
        // Create
        await api.post('/projects', { name });
      }
      fetchProjects();
      handleClose();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/projects/${id}`);
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
        <Typography variant="h4">Projects</Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Add Project
        </Button>
      </Box>
      <List>
        {projects.map((project) => (
          <ListItem
            key={project.id}
            secondaryAction={
              <>
                <IconButton edge="end" aria-label="edit" onClick={() => handleOpen(project)}>
                  <Edit />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(project.id!)}>
                  <Delete />
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={project.name}
              secondary={`Created at: ${new Date(project.created_at!).toLocaleString()}`}
            />
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentProject ? 'Edit Project' : 'Add Project'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Project Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            {currentProject ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProjectList;
