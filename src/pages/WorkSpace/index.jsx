import { authService } from 'fbbase';
import React, { useCallback, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../fbbase';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './layout/navbar';
import Search from './Components/search';
import Home from './Components/home';
import Profile from './Components/porfile';
import Exercise from './Components/Exercise';

import './index.scss';

const WorkSpace = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const onLogout = useCallback(() => {
    authService.signOut();
  }, []);

  useEffect(() => {
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;
      console.log('currentuserOK');
      const docRef = doc(db, 'userInfo', uid);

      async function fetchData() {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log('Document data:', docSnap.data());
        } else {
          console.log('No such document!');
          navigate('/userinfo');
        }
      }
      fetchData();
    }
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
      } else {
        navigate('/');
      }
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="exercise" element={<Exercise />} />
        <Route path="search" element={<Search />} />
        <Route path="profile" element={<Profile />} />
        <Route />
      </Routes>
      <button onClick={onLogout} className="logout">
        로그아웃
      </button>
      <Navbar />
    </>
  );
};

export default WorkSpace;
