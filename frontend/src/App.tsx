import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NotificationProvider from './context/NotificationContext';
import { Layout } from './Layout';

const App: React.FC = () => {
  return (
    <Router>
      <NotificationProvider>
        <Layout />
      </NotificationProvider>
    </Router>
  );
};


export default App;
