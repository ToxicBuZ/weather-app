using weather_app.Helpers;
using weather_app.Models;

namespace weather_app.Services
{
    public class LoginService
    {
        private readonly WeatherDbContext _weatherDbContext;
        private readonly JwtGenerator _jwtGenerator;
        public LoginService(WeatherDbContext weatherDbContext, JwtGenerator jwtGenerator)
        {
            _weatherDbContext = weatherDbContext;
            _jwtGenerator = jwtGenerator;
        }

        public bool Login(string username, string password, out User? user, out string token)
        {
            token = string.Empty;
            user = _weatherDbContext.Users.FirstOrDefault(u => u.Username == username);
            if (user == null)
            {
                return false;
            }
            var isPasswordValid = weather_api.Helpers.PasswordHasher.VerifyPassword(password, user.Salt, user.Password);
            token = isPasswordValid ? _jwtGenerator.GenerateToken(user.Username) : string.Empty;
            return isPasswordValid;
        }
    }
}
