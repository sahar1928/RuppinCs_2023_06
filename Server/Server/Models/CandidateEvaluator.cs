//using Server.Models.enums;
//using System;
//using System.Collections.Generic;
//using System.Linq;

//namespace Server.Models
//{
//    public class CandidateEvaluator
//    {
//        public double CalculateSimilarity(Candidate candidate1, Candidate candidate2)
//        {
//            double similarity = 0.0;

//            // First and Last Name
//            if (candidate1.FirstName == candidate2.FirstName)
//                similarity += 0.2;
//            if (candidate1.LastName == candidate2.LastName)
//                similarity += 0.2;

//            // Email URL
//            if (candidate1.EmailUrl == candidate2.EmailUrl)
//                similarity += 0.1;

//            // Date of Birth
//            double dateDifference = Math.Abs((candidate1.DateOfBirth - candidate2.DateOfBirth).TotalDays);
//            double maxDateDifference = 365 * 5; // Maximum difference of 5 years
//            similarity += 0.1 * (1 - (dateDifference / maxDateDifference));

//            // Gender
//            if (candidate1.Gender == candidate2.Gender)
//                similarity += 0.1;

//            // Professional Title
//            if (candidate1.Resume.ProfessionalTitle == candidate2.Resume.ProfessionalTitle)
//                similarity += 0.1;

//            // Location
//            if (candidate1.Resume.Location == candidate2.Resume.Location)
//                similarity += 0.1;

//            // Resume Category
//            if (candidate1.Resume.ResumeCategory == candidate2.Resume.ResumeCategory)
//                similarity += 0.1;

//            // Education
//            double educationSimilarity = CalculateEducationSimilarity(candidate1.Resume.Educations, candidate2.Resume.Educations);
//            similarity += 0.1 * educationSimilarity;

//            // Experience
//            double experienceSimilarity = CalculateExperienceSimilarity(candidate1.Resume.Experiences, candidate2.Resume.Experiences);
//            similarity += 0.1 * experienceSimilarity;

//            // Skills
//            double skillSimilarity = CalculateSkillSimilarity(candidate1.Resume.Skills, candidate2.Resume.Skills);
//            similarity += 0.1 * skillSimilarity;

//            // Social Media URLs
//            double socialMediaSimilarity = CalculateSocialMediaSimilarity(candidate1.SocialMedia, candidate2.SocialMedia);
//            similarity += 0.1 * socialMediaSimilarity;

//            return similarity;
//        }

//        private double CalculateEducationSimilarity(List<Education> educations1, List<Education> educations2)
//        {
//            if (educations1.Count == 0 || educations2.Count == 0)
//                return 0.0;

//            double totalSimilarity = 0.0;

//            foreach (var education1 in educations1)
//            {
//                double maxSimilarity = 0.0;

//                foreach (var education2 in educations2)
//                {
//                    double similarity = 0.0;

//                    if (education1.InstitutionName == education2.InstitutionName)
//                        similarity += 0.3;
//                    if (education1.Qualification == education2.Qualification)
//                        similarity += 0.2;
//                    if (education1.FieldOfStudy == education2.FieldOfStudy)
//                        similarity += 0.2;

//                    // Normalize the similarity score based on the maximum possible similarity
//                    maxSimilarity = Math.Max(maxSimilarity, similarity);
//                }

//                totalSimilarity += maxSimilarity;
//            }

//            // Average the similarity across all educations
//            return totalSimilarity / educations1.Count;
//        }

//        private double CalculateExperienceSimilarity(List<Experience> experiences1, List<Experience> experiences2)
//        {
//            if (experiences1.Count == 0 || experiences2.Count == 0)
//                return 0.0;

//            double totalSimilarity = 0.0;

//            foreach (var experience1 in experiences1)
//            {
//                double maxSimilarity = 0.0;

//                foreach (var experience2 in experiences2)
//                {
//                    double similarity = 0.0;

//                    if (experience1.EmployerName == experience2.EmployerName)
//                        similarity += 0.3;
//                    if (experience1.JobTitle == experience2.JobTitle)
//                        similarity += 0.2;

//                    // Normalize the similarity score based on the maximum possible similarity
//                    maxSimilarity = Math.Max(maxSimilarity, similarity);
//                }

//                totalSimilarity += maxSimilarity;
//            }

//            // Average the similarity across all experiences
//            return totalSimilarity / experiences1.Count;
//        }

