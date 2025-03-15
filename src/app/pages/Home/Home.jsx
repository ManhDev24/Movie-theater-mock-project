import React from "react";
import data from "../../../mock/homepage/homepage.json";
import Banner from "./partials/Banner";
import TitleCards from "./partials/Cards";
import "./Home.scss";
import { MergeDb } from "../../modules/MergeDb";

const Home = () => {
  return (
    <div>
      {/* data */}
      {/* <img src={data[0].sposter} alt="" />
      <img src={data[0].bposter} alt="" />
      <video src={data[0].high}></video> */}
      <Banner />
    </div>
  );
};

export default Home;
