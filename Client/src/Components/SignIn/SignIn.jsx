import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { URL } from "../../Data/URL";
import VideoTab from "../Video Area/VideoTab";
import CryptoJS from "crypto-js";
import { UserContext } from "../../Context/UserContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn, rememberMe, setRememberMe } =
    useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(rememberMe);

  const userTypeMapping = {
    0: "None",
    1: "Candidate",
    2: "Company",
  };

  const userGenderMapping = {
    0: "Male",
    1: "Female",
    2: "Other",
  };


  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = (e) => {
    setRemember(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Please fill all the required fields");
      return;
    }

    try {
      const userValidation = {
        Username: username,
        Password: password,
      };

      const userDetails = await signIn(userValidation);

      userDetails.User.UserType = userTypeMapping[userDetails.User.UserType];
      if (userDetails.User.UserType === "Candidate")
        userDetails.Gender = userGenderMapping[userDetails.Gender];

      setUser(userDetails);
      setIsLoggedIn(true);
      setRememberMe(remember);
      console.log(userDetails);

      if (remember) {

        const encryptedRememberMe = CryptoJS.AES.encrypt(
          JSON.stringify(remember),
          "ahyakar1928"
        ).toString();
        const encryptedUserDetails = encryptUserDetails(userDetails);

        localStorage.setItem("user", encryptedUserDetails);
        localStorage.setItem("rememberMe", encryptedRememberMe);

      } else {

        localStorage.removeItem("user");
        localStorage.removeItem("rememberMe");
      }

      if (userDetails.User.UserType === "Candidate") {
        navigate("/HomePage2");
      } else if (userDetails.User.UserType === "Company") {
        navigate("/");
      } else {
        navigate("/ErrorPage");
      }
    } catch (error) {
      toast.error("Failed to sign in");
    }
  };

  const signIn = async (userValidation) => {
    const response = await fetch(URL + "Users/Login", {
      method: "POST",
      body: JSON.stringify(userValidation),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const userDetails = await response.json();
      return userDetails;
    } else {
      throw new Error("Failed to sign in");
    }
  };

  const encryptUserDetails = (userDetails) => {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(userDetails),
      "ahyakar1928"
    ).toString();
    return encryptedData;
  };

  const decryptUserDetails = (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, "ahyakar1928");
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  };

  return (
    <>
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-header">
            <h1 className="mt-3 mb-4">Sign In</h1>
          </div>
          <div className="form-group">
            <label htmlFor="username" className="fw-bold">
              Username
            </label>
            <input
              type="username"
              name="username"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={handleUsernameChange}
              required
              className="border-0 bg-light form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="fw-bold">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="border-0 bg-light form-control"
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="remember-me"
              checked={remember}
              onChange={handleRememberMeChange}
            />
            <label className="form-check-label" htmlFor="remember-me">
              <span className="fw-bold">Remember me</span>
            </label>
          </div>
          <button type="submit" className="jm-job-acc mr-15">
            <i className="fa fa-user" aria-hidden="true"></i>
            Sign in
          </button>
          <div className="mt-3 text-center">
            <h4 className="jm-job-sign-text d-inline-block">
              Don't have an account?
              <VideoTab />
            </h4>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
