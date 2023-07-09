using Server.Models;
using Server.Models.enums;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Web.Http;

namespace Server.Controllers
{
    public class CompaniesController : ApiController
    {
        [HttpPost]
        public IHttpActionResult CompanySignUp(Company company)
        {
            try
            {
                int userId = SaveUser(company.User);
                int socialMediaId = SaveSocialMedia(company.SocialMedia);


                SaveCompany(company, socialMediaId, userId);

                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
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

        private int SaveCompany(Company company, int socialMediaId, int userId)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "INSERT INTO Company (EmailUrl, Name, Website, SocialMediaId, Description, Logo, UserId, Location, PhoneNumber) " +
                                          "VALUES (@EmailUrl, @Name, @Website, @SocialMediaId, @Description, @Logo, @UserId, @Location, @PhoneNumber)";

                    command.Parameters.AddWithValue("@EmailUrl", company.EmailUrl);
                    command.Parameters.AddWithValue("@Name", company.Name);
                    command.Parameters.AddWithValue("@Website", company.Website);
                    command.Parameters.AddWithValue("@SocialMediaId", socialMediaId);
                    command.Parameters.AddWithValue("@Description", company.Description);
                    command.Parameters.AddWithValue("@Logo", company.Logo);
                    command.Parameters.AddWithValue("@UserId", userId);
                    command.Parameters.AddWithValue("@Location", company.Location);
                    command.Parameters.AddWithValue("@PhoneNumber", company.PhoneNumber);

                    return command.ExecuteNonQuery();
                }
            }
        }

        [HttpGet]
        [Route("api/Companies/GetAllCompanies")]
        public IHttpActionResult GetAllCompanies()
        {
            try
            {
                List<Company> companies = RetrieveAllCompanies();

                if (companies.Count == 0)
                    return NotFound();

                foreach (Company company in companies)
                {
                    SocialMedia socialMedia = RetrieveSocialMedia(company.SocialMediaId);
                    company.SocialMedia = socialMedia;

                    User companyUser = GetUser(company.UserId);
                    company.User = companyUser;
                }

                return Ok(companies);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        private List<Company> RetrieveAllCompanies()
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "SELECT * FROM Company";

                    using (var reader = command.ExecuteReader())
                    {
                        List<Company> companies = new List<Company>();

                        while (reader.Read())
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
                                Location = (string)reader["Location"],
                                PhoneNumber = (string)reader["PhoneNumber"]
                            };

                            companies.Add(company);
                        }

                        return companies;
                    }
                }
            }

            return new List<Company>();
        }


        [HttpGet]
        [Route("api/Companies/GetCompany/{userId}")]
        public IHttpActionResult GetCompany(int userId)
        {
            try
            {
                Company company = RetrieveCompanyByUserId(userId);

                if (company == null)
                    return NotFound();

                SocialMedia socialMedia = RetrieveSocialMedia(company.SocialMediaId);
                company.SocialMedia = socialMedia;

                User companyUser = GetUser(company.UserId);
                company.User = companyUser;

                return Ok(company);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        private Company RetrieveCompanyByUserId(int userId)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "SELECT * FROM Company WHERE UserId = @UserId";
                    command.Parameters.AddWithValue("@UserId", userId);

                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.Read())
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
                                Location = (string)reader["Location"],
                                PhoneNumber = (string)reader["PhoneNumber"]
                            };

                            return company;
                        }
                    }
                }
            }

            return null;
        }

        private SocialMedia RetrieveSocialMedia(int socialMediaId)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "SELECT * FROM SocialMedia WHERE Id = @SocialMediaId";
                    command.Parameters.AddWithValue("@SocialMediaId", socialMediaId);

                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            SocialMedia socialMedia = new SocialMedia
                            {
                                LinkedinURL = (string)reader["LinkedinURL"],
                                TwitterURL = (string)reader["TwitterURL"],
                                FacebookURL = (string)reader["FacebookURL"],
                                PinterestURL = (string)reader["PinterestURL"],
                                InstagramURL = (string)reader["InstagramURL"]
                            };

                            return socialMedia;
                        }
                    }
                }
            }

            return null;
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
