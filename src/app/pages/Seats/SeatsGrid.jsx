import React, { useState } from "react";
import { getSeatsMatrix } from "./SeatsService";
import Seat from "./Seat";

const SeatsGrid = () => {
  const { maxRow, maxColumn, seatMatrix } = getSeatsMatrix();
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Tạo ký hiệu hàng từ Z -> A
  const rowLabels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").slice(0, maxRow).reverse();

  // Hàm hỗ trợ: Lấy danh sách số ghế đã chọn (chỉ tính ghế đơn và ghế đôi chính) trong 1 hàng
  const getSelectedSeatNumbersForRow = (rowLabel) => {
    return selectedSeats
      .filter(s => s.name.startsWith(rowLabel) && !s.isPartOfDouble)
      .map(s => parseInt(s.name.slice(1)))
      .sort((a, b) => a - b);
  };

  // Định nghĩa các cặp ghế đôi dựa trên screenshot
  const doubleSeatPairs = {
    O: {
      1: 2, 2: 1,
      5: 6, 6: 5,
      8: 9, 9: 8,
      19: 20, 20: 19,
      22: 23, 23: 22,
      26: 27, 27: 26
    },
    N: {
      7: 8, 8: 7,
      10: 11, 11: 10,
      14: 15, 15: 14,
      18: 19, 19: 18,
      21: 22, 22: 21
    }
  };

  // Kiểm tra xem ghế có phải là ghế đôi không và lấy ghế cặp đôi của nó
  const getPairedSeat = (rowLabel, columnIndex) => {
    const columnNumber = columnIndex + 1;
    
    if (doubleSeatPairs[rowLabel]) {
      const pairedColumnNumber = doubleSeatPairs[rowLabel][columnNumber];
      if (pairedColumnNumber) {
        return pairedColumnNumber - 1;
      }
    }
    
    return null;
  };

  // Kiểm tra xem ghế có phải là một phần của ghế đôi không
  const isDoubleSeat = (rowLabel, columnIndex) => {
    return getPairedSeat(rowLabel, columnIndex) !== null;
  };

  // Xử lý chọn/bỏ chọn ghế
  const handleSeatClick = (seat) => {
    const rowLabel = rowLabels[seat.row];
    const seatNumber = seat.column + 1;
    const seatName = `${rowLabel}${seatNumber}`;
    const currentRowSeats = getSelectedSeatNumbersForRow(rowLabel);

    // Xử lý ghế đôi
    const pairedColumnIndex = getPairedSeat(rowLabel, seat.column);
    if (pairedColumnIndex !== null) {
      const pairedSeat = seatMatrix[seat.row][pairedColumnIndex];
      const pairedSeatName = `${rowLabel}${pairedColumnIndex + 1}`;
      const isSeatSelected = selectedSeats.some(s => s.name === seatName);
      const isPairedSeatSelected = selectedSeats.some(s => s.name === pairedSeatName);

      if (isSeatSelected || isPairedSeatSelected) {
        // Bỏ chọn ghế đôi
        if (currentRowSeats.length > 1 && rowLabel !== "O" && rowLabel !== "N") {
          const s1 = seatNumber;
          const s2 = pairedColumnIndex + 1;
          const doubleSeatBlock = [Math.min(s1, s2), Math.max(s1, s2)];
          const minSeat = currentRowSeats[0];
          const maxSeat = currentRowSeats[currentRowSeats.length - 1];
          if (doubleSeatBlock[0] !== minSeat && doubleSeatBlock[1] !== maxSeat) {
            alert("Không thể bỏ chọn ghế ở giữa để tránh tạo khoảng trống!");
            return;
          }
        }
        // Nếu thỏa, bỏ chọn cặp ghế đôi
        const seatIndex = selectedSeats.findIndex(s => 
          s.name === seatName || s.name === pairedSeatName
        );
        
        if (seatIndex !== -1) {
          const newSelectedSeats = [...selectedSeats];
          newSelectedSeats.splice(seatIndex, 2);
          setSelectedSeats(newSelectedSeats);
        }
      } else {
        // Chọn ghế đôi
        if (currentRowSeats.length > 0 && rowLabel !== "O" && rowLabel !== "N") {
          const s1 = seatNumber;
          const s2 = pairedColumnIndex + 1;
          const doubleSeatBlock = [Math.min(s1, s2), Math.max(s1, s2)];
          const minSeat = currentRowSeats[0];
          const maxSeat = currentRowSeats[currentRowSeats.length - 1];
          if (doubleSeatBlock[0] !== minSeat - 1 && doubleSeatBlock[1] !== maxSeat + 1) {
            alert("Bạn chỉ được chọn ghế liền kề với những ghế đã chọn trong cùng hàng!");
            return;
          }
        }
        // Kiểm tra số lượng ghế tối đa (ghế đôi tính 1 ghế)
        const currentSeatCount = selectedSeats.length / 2;
        if (currentSeatCount + 1 > 8) {
          alert("Không được chọn quá 8 ghế!");
          return;
        }
        
        // Chọn ghế đôi: chọn cả ghế chính và ghế cặp đôi (ghế thứ hai không tính tiền)
        const mainSeat = { 
          ...seat, 
          name: seatName,
          isDoubleSeat: true,
          pairedSeatName: pairedSeatName
        };
        
        const secondSeat = { 
          ...pairedSeat, 
          name: pairedSeatName,
          row: seat.row, 
          column: pairedColumnIndex,
          isPartOfDouble: true,
          ticketPrice: 0,
          mainSeatName: seatName
        };
        
        setSelectedSeats(prev => [...prev, mainSeat, secondSeat]);
      }
      return;
    } else {
      // Xử lý ghế đơn
      const isSeatSelected = selectedSeats.some(s => s.name === seatName);
      if (isSeatSelected) {
        // Bỏ chọn ghế đơn
        if (currentRowSeats.length > 1 && rowLabel !== "O" && rowLabel !== "N" &&
            seatNumber !== currentRowSeats[0] && seatNumber !== currentRowSeats[currentRowSeats.length - 1]) {
          alert("Không thể bỏ chọn ghế ở giữa để tránh tạo khoảng trống!");
          return;
        }
        setSelectedSeats(prev => prev.filter(s => s.name !== seatName));
      } else {
        // Chọn ghế đơn
        if (currentRowSeats.length > 0 && rowLabel !== "O" && rowLabel !== "N") {
          const minSeat = currentRowSeats[0];
          const maxSeat = currentRowSeats[currentRowSeats.length - 1];
          if (seatNumber !== minSeat - 1 && seatNumber !== maxSeat + 1) {
            alert("Bạn chỉ được chọn ghế liền kề với những ghế đã chọn trong cùng hàng!");
            return;
          }
        }
        
        // Kiểm tra số lượng ghế tối đa (ghế đơn tính 1 ghế)
        const doubleSeatCount = selectedSeats.filter(s => s.isDoubleSeat).length;
        const singleSeatCount = selectedSeats.filter(s => !s.isDoubleSeat && !s.isPartOfDouble).length;
        
        if (doubleSeatCount + singleSeatCount >= 8) {
          alert("Không được chọn quá 8 ghế!");
          return;
        }
        
        setSelectedSeats(prev => [...prev, { ...seat, name: seatName }]);
      }
    }
  };

  // Tính tổng tiền (chỉ tính ghế đôi một lần)
  const totalPrice = selectedSeats.reduce((sum, seat) => {
    if (seat.isPartOfDouble) {
      return sum;
    }
    return sum + seat.ticketPrice;
  }, 0);

  // Tạo danh sách ghế hiển thị (ghế đôi hiển thị như một đơn vị)
  const displaySeats = selectedSeats.filter(seat => !seat.isPartOfDouble).map(seat => {
    if (seat.isDoubleSeat) {
      return {
        ...seat,
        displayName: `${seat.name}-${seat.pairedSeatName} (Ghế đôi)`
      };
    }
    return {
      ...seat,
      displayName: seat.name
    };
  });

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Chọn ghế</h2>

      <div className="border p-4 rounded-lg bg-gray-100">
        {seatMatrix.map((row, rowIndex) => (
          <div key={rowIndex} className="flex items-center gap-2 mb-2">
            {/* Hiển thị ký hiệu hàng */}
            <span className="font-bold text-gray-600 w-6">{rowLabels[rowIndex]}</span>

            {/* Hiển thị ghế trong hàng */}
            <div className="flex justify-center gap-2">
              {row.map((seat, colIndex) => {
                if (!seat) return <div key={`${rowIndex}-${colIndex}`} className="w-10 h-10"></div>;
                
                const rowLabel = rowLabels[rowIndex];
                const seatName = `${rowLabel}${colIndex + 1}`;
                const isDouble = isDoubleSeat(rowLabel, colIndex);
                const isSelected = selectedSeats.some(s => s.name === seatName);
                const pairedColumnIndex = getPairedSeat(rowLabel, colIndex);
                const isLeftSeat = pairedColumnIndex !== null && colIndex < pairedColumnIndex;
                
                return (
                  <Seat
                    key={`${rowIndex}-${colIndex}`}
                    seat={seat}
                    seatName={seatName}
                    isSelected={isSelected}
                    onClick={handleSeatClick}
                    isDouble={isDouble}
                    isLeftSeat={isLeftSeat}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Hiển thị màn hình */}
      <div className="w-1/2 h-8 bg-gray-300 mt-6 rounded-lg flex items-center justify-center">
        <span className="text-gray-700 text-sm">Màn hình</span>
      </div>

      {/* Chú thích */}
      <div className="mt-4 flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-500 rounded-md"></div>
          <span>Ghế trống</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-500 rounded-md"></div>
          <span>Ghế đã chọn</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-500 rounded-md"></div>
          <span>Ghế đã bán</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-500 rounded-md border-2 border-red-400"></div>
          <span>Ghế đôi</span>
        </div>
      </div>

      {/* Hiển thị ghế đã chọn */}
      {displaySeats.length > 0 && (
        <div className="mt-5 bg-white shadow-md p-4 rounded-md w-full max-w-md">
          <h3 className="text-lg font-bold">Ghế đã chọn:</h3>
          <ul className="mt-2">
            {displaySeats.map((seat) => (
              <li key={seat.name} className="text-gray-700">
                {seat.displayName} - {seat.ticketPrice.toLocaleString()} VNĐ
              </li>
            ))}
          </ul>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="font-bold text-lg">Tổng tiền: {totalPrice.toLocaleString()} VNĐ</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatsGrid;
