import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoutineCreatePeriod = props => {
  const navigate = useNavigate();

  const period3 = () => {
    const copy = { ...props.routineData };
    copy.period = '3주';
    props.setRoutineData(copy);
    navigate('/routinecreate/routinecreateperweek');
  };

  const period4 = () => {
    const copy = { ...props.routineData };
    copy.period = '4주';
    props.setRoutineData(copy);
    navigate('/routinecreate/routinecreateperweek');
  };
  const period5 = () => {
    const copy = { ...props.routineData };
    copy.period = '5주';
    props.setRoutineData(copy);
    navigate('/routinecreate/routinecreateperweek');
  };
  const period6 = () => {
    const copy = { ...props.routineData };
    copy.period = '6주';
    props.setRoutineData(copy);
    navigate('/routinecreate/routinecreateperweek');
  };
  const period7 = () => {
    const copy = { ...props.routineData };
    copy.period = '7주';
    props.setRoutineData(copy);
    navigate('/routinecreate/routinecreateperweek');
  };
  const period8 = () => {
    const copy = { ...props.routineData };
    copy.period = '8주';
    props.setRoutineData(copy);
    navigate('/routinecreate/routinecreateperweek');
  };

  return (
    <>
      <div>운동 기간을 선택해주세요.</div>
      {[period3, period4, period5, period6, period7, period8].map((a, i) => {
        return <button onClick={a}>{i + 3}</button>;
      })}
    </>
  );
};

export default RoutineCreatePeriod;
