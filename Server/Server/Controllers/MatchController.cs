using Server.Models;
using Server.Models.enums;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web.Http;

namespace Server.Controllers
{
    public class MatchController : ApiController
    {
        private const int PopulationSize = 100;
        private const int MaxGenerations = 100;
        private const double CrossoverRate = 0.8;
        private const double MutationRate = 0.1;

        private readonly Random random = new Random();

        [HttpPost]

        [Route("api/Match/MatchCandidatesToJob/{jobId}")]
        public IHttpActionResult MatchCandidatesToJob(int jobId)

        {
            try
            {
                using (var connection = GetSqlConnection())
                {
                    bool jobExists = JobExists(connection, jobId);
                    if (!jobExists)
                    {
                        return NotFound();
                    }

                    Job job = GetJob(connection, jobId);
                    if (job == null)
                    {
                        return NotFound();
                    }

                    List<Candidate> untestedCandidates = GetUntestedCandidates(connection, jobId);
                    if (untestedCandidates.Count == 0)
                    {
                        return Ok();
                    }

                    List<Candidate> candidates = GetCandidates(connection);

                    foreach (Candidate candidate in untestedCandidates)
                    {
                        double score = CalculateCandidateFitness(candidate, job);

                        InsertOrUpdateScore(connection, candidate.Id, jobId, score);
                    }

                    for (int generation = 0; generation < MaxGenerations; generation++)
                    {
                        List<Candidate> parents = SelectParents(candidates);
                        List<Candidate> offspring = CreateOffspring(parents);

                        candidates.Clear();
                        candidates.AddRange(offspring);

                        foreach (Candidate candidate in untestedCandidates)
                        {
                            double score = CalculateCandidateFitness(candidate, job);

                            InsertOrUpdateScore(connection, candidate.Id, jobId, score);
                        }
                    }
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("api/Match/MatchTopCandidatesToJob/{jobId}")]
        public List<Candidate> MatchTopCandidatesToJob(int jobId)
        {
            try
            {
                using (var connection = GetSqlConnection())
                {

                    List<Candidate> topCandidates = GetTopScoredCandidates(jobId);
                    return topCandidates;
                }
            }
            catch (Exception ex)
            {
                return new List<Candidate>();
            }
        }


        private List<Candidate> GetTopScoredCandidates(int jobId)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (var command = new SqlCommand("SELECT TOP 4 C.* FROM Candidate C INNER JOIN Score S ON C.Id = S.CandidateId WHERE S.JobId = @JobId ORDER BY S.Score DESC", connection))
                {
                    command.Parameters.AddWithValue("@JobId", jobId);
                    using (var reader = command.ExecuteReader())
                    {
                        List<Candidate> candidates = new List<Candidate>();
                        while (reader.Read())
                        {
                            Candidate candidate = new Candidate
                            {
                                Id = reader["Id"] != DBNull.Value ? Convert.ToInt32(reader["Id"]) : 0,
                                EmailUrl = reader["EmailUrl"] != DBNull.Value ? reader["EmailUrl"].ToString() : string.Empty,
                                FirstName = reader["FirstName"] != DBNull.Value ? reader["FirstName"].ToString() : string.Empty,
                                LastName = reader["LastName"] != DBNull.Value ? reader["LastName"].ToString() : string.Empty,
                                DateOfBirth = reader["DateOfBirth"] != DBNull.Value ? reader["DateOfBirth"].ToString() : string.Empty,
                                Gender = reader["Gender"] != DBNull.Value ? (Gender)Enum.Parse(typeof(Gender), reader["Gender"].ToString(), true) : Gender.Other,
                                ResumeId = reader["ResumeId"] != DBNull.Value ? Convert.ToInt32(reader["ResumeId"]) : 0,
                                SocialMediaId = reader["SocialMediaId"] != DBNull.Value ? Convert.ToInt32(reader["SocialMediaId"]) : 0,
                                UserId = reader["UserId"] != DBNull.Value ? Convert.ToInt32(reader["UserId"]) : 0,
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
                            List<SkillAndExperience> skillAndExperince = GetSkillsAndExperiencesForCandidate(candidate.Id);

                            candidate.Resume = resume;
                            candidate.Resume.Educations = educations;
                            candidate.Resume.Experiences = experiences;
                            candidate.SocialMedia = socialMedia;
                            candidate.User = candidateUser;
                            candidate.SkillAndExperience = skillAndExperince;
                            candidates.Add(candidate);
                        }
                        return candidates;
                    }
                }
            }
        }


        private void InsertOrUpdateScore(SqlConnection connection, int candidateId, int jobId, double score)
        {
            string query = "IF EXISTS (SELECT * FROM Score WHERE CandidateId = @CandidateId AND JobId = @JobId) " +
                           "UPDATE Score SET Score = @Score WHERE CandidateId = @CandidateId AND JobId = @JobId " +
                           "ELSE " +
                           "INSERT INTO Score (CandidateId, JobId, Score) VALUES (@CandidateId, @JobId, @Score)";

            using (var command = new SqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@CandidateId", candidateId);
                command.Parameters.AddWithValue("@JobId", jobId);
                command.Parameters.AddWithValue("@Score", score);

                command.ExecuteNonQuery();
            }
        }

        private bool JobExists(SqlConnection connection, int jobId)
        {
            using (var command = new SqlCommand("SELECT COUNT(*) FROM Job WHERE Id = @JobId", connection))
            {
                command.Parameters.AddWithValue("@JobId", jobId);
                int count = (int)command.ExecuteScalar();
                return count > 0;
            }
        }

        private Job GetJob(SqlConnection connection, int jobId)
        {
            using (var command = new SqlCommand("SELECT * FROM Job WHERE Id = @JobId", connection))
            {
                command.Parameters.AddWithValue("@JobId", jobId);
                using (var reader = command.ExecuteReader())
                {
                    if (reader.Read())
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

                        return job;
                    }
                }
            }
            return null;
        }

