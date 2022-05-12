import { getAuth } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../fbbase';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserInfoTwo = props => {
  const navigate = useNavigate();

  const maleFunctino = e => {
    e.preventDefault();
    const copy = { ...props.userData };
    copy.gender = '남자';
    props.setUserData(copy);
    navigate('/userinfo/userinfothree');
  };

  const femaleFunctino = e => {
    e.preventDefault();
    const copy = { ...props.userData };
    copy.gender = '여자';
    props.setUserData(copy);
    navigate('/userinfo/userinfothree');
  };

  return (
    <>
      <div>whats your gender?</div>
      <button onClick={maleFunctino}>maale</button>
      <button onClick={femaleFunctino}>female</button>
    </>
  );
};

export default UserInfoTwo;
