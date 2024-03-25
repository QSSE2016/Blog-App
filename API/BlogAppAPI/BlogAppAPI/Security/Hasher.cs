using System.Security.Cryptography;
using System.Text;

namespace BlogAppAPI.Security
{
    public class Hasher
    {
        public string HashPassword(string password, out byte[] salt)
        {
            salt = RandomNumberGenerator.GetBytes(EncryptionInfo.KeySize);
            var hash = Rfc2898DeriveBytes.Pbkdf2(Encoding.UTF8.GetBytes(password), salt, 100, EncryptionInfo.HashAlgo, EncryptionInfo.KeySize);
            return Convert.ToHexString(hash);
        }
    }
}
