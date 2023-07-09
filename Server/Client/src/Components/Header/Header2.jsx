import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { JobContext } from "../../Context/JobContext";
import { UserContext } from "../../Context/UserContext";

const Header2 = () => {
    const { handleOpenForm, isSticky, handleOpen } = useContext(JobContext);
    const {
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        rememberMe,
        setRememberMe,
      } = useContext(UserContext);
    
      const [base64Photo, setBase64Photo] = useState("");
      const [mimeType, setMimeType] = useState(null);
      const isCandidate = user?.User?.UserType === "Candidate";
      const isCompany = user?.User?.UserType === "Company";
      const navigate = useNavigate();
    
      const handleLogout = () => {
        setUser(null);
        setIsLoggedIn(false);
        setRememberMe(false);
    
        localStorage.removeItem("user");
        localStorage.removeItem("rememberMe");
    

        navigate("/homePage2"); 
      };
    
      useEffect(() => {
        const fetchPhotoData = async () => {
          if (user && user.Resume && user.Resume.PhotoFile) {
            const base64String = user.Resume.PhotoFile;
            const byteCharacters = atob(base64String);
            const byteArray = new Uint8Array(byteCharacters.length);
    
            for (let i = 0; i < byteCharacters.length; i++) {
              byteArray[i] = byteCharacters.charCodeAt(i);
            }
    
            const mimeTypeFunc = determineMimeType(byteArray);
            setMimeType(mimeTypeFunc);
            const base64 = btoa(String.fromCharCode(...byteArray));
            setBase64Photo(base64);
          }
        };
    
        fetchPhotoData();
      }, [user]);
    
      function determineMimeType(byteArray) {
        const signature = byteArray
          .slice(0, 4)
          .map((byte) => byte.toString(16))
          .join("")
          .toUpperCase();
        if (signature === "89504E47") {
          return "image/png";
        } else if (signature === "FFD8FFDB" || signature === "FFD8FFE0") {
          return "image/jpeg";
        } else {
          // Default to JPEG if the signature doesn't match PNG or JPEG
          return "image/jpeg";
        }
      }
  return (
    <header className="heater-transparent">
      <div
        className={`jm-header-area-2 jm_border_bottom jm-header-padding header-sticky ${
          isSticky ? "sticky" : ""
        }`}
      >
        <div className="container">
          <div className="row align-items-center ">
            <div className="col-xl-3 col-lg-3 col-7">
              <div className="jm-header-logo jm-header-logo-2">
                <Link className="jm-logo" to="/">
                  <img
                    src="assets/img/logo/logowhite.png"
                    alt="Image Not Fouund"
                  />
                </Link>
              </div>
            </div>
            <div className="col-xl-5 col-lg-5 d-none d-lg-block">
              <div className="jm-header-main-menu text-center jm-header-menu-2">
                <nav className="jm-mobile-menu" id="jm-mobile-menu">
                  <ul>
                    <li className="menu-has-children">
                      <Link to="/homePage2">Home</Link>
                    </li>
                    <li className="menu-has-children">
                      <Link to="/jobListPage">Jobs</Link>
                      <ul className="sub-menu">
                        <li>
                          <Link to="/jobListPage">Jobs List</Link>
                        </li>
                        <li>
                          <Link to="/allCompaniesList">Companies List</Link>
                        </li>
                      </ul>
                    </li>
                    {isCompany &&  <li className="menu-has-children">
                        <Link to="/candidateListPage">All Candidates</Link>
                      </li>}
                    <li className="menu-has-children">
                      <Link to="#">Pages</Link>
                      <ul className="sub-menu">
                        <li>
                          <Link to="/aboutPage">About</Link>
                        </li>
                        <li>
                          <Link to="/servicePage">Services</Link>
                        </li>
                        <li>
                          <Link to="/serviceDetailsPage">Services Details</Link>
                        </li>
                        <li>
                          <Link to="/contactPage">Contact</Link>
                        </li>
                      </ul>
                    </li>
                    {isLoggedIn && (
                      <li className="menu-has-children">
                        <Link to="/profilePage" className="jm-user">
                          Profile
                        </Link>
                      </li>
                    )}
                  </ul>     
                </nav>
                
              </div> 
            </div>
            <div className="col-xl-3 col-lg-3 col-3">
                <div className="jm-header-right text-end d-flex align-items-center justify-content-end">
            {isLoggedIn ? (
                    <>
                      {base64Photo && (
                        <img
                          src={`data:${mimeType};base64,${base64Photo}`}
                          alt="User Photo"
                          className="user-photo"
                          style={{height: '60px'}}
                        />
                      )}
                      {user.User.UserType == "Candidate" ? (
                        <a>
                          <small>
                            Welcome Back <br />
                            {user.Resume.FullName}
                          </small>
                        </a>
                      ) : (
                        <a>
                          <small>
                            Welcome Back <br />
                          </small>
                          {user.Name}
                        </a>
                      )}
                      <button
                        className="jm-theme-btn d-none d-lg-block"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <div className="jm-header-main-menu text-center jm-header-menu-2" >
                    <Link to="/signin" className="jm-user">
                      <i className="fal fa-user" style={{color:"#fff"}}>Sign In / Sign Up</i>
                    </Link>
                    </div>
                  )}
                  </div>
                  </div>
          </div>
        </div>
 
      </div>
    </header>
  );
};

export default Header2;
