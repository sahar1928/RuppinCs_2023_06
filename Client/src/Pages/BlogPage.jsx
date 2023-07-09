import React from 'react'
import SearchForm from "../Components/Search Form/SearchForm";
import SidePanel from "../Components/Side Panel/SidePanel";
import Header2 from "../Components/Header/Header2";
import BlogMain from '../Components/Main/BlogMain';
import Footer from '../Components/Footer/Footer';
const BlogPage = () => {
  return (
    <>
        <SearchForm/>
        <SidePanel/>
        <Header2/>
        <BlogMain/>
        <Footer/>
    </>
  )
}

export default BlogPage