//        private double CalculateSkillSimilarity(List<SkillType> skills1, List<SkillType> skills2)
//        {
//            if (skills1.Count == 0 || skills2.Count == 0)
//                return 0.0;

//            double intersection = skills1.Intersect(skills2).Count();
//            double union = skills1.Union(skills2).Count();

//            return intersection / union;
//        }

//        private double CalculateSocialMediaSimilarity(SocialMedia socialMedia1, SocialMedia socialMedia2)
//        {
//            double similarity = 0.0;

//            if (socialMedia1.LinkedinURL == socialMedia2.LinkedinURL)
//                similarity += 0.2;
//            if (socialMedia1.TwitterURL == socialMedia2.TwitterURL)
//                similarity += 0.2;
//            if (socialMedia1.FacebookURL == socialMedia2.FacebookURL)
//                similarity += 0.2;
//            if (socialMedia1.PinterestURL == socialMedia2.PinterestURL)
//                similarity += 0.1;
//            if (socialMedia1.InstagramURL == socialMedia2.InstagramURL)
//                similarity += 0.1;

//            return similarity;
//        }

//        public Candidate Crossover(Candidate parent1, Candidate parent2)
//        {
//            // Perform crossover between two parents to create a child candidate
//            // Here, we will randomly select attributes from each parent to create the child

//            Random random = new Random();
//            Candidate child = new Candidate();

//            // First and Last Name
//            child.FirstName = random.Next(2) == 0 ? parent1.FirstName : parent2.FirstName;
//            child.LastName = random.Next(2) == 0 ? parent1.LastName : parent2.LastName;

//            // Email URL
//            child.EmailUrl = random.Next(2) == 0 ? parent1.EmailUrl : parent2.EmailUrl;

//            // Date of Birth
//            child.DateOfBirth = random.Next(2) == 0 ? parent1.DateOfBirth : parent2.DateOfBirth;

//            // Gender
//            child.Gender = random.Next(2) == 0 ? parent1.Gender : parent2.Gender;

//            // Resume
//            child.Resume = new Resume();
//            child.Resume.ProfessionalTitle = random.Next(2) == 0 ? parent1.Resume.ProfessionalTitle : parent2.Resume.ProfessionalTitle;
//            child.Resume.Location = random.Next(2) == 0 ? parent1.Resume.Location : parent2.Resume.Location;
//            child.Resume.ResumeCategory = random.Next(2) == 0 ? parent1.Resume.ResumeCategory : parent2.Resume.ResumeCategory;
//            child.Resume.Educations = CrossoverEducations(parent1.Resume.Educations, parent2.Resume.Educations);
//            child.Resume.Experiences = CrossoverExperiences(parent1.Resume.Experiences, parent2.Resume.Experiences);
//            child.Resume.Skills = CrossoverSkills(parent1.Resume.Skills, parent2.Resume.Skills);

//            // Social Media
//            child.SocialMedia = new SocialMedia();
//            child.SocialMedia.LinkedinURL = random.Next(2) == 0 ? parent1.SocialMedia.LinkedinURL : parent2.SocialMedia.LinkedinURL;
//            child.SocialMedia.TwitterURL = random.Next(2) == 0 ? parent1.SocialMedia.TwitterURL : parent2.SocialMedia.TwitterURL;
//            child.SocialMedia.FacebookURL = random.Next(2) == 0 ? parent1.SocialMedia.FacebookURL : parent2.SocialMedia.FacebookURL;
//            child.SocialMedia.PinterestURL = random.Next(2) == 0 ? parent1.SocialMedia.PinterestURL : parent2.SocialMedia.PinterestURL;
//            child.SocialMedia.InstagramURL = random.Next(2) == 0 ? parent1.SocialMedia.InstagramURL : parent2.SocialMedia.InstagramURL;

//            // User
//            child.User = new User();
//            child.User.Username = random.Next(2) == 0 ? parent1.User.Username : parent2.User.Username;
//            child.User.Password = random.Next(2) == 0 ? parent1.User.Password : parent2.User.Password;
//            child.User.UserType = random.Next(2) == 0 ? parent1.User.UserType : parent2.User.UserType;

//            return child;
//        }

//        private List<Education> CrossoverEducations(List<Education> educations1, List<Education> educations2)
//        {
//            Random random = new Random();
//            List<Education> childEducations = new List<Education>();

