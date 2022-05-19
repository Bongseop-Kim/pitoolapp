import React, { useEffect, useState } from 'react';
import fullworkoutdatatype1 from './fullworkoutdatatype1';

function FullWorkOut(props) {
  const [checkedInputs, setCheckedInputs] = useState([]);

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
    </>
  );
}

export default FullWorkOut;
