import cinemas from "../../mock/cinemas.json";
import movies from "../../mock/movies.json";
import sessions from "../../mock/sessions.json";
import locations from "../../mock/locations.json";

// export const MergeDb = () => {
//   const cinemaMap = cinemas?.data.result.reduce((acc, cinema) => {
//     if (!acc[cinema.cityId]) {
//       acc[cinema.cityId] = {};
//     }
//     acc[cinema.cityId][cinema.id] = cinema;
//     return acc;
//   }, {});

//   const movieMap = movies?.data.result.reduce((acc, movie) => {
//     acc[movie.id] = movie;
//     return acc;
//   }, {});

//   const cityMap = locations?.data.result.reduce((acc, city) => {
//     acc[city.id] = city.name;
//     return acc;
//   }, {});

//   const cityStructure = {};

//   sessions?.data.result.forEach((session) => {
//     const cinema = cinemaMap[session.cinema.cityId]?.[session.cinema.id];
//     const movie = movieMap[session.movie.id];
//     const cityName = cityMap[session.cinema.cityId];

//     if (!cinema || !movie || !cityName) return;

//     if (!cityStructure[cityName]) {
//       cityStructure[cityName] = {
//         cinemas: {},
//       };
//     }

//     const city = cityStructure[cityName];

//     if (!city.cinemas[cinema.id]) {
//       city.cinemas[cinema.id] = {
//         name: cinema.name,
//         movies: {},
//       };
//     }

//     const cinemaObj = city.cinemas[cinema.id];

//     if (!cinemaObj.movies[movie.id]) {
//       cinemaObj.movies[movie.id] = {
//         name: movie.name,
//         sessions: [],
//       };
//     }

//     cinemaObj.movies[movie.id].sessions.push({
//       showDate: session.showDate,
//       showTime: session.showTime,
//     });
//   });

//   console.log("Structured Data:", cityStructure);
// };

// {
//     "Hồ Chí Minh": {
//         "CityId":"",
//       "cinemas": {
//         "cinema1": {
//           "name": "Cinema A",
//           "imageLandscape":"",
//           "imagePortrait":""
//           "movies": {
//             "movie1": {
//                 "id":"",
//                 "imageLandscape":"",
//           "imagePortrait":""
//               "name": "Movie X",
//               "sessions": [
//                 { "showDate": "2025-03-14", "showTime": "14:00", "endDate":"12" },
//                 { "showDate": "2025-03-15", "showTime": "16:00" }
//               ]
//             }
//           }
//         }
//       }
//     }
//   }

// export const MergeDb = () => {
//   const dataStructure = {};

//   sessions?.data.result.forEach((session) => {
//     const { cinema, movie, showDate, showTime, movieFormat } = session;

//     if (!dataStructure[cinema.cityId]) {
//       dataStructure[cinema.cityId] = {
//         cinemas: {},
//       };
//     }

//     if (!dataStructure[cinema.cityId].cinemas[cinema.id]) {
//       const cinemaInfo = cinemas?.data.result.find((c) => c.id === cinema.id);
//       dataStructure[cinema.cityId].cinemas[cinema.id] = {
//         name: cinema.name,
//         imageLandscape: cinema.imageLandscape,
//         imagePortrait: cinema.imagePortrait,
//         movies: {},
//       };
//     }

//     if (!dataStructure[cinema.cityId].cinemas[cinema.id].movies[movie.id]) {
//       const movieInfo = movies?.data.result.find((m) => m.id === movie.id);
//       dataStructure[cinema.cityId].cinemas[cinema.id].movies[movie.id] = {
//         name: movie.name,
//         imageLandscape: movie.imageLandscape,
//         imagePortrait: movie.imagePortrait,
//         sessions: [],
//       };
//     }

//     dataStructure[cinema.cityId].cinemas[cinema.id].movies[
//       movie.id
//     ].sessions.push({
//       showDate,
//       showTime,
//       movieFormat,
//     });
//   });

//   console.log(dataStructure);
// };

export const MergeDb = () => {
  const dataStructure = {};

  sessions?.data.result.forEach((session) => {
    const { cinema, movie, showDate, showTime, movieFormat } = session;

    // Tìm thông tin thành phố từ locations.json
    const cityInfo = locations?.data.result.find(
      (location) => location.id === cinema.cityId
    );
    const cityName = cityInfo ? cityInfo.name : "Unknown City";

    if (!dataStructure[cinema.cityId]) {
      dataStructure[cinema.cityId] = {
        cityName,
        cinemas: {},
      };
    }

    if (!dataStructure[cinema.cityId].cinemas[cinema.id]) {
      const cinemaInfo = cinemas?.data.result.find((c) => c.id === cinema.id);
      dataStructure[cinema.cityId].cinemas[cinema.id] = {
        name: cinema.name,
        imageLandscape: cinema.imageLandscape,
        imagePortrait: cinema.imagePortrait,
        movies: {},
      };
    }

    if (!dataStructure[cinema.cityId].cinemas[cinema.id].movies[movie.id]) {
      const movieInfo = movies?.data.result.find((m) => m.id === movie.id);
      dataStructure[cinema.cityId].cinemas[cinema.id].movies[movie.id] = {
        name: movie.name,
        imageLandscape: movie.imageLandscape,
        imagePortrait: movie.imagePortrait,
        sessions: [],
      };
    }

    dataStructure[cinema.cityId].cinemas[cinema.id].movies[
      movie.id
    ].sessions.push({
      showDate,
      showTime,
      movieFormat,
    });
  });

  console.log("dataStructure: ", dataStructure);
  return dataStructure;
};