//            int maxLength = Math.Max(educations1.Count, educations2.Count);

//            for (int i = 0; i < maxLength; i++)
//            {
//                Education education1 = i < educations1.Count ? educations1[i] : null;
//                Education education2 = i < educations2.Count ? educations2[i] : null;

//                if (random.Next(2) == 0 && education1 != null)
//                    childEducations.Add(education1);
//                else if (education2 != null)
//                    childEducations.Add(education2);
//            }

//            return childEducations;
//        }

//        private List<Experience> CrossoverExperiences(List<Experience> experiences1, List<Experience> experiences2)
//        {
//            Random random = new Random();
//            List<Experience> childExperiences = new List<Experience>();

//            int maxLength = Math.Max(experiences1.Count, experiences2.Count);

//            for (int i = 0; i < maxLength; i++)
//            {
//                Experience experience1 = i < experiences1.Count ? experiences1[i] : null;
//                Experience experience2 = i < experiences2.Count ? experiences2[i] : null;

//                if (random.Next(2) == 0 && experience1 != null)
//                    childExperiences.Add(experience1);
//                else if (experience2 != null)
//                    childExperiences.Add(experience2);
//            }

//            return childExperiences;
//        }

//        private List<SkillType> CrossoverSkills(List<SkillType> skills1, List<SkillType> skills2)
//        {
//            Random random = new Random();
//            List<SkillType> childSkills = new List<SkillType>();

//            int maxLength = Math.Max(skills1.Count, skills2.Count);

//            for (int i = 0; i < maxLength; i++)
//            {
//                SkillType skill1 = i < skills1.Count ? skills1[i] : SkillType.Skill1;
//                SkillType skill2 = i < skills2.Count ? skills2[i] : SkillType.Skill1;

//                if (random.Next(2) == 0)
//                    childSkills.Add(skill1);
//                else
//                    childSkills.Add(skill2);
//            }

//            return childSkills;
//        }

//        public void Mutate(Candidate candidate)
//        {
//            Random random = new Random();

//            // First and Last Name Mutation
//            if (random.Next(10) == 0)
//                candidate.FirstName = "MutatedFirstName";
//            if (random.Next(10) == 0)
//                candidate.LastName = "MutatedLastName";

//            // Email URL Mutation
//            if (random.Next(10) == 0)
//                candidate.EmailUrl = "mutated_email@example.com";

//            // Date of Birth Mutation
//            if (random.Next(10) == 0)
//                candidate.DateOfBirth = DateTime.Now.AddYears(-30);

//            // Gender Mutation
//            if (random.Next(10) == 0)
//                candidate.Gender = Gender.Other;

//            // Resume Mutation
//            MutateResume(candidate.Resume);

//            // Social Media Mutation
//            MutateSocialMedia(candidate.SocialMedia);

//            // User Mutation
//            MutateUser(candidate.User);
//        }

//        private void MutateResume(Resume resume)
//        {
//            Random random = new Random();

//            // Professional Title Mutation
//            if (random.Next(10) == 0)
//                resume.ProfessionalTitle = "MutatedProfessionalTitle";

//            // Location Mutation
//            if (random.Next(10) == 0)
//                resume.Location = "MutatedLocation";

//            // Resume Category Mutation
//            if (random.Next(10) == 0)
//                resume.ResumeCategory = ResumeCategory.Category3;

//            // Educations Mutation
//            foreach (var education in resume.Educations)
//            {
//                MutateEducation(education);
//            }

//            // Experiences Mutation
//            foreach (var experience in resume.Experiences)
//            {
//                MutateExperience(experience);
//            }

//            // Skills Mutation
//            MutateSkills(resume.Skills);
//        }

//        private void MutateEducation(Education education)
//        {
//            Random random = new Random();

//            // Institution Name Mutation
//            if (random.Next(10) == 0)
//                education.InstitutionName = "MutatedInstitutionName";

//            // Qualification Mutation
//            if (random.Next(10) == 0)
//                education.Qualification = "MutatedQualification";

//            // Field of Study Mutation
//            if (random.Next(10) == 0)
//                education.FieldOfStudy = "MutatedFieldOfStudy";

//            // Start Date Mutation
//            if (random.Next(10) == 0)
//                education.StartDate = DateTime.Now.AddYears(-5);

