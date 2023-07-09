import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../../Data/URL";
import { JobContext } from "../../Context/JobContext";
import { skills } from "../../Data/JobsData";

const JobSearchList = () => {
  const { setCandidate } = useContext(JobContext);
  const [candidates, setCandidates] = useState([]);
  const navigate = useNavigate();
  const [base64Photos, setBase64Photos] = useState([]);

  useEffect(() => {
    const fetchCandidatesFromDatabase = async () => {
      try {
        const response = await fetch(URL + "Candidates/GetAllCandidates");
        const data = await response.json();
        console.log(data);
        setCandidates(data);
      } catch (error) {
        console.error(error);
        setCandidates([]);
      }
    };

    fetchCandidatesFromDatabase();
  }, []);

  useEffect(() => {
    const fetchPhotos = async () => {
      const base64PhotosArray = await Promise.allSettled(
        candidates.map(async (candidate) => {
          const base64String = await fetchPhotoData(candidate.Resume.PhotoFile);
          return base64String;
        })
      );
      setBase64Photos(
        base64PhotosArray.map((result) =>
          result.status === "fulfilled" ? result.value : null
        )
      );
    };

    fetchPhotos();
  }, [candidates]);

  const fetchPhotoData = async (logo) => {
    if (logo) {
      try {
        const base64String = logo;
        const byteArray = new Uint8Array(base64String.length);
        for (let i = 0; i < base64String.length; i++) {
          byteArray[i] = base64String.charCodeAt(i);
        }
        return base64String;
      } catch (error) {
        console.error(error);
      }
    }

    return null;
  };

  const handleJobClick = (candidate) => {
    setCandidate(candidate);
    navigate("/singleCandidate");
  };

  return (
    <div className="jm-jobs-search-under-hero">
      {candidates && candidates.map((candidate, index) => (
        <div className="col-xl-12" key={candidate.Id}>
          <div className="jm-latest-job-layout-3 jm-candidate-layout-list">
            <div className="jm-latest-job-layout-3-wrapper">
              <div className="jm-latest-job-layout-3-info">
                <div className="jm-latest-job-item-logo-3 y_img"></div>
                <div className="jm-latest-job-layout-3-img">
                  {base64Photos[index] ? (
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "white",
                        borderRadius: "50%",
                      }}
                      src={`data:image/jpeg;base64,${base64Photos[index]}`}
                      alt="img"
                      onClick={() => handleJobClick(candidate)}
                    />
                  ) : (
                    <div className="placeholder-image">No profile Picture </div>
                  )}
                </div>
                <span className="jm-candidate-list-designation">
                  {candidate.Designation}
                </span>
                <h4 className="jm-latest-job-layout-3-info-title">
                  <Link to="/candidateDetailsPage">{`${candidate.FirstName} ${candidate.LastName}`}</Link>
                  <span className="jm-candidate-rating">
                    <i className="fa-thin fa-star"></i> {candidate.Rating}
                  </span>
                </h4>
                <div className="jm-latest-job-layout-3-info-meta">
                  {candidate.SkillAndExperience && (
                    <span>
                      <i className="fa-thin fa-tags"></i>
                      {candidate.SkillAndExperience.map((item) => (
                        <div key={item.Id}>
                          <span>{skills[item.Skill].name}</span>
                          <span>{item.Years}</span>
                        </div>
                      ))}
                    </span>
                  )}
                  <span>
                    <i className="fa-thin fa-location-dot"></i>
                    {candidate.Resume.Location}
                  </span>
                  <span>
                    <i className="fa-thin fa-briefcase"></i>
                    {candidate.Resume.ProfessionalTitle}
                  </span>
                </div>
              </div>
              <button
                to="#"
                onClick={() => handleJobClick(candidate)}
                className="jm-latest-job-layout-3-btn"
              >
                View Profile
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobSearchList;
