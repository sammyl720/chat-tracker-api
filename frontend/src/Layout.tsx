import React, { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import ProjectList from './components/Projects/ProjectList';
import UserList from './components/Users/UserList';
import MessageList from './components/Messages/MessageList';
import ProjectMessagesPage from './pages/ProjectMessagesPage';
import { createSSEConnection } from './services/sse';
import { useNotification } from './context/NotificationContext';

export const Layout: React.FC = () => {
    const { showNotification } = useNotification();
  
    useEffect(() => {
      const eventSource = createSSEConnection(
        (data) => {
          if (data.event === 'new-project') {
            showNotification(
              <>
                New Project Created: <strong>{data.data.name}</strong> -{' '}
                <Link to={`/project-messages?projectId=${data.data.id}`}>
                  View Project
                </Link>
              </>,
              'success'
            );
          }
        },
        (error) => {
          console.error('SSE connection error:', error);
        }
      );
  
      return () => {
        eventSource.close();
      };
    }, [showNotification]);
  
    return (
      <>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Chat Tracker
              </Typography>
              <Button color="inherit" component={Link} to="/projects">
                Projects
              </Button>
              <Button color="inherit" component={Link} to="/users">
                Users
              </Button>
              <Button color="inherit" component={Link} to="/messages">
                Messages
              </Button>
              <Button color="inherit" component={Link} to="/project-messages">
                Project Messages
              </Button>
            </Toolbar>
          </AppBar>
          <Routes>
            <Route path="/" element={<ProjectList />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/messages" element={<MessageList projectId="" />} />
            <Route path="/project-messages" element={<ProjectMessagesPage />} />
          </Routes>
      </>
  
    );
  };