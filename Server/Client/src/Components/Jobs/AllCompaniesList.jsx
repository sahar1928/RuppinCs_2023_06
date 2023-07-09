import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CompanyLocation from "../Location/CompanyLocation";
import { URL } from "../../Data/URL";

const AllCompaniesList = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch(URL + "Companies/GetAllCompanies");
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCompanies();
  }, []);

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
    fetchJobs(company.Id);
  };

  const handleClearSelection = () => {
    setSelectedCompany(null);
  };

  const fetchJobs = async (companyId) => {
    try {
      const response = await fetch(
        URL + "Jobs/GetAllCompanyJobs/" + parseInt(companyId),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      console.log(data);
      setJobs(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="jm-candidate-area pt-100 pb-60">
      <div className="container">
        <div className="row">
          {!selectedCompany ? (
            companies.map((company) => (
              <div className="col-lg-4 order-1 order-lg-0" key={company.Id}>
                <div className="jm-candidate-author-wrapper mr-25 mb-40">
                  <div className="jm-candidate-avater-portion jm-company-logo">
                    <img
                      src={`data:image/jpeg;base64,${company.Logo}`}
                      alt="Company Logo"
                    />
                    <h4 className="jm-candidate-avater-name">{company.Name}</h4>
                    <span className="jm-candidate-designation">
                      {company.Industry || "N/A"}
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
                  <div className="jm-candidate-profile-overview-portion">
                    <h4 className="jm-candidate-profile-overview-title">
                      Company Overview
                    </h4>
                    <ul className="jm-job-sidebar-review-list mb-15">
                      <li>
                        <i className="fa-thin fa-user"></i>{" "}
                        <span className="jm-job-review-label">Owners : </span>{" "}
                        <span className="job-review-value">
                          {(company.User && company.User.Username) || "N/A"}
                        </span>
                      </li>
                      <li>
                        <i className="fa-thin fa-users"></i>{" "}
                        <span className="jm-job-review-label">Employees :</span>{" "}
                        <span className="job-review-value">
                          {company.Employees || "N/A"}
                        </span>
                      </li>
                      <li>
                        <i className="fa-thin fa-building"></i>{" "}
                        <span className="jm-job-review-label">Industry :</span>{" "}
                        <span className="job-review-value">
                          {company.Industry || "N/A"}
                        </span>
                      </li>
                      <li>
                        <i className="fa-thin fa-globe"></i>{" "}
                        <span className="jm-job-review-label">Website :</span>{" "}
                        <Link
                          target="_blank"
                          to={company.Website || "#"}
                          className="job-review-value"
                        >
                          {company.Website || "N/A"}
                        </Link>
                      </li>
                      <li>
                        <i className="fa-thin fa-location-crosshairs"></i>{" "}
                        <span className="jm-job-review-label">Location :</span>{" "}
                        <span className="job-review-value">
                          {company.Location || "N/A"}
                        </span>
                      </li>
                      <li>
                        <i className="fa-thin fa-star-sharp-half-stroke"></i>{" "}
                        <span className="jm-job-review-label">
                          Established :
                        </span>{" "}
                        <span className="job-review-value">
                          {company.Established || "N/A"}
                        </span>
                      </li>
                    </ul>
                    <div className="jm-candidate-profile-buttons mt-25">
                      <Link
                        to="#"
                        onClick={() => handleCompanyClick(company)}
                        className="jm-candidate-d-btn"
                      >
                        <i className="fa-thin fa-phone"></i>For more details
                        click here
                      </Link>
                    </div>
                  </div>
                  <div className="jm-candidate-profile-overview-portion">
                    <h4 className="jm-candidate-profile-overview-title">
                      Company Location
                    </h4>
                    <CompanyLocation
                      selectedCity={company.Location || "Tel Aviv-Yafo"}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="row">
              <button className="back-button" onClick={handleClearSelection}>
                X
              </button>
              <div className="col-lg-4 order-1 order-lg-0">
                <div className="jm-candidate-author-wrapper mr-25 mb-40">
                  <div className="jm-candidate-avater-portion jm-company-logo">
                    {selectedCompany.Logo && (
                      <img
                        src={`data:image/jpeg;base64,${selectedCompany.Logo}`}
                        alt="Job Image"
                      />
                    )}
                    <h4 className="jm-candidate-avater-name">
                      {selectedCompany && selectedCompany.Name}
                    </h4>
                    <span className="jm-candidate-designation">
                      {selectedCompany && selectedCompany.Description}
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
                  <div className="jm-candidate-profile-overview-portion">
                    <h4 className="jm-candidate-profile-overview-title">
                      Company Overview
                    </h4>
                    <ul className="jm-job-sidebar-review-list mb-15">
                      <li>
                        <i className="fa-thin fa-user"></i>{" "}
                        <span className="jm-job-review-label">Owners : </span>{" "}
                        <span className="job-review-value">
                          {selectedCompany && selectedCompany.Owners}
                        </span>
                      </li>
                      <li>
                        <i className="fa-light fa-transgender"></i>{" "}
                        <span className="jm-job-review-label">Gender : </span>{" "}
                        <span className="job-review-value">
                          {selectedCompany && selectedCompany.Gender}
                        </span>
                      </li>
                      <li>
                        <i className="fa-thin fa-users"></i>{" "}
                        <span className="jm-job-review-label">
                          Employees :{" "}
                        </span>{" "}
                        <span className="job-review-value">
                          {selectedCompany && selectedCompany.Employees}
                        </span>
                      </li>
                      <li>
                        <i className="fa-thin fa-building"></i>{" "}
                        <span className="jm-job-review-label">Industry : </span>{" "}
                        <span className="job-review-value">
                          {selectedCompany && selectedCompany.Industry}
                        </span>
                      </li>
                      <li>
                        <i className="fa-thin fa-globe"></i>{" "}
                        <span className="jm-job-review-label">Website : </span>{" "}
                        <Link
                          target="_blank"
                          to={selectedCompany && selectedCompany.Website}
                          className="job-review-value"
                        >
                          {selectedCompany && selectedCompany.Website}
                        </Link>
                      </li>
                      <li>
                        <i className="fa-thin fa-location-crosshairs"></i>{" "}
                        <span className="jm-job-review-label">Location : </span>{" "}
                        <span className="job-review-value">
                          {selectedCompany && selectedCompany.Location}
                        </span>
                      </li>
                      <li>
                        <i className="fa-thin fa-star-sharp-half-stroke"></i>{" "}
                        <span className="jm-job-review-label">
                          Established :{" "}
                        </span>{" "}
                        <span className="job-review-value">
                          {selectedCompany && selectedCompany.Established}
                        </span>
                      </li>
                    </ul>
                    <div className="jm-candidate-profile-buttons mt-25">
                      <Link
                        to="#"
                        onClick={handleClearSelection}
                        className="jm-candidate-d-btn"
                      >
                        <i className="fa-thin fa-phone"></i>Back to All
                        Companies
                      </Link>
                    </div>
                  </div>
                  <div className="jm-candidate-profile-overview-portion">
                    <h4 className="jm-candidate-profile-overview-title">
                      Company Location
                    </h4>
                    <CompanyLocation
                      selectedCity={
                        (selectedCompany && selectedCompany.Location) ||
                        "Tel Aviv-Yafo"
                      }
                    />
                  </div>
                  <button className="back-button" onClick={handleClearSelection}>
                Go Back
              </button>
                </div>
              </div>
              {jobs.map((job) => (
                <div className="col-xl-12" key={job.Id}>
                  <div className="jm-latest-job-layout-3">
                    <div className="jm-latest-job-layout-3-wrapper">
                      <div className="jm-latest-job-layout-3-img">
                        {job.Company.Logo && (
                          <img
                            src={`data:image/jpeg;base64,${job.Company.Logo}`}
                            alt="Job Image"
                          />
                        )}
                      </div>
                      <div className="jm-latest-job-layout-3-info">
                        <h4 className="jm-latest-job-layout-3-info-title">
                          <Link to="/jobDetailsPage">{job.JobTitle}</Link>
                        </h4>
                        <div className="jm-latest-job-layout-3-info-meta">
                          <span>
                            <i className="fa-thin fa-tags"></i>
                            {job.JobCategory}
                          </span>
                          <span>
                            <i className="fa-thin fa-location-dot"></i>
                            {job.Location}
                          </span>
                          <span>
                            <i className="fa-thin fa-money-bill-1"></i>
                            {job.ExpectedSalary}
                          </span>
                          <span>
                            <i className="fa-thin fa-clock"></i>
                            {job.JobType === 0 ? "Full Time" : "Part Time"}
                          </span>
                        </div>
                      </div>
                      <div className="jm-latest-job-layout-3-submit">
                        <Link
                          to="/postJobPage"
                          className="jm-latest-job-layout-3-btn"
                        >
                          Apply Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>              
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCompaniesList;
