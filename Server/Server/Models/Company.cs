namespace Server.Models
{
    public class Company
    {
        public Company() { }

        public Company(int id, string emailUrl, string name, string website, string description, byte[] logo, int socialMediaId, int userId, string location, string phoneNumber)
        {
            Id = id;
            EmailUrl = emailUrl;
            Name = name;
            Website = website;
            Description = description;
            Logo = logo;
            SocialMediaId = socialMediaId;
            UserId = userId;
            Location = location;
            PhoneNumber = phoneNumber;

        }

        public Company(int id, User user, string emailUrl, string name, string website, SocialMedia socialMedia, string description, byte[] logo, string location, string phoneNumber)
        {
            Id = id;
            User = user;
            EmailUrl = emailUrl;
            Name = name;
            Website = website;
            SocialMedia = socialMedia;
            Description = description;
            Logo = logo;
            Location = location;
            PhoneNumber = phoneNumber;
        }

        public int Id { get; set; }
        public User User { get; set; }
        public string EmailUrl { get; set; }
        public string Name { get; set; }
        public string Website { get; set; }
        public SocialMedia SocialMedia { get; set; }
        public string Description { get; set; }
        public byte[] Logo { get; set; }
        public int SocialMediaId { get; set; }
        public int UserId { get; set; }
        public string Location { get; set; }
        public string PhoneNumber { get; set; }
    }
}