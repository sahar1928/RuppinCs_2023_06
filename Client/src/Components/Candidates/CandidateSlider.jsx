import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import { Link, useNavigate } from 'react-router-dom';
import { URL } from '../../Data/URL';
const CandidateSlider = () => {
    const [slides, setSlides] = useState(0);
    const setSlidesPerView = () => {
        setSlides(
            window.innerWidth <= 468
                ? 1
                : window.innerWidth <= 768
                    ? 2
                    : window.innerWidth <= 1000
                        ? 3
                        : window.innerWidth > 1000
                            ? 4
                            : 0
        );
    };

    const [candidates, setCandidates] = useState([]);
    const navigate = useNavigate();
    const [base64Photos, setBase64Photos] = useState([]);

    useEffect(() => {
        const fetchCandidatesFromDatabase = async () => {
            try {
                const response = await fetch(URL + 'Candidates/GetAllCandidates');
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
                base64PhotosArray.map((result) => (result.status === 'fulfilled' ? result.value : null))
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
        navigate('/CandidateProfile', { state: { candidate } });
    };

    useEffect(() => {
        //Initially set the amount of slides on page load
        setSlidesPerView();
        // Add the event listener on component mount
        window.addEventListener('resize', setSlidesPerView);

        // Remove the listener when component unmounts
        return () => {
            window.removeEventListener('resize', setSlidesPerView);
        };
    }, []);

    return (
        <div className="row jm-team-area-2">
            <div className="col-xl-12">
                <div className="jm-candidate-wrapper jm-team-wrap-2">
                    <Swiper
                        slidesPerView={slides}
                        effect="slide"
                        spaceBetween={25}
                        centeredSlides={false}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                        className="jm-team-active-2"
                    >
                        {candidates.map((candidate, index) => (
                            <SwiperSlide className="swiper-slide" key={candidate.Id}>
                                <div className="team-item-jm">
                                    <div className="team-img-jm w_img">
                                        <div >
                                            {base64Photos[index] && !base64Photos[index].includes(("cGhv")) ? (
                                                <img
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        backgroundColor: 'white',
                                                    }}
                                                    src={`data:image/jpeg;base64,${base64Photos[index]}`}
                                                    alt="img"
                                                    onClick={() => handleJobClick(candidate)}
                                                />
                                            ) : (
                                                <div><img src="src/Components/Candidates/NoImage.jpeg"></img></div>
                                            )}
                                        </div>
                                        <div className="preyantechnosys-team-icon">
                                            <Link to="#">
                                                <i className="fa-light fa-share-nodes"></i>
                                            </Link>
                                            <div className="preyantechnosys-box-social-links">
                                                <div className="prt-team-social-links-wrapper">
                                                    <ul className="prt-team-social-links">
                                                        <li>
                                                            <Link to="#" target="_blank">
                                                                <i className="fa-brands fa-facebook-f"></i>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to="#" target="_blank">
                                                                <i className="fa-brands fa-twitter"></i>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to="#" target="_blank">
                                                                <i className="fa-brands fa-linkedin-in"></i>
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="team-content-jm">
                                        <h5 className="team-content-title-jm">
                                            <Link to="/candidateDetailsPage">{candidate.Resume.FullName}</Link>
                                        </h5>
                                        <span className="team-content-subtitle-jm">
                                            {candidate.position}
                                        </span>
                                        <div className="middle-content-jm">
                                            <ul className="list-jm">
                                                <li>
                                                    <span className="list-jm-work">Work Exp:</span>{' '}
                                                    {candidate.workExp}
                                                </li>
                                                <li>
                                                    <span className="list-jm-work">Loc:</span>{' '}
                                                    {candidate.Resume.Location}
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="btn-box-jm">
                                            <Link
                                                className="read-more theme-btn-jm"
                                                to="/candidateDetailsPage"
                                            >
                                                View Profile{' '}
                                                <i className="fa-light fa-arrow-right-long"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}


export default CandidateSlider;