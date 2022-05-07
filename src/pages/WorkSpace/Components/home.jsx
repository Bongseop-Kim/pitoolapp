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
      <Link to="/workspace/search">프로그램 선택하기</Link>
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

      <div className="tiptitle">오늘의 TIP</div>
      <div className="tipContainer">블라블라</div>
    </>
  );
};

export default Home;
