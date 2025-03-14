import React from "react";
import { Link } from "react-router-dom";

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
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
        <ul>
          <ul>
            <li>
              <Link to="/">PHIM</Link>
            </li>
            <li>
              <Link to="*">RẠP CHIẾU PHIM</Link>
            </li>
            <li>
              <Link to="/khuyen-mai">KHUYẾN MÃI</Link>
            </li>
            <li>
              <Link to="/lien-he">LIÊN HỆ</Link>
            </li>
          </ul>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} alt="" className="icons" />
        <p>USER</p>
        <img src={bell_icon} alt="" className="icons" />
        <div className="navbar-profile">
          <img src={profile_img} alt="" className="profile" />
          <img src={caret_icon} alt="" />
          <div className="dropdown">Sign Out Of FTheater</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
