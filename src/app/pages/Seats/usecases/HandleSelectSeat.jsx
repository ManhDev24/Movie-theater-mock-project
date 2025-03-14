const handleSeatSelection = (setStatecallback, seatId) => {
    setStatecallback(prevSeats => 
      prevSeats.map(seat => {
        if (seat.id === seatId) {
          return { ...seat, isSelected: !seat.isSelected };
        } else {
          return seat;
        }
      })
    );
  };

export default handleSeatSelection;