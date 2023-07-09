import React from 'react'
import SearchForm from "../Components/Search Form/SearchForm";
import SidePanel from "../Components/Side Panel/SidePanel";
import Header2 from "../Components/Header/Header2";
import Footer from '../Components/Footer/Footer';
import BlogDetailsMain from '../Components/Main/BlogDetailsMain';

const BlogDetailsPage = () => {
  return (
    <>
        <SearchForm/>
        <SidePanel/>
        <Header2/>
        <BlogDetailsMain/>
        <Footer/>
    </>
  )
}

export default BlogDetailsPage