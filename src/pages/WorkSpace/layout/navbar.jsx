import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.scss';

const Navbar = () => {
  return (
    <section className="navconcontainer">
      <Link to={'/workspace'}>
        <div className="dumbel"></div>
        <div>운동</div>
      </Link>
      <Link to={'/workspace/search'}>
        <div className="search"></div>
        <div>검색</div>
      </Link>
      <div>
        <div className="trophy"></div>
        <div>랭킹</div>
      </div>
      <Link to={'/workspace/profile'}>
        <div className="user"></div>
        <div>유저</div>
      </Link>
    </section>
  );
};

export default Navbar;
