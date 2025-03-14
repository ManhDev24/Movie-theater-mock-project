import React, { useEffect, useState } from 'react';
import Seat from './Seat.jsx';
import './SeatContainer.scss';
import getDataFromJson from './partials/GetSeatJson'
import handleSeatSelection from './usecases/HandleSelectSeat.jsx';
import { sPrice, sName } from './Seats.store.jsx';
import { Button, Divider, Card, Col, Row, Cascader, InputNumber, Select, Space } from 'antd';
import Ticket from './Ticket.jsx';
const SeatContainer = () => {
  const [seats, setSeats] = useState([]);
  useEffect(() => {
    getDataFromJson(setSeats)
  }, []);

  const handleSelectSeat = (seatId) => {
    handleSeatSelection(setSeats, seatId);
  };
  return (
    <>
     <Ticket/>
      <div className='cinema-container'>
        <div className="seat-layout-wrapper">
          <div id="seat-container">
            {seats.map(seat => (
              <Seat key={seat.id} seat={seat} onSelectSeat={handleSelectSeat} />
            ))}

            <div class="seat-legend">
              <div class="legend-item">
                <div class="legend-color legend-regular"></div>
                <span>Regular</span>
              </div>
              <div class="legend-item">
                <div class="legend-color legend-premium"></div>
                <span>Premium</span>
              </div>
              <div class="legend-item">
                <div class="legend-color legend-selected"></div>
                <span>Selected</span>
              </div>
              <div class="legend-item">
                <div class="legend-color legend-booked"></div>
                <span>Occupied</span>
              </div>
            </div>
          </div>
        </div>
        <div className="booking-container">
          <div id="booking-details">
            <div className='booking-summary'>

            </div>
            <Divider
              style={{
                borderColor: '#7cb305',
              }}
            >
                            <h2>
                Booking summary
              </h2>
            </Divider>
            <p>Movie:</p>
            <p>Date & Time:</p>
            <p>Theater:</p>
            <p>Tickets:</p>
            <p>Seats:</p>
            <Divider
              style={{
                borderColor: '#7cb305',
              }}
            >
            </Divider>
            <h2>Total:</h2>
            <div className='booking-button'>
              <Button type="primary" size='large'>Pay Now</Button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default SeatContainer;