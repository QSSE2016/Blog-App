using System.Security.Cryptography;

namespace BlogAppAPI.Security
{
    public static class EncryptionInfo
    {
        // Arbitrary, choose whatever you feel like works best
        public static int KeySize = 32;
        public static int Iterations = 100;
        public static HashAlgorithmName HashAlgo = HashAlgorithmName.SHA512;
    }
}
