import React from 'react'
import Breadcrumb from '../Breadcrumb/Breadcrumb'
import Profile from '../Profile/Profile'

const ProfileMain = () => {
  return (
    <main>
        <Breadcrumb topic={"User"} topicSpan={"User Profile"}/>
        <Profile/>
    </main>
  )
}

export default ProfileMain