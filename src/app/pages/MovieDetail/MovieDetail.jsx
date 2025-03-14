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
  // const { name } = useParams();
  console.log("data: ", data);
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
      <div className="flex justify-between flex-col items-center h-[120%] ">
        <div className=" flex justify-center w-full ">
          <p className="text-3xl">Lịch chiếu</p>
        </div>
        <div className="w-full flex justify-center">
          <Tabs defaultActiveKey="0">
            {movieData?.screenings?.map((cinema, index) => {
              const dayOfWeek = moment(cinema.date).format("dddd");
              const date = moment(cinema.date).format("DD/MM/YYYY");
              return (
                <Tabs.TabPane
                  key={index}
                  tab={
                    <div className="w-40 h-30 bg-amber-300 flex flex-col justify-center items-center rounded-2xl shadow-md p-4 space-y-2">
                      <p className="text-xl font-bold text-gray-700">
                        {dayOfWeek}
                      </p>
                      <p className="text-lg text-gray-600">{date}</p>
                    </div>
                  }
                >
                  <p className="text-3xl font-bold">Danh sách Rạp</p>
                  <div className="theater">
                    {cinema?.theaters.map((show, id) => (
                      <div className="mt-3 h-full w-full bg-purple-500 rounded-md p-5">
                        <div>
                          <p className="mb-5 text-2xl text-yellow-300">
                            {show.name}
                          </p>
                          <p className="mb-5 text-white text-lg">
                            {" "}
                            {show.address}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2 max-w-[400px] mb-4">
                          {show.showtimes.map((movie) => (
                            <div className="border-1 h-10 w-16 flex justify-center items-center border-white text-white rounded-md cursor-pointer hover:text-yellow-300">
                              {movie.time}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Tabs.TabPane>
              );
            })}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
