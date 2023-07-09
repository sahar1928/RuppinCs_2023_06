import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { JobContext } from "../../Context/JobContext";
import { skills } from "../../Data/JobsData";
import AccordionSection from "../Jobs/AccordionSection";
import CompanyLocation from "../Location/CompanyLocation";

const SingleCandidateDetails = () => {
  const { candidate } = useContext(JobContext);
  console.log(candidate);
  const [currentCandidate, setCurrentCandidate] = useState(null);
  const [base64Photo, setBase64Photo] = useState(null);
  const [mimeType, setMimeType] = useState(null);
  const navigate = useNavigate();

  const fetchPhotoData = async (photo) => {
    if (photo) {
      const base64String = photo;
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

  const determineMimeType = (byteArray) => {
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
  };

  useEffect(() => {
    const fetchCandidate = async () => {
      setCurrentCandidate(candidate);
      await fetchPhotoData(candidate.PhotoFile);
    };
    fetchCandidate();
  }, [candidate]);

  if (!currentCandidate) {
    return <div>Loading...</div>;
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <button className="back-button" onClick={handleGoBack}>
        X
      </button>
      <div className="jm-candidate-wrap pt-100 pb-60">
        <div className="row">
          <div className="col-xl-8 col-lg-8">
            <div className="jm-candidate-content-wrapp">
              <img
                src={`data:image/jpeg;base64,${currentCandidate.Resume.PhotoFile}`}
                alt="Candidate Image"
                className="user-photo"
              />
              <div className="jm-candidate-content-title-wrapper mb-35">
                <div className="jm-candidate-content-title-text-wrapp">
                  <div className="jm-candidate-content-title-text">
                    <div className="jm-candidate-content-title-img">
                    </div>
                    <div className="jm-candidate-content-title-bottom">
                      <h4 className="jm-candidate-content-title">
                        {currentCandidate.Resume.FullName}
                      </h4>
                      <span className="jm-candidate-content-title-meta">
                        <i className="fa-thin fa-user"></i>{" "}
                        {currentCandidate.ProfessionalTitle}
                      </span>
                    </div>
                  </div>
                  <div className="jm-candidate-favour-rating">
                  <span className="jm-candidate-rating">
                    <i className="fa-thin fa-star"></i>
                    <i className="fa-thin fa-star"></i>
                    <i className="fa-thin fa-star"></i>
                    <i className="fa-thin fa-star"></i>
                    <i className="fa-thin fa-star"></i>
                  </span>
                  <Link to="#" className="jm-candidate-favour">
                    <i className="fa-thin fa-heart"></i>
                  </Link>
                </div>
                <div className="row">
                  <div className="jm-candidate-social-wrapper">
                  <Link to="#">
                    <i className="fa-regular fa-envelope"></i>
                  </Link>
                  {currentCandidate.SocialMedia.FacebookURL}
                  <Link to="#">
                    <i className="fa-brands fa-twitter"></i>
                  </Link>
                  {currentCandidate.SocialMedia.TwitterURL}
                  <Link to="#">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </Link>
                  {currentCandidate.SocialMedia.LinkedinURL}
                  <Link to="#">
                    <i className="fa-light fa-phone-flip"></i>
                  </Link>
                </div>
                  </div>
              </div>
              <div className="jm-proffessional-skills-portion">
                <h4 className="jm-candidate-profile-overview-title">
                  Professional Skills
                </h4>
                <div className="jm-candidate-professional-skills-meta">
                  {currentCandidate.SkillAndExperience &&
                  currentCandidate.SkillAndExperience.map((item) => (
                    <>
                    <Link to="#" key={item.Id}>
                      Skill: {skills[item.Skill].name}
                      <i className="fa-light fa-skills">{item.Years} Years Experience</i>
                    </Link>        
                    </>
                  ))}
                </div>
              </div>
              <div className="jm-candidate-content-bottom-info-wrapper mb-25">
                <div className="jm-candidate-content-bottom-info-single">
                  <label>Location :</label>
                  <span>{currentCandidate.Resume.Location}</span>
                </div>
                <div className="jm-candidate-content-bottom-info-single">
                  <label>Email :</label>
                  <span>{currentCandidate.EmailUrl}</span>
                </div>
              </div>
              <div className="jm-candidate-content-informations-wrapper ">
                <div className="row align-items-center mb-15">
                  <div className="col-xl-7 col-lg-7 col-md-7">
                    <div className="jm-candidate-content-info-skill-meta text-center text-md-start mb-15">
                      <ul className="jm-candidate-skill-list">
                        {currentCandidate.SkillAndExperience &&
                          currentCandidate.SkillAndExperience.map((skill) => (
                            <li key={skill.Id}>
                              <i className="fa-thin fa-check"></i>{" "}
                              {skills[skill.Skill].name}
                              <i className="fa-thin fa-check"></i>{" "}
                              {skill.Years}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-5 col-md-5">
                  <div className="jm-candidate-social-wrapper">
                  <Link to="#">
                    <i className="fa-regular fa-envelope"></i>
                  </Link>
                  {currentCandidate.SocialMedia.FacebookURL}
                  <Link to="#">
                    <i className="fa-brands fa-twitter"></i>
                  </Link>
                  {currentCandidate.SocialMedia.TwitterURL}
                  <Link to="#">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </Link>
                  {currentCandidate.SocialMedia.LinkedinURL}
                  <Link to="#">
                    <i className="fa-light fa-phone-flip"></i>
                  </Link>
                </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <row>
          <div className="col-xl-4 col-lg-4">
            <div className="jm-candidate-sidebar ml-40">
              <div className="jm-candidate-sidebar-widget mb-40">
                <div className="jm-candidate-sidebar-inner">
                  <h3 className="jm-candidate-sidebar-widget-title">
                    Candidate Overview
                  </h3>
                </div>
                <div className="jm-candidate-sidebar-inner-content">
                  <ul className="jm-candidate-sidebar-review-list mb-15">
                    <li>
                      <i className="fa-thin fa-user-circle"></i>{" "}
                      <span className="jm-candidate-review-label">
                        First Name :
                      </span>{" "}
                      {currentCandidate.FirstName}
                    </li>
                    <li>
                      <i className="fa-thin fa-user-circle"></i>{" "}
                      <span className="jm-candidate-review-label">
                        Last Name :
                      </span>{" "}
                      {currentCandidate.LastName}
                    </li>
                    <li>
                      <i className="fa-thin fa-envelope"></i>{" "}
                      <span className="jm-candidate-review-label">Email :</span>{" "}
                      {currentCandidate.EmailUrl}
                    </li>
                    <li>
                      <i className="fa-thin fa-map-marker"></i>{" "}
                      <span className="jm-candidate-review-label">
                        Location :
                      </span>
                      {currentCandidate.Resume.Location}
                    </li>
                    <li>
                      <i className="fa-thin fa-phone"></i>{" "}
                      <span className="jm-candidate-review-label">
                        Phone Number :
                      </span>
                      {currentCandidate.PhoneNumber}
                    </li>
                  </ul>
                  <div className="jm-candidate-sidebar-overview-buttons">
                    <Link
                      to="/postJobPage"
                      className="jm-candidate-overview-btn"
                    >
                      Contact <i className="fa-thin fa-envelope"></i>
                    </Link>
                    <Link
                      to="#"
                      className="jm-candidate-overview-btn candidate-bookmark"
                    >
                      <i className="fa-thin fa-bookmark"></i> Add Bookmark
                    </Link>
                  </div>
                  <div className="jm-candidate-content-education">
                <div className="jm-candidate-content-education-item">
                  <h4 className="jm-candidate-content-inner-title">
                    Working Experience
                  </h4>
                  {currentCandidate.Resume.Experiences.map((experience, index) => (
                    <div
                      className="jm-candidate-content-education-inner"
                      key={index}
                    >
                      <span className="jm-candidate-experience-date">
                        {experience.StartDate} - {experience.EndDate}
                      </span>
                      <h5 className="jm-candidate-content-inner-sm-title">
                        {experience.JobTitle}
                      </h5>
                      <p>{experience.EmployerName}</p>
                    </div>
                  ))}
                </div>

                <div className="jm-candidate-content-education-item">
                  <h4 className="jm-candidate-content-inner-title">
                    Education & Training
                  </h4>
                  {currentCandidate.Resume.Educations.map((education, index) => (
                    <div
                      className="jm-candidate-content-education-inner"
                      key={index}
                    >
                      <span className="jm-candidate-experience-date">
                        {education.StartDate} - {education.EndDate}
                      </span>
                      <h5 className="jm-candidate-content-inner-sm-title">
                        {education.Qualification}
                      </h5>
                      <p>{education.InstitutionName}</p>
                    </div>
                  ))}
                </div>
              </div>
                </div>
              </div>
              <div className="jm-candidate-sidebar-widget mb-40">
                <div className="jm-candidate-sidebar-inner">
                  <h3 className="jm-candidate-sidebar-widget-title">
                    Candidate Location
                  </h3>
                </div>
                <CompanyLocation
                  selectedCity={currentCandidate.Resume.Location}
                />
              </div>
            </div>
          </div>
          </row>
        </div>  
        <button className="back-button" onClick={handleGoBack}>
          Go Back
        </button>
      </div>
    </div>
    </div>
  );
};

export default SingleCandidateDetails;
