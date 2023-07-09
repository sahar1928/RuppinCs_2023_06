using Server.Models.enums;
using System.Collections.Generic;

namespace Server.Models
{
    public class Candidate
    {
        public Candidate() { }
        public Candidate(int id, string emailUrl, string firstName, string lastName, string dateOfBirth, Gender gender, int resumeId, int socialMediaId, int userId, ProfessionalTitle professionalTitle, string phoneNumber)
        {
            Id = id;
            EmailUrl = emailUrl;
            FirstName = firstName;
            LastName = lastName;
            DateOfBirth = dateOfBirth;
            Gender = gender;
            ResumeId = resumeId;
            SocialMediaId = socialMediaId;
            UserId = userId;
            ProfessionalTitle = professionalTitle;
            PhoneNumber = phoneNumber;
        }

        public Candidate(int id, User user, string emailUrl, string firstName, string lastName, string dateOfBirth, Gender gender, Resume resume, List<SkillAndExperience> skillAndExperience, SocialMedia socialMedia, ProfessionalTitle professionalTitle, string phoneNumber)
        {
            Id = id;
            User = user;
            EmailUrl = emailUrl;
            FirstName = firstName;
            LastName = lastName;
            DateOfBirth = dateOfBirth;
            Gender = gender;
            Resume = resume;
            SkillAndExperience = skillAndExperience;
            SocialMedia = socialMedia;
            ProfessionalTitle = professionalTitle;
            PhoneNumber = phoneNumber;
        }

        public int Id { get; set; }
        public User User { get; set; }
        public string EmailUrl { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DateOfBirth { get; set; }
        public Gender Gender { get; set; }
        public Resume Resume { get; set; }
        public List<SkillAndExperience> SkillAndExperience { get; set; }
        public SocialMedia SocialMedia { get; set; }
        public int ResumeId { get; set; }
        public int SocialMediaId { get; set; }
        public int UserId { get; set; }
        public ProfessionalTitle ProfessionalTitle { get; set; }
        public string PhoneNumber { get; set; }

        public double Fitness { get; set; }
        public string[] Genes { get; set; }
    }

}