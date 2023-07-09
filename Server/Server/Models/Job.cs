using Server.Models.enums;
using System.Collections.Generic;

namespace Server.Models
{
    public class Job
    {
        public Job() { }
        public Job(int id, string jobTitle, string emailUrl, string location, JobType jobType, JobCategory jobCategory, int expectedSalary, List<SkillAndExperience> skillAndExperience, string jobDescription, int companyId)
        {
            Id = id;
            JobTitle = jobTitle;
            EmailUrl = emailUrl;
            Location = location;
            JobType = jobType;
            JobCategory = jobCategory;
            ExpectedSalary = expectedSalary;
            SkillAndExperience = skillAndExperience;
            CompanyId = companyId;
            JobDescription = jobDescription;
        }

        public int Id { get; set; }
        public string JobTitle { get; set; }
        public string EmailUrl { get; set; }
        public string Location { get; set; }
        public JobType JobType { get; set; }
        public JobCategory JobCategory { get; set; }
        public int ExpectedSalary { get; set; }
        public List<SkillAndExperience> SkillAndExperience { get; set; }
        public string JobDescription { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }

    }



}