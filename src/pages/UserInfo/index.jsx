import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import UserInfoOne from './Components/UserInfoOne';
import UserInfoTwo from './Components/UserInfoTwo';
import UserInfoThree from './Components/UserInfoThree';

const UserInfo = () => {
  const [userData, setUserData] = useState({
    nickname: '',
    gender: '',
    age: '',
    height: '',
    weight: '',
  });

  console.log(userData.nickname);
  console.log(userData.gender);

  return (
    <Routes>
      <Route
        path="/"
        element={<UserInfoOne setUserData={setUserData} userData={userData} />}
      />
      <Route
        path="userinfotwo"
        element={<UserInfoTwo setUserData={setUserData} userData={userData} />}
      />
      <Route
        path="userinfothree"
        element={
          <UserInfoThree setUserData={setUserData} userData={userData} />
        }
      />
    </Routes>
  );
};

export default UserInfo;