        private List<Candidate> GetUntestedCandidates(SqlConnection connection, int jobId)
        {
            List<Candidate> untestedCandidates = new List<Candidate>();

            try
            {
                using (var command = new SqlCommand(@"SELECT c.Id, c.EmailUrl, c.FirstName, c.LastName, c.DateOfBirth, c.Gender, c.ResumeId, c.SocialMediaId, c.UserId,
                                                c.ProfessionalTitle, c.PhoneNumber
                                              FROM Candidate c
                                              LEFT JOIN Score s ON c.Id = s.CandidateId AND s.JobId = @JobId
                                              WHERE s.CandidateId IS NULL", connection))
                {
                    command.Parameters.AddWithValue("@JobId", jobId);

                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Candidate candidate = new Candidate
                            {
                                Id = reader["Id"] != DBNull.Value ? Convert.ToInt32(reader["Id"]) : 0,
                                EmailUrl = reader["EmailUrl"] != DBNull.Value ? reader["EmailUrl"].ToString() : string.Empty,
                                FirstName = reader["FirstName"] != DBNull.Value ? reader["FirstName"].ToString() : string.Empty,
                                LastName = reader["LastName"] != DBNull.Value ? reader["LastName"].ToString() : string.Empty,
                                DateOfBirth = reader["DateOfBirth"] != DBNull.Value ? reader["DateOfBirth"].ToString() : string.Empty,
                                Gender = reader["Gender"] != DBNull.Value ? (Gender)Enum.Parse(typeof(Gender), reader["Gender"].ToString(), true) : Gender.Other,
                                ResumeId = reader["ResumeId"] != DBNull.Value ? Convert.ToInt32(reader["ResumeId"]) : 0,
                                SocialMediaId = reader["SocialMediaId"] != DBNull.Value ? Convert.ToInt32(reader["SocialMediaId"]) : 0,
                                UserId = reader["UserId"] != DBNull.Value ? Convert.ToInt32(reader["UserId"]) : 0,
                                ProfessionalTitle = (ProfessionalTitle)Enum.Parse(typeof(ProfessionalTitle), reader["ProfessionalTitle"].ToString()),
                                PhoneNumber = reader["PhoneNumber"].ToString()
                            };
                            candidate.Genes = null;
                            candidate.Fitness = 0;
                            untestedCandidates.Add(candidate);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error retrieving untested candidates: " + ex.Message);

                return new List<Candidate>();
            }

            return untestedCandidates;
        }





        private List<Candidate> GetCandidates(SqlConnection connection)
        {
            List<Candidate> candidates = new List<Candidate>();

            using (var command = new SqlCommand("SELECT * FROM Candidate", connection))
            {
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Candidate candidate = new Candidate
                        {
                            Id = reader["Id"] != DBNull.Value ? Convert.ToInt32(reader["Id"]) : 0,
                            EmailUrl = reader["EmailUrl"] != DBNull.Value ? reader["EmailUrl"].ToString() : string.Empty,
                            FirstName = reader["FirstName"] != DBNull.Value ? reader["FirstName"].ToString() : string.Empty,
                            LastName = reader["LastName"] != DBNull.Value ? reader["LastName"].ToString() : string.Empty,
                            DateOfBirth = reader["DateOfBirth"] != DBNull.Value ? reader["DateOfBirth"].ToString() : string.Empty,
                            Gender = reader["Gender"] != DBNull.Value ? (Gender)Enum.Parse(typeof(Gender), reader["Gender"].ToString(), true) : Gender.Other,
                            ResumeId = reader["ResumeId"] != DBNull.Value ? Convert.ToInt32(reader["ResumeId"]) : 0,
                            SocialMediaId = reader["SocialMediaId"] != DBNull.Value ? Convert.ToInt32(reader["SocialMediaId"]) : 0,
                            UserId = reader["UserId"] != DBNull.Value ? Convert.ToInt32(reader["UserId"]) : 0,
                            ProfessionalTitle = (ProfessionalTitle)Enum.Parse(typeof(ProfessionalTitle), reader["ProfessionalTitle"].ToString()),
                            PhoneNumber = reader["PhoneNumber"].ToString()

                        };
                        candidate.Genes = GenerateRandomGenes();
                        candidate.Fitness = 0;
                        candidates.Add(candidate);
                    }

                }
            }

            return candidates;
        }

        private string[] GenerateRandomGenes()
        {
            const string allowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            int geneLength = 10;

            string[] genes = new string[geneLength];

            for (int i = 0; i < geneLength; i++)
            {
                StringBuilder geneBuilder = new StringBuilder();
                for (int j = 0; j < geneLength; j++)
                {
                    int randomIndex = random.Next(0, allowedChars.Length);
                    char randomChar = allowedChars[randomIndex];
                    geneBuilder.Append(randomChar);
                }
                genes[i] = geneBuilder.ToString();
            }

            return genes;
        }

        private double CalculateCandidateFitness(Candidate candidate, Job job)
        {
            double score = 0.0;

            score += CalculateFieldScore(candidate.DateOfBirth, job.JobDescription);
            score += CalculateFieldScore(candidate.Gender.ToString(), job.JobDescription);

            Resume resume = GetResume(candidate.ResumeId);
            if (resume != null)
            {
                score += CalculateFieldScore(resume.FullName, job.JobTitle);
                score += CalculateFieldScore(resume.ProfessionalTitle, job.JobTitle);
                score += CalculateFieldScore(resume.Location, job.Location);

                score += CalculateFieldScore(resume.ResumeFile, job.JobDescription);

                score += CalculateEducationScore(resume.Educations, job.JobDescription);

                score += CalculateExperienceScore(resume.Experiences, job.JobDescription);

                score += CalculateSkillAndExperienceScore(candidate.Id, job.Id);
            }

            return score;
        }

        private double CalculateFieldScore(string candidateValue, string jobValue)
        {
            double score = StringSimilarityAlgorithm(candidateValue, jobValue);

            return score;
        }

        private double CalculateFieldScore(byte[] candidateValue, string jobValue)
        {
            string resumeText = ExtractTextFromResumeFile(candidateValue);
            double score = StringSimilarityAlgorithm(resumeText, jobValue);

            return score;
        }

        private string ExtractTextFromResumeFile(byte[] resumeFile)
        {
            string resumeText = Encoding.UTF8.GetString(resumeFile);

            return resumeText;
        }

        private double StringSimilarityAlgorithm(string value1, string value2)
        {
            int[,] distances = new int[value1.Length + 1, value2.Length + 1];

            for (int i = 0; i <= value1.Length; i++)
            {
                distances[i, 0] = i;
            }

            for (int j = 0; j <= value2.Length; j++)
            {
                distances[0, j] = j;
            }

            for (int i = 1; i <= value1.Length; i++)
            {
                for (int j = 1; j <= value2.Length; j++)
                {
                    int cost = (value1[i - 1] == value2[j - 1]) ? 0 : 1;

                    distances[i, j] = Math.Min(
                        Math.Min(distances[i - 1, j] + 1, distances[i, j - 1] + 1),
                        distances[i - 1, j - 1] + cost);
                }
            }

            int maxLength = Math.Max(value1.Length, value2.Length);
            double similarity = 1.0 - (double)distances[value1.Length, value2.Length] / maxLength;

            return similarity;
        }


        private double CalculateSkillAndExperienceScore(int candidateId, int jobId)
        {
            try
            {
                List<SkillAndExperience> candidateSkills = GetSkillsAndExperiencesForCandidate(candidateId);
                List<SkillAndExperience> jobSkills = GetSkillsAndExperiencesForJob(jobId);

                double totalScore = 0.0;

                foreach (SkillAndExperience candidateSkill in candidateSkills)
                {
                    SkillAndExperience matchingJobSkill = jobSkills.FirstOrDefault(s => s.Skill == candidateSkill.Skill);
                    if (matchingJobSkill != null)
                    {
                        double skillScore = CalculateSkillScore(candidateSkill, matchingJobSkill);
                        totalScore += skillScore;
                    }
                }

                return totalScore;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error calculating skill and experience score: " + ex.Message);
                return 0.0;
            }
        }

        private List<SkillAndExperience> GetSkillsAndExperiencesForCandidate(int recordId)
        {
            try
            {
                using (var connection = GetSqlConnection())
                {
                    List<SkillAndExperience> skillsAndExperiences = new List<SkillAndExperience>();

                    using (var command = new SqlCommand("SELECT * FROM SkillAndExperience WHERE CandidateId = @RecordId", connection))
                    {
                        command.Parameters.AddWithValue("@RecordId", recordId);

                        using (var reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                SkillAndExperience skillAndExperience = new SkillAndExperience
                                {
                                    Id = (int)reader["Id"],
                                    Skill = (SkillType)Enum.Parse(typeof(SkillType), reader["Skill"].ToString()),
                                    CandidateId = (int)reader["CandidateId"],
                                    Years = (int)reader["Years"]
                                };

                                skillsAndExperiences.Add(skillAndExperience);
                            }
                        }
                    }

                    return skillsAndExperiences;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error fetching skills and experiences: " + ex.Message);
                return new List<SkillAndExperience>();
            }
        }

        private List<SkillAndExperience> GetSkillsAndExperiencesForJob(int recordId)
        {
            try
            {
                using (var connection = GetSqlConnection())
                {
                    List<SkillAndExperience> skillsAndExperiences = new List<SkillAndExperience>();

                    using (var command = new SqlCommand("SELECT * FROM SkillAndExperience WHERE JobId = @RecordId", connection))
                    {
                        command.Parameters.AddWithValue("@RecordId", recordId);

                        using (var reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                SkillAndExperience skillAndExperience = new SkillAndExperience
                                {
                                    Id = (int)reader["Id"],
                                    Skill = (SkillType)Enum.Parse(typeof(SkillType), reader["Skill"].ToString()),
                                    JobId = (int)reader["JobId"],
                                    Years = (int)reader["Years"]
                                };

                                skillsAndExperiences.Add(skillAndExperience);
                            }
                        }
                    }

                    return skillsAndExperiences;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error fetching skills and experiences: " + ex.Message);
                return new List<SkillAndExperience>();
            }
        }

        private double CalculateSkillScore(SkillAndExperience candidateSkill, SkillAndExperience jobSkill)
        {
            double score = 0.0;

            if (candidateSkill.Years >= jobSkill.Years)
            {
                score += candidateSkill.Years - jobSkill.Years;
            }

            return score;
        }


        private double CalculateEducationScore(List<Education> educations, string jobValue)
        {
            double score = 0.0;
            foreach (Education education in educations)
            {
                double educationScore = StringSimilarityAlgorithm(education.InstitutionName, jobValue);
                score += educationScore;
            }
            return score;
        }

        private double CalculateExperienceScore(List<Experience> experiences, string jobValue)
        {
            double score = 0.0;
            foreach (Experience experience in experiences)
            {
                double experienceScore = StringSimilarityAlgorithm(experience.EmployerName, jobValue);
                score += experienceScore;
            }
            return score;
        }

        private List<Candidate> SelectParents(List<Candidate> population)
        {
            int tournamentSize = 5;
            List<Candidate> parents = new List<Candidate>();

            while (parents.Count < PopulationSize)
            {
                List<Candidate> tournament = population.OrderBy(c => Guid.NewGuid()).Take(tournamentSize).ToList();
                Candidate winner = tournament.OrderByDescending(c => c.Fitness).First();
                parents.Add(winner);
            }

            return parents;
        }

        private List<Candidate> CreateOffspring(List<Candidate> parents)
        {
            List<Candidate> offspring = new List<Candidate>();

            while (offspring.Count < PopulationSize)
            {
                Candidate parent1 = parents[random.Next(parents.Count)];
                Candidate parent2 = parents[random.Next(parents.Count)];

                if (random.NextDouble() < CrossoverRate)
                {
                    Candidate child = Crossover(parent1, parent2);
                    Mutate(child);
                    offspring.Add(child);
                }
                else
                {
                    offspring.Add(parent1);
                }
            }

            return offspring;
        }

        private Candidate Crossover(Candidate parent1, Candidate parent2)
        {
            string[] childGenes = new string[parent1.Genes.Length];
            int crossoverPoint = random.Next(0, parent1.Genes.Length);

            for (int i = 0; i < parent1.Genes.Length; i++)
            {
                if (i < crossoverPoint)
                {
                    childGenes[i] = parent1.Genes[i];
                }
                else
                {
                    childGenes[i] = parent2.Genes[i];
                }
            }

            Candidate child = new Candidate
            {
                Genes = childGenes
            };

            return child;
        }

        private void Mutate(Candidate candidate)
        {
            int mutationIndex = random.Next(0, candidate.Genes.Length);
            string[] newGene = GenerateRandomGenes();

            candidate.Genes[mutationIndex] = newGene.ToString();
        }


        private Resume GetResume(int resumeId)
        {
            using (var connection = GetSqlConnection())
            {
                using (var command = new SqlCommand("SELECT * FROM Resume WHERE Id = @ResumeId", connection))
                {
                    command.Parameters.AddWithValue("@ResumeId", resumeId);
                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            Resume resume = new Resume
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

                            List<Education> educations = GetEducations(resumeId);
                            resume.Educations = educations;

                            List<Experience> experiences = GetExperiences(resumeId);
                            resume.Experiences = experiences;

                            return resume;
                        }
                    }
                }
            }
            return null;
        }

