import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ChatBanner from '../components/chat-banner/ChatBanner';
import Chat from '../components/chat/Chat';
import Auth from '../components/auth/Auth';
import Main from "../components/main/Main"

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

const AppRoutes = () => {
  return (
 <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/chat-room"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
 </div>
  );
};

export default AppRoutes;