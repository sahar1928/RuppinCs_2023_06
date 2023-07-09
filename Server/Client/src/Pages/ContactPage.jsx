import React, {useContext} from "react";
import SearchForm from "../Components/Search Form/SearchForm";
import SidePanel from "../Components/Side Panel/SidePanel";
import Header from "../Components/Header/Header";
import Header2 from "../Components/Header/Header2";
import Footer from "../Components/Footer/Footer";
import ContactMain from "../Components/Main/ContactMain";
import { UserContext } from "../Context/UserContext";

const ContactPage = () => {
  const { user } = useContext(UserContext);
  const isCompany = user?.User?.UserType === "Company";
  return (
    <>
      <SearchForm />
      <SidePanel />
      {isCompany ? <Header /> : <Header2 />}
      <ContactMain />
      <Footer />
    </>
  );
};

export default ContactPage;
