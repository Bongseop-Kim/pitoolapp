import { getAuth } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../fbbase';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Two = () => {
  const userRef = collection(db, 'userInfo');
  const auth = getAuth();
  const user = auth.currentUser;

  const navigate = useNavigate();

  const maleFunctino = async e => {
    e.preventDefault();
    console.log('onSubmitUserNickName');
    await setDoc(doc(userRef, user.uid), { male: '남성' });
    // navigate('/userinfo/three');
  };

  const femaleFunctino = async e => {
    e.preventDefault();
    console.log('onSubmitUserNickName');
    await setDoc(doc(userRef, user.uid), { male: '여성' });
    // navigate('/userinfo/three');
  };

  return (
    <>
      <div>whats your gender?</div>
      <button onClick={maleFunctino}>maale</button>
      <button onClick={femaleFunctino}>female</button>
    </>
  );
};

export default Two;
