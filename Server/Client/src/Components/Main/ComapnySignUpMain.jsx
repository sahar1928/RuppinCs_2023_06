import React from 'react'
import Breadcrumb from '../Breadcrumb/Breadcrumb'
import CompanySignUpForm from '../SignUp/CompanySignUp';

const CompanySignUpMain = () => {
  return (
    <main>
        <Breadcrumb topic={"Sign Up"} topicSpan={"Employer Sign Up"}/>
        <CompanySignUpForm/>
    </main>
  )
}

export default CompanySignUpMain;