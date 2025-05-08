import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Main from "../components/main/Main";
import Chat from '../components/chat/Chat';

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/chat-room" element={<Chat />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;