using Server.Models;
using Server.Models.enums;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Web.Http;

namespace Server.Controllers
{
    public class CandidatesController : ApiController
    {
        [HttpPost]
        public IHttpActionResult CandidateSignUp(Candidate candidate)
        {
            try
            {
                int userId = SaveUser(candidate.User);
                int socialMediaId = SaveSocialMedia(candidate.SocialMedia);
                int resumeId = SaveResume(candidate.Resume, socialMediaId);
                int candidateId = SaveCandidate(candidate, resumeId, socialMediaId, userId);

                SaveEducation(candidate.Resume, resumeId);
                SaveExperience(candidate.Resume, resumeId);
                SaveSkillAndExperience(candidate.SkillAndExperience, candidateId);

                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        private int SaveSocialMedia(SocialMedia socialMedia)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (var command = new SqlCommand("INSERT INTO SocialMedia (LinkedinURL, TwitterURL, FacebookURL, PinterestURL, InstagramURL) " +
                                                    "VALUES (@LinkedinURL, @TwitterURL, @FacebookURL, @PinterestURL, @InstagramURL);" +
                                                    "SELECT SCOPE_IDENTITY()", connection))
                {
                    command.Parameters.AddWithValue("@LinkedinURL", socialMedia.LinkedinURL);
                    command.Parameters.AddWithValue("@TwitterURL", socialMedia.TwitterURL);
                    command.Parameters.AddWithValue("@FacebookURL", socialMedia.FacebookURL);
                    command.Parameters.AddWithValue("@PinterestURL", socialMedia.PinterestURL);
                    command.Parameters.AddWithValue("@InstagramURL", socialMedia.InstagramURL);

                    return Convert.ToInt32(command.ExecuteScalar());
                }
            }
        }

