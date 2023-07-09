import React from "react";
import Banner from "../Banner/Banner";
import About from "../About/About";
import Category from "../Category Area/Category";

import Candidates from "../Candidates/Candidates";
import CandidateSlider from "../Candidates/CandidateSlider";

import CallToAction from "../Call To Action/CallToAction";

const HomeMain1 = () => {
  return (
    <main className="home-page-1">
      <Banner />
      <Candidates />
      <About />
      <Category />
      <CallToAction />
    </main>
  );
};

export default HomeMain1;
