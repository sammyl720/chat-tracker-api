import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Project } from '../../types';
import { FormControl, InputLabel, Select, MenuItem, Box, Typography } from '@mui/material';

interface ProjectSelectorProps {
  selectedProjectId: string;
  onProjectChange: (projectId: string) => void;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({ selectedProjectId, onProjectChange }) => {
  const [projects, setProjects] = useState<Project[]>([]);

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

  return (
    <Box display="flex" alignItems="center" mt={4} mb={2}>
      <Typography variant="h6" mr={2}>
        Select Project:
      </Typography>
      <FormControl variant="outlined" sx={{ minWidth: 200 }}>
        <InputLabel id="project-select-label">Project</InputLabel>
        <Select
          labelId="project-select-label"
          value={selectedProjectId}
          onChange={(e) => onProjectChange(e.target.value)}
          label="Project"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {projects.map((project) => (
            <MenuItem key={project.id} value={project.id}>
              {project.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ProjectSelector;
