import React, { useState } from "react";
import { toast } from "react-toastify";
import { URL } from "../../Data/URL";
import {locations} from "../../Data/JobsData";
import { useNavigate } from "react-router-dom";

const CompanySignUpForm = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [emailUrl, setEmailUrl] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [linkedinCompany, setLinkedinCompany] = useState("");
  const [twitterCompany, setTwitterCompany] = useState("");
  const [facebookCompany, setFacebookCompany] = useState("");
  const [pinterestCompany, setPinterestCompany] = useState("");
  const [instagramCompany, setInstagramCompany] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleFileUpload = (event) => {
    try {
      const file = event.target.files[0];
  
      const allowedTypes = ["application/pdf", "application/msword", "image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        throw new Error("Invalid file type. Please upload a DOC, PDF, JPG, Text or PNG file.");
      }
  
      const maxSize = 2 * 1024 * 1024; // 2 MB
      if (file.size > maxSize) {
        throw new Error("File size exceeds the maximum limit of 2 MB.");
      }
  
      setLogoFile(file);
      
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !username ||
      !password ||
      !confirmPassword ||
      !companyName ||
      !emailUrl
    ) {
      if (!username)  toast.error("username is null");
      if (!password)  toast.error("password is null");
      if (!confirmPassword)  toast.error("confirmPassword is null");
      if (!emailUrl)  toast.error("email is null");
      if (!companyName)  toast.error("CompanyName is null");



      toast.error("Please fill all the required fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }


    try {
      const reader = new FileReader();

      reader.onload = async () => {
        const logoFile = new Uint8Array(reader.result);  

        const user = {
          Username: username,
          Password: password,
          UserType: "Company",
        }

        const company = {
          User:user,
          emailUrl,
          Name : companyName,
         Website : companyWebsite,
          socialMedia: {
          LinkedinURL: linkedinCompany,
           TwitterURL: twitterCompany,
          FacebookURL: facebookCompany,
           PinterestURL: pinterestCompany,
           InstagramURL: instagramCompany,
          },
          Description: companyDescription,
          Logo: Array.from(logoFile),
          Location : location,
          PhoneNumber: phoneNumber
        };

        try {
          const response = await fetch(URL + "Users/CompanySignUp", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(company),
          });

          console.log(company);

          if (response.ok) {
            toast.success("Resume created successfully");
            // Reset the form
            setUsername("");
            setPassword("");
            setConfirmPassword("");
            setEmailUrl("");
            setLinkedinCompany("");
            setFacebookCompany("");
            setPinterestCompany("");
            setInstagramCompany("");
            setTwitterCompany("");
            setCompanyDescription("");
            setLogoFile(null);
            navigate("/SignIn");
          } else {
            toast.error("Failed to create resume");
            e
          }
        } catch (error) {
          toast.error("An error occurred");
        }
      };

      if (logoFile) {
        reader.readAsArrayBuffer(logoFile);
      }     
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <>
        <div className="row align-items-center justify-content-center text-center">
          <div className="col-xl-8">
            <div className="jm-create-new-section mb-20">
              <h4 className="jm-job-sign-text d-inline-block">
                Already Have an account?
              </h4>
              <a href="/signIn" className="jm-job-acc mr-15">
                Sign-in
              </a>
            </div>
          </div>
        </div>
      <form>
        <div className="jm-post-job-wrapper mb-40">
          <h4 className="jm-job-acc-title">Account informations</h4>
          <div className="row">
            <div className="col-xl-6 col-md-12">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
              />
            </div>
            <div className="col-xl-6 col-md-6">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="jm-post-job-wrapper mb-40">
          <h4 className="jm-job-acc-title">Company Details</h4>
          <div className="row">
            <div className="col-xl-6 col-md-6">
              <input
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="col-xl-6 col-md-6">
            <input
              type="text"
              placeholder="Your Email"
              value={emailUrl}
              onChange={(e) => setEmailUrl(e.target.value)}
              className="form-control"
              style={{ border: "1px solid black" }}
            />
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
          </div>
          <div className="col-xl-6 col-md-6">
              <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="col-xl-6 col-md-6">
              <input
                type="text"
                placeholder="Company Website"
                value={companyWebsite}
                onChange={(e) => setCompanyWebsite(e.target.value)}
              />
            </div>
            <div className="col-xl-6 col-md-6">
              <input
                type="text"
                placeholder="Linkedin Username"
                value={linkedinCompany}
                onChange={(e) => setLinkedinCompany(e.target.value)}
              />
            </div>
            <div className="col-xl-6 col-md-6">
              <input
                type="text"
                placeholder="Twitter Username"
                value={twitterCompany}
                onChange={(e) => setTwitterCompany(e.target.value)}
              />
            </div>
            <div className="col-xl-6 col-md-6">
              <input
                type="text"
                placeholder="Facebook Username"
                value={facebookCompany}
                onChange={(e) => setFacebookCompany(e.target.value)}
              />
            </div>
            <div className="col-xl-6 col-md-6">
              <input
                type="text"
                placeholder="Pinterest Username"
                value={pinterestCompany}
                onChange={(e) => setPinterestCompany(e.target.value)}
              />
            </div>
            <div className="col-xl-6 col-md-6">
              <input
                type="text"
                placeholder="Instagram Username"
                value={instagramCompany}
                onChange={(e) => setInstagramCompany(e.target.value)}
              />
            </div>
            <div className="col-xl-12">
              <textarea
                placeholder="Company description"
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="col-xl-12">
            <div className="choose-file">
              <label htmlFor="resume-upload">
                Company Logo <span>(Optional)</span>
              </label>
              <br />
             <input
                type="file"
                accept=".doc,.pdf,.jpg,.png" onChange={handleFileUpload}
                id="resume-upload"
              />
              <br />
              <span className="jm-file-size">Maximum file size: 2 MB</span>
            </div>
          </div>
          </div>
        </div>
        <div className="col-xl-6 col-md-12">
          <div className="jm-info-buttons mt-25">
            <button
              type="submit"
              className="jm-post-job-btn jm-theme-btn"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CompanySignUpForm;
