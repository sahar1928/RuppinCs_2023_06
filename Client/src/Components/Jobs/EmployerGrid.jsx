import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { JobContext } from "../../Context/JobContext";
import { UserContext } from "../../Context/UserContext";

const EmployerGrid = () => {
  const { selectedJobType, handleJobTypeChange, jobs } = useContext(JobContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

console.log(jobs)
  const handleApply = (job) => {
    if (!user) {
      navigate("/signIn");
    } else if (user.User.UserType === "Candidate") {
        console.log(job);
    } else {
      console.error("Invalid");
    }
  };



  return (
    <div className="jm-jobs-search-under-hero">
      <div className="container">
        <div className="jm-candidates-search-wrapper">
          <div className="jm-candidates-search-top-text">
            <h4 className="jm-candidates-search-title">Browse Your Jobs</h4>
          </div>
          <div className="jm-candidates-search-wrapper-inner-flex">
            <div className="jm-candidates-search-wrapper-inner-input-fields">
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                  <input type="text" placeholder="Keywords..." />
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                  <input type="text" placeholder="Location" />
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                  <select
                    className="jm-candidates-search-select"
                    value={selectedJobType}
                    onChange={handleJobTypeChange}
                  >
                    <option value="">Choose Type</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                  <select className="jm-candidates-search-select mb-0">
                    <option>Choose Category</option>
                    <option>Developer</option>
                    <option>Medical</option>
                    <option>Technology</option>
                  </select>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="jm-candidates-search-wrapper-inner-input-submit"
            >
              <span className="jm-candidates-search-icon">
                <i className="fa-duotone fa-magnifying-glass"></i>
              </span>
              Search
            </button>
          </div>
        </div>
        <div className="jm-companies-item-wrapper pt-100 pb-70">
          <div className="row">
            {jobs &&
              jobs.map((job) => (
                <div
                  className="col-xxl-3 col-xl-4 col-lg-4 col-md-6"
                  key={job.Id}
                >
                  <div className="jm-job-item-3 mb-30">
                    <div className="jm-job-item-head-3">
                      <h4 className="title">
                        <Link to="/jobDetailsPage">{job.JobTitle}</Link>
                      </h4>
                      <Link to="#">Company: {job.Company.Name}</Link>
                    </div>
                    <div className="jm-job-item-info-3">
                      <div className="jm-job-location-3">
                        <i className="fa-thin fa-location-dot"></i>
                        <span>{job.Location}</span>
                      </div>
                      <div className="jm-job-item-type-3">
                        <i className="fa-thin fa-suitcase"></i>
                        <span>Type: {job.JobType}</span>
                      </div>
                      <div className="jm-job-item-category-3">
                        <i className="fa-thin fa-briefcase"></i>
                        <span>Category: {job.JobCategory}</span>
                      </div>
                      <div className="jm-job-expected-salary-3">
                        <i className="fa-thin fa-money-bill-1"></i>
                        <span>Salary: ${job.ExpectedSalary}</span>
                      </div>
                    </div>
                    <div className="jm-job-item-description-3">
                      <p>{job.JobDescription}</p>
                    </div>
                    <div className="jm-job-item-bottom-3">
                      <div className="jm-job-item-btn-3">
                        <Link
                          to="/jobDetailsPage"
                          className="jm-theme-btn jm-border-btn"
                        >
                          {job.Vacancies} vacancies
                        </Link>
                      </div>
                      <div className="jm-job-item-btn-3">
                        <button
                          className="jm-theme-btn jm-border-btn"
                          onClick={() => handleApply(job)}
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerGrid;
