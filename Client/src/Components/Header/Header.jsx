import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { JobContext } from "../../Context/JobContext";
import Cookies from "js-cookie";

const Header = () => {
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
        className={`jm-header-area header-sticky ${isSticky ? "sticky" : ""}`}
      >
        <div className="container">
          <div className="jm-header-top d-none d-md-block">
            <div className="row align-items-center">
              <div className="col-xl-7 col-md-8">
                <div className="jm-header-top-cta">
                  <span>
                    <i className="fas fa-map-marker-alt"></i>Tel Aviv-Yafo,
                    Israel
                  </span>
                  <span>
                    <i className="fal fa-clock"></i>Mon - Sat 8.00 - 18.00.
                  </span>
                </div>
              </div>
              <div className="col-xl-5 col-md-4">
                <div className="jm-header-top-social">
                  <Link to="#">
                    <i className="fab fa-facebook-f"></i>
                  </Link>
                  <Link to="#">
                    <i className="fab fa-pinterest-p"></i>
                  </Link>
                  <Link to="#">
                    <i className="fab fa-twitter"></i>
                  </Link>
                  <Link to="#">
                    <i className="fab fa-instagram"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="jm-header-main jm-header-padding ">
            <div className="row align-items-center ">
              <div className="col-xl-2 col-lg-2  col-7">
                <div className="jm-header-logo">
                  <Link className="jm-logo" to="/">
                    <img
                      src="assets/img/logo/logo.png"
                      alt="Image Not Fouund"
                    />
                  </Link>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 d-none d-lg-block">
                <div className="jm-header-main-menu text-center">
                  <nav className="jm-mobile-menu" id="jm-mobile-menu">
                    <ul>
                      <li className="menu-has-children">
                        {isCompany ? (
                          <Link to="/">Home</Link>
                        ) : (
                          <Link to="/HomePage2">Home</Link>
                        )}
                      </li>
                      <li className="menu-has-children">
                        <Link to="/JobListPage">Jobs</Link>
                        <ul className="sub-menu">
                          <li>
                            <Link to="/jobListPage">Jobs List</Link>
                          </li>
                          <li>
                            <Link to="/postJobPage">Post a Job</Link>
                          </li>
                          <li>
                            {" "}
                            <Link to="/allCompaniesList">Companies List</Link>
                          </li>
                        </ul>
                      </li>
                      {isCompany && (
                        <li className="menu-has-children">
                          <Link to="/candidateListPage">All Candidates</Link>
                        </li>
                      )}
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
                            <Link to="/serviceDetailsPage">
                              Services Details
                            </Link>
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
              <div className="col-xl-4 col-lg-4 col-5">
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
                      {isCompany ? (
                        <a>
                          <small>
                            Welcome Back <br />
                            {user.Name}
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
                    <Link to="/signin" className="jm-user">
                      <i className="fal fa-user"> Sign in / Sign up</i>
                    </Link>
                  )}
                  <div
                    className="jm-navbar-mobile-sign side-toggle d-lg-none d-inline-block"
                    role="button"
                    onClick={handleOpen}
                  >
                    <span className="dr-line-1"></span>
                    <span className="dr-line-2"></span>
                    <span className="dr-line-3"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
