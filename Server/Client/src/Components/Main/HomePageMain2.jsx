import React from 'react'
import Banner2 from '../Banner/Banner2'
import JobSearchTab from '../Job Search/JobSearchTab'
import Category2 from '../Category Area/Category2'
import FeaturedJobs from '../Jobs/FeaturedJobs'
import WorkArea from '../Work Area/WorkArea'



const HomePageMain2 = () => {
  return (
    <main className='homepage-2-main'>
        <Banner2/>
        <JobSearchTab/>
        <Category2/>
        <FeaturedJobs/>
        <WorkArea/>
    </main>
  )
}

export default HomePageMain2