        private void SaveSkillAndExperience(List<SkillAndExperience> skillAndExperienceList, int candidateId)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (var command = new SqlCommand("INSERT INTO SkillAndExperience (CandidateId, Skill, Years) VALUES (@CandidateId, @Skill, @Years)", connection))
                {
                    foreach (var skillAndExperience in skillAndExperienceList)
                    {
                        command.Parameters.Clear();
                        command.Parameters.AddWithValue("@Skill", skillAndExperience.Skill.ToString());
                        command.Parameters.AddWithValue("@Years", skillAndExperience.Years);
                        command.Parameters.AddWithValue("@CandidateId", candidateId);

                        command.ExecuteNonQuery();
                    }
                }
            }
        }



        private int SaveResume(Resume resume, int socialMediaId)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "INSERT INTO Resume (FullName, Email, ProfessionalTitle, Location, Date, ResumeCategory, SocialMediaId, PhotoFile, ResumeFile) " +
                                          "VALUES (@FullName, @Email, @ProfessionalTitle, @Location, CONVERT(date, @Date, 103), @ResumeCategory, @SocialMediaId, @PhotoFile, @ResumeFile);" +
                                          "SELECT SCOPE_IDENTITY()";

                    command.Parameters.AddWithValue("@FullName", resume.FullName);
                    command.Parameters.AddWithValue("@Email", resume.Email);
                    command.Parameters.AddWithValue("@ProfessionalTitle", resume.ProfessionalTitle);
                    command.Parameters.AddWithValue("@Location", resume.Location);
                    command.Parameters.AddWithValue("@Date", DateTime.Parse(resume.Date));
                    command.Parameters.AddWithValue("@ResumeCategory", resume.ResumeCategory);
                    command.Parameters.AddWithValue("@SocialMediaId", socialMediaId);
                    command.Parameters.AddWithValue("@PhotoFile", resume.PhotoFile);
                    command.Parameters.AddWithValue("@ResumeFile", resume.ResumeFile);

                    return Convert.ToInt32(command.ExecuteScalar());
                }
            }
        }

        private int SaveCandidate(Candidate candidate, int resumeId, int socialMediaId, int userId)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "INSERT INTO Candidate (EmailUrl, FirstName, LastName, DateOfBirth, Gender, ResumeId, SocialMediaId, UserId, ProfessionalTitle,PhoneNumber) " +
                                          "VALUES (@EmailUrl, @FirstName, @LastName, @DateOfBirth, @Gender, @ResumeId, @SocialMediaId, @UserId, @ProfessionalTitle, @PhoneNumber);" +
                                          "SELECT SCOPE_IDENTITY()";

                    command.Parameters.AddWithValue("@EmailUrl", candidate.EmailUrl);
                    command.Parameters.AddWithValue("@FirstName", candidate.FirstName);
                    command.Parameters.AddWithValue("@LastName", candidate.LastName);
                    command.Parameters.AddWithValue("@DateOfBirth", DateTime.Parse(candidate.DateOfBirth));
                    command.Parameters.AddWithValue("@Gender", candidate.Gender);
                    command.Parameters.AddWithValue("@ResumeId", resumeId);
                    command.Parameters.AddWithValue("@SocialMediaId", socialMediaId);
                    command.Parameters.AddWithValue("@UserId", userId);
                    command.Parameters.AddWithValue("@ProfessionalTitle", candidate.ProfessionalTitle.ToString());
                    command.Parameters.AddWithValue("@PhoneNumber", candidate.PhoneNumber);

                    return Convert.ToInt32(command.ExecuteScalar());
                }
            }
        }

        private int SaveUser(User user)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "INSERT INTO Users (Username, Password, UserType) " +
                                          "VALUES (@Username, @Password, @UserType);" +
                                          "SELECT SCOPE_IDENTITY()";

                    command.Parameters.AddWithValue("@Username", user.Username);
                    command.Parameters.AddWithValue("@Password", user.Password);
                    command.Parameters.AddWithValue("@UserType", user.UserType.ToString());

                    return Convert.ToInt32(command.ExecuteScalar());
                }
            }
        }

        private void SaveEducation(Resume resume, int resumeId)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                foreach (var education in resume.Educations)
                {
                    using (var command = connection.CreateCommand())
                    {
                        command.CommandText = "INSERT INTO Education (InstitutionName, Qualification, StartDate, EndDate, ResumeId) " +
                                              "VALUES (@InstitutionName, @Qualification, @StartDate, @EndDate, @ResumeId)";

                        command.Parameters.AddWithValue("@InstitutionName", education.InstitutionName);
                        command.Parameters.AddWithValue("@Qualification", education.Qualification);
                        command.Parameters.AddWithValue("@FieldOfStudy", education.FieldOfStudy);
                        command.Parameters.AddWithValue("@StartDate", DateTime.Parse(education.StartDate));
                        command.Parameters.AddWithValue("@EndDate", DateTime.Parse(education.EndDate));
                        command.Parameters.AddWithValue("@ResumeId", resumeId);

                        command.ExecuteNonQuery();
                    }
                }
            }
        }

        private void SaveExperience(Resume resume, int resumeId)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                foreach (var experience in resume.Experiences)
                {
                    using (var command = connection.CreateCommand())
                    {
                        command.CommandText = "INSERT INTO Experience (EmployerName, JobTitle, StartDate, EndDate, ResumeId) " +
                                              "VALUES (@EmployerName, @JobTitle, @StartDate, @EndDate, @ResumeId)";

                        command.Parameters.AddWithValue("@EmployerName", experience.EmployerName);
                        command.Parameters.AddWithValue("@JobTitle", experience.JobTitle);
                        command.Parameters.AddWithValue("@StartDate", DateTime.Parse(experience.StartDate));
                        command.Parameters.AddWithValue("@EndDate", DateTime.Parse(experience.EndDate));
                        command.Parameters.AddWithValue("@ResumeId", resumeId);

                        command.ExecuteNonQuery();
                    }
                }
            }
        }

        [HttpGet]
        [Route("api/Candidates/GetCandidate/{userId}")]
        public IHttpActionResult GetCandidate(int userId)
        {
            try
            {
                Candidate candidate = GetCandidateByUserId(userId);
                if (candidate == null)
                {
                    return NotFound();
                }

                Resume resume = GetResume(candidate.ResumeId);
                if (resume == null)
                {
                    return NotFound();
                }

                SocialMedia socialMedia = GetSocialMedia(candidate.SocialMediaId);
                if (socialMedia == null)
                {
                    return NotFound();
                }

                User candidateUser = GetUser(candidate.UserId);
                if (candidateUser == null)
                {
                    return NotFound();
                }


                List<Education> educations = GetEducations(candidate.ResumeId);
                List<Experience> experiences = GetExperiences(candidate.ResumeId);
                List<SkillAndExperience> skillAndExperince = GetSkillsAndExperiences(userId);

                candidate.Resume = resume;
                candidate.Resume.Educations = educations;
                candidate.Resume.Experiences = experiences;
                candidate.SocialMedia = socialMedia;
                candidate.User = candidateUser;
                candidate.SkillAndExperience = skillAndExperince;

                return Ok(candidate);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/Candidates/GetAllCandidates")]
        public List<Candidate> GetAllCandidatesFromDatabase()
        {
            List<Candidate> candidates = new List<Candidate>();

            var connectionString = ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                SqlCommand command = new SqlCommand("SELECT * FROM [dbo].[Candidate]", connection);
                SqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    Candidate candidate = new Candidate
                    {
                        Id = (int)reader["Id"],
                        EmailUrl = reader["EmailUrl"].ToString(),
                        FirstName = reader["FirstName"].ToString(),
                        LastName = reader["LastName"].ToString(),
                        DateOfBirth = reader["DateOfBirth"].ToString(),
                        Gender = (Gender)Enum.Parse(typeof(Gender), reader["Gender"].ToString()),
                        ResumeId = (int)reader["ResumeId"],
                        SocialMediaId = (int)reader["SocialMediaId"],
                        UserId = (int)reader["UserId"],
                        ProfessionalTitle = (ProfessionalTitle)Enum.Parse(typeof(ProfessionalTitle), reader["ProfessionalTitle"].ToString()),
                        PhoneNumber = reader["PhoneNumber"].ToString()

                    };
                    Resume resume = GetResume(candidate.ResumeId);
                    if (resume == null)
                    {
                        throw new Exception("No resumes found for the candidate.");
                    }

                    SocialMedia socialMedia = GetSocialMedia(candidate.SocialMediaId);
                    if (socialMedia == null)
                    {
                        throw new Exception("No social media found for the candidate.");
                    }

                    User candidateUser = GetUser(candidate.UserId);
                    if (candidateUser == null)
                    {
                        throw new Exception("User not found for the candidate.");
                    }

                    List<Education> educations = GetEducations(candidate.ResumeId);
                    List<Experience> experiences = GetExperiences(candidate.ResumeId);
                    List<SkillAndExperience> skillAndExperince = GetSkillsAndExperiences(candidate.Id);


                    candidate.Resume = resume;
                    candidate.Resume.Educations = educations;
                    candidate.Resume.Experiences = experiences;
                    candidate.SocialMedia = socialMedia;
                    candidate.User = candidateUser;
                    candidate.SkillAndExperience = skillAndExperince;

                    candidates.Add(candidate);
                }

                reader.Close();
            }

            return candidates;
        }

        private Candidate GetCandidateByUserId(int userId)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (var command = new SqlCommand("SELECT * FROM Candidate WHERE UserId = @UserId", connection))
                {
                    command.Parameters.AddWithValue("@UserId", userId);
                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new Candidate
                            {
                                Id = (int)reader["Id"],
                                EmailUrl = reader["EmailUrl"].ToString(),
                                FirstName = reader["FirstName"].ToString(),
                                LastName = reader["LastName"].ToString(),
                                DateOfBirth = reader["DateOfBirth"].ToString(),
                                Gender = (Gender)Enum.Parse(typeof(Gender), reader["Gender"].ToString()),
                                ResumeId = (int)reader["ResumeId"],
                                SocialMediaId = (int)reader["SocialMediaId"],
                                UserId = (int)reader["UserId"],
                                ProfessionalTitle = (ProfessionalTitle)Enum.Parse(typeof(ProfessionalTitle), reader["ProfessionalTitle"].ToString()),
                                PhoneNumber = reader["PhoneNumber"].ToString()

                            };
                        }
                    }
                }
            }
            return null;
        }

        private Resume GetResume(int resumeId)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (var command = new SqlCommand("SELECT * FROM Resume WHERE Id = @ResumeId", connection))
                {
                    command.Parameters.AddWithValue("@ResumeId", resumeId);
                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new Resume
                            {
                                FullName = reader["FullName"].ToString(),
                                Email = reader["Email"].ToString(),
                                ProfessionalTitle = reader["ProfessionalTitle"].ToString(),
                                Location = reader["Location"].ToString(),
                                Date = reader["Date"].ToString(),
                                ResumeCategory = (ResumeCategory)Enum.Parse(typeof(ResumeCategory), reader["ResumeCategory"].ToString()),
                                Skills = new List<SkillType>(),
                                SocialMedia = null,
                                PhotoFile = (byte[])reader["PhotoFile"],
                                Educations = new List<Education>(),
                                Experiences = new List<Experience>(),
                                ResumeFile = (byte[])reader["ResumeFile"]
                            };
                        }
                    }
                }
            }
            return null;
        }

        private SocialMedia GetSocialMedia(int socialMediaId)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (var command = new SqlCommand("SELECT * FROM SocialMedia WHERE Id = @SocialMediaId", connection))
                {
                    command.Parameters.AddWithValue("@SocialMediaId", socialMediaId);
                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new SocialMedia
                            {
                                LinkedinURL = reader["LinkedinURL"].ToString(),
                                TwitterURL = reader["TwitterURL"].ToString(),
                                FacebookURL = reader["FacebookURL"].ToString(),
                                PinterestURL = reader["PinterestURL"].ToString(),
                                InstagramURL = reader["InstagramURL"].ToString()
                            };
                        }
                    }
                }
            }
            return null;
        }

        private List<Education> GetEducations(int resumeId)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (var command = new SqlCommand("SELECT * FROM Education WHERE ResumeId = @ResumeId", connection))
                {
                    command.Parameters.AddWithValue("@ResumeId", resumeId);
                    using (var reader = command.ExecuteReader())
                    {
                        List<Education> educations = new List<Education>();
                        while (reader.Read())
                        {
                            educations.Add(new Education
                            {
                                InstitutionName = reader["InstitutionName"].ToString(),
                                Qualification = reader["Qualification"].ToString(),
                                FieldOfStudy = reader["FieldOfStudy"].ToString(),
                                StartDate = reader["StartDate"].ToString(),
                                EndDate = reader["EndDate"].ToString()
                            });
                        }
                        return educations;
                    }
                }
            }
        }

        private List<Experience> GetExperiences(int resumeId)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (var command = new SqlCommand("SELECT * FROM Experience WHERE ResumeId = @ResumeId", connection))
                {
                    command.Parameters.AddWithValue("@ResumeId", resumeId);
                    using (var reader = command.ExecuteReader())
                    {
                        List<Experience> experiences = new List<Experience>();
                        while (reader.Read())
                        {
                            experiences.Add(new Experience
                            {
                                EmployerName = reader["EmployerName"].ToString(),
                                JobTitle = reader["JobTitle"].ToString(),
                                StartDate = reader["StartDate"].ToString(),
                                EndDate = reader["EndDate"].ToString()
                            });
                        }
                        return experiences;
                    }
                }
            }
        }

        private List<SkillAndExperience> GetSkillsAndExperiences(int candidateId)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;

            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand("SELECT Id,Skill,CandidateId,Years FROM SkillAndExperience WHERE CandidateId = @CandidateId", connection))
                {
                    command.Parameters.AddWithValue("@CandidateId", candidateId);

                    using (var reader = command.ExecuteReader())
                    {
                        List<SkillAndExperience> SkillsAndExperiences = new List<SkillAndExperience>();

                        while (reader.Read())
                        {
                            SkillsAndExperiences.Add(new SkillAndExperience
                            {
                                Id = (int)reader["Id"],
                                Skill = (SkillType)Enum.Parse(typeof(SkillType), reader["Skill"].ToString()),
                                CandidateId = (int)reader["CandidateId"],
                                Years = (int)reader["Years"],
                            });
                        }

                        return SkillsAndExperiences;
                    }
                }
            }
        }


        private User GetUser(int userId)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "SELECT * FROM Users WHERE UserId = @UserId ";
                    command.Parameters.AddWithValue("@UserId", userId);


                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new User
                            {
                                Id = (int)reader["UserId"],
                                Username = (string)reader["Username"],
                                Password = (string)reader["Password"],
                                UserType = (UserType)Enum.Parse(typeof(UserType), reader["UserType"].ToString()),

                            };
                        }
                    }
                }
            }
            return null;
        }
    }
}
