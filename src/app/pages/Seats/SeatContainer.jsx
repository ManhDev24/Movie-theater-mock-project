import React from "react";
import SeatsGrid from "./SeatsGrid";
import { Outlet } from 'react-router-dom';
const SeatContainer = () => {
  return (
    <>    
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <SeatsGrid />
    </div>
    <div className="bg-gray-200">
      <Outlet/>
    </div>

    </>
  );
};

export default SeatContainer;