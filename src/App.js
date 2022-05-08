import React from 'react';
import { Route, Routes } from 'react-router-dom';
import loadable from '@loadable/component';
import { authService } from './fbbase';
import UserInfo from 'pages/UserInfo';

const LogIn = loadable(() => import('./pages/LogIn'));
const SignUp = loadable(() => import('./pages/SignUp'));
const WorkSpace = loadable(() => import('./pages/WorkSpace'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/workspace/*" element={<WorkSpace />} />
      <Route path="/userinfo/*" element={<UserInfo />} />
    </Routes>
  );
}

export default App;
