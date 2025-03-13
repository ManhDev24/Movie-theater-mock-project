import React, { use } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Tabs, Card, Typography } from "antd";
const { Title, Text } = Typography;

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
  const movieData = data[0];
  console.log("movieData: ", movieData);
  return (
    <div>
      <div
        style={{ backgroundImage: `url(${data[0]?.bposter})` }}
        className="BannerMovie"
      >
        <div className="popular-movie-slider mt-5 ">
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
      {/* <section>
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
      </section> */}
      <section className="m-10 flex justify-center">
        <Tabs
          defaultActiveKey="0"
          tabPosition="left"
          className="w-full max-w-5xl mx-auto bg-white rounded-lg shadow-md p-4 flex"
        >
          {movieData.cgv_locations.map((cinema, index) => (
            <Tabs.TabPane
              key={index}
              tab={
                <span className="px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-200 block">
                  {cinema.name}
                </span>
              }
            >
              {/* Căn giữa thông tin rạp */}
              <div className="text-center">
                <Title level={4} className="m-0 text-blue-600">
                  {cinema.name}
                </Title>
                <Text type="secondary" className="block text-gray-500">
                  {cinema.address}
                </Text>
              </div>

              <div className="mt-6 mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
                {cinema.showtime.map((show, idx) => (
                  <Card
                    key={idx}
                    className="border p-4 rounded-lg hover:shadow-lg transition-all duration-300 "
                  >
                    <Title level={5} className="m-0 text-gray-800">
                      {show.time}
                    </Title>
                    <Text className="text-gray-600">
                      Ngày: {show.date} - Ghế trống: {show.seats_available}/
                      {show.total_seats}
                    </Text>
                  </Card>
                ))}
              </div>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </section>
    </div>
  );
};

export default MovieDetail;
