import React, { useEffect, useContext, useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { JobContext } from "../../Context/JobContext";

const AccordionSection = () => {
  const { job } = useContext(JobContext);
  const [currentJob, setCurrentJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      setCurrentJob(job);

    };
    fetchJob();
  }, [job]);

  return (
    <div className="accordion-section mb-30">
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div>Job Description</div>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            As a UI Designer, you will work within a Design Delivery Team fused
            with UX, engineering, product, and data talent. You will help the
            team design beautiful interfaces that solve business challenges for
            our clients. We work with a number of Tier 1 banks on building
            web-based applications for AML, KYC, and Sanctions List management
            workflows. This role is ideal if you are looking to segue your
            career into the FinTech or Big Data arenas.
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionDetails>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccordionSection;
