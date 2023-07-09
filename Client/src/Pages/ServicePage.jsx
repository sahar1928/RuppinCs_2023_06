import React, { useContext } from "react";
import SearchForm from "../Components/Search Form/SearchForm";
import SidePanel from "../Components/Side Panel/SidePanel";
import Header2 from "../Components/Header/Header2";
import Header from "../Components/Header/Header";
import Footer from '../Components/Footer/Footer';
import ServiceMain from '../Components/Main/ServiceMain';
import { UserContext } from "../Context/UserContext";

const ServicePage = () => {
  const { user } = useContext(UserContext);
  const isCompany = user?.User?.UserType === "Company";
  return (
    <>
        <SearchForm/>
        <SidePanel/>
        {isCompany ? <Header /> : <Header2 />}
        <ServiceMain/>
        <Footer/>
    </>
  )
}

export default ServicePage