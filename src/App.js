import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import loadable from '@loadable/component';

const LogIn = loadable(() => import('./pages/LogIn'));
const SignUp = loadable(() => import('./pages/SignUp'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
