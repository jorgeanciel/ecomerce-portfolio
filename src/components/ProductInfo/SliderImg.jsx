import React, { useState } from 'react';
import './styles/sliderImg.css';

const SliderImg = ({ listImgs }) => {
  const [indexImg, setIndexImg] = useState(0);

  const styleContainer = {
    transform: `translateX(calc(100% * -${indexImg}/3))`,
  };

  const handleBack = () => {

    if (indexImg - 1 < 0) {
      setIndexImg(2);
    } else {
      setIndexImg(indexImg - 1);
    }
  };

  const handleNext = () => {

    if (indexImg + 1 > 2) {
      setIndexImg(0);
    } else {
      setIndexImg(indexImg + 1);
    }
  };

  return (
    <div className="slider">
      <button onClick={handleBack} className="slider__back">
        <i className="fa-solid fa-chevron-left "></i>
      </button>
      <div style={styleContainer} className="slider-container">
        {listImgs?.map((url) => (
          <div className="slider__img-container" key={url.url}>
            <img className="slider__img" src={url.url} alt="product-img" />
          </div>
        ))}
      </div>
      <button onClick={handleNext} className="slider__next">
        <i className="fa-solid fa-chevron-right "></i>
      </button>
      <ul className="slider__ul">
        {listImgs?.map((url, index) => (
          <li
            className={`slider-img-container-child ${index === indexImg && 'slider__border'
              }`}
            onClick={() => setIndexImg(index)}
            key={url.id}
          >
            <img className="slider-img-child" src={url.url} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SliderImg;
