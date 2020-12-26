import React from "react";
import logo from "../../Images/hero-title.png";
import image from "../../Images/hero-image.png";

function Hero() {
  return (
    <div className="space-between">
      <div className="container-hero-text">
        <div className="hero-padding">
          <img src={logo} alt="logo-hero" className="logo-hero" />
          <h2 className="text-title-black">BEST QUALITY COFFEE BEANS</h2>
          <p className="text-desc-black mt-26 mr-15">
            Quality freshly roasted coffee made just for you. Pour, brew and
            enjoy
          </p>
        </div>
      </div>
      <div>
        <div className='wave-hero'></div>
        <img src={image} className="hero-image mt-28" />
      </div>
    </div>
  );
}

export default Hero;
