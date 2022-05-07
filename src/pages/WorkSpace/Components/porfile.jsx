import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { db } from '../../../fbbase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { async } from '@firebase/util';

const Profile = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const displayName = user.displayName;
  const email = user.email;

  const [userProfile, setUserProfile] = useState('');

  const onChange = async e => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'users'), {
        first: 'Ada',
        last: 'Lovelace',
        born: 1815,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const onRead = async e => {
    e.preventDefault();
    const querySnapshot = await getDocs(collection(db, 'users'));
    querySnapshot.forEach(doc => {
      console.log(doc.data(doc.first));
    });
  };

  return (
    <>
      <div>사용자 이름 : {displayName}</div>
      <div>email : {email}</div>
      <div> 닉네임 :</div>
      <div> 성별 :</div>
      <div> 운동경력 :</div>
      <div> 일주일 운동 횟 수 :</div>
      <div> 해결하고 싶은 고민 :</div>
      <div> 나이 :</div>
      <div> 키 :</div>
      <div> 몸무게 :</div>

      <button onClick={onChange}>change</button>
      <button onClick={onRead}>Read</button>
    </>
  );
};

export default Profile;
