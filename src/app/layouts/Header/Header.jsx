import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import logo from "../../assets/img/logo-theater.png";
import search_icon from "../../assets/img/search_icon.svg";
import bell_icon from "../../assets/img/bell_icon.svg";
import profile_img from "../../assets/img/profile_img.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (  
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/" onClick={closeMenu}>
          <img src={logo} alt="" />
        </Link>
        <div className="mobile-menu-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={menuOpen ? "active" : ""}>
          <li>
            <Link to="/" onClick={closeMenu}>PHIM</Link>
          </li>
          <li>
            <Link to="/rap-chieu-phim" onClick={closeMenu}>RẠP CHIẾU PHIM</Link>
          </li>
          <li>
            <Link to="/khuyen-mai" onClick={closeMenu}>KHUYẾN MÃI</Link>
          </li>
          <li>
            <Link to="/lien-he" onClick={closeMenu}>LIÊN HỆ</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <Link to="/dat-ve" className="ticket-btn" onClick={closeMenu}>ĐẶT VÉ NGAY</Link>
        <img src={search_icon} alt="" className="icons" />
        <img src={bell_icon} alt="" className="icons" />
        <div className="navbar-profile">
          <img src={profile_img} alt="" className="profile" />
        </div>
      </div>
    </div>
  );
};

export default Header;