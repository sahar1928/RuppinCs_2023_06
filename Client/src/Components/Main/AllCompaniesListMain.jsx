import React from 'react'
import Breadcrumb from '../Breadcrumb/Breadcrumb'
import AllCompaniesList from '../Jobs/AllCompaniesList'

const AllCompaniesListMain = () => {
  return (
    <main>
        <Breadcrumb topic={'All Companies'} topicSpan={'Employer Details'}/>
        <AllCompaniesList/>
    </main>
  )
}

export default AllCompaniesListMain;