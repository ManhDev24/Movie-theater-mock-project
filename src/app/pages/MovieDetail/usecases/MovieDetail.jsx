import moment from "moment";

export const convertDates = (data) => {
  const date = data[0]?.cgv_locations?.flatMap((locations) => {
    return locations.showtime.map((items) => items.date);
  });
  return date.map((date) => moment(date).format("dddd, DD/MM/YYYY"));
};

export const getTimes = (data) => {
  const date = data[0]?.cgv_locations?.flatMap((locations) => {
    return locations.showtime.map((items) => items.time);
  });
  return date;
};
