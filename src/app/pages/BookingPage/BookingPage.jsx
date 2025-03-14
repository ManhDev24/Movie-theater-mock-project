import React, { useState } from "react";
import { Select, Typography, Card, Tag, Modal, Input } from "antd";
import { sMovie } from "../../store/Store";
import "./BookingPage.scss";

const { Title } = Typography;
const { Search } = Input;

const BookingPage = () => {
  const movie = sMovie.use(); // Lấy dữ liệu từ store
  const data = movie || {}; // Đảm bảo dữ liệu không bị null

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showtimes, setShowtimes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleMovieClick = (movieId, sessions) => {
    setSelectedMovie(movieId);
    setShowtimes(sessions);
    setIsModalOpen(true);
  };

  const handleShowtimeClick = (time) => {
    const cityData = findCityBySlug(selectedCity);

    if (!cityData) {
      console.error("City data not found");
      return;
    }

    const cinemaData = cityData.cinemas?.[selectedCinema] || {};
    const movieData = cinemaData.movies?.[selectedMovie] || {};

    const cinemaName = cinemaData.name || "Unknown Cinema";
    const movieName = movieData.name || "Unknown Movie";

    const showtimeInfo = {
      citySlug: cityData.citySlug || "Unknown City ID",
      city: cityData.cityName || "Unknown City",
      cinemaId: selectedCinema || "Unknown Cinema ID",
      cinema: cinemaName,
      movieId: selectedMovie || "Unknown Movie ID",
      movie: movieName,
      showtime: time,
    };

    console.log(showtimeInfo);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setShowtimes([]);
  };

  const handleSearch = (value) => {
    setSearchTerm(value.toLowerCase());
  };

  const cityResult = findCityBySlug(selectedCity);
  console.log("cityResult: ", cityResult);
  const cinemaData = cityResult?.cinemas || {};

  const filteredCinemas = Object.entries(cinemaData).filter(([_, cinema]) =>
    cinema.name.toLowerCase().includes(searchTerm)
  );

  const movieList = selectedCinema
    ? cinemaData[selectedCinema]?.movies || {}
    : {};

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

      {Object.keys(movieList).length > 0 ? (
        <div className="mt-5">
          <Title level={4}>Danh sách phim</Title>
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(movieList).map(([movieId, movie]) => (
              <Card
                key={movieId}
                className={`p-2 cursor-pointer ${
                  selectedMovie === movieId ? "border-2 border-blue-500" : ""
                }`}
                onClick={() => handleMovieClick(movieId, movie.sessions)}
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
      ) : (
        selectedCinema && (
          <p className="mt-5 text-gray-500">No movies available.</p>
        )
      )}

      <Modal
        title="Khung giờ chiếu"
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
      >
        <div className="grid grid-cols-4 gap-4">
          {showtimes.map((time, index) => (
            <Tag
              key={index}
              color="blue"
              className="p-2 text-sm text-center rounded-lg shadow-md bg-gradient-to-r from-blue-400 to-blue-600 text-white cursor-pointer"
              onClick={() => handleShowtimeClick(time.showTime)}
            >
              {time.showTime}
            </Tag>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default BookingPage;
