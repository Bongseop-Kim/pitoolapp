import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../fbbase';
import Header from '../layout/header';
import './exercise.scss';
import fullworkoutdatatype1 from './workoutroutinedata/fullworkoutdatatype1';
import fullworkoutdatatype2 from './workoutroutinedata/fullworkoutdatatype2';
import WorkPassNo from './WorkPass/WorkPassNo';
import WorkPassYes from './WorkPass/WorkPassYes';

const Exercise = () => {
  const auth = getAuth();
  const [routine, setRoutine] = useState('');
  const [day, setDay] = useState();
  const [maxDay, setMaxDay] = useState('');
  const [theDayRoutine, setTheDayRoutine] = useState([]);
  const [workPass, setWorkPass] = useState({});
  const [exerciseAndWeightOfTheDay, setExerciseAndWeightOfTheDay] = useState([
    0,
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        const uid = user.uid;
        const userRoutineRef = doc(db, 'userRoutine', uid);
        const booleanTotalRoutineRef = doc(db, 'booleanTotalRoutine', uid);
        const exerciseAndWeightOfTheDayRef = doc(
          db,
          'exerciseAndWeightOfTheDay',
          uid,
        );

        async function fetchData() {
          const userRoutineSnap = await getDoc(userRoutineRef);
          const booleanTotalRoutineSnap = await getDoc(booleanTotalRoutineRef);
          const exerciseAndWeightOfTheDaySnap = await getDoc(
            exerciseAndWeightOfTheDayRef,
          );
          if (userRoutineSnap.exists()) {
            setRoutine(userRoutineSnap.data().perweek);
            if (userRoutineSnap.data().perweek == 2) {
              setTheDayRoutine(fullworkoutdatatype1);
            }
            setMaxDay(
              userRoutineSnap.data().period * userRoutineSnap.data().perweek,
            );
          }
          if (booleanTotalRoutineSnap.exists()) {
            const maxdaycopy =
              userRoutineSnap.data().perweek * userRoutineSnap.data().period;
            setWorkPass(booleanTotalRoutineSnap.data());
            for (let i = 0; i < maxdaycopy; i++) {
              if (booleanTotalRoutineSnap.data()[i] == true) {
                setDay(i + 2);
              }
            }
            // workpass??? ???????????? false ??? ???
            if (booleanTotalRoutineSnap.data()[0] == false) {
              setDay(1);
            }
            // workpass??? ???????????? true ??? ???
            if (booleanTotalRoutineSnap.data()[maxdaycopy - 1]) {
              console.log('trueasdfdgsdfg');
              setDay(maxdaycopy);
            }
          }
          if (exerciseAndWeightOfTheDaySnap.exists()) {
            setExerciseAndWeightOfTheDay(exerciseAndWeightOfTheDaySnap.data());
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

  // ???????????? ??????????????? ????????? day ?????? ????????? ?????? ??????
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
        <div>3??? ?????? ?????? ??????</div>
      </section>

      <div>
        <button onClick={dayMinus}>&lt;</button> Day {day}/{maxDay}
        <button onClick={dayPlus}>&gt;</button>
      </div>

      {workPass[day - 1] == true ? (
        <WorkPassYes
          day={day}
          exerciseAndWeightOfTheDay={exerciseAndWeightOfTheDay}
        />
      ) : (
        <WorkPassNo theDayRoutine={theDayRoutine} day={day} />
      )}
    </>
  );
};

export default Exercise;
