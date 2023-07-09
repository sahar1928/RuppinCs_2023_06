using Server.Models;
using Server.Models.enums;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System.Web.Http;

namespace Server.Controllers
{
    public class JobsController : ApiController
    {
        [HttpPost]
        public async Task<IHttpActionResult> CreateJob(Job job)
        {
            try
            {
                int jobId = await SaveJobAsync(job);
                await SaveSkillAndExperienceAsync(job.SkillAndExperience, jobId);

                return Ok(new { JobId = jobId });
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        private async Task<int> SaveJobAsync(Job job)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
            using (var connection = new SqlConnection(connectionString))
            {
                await connection.OpenAsync();

                using (var command = new SqlCommand("INSERT INTO Job (JobTitle, EmailUrl, Location, JobType, JobCategory, ExpectedSalary, JobDescription, CompanyId) " +
                                                    "VALUES (@JobTitle, @EmailUrl, @Location, @JobType, @JobCategory, @ExpectedSalary, @JobDescription, @CompanyId);" +
                                                    "SELECT SCOPE_IDENTITY()", connection))
                {
                    command.Parameters.AddWithValue("@JobTitle", job.JobTitle);
                    command.Parameters.AddWithValue("@EmailUrl", job.EmailUrl);
                    command.Parameters.AddWithValue("@Location", job.Location);
                    command.Parameters.AddWithValue("@JobType", job.JobType.ToString());
                    command.Parameters.AddWithValue("@JobCategory", job.JobCategory.ToString());
                    command.Parameters.AddWithValue("@ExpectedSalary", job.ExpectedSalary);
                    command.Parameters.AddWithValue("@JobDescription", job.JobDescription);
                    command.Parameters.AddWithValue("@CompanyId", job.CompanyId);

                    return Convert.ToInt32(await command.ExecuteScalarAsync());
                }
            }
        }

        private async Task SaveSkillAndExperienceAsync(List<SkillAndExperience> skillAndExperienceList, int jobId)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
            using (var connection = new SqlConnection(connectionString))
            {
                await connection.OpenAsync();

                using (var command = new SqlCommand("INSERT INTO SkillAndExperience (JobId, Skill, Years) VALUES (@JobId, @Skill, @Years)", connection))
                {
                    foreach (var skillAndExperience in skillAndExperienceList)
                    {
                        command.Parameters.Clear();
                        command.Parameters.AddWithValue("@JobId", jobId);
                        command.Parameters.AddWithValue("@Skill", skillAndExperience.Skill.ToString());
                        command.Parameters.AddWithValue("@Years", skillAndExperience.Years);

                        await command.ExecuteNonQueryAsync();
                    }
                }
            }
        }

        [HttpPut]
        public async Task<IHttpActionResult> UpdateJob(int jobId, [FromBody] Job job)
        {
            if (job == null)
            {
                return BadRequest("Invalid job object.");
            }

            var connectionString = ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
            using (var connection = new SqlConnection(connectionString))
            {
                await connection.OpenAsync();

                using (SqlCommand command = connection.CreateCommand())
                {
                    command.CommandText = "UPDATE Jobs SET " +
                                          "JobTitle = @JobTitle, " +
                                          "EmailUrl = @EmailUrl, " +
                                          "Location = @Location, " +
                                          "JobType = @JobType, " +
                                          "JobCategory = @JobCategory, " +
                                          "ExpectedSalary = @ExpectedSalary, " +
                                          "CompanyId = @CompanyId " +
                                          "WHERE Id = @JobId";

                    command.Parameters.AddWithValue("@JobTitle", job.JobTitle);
                    command.Parameters.AddWithValue("@EmailUrl", job.EmailUrl);
                    command.Parameters.AddWithValue("@Location", job.Location);
                    command.Parameters.AddWithValue("@JobType", job.JobType);
                    command.Parameters.AddWithValue("@JobCategory", job.JobCategory);
                    command.Parameters.AddWithValue("@ExpectedSalary", job.ExpectedSalary);
                    command.Parameters.AddWithValue("@CompanyId", job.CompanyId);
                    command.Parameters.AddWithValue("@JobId", jobId);

                    int rowsAffected = await command.ExecuteNonQueryAsync();

                    if (rowsAffected == 0)
                    {
                        return NotFound();
                    }
                }
            }

            return Ok("Job updated successfully");
        }

