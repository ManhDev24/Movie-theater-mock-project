import React from "react";

const Seat = ({ seat, seatName, isSelected, onClick, isDouble, isLeftSeat }) => {
  if (!seat) return <div className="w-10 h-10"></div>; // Chỗ trống (Không có ghế)

  // Xác định style của ghế dựa trên trạng thái
  let seatClasses = `
    w-10 h-10 flex items-center justify-center font-bold shadow-md transition-all
    ${seat.status === 1 ? "bg-gray-500 cursor-not-allowed" : ""}
    ${isSelected ? "bg-green-500 hover:bg-green-600 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"}
  `;

  // Thêm style đặc biệt cho ghế đôi
  if (isDouble) {
    if (isLeftSeat) {
      seatClasses += " rounded-l-md rounded-r-none border-r-0";
    } else {
      seatClasses += " rounded-r-md rounded-l-none border-l-0";
    }
    
    // Thêm viền cho ghế đôi để hiển thị rõ là một cặp
    seatClasses += " border-2 border-red-400";
  } else {
    seatClasses += " rounded-md";
  }

  return (
    <button
      onClick={() => onClick(seat)}
      disabled={seat.status === 1}
      className={seatClasses}
      title={seat.status === 1 ? "Ghế đã được đặt" : `Ghế ${seatName} - ${seat.ticketPrice.toLocaleString()} VNĐ`}
    >
      {seatName}
    </button>
  );
};

export default Seat;