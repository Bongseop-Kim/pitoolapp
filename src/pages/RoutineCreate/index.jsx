import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import RoutineCreatePurpose from './Components/RoutineCreatePurpose';
import RoutineCreateMuscle from './Components/RoutineCreateMuscle.jsx';
import RoutineCreatePeriod from './Components/RoutineCreatePeriod';
import RoutineCreatePerWeek from './Components/RouineCreatePerWeek';
import RoutineCreateDiet from './Components/RoutineCreateDiet';

const RoutineCreate = () => {
  const [routineData, setRoutineData] = useState({
    purpose: '',
    strength: '',
    tagetweight: '',
    period: '',
    perweek: '',
  });

  console.log(routineData);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <RoutineCreatePurpose
            setRoutineData={setRoutineData}
            routineData={routineData}
          />
        }
      />
      <Route
        path="routinecreatemuscle"
        element={
          <RoutineCreateMuscle
            setRoutineData={setRoutineData}
            routineData={routineData}
          />
        }
      />
      <Route
        path="routinecreatediet"
        element={
          <RoutineCreateDiet
            setRoutineData={setRoutineData}
            routineData={routineData}
          />
        }
      />
      <Route
        path="routinecreateperiod"
        element={
          <RoutineCreatePeriod
            setRoutineData={setRoutineData}
            routineData={routineData}
          />
        }
      />
      <Route
        path="routinecreateperweek"
        element={
          <RoutineCreatePerWeek
            setRoutineData={setRoutineData}
            routineData={routineData}
          />
        }
      />
    </Routes>
  );
};

export default RoutineCreate;
