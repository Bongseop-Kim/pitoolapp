import { authService } from 'fbbase';
import React from 'react';
import './search.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Search = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <>
      <h2>루틴 고민은 이제 그만!</h2>
      <p>
        운동 목적, 고민, 나의 상황에 맞게 나에게 더욱 맞춰진 운동 루틴을 추천
        받으세요!
      </p>
      <button>루틴 추천 받기</button>

      <div>추천 프로그램</div>
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
    </>
  );
};

export default Search;
