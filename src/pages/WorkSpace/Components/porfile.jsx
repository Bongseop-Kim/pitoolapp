import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { db } from '../../../fbbase';
import { collection, setDoc, doc, getDoc } from 'firebase/firestore';

const Profile = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const displayName = user.displayName;
  const email = user.email;
  const uId = user.uid;

  const [userProfile, setUserProfile] = useState('');

  const onChange = async e => {
    e.preventDefault();
    const userRef = collection(db, 'userInfo');
    await setDoc(doc(userRef, uId), {
      name: displayName,
      nickname: 'bongu',
      gender: '남성',
      career: '1년',
      perweeks: '4회',
      purpose: '다이어트',
      age: 24,
      weight: '75kg',
    });
  };

  const onRead = async e => {
    e.preventDefault();
    const docRef = doc(db, 'userInfo', uId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserProfile(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  };

  return (
    <>
      <div>사용자 이름 : {userProfile.name}</div>
      <div> 닉네임 :{userProfile.nickname}</div>
      <div> 성별 :{userProfile.gender}</div>
      <div> 운동경력 : {userProfile.career}</div>
      <div> 일주일 운동 횟 수 :{userProfile.perweeks}</div>
      <div> 해결하고 싶은 고민 :{userProfile.purpose}</div>
      <div> 나이 :{userProfile.age}</div>
      <div> 몸무게 : {userProfile.weight}</div>

      <button onClick={onChange}>change</button>
      <button onClick={onRead}>Read</button>
    </>
  );
};

export default Profile;
