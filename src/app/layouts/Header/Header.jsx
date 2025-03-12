import React from "react";
import "./Header.scss";
import logo from "../../assets/img/logo-theater.png";
import search_icon from "../../assets/img/search_icon.svg";
import bell_icon from "../../assets/img/bell_icon.svg";
import profile_img from "../../assets/img/profile_img.png";
import caret_icon from "../../assets/img/caret_icon.svg";
const Header = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="" />
        <ul>
          <li>TRANG CHỦ</li>
          <li>PHIM</li>
          <li>RẠP</li>
          <li>LIÊN HỆ</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} alt="" className="icons" />
        <p>USER</p>
        <img src={bell_icon} alt="" className="icons" />
        <div className="navbar-profile">
          <img src={profile_img} alt="" className="profile" />
          <img src={caret_icon} alt=""  />
          <div className="dropdown">
            Sign Out Of FTheater
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
