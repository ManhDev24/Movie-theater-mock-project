import React, { use } from "react";
import { Carousel } from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";

import "./MovieDetail.scss";
const contentStyle = {
  textAlign: "center",
  color: "white",
};
import data from "../../../mock/homepage/homepage.json";
import { convertDates, getTimes } from "./usecases/MovieDetail";
const MovieDetail = () => {
  const { name } = useParams();
  const dates = convertDates(data);
  const times = getTimes(data);
  console.log("times: ", times);

  return (
    <div>
      <div
        style={{ backgroundImage: `url(${data[0]?.bposter})` }}
        className="BannerMovie"
      >
        <div className="popular-movie-slider">
          <img src={data[0]?.sposter} className="poster" />
          <div className="popular-movie-slider-content">
            <p className="release">{data[0]?.date}</p>
            <h2 className="movie-name">{data[0]?.name}</h2>
            <ul className="category">
              <p>{data[0]?.genre}</p>
            </ul>
            <p className="desc">{data[0]?.description}</p>
            <div className="movie-info">
              <i className="fa fa-clock-o">
                <span>164 min.</span>
              </i>
              <i className="fa fa-volume-up">
                <span>Subtitles</span>
              </i>
              <i className="fa fa-circle">
                <span>
                  Rate: <b>{data[0]?.rate}</b>
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
              <Carousel style={contentStyle} dots={false} arrows>
                {dates.map((dateString, index) => {
                  const date = moment(dateString, "dddd, DD/MM/YYYY");
                  return (
                    <div key={index} className="card">
                      <p className="text-gray-500">{date.format("MMM Do")}</p>
                      <p className="text-2xl">
                        {date.format("ddd").toUpperCase()}
                      </p>
                    </div>
                  );
                })}
              </Carousel>
              <div className="marker" />
            </div>
          </div>
          <div className="choose-time">
            <p className="heading">available times:</p>
            <div className="wrapper">
              {/* <div className="carousel owl-carousel">
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
              </div> */}
              <Carousel style={contentStyle} dots={false} arrows>
                {dates.map((time, index) => (
                  <div key={index} className="card">
                    <p className="text-gray-500">3D</p>
                    <p className="text-2xl">{time}</p>
                  </div>
                ))}
              </Carousel>
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
