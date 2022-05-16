import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoutineCreatePurpose = props => {
  const navigate = useNavigate();

  const muscle = () => {
    const copy = { ...props.routineData };
    copy.purpose = 'muscle';
    props.setRoutineData(copy);
    navigate('/routinecreate/routinecreatemuscle');
  };

  const diet = () => {
    const copy = { ...props.routineData };
    copy.purpose = 'diet';
    props.setRoutineData(copy);
    navigate('/routinecreate/routinecreatediet');
  };

  return (
    <>
      <div>운동 목적을 선택해주세요.</div>
      <button onClick={muscle}>근비대</button>
      <button onClick={diet}>다이어트</button>
    </>
  );
};

export default RoutineCreatePurpose;
