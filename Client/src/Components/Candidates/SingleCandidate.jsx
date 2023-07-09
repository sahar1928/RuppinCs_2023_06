import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { JobContext } from "../../Context/JobContext";
import { skills, professionalTitles } from "../../Data/JobsData";
import AccordionSection from "../Jobs/AccordionSection";
import CompanyLocation from "../Location/CompanyLocation";

const SingleCandidateDetails = () => {
  const { candidate } = useContext(JobContext);
  console.log(candidate);
  const [currentCandidate, setCurrentCandidate] = useState(null);
  const navigate = useNavigate();

  const resumeTypeMapping = {
    0: "HTML",
    1: "Text",
    2: "Docx",
    3: "PDF",
  };

  useEffect(() => {
    const fetchCandidate = async () => {
      setCurrentCandidate(candidate);
    };
    fetchCandidate();
  }, [candidate]);

  if (!currentCandidate) {
    return <div>Loading...</div>;
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  // const resumeType = 
  // (currentCandidate.Resume.ResumeCategory >= 0 && resumeTypeMapping[currentCandidate.Resume.ResumeCategory] <= 4)
  //  ?  (resumeTypeMapping[currentCandidate.Resume.ResumeCategory])
  // : currentCandidate.Resume.ResumeCategory;

  // const resumeMIMETypeMapping = {
  //   "HTML": "data:text/html",
  //   "Text": "data:text/plain",
  //   "Docx": "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  //   "PDF": "data:application/pdf",
  // };

  // const resumeFileExtMapping = {
  //   "HTML": ".html",
  //   "Text": ".txt",
  //   "Docx": ".docx",
  //   "PDF": ".pdf",
  // };

  // const resumeMIMEType = resumeMIMETypeMapping[resumeType];
  // const resumeFileExtension = resumeFileExtMapping[resumeType];

  return (
      <div className="jm-candidate-wrap pt-100 pb-60" >

    <div className="container" style={{borderColor:"black", borderStyle:"double"}}>
      <button className="back-button" onClick={handleGoBack} style={{marginTop:"10px"}}>
        X
      </button>
      <div className="row">
      <div className="text-center">
      <div className="col-lg-12">
        <div className="jm-candidate-author-wrapper mr-25 mb-40">
          <div className="jm-candidate-avater-portion">
              <img
                src={`data:image/jpeg;base64,${currentCandidate.Resume.PhotoFile}`}
                alt="Candidate Image"
                className="user-photo"
              />
                  <div className="jm-candidate-content-title-text">
                    <div className="jm-candidate-content-title-img">
                    </div>
                    <div className="jm-candidate-content-title-bottom">
                      <h4 className="jm-candidate-content-title">
                        {currentCandidate.Resume.FullName}
                      </h4>
                      <span className="jm-candidate-content-title-meta">
                        <i className="fa-thin fa-user"></i>{" "}
                        {professionalTitles[currentCandidate.ProfessionalTitle]}
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
                </div>

              <div className="jm-candidate-content-informations-wrapper ">
                <div className="row align-items-center mb-15">
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
                </div>
          </div>

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
                  <div className="jm-candidate-profile-buttons mt-25">
                  {resumeTypeMapping[currentCandidate.Resume.ResumeCategory] == "Docx" ||
                  currentCandidate.Resume.ResumeCategory === "Docx" ? (
                    <>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(
                            `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${currentCandidate.Resume.ResumeFile}`,
                            "_blank"
                          );
                        }}
                        className="jm-candidate-d-btn" style={{marginLeft:"42%"}}
                      >
                        <i className="fa-thin fa-eye"></i>View CV
                      </button>
                      <a
                        href={`data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${currentCandidate.Resume.ResumeFile}`}
                        download={`${currentCandidate.Resume.FullName}_Resume.docx`}
                        className="jm-candidate-d-btn" style={{marginLeft:"42%"}}
                      >
                        <i className="fa-thin fa-download"></i>Download CV
                      </a>
                    </>
                  ) : resumeTypeMapping[currentCandidate.Resume.ResumeCategory] == "PDF" ||
                  currentCandidate.Resume.ResumeCategory === "PDF" ? (
                    <>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(
                            `data:application/pdf;base64,${currentCandidate.Resume.ResumeFile}`,
                            "_blank"
                          );
                        }}
                        className="jm-candidate-d-btn" style={{marginLeft:"42%"}}
                      >
                        <i className="fa-thin fa-eye"></i>View CV
                      </button>
                      <a
                        href={`data:application/pdf;base64,${currentCandidate.Resume.ResumeFile}`}
                        download={`${currentCandidate.Resume.FullName}_Resume.pdf`}
                        className="jm-candidate-d-btn"
                      >
                        <i className="fa-thin fa-download"></i>Download CV
                      </a>
                    </>
                  ) : resumeTypeMapping[currentCandidate.Resume.ResumeCategory] == "HTML" ||
                  currentCandidate.Resume.ResumeCategory === "HTML" ? (
                    <>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(
                            `data:text/html;base64,${currentCandidate.Resume.ResumeFile}`,
                            "_blank"
                          );
                        }}
                        className="jm-candidate-d-btn" style={{marginLeft:"42%"}}
                      >
                        <i className="fa-thin fa-eye"></i>View CV
                      </button>
                      <a
                        href={`data:text/html;base64,${currentCandidate.Resume.ResumeFile}`}
                        download={`${currentCandidate.Resume.FullName}_Resume.html`}
                        className="jm-candidate-d-btn"
                      >
                        <i className="fa-thin fa-download"></i>Download CV
                      </a>
                    </>
                  ) : resumeTypeMapping[currentCandidate.Resume.ResumeCategory] == "Text" ||
                  currentCandidate.Resume.ResumeCategory === "Text" ? (
                    <>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(
                            `data:text/plain;base64,${currentCandidate.Resume.ResumeFile}`,
                            "_blank"
                          );
                        }}
                        className="jm-candidate-d-btn" style={{marginLeft:"42%"}}
                      >
                        <i className="fa-thin fa-eye"></i>View CV 
                      </button>
                      <a
                        href={`data:text/plain;base64,${currentCandidate.Resume.ResumeFile}`}
                        download={`${currentCandidate.Resume.FullName}_Resume.txt`}
                        className="jm-candidate-d-btn"
                      >
                        <i className="fa-thin fa-download"></i>Download CV
                      </a>
                    </>
                  ) : null}
                </div>
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
                      <h5 className="jm-candidate-content-sm-title">
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
                      <h5 className="jm-candidate-content-sm-title">
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
        <div>
        <button className="back-button" onClick={handleGoBack} style={{marginBottom:"10px"}}>
        Go Back
      </button>
    </div>
    </div>
    </div>
  </div>
  );
};

export default SingleCandidateDetails;
