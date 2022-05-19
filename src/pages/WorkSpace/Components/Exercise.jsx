import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../fbbase';
import Header from '../layout/header';
import './exercise.scss';
import FullWorkOut from './WorkoutRoutine/FullWorkOut';
import fullworkoutdatatype1 from './WorkoutRoutine/fullworkoutdatatype1';
import fullworkoutdatatype2 from './WorkoutRoutine/fullworkoutdatatype2';

const Exercise = () => {
  const auth = getAuth();
  const [routine, setRoutine] = useState('');
  const [day, setDay] = useState(1);
  const [maxDay, setMaxDay] = useState('');
  const [time, setTime] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [running, setRunning] = useState(false);
  const [theDayRoutine, setTheDayRoutine] = useState(fullworkoutdatatype1);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        const userRoutineRef = doc(db, 'userRoutine', uid);

        async function fetchData() {
          const docSnap = await getDoc(userRoutineRef);
          if (docSnap.exists()) {
            console.log('Document data:', docSnap.data());
            setRoutine(docSnap.data().perweek);
            // 분할에 따른 workoutdata 제공
            setMaxDay(docSnap.data().period * docSnap.data().perweek);
          } else {
            console.log('No such document!');
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

  useEffect(() => {
    if (day % 2) {
      setTheDayRoutine(fullworkoutdatatype1);
    } else {
      setTheDayRoutine(fullworkoutdatatype2);
    }
  });

  const togglestart = () => {
    setIsStart(isStart => !isStart);
    if (isStart) {
      setRunning(false);
    } else {
      setRunning(true);
    }
  };

  // 스톱워치
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

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
      <button className="exStart" onClick={togglestart}>
        {isStart ? '운동 그만하기' : '운동 시작하기'}
      </button>

      <div className="stopwatch">
        <div className="numbers">
          <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
          <span>{('0' + ((time / 10) % 100)).slice(-2)}</span>
        </div>
      </div>

      <FullWorkOut theDayRoutine={theDayRoutine} />
    </>
  );
};

export default Exercise;
