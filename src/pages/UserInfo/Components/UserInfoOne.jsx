import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const UserInfoOne = props => {
  const navigate = useNavigate();

  const changeNickName = e => {
    e.preventDefault();
    const copy = { ...props.userData };
    copy.nickname = e.target.value;
    props.setUserData(copy);
  };

  const onSubmitUserNickName = async e => {
    e.preventDefault();
    navigate('/userinfo/userinfotwo');
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
