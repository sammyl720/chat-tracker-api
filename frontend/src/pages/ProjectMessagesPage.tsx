import React, { useState } from 'react';
import ProjectSelector from '../components/Projects/ProjectSelector';
import MessageList from '../components/Messages/MessageList';
import { Container, Typography } from '@mui/material';

const ProjectMessagesPage: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');

  const handleProjectChange = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

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
