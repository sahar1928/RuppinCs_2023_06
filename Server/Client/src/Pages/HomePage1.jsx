import React from 'react'
import SearchForm from '../Components/Search Form/SearchForm'
import SidePanel from '../Components/Side Panel/SidePanel'
import Header from '../Components/Header/Header'
import HomeMain1 from '../Components/Main/HomeMain1'
import Footer from '../Components/Footer/Footer'
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

const HomePage1 = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   navigate("/");
  // }, []);
  return (
    <>
      <SearchForm/>
      <SidePanel/>
      <Header/>
      <HomeMain1/>
      <Footer/>
    </>
  )
}

export default HomePage1