import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="place-items-center pb-20">
      <img
      src="../src/app/assets/img/pagenotfound.gif"
      alt="404 Not Found"
      className="w-2x1 h-auto"
      />
      <h1 className=" text-5xl font-bold">Oops! Page Not Found</h1>
      <br/>
      <Link to="/" className=" text-3xl font-bold bg-amber-100 px-4 py-2 rounded-lg">
        ⭐Back To Home⭐
      </Link>
    </div>
  )
};

export default PageNotFound;
