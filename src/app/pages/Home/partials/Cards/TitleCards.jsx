import React, { useEffect, useRef } from "react";
import "./TitleCards.scss";
import data from "../../../../../mock/homepage/homepage.json";

const TitleCards = ({title, category}) => {
  const cardsRef = useRef();

  const handleWheel = (event) => {
    event.preventDefault();
      cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    const cardList = cardsRef.current;
    if (cardList) {
      cardList.addEventListener("wheel", handleWheel);
    //   return () => cardList.removeEventListener("wheel", handleWheel);
    }
  }, []);

  return (
    <div className="title-cards">
      <h2>{title?title:"PHIM ĐANG CHIẾU"}</h2>
      <div className="card-list" ref={cardsRef}>
        {data.map((card, index) => (
          <div className="card" key={index}>
            <img src={card.sposter} alt={card.name} />
            <p>{card.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
