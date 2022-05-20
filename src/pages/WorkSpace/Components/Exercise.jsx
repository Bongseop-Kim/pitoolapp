import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../fbbase';
import Header from '../layout/header';
import './exercise.scss';
import fullworkoutdatatype1 from './workoutroutinedata/fullworkoutdatatype1';
import fullworkoutdatatype2 from './workoutroutinedata/fullworkoutdatatype2';
import WorkPassNo from './WorkPass/WorkPassNo';

const Exercise = () => {
  const auth = getAuth();
  const [routine, setRoutine] = useState('');
  const [day, setDay] = useState();
  const [maxDay, setMaxDay] = useState('');
  const [theDayRoutine, setTheDayRoutine] = useState([]);
  const [workPass, setWorkPass] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        const uid = user.uid;
        const userRoutineRef = doc(db, 'userRoutine', uid);
        const userWorkPassRef = doc(db, 'userWorkPass', uid);

        async function fetchData() {
          const userRoutineSnap = await getDoc(userRoutineRef);
          const userWorkPassSnap = await getDoc(userWorkPassRef);
          if (userRoutineSnap.exists()) {
            setRoutine(userRoutineSnap.data().perweek);
            if (userRoutineSnap.data().perweek == 2) {
              setTheDayRoutine(fullworkoutdatatype1);
            }
            setMaxDay(
              userRoutineSnap.data().period * userRoutineSnap.data().perweek,
            );
          }
          if (userWorkPassSnap.exists()) {
            const maxdaycopy =
              userRoutineSnap.data().perweek * userRoutineSnap.data().period;
            setWorkPass(userWorkPassSnap.data());
            for (let i = 0; i < maxdaycopy; i++) {
              if (userWorkPassSnap.data()[i] == true) {
                setDay(i + 2);
              }
            }
            // workpass가 첫번째가 false 일 때
            if (userWorkPassSnap.data()[0] == false) {
              setDay(1);
            }
            // workpass가 마지막이 true 일 때
            if (userWorkPassSnap.data()[maxdaycopy - 1]) {
              console.log('trueasdfdgsdfg');
              setDay(maxdaycopy);
            }
          }
        }
        fetchData();
      }
    });
  }, []);

  const dayMinus = () => {
    if (day > 1) {
      setDay(day - 1);
    }
  };
  const dayPlus = () => {
    if (day < maxDay) {
      setDay(day + 1);
    }
  };

  // 루틴관리 마운트시가 아니라 day 바뀔 때마다 루틴 변경
  useEffect(() => {
    if (routine == 2) {
      if (day % 2) {
        setTheDayRoutine(fullworkoutdatatype1);
      } else {
        setTheDayRoutine(fullworkoutdatatype2);
      }
    } else if (routine == 4) {
    } else if (routine == 6) {
    }
  });

  return (
    <>
      <Header />
      <section>
        <div>3주 단기 체중 감소</div>
      </section>

      <div>
        <button onClick={dayMinus}>&lt;</button> Day {day}/{maxDay}
        <button onClick={dayPlus}>&gt;</button>
      </div>

      {workPass[day - 1] == true ? (
        <div>hi</div>
      ) : (
        <WorkPassNo theDayRoutine={theDayRoutine} />
      )}
    </>
  );
};

export default Exercise;
