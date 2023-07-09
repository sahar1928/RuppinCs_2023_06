import React from 'react'
import Breadcrumb from '../Breadcrumb/Breadcrumb'
import SignIn from '../SignIn/SignIn'

const SignInMain = () => {
  return (
    <main>
        <Breadcrumb topic={"Sign In"} topicSpan={"Sign In / Sign Up"}/>
        <SignIn/>
    </main>
  )
}

export default SignInMain;