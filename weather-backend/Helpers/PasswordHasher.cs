using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Security.Cryptography;

namespace weather_api.Helpers
{
    public class PasswordHasher
    {
        public static byte[] CreateSalt()
        {
            byte[] salt = new byte[128 / 8];
            RandomNumberGenerator.Fill(salt);
            return salt;
        }

        public static string HashPassword(string password, byte[] salt)
        {
            var hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100_000,
                numBytesRequested: 256 / 8));
            return hashed;
        }

        public static bool VerifyPassword(string enteredPassword, string storedSalt, string storedHash)
        {
            var saltBytes = Convert.FromBase64String(storedSalt);
            var enteredHash = HashPassword(enteredPassword, saltBytes);
            return storedHash == enteredHash;
        }
    }
}