        private List<SkillType> GetSkills(int resumeId)
        {
            List<SkillType> skills = new List<SkillType>();

            using (var connection = GetSqlConnection())
            {
                using (var command = new SqlCommand("SELECT Skill FROM Skills WHERE ResumeId = @ResumeId", connection))
                {
                    command.Parameters.AddWithValue("@ResumeId", resumeId);
                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            SkillType skill = (SkillType)Enum.Parse(typeof(SkillType), reader["Skill"].ToString());
                            skills.Add(skill);
                        }
                    }
                }
            }

            return skills;
        }

        private List<Education> GetEducations(int resumeId)
        {
            List<Education> educations = new List<Education>();

            using (var connection = GetSqlConnection())
            {
                using (var command = new SqlCommand("SELECT * FROM Education WHERE ResumeId = @ResumeId", connection))
                {
                    command.Parameters.AddWithValue("@ResumeId", resumeId);
                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Education education = new Education
                            {
                                InstitutionName = reader["InstitutionName"].ToString(),
                                Qualification = reader["Qualification"].ToString(),
                                FieldOfStudy = reader["FieldOfStudy"].ToString(),
                                StartDate = reader["StartDate"].ToString(),
                                EndDate = reader["EndDate"].ToString()
                            };

                            educations.Add(education);
                        }
                    }
                }
            }

            return educations;
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

        private List<Experience> GetExperiences(int resumeId)
        {
            List<Experience> experiences = new List<Experience>();

            using (var connection = GetSqlConnection())
            {
                using (var command = new SqlCommand("SELECT * FROM Experience WHERE ResumeId = @ResumeId", connection))
                {
                    command.Parameters.AddWithValue("@ResumeId", resumeId);
                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Experience experience = new Experience
                            {
                                EmployerName = reader["EmployerName"].ToString(),
                                JobTitle = reader["JobTitle"].ToString(),
                                StartDate = reader["StartDate"].ToString(),
                                EndDate = reader["EndDate"].ToString()
                            };

                            experiences.Add(experience);
                        }
                    }
                }
            }

            return experiences;
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

        private SqlConnection GetSqlConnection()
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
            var connection = new SqlConnection(connectionString);
            connection.Open();
            return connection;
        }
    }
}
