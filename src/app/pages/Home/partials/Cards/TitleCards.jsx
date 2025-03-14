import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TitleCards.scss";
import data from "../../../../../mock/homepage/homepage.json";

const TitleCards = ({ title }) => {
  const cardsRef = useRef();
  const navigate = useNavigate();
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scrollRight = () => {
    if (cardsRef.current) {
      cardsRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (cardsRef.current) {
      cardsRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (cardsRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = cardsRef.current;

        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
      }
    };

    const cardList = cardsRef.current;
    if (cardList) {
      cardList.addEventListener("scroll", handleScroll);
      return () => cardList.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : "PHIM ĐANG CHIẾU"}</h2>
      <div className="card-container">
        {showLeftArrow && (
          <button className="scroll-btn left" onClick={scrollLeft}>
            &#9665;
          </button>
        )}
        <div className="card-list" ref={cardsRef}>
          {data.map((card, index) => (
            <div
              className="card"
              key={index}
              onClick={() => navigate(`/movie/${card.name}`, { state: { movie: card } })}
            >
              <img src={card.sposter} alt={card.name} />
              <p>{card.name}</p>
            </div>
          ))}
        </div>
        {showRightArrow && (
          <button className="scroll-btn right" onClick={scrollRight}>
            &#9655;
          </button>
        )}
      </div>
    </div>
  );
};

export default TitleCards;
