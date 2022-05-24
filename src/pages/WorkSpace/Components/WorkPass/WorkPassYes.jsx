import React from 'react';

const WorkPassYes = props => {
  const current = new Date();
  let lengthOfObject = Object.keys(props.exerciseAndWeightOfTheDay).length;

  const date = `${current.getFullYear()}/${
    current.getMonth() + 1
  }/${current.getDate()}`;

  return (
    <>
      <div>{props.day}번째 운동 완료</div>
      {date}
      <div>{lengthOfObject}개의 운동 완료</div>
      <div>들어올린 무게</div>
      <div>태운 칼로리</div>
      <div>기록갱신</div>
      <div>벤치 프레스</div>
      <div>숄더 프레스</div>
      <div>데드 리프트</div>
    </>
  );
};

export default WorkPassYes;
