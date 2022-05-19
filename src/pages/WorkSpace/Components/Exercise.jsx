import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../fbbase';
import Header from '../layout/header';
import Modal from 'react-modal';
import './exercise.scss';
import fullworkoutdatatype1 from './WorkoutRoutine/fullworkoutdatatype1';
import fullworkoutdatatype2 from './WorkoutRoutine/fullworkoutdatatype2';

// 모달 스타일
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Exercise = () => {
  const auth = getAuth();
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [routine, setRoutine] = useState('');
  const [day, setDay] = useState();
  const [maxDay, setMaxDay] = useState('');
  const [time, setTime] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [running, setRunning] = useState(false);
  const [theDayRoutine, setTheDayRoutine] = useState([]);
  const [checkedInputs, setCheckedInputs] = useState([]);
  const [todayWorkPass, setTodayWorkPass] = useState();

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
            for (let i = 0; i < 10; i++) {
              if (userWorkPassSnap.data()[i] == true) {
                console.log(userWorkPassSnap.data()[i]);
                setDay(i + 2);
              }
            }
          }
        }
        fetchData();
      }
    });
  }, []);

  // setDay 설정
  // const checkworkpass = async () => {
  //   const userWorkPassRef = doc(db, 'userWorkPass', uid);
  //   const userWorkPassSnap = await getDoc(userWorkPassRef);

  //   if (userWorkPassSnap.exists()) {
  //     console.log(userWorkPassSnap.data()[0]);
  //     // for (let i =1; i<10; i++){
  //     if ((userWorkPassSnap.data()[0] = true)) {
  //       setDay(0 + 2);
  //     }
  //     // }
  //   }
  // };

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

  // 루틴관리
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

  // 시작버튼
  const togglestart = () => {
    setIsStart(isStart => !isStart);
    if (isStart) {
      setRunning(false);
      console.log('end');
    } else {
      setRunning(true);
      console.log('startt');
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

  // 체크박스 상태관리
  const changeHandler = (checked, id) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, id]);
    } else {
      setCheckedInputs(checkedInputs.filter(el => el !== id));
    }
  };

  // 모달
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
  function closeModal() {
    setIsOpen(false);
  }

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
        {isStart ? (
          <div onClick={openModal}>운동 그만하기</div>
        ) : (
          <div>운동 시작하기</div>
        )}
      </button>

      <div className="stopwatch">
        <div className="numbers">
          <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
          <span>{('0' + ((time / 10) % 100)).slice(-2)}</span>
        </div>
      </div>

      {theDayRoutine.map(function (a) {
        return (
          <section>
            <header>
              <div>5세트</div>
              <div>{a.name}</div>
            </header>

            <main>
              <div>{a.weight}</div>
              <div>10회</div>
              <input
                id={a.name}
                type="checkbox"
                onChange={e => {
                  changeHandler(e.currentTarget.checked, a.name);
                }}
                checked={checkedInputs.includes(a.name) ? true : false}
              />
            </main>
          </section>
        );
      })}

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={_subtitle => (subtitle = _subtitle)}>
          운동을 종료하실 건가요?
        </h2>
        {/* <button onClick={1.데이1페이지 운동 완료 페이지로 전환하기}>종료하기</button> */}
        <button onClick={closeModal}>계속하기</button>
      </Modal>
    </>
  );
};

export default Exercise;
