using Server.Models;
using Server.Models.enums;
using System.Collections.Generic;

public partial class Resume
{
    public Resume() { }
    public string FullName { get; set; }
    public string Email { get; set; }
    public string ProfessionalTitle { get; set; }
    public string Location { get; set; }
    public string Date { get; set; }
    public ResumeCategory ResumeCategory { get; set; }
    public List<SkillType> Skills { get; set; }
    public SocialMedia SocialMedia { get; set; }
    public byte[] PhotoFile { get; set; }
    public List<Education> Educations { get; set; }
    public List<Experience> Experiences { get; set; }
    public byte[] ResumeFile { get; set; }
}