//            // End Date Mutation
//            if (random.Next(10) == 0)
//                education.EndDate = DateTime.Now;
//        }

//        private void MutateExperience(Experience experience)
//        {
//            Random random = new Random();

//            // Employer Name Mutation
//            if (random.Next(10) == 0)
//                experience.EmployerName = "MutatedEmployerName";

//            // Job Title Mutation
//            if (random.Next(10) == 0)
//                experience.JobTitle = "MutatedJobTitle";

//            // Start Date Mutation
//            if (random.Next(10) == 0)
//                experience.StartDate = DateTime.Now.AddYears(-5);

//            // End Date Mutation
//            if (random.Next(10) == 0)
//                experience.EndDate = DateTime.Now;
//        }

//        private void MutateSkills(List<SkillType> skills)
//        {
//            Random random = new Random();

//            // Add a new skill
//            if (random.Next(10) == 0)
//                skills.Add(SkillType.Skill4);

//            // Remove a random skill
//            if (random.Next(10) == 0 && skills.Count > 0)
//                skills.RemoveAt(random.Next(skills.Count));

//            // Mutate an existing skill
//            if (random.Next(10) == 0 && skills.Count > 0)
//                skills[random.Next(skills.Count)] = SkillType.Skill5;
//        }

//        private void MutateSocialMedia(SocialMedia socialMedia)
//        {
//            Random random = new Random();

//            // Linkedin URL Mutation
//            if (random.Next(10) == 0)
//                socialMedia.LinkedinURL = "mutated_linkedin_url";

//            // Twitter URL Mutation
//            if (random.Next(10) == 0)
//                socialMedia.TwitterURL = "mutated_twitter_url";

//            // Facebook URL Mutation
//            if (random.Next(10) == 0)
//                socialMedia.FacebookURL = "mutated_facebook_url";

//            // Pinterest URL Mutation
//            if (random.Next(10) == 0)
//                socialMedia.PinterestURL = "mutated_pinterest_url";

//            // Instagram URL Mutation
//            if (random.Next(10) == 0)
//                socialMedia.InstagramURL = "mutated_instagram_url";
//        }

//        private void MutateUser(User user)
//        {
//            Random random = new Random();

//            // Username Mutation
//            if (random.Next(10) == 0)
//                user.Username = "mutated_username";

//            // Password Mutation
//            if (random.Next(10) == 0)
//                user.Password = "mutated_password";

//            // User Type Mutation
//            if (random.Next(10) == 0)
//                user.UserType = UserType.Type3;
//        }
//    }

//    public class Program
//    {
//        public static void Main(string[] args)
//        {
//            // Testing the similarity calculation, crossover, and mutation methods

//            Candidate candidate1 = new Candidate
//            {
//                FirstName = "John",
//                LastName = "Doe",
//                EmailUrl = "john.doe@example.com",
//                DateOfBirth = new DateTime(1990, 5, 15),
//                Gender = Gender.Male,
//                Resume = new Resume
//                {
//                    ProfessionalTitle = "Software Developer",
//                    Location = "New York",
//                    ResumeCategory = ResumeCategory.Category1,
//                    Educations = new List<Education>
//                    {
//                        new Education
//                        {
//                            InstitutionName = "University 1",
//                            Qualification = "Bachelor's Degree",
//                            FieldOfStudy = "Computer Science",
//                            StartDate = new DateTime(2010, 9, 1),
//                            EndDate = new DateTime(2014, 5, 31)
//                        },
//                        new Education
//                        {
//                            InstitutionName = "University 2",
//                            Qualification = "Master's Degree",
//                            FieldOfStudy = "Software Engineering",
//                            StartDate = new DateTime(2014, 9, 1),
//                            EndDate = new DateTime(2016, 5, 31)
//                        }
//                    },
//                    Experiences = new List<Experience>
//                    {
//                        new Experience
//                        {
//                            EmployerName = "Company 1",
//                            JobTitle = "Software Developer",
//                            StartDate = new DateTime(2016, 6, 1),
//                            EndDate = new DateTime(2018, 5, 31)
//                        },
//                        new Experience
//                        {
//                            EmployerName = "Company 2",
//                            JobTitle = "Senior Software Developer",
//                            StartDate = new DateTime(2018, 6, 1),
//                            EndDate = new DateTime(2021, 12, 31)
//                        }
//                    },
//                    Skills = new List<SkillType> { SkillType.Skill1, SkillType.Skill2, SkillType.Skill3 },
//                    SocialMedia = new SocialMedia
//                    {
//                        LinkedinURL = "john.doe.linkedin.com",
//                        TwitterURL = "john.doe.twitter.com",
//                        FacebookURL = "john.doe.facebook.com",
//                        PinterestURL = "john.doe.pinterest.com",
//                        InstagramURL = "john.doe.instagram.com"
//                    }
//                },
//                SocialMedia = new SocialMedia
//                {
//                    LinkedinURL = "john.doe.linkedin.com",
//                    TwitterURL = "john.doe.twitter.com",
//                    FacebookURL = "john.doe.facebook.com",
//                    PinterestURL = "john.doe.pinterest.com",
//                    InstagramURL = "john.doe.instagram.com"
//                },
//                User = new User
//                {
//                    Username = "johndoe",
//                    Password = "password",
//                    UserType = UserType.Type1
//                }
//            };

