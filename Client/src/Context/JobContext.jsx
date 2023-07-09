import React, { createContext, useEffect, useState } from 'react';



const JobContext = createContext();

const JobContextProvider = ({ children }) => {
 
  const [jobs, setJobs] = useState([]);
  const [job, setJob] = useState(null);
  const [candidate, setCandidate] = useState(null);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const [sidePanelOpen, setSidePanelOpen] = useState(false);

  const handleOpen = () => {
    setSidePanelOpen(true);
  };

  const handleClose = () => {
    setSidePanelOpen(false);
  };
  

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    let timeoutId;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsSticky(window.scrollY > 0);
      }, 200); 
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);
const [filteredJobs, setFilteredJobs] = useState(jobs);

  const filterJobsByTime = (selectedTimes) => {
    if (selectedTimes.length === 0) {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter((job) => selectedTimes.includes(job.jobTime));
      setFilteredJobs(filtered);
    }
  };
  const [selectedTimes, setSelectedTimes] = useState([]);

  const handleJobTimeSelect = (event) => {
    const { value, checked } = event.target;
    let updatedTimes = [...selectedTimes];

    if (checked) {

      updatedTimes.push(value);
    } else {

      updatedTimes = updatedTimes.filter((time) => time !== value);
    }

    setSelectedTimes(updatedTimes);
    filterJobsByTime(updatedTimes);
  };

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const [selectedJobType, setSelectedJobType] = useState('');

  const handleJobTypeChange = (event) => {
    setSelectedJobType(event.target.value);
  };

  const filteredEmployer = jobs.filter(
    (job) => selectedJobType === '' || job.jobTime === selectedJobType
  );



  return (
    <JobContext.Provider value={{ 
      isFormOpen, 
      handleOpenForm, 
      handleCloseForm,
      isSticky, 
      filteredJobs, 
      filterJobsByTime,
      handleJobTimeSelect,
      showModal,
      handleCloseModal,
      handleOpenModal,
      handleJobTypeChange,
      filteredEmployer,
      selectedJobType,
      sidePanelOpen,
      handleOpen,
      handleClose,
      jobs,
      setJobs,
      job,
      setJob,
      candidate,
      setCandidate
      }}>
      {children}
    </JobContext.Provider>
  );
};

export { JobContext, JobContextProvider };
