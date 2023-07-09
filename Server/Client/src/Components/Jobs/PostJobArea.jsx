import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { JobContext } from "../../Context/JobContext";
import { URL } from "../../Data/URL";
import { toast } from "react-toastify";
import { skills, professionalTitles, locations } from "../../Data/JobsData";
import CompanyLocation from "../Location/CompanyLocation";
import { Link } from "react-router-dom";

const PostJobArea = () => {
  const { user, isLoggedIn } = useContext(UserContext);
  const { job, setJob } = useContext(JobContext);
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState("");
  const [emailUrl, setEmailUrl] = useState("");
  const [location, setLocation] = useState("Tel Aviv-Yafo");
  const [jobType, setJobType] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [expectedSalary, setExpectedSalary] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [linkedinURL, setLinkedinURL] = useState("");
  const [twitterURL, setTwitterURL] = useState("");
  const [facebookURL, setFacebookURL] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [logo, setLogo] = useState("");
  const [mimeType, setMimeType] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [availableSkills, setAvailableSkills] = useState(skills);

  useEffect(() => {
    const renderCompanyInfo = async () => {
      if (user && isLoggedIn) {
        setEmailUrl(user.EmailUrl || "");
        setCompanyName(user.Name || "");
        setCompanyWebsite(user.Website || "");
        setLinkedinURL(user.SocialMedia.LinkedinURL || "");
        setTwitterURL(user.SocialMedia.TwitterURL || "");
        setFacebookURL(user.SocialMedia.FacebookURL || "");
        setCompanyDescription(user.Description || "");
        setLogo(user.Logo || "");

        const base64String = user.Logo;
        const byteCharacters = atob(base64String);
        const byteArray = new Uint8Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
          byteArray[i] = byteCharacters.charCodeAt(i);
        }

        const mimeTypeFunc = determineMimeType(byteArray);
        setMimeType(mimeTypeFunc);
        const base64 = btoa(String.fromCharCode(...byteArray));
        setLogo(base64);
      }
    };

    renderCompanyInfo();
  }, [isLoggedIn, user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form validation
    if (
      !jobTitle ||
      !emailUrl ||
      !location ||
      !jobType ||
      !jobCategory ||
      !expectedSalary ||
      !jobDescription ||
      !companyName ||
      !companyWebsite
    ) {
      toast.error("Please fill all the required fields");
      return;
    }

    // Create an object with the form data
    const formData = {
      JobTitle:jobTitle,
      EmailUrl:emailUrl,
      Location:location,
      JobType:jobType,
      JobCategory:jobCategory,
      ExpectedSalary:expectedSalary,
      SkillAndExperience: selectedSkills ,
      CompanyId: user.Id,
      JobDescription:jobDescription
    };

    console.log(formData);

    // Send the form data to the API endpoint
    fetch(URL + "Jobs/CreateJob", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // Reset form fields
          setJobTitle("");
          setEmailUrl("");
          setLocation("");
          setJobType("");
          setJobCategory("");
          setExpectedSalary(0);
          setJobDescription("");
          setCompanyName("");
          setCompanyWebsite("");
          setLinkedinURL("");
          setTwitterURL("");
          setFacebookURL("");
          setSelectedSkills([]);
          setAvailableSkills(skills);
          setCompanyDescription("");
          setLogo(null);
    
          // Parse the response to retrieve the jobId
          return response.json();
        } else {
          throw new Error("Failed to post job");
        }
      })
      .then((data) => {
        setJob(data);
        const jobId = data.JobId; // Access the jobId from the response data
        toast.success("Job posted successfully");
        console.log(jobId)
    
        fetch(URL + `Match/MatchCandidatesToJob/${jobId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => console.log(response.json()))
          .then((data) => {
            toast(data.json());
            navigate("/singleJobDetails")
          })
          .catch((error) => {
            console.error(error);
            toast.error("Failed to match candidates");
          });
        
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to post job");
      });
  };

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

  const handleAddSkill = (skill) => {
    const selectedSkill = {
      Id: skill.id,
      Skill: skill.name,
      Years: 0,
    };

    setSelectedSkills([...selectedSkills, selectedSkill]);
    setAvailableSkills(availableSkills.filter((item) => item.id !== skill.id));
  };

  const handleRemoveSkill = (skill) => {
    const updatedSelectedSkills = selectedSkills.filter(
      (item) => item.Id !== skill.Id
    );
    const updatedAvailableSkills = [
      ...availableSkills,
      {
        id: skill.Id,
        name: skill.Skill,
        Years:0
      },
    ];

    setSelectedSkills(updatedSelectedSkills);
    setAvailableSkills(updatedAvailableSkills);
  };

  const handleExperienceChange = (skillId, years) => {
    const updatedSelectedSkills = selectedSkills.map((skill) => {
      if (skill.Id === skillId) {
        return {
          ...skill,
          Years: years,
        };
      }
      return skill;
    });
    setSelectedSkills(updatedSelectedSkills);
  };

  const handleExpectedSalaryChange = (e) => {
    const value = e.target.value.trim();
    const newValue = value === "" ? "" : parseInt(value, 10); // Specify base 10 for parseInt
    
    setExpectedSalary(newValue);
  };
  

  return (
    <div className="jm-post-job-area pt-95 pb-60">
      <div className="container">
        <div className="row align-items-center justify-content-center text-center">
          <div className="col-xl-8">
            <div className="jm-create-new-section mb-20">
              <h4 className="jm-have-account-title">Post Job</h4>
              <p className="jm-job-sign-text d-inline-block">
                Welcome boss <br />
                get the best employees in the best platform
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-xl-8 col-lg-8">
              <div className="jm-post-job-wrapper mb-40">
                <h4 className="jm-job-acc-title">Job informations</h4>
                <div className="row">
                  <div className="col-xl-6 col-md-6">
                    Job Title
                    <select
                      placeholder="Job Title"
                      className="jm-job-select form-control"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      style={{ border: "1px solid black" }}
                    >
                      <option value="" disabled>
                        Professional Title
                      </option>
                      {professionalTitles.map((title, index) => (
                        <option key={index} value={title}>
                          {title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-xl-6 col-md-6">
                    Job Location
                    <select
                      placeholder="Location"
                      className="jm-job-select form-control"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      style={{ border: "1px solid black" }}
                    >
                      <option value="" disabled>
                        Location
                      </option>
                      {locations.map((location) => (
                        <option key={location.id} value={location.name}>
                          {location.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-xl-6 col-md-6">
                    Job Type
                    <select
                      className="jm-job-select"
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value)}
                    >
                      <option>Job Types</option>
                      <option>Full Time</option>
                      <option>Part Time</option>
                      <option>Internship</option>
                      <option>Temporary</option>
                    </select>
                  </div>
                  <div className="col-xl-6 col-md-6">
                    Job Category
                    <select
                      className="jm-job-select"
                      value={jobCategory}
                      onChange={(e) => setJobCategory(e.target.value)}
                    >
                      <option>Job Category</option>
                      <option>Development</option>
                      <option>IT Sector</option>
                      <option>Corporate Job</option>
                    </select>
                  </div>
                  <div className="col-xl-6 col-md-6">
                    Salary Expectation (USD)
                    <input
                      type="number"
                      className="jm-job-select"
                      placeholder="Salary"
                      value={expectedSalary}
                      onChange={handleExpectedSalaryChange}
                    />
                  </div>
                  <div className="col-xl-12 col-md-12">
                    <select
                      className="jm-job-select form-control"
                      value=""
                      onChange={(e) =>
                        handleAddSkill(
                          availableSkills.find(
                            (skill) => skill.name === e.target.value
                          )
                        )
                      }
                      style={{ border: "1px solid black" }}
                    >
                      <option value="Select a skill" disabled>
                        Select a skill
                      </option>
                      {availableSkills.map((skill) => (
                        <option key={skill.id} value={skill.name}>
                          {skill.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-xl-6 col-md-6">
                    {selectedSkills && selectedSkills.length ? (
                      <h4 className="jm-have-account-title">
                        Selected Skills:{" "}
                      </h4>
                    ) : (
                      <h4 className="jm-have-account-title">
                        There are no selected skills here{" "}
                      </h4>
                    )}
                    <div className="jm-create-new-section mb-40">
                      {selectedSkills && selectedSkills.map((skill) => (
                        <div key={skill.Id}>
                          <span className="ml-10 mb-30">{skill.Skill}</span>
                          <div>
                            <label>
                              Years of Experience:
                              <input
                                type="number"
                                value={skill.Years || ""}
                                onChange={(e) =>
                                  handleExperienceChange(
                                    skill.Id,
                                    parseInt(e.target.value)
                                  )
                                }
                              />
                            </label>
                          </div>
                          <button
                            className="jm-job-acc ml-10"
                            onClick={() => handleRemoveSkill(skill)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-xl-12">
                    Job Description
                    <textarea
                      placeholder="Job description"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4">
              <div className="jm-job-sidebar ml-40">
                <div className="jm-job-sidebar-widget mb-40">
                  <div className="jm-job-sidebar-inner">
                    <h3 className="jm-job-sidebar-widget-title">
                      Company Informations
                    </h3>
                  </div>
                  {logo && (
                    <img
                      src={`data:${mimeType};base64,${logo}`}
                      alt="User Photo"
                      className="user-photo"
                      style={{ height: "100px" }}
                    />
                  )}
                  <div className="jm-job-sidebar-inner-content">
                    <ul className="jm-job-sidebar-review-list mb-15">
                      <li>
                        <i className="fa-thin fa-house-blank"></i>{" "}
                        <span className="jm-job-review-label">
                          Company Name:{" "}
                        </span>{" "}
                        {companyName}
                      </li>
                      <li>
                        <i className="fa-thin fa-location-crosshairs"></i>{" "}
                        <span className="jm-job-review-label">Location : </span>{" "}
                        {location}
                      </li>
                      <li>
                        <i className="fa-thin fa-house-blank"></i>{" "}
                        <span className="jm-job-review-label">
                          Company Website:{" "}
                        </span>{" "}
                        {companyWebsite}
                      </li>
                      <li>
                        <i className="fa-thin fa-house-blank"></i>{" "}
                        <span className="jm-job-review-label">
                          Company Twitter:{" "}
                        </span>{" "}
                        {linkedinURL}
                      </li>    
                       <li>
                        <i className="fa-thin fa-house-blank"></i>{" "}
                        <span className="jm-job-review-label">
                          Company Email:{" "}
                        </span>{" "}
                        {emailUrl}
                      </li>
                    </ul>
                    <div className="jm-job-sidebar-overview-buttons">
                      <Link to="/postJobPage" className="jm-job-overview-btn">
                        Company Profile{" "}
                        <i className="fa-thin fa-arrow-right-long"></i>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="jm-job-sidebar-widget mb-40">
                  <div className="jm-job-sidebar-inner">
                    <h3 className="jm-job-sidebar-widget-title">
                      Job Location
                    </h3>
                  </div>
                  <CompanyLocation selectedCity={location} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-12">
            <div className="jm-info-buttons mt-25">
              <button type="submit" className="jm-post-job-btn jm-theme-btn">
                Post A Job
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJobArea;
