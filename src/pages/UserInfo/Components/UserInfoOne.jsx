import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { db } from '../../../fbbase';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const UserInfoOne = () => {
  const [nickName, setNickName] = useState('');
  const userRef = collection(db, 'userInfo');
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  const changeNickName = e => {
    console.log('change');
    setNickName(e.target.value);
    console.log(nickName);
  };

  const onSubmitUserNickName = async e => {
    e.preventDefault();
    console.log('onSubmitUserNickName');
    await setDoc(doc(userRef, user.uid), { nickname: nickName });
    navigate('/userinfo/two');
  };

  return (
    <>
      <div>반갑습니다.</div>
      <div>저희가 어떻게 불러 드리면 될까요?</div>

      <div>닉네임</div>

      <form onSubmit={onSubmitUserNickName}>
        <input onChange={changeNickName}></input>
        <button>확인</button>
      </form>
    </>
  );
};

export default UserInfoOne;
