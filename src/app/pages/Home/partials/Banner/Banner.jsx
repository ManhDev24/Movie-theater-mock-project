import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Banner.scss";
import Header from "../../../../layouts/Header";
import coming from "../../../../../mock//comming.json";
import info_icon from "../../../../assets/img/info_icon.png";
import TitleCards from "../Cards";

const Banner = () => {
  const moreCardsRef = useRef(null);
  const navigate = useNavigate();
  console.log(coming.data.result);
  const scrollToMoreCards = () => {
    if (moreCardsRef.current) {
      moreCardsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goToMovieDetail = () => {
    navigate(`/movie/${coming[1].id}`);
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
            <button className="btn" onClick={goToMovieDetail}>
              ĐẶT VÉ NGAY
            </button>
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
