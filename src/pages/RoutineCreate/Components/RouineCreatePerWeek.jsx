import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { db } from '../../../fbbase';
import { collection, doc, setDoc } from 'firebase/firestore';

const RoutineCreatePerWeek = props => {
  const navigate = useNavigate();
  const userRef = collection(db, 'userRoutine');
  const auth = getAuth();
  const user = auth.currentUser;

  const routinesubmit = async e => {
    e.preventDefault();
    await setDoc(doc(userRef, user.uid), props.routineData);
    navigate('/workspace/exercise');
  };

  const twotimes = () => {
    const copy = { ...props.routineData };
    copy.perweek = 2;
    props.setRoutineData(copy);
  };
  const fourtimes = () => {
    const copy = { ...props.routineData };
    copy.perweek = 4;
    props.setRoutineData(copy);
  };
  const sixtimes = () => {
    const copy = { ...props.routineData };
    copy.perweek = 6;
    props.setRoutineData(copy);
  };

  return (
    <>
      <div>일주일에 몇 번 운동하시나요?</div>
      <form onSubmit={routinesubmit}>
        <button onClick={twotimes}>주 2회 무분할</button>
        <button onClick={fourtimes}>주 4회 2분할</button>
        <button onClick={sixtimes}>주 6회 3분할</button>
      </form>
    </>
  );
};

export default RoutineCreatePerWeek;
