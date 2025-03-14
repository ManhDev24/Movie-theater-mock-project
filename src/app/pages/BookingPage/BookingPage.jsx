import React, { useState, useEffect } from "react";
import { Select, Typography, Card, Tag, Modal, Input } from "antd";
import { sMovie } from "../../store/Store";
import "./BookingPage.scss";

const { Title } = Typography;
const { Search } = Input;

const BookingPage = () => {
  const movie = sMovie.use();
  const data = movie || {};

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredShowtimes, setFilteredShowtimes] = useState([]);
  console.log("filteredShowtimes: ", filteredShowtimes);
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  const mappedCities = Object.values(data).map((city) => ({
    value: city.citySlug,
    label: city.cityName,
  }));

  const findCityBySlug = (slug) =>
    slug && Object.values(data).find((city) => city.citySlug === slug);

  const handleCityChange = (value) => {
    setSelectedCity(value);
    setSelectedCinema(null);
    setSelectedMovie(null);
  };

  const handleCinemaClick = (cinemaId) => {
    setSelectedCinema(cinemaId);
    setSelectedMovie(null);
  };

  const handleMovieClick = (movieId) => {
    setSelectedMovie(movieId);
    setIsModalOpen(true);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
    setFilteredShowtimes([]);
    setSelectedShowtime(null);
  };

  const handleSearch = (value) => {
    setSearchTerm(value.toLowerCase());
  };

  const handleShowtimeClick = (session) => {
    setSelectedShowtime(session);
    console.log({
      location: cityResult?.cityName,
      cinema: cinemaData[selectedCinema]?.name,
      movie: movieList[selectedMovie]?.name,
      movieId: selectedMovie,
      showtime: session,
    });
  };

  const cityResult = findCityBySlug(selectedCity);
  const cinemaData = cityResult?.cinemas || {};

  const filteredCinemas = Object.entries(cinemaData).filter(([_, cinema]) =>
    cinema.name.toLowerCase().includes(searchTerm)
  );

  const movieList = selectedCinema
    ? cinemaData[selectedCinema]?.movies || {}
    : {};

  const sessions = movieList[selectedMovie]?.sessions || [];

  const uniqueDates = [
    ...new Set(sessions.map((session) => session.showDate.split(" ")[0])),
  ];

  useEffect(() => {
    if (selectedDate && sessions.length > 0) {
      const filtered = sessions.filter(
        (session) => session.showDate.split(" ")[0] === selectedDate
      );
      setFilteredShowtimes(filtered);
    } else {
      setFilteredShowtimes([]);
    }
  }, [selectedMovie, selectedDate, sessions]);

  return (
    <div className="flex h-[1200px] items-center flex-col pt-20 z-2">
      <Title level={3}>Chọn thành phố</Title>
      <Select
        style={{ width: 200 }}
        placeholder="Chọn thành phố"
        options={mappedCities}
        onChange={handleCityChange}
        value={selectedCity}
        getPopupContainer={(triggerNode) => document.body}
      />

      {cityResult && (
        <div className="mt-5 w-full">
          <Title level={4}>Danh sách rạp chiếu</Title>
          <Search
            placeholder="Tìm kiếm rạp"
            allowClear
            onSearch={handleSearch}
            style={{ marginBottom: 16, width: 300 }}
          />
          <div className="flex justify-center flex-wrap gap-4">
            {filteredCinemas.map(([cinemaId, cinema]) => (
              <Card
                key={cinemaId}
                className={`cursor-pointer min-w-[200px] ${
                  selectedCinema === cinemaId
                    ? "bg-blue-500 text-white border-none"
                    : "bg-white"
                }`}
                onClick={() => handleCinemaClick(cinemaId)}
                style={{
                  border:
                    selectedCinema === cinemaId
                      ? "2px solid #1890ff"
                      : "1px solid #d9d9d9",
                }}
              >
                {cinema.name}
              </Card>
            ))}
          </div>
        </div>
      )}

      {Object.keys(movieList).length > 0 && (
        <div className="mt-5">
          <Title level={4}>Danh sách phim</Title>
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(movieList).map(([movieId, movie]) => (
              <Card
                key={movieId}
                className={`p-2 cursor-pointer ${
                  selectedMovie === movieId ? "border-2 border-blue-500" : ""
                }`}
                onClick={() => handleMovieClick(movieId)}
              >
                <img
                  src={movie.imagePortrait}
                  alt={movie.name || "Movie Poster"}
                  className="w-full h-[300px] object-cover mb-2"
                />
                <p className="text-center font-semibold">{movie.name}</p>
              </Card>
            ))}
          </div>
        </div>
      )}

      <Modal
        title="Chọn ngày chiếu"
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
      >
        <Select
          style={{ width: 200, marginBottom: 16 }}
          placeholder="Chọn ngày chiếu"
          onChange={handleDateChange}
          options={uniqueDates.map((date) => ({
            value: date,
            label: date,
          }))}
        />
        <div className="grid grid-cols-4 gap-4">
          {filteredShowtimes.map((session, index) => (
            <Tag
              key={index}
              color={selectedShowtime === session ? "blue" : "default"}
              className={`p-2 text-sm cursor-pointer ${
                selectedShowtime === session ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => handleShowtimeClick(session)}
            >
              {session.showTime.split(" ")[0]}
            </Tag>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default BookingPage;
