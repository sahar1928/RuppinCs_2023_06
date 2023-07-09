import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import HomePage1 from "./Pages/HomePage1";
import SignInPage from "./Pages/SignInPage";
import CompanySignUpPage from "./Pages/CompanySignUpPage";
import JobPage from "./Pages/JobPage";
import CandidatePage from "./Pages/CandidatePage";
import AboutPage from "./Pages/AboutPage";
import BlogPage from "./Pages/BlogPage";
import BlogListPage from "./Pages/BlogListPage";
import BlogDetailsPage from "./Pages/BlogDetailsPage";
import ServicePage from "./Pages/ServicePage";
import ServiceDetailsPage from "./Pages/ServiceDetailsPage";
import ErrorPage from "./Pages/ErrorPage";
import ContactPage from "./Pages/ContactPage";
import CandidateListPage from "./Pages/CandidateListPage";
import CandidateDetailsPage from "./Pages/CandidateDetailsPage";
import HomePage2 from "./Pages/HomePage2";
import JobListPage from "./Pages/JobListPage";
import JobDetailsPage from "./Pages/JobDetailsPage";
import JobCategoryPage from "./Pages/JobCategoryPage";
import AllCompaniesListPage from "./Pages/AllCompaniesListPage";
import EmployerGridPage from "./Pages/EmployerGridPage";
import CompanyDetailsPage from "./Pages/AllCompaniesListPage";
import PostJobPage from "./Pages/PostJobPage";
import CandidateSignUpPage from "./Pages/CandidateSignUpPage";
import ProfilePage from "./Pages/ProfilePage";
import SingleJobDetails from "./Components/Jobs/SingleJobDetails";
import CompanyViewer from "./Components/Jobs/CompanyViewer";
import SingleCandidate from "./Components/Candidates/SingleCandidate";
import CryptoJS from "crypto-js";
import { UserContext } from "./Context/UserContext";



function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {

  const { setUser, setIsLoggedIn, setRememberMe, user, isLoggedIn } =
    useContext(UserContext);

  useEffect(() => {
    // Check if user details are stored in localStorage
    const encryptedUserDetails = localStorage.getItem("user");
    const encryptedRememberMe = localStorage.getItem("rememberMe");

    if (encryptedUserDetails) {
      const decryptedUserDetails = decryptUserDetails(encryptedUserDetails);
      setUser(decryptedUserDetails);
      setIsLoggedIn(true);
    }

    if (encryptedRememberMe) {
      const decryptedRememberMe = CryptoJS.AES.decrypt(
        encryptedRememberMe,
        "ahyakar1928"
      ).toString(CryptoJS.enc.Utf8);
      setRememberMe(JSON.parse(decryptedRememberMe));
    }
  }, [setUser,setRememberMe,setIsLoggedIn]);

  const decryptUserDetails = (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, "ahyakar1928");
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  };
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage1 />} />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/employerSignUp" element={<CompanySignUpPage />} />
        <Route path="/candidateSignUp" element={<CandidateSignUpPage />} />
        <Route path="/singleJobDetails" element={<SingleJobDetails />} />
        <Route path="/homePage2" element={<HomePage2 />} />
        <Route path="/jobPage" element={<JobPage />} />
        <Route path="/jobListPage" element={<JobListPage />} />
        <Route path="/jobDetailsPage" element={<JobDetailsPage />} />
        <Route path="/jobCategoryPage" element={<JobCategoryPage />} />
        <Route path="/allCompaniesList" element={<AllCompaniesListPage />} />
        <Route path="/companyViewer" element={<CompanyViewer/>} />
        <Route path="/employerGridPage" element={<EmployerGridPage />} />
        <Route path="/companyDetailsPage" element={<CompanyDetailsPage />} />
        <Route path="/postJobPage" element={<PostJobPage />} />
        <Route path="/candidateDetailsPage" element={<CandidatePage />} />
        <Route path="/profilePage" element={<ProfilePage />} />
        <Route path="/aboutPage" element={<AboutPage />} />
        <Route path="/blogPage" element={<BlogPage />} />
        <Route path="/blogListPage" element={<BlogListPage />} />
        <Route path="/blogDetailsPage" element={<BlogDetailsPage />} />
        <Route path="/servicePage" element={<ServicePage />} />
        <Route path="/serviceDetailsPage" element={<ServiceDetailsPage />} />
        <Route path="/contactPage" element={<ContactPage />} />
        <Route path="/candidateListPage" element={<CandidateListPage />} />
        <Route path="/singleCandidate" element={<SingleCandidate />} />
        <Route
          path="/candidateDetailsPage"
          element={<CandidateDetailsPage />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
