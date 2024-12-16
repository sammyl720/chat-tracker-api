// src/pages/ProjectMessagesPage.tsx

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProjectSelector from '../components/Projects/ProjectSelector';
import MessageList from '../components/Messages/MessageList';
import { Container, Typography } from '@mui/material';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ProjectMessagesPage: React.FC = () => {
  const query = useQuery();
  const initialProjectId = query.get('projectId') || '';
  const [selectedProjectId, setSelectedProjectId] = useState<string>(initialProjectId);

  const handleProjectChange = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  useEffect(() => {
    if (initialProjectId) {
      setSelectedProjectId(initialProjectId);
    }
  }, [initialProjectId]);

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom mt={4}>
        Project Messages
      </Typography>
      <ProjectSelector selectedProjectId={selectedProjectId} onProjectChange={handleProjectChange} />
      <MessageList projectId={selectedProjectId} />
    </Container>
  );
};

export default ProjectMessagesPage;
