import React from 'react'
import SearchForm from "../Components/Search Form/SearchForm";
import SidePanel from "../Components/Side Panel/SidePanel";
import Header from "../Components/Header/Header";
import Footer from '../Components/Footer/Footer';
import CompanySignUpMain from "../Components/Main/ComapnySignUpMain"
const CompanySignUpPage = () => {
  return (
    <>
        <SearchForm/>
        <SidePanel/>
        <Header/>
        <CompanySignUpMain/>
        <Footer/>
    </> 
    )
}

export default CompanySignUpPage;