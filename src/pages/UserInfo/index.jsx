import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserInfoOne from './Components/UserInfoOne';
import Two from './Components/UserInfoTwo';

const UserInfo = () => {
  return (
    <Routes>
      <Route path="/" element={<UserInfoOne />} />
      <Route path="two" element={<Two />} />
      <Route path="userinfothree" element={<UserInfoOne />} />
    </Routes>
  );
};

export default UserInfo;
