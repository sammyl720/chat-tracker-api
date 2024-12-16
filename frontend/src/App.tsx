import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import ProjectList from './components/Projects/ProjectList';
import UserList from './components/Users/UserList';
import MessageList from './components/Messages/MessageList';
import ProjectMessagesPage from './pages/ProjectMessagesPage';

const App: React.FC = () => {
  return (
    <Router>
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
        <Route path="/messages" element={<MessageList projectId="" />} /> {/* Assuming previous MessageList was global */}
        <Route path="/project-messages" element={<ProjectMessagesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
