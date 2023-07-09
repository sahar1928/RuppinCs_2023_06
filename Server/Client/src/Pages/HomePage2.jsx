import React from 'react'
import SearchForm from "../Components/Search Form/SearchForm";
import SidePanel from "../Components/Side Panel/SidePanel";
import Header2 from "../Components/Header/Header2";
import HomePageMain2 from '../Components/Main/HomePageMain2';
import Footer2 from '../Components/Footer/Footer2';
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

const HomePage2 = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   navigate("/");
  // }, []);
  return (
    <>
    <SearchForm/>
    <SidePanel/>
    <Header2/>
    <HomePageMain2/>
    <Footer2/>
</>
  )
}

export default HomePage2