import React from "react";
import "./Banner.scss";
import Header from "../../../../layouts/Header";
import data from "../../../../../mock/homepage/homepage.json";
import info_icon from "../../../../assets/img/info_icon.png";
import TitleCards from "../Cards";

const Banner = () => {
  return (
    <div className="home">
      <Header />
      <div className="banner">
        <img src={data[1].bposter} className="banner-img" />
        <div className="banner-caption">
          <h1>{data[1].name}</h1>
          <p>{data[1].description}</p>
          <div className="banner-btns">
            <button className="btn">ĐẶT VÉ NGAY</button>
            <button className="btn dark-btn">
              <img src={info_icon} alt="" />
              Xem Thêm
            </button>
          </div>
          <TitleCards />
        </div>
      </div>
      <div className="more-cards">
        <TitleCards title={"PHIM SẮP CHIẾU"}/>
        <TitleCards title={"PHIM ĐANG CHIẾU"}/>
        <TitleCards title={"SUẤT CHIẾU ĐẶC BIỆT"}/>
      </div>
    </div>
  );
};

export default Banner;
