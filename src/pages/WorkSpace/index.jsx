import { authService } from 'fbbase';
import React, { useCallback, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './layout/navbar';
import Search from './Components/search';
import Home from './Components/home';

const WorkSpace = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const onLogout = useCallback(() => {
    authService.signOut();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        const uid = user.uid;
      } else {
        navigate('/');
      }
    });
  });

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route />
        <Route />
      </Routes>
      <button onClick={onLogout}>로그아웃</button>
      <Navbar />
    </>
  );
};

export default WorkSpace;
