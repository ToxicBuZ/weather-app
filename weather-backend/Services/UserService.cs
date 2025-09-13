using weather_app.Models;

namespace weather_app.Services
{
    public class UserService
    {
        private readonly WeatherDbContext _dbContext;
        public UserService(WeatherDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public User GetById(long id)
        {
            var user = _dbContext.Users.FirstOrDefault(U => U.Id == id);
            return user ?? new User();
        }

        public List<User> GetAll()
        {
            return _dbContext.Users.ToList();
        }

        public User Create(User user)
        {
            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
            return user;
        }
        public User Update(long id, User user)
        {
            var existingUser = _dbContext.Users.FirstOrDefault(U => U.Id == id);
            if (existingUser == null)
            {
                return new User();
            }
            existingUser.Username = user.Username;
            existingUser.Password = user.Password;
            existingUser.Email = user.Email;
            existingUser.FirstName = user.FirstName;
            existingUser.LastName = user.LastName;
            _dbContext.SaveChanges();
            return existingUser;
        }

        public bool Delete(long id)
        {
            var user = _dbContext.Users.FirstOrDefault(U => U.Id == id);
            if (user == null)
            {
                return false;
            }
            _dbContext.Users.Remove(user);
            _dbContext.SaveChanges();
            return true;
        }
    }
}
