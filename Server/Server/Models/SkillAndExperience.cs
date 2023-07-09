using Server.Models.enums;

namespace Server.Models
{
    public class SkillAndExperience
    {
        public SkillAndExperience() { }

        public SkillAndExperience(int id, SkillType skill, int candidateId, int years)
        {
            Id = id;
            Skill = skill;
            CandidateId = candidateId;
            Years = years;
        }
        public SkillAndExperience(int id, int years, SkillType skill, int jobId)
        {
            Id = id;
            Skill = skill;
            JobId = jobId;
            Years = years;
        }

        public int Id { get; set; }
        public SkillType Skill { get; set; }
        public int CandidateId { get; set; }
        public int JobId { get; set; }
        public int Years { get; set; }
    }
}