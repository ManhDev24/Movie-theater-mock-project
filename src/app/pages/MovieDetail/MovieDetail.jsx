import React from "react";
import "./MovieDetail.scss";
const MovieDetail = () => {
  return (
    <div>
      <div className="BannerMovie">
        <div className="popular-movie-slider">
          <img
            src="https://imageio.forbes.com/blogs-images/scottmendelson/files/2014/10/2v00kg8.jpg?format=jpg&width=1200"
            className="poster"
          />
          <div className="popular-movie-slider-content">
            <p className="release">2017</p>
            <h2 className="movie-name">Interstellar</h2>
            <ul className="category">
              <p>Science fiction</p>
              <li>drama</li>
              <li>action</li>
            </ul>
            <p className="desc">
              Interstellar is a 2014 epic science fiction film co-written,
              directed, and produced by Christopher Nolan. It stars Matthew
              McConaughey, Anne Hathaway, Jessica Chastain, Bill Irwin, Ellen
              Burstyn, Matt Damon, and Michael Caine. Set in a dystopian future
              where humanity is embroiled in a catastrophic blight and famine,
              the film follows a group of astronauts who travel through a
              wormhole near Saturn in search of a new home for humankind.
            </p>
            <div className="movie-info">
              <i className="fa fa-clock-o">
                <span>164 min.</span>
              </i>
              <i className="fa fa-volume-up">
                <span>Subtitles</span>
              </i>
              <i className="fa fa-circle">
                <span>
                  Imdb: <b>9.1/10</b>
                </span>
              </i>
            </div>
            <div className="movie-btns">
              <button>
                <i className="fa fa-play" /> Booking ticket
              </button>
              <button className="read-more">
                <i className="fa fa-circle" /> <i className="fa fa-circle" />
                <i className="fa fa-circle" />
                Read more
              </button>
            </div>
          </div>
        </div>
      </div>
      <section>
        <div className="movie-ticket-book">
          <div className="choose-date">
            <p className="heading">choose date:</p>
            <div className="wrapper">
              <div className="carousel owl-carousel">
                <div className="card card-1">
                  <p>JUN 1t</p>
                  <p>MON</p>
                </div>
                <div className="card card-2">
                  <p>JUN 2nd</p>
                  <p>TUE</p>
                </div>
                <div className="card card-3">
                  <p>JUN 3nd</p>
                  <p>wed</p>
                </div>
                <div className="card card-4">
                  <p>JUN 4nd</p>
                  <p>thu</p>
                </div>
              </div>
              <div className="marker" />
            </div>
          </div>
          <div className="choose-time">
            <p className="heading">avalible times:</p>
            <div className="wrapper">
              <div className="carousel owl-carousel">
                <div className="card card-1">
                  <p>3D</p>
                  <p>14:45</p>
                </div>
                <div className="card card-2">
                  <p>3D</p>
                  <p>11:45</p>
                </div>
                <div className="card card-3">
                  <p>2D</p>
                  <p>12:15</p>
                </div>
                <div className="card card-4">
                  <p>3D</p>
                  <p>13:00</p>
                </div>
              </div>
              <div className="marker" />
            </div>
          </div>
          <button>Buy ticket</button>
        </div>
      </section>
    </div>
  );
};

export default MovieDetail;
