import React, { useContext,useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



const AllJobsList = () => {
    const [base64Photos, setBase64Photos] = useState([]);
    const [mimeType, setMimeType] = useState(null);
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
          console.log(error.message);
        }
      };
  
      fetchJobs();
    }, [jobs]);
  
    useEffect(() => {
      const fetchPhotos = async () => {
        const base64PhotosArray = await Promise.all(
          jobs.map((job) => fetchPhotoData(job.Company.Logo))
        );
        setBase64Photos(base64PhotosArray);
      };
  
      fetchPhotos();
    }, [jobs]);
  
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
        return base64;
      }
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

  return (
    <>
      {jobs && jobs.map((job) => (
        <div className="col-xl-12" key={job.Id}>
          <div className="jm-latest-job-layout-3">
            <div className="jm-latest-job-layout-3-wrapper">
              <div className="jm-latest-job-layout-3-img">
                <img src={base64Photos} alt="Company Logo" />
              </div>
              <div className="jm-latest-job-layout-3-info">
                <h4 className="jm-latest-job-layout-3-info-title">
                  <Link to="/singleJobDetals" state={job}>{job.JobTitle}</Link>
                </h4>
                <div className="jm-latest-job-layout-3-info-meta">
                  <span>
                    <i className="fa-thin fa-tags"></i>
                    {job.SkillAndExperience.map((item) => (
                      <div key={item.Id}>
                      <span >{item.Skill}</span>
                      <span >{item.Years}</span>
                      </div>
                    ))}
                  </span>
                  <span>
                    <i className="fa-thin fa-location-dot"></i>
                    {job.Location}
                  </span>
                  <span>
                    <i className="fa-thin fa-money-bill-1"></i>
                    ${job.ExpectedSalary}
                  </span>
                  <span>
                    <i className="fa-thin fa-clock"></i>
                    {job.JobType}
                  </span>
                </div>
              </div>
              <div className="jm-latest-job-layout-3-submit">
              <Link to="/singleJobDetals" state={job}>Apply now</Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AllJobsList;
