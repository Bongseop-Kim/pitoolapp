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
      <h2 className='title'>๐คฆโโ๏ธ ๋ฃจํด ๊ณ ๋ฏผ์ ์ด์  ๊ทธ๋ง! ๐คฆโโ๏ธ</h2>
      <p className='text'>
        ์ด๋ ๋ชฉ์ , ๊ณ ๋ฏผ, ๋์ ์ํฉ์ ๋ง๊ฒ<br/>๋์๊ฒ ๋์ฑ ๋ง์ถฐ์ง ์ด๋ ๋ฃจํด์ ์ถ์ฒ
        ๋ฐ์ผ์ธ์!
      </p>
      <button className='routine_btn'>
        ๋ฃจํด ์ถ์ฒ ๋ฐ๊ธฐ
        <span>&gt;</span>
        </button>

      <div className='recommend'>๐ ์ถ์ฒ ํ๋ก๊ทธ๋จ</div>
      <Slider {...settings} className='slider'>
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
