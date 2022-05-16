import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoutineCreateMuscle = props => {
  const navigate = useNavigate();

  const upper = e => {
    e.preventDefault();
    const copy = { ...props.routineData };
    copy.strength = 'upper';
    props.setRoutineData(copy);
    navigate('/routinecreate/routinecreateperiod');
  };

  const middle = e => {
    e.preventDefault();
    const copy = { ...props.routineData };
    copy.strength = 'middle';
    props.setRoutineData(copy);
    navigate('/routinecreate/routinecreateperiod');
  };

  const lower = e => {
    e.preventDefault();
    const copy = { ...props.routineData };
    copy.strength = 'lower';
    props.setRoutineData(copy);
    navigate('/routinecreate/routinecreateperiod');
  };

  return (
    <>
      <div>운동 강도를 선택해주세요.</div>
      <div>무게 조절에 반영됩니다.</div>
      <button onClick={upper}>상</button>
      <button onClick={middle}>중</button>
      <button onClick={lower}>하</button>
    </>
  );
};

export default RoutineCreateMuscle;
