import React from 'react'
import SearchForm from "../Components/Search Form/SearchForm";
import SidePanel from "../Components/Side Panel/SidePanel";
import Header from "../Components/Header/Header";
import Footer from '../Components/Footer/Footer';
import CandidateListMain from '../Components/Main/CandidateListMain';

const CandidateListPage = () => {
  return (
    <>
        <SearchForm/>
        <SidePanel/>
        <Header/>
        <CandidateListMain/>
        <Footer/>
    </>
  )
}

export default CandidateListPage