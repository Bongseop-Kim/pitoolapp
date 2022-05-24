import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../../../fbbase';

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

const WorkPassNo = props => {
  const [checkedInputs, setCheckedInputs] = useState([]);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  let subtitle;
  const current = new Date();

  const year = current.getFullYear();
  const month = current.getMonth() + 1;
  const date = current.getDate();

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
  // 모달창 닫기 (운동 계속하기)
  const continueModal = () => {
    setIsOpen(false);
  };
  // 모달창 닫기 (운동 종료하기)
  const saveModal = async () => {
    const booleanTotalRoutineRef = doc(db, 'booleanTotalRoutine', user.uid);
    const booleanTotalRoutineRefSnap = await getDoc(booleanTotalRoutineRef);
    const copy = booleanTotalRoutineRefSnap.data();
    copy[props.day - 1] = true;
    console.log(checkedInputs);
    await setDoc(doc(db, 'booleanTotalRoutine', user.uid), copy);
    await setDoc(doc(db, 'exerciseAndWeightOfTheDay', user.uid), {
      ...checkedInputs,
    });
    window.location.reload();
    // 삼항 조건식 으로 PassYes or PassNo 변경, 값이 실시간으로 변경 X, 강제로 리로드
  };

  // 시작하기버튼
  const togglestart = () => {
    setIsStart(isStart => !isStart);
    if (isStart) {
      setRunning(false);
      console.log('end');
    } else {
      setRunning(true);
      console.log('start');
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

      {props.theDayRoutine.map((a, i) => (
        <section key={i}>
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
                changeHandler(e.currentTarget.checked, a);
              }}
              checked={checkedInputs.includes(a) ? true : false}
            />
          </main>
        </section>
      ))}

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={continueModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={_subtitle => (subtitle = _subtitle)}>
          운동을 종료하실 건가요?
        </h2>
        {/* <button onClick={1.데이1페이지 운동 완료 페이지로 전환하기}>종료하기</button> */}
        <button onClick={continueModal}>계속하기</button>
        <button onClick={saveModal}>저장하기</button>
      </Modal>
    </>
  );
};

export default WorkPassNo;
