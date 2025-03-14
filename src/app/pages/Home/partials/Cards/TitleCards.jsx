import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TitleCards.scss";
import { sMovie } from "../../../../store/Store";
import coming from "../../../../../mock/comming.json"; 
const TitleCards = ({ title }) => {
  const movies = sMovie.use();
  const [movieData, setMovieData] = useState([]);

  const cardsRef = useRef();
  const navigate = useNavigate();
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    // Handle different data sources based on title prop
    if (title === "PHIM SẮP CHIẾU" && coming?.data?.result) {
      // Use the coming.json data for upcoming movies
      const currentDate = new Date();
      const upcomingMovies = coming.data.result
        .filter(movie => {
          const startDate = new Date(movie.startDate);
          return startDate > currentDate;
        })
        .map(movie => ({
          id: movie.id,
          name: movie.name,
          imageLandscape: movie.imageLandscape,
          imagePortrait: movie.imagePortrait,
          startDate: movie.startDate,
        }));
      setMovieData(upcomingMovies);
    } 
    
    else if(title === "PHIM ĐANG CHIẾU" && Object.keys(movies).length > 0) {
      const firstKey = Object.keys(movies)[0]; 
      const cinemas = movies[firstKey]?.cinemas;

      if (cinemas) {
        const allMovies = [];
        const seenMovieIds = new Set(); 

        Object.keys(cinemas).forEach((cinemaId) => {
          const cinema = cinemas[cinemaId];
          if (cinema.movies) {
            Object.keys(cinema.movies).forEach((movieId) => {
              if (!seenMovieIds.has(movieId)) {
                seenMovieIds.add(movieId);
                const movie = cinema.movies[movieId];
                allMovies.push({
                  id: movieId,
                  name: movie.name,
                  imageLandscape: movie.imageLandscape,
                  imagePortrait: movie.imagePortrait,
                });
              }
            });
          }
        });

        setMovieData(allMovies);
      }
    }
    else if (movies && Object.keys(movies).length > 0) {
      const firstKey = Object.keys(movies)[0]; 
      const cinemas = movies[firstKey]?.cinemas;

      if (cinemas) {
        const allMovies = [];
        const seenMovieIds = new Set(); 

        Object.keys(cinemas).forEach((cinemaId) => {
          const cinema = cinemas[cinemaId];
          if (cinema.movies) {
            Object.keys(cinema.movies).forEach((movieId) => {
              if (!seenMovieIds.has(movieId)) {
                seenMovieIds.add(movieId);
                const movie = cinema.movies[movieId];
                allMovies.push({
                  id: movieId,
                  name: movie.name,
                  imageLandscape: movie.imageLandscape,
                  imagePortrait: movie.imagePortrait,
                });
              }
            });
          }
        });

        setMovieData(allMovies);
      }
    }
  }, [movies, title]);

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
          {movieData.map((movie, index) => (
            <div
              className="card"
              key={`${movie.id}-${index}`}
              onClick={() =>
                navigate(`/movie/${movie.name}`, { state: { movie } })
              }
            >
              <img src={movie.imagePortrait} alt={movie.name} />
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