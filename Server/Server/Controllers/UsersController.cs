using Newtonsoft.Json;
using Server.Models;
using Server.Models.enums;
using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Server.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]

    public class UsersController : ApiController
    {

        [HttpPost]
        public async Task<IHttpActionResult> Login(UserValidation userValidation)
        {
            try
            {
                User user = ValidateValidation(userValidation);

                if (user == null)
                {
                    return NotFound();
                }

                int userId = user.Id;

                using (var client = new HttpClient())
                {
                    string url = "https://proj.ruppin.ac.il/cgroup6/test2/tar6/api/";

                    if (user.UserType == UserType.Candidate)
                    {
                        HttpResponseMessage response = await client.GetAsync($"{url}Candidates/GetCandidate/{userId}");
                        response.EnsureSuccessStatusCode();

                        return ResponseMessage(response);
                    }
                    else if (user.UserType == UserType.Company)
                    {
                        HttpResponseMessage response = await client.GetAsync($"{url}Companies/GetCompany/{userId}");
                        response.EnsureSuccessStatusCode();

                        return ResponseMessage(response);
                    }
                    else
                    {
                        return BadRequest("Invalid user type");
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        public async Task<IHttpActionResult> CandidateSignUp(Candidate candidateSignUp)
        {
            try
            {
                bool isUsernameAvailable = CheckUsernameAvailability(candidateSignUp.User.Username);
                bool isPasswordValid = ValidatePassword(candidateSignUp.User.Password, out string errorMessage);

                if (!isUsernameAvailable)
                    return BadRequest("Username not available.");

                if (!isPasswordValid)
                    return BadRequest(errorMessage);
                try
                {
                    string json = JsonConvert.SerializeObject(candidateSignUp);

                    using (var client = new HttpClient())
                    {
                        string url = "https://proj.ruppin.ac.il/cgroup6/test2/tar6/api/Candidates/CandidateSignUp";

                        var content = new StringContent(json, Encoding.UTF8, "application/json");

                        var response = await client.PostAsync(url, content);

                        if (response.IsSuccessStatusCode)
                        {
                            return Ok();
                        }
                        else
                        {
                            var err = await response.Content.ReadAsStringAsync();
                            return BadRequest(err);
                        }
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }


            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        public async Task<IHttpActionResult> CompanySignUp(Company companySignUp)
        {
            try
            {
                bool isUsernameAvailable = CheckUsernameAvailability(companySignUp.User.Username);
                bool isPasswordValid = ValidatePassword(companySignUp.User.Password, out string errorMessage);

                if (!isUsernameAvailable)
                    return BadRequest("Username not available.");

                if (!isPasswordValid)
                    return BadRequest(errorMessage);
                try
                {
                    string json = JsonConvert.SerializeObject(companySignUp);

                    using (var client = new HttpClient())
                    {
                        string url = "https://proj.ruppin.ac.il/cgroup6/test2/tar6/api/Companies/CompanySignUp";

                        var content = new StringContent(json, Encoding.UTF8, "application/json");

                        var response = await client.PostAsync(url, content);

                        if (response.IsSuccessStatusCode)
                        {
                            return Ok();
                        }
                        else
                        {
                            var err = await response.Content.ReadAsStringAsync();
                            return BadRequest(err);
                        }
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }


            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        private User ValidateValidation(UserValidation userValidation)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "SELECT * FROM Users WHERE Username = @Username AND Password = @Password";
                    command.Parameters.AddWithValue("@Username", userValidation.Username);
                    command.Parameters.AddWithValue("@Password", userValidation.Password);

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

        private bool CheckUsernameAvailability(string username)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "SELECT COUNT(*) FROM Users WHERE Username = @Username";
                    command.Parameters.AddWithValue("@Username", username);

                    int count = (int)command.ExecuteScalar();
                    return count == 0;
                }
            }
        }

        private bool ValidatePassword(string password, out string errorMessage)
        {

            if (string.IsNullOrEmpty(password) || password.Length < 6)
            {
                errorMessage = "Password must be at least 6 characters long.";
                return false;
            }

            bool hasUpperCase = false;
            bool hasLowerCase = false;
            bool hasDigit = false;
            bool hasSpecialChar = false;

            foreach (char c in password)
            {
                if (char.IsUpper(c))
                    hasUpperCase = true;
                else if (char.IsLower(c))
                    hasLowerCase = true;
                else if (char.IsDigit(c))
                    hasDigit = true;
                else if (char.IsSymbol(c) || char.IsPunctuation(c))
                    hasSpecialChar = true;
            }

            if (!hasUpperCase)
            {
                errorMessage = "Password must contain at least one uppercase letter.";
                return false;
            }
            if (!hasLowerCase)
            {
                errorMessage = "Password must contain at least one lowercase letter.";
                return false;
            }
            if (!hasDigit)
            {
                errorMessage = "Password must contain at least one digit.";
                return false;
            }
            if (!hasSpecialChar)
            {
                errorMessage = "Password must contain at least one special character.";
                return false;
            }

            errorMessage = string.Empty;
            return true;
        }




        public IHttpActionResult UsernameNotAvailable(Exception ex)
        {

            return BadRequest(ex.Message);
        }

        public IHttpActionResult InvalidPassword(Exception ex)
        {
            return BadRequest(ex.Message);
        }

        public IHttpActionResult InvalidValidation(Exception ex)
        {
            return BadRequest(ex.Message);
        }

        public IHttpActionResult InvalidUserType(Exception ex)
        {
            return BadRequest(ex.Message);
        }

    }
}