        [HttpDelete]
        public async Task<IHttpActionResult> RemoveJob(int jobId)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
            using (var connection = new SqlConnection(connectionString))
            {
                await connection.OpenAsync();

                using (SqlCommand command = connection.CreateCommand())
                {
                    command.CommandText = "DELETE FROM Jobs WHERE Id = @JobId";
                    command.Parameters.AddWithValue("@JobId", jobId);

                    int rowsAffected = await command.ExecuteNonQueryAsync();

                    if (rowsAffected == 0)
                    {
                        return NotFound();
                    }
                }
            }

            return Ok("Job removed successfully");
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetJobCategories()
        {
            List<string> jobCategories = new List<string>();

            var connectionString = ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
            using (var connection = new SqlConnection(connectionString))
            {
                await connection.OpenAsync();

                using (SqlCommand command = connection.CreateCommand())
                {
                    command.CommandText = "SELECT DISTINCT JobCategory FROM Jobs";

                    using (SqlDataReader reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            string jobCategory = reader.GetString(0);
                            jobCategories.Add(jobCategory);
                        }
                    }
                }
            }

            return Ok(jobCategories);
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetJobTypes()
        {
            List<string> jobTypes = new List<string>();

            var connectionString = ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
            using (var connection = new SqlConnection(connectionString))
            {
                await connection.OpenAsync();

                using (SqlCommand command = connection.CreateCommand())
                {
                    command.CommandText = "SELECT DISTINCT JobType FROM Jobs";

                    using (SqlDataReader reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            string jobType = reader.GetString(0);
                            jobTypes.Add(jobType);
                        }
                    }
                }
            }

