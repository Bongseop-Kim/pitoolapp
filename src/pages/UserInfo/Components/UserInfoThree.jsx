import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { db } from '../../../fbbase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const UserInfoThree = props => {
  const [nickName, setNickName] = useState('');
  const userRef = collection(db, 'userInfo');
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  const changeAge = e => {
    e.preventDefault();
    const copy = { ...props.userData };
    copy.age = e.target.value;
    props.setUserData(copy);
  };
  const changeHeight = e => {
    e.preventDefault();
    const copy = { ...props.userData };
    copy.height = e.target.value;
    props.setUserData(copy);
  };
  const changeWeight = e => {
    e.preventDefault();
    const copy = { ...props.userData };
    copy.weight = e.target.value;
    props.setUserData(copy);
  };

  const onSubmitUserData = async e => {
    e.preventDefault();
    console.log('onSubmitUserData');
    await setDoc(doc(userRef, user.uid), props.userData);
    navigate('/workspace');
    // console.log(props.userData);
  };

  return (
    <>
      <div>적절한 운동 추천과 강도 계산에 필요해요!</div>
      <div>신체 정보를 알려주세요.</div>

      <form onSubmit={onSubmitUserData}>
        <div>나이</div>
        <input onChange={changeAge}></input>
        <div>키</div>
        <input onChange={changeHeight}></input>
        <div>몸무게</div>
        <input onChange={changeWeight}></input>
        <button>확인</button>
      </form>
    </>
  );
};

export default UserInfoThree;
