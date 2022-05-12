import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../layout/header';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './home.scss';

const Home = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <>
      <Header />
      <Link to="/workspace/search" className='ch_program'>
        {/* 원에 아이콘이나 이모지 넣으면 좋을 것 같아요 220211 이효민 */}
        <div className='circle'></div>
        프로그램 선택하기
      </Link>
      <div className="cartitle">💪 오늘의 운동</div>
      <Slider {...settings}>
        <div>
          <div className="carosel">1</div>
        </div>
        <div>
          <div className="carosel">2</div>
        </div>
        <div>
          <div className="carosel">3</div>
        </div>
        <div>
          <div className="carosel">4</div>
        </div>
        <div>
          <div className="carosel">5</div>
        </div>
        <div>
          <div className="carosel">6</div>
        </div>
      </Slider>

      <div className="tiptitle">✔ 오늘의 TIP</div>
      <div className="tipContainer">블라블라</div>
    </>
  );
};

export default Home;
