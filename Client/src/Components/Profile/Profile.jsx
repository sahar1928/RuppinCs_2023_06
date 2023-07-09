
import React, { useContext,useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import { UserContext } from '../../Context/UserContext';
import CandidateProfile from './CandidateProfile'
import CompanyProfile from './CompanyProfile'

const Profile = () => {
    const { user } = useContext(UserContext);
    console.log(user);
    const isCandidate = user?.User?.UserType === "Candidate";
    const isCompany = user?.User?.UserType === "Company";
  
    return (
      <main>
        {isCandidate && <CandidateProfile user={user} />}
        {isCompany && <CompanyProfile user={user} />}
        <Link to="/edit-profile">Edit Profile</Link> 
      </main>
    );
  };
  
  export default Profile;