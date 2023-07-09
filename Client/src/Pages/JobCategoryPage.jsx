import React from 'react'
import SearchForm from "../Components/Search Form/SearchForm";
import SidePanel from "../Components/Side Panel/SidePanel";
import Header2 from "../Components/Header/Header2";
import Footer from '../Components/Footer/Footer';
import JobCategoryMain from '../Components/Main/JobCategoryMain';

const JobCategoryPage = () => {
  return (
    <>
        <SearchForm/>
        <SidePanel/>
        <Header2/>
        <JobCategoryMain/>
        <Footer/>
    </>  
    )
}

export default JobCategoryPage