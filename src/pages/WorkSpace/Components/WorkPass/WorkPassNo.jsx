import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

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
  const [modalIsOpen, setIsOpen] = React.useState(false);
  let subtitle;

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

      {props.theDayRoutine.map(function (a) {
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

export default WorkPassNo;
