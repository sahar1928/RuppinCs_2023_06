import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { URL } from '../../Data/URL';
import CompanyLocation from '../Location/CompanyLocation';

const CompanyViewer = ({ company }) => {
  const [base64Photos, setBase64Photos] = useState([]);
  const [base64Photo, setBase64Photo] = useState();
  const [mimeType, setMimeType] = useState(null);
  const [jobs, setJobs] = useState([]);

  const {
    Id,
    User,
    EmailUrl,
    Name,
    Location,
    Website,
    SocialMedia,
    Description,
    Logo,
  } = company;

  const {
    LinkedinURL,
    TwitterURL,
    FacebookURL,
    PinterestURL,
    InstagramURL,
  } = SocialMedia;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          URL + 'Jobs/GetAllCompanyJobs/' + parseInt(Id),
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Request failed');
        }

        const data = await response.json();
        console.log(data);
        setJobs(data);

        if (response.ok) {
          fetchPhotos();
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchJobs();
  }, [Id]);

  const fetchPhotos = async () => {
    const base64Photo = await fetchPhotoData(Logo);
    const base64PhotosArray = await Promise.all(
      jobs.map((job) => fetchPhotoData(job.Company.Logo))
    );

    setBase64Photo(base64Photo);
    setBase64Photos(base64PhotosArray);
  };

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

    return null;
  };

  const determineMimeType = (byteArray) => {
    const signature = byteArray
      .slice(0, 4)
      .map((byte) => byte.toString(16))
      .join('')
      .toUpperCase();

    if (signature === '89504E47') {
      return 'image/png';
    } else if (signature === 'FFD8FFDB' || signature === 'FFD8FFE0') {
      return 'image/jpeg';
    } else {
      // Default to JPEG if the signature doesn't match PNG or JPEG
      return 'image/jpeg';
    }
  };

  return (
    <div className="jm-candidate-area pt-100 pb-60">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 order-1 order-lg-0">
            <div className="jm-candidate-author-wrapper mr-25 mb-40">
              <div className="jm-candidate-avater-portion jm-company-logo">
                {base64Photo && (
                  <img
                    src={`data:${mimeType};base64,${base64Photo}`}
                    alt="Company Logo"
                  />
                )}
                <h4 className="jm-candidate-avater-name">{Name}</h4>
                <span className="jm-candidate-designation">{Description}</span>
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
                <h4 className="jm-candidate-profile-overview-title">Company Overview</h4>
                <ul className="jm-job-sidebar-review-list mb-15">
                  <li>
                    <i className="fa-thin fa-user"></i>{' '}
                    <span className="jm-job-review-label">Owners : </span>{' '}
                    <span className="job-review-value">Sahar and Lidor</span>
                  </li>
                  <li>
                    <i className="fa-light fa-transgender"></i>{' '}
                    <span className="jm-job-review-label">Gender : </span>{' '}
                    <span className="job-review-value">Males</span>
                  </li>
                  <li>
                    <i className="fa-thin fa-users"></i>{' '}
                    <span className="jm-job-review-label">Employees : </span>{' '}
                    <span className="job-review-value">150-250</span>
                  </li>
                  <li>
                    <i className="fa-thin fa-building"></i>{' '}
                    <span className="jm-job-review-label">Industry : </span>{' '}
                    <span className="job-review-value">Private</span>
                  </li>
                  <li>
                    <i className="fa-thin fa-globe"></i>{' '}
                    <span className="jm-job-review-label">Website : </span>{' '}
                    <Link
                      target="_blank"
                      to={Website}
                      className="job-review-value"
                    >
                      {Website}
                    </Link>
                  </li>
                  <li>
                    <i className="fa-thin fa-location-crosshairs"></i>{' '}
                    <span className="jm-job-review-label">Location : </span>{' '}
                    <span className="job-review-value">{Location}</span>
                  </li>
                  <li>
                    <i className="fa-thin fa-star-sharp-half-stroke"></i>{' '}
                    <span className="jm-job-review-label">Established : </span>{' '}
                    <span className="job-review-value">04 July, 2023</span>
                  </li>
                </ul>
                <div className="jm-candidate-profile-buttons mt-25">
                  <Link to="#" className="jm-candidate-d-btn">
                    <i className="fa-thin fa-phone"></i>Contact Us</Link>
                </div>
              </div>
              <div className="jm-candidate-profile-overview-portion">
                <h4 className="jm-candidate-profile-overview-title">Working Days</h4>
                <ul className="jm-job-sidebar-working-daylist">
                  <li>
                    <span className="jm-job-working-daylist-label">Saturday : </span>{' '}
                    <span className="jm-job-working-daylist-value">10am - 6pm</span>
                  </li>
                  <li>
                    <span className="jm-job-working-daylist-label">Sunday : </span>{' '}
                    <span className="jm-job-working-daylist-value">10am - 6pm</span>
                  </li>
                  <li>
                    <span className="jm-job-working-daylist-label">Monday : </span>{' '}
                    <span className="jm-job-working-daylist-value">10am - 6pm</span>
                  </li>
                  <li>
                    <span className="jm-job-working-daylist-label">Tuesday : </span>{' '}
                    <span className="jm-job-working-daylist-value">10am - 6pm</span>
                  </li>
                  <li>
                    <span className="jm-job-working-daylist-label">Wednesday : </span>{' '}
                    <span className="jm-job-working-daylist-value">10am - 6pm</span>
                  </li>
                  <li>
                    <span className="jm-job-working-daylist-label">Thursday : </span>{' '}
                    <span className="jm-job-working-daylist-value">10am - 6pm</span>
                  </li>
                  <li>
                    <span className="jm-job-working-daylist-label">Friday : </span>{' '}
                    <span className="jm-job-working-daylist-value">Close</span>
                  </li>
                </ul>
              </div>
              <div className="jm-candidate-profile-overview-portion">
                <h4 className="jm-candidate-profile-overview-title">Company Location</h4>
                <CompanyLocation selectedCity={Location} />
              </div>
            </div>
          </div>
          <div className="col-lg-8 order-0 order-lg-1">
            <div className="jm-company-offer-jobs">
              <h4 className="jm-company-offer-title">Current Offering Positions</h4>
              <div className="row jm-company-offer-jobs-wrapper">
                {jobs.map((job) => (
                  <div className="col-xl-12" key={job.Id}>
                    <div className="jm-latest-job-layout-3">
                      <div className="jm-latest-job-layout-3-wrapper">
                        <div className="jm-latest-job-layout-3-img">
                          {base64Photo && (
                            <img
                              src={`data:${mimeType};base64,${base64Photo}`}
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
                              {job.JobType === 0 ? 'Full Time' : 'Part Time'}
                            </span>
                          </div>
                        </div>
                        <div className="jm-latest-job-layout-3-submit">
                          <Link to="/postJobPage" className="jm-latest-job-layout-3-btn">
                            Apply Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyViewer;
