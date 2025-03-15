import seatsData from "./seats.json";

// Hàm lấy danh sách ghế dưới dạng mảng hai chiều
export const getSeatsMatrix = () => {
  const { maxRow, maxColumn, rows } = seatsData.data;

  // Tạo mảng 2 chiều với giá trị mặc định là `null`
  let seatMatrix = Array.from({ length: maxRow }, () => Array(maxColumn).fill(null));

  // Duyệt qua từng hàng trong JSON để đặt ghế vào đúng vị trí
  rows.forEach((row) => {
    row.seats.forEach((seat) => {
      seatMatrix[seat.row][seat.column] = seat;
    });
  });

  return { maxRow, maxColumn, seatMatrix };
};
