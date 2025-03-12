import React from "react";
import data from "../../../mock/homepage/homepage.json";
const Home = () => {
  console.log("data: ", data);

  return (
    <div>
      data
      <img src={data[0].sposter} alt="" />
      <img src={data[0].bposter} alt="" />
      <video src={data[0].high}></video>
    </div>
  );
};

export default Home;
