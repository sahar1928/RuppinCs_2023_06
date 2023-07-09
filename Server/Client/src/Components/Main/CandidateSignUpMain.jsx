import React from 'react'
import Breadcrumb from '../Breadcrumb/Breadcrumb'
import CandidateSignUp from "../SignUp/CandidateSignUp"

const CandidateSignUpMain = () => {
  return (
    <main>
        <Breadcrumb topic={'Candidate Sign-up'} topicSpan={'Fill your details'}/>
        <CandidateSignUp/>
    </main>
  )
}

export default CandidateSignUpMain