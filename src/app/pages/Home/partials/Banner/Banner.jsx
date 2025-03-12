import React from "react";
import "./Banner.scss";
import Header from "../../../../layouts/Header";
import data from "../../../../../mock/homepage/homepage.json";
import info_icon from "../../../../assets/img/info_icon.png";

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
            <button className="btn">MUA VÉ</button>
            <button className="btn dark-btn">
              <img src={info_icon} alt="" />
              Xem Thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