            return Ok(jobTypes);
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetAllJobs()
        {
            try
            {
                List<Job> jobs = await RetrieveAllJobsAsync();

                foreach (Job job in jobs)
                {
                    Company company = await RetrieveCompanyByIdAsync(job.CompanyId);
                    company.SocialMedia = await RetrieveSocialMediaAsync(company.SocialMediaId);
                    List<SkillAndExperience> skillsAndExperience = await GetSkillsAndExperiences(job.Id);
                    job.SkillAndExperience = skillsAndExperience;

                    job.Company = company;
                }

                return Ok(jobs);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/Jobs/GetAllCompanyJobs/{companyId}")]
        public async Task<IHttpActionResult> GetAllCompanyJobs(int companyId)
        {
            try
            {
                List<Job> jobs = await RetrieveAllCompanyJobs(companyId);

                foreach (Job job in jobs)
                {
                    Company company = await RetrieveCompanyByIdAsync(companyId);
                    company.SocialMedia = await RetrieveSocialMediaAsync(company.SocialMediaId);
                    List<SkillAndExperience> skillsAndExperience = await GetSkillsAndExperiences(job.Id);
                    job.SkillAndExperience = skillsAndExperience;
                    job.Company = company;
                }

                return Ok(jobs);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        private async Task<List<Job>> RetrieveAllJobsAsync()
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
            using (var connection = new SqlConnection(connectionString))
            {
                await connection.OpenAsync();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "SELECT * FROM Job";

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        List<Job> jobs = new List<Job>();

                        while (await reader.ReadAsync())
                        {
                            Job job = new Job
                            {
                                Id = (int)reader["Id"],
                                JobTitle = reader["JobTitle"].ToString(),
                                EmailUrl = reader["EmailUrl"].ToString(),
                                Location = reader["Location"].ToString(),
                                JobType = (JobType)Enum.Parse(typeof(JobType), reader["JobType"].ToString()),
                                JobCategory = (JobCategory)Enum.Parse(typeof(JobCategory), reader["JobCategory"].ToString()),
                                ExpectedSalary = (int)reader["ExpectedSalary"],
                                CompanyId = (int)reader["CompanyId"],
                                JobDescription = reader["JobDescription"].ToString()
                            };

                            jobs.Add(job);
                        }

                        return jobs;
                    }
                }
            }
        }

        private async Task<List<Job>> RetrieveAllCompanyJobs(int companyId)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
            using (var connection = new SqlConnection(connectionString))
            {
                await connection.OpenAsync();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "SELECT * FROM Job WHERE CompanyId = @CompanyId ";
                    command.Parameters.AddWithValue("@CompanyId", companyId);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        List<Job> jobs = new List<Job>();

                        while (await reader.ReadAsync())
                        {
                            Job job = new Job
                            {
                                Id = (int)reader["Id"],
                                JobTitle = reader["JobTitle"].ToString(),
                                EmailUrl = reader["EmailUrl"].ToString(),
                                Location = reader["Location"].ToString(),
                                JobType = (JobType)Enum.Parse(typeof(JobType), reader["JobType"].ToString()),
                                JobCategory = (JobCategory)Enum.Parse(typeof(JobCategory), reader["JobCategory"].ToString()),
                                ExpectedSalary = (int)reader["ExpectedSalary"],
                                CompanyId = (int)reader["CompanyId"],
                                JobDescription = reader["JobDescription"].ToString()
                            };

                            jobs.Add(job);
                        }

                        return jobs;
                    }
                }
            }
        }

        private async Task<Company> RetrieveCompanyByIdAsync(int companyId)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
            using (var connection = new SqlConnection(connectionString))
            {
                await connection.OpenAsync();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "SELECT * FROM Company WHERE Id = @CompanyId";
                    command.Parameters.AddWithValue("@CompanyId", companyId);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            Company company = new Company
                            {
                                Id = (int)reader["Id"],
                                EmailUrl = (string)reader["EmailUrl"],
                                Name = (string)reader["Name"],
                                Website = (string)reader["Website"],
                                Description = (string)reader["Description"],
                                Logo = (byte[])reader["Logo"],
                                SocialMediaId = (int)reader["SocialMediaId"],
                                UserId = (int)reader["UserId"],
                                PhoneNumber = (string)reader["PhoneNumber"]
                            };

                            return company;
                        }
                    }
                }
            }

            return null;
        }

        private async Task<SocialMedia> RetrieveSocialMediaAsync(int socialMediaId)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
            using (var connection = new SqlConnection(connectionString))
            {
                await connection.OpenAsync();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "SELECT * FROM SocialMedia WHERE Id = @SocialMediaId";
                    command.Parameters.AddWithValue("@SocialMediaId", socialMediaId);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            SocialMedia socialMedia = new SocialMedia
                            {
                                LinkedinURL = reader["LinkedinURL"].ToString(),
                                TwitterURL = reader["TwitterURL"].ToString(),
                                FacebookURL = reader["FacebookURL"].ToString(),
                                PinterestURL = reader["PinterestURL"].ToString(),
                                InstagramURL = reader["InstagramURL"].ToString()
                            };

                            return socialMedia;
                        }
                    }
                }
            }

            return null;
        }

        private async Task<List<SkillAndExperience>> GetSkillsAndExperiences(int jobId)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
            using (var connection = new SqlConnection(connectionString))
            {
                await connection.OpenAsync();

                using (var command = new SqlCommand("SELECT Id, Skill, JobId, Years FROM SkillAndExperience WHERE JobId = @JobId", connection))
                {
                    command.Parameters.AddWithValue("@JobId", jobId);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        List<SkillAndExperience> skillsAndExperiences = new List<SkillAndExperience>();
                        while (await reader.ReadAsync())
                        {
                            skillsAndExperiences.Add(new SkillAndExperience
                            {
                                Id = (int)reader["Id"],
                                Skill = (SkillType)Enum.Parse(typeof(SkillType), reader["Skill"].ToString()),
                                JobId = (int)reader["JobId"],
                                Years = (int)reader["Years"]
                            });
                        }

                        return skillsAndExperiences;
                    }
                }
            }
        }
    }
}
