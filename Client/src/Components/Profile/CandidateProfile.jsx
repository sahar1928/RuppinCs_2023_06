import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {skills,professionalTitles} from "../../Data/JobsData"

const CandidateProfile = ({ user }) => {
  const resumeText = atob(user.Resume.ResumeFile);


  const resumeTypeMapping = {
    0: "HTML",
    1: "Text",
    2: "Docx",
    3: "PDF",
  };

  const {
    FirstName,
    LastName,
    Resume,
    SkillAndExperience,
    ProfessionalTitle,
    Gender,
  } = user;

  const {
    FullName,
    PhotoFile,
    Experiences,
    Educations,
    ResumeFile,
    ResumeCategory,
  } = Resume;
  console.log(user);


  if (!Resume.PhotoFile) {
    return setBase64Photo("<div>Loading...</div>");
  }



  return (
    <div className="jm-candidate-area pt-100 pb-60">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 order-1 order-lg-0">
            <div className="jm-candidate-author-wrapper mr-25 mb-40">
              <div className="jm-candidate-avater-portion">
 {Resume.PhotoFile && <img
                src={`data:image/jpeg;base64,${Resume.PhotoFile}`}
                alt="Candidate Image"
                className="user-photo"
              />}
                <h4 className="jm-candidate-avater-name">{FullName}</h4>
                <span className="jm-candidate-designation">
                  {professionalTitles[ProfessionalTitle]}
                </span>
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
                  {user.SocialMedia.FacebookURL}
                  <Link to="#">
                    <i className="fa-brands fa-twitter"></i>
                  </Link>
                  {user.SocialMedia.TwitterURL}
                  <div className="row">
                  <Link to="#">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </Link>
                  {user.SocialMedia.LinkedinURL}
                  <Link to="#">
                    <i className="fa-light fa-phone-flip"></i>
                  </Link>
                  {user.PhoneNumber}
                </div>
                </div>
                  </div>
              </div>
              <div className="jm-proffessional-skills-portion">
                <h4 className="jm-candidate-profile-overview-title">
                  Professional Skills
                </h4>
                <div className="jm-candidate-professional-skills-meta">
                  {SkillAndExperience.map((item) => (
                    <>
                      <Link to="#" key={item.id}>
                       <i>{skills[item.Skill].name}  </i> 
                        <i className="fa-light fa-skills">
                          {item.Years} Years Experience
                        </i>
                      </Link>
                    </>
                  ))}
                </div>
              </div>
              <div className="jm-candidate-profile-overview-portion">
                <h4 className="jm-candidate-profile-overview-title">
                  Profile Overview
                </h4>
                <ul className="jm-candidate-sidebar-review-list mb-15">
                    <li>
                      <i className="fa-thin fa-user-circle"></i>{" "}
                      <span className="jm-candidate-review-label">
                        First Name :
                      </span>{" "}
                      {user.FirstName}
                    </li>
                    <li>
                      <i className="fa-thin fa-user-circle"></i>{" "}
                      <span className="jm-candidate-review-label">
                        Last Name :
                      </span>{" "}
                      {user.LastName}
                    </li>
                    <li>
                      <i className="fa-thin fa-envelope"></i>{" "}
                      <span className="jm-candidate-review-label">Email :</span>{" "}
                      {user.EmailUrl}
                    </li>
                    <li>
                      <i className="fa-thin fa-map-marker"></i>{" "}
                      <span className="jm-candidate-review-label">
                        Location :
                      </span>
                      {user.Resume.Location}
                    </li>
                    <li>
                      <i className="fa-thin fa-phone"></i>{" "}
                      <span className="jm-candidate-review-label">
                        Phone Number :
                      </span>
                      {user.PhoneNumber}
                    </li>
                  </ul>
                <ul className="jm-job-sidebar-review-list mb-15">
                  <li>
                    <i className="fa-thin fa-house-blank"></i>{" "}
                    <span className="jm-job-review-label">Title : </span>{" "}
                    {professionalTitles[ProfessionalTitle]}
                  </li>
                  <li>
                    <i className="fa-light fa-transgender"></i>{" "}
                    <span className="jm-job-review-label">Gender : </span>{" "}
                    {Gender}
                  </li>
                </ul>
                <div className="jm-candidate-profile-buttons mt-25">
                  {resumeTypeMapping[Resume.ResumeCategory] == "Docx" ||
                  Resume.ResumeCategory === "Docx" ? (
                    <>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(
                            `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${Resume.ResumeFile}`,
                            "_blank"
                          );
                        }}
                        className="jm-candidate-d-btn" style={{width:"350px"}}
                      >
                        <i className="fa-thin fa-eye"></i>View CV
                      </button>
                      <a
                        href={`data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${Resume.ResumeFile}`}
                        download={`${FullName}_Resume.docx`}
                        className="jm-candidate-d-btn"
                      >
                        <i className="fa-thin fa-download"></i>Download CV
                      </a>
                    </>
                  ) : resumeTypeMapping[Resume.ResumeCategory] == "PDF" ||
                    Resume.ResumeCategory === "PDF" ? (
                    <>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(
                            `data:application/pdf;base64,${Resume.ResumeFile}`,
                            "_blank"
                          );
                        }}
                        className="jm-candidate-d-btn" style={{width:"350px"}}
                      >
                        <i className="fa-thin fa-eye"></i>View CV
                      </button>
                      <a
                        href={`data:application/pdf;base64,${Resume.ResumeFile}`}
                        download={`${FullName}_Resume.pdf`}
                        className="jm-candidate-d-btn"
                      >
                        <i className="fa-thin fa-download"></i>Download CV
                      </a>
                    </>
                  ) : resumeTypeMapping[Resume.ResumeCategory] == "HTML" ||
                    Resume.ResumeCategory === "HTML" ? (
                    <>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(
                            `data:text/html;base64,${Resume.ResumeFile}`,
                            "_blank"
                          );
                        }}
                        className="jm-candidate-d-btn" style={{width:"350px"}}
                      >
                        <i className="fa-thin fa-eye"></i>View CV
                      </button>
                      <a
                        href={`data:text/html;base64,${Resume.ResumeFile}`}
                        download={`${FullName}_Resume.html`}
                        className="jm-candidate-d-btn"
                      >
                        <i className="fa-thin fa-download"></i>Download CV
                      </a>
                    </>
                  ) : resumeTypeMapping[Resume.ResumeCategory] == "Text" ||
                    Resume.ResumeCategory === "Text" ? (
                    <>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(
                            `data:text/plain;base64,${Resume.ResumeFile}`,
                            "_blank"
                          );
                        }}
                        className="jm-candidate-d-btn" style={{width:"350px"}}
                      >
                        <i className="fa-thin fa-eye"></i>View CV 
                      </button>
                      <a
                        href={`data:text/plain;base64,${Resume.ResumeFile}`}
                        download={`${FullName}_Resume.txt`}
                        className="jm-candidate-d-btn"
                      >
                        <i className="fa-thin fa-download"></i>Download CV
                      </a>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8 order-0 order-lg-1">
            <div className="jm-candidate-content-wrapper mb-40">
              <div className="jm-candidate-content-about mb-30">
                <h4 className="jm-candidate-content-inner-title">About Me</h4>
              </div>
              <div className="jm-candidate-content-education">
                <div className="jm-candidate-content-education-item">
                  <h4 className="jm-candidate-content-inner-title">
                    Working Experience
                  </h4>
                  {Resume.Experiences.map((experience, index) => (
                    <div
                      className="jm-candidate-content-education-inner"
                      key={index}
                    >                 
                      <h5 className="jm-candidate-content-inner-sm-title">
                        {experience.JobTitle}
                      </h5>
                       <p>Company Name: <i>{experience.EmployerName}</i></p>
                      <span className="jm-candidate-experience-date">
                        {experience.StartDate} - {experience.EndDate}
                      </span>
   
                    </div>
                  ))}
                </div>

                <div className="jm-candidate-content-education-item">
                  <h4 className="jm-candidate-content-inner-title">
                    Education & Training
                  </h4>
                  {Resume.Educations.map((education, index) => (
                    <div
                      className="jm-candidate-content-education-inner"
                      key={index}
                    >
                      <h5 className="jm-candidate-content-inner-sm-title">
                        {education.Qualification}
                      </h5>
                      <p>Institution Name:  <i>{education.InstitutionName}</i></p>
                      <span className="jm-candidate-experience-date">
                        {education.StartDate} - {education.EndDate}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;