//            Candidate candidate2 = new Candidate
//            {
//                FirstName = "Jane",
//                LastName = "Smith",
//                EmailUrl = "jane.smith@example.com",
//                DateOfBirth = new DateTime(1992, 10, 20),
//                Gender = Gender.Female,
//                Resume = new Resume
//                {
//                    ProfessionalTitle = "Web Developer",
//                    Location = "San Francisco",
//                    ResumeCategory = ResumeCategory.Category2,
//                    Educations = new List<Education>
//                    {
//                        new Education
//                        {
//                            InstitutionName = "University 3",
//                            Qualification = "Bachelor's Degree",
//                            FieldOfStudy = "Computer Science",
//                            StartDate = new DateTime(2010, 9, 1),
//                            EndDate = new DateTime(2014, 5, 31)
//                        },
//                        new Education
//                        {
//                            InstitutionName = "University 4",
//                            Qualification = "Master's Degree",
//                            FieldOfStudy = "Software Engineering",
//                            StartDate = new DateTime(2014, 9, 1),
//                            EndDate = new DateTime(2016, 5, 31)
//                        }
//                    },
//                    Experiences = new List<Experience>
//                    {
//                        new Experience
//                        {
//                            EmployerName = "Company 3",
//                            JobTitle = "Web Developer",
//                            StartDate = new DateTime(2016, 6, 1),
//                            EndDate = new DateTime(2019, 8, 31)
//                        },
//                        new Experience
//                        {
//                            EmployerName = "Company 4",
//                            JobTitle = "Frontend Developer",
//                            StartDate = new DateTime(2019, 9, 1),
//                            EndDate = new DateTime(2022, 6, 30)
//                        }
//                    },
//                    Skills = new List<SkillType> { SkillType.Skill2, SkillType.Skill3, SkillType.Skill4 },
//                    SocialMedia = new SocialMedia
//                    {
//                        LinkedinURL = "jane.smith.linkedin.com",
//                        TwitterURL = "jane.smith.twitter.com",
//                        FacebookURL = "jane.smith.facebook.com",
//                        PinterestURL = "jane.smith.pinterest.com",
//                        InstagramURL = "jane.smith.instagram.com"
//                    }
//                },
//                SocialMedia = new SocialMedia
//                {
//                    LinkedinURL = "jane.smith.linkedin.com",
//                    TwitterURL = "jane.smith.twitter.com",
//                    FacebookURL = "jane.smith.facebook.com",
//                    PinterestURL = "jane.smith.pinterest.com",
//                    InstagramURL = "jane.smith.instagram.com"
//                },
//                User = new User
//                {
//                    Username = "janesmith",
//                    Password = "password",
//                    UserType = UserType.Type2
//                }
//            };

//            CandidateEvaluator evaluator = new CandidateEvaluator();

//            // Calculate similarity
//            double similarity = evaluator.CalculateSimilarity(candidate1, candidate2);
//            Console.WriteLine("Similarity between candidate1 and candidate2: " + similarity);

//            // Perform crossover
//            Candidate childCandidate = evaluator.Crossover(candidate1, candidate2);
//            Console.WriteLine("Child candidate: " + childCandidate.FirstName + " " + childCandidate.LastName);

//            // Perform mutation
//            evaluator.Mutate(candidate1);
//            Console.WriteLine("Mutated candidate1: " + candidate1.FirstName + " " + candidate1.LastName);
//        }
//    }
//}