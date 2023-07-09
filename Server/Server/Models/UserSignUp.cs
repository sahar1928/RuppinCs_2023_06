namespace Server.Models
{
    public class UserSignUp
    {
        public UserSignUp(string username, string password, Candidate candidate)
        {
            Username = username;
            Password = password;
            Candidate = candidate;
        }

        public UserSignUp(string username, string password, Company company)
        {
            Username = username;
            Password = password;
            Company = company;
        }

        public string Username { get; set; }
        public string Password { get; set; }
        public Candidate Candidate { get; set; }
        public Company Company { get; set; }
    }
}