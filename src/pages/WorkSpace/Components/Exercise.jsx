import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../fbbase';
import Header from '../layout/header';
import './exercise.scss';

const Exercise = () => {
  const auth = getAuth();
  const [routine, setRoutine] = useState('');
  const [day, setDay] = useState(1);

  useEffect(() => {
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;
      console.log('currentuserOK');
      const docRef = doc(db, 'userRoutine', uid);

      async function fetchData() {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log('Document data:', docSnap.data().perweek);
          setRoutine(docSnap.data().perweek);
        } else {
          console.log('No such document!');
        }
      }
      fetchData();
    }
  }, []);

  const dayMinus = () => {
    setDay(day - 1);
  };
  const dayPlus = () => {
    setDay(day + 1);
  };

  return (
    <>
      <Header />
      <section>
        <div>3주 단기 체중 감소</div>
      </section>

      <div>
        <button onClick={dayMinus}>&lt;</button> Day {day}/42{' '}
        <button onClick={dayPlus}>&gt;</button>
      </div>
      <button className="exStart">운동시작하기</button>
      <FullWorkOut />
    </>
  );

  function FullWorkOut() {
    const [checkedInputs, setCheckedInputs] = useState([]);
    const 스쿼트 = {
      name: '스쿼트',
      weight: '100',
    };
    const 벤치프레스 = {
      name: '벤치프레스',
      weight: '80',
    };
    const 시티드로우 = {
      name: '시티드로우',
      weight: '60',
    };
    const 트라이셉스프레스다운 = {
      name: '트라이셉스프레스다운',
      weight: '20',
    };
    const 카프레이즈 = {
      name: '카프레이즈',
      weight: '맨몸',
    };
    const [fullWorkOutData, setFullWorkOutData] = useState([
      스쿼트,
      벤치프레스,
      시티드로우,
      트라이셉스프레스다운,
      카프레이즈,
    ]);
    const checkbox = 'checkbox';

    const changeHandler = (checked, id) => {
      if (checked) {
        setCheckedInputs([...checkedInputs, id]);
      } else {
        // 체크 해제
        setCheckedInputs(checkedInputs.filter(el => el !== id));
      }
    };

    return (
      <>
        {fullWorkOutData.map(function (a) {
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
      </>
    );
  }
};

export default Exercise;
