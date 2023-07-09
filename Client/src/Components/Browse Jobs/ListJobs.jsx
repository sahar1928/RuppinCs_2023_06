import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { JobContext } from "../../Context/JobContext";
import { URL } from "../../Data/URL";
import { toast } from "react-toastify";

const ListJobs = () => {
  const { filteredJobs , setJob } = useContext(JobContext);
  const navigate = useNavigate();
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(URL + "Jobs/GetAllJobs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Request failed");
        }
        const data = await response.json();
        setJobs(data);

      } catch (error) {
        toast(error.message);
      }
    };

    fetchJobs();
  }, [jobs]);



  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleJobClick = (job) => {
    setJob(job);
    navigate("/singleJobDetails");
  };


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = jobs.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="jm-browse-list-wrap jm-job-layout-2">
      <div className="row">
        {currentItems.map((job) => {
          return (
            <div className="col-12" key={job.Id}>
              <div className="jm-latest-job-item-3 mb-30">
                <div className="jm-latest-job-item-top-3">
                  <div className="jm-latest-job-item-top-wrap-3">
                    <div className="jm-latest-job-item-logo-3 y_img">

                        {job.Company.Logo && (
                          <img
                            src={`data:image/jpeg;base64,${job.Company.Logo}`}
                            alt="User Photo"
                            className="user-photo"
                            onClick={() => handleJobClick(job)}
                          />
                        )}

                    </div>
                    <div className="jm-latest-job-item-info-3">
                      <h3 className="jm-latest-job-item-info-title-3">
                        <Link to="#">{job.JobTitle}</Link>
                      </h3>
                      <Link
                        to="#"
                        className="jm-latest-job-item-info-subtitle-3"
                      >
                        {job.Company.Name}
                      </Link>
                      <div className="jm-latest-job-meta-wrapper">
                        <Link to="#">Technology</Link>
                        <Link to="#">WordPress</Link>
                      </div>
                    </div>
                  </div>
                  <div className="jm-latest-job-item-btn-3">
                    <button
                      className="jm-theme-btn jm-transparent-btn"
                      onClick={() => handleJobClick(job)}
                    >
                      Apply now
                    </button>
                  </div>
                </div>
                <div className="jm-latest-job-item-bottom-3">
                  <div className="jm-latest-job-item-location-3 jm-latest-job-common">
                    <span>
                      <i className="fa-thin fa-location-dot"></i>
                      {job.Location}
                    </span>
                  </div>
                  <div className="jm-latest-job-item-salary-3 jm-latest-job-common">
                    <span>
                      <i className="fa-thin fa-money-bill-1"></i>$
                      {job.ExpectedSalary}
                    </span>
                  </div>
                  <div className="jm-latest-job-item-duration-3 jm-latest-job-common">
                    <span>
                      <i className="fa-thin fa-clock"></i>
                      {job.JobType}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="row">
        <div className="col-12">
          <div className="jm-pagination mb-40 mt-10 text-center">
            <Link
              to="#"
              className="jm-pagination-btn"
              onClick={() => handlePagination(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <i className="fa-thin fa-arrow-left"></i>
            </Link>
            {Array.from({ length: Math.ceil(jobs.length / itemsPerPage) }).map(
              (_, index) => (
                <Link
                  to="#"
                  className={`jm-pagination-btn ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                  key={index + 1}
                  onClick={() => handlePagination(index + 1)}
                >
                  {index + 1}
                </Link>
              )
            )}
            <Link
              to="#"
              className="jm-pagination-btn"
              onClick={() => handlePagination(currentPage + 1)}
              disabled={currentPage === Math.ceil(jobs.length / itemsPerPage)}
            >
              <i className="fa-thin fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListJobs;
