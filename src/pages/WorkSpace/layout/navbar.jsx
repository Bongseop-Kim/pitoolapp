import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.scss';

const Navbar = () => {
  return (
    <section className="navconcontainer">
      <Link to={'/workspace'} className='center'>
        <div className="dumbel"></div>
        <div className='nav_text'>운동</div>
      </Link>
      <Link to={'/workspace/search'} className='center'>
        <div className="search"></div>
        <div className='nav_text'>검색</div>
      </Link>
      <div className='center'>
        <div className="trophy"></div>
        <div className='nav_text'>랭킹</div>
      </div>
      <Link to={'/workspace/profile'} className='center'>
        <div className="user"></div>
        <div className='nav_text'>유저</div>
      </Link>
    </section>
  );
};

export default Navbar;
