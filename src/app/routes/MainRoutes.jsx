import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../layouts/Header";
import PageNotFound from "../layouts/PageNotFound";
import Footer from "../layouts/Footer/Footer";
import Home from "../pages/Home";
import SeatContainer from "../pages/Seats/SeatContainer";
import LoadingStartup from "../components/LoadingStartup";
import BookingPage from "../pages/BookingPage/BookingPage";

const MainRoutes = () => {
  const [loadingStartup, setLoadingStartup] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingStartup(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);
  return (
    <BrowserRouter>
      {loadingStartup ? (
        <LoadingStartup />
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/dat-ve" element={<BookingPage />} />
          </Routes>
          <Footer />
        </>
      )}
    </BrowserRouter>
  );
};

export default MainRoutes;
