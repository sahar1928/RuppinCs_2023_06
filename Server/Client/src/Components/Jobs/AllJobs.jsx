import React, { useContext,useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { JobContext } from '../../Context/JobContext';

const AllJobs = () => {
const  {setJob} = useContext(JobContext);
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
    <div className="row justify-content-center">
      {jobs.map((job) => (
        <div className="col-xl-6 col-lg-10" key={job.Id}>
          <div className="jm-latest-job-item-3 mb-30">
            <div className="jm-latest-job-item-top-3">
              <div className="jm-latest-job-item-top-wrap-3">
                <div className="jm-latest-job-item-logo-3 y_img">
                  <Link to="/jobDetailsPage" >
                    <img src={job.Company.Logo} alt="Company Logo" />
                  </Link>
                </div>
                <div className="jm-latest-job-item-info-3">
                  <h3 className="jm-latest-job-item-info-title-3">
                    <Link to="/jobDetailsPage">{job.JobTitle}</Link>
                  </h3>
                  <Link to="#" className="jm-latest-job-item-info-subtitle-3">
                    {job.Company.Name}
                  </Link>
                  <div className="jm-latest-job-meta-wrapper">
                    <Link to="#">{job.JobType}</Link>
                    {job.SkillAndExperience.map((item) => (
                      <Link to="#" key={item.Id}>
                        {item.Skill}
                        {item.Years}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="jm-latest-job-item-btn-3">
              <div className="jm-latest-job-layout-3-submit">
              <Link to="/singleJobDetals" state={job}>Apply now</Link>
              </div>
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
                  <i className="fa-thin fa-money-bill-1"></i>${job.ExpectedSalary}
                </span>
              </div>
              <div className="jm-latest-job-item-duration-3 jm-latest-job-common">
                <span>
                  <i className="fa-thin fa-clock"></i>
                  {job.JobCategory}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllJobs;
