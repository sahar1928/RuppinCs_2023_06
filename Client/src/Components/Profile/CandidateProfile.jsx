import React, {useState,useEffect} from "react";
import { Link } from "react-router-dom";

const CandidateProfile = ({ user }) => {
    
  const [base64Photo, setBase64Photo] = useState(null);
  const [mimeType, setMimeType] = useState(null);
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
      ResumeFile
    } = Resume;
    console.log( user);


  
    const fetchPhotoData = async (logo) => {
      if (logo) {
        const base64String = logo;
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

    useEffect(() => {
      const fetchJob = async () => {
        await fetchPhotoData(Resume.PhotoFile);
  
      };
      fetchJob();
    }, [base64Photo]);
  
    if (!base64Photo) {
      return setBase64Photo("<div>Loading...</div>");
    }
  
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
        return "image/jpeg";
      }
    };

  return (
    <div className="jm-candidate-area pt-100 pb-60">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 order-1 order-lg-0">
            <div className="jm-candidate-author-wrapper mr-25 mb-40">
              <div className="jm-candidate-avater-portion">
              {base64Photo && (
                <img
                  src={`data:${mimeType};base64,${base64Photo}`}
                  alt="Company Image"
                  className="user-photo"
                />
              )}
                <h4 className="jm-candidate-avater-name">{FullName}</h4>
                <span className="jm-candidate-designation">
                  {ProfessionalTitle}
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
                <div className="jm-candidate-social-wrapper">
                  <Link to="#">
                    <i className="fa-regular fa-envelope"></i>
                  </Link>
                  <Link to="#">
                    <i className="fa-brands fa-twitter"></i>
                  </Link>
                  <Link to="#">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </Link>
                  <Link to="#">
                    <i className="fa-light fa-phone-flip"></i>
                  </Link>
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
                      {item.Skill}
                      <i className="fa-light fa-skills">{item.Years} Years Experience</i>
                    </Link>        
                    </>
                  ))}
                </div>
              </div>
              <div className="jm-candidate-profile-overview-portion">
                <h4 className="jm-candidate-profile-overview-title">
                  Profile Overview
                </h4>
                <ul className="jm-job-sidebar-review-list mb-15">
                  <li>
                    <i className="fa-thin fa-house-blank"></i>{" "}
                    <span className="jm-job-review-label">Title : </span>{" "}
                    {ProfessionalTitle}
                  </li>
                  <li>
                    <i className="fa-light fa-transgender"></i>{" "}
                    <span className="jm-job-review-label">Gender : </span>{" "}
                    {Gender}
                  </li>
                </ul>
                <div className="jm-candidate-profile-buttons mt-25">
                  <Link to="#" className="jm-candidate-d-btn">
                    <i className="fa-thin fa-phone"></i>Hire Me
                  </Link>
                  <Link to="#" className="jm-candidate-d-btn">
                    <i className="fa-thin fa-download"></i>Download CV
                  </Link>
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
                  {Resume.Educations.map((education, index) => (
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
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;
