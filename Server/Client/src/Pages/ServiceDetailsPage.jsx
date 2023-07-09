import React, { useContext } from "react";
import SearchForm from "../Components/Search Form/SearchForm";
import SidePanel from "../Components/Side Panel/SidePanel";
import Header from "../Components/Header/Header";
import Header2 from "../Components/Header/Header2";
import Footer from "../Components/Footer/Footer";
import ServiceDetailsMain from "../Components/Main/ServiceDetailsMain";
import { UserContext } from "../Context/UserContext";

const ServiceDetailsPage = () => {
  const { user } = useContext(UserContext);
  const isCompany = user?.User?.UserType === "Company";
  return (
    <>
      <SearchForm />
      <SidePanel />
      {isCompany ? <Header /> : <Header2 />}
      <ServiceDetailsMain />
      <Footer />
    </>
  );
};

export default ServiceDetailsPage;
