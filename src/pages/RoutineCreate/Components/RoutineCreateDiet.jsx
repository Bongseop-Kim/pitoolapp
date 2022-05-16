import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoutineCreateDiet = props => {
  const navigate = useNavigate();

  const purposekg = e => {
    e.preventDefault();
    const copy = { ...props.routineData };
    copy.targetweight = e.target.value;
    props.setRoutineData(copy);
  };

  const kgsubmit = e => {
    e.preventDefault();
    const copy = { ...props.routineData };
    copy.strength = 'upper';
    props.setRoutineData(copy);
    navigate('/routinecreate/routinecreateperiod');
  };

  return (
    <>
      <div>목표 감소량을 적어주세요.</div>
      <form onSubmit={kgsubmit}>
        <input type="numbr" onChange={purposekg} />
        Kg
        <button>확인</button>
      </form>
    </>
  );
};

export default RoutineCreateDiet;
