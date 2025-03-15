import React, { useState, useEffect, useMemo, useRef } from "react";
import { Select, Typography, Input } from "antd";
import { sMovie, sMovieInfoTicket } from "../../store/Store";

const { Search } = Input;

const BookingPage = () => {
  const movie = sMovie.use();
  const data = movie || {};

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredShowtimes, setFilteredShowtimes] = useState([]);
  const [BookingMovieData, setBookingMovieData] = useState("");
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  const cinemaRef = useRef(null);
  const movieRef = useRef(null);
  const dateRef = useRef(null);
  const showtimeRef = useRef(null);

  const mappedCities = useMemo(() => {
    return Object.values(data).map((city) => ({
      value: city.citySlug,
      label: city.cityName,
    }));
  }, [data]);

  const cityResult = useMemo(() => {
    return (
      selectedCity &&
      Object.values(data).find((city) => city.citySlug === selectedCity)
    );
  }, [data, selectedCity]);

  const cinemaData = useMemo(() => {
    return cityResult?.cinemas || {};
  }, [cityResult]);

  const filteredCinemas = useMemo(() => {
    return Object.entries(cinemaData).filter(([_, cinema]) =>
      cinema.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cinemaData, searchTerm]);

  const movieList = useMemo(() => {
    return selectedCinema ? cinemaData[selectedCinema]?.movies || {} : {};
  }, [cinemaData, selectedCinema]);

  const sessions = useMemo(() => {
    return movieList[selectedMovie]?.sessions || [];
  }, [movieList, selectedMovie]);

  const uniqueDates = useMemo(() => {
    return [
      ...new Set(sessions.map((session) => session.showDate.split(" ")[0])),
    ];
  }, [sessions]);

  const scrollToRef = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const convertDateFormat = (dateStr) => {
    if (!dateStr) return "";

    const parts = dateStr.split("-");
    if (parts.length !== 3) return dateStr;

    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  };

  const handleCityChange = (value) => {
    setSelectedCity(value);
    setSelectedCinema(null);
    setSelectedMovie(null);
    setSelectedDate(null);
    setSelectedShowtime(null);
    setFilteredShowtimes([]);

    setTimeout(() => scrollToRef(cinemaRef), 100);
  };

  const handleCinemaClick = (cinemaId) => {
    setSelectedCinema(cinemaId);
    setSelectedMovie(null);
    setSelectedDate(null);
    setSelectedShowtime(null);
    setFilteredShowtimes([]);

    setTimeout(() => scrollToRef(movieRef), 100);
  };

  const handleMovieClick = (movieId) => {
    setSelectedMovie(movieId);
    setSelectedDate(null);
    setSelectedShowtime(null);
    setFilteredShowtimes([]);

    setTimeout(() => scrollToRef(dateRef), 100);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedShowtime(null);

    setTimeout(() => scrollToRef(showtimeRef), 100);
  };

  const handleSearch = (value) => {
    setSearchTerm(value.toLowerCase());
  };

  const handleShowtimeClick = (session) => {
    setSelectedShowtime(session);
    const MovieChoose = {
      location: cityResult?.cityName,
      cinema: cinemaData[selectedCinema]?.name,
      movie: movieList[selectedMovie]?.name,
      movieId: selectedMovie,
      showtime: session,
    };
    setBookingMovieData(MovieChoose);
    sMovieInfoTicket.set(MovieChoose);
  };

  useEffect(() => {
    if (!selectedDate || !selectedMovie) {
      setFilteredShowtimes([]);
      return;
    }

    const currentSessions = sessions;
    if (currentSessions.length > 0) {
      const filtered = currentSessions.filter(
        (session) => session.showDate.split(" ")[0] === selectedDate
      );
      setFilteredShowtimes(filtered);
    } else {
      setFilteredShowtimes([]);
    }
  }, [selectedDate, selectedMovie, sessions]);
  const handleBookingSeat = () => {
    console.log("BookingMovieData: ", BookingMovieData);
  };
  return (
    <div className="bg-gray-100 min-h-screen pt-30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-red-700 mb-4">
                1. CHỌN THÀNH PHỐ
              </h2>
              <Select
                className="w-full"
                placeholder="Chọn thành phố"
                options={mappedCities}
                onChange={handleCityChange}
                value={selectedCity}
                getPopupContainer={(triggerNode) => document.body}
              />
            </div>

            {cityResult && (
              <div
                className="bg-white rounded-lg shadow-md p-6 mb-6"
                ref={cinemaRef}
              >
                <h2 className="text-xl font-bold text-red-700 mb-4">
                  2. CHỌN RẠP CHIẾU
                </h2>
                <Search
                  placeholder="Tìm kiếm rạp"
                  allowClear
                  onSearch={handleSearch}
                  className="mb-4"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredCinemas.map(([cinemaId, cinema]) => (
                    <div
                      key={cinemaId}
                      className={`cursor-pointer rounded-lg p-4 border transition-all duration-200 hover:shadow-lg ${
                        selectedCinema === cinemaId
                          ? "bg-red-700 text-white border-red-700"
                          : "bg-white border-gray-200 hover:border-red-500"
                      }`}
                      onClick={() => handleCinemaClick(cinemaId)}
                    >
                      <div className="flex items-center">
                        <div className="mr-3">
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {cinema.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedCinema && Object.keys(movieList).length > 0 && (
              <div
                className="bg-white rounded-lg shadow-md p-6 mb-6"
                ref={movieRef}
              >
                <h2 className="text-xl font-bold text-red-700 mb-4">
                  3. CHỌN PHIM
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {Object.entries(movieList).map(([movieId, movie]) => (
                    <div
                      key={movieId}
                      className={`cursor-pointer rounded-lg overflow-hidden transition-all duration-200 hover:shadow-xl ${
                        selectedMovie === movieId ? "ring-2 ring-red-700" : ""
                      }`}
                      onClick={() => handleMovieClick(movieId)}
                    >
                      <div className="relative pb-[150%]">
                        <img
                          src={movie.imagePortrait}
                          alt={movie.name || "Movie Poster"}
                          className="absolute top-0 left-0 w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                          <p className="text-white font-bold truncate">
                            {movie.name}
                          </p>
                        </div>
                      </div>
                      <div className="p-4 bg-white">
                        <p className="font-semibold line-clamp-2 h-12">
                          {movie.name}
                        </p>
                        <div className="flex justify-between mt-2">
                          <span className="text-xs text-gray-500">
                            {movie.duration ? `${movie.duration} phút` : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedMovie && (
              <div
                className="bg-white rounded-lg shadow-md p-6 mb-6"
                ref={dateRef}
              >
                <h2 className="text-xl font-bold text-red-700 mb-4">
                  4. CHỌN NGÀY CHIẾU
                </h2>
                <div className="flex flex-wrap gap-3">
                  {uniqueDates.map((date) => {
                    const formattedDate = convertDateFormat(date);

                    return (
                      <div
                        key={date}
                        className={`px-4 py-2 rounded-md border cursor-pointer transition-all duration-200 ${
                          selectedDate === date
                            ? "bg-red-700 text-white border-red-700"
                            : "bg-white border-gray-300 hover:border-red-500"
                        }`}
                        onClick={() => handleDateChange(date)}
                      >
                        {formattedDate}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {selectedDate && (
              <div
                className="bg-white rounded-lg shadow-md p-6 mb-6"
                ref={showtimeRef}
              >
                <h2 className="text-xl font-bold text-red-700 mb-4">
                  5. CHỌN SUẤT CHIẾU
                </h2>
                {filteredShowtimes.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {filteredShowtimes.map((session, index) => (
                      <div
                        key={index}
                        className={`px-4 py-2 text-center rounded-md border cursor-pointer transition-all duration-200 ${
                          selectedShowtime === session
                            ? "bg-red-700 text-white border-red-700"
                            : "bg-white border-gray-300 hover:border-red-500"
                        }`}
                        onClick={() => handleShowtimeClick(session)}
                      >
                        {session.showTime.split(" ")[0]}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    Không có suất chiếu nào vào ngày này
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-bold text-red-700 mb-4">
                THÔNG TIN VÉ
              </h2>

              {!selectedCity ? (
                <div className="text-gray-500 text-center py-8">
                  Vui lòng chọn thành phố để tiếp tục
                </div>
              ) : (
                <div>
                  <div className="border-b pb-3 mb-3">
                    <p className="text-gray-500">Thành phố</p>
                    <p className="font-semibold">{cityResult?.cityName}</p>
                  </div>

                  {selectedCinema && cinemaData[selectedCinema] && (
                    <div className="border-b pb-3 mb-3">
                      <p className="text-gray-500">Rạp chiếu</p>
                      <p className="font-semibold">
                        {cinemaData[selectedCinema].name}
                      </p>
                    </div>
                  )}

                  {selectedMovie && movieList[selectedMovie] && (
                    <div className="border-b pb-3 mb-3">
                      <p className="text-gray-500">Phim</p>
                      <div className="flex items-center">
                        <img
                          src={movieList[selectedMovie].imagePortrait}
                          alt={movieList[selectedMovie].name}
                          className="w-16 h-24 object-cover mr-3 rounded"
                        />
                        <div>
                          <p className="font-semibold">
                            {movieList[selectedMovie].name}
                          </p>
                          {movieList[selectedMovie].duration && (
                            <p className="text-sm text-gray-500">
                              {movieList[selectedMovie].duration} phút
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedDate && (
                    <div className="border-b pb-3 mb-3">
                      <p className="text-gray-500">Ngày chiếu</p>
                      <p className="font-semibold">
                        {convertDateFormat(selectedDate)}
                      </p>
                    </div>
                  )}

                  {selectedShowtime && (
                    <div className="border-b pb-3 mb-3">
                      <p className="text-gray-500">Suất chiếu</p>
                      <p className="font-semibold">
                        {selectedShowtime.showTime.split(" ")[0]}
                      </p>
                    </div>
                  )}

                  <div className="mt-6">
                    <button
                      className={`w-full py-3 rounded-md font-bold ${
                        selectedShowtime
                          ? "bg-red-700 text-white hover:bg-red-800"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      disabled={!selectedShowtime}
                      onClick={handleBookingSeat}
                    >
                      TIẾP TỤC ĐẶT VÉ
                    </button>

                    {!selectedShowtime && selectedCity && (
                      <p className="text-center text-sm text-gray-500 mt-2">
                        Vui lòng hoàn tất các bước chọn để tiếp tục
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
