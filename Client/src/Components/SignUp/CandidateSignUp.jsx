import React, { useState } from "react";
import { toast } from "react-toastify";
import { URL } from "../../Data/URL";
import { useNavigate } from "react-router-dom";
import {
  skills,
  professionalTitles,
  locations,
  fieldOfStudies,
} from "../../Data/JobsData";

const CandidateSignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailUrl, setEmailUrl] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [professionalTitle, setProfessionalTitle] = useState("");
  const [location, setLocation] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState(fieldOfStudies);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [resumeCategory, setResumeCategory] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [availableSkills, setAvailableSkills] = useState(skills);
  const [linkedinURL, setLinkedinURL] = useState("");
  const [facebookURL, setFacebookURL] = useState("");
  const [pinterestURL, setPinterestURL] = useState("");
  const [instagramURL, setInstagramURL] = useState("");
  const [twitterURL, setTwitterURL] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [institutionName, setInstitutionName] = useState("");
  const [qualification, setQualification] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [experienceStartDate, setExperienceStartDate] = useState("");
  const [experienceEndDate, setExperienceEndDate] = useState("");
  const [resumeFile, setResumeFile] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (
      !username ||
      !password ||
      !confirmPassword ||
      !firstName ||
      !lastName ||
      !emailUrl ||
      !professionalTitle ||
      !dateOfBirth ||
      !resumeCategory ||
      !selectedSkills.length ||
      !photoFile ||
      !institutionName ||
      !qualification ||
      !startDate ||
      !endDate ||
      !employerName ||
      !jobTitle ||
      !experienceStartDate ||
      !experienceEndDate ||
      !resumeFile
    ) {
      toast.error("Please fill in all the required fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const dateTimeOfBirth = new Date(dateOfBirth).toISOString();
    const educationStartDate = new Date(startDate).toISOString();
    const educationEndDate = new Date(endDate).toISOString();
    const expStartDate = new Date(experienceStartDate).toISOString();
    const expEndDate = new Date(experienceEndDate).toISOString();

    try {
      const reader = new FileReader();

      reader.onload = async () => {
        const photoData = new Uint8Array(reader.result);
        const resumeData = new Uint8Array(reader.result);

        const Resume = {
          FullName: firstName + " " + lastName,
          Email: emailUrl,
          ProfessionalTitle: professionalTitle,
          Location: location,
          Date: dateTimeOfBirth,
          ResumeCategory: resumeCategory,
          Skills: selectedSkills,
          SocialMedia: {
            LinkedinURL: linkedinURL,
            TwitterURL: twitterURL,
            FacebookURL: facebookURL,
            PinterestURL: pinterestURL,
            InstagramURL: instagramURL,
          },
          PhotoFile: Array.from(photoData),
          Educations: [
            {
              InstitutionName: institutionName,
              Qualification: qualification,
              FieldOfStudy: fieldOfStudy,
              StartDate: educationStartDate,
              EndDate: educationEndDate,
            },
          ],
          Experiences: [
            {
              EmployerName: employerName,
              JobTitle: jobTitle,
              StartDate: expStartDate,
              EndDate: expEndDate,
            },
          ],
          ResumeFile: Array.from(resumeData),
        };

        const user = {
          Username: username,
          Password: password,
          UserType: "Candidate",
        };

        const candidateSignUp = {
          User: user,
          EmailUrl: emailUrl,
          FirstName: firstName,
          LastName: lastName,
          DateOfBirth: dateTimeOfBirth,
          Gender: gender,
          Resume: Resume,
          ProfessionalTitle: professionalTitle,
          SkillAndExperience: selectedSkills,
          SocialMedia: {
            LinkedinURL: linkedinURL,
            TwitterURL: twitterURL,
            FacebookURL: facebookURL,
            PinterestURL: pinterestURL,
            InstagramURL: instagramURL,
          },
          PhoneNumber: phoneNumber,
        };
        console.log(candidateSignUp);
        try {
          const response = await fetch(URL + "Users/CandidateSignUp", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(candidateSignUp),
          });

          if (response.ok) {
            toast.success("Candidate account created successfully");

            setUsername("");
            setPassword("");
            setConfirmPassword("");
            setFirstName("");
            setLastName("");
            setEmailUrl("");
            setProfessionalTitle("");
            setLocation("");
            setDateOfBirth("");
            setResumeCategory("");
            setSelectedSkills([]);
            setFieldOfStudy(fieldOfStudies);
            setAvailableSkills(skills);
            setLinkedinURL("");
            setFacebookURL("");
            setPinterestURL("");
            setInstagramURL("");
            setTwitterURL("");
            setPhotoFile(null);
            setInstitutionName("");
            setQualification("");
            setStartDate("");
            setEndDate("");
            setPhoneNumber("");
            setEmployerName("");
            setJobTitle("");
            setExperienceStartDate("");
            setExperienceEndDate("");
            setResumeFile(null);
            navigate("/SignIn");
          } else if (response.status === 400) {
            const data = await response.json();
            toast.error(data.errorMessage);
          } else {
            toast.error("Failed to create candidate account");
          }
        } catch (error) {
          toast.error("An error occurred");
        }
      };

      if (photoFile) {
        reader.readAsArrayBuffer(photoFile);
      } else if (resumeFile) {
        reader.readAsArrayBuffer(resumeFile);
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleAddSkill = (skill) => {
    const selectedSkill = {
      id: skill.id,
      name: skill.name,
      years: null,
    };

    setSelectedSkills([...selectedSkills, selectedSkill]);
    setAvailableSkills(availableSkills.filter((item) => item.id !== skill.id));
  };

  const handleRemoveSkill = (skill) => {
    const updatedSelectedSkills = selectedSkills.filter(
      (item) => item.id !== skill.id
    );
    const updatedAvailableSkills = [
      ...availableSkills,
      {
        id: skill.id,
        name: skill.name,
      },
    ];

    setSelectedSkills(updatedSelectedSkills);
    setAvailableSkills(updatedAvailableSkills);
  };

  const handleExperienceChange = (skillId, years) => {
    const updatedSelectedSkills = selectedSkills.map((skill) => {
      if (skill.id === skillId) {
        return {
          ...skill,
          years: years === "" ? "" : parseInt(years),
        };
      }
      return skill;
    });
    setSelectedSkills(updatedSelectedSkills);
  };

  return (
    <div className="jm-post-job-area pt-95 pb-60">
      <div className="container">
        <div className="row align-items-center justify-content-center text-center">
          <div className="col-xl-8">
            <div className="jm-create-new-section mb-20">
              <h4 className="jm-job-sign-text d-inline-block">
                Already have an account?
              </h4>
              <a href="/signIn" className="jm-job-acc mr-15">
                Sign In
              </a>
            </div>
          </div>
        </div>
        <div className="jm-post-job-wrapper mb-40">
          <div className="jm-post-job-wrapper mb-40">
            <h4 className="jm-job-acc-title">Account Information</h4>
            <div className="row">
              <div className="col-xl-6 col-md-12">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control"
                  minLength="8"
                  style={{ border: "1px solid black" }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-md-6">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  minLength="8"
                  style={{ border: "1px solid black" }}
                />
              </div>
              <div className="col-xl-6 col-md-6">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-control"
                  style={{ border: "1px solid black" }}
                />
              </div>
            </div>
          </div>
          <h4 className="jm-job-acc-title">
            Create your resume and put it online.
          </h4>
          <div className="row">
            <div className="col-xl-6 col-md-6">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="form-control"
                style={{ border: "1px solid black" }}
              />
            </div>
            <div className="col-xl-6 col-md-6">
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="form-control"
                style={{ border: "1px solid black" }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6 col-md-6">
              <input
                type="text"
                placeholder="Your Email"
                value={emailUrl}
                onChange={(e) => setEmailUrl(e.target.value)}
                className="form-control"
                style={{ border: "1px solid black" }}
              />
            </div>
            <div className="col-xl-6 col-md-6">
              <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="form-control"
                style={{ border: "1px solid black" }}
              />
            </div>
            <div className="col-xl-6 col-md-6">
              <select
                placeholder="Professional Title"
                className="jm-job-select form-control"
                value={professionalTitle}
                onChange={(e) => setProfessionalTitle(e.target.value)}
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
          </div>
          <div className="row">
            <div className="col-xl-6 col-md-6">
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
              <b>Date of Birth : </b>
              <input
                type="date"
                placeholder="Date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="form-control"
                style={{ border: "1px solid black" }}
              />
            </div>
          </div>
          <row>
            <div className="col-xl-6 col-md-6">
              <select
                className="jm-job-select form-control"
                value={resumeCategory}
                onChange={(e) => setResumeCategory(e.target.value)}
                style={{ border: "1px solid black" }}
              >
                <option>Resume Category</option>
                <option value="HTML">HTML</option>
                <option value="Text">Text</option>
                <option value="Docx">Docx</option>
                <option value="PDF">PDF</option>
              </select>
            </div>
            <div className="col-xl-6 col-md-6">
              <select
                placeholder="Gender Selection"
                className="jm-job-select form-control"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                style={{ border: "1px solid black" }}
              >
                <option value="">Gender Selection</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </row>
          <row>
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
          </row>
          <row>
            <div className="col-xl-6 col-md-6">
              {selectedSkills.length ? (
                <h4 className="jm-have-account-title">Selected Skills: </h4>
              ) : (
                <h4 className="jm-have-account-title">
                  There are no selected skills here{" "}
                </h4>
              )}
              <div className="jm-create-new-section mb-40">
                {selectedSkills.map((skill) => (
                  <div key={skill.Id}>
                    <span className="ml-10 mb-30">{skill.name}</span>
                    <div>
                      <label>
                        Years of Experience:
                        <input
                          type="number"
                          value={skill.years || ""}
                          onChange={(e) =>
                            handleExperienceChange(
                              skill.id,
                              e.target.value === ""
                                ? ""
                                : parseInt(e.target.value)
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
          </row>

          <div className="row">
            <div className="col-xl-6 col-md-6">
              <b>Linkedin URL</b>
              <input
                type="url"
                placeholder="https://www.linkedin.com/in/profile"
                value={linkedinURL}
                onChange={(e) => setLinkedinURL(e.target.value)}
                className="form-control"
                style={{ border: "1px solid black" }}
              />
            </div>
            <div className="col-xl-6 col-md-6">
              <b>Facebook URL</b>
              <input
                type="url"
                placeholder="https://www.facebook.com/profile"
                value={facebookURL}
                onChange={(e) => setFacebookURL(e.target.value)}
                className="form-control"
                style={{ border: "1px solid black" }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6 col-md-6">
              <b>Twitter URL</b>
              <input
                type="url"
                placeholder="https://Twitter.com/"
                value={twitterURL}
                onChange={(e) => setTwitterURL(e.target.value)}
                className="form-control"
                style={{ border: "1px solid black" }}
              />
            </div>
            <div className="col-xl-6 col-md-6">
              <b>Instagram URL</b>
              <input
                type="url"
                placeholder="https://www.instagram.com/"
                value={instagramURL}
                onChange={(e) => setInstagramURL(e.target.value)}
                className="form-control"
                style={{ border: "1px solid black" }}
              />
            </div>
          </div>
          <div className="col-xl-6 col-md-6">
            <b>Pinterest URL</b>
            <input
              type="url"
              placeholder="https://www.instagram.com/"
              value={pinterestURL}
              onChange={(e) => setPinterestURL(e.target.value)}
              className="form-control"
              style={{ border: "1px solid black" }}
            />
          </div>
          <div className="col-xl-12">
            <div className="choose-file">
              <label htmlFor="upload">
                Your Photo <span>(Optional)</span>
              </label>{" "}
              <br />
              <input
                type="file"
                id="upload"
                onChange={(e) => setPhotoFile(e.target.files[0])}
              />{" "}
              <br />
              <span className="jm-file-size">Maximum file size: 2 MB</span>
            </div>
          </div>
        </div>
      </div>
      <div className="jm-post-job-wrapper mb-40">
        <div className="row">
          <div className="col-xl-6">
            <h4 className="jm-job-acc-title">Education</h4>
            <input
              type="text"
              placeholder="Institution Name"
              value={institutionName}
              onChange={(e) => setInstitutionName(e.target.value)}
              className="form-control"
              style={{ border: "1px solid black" }}
            />
            <input
              type="text"
              placeholder="Qualification"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              className="form-control"
              style={{ border: "1px solid black" }}
            />
              <select
                placeholder="Field of Study"
                className="jm-job-select form-control"
                value={fieldOfStudy.toString()}
                onChange={(e) => setFieldOfStudy(e.target.value)} // Convert back to number
                style={{ border: "1px solid black" }}
              >
                <option value="" disabled>
                  Field Of Study
                </option>
                {fieldOfStudies &&
                  fieldOfStudies.map((field) => (
                    <option key={field.id} value={field.name}>
                      {" "}
                      {field.name}
                    </option>
                  ))}
              </select>
            <b>Start Date :</b>
            <input
              type="date"
              placeholder="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="form-control"
              style={{ border: "1px solid black" }}
            />
            <b>End Date :</b>
            <input
              type="date"
              placeholder="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="form-control"
              style={{ border: "1px solid black" }}
            />
          </div>

          <div className="col-xl-6">
            <h4 className="jm-job-acc-title">Work Experience</h4>
            Company Name
            <input
              type="text"
              placeholder="Company Name"
              value={employerName}
              onChange={(e) => setEmployerName(e.target.value)}
              className="form-control"
              style={{ border: "1px solid black" }}
            />
            Job Title
            <input
              type="text"
              placeholder="Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="form-control"
              style={{ border: "1px solid black" }}
            />
            <b>Start Date :</b>
            <input
              type="date"
              placeholder="Start Date"
              value={experienceStartDate}
              onChange={(e) => setExperienceStartDate(e.target.value)}
              className="form-control"
              style={{ border: "1px solid black" }}
            />
            <b>End Date :</b>
            <input
              type="date"
              placeholder="End Date"
              value={experienceEndDate}
              onChange={(e) => setExperienceEndDate(e.target.value)}
              className="form-control"
              style={{ border: "1px solid black" }}
            />
          </div>

          <div className="col-xl-12">
            <div className="choose-file">
              <label htmlFor="resume-upload">
                Upload Resume <span>(Optional)</span>
              </label>
              <br />
              <input
                type="file"
                id="resume-upload"
                onChange={(e) => setResumeFile(e.target.files[0])}
              />
              <br />
              <span className="jm-file-size">Maximum file size: 2 MB</span>
            </div>
          </div>

          <div className="col-xl-12">
            <div className="jm-info-buttons mt-25">
              <button
                className="jm-post-job-btn jm-theme-btn"
                type="submit"
                onClick={handleFormSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateSignUp;
