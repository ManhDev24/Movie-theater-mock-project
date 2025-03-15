import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./Banner.scss";
import Header from "../../../../layouts/Header";
import coming from "../../../../../mock//comming.json";
import info_icon from "../../../../assets/img/info_icon.png";
import TitleCards from "../Cards";

const Banner = () => {
  const moreCardsRef = useRef(null);
  console.log(coming.data.result);
  const scrollToMoreCards = () => {
    if (moreCardsRef.current) {
      moreCardsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };



  return (
    <div className="home">
      <Header />
      <div className="banner">
        <img
          src={coming.data.result[0].imageLandscape}
          className="banner-img"
        />
        <div className="banner-caption">
          <h1>{coming.data.result[0].name}</h1>
          <div className="banner-btns">
            <Link to="/dat-ve" className="btn">
              ĐẶT VÉ NGAY
            </Link>
            <button className="btn dark-btn" onClick={scrollToMoreCards}>
              <img src={info_icon} alt="" />
              Xem Thêm
            </button>
          </div>
          <TitleCards />
        </div>
      </div>
      <div className="more-cards" ref={moreCardsRef}>
        <TitleCards title={"PHIM SẮP CHIẾU"}/>
        <TitleCards title={"PHIM ĐANG CHIẾU"} />
      </div>
    </div>
  );
};

export default Banner;