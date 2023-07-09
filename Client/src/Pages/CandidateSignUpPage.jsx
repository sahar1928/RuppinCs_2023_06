import React from 'react'
import SearchForm from "../Components/Search Form/SearchForm";
import SidePanel from "../Components/Side Panel/SidePanel";
import Header2 from "../Components/Header/Header2";
import Footer from '../Components/Footer/Footer';
import CandidateSignUpMain from "../Components/Main/CandidateSignUpMain"

const CandidateSignUpPage = () => {
  return (
    <>
        <SearchForm/>
        <SidePanel/>
        <Header2/>
        <CandidateSignUpMain/>
        <Footer/>
    </>  
    )
}

export default CandidateSignUpPage