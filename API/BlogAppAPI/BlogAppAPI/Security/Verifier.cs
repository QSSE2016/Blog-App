using System.Security.Cryptography;

namespace BlogAppAPI.Security
{
    public class Verifier
    {
        public bool VerifyPassword(string password, string hash, byte[] salt)
        {
            var hashToCompare = Rfc2898DeriveBytes.Pbkdf2(password, salt, EncryptionInfo.Iterations, EncryptionInfo.HashAlgo, EncryptionInfo.KeySize);
            return CryptographicOperations.FixedTimeEquals(hashToCompare, Convert.FromHexString(hash)); // fixed time, so timing exploits are mitigated.
        }
    }
}
