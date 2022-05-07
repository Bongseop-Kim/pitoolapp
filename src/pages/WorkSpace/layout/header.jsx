import React, { useState } from 'react';
import './header.scss';

const Header = () => {
  const [kg, setKg] = useState(70);

  return (
    <>
      <div className="headercontainer">
        오늘 {kg}kg, {kg}kcal
      </div>
    </>
  );
};

export default Header;
