import React from 'react';
import './SeatContainer.scss';
import { sPrice,sName } from './Seats.store.jsx';
const Seat = ({ seat, onSelectSeat }) => {
        const handleClick = () => {
        if (!seat.isBooked) {
            onSelectSeat(seat.id);   
        }
        if(!seat.isSelected){
            console.log(seat)
            sPrice.set((n) => {n.value += seat.price})
            sName.set((seatName) => {seatName.value.push( seat.row + seat.seat)})
            
        }
        if(seat.isSelected){
            sPrice.set((n) => {n.value -= seat.price})
            sName.set((seatName) => {seatName.value.pop(seat.row + seat.seat) })
        }
    };

    sPrice.watch((newValue) => {
        console.log(newValue);
      }, []);

    const style = {
        left: `${seat.x * 50}px`, 
        top: `${seat.y * 50}px`,  
    };

    return (
        <div
            className={`seat ${seat.isBooked ? 'booked' : ''} 
            ${seat.isSelected ? 'selected' : ''} 
            ${seat.type=="vip" ? 'vip' :''}
            ${seat.type=="double" ? 'double' :''}
            `
        }
            onClick={handleClick}
            style={style}
        >
            {seat.row}{seat.seat}
            
        </div>
    );
};

export default Seat;