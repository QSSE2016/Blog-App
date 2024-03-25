namespace BlogAppAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string HashedPassword { get; set; } = string.Empty; // or just call it password idk.
        public int[] blogIds { get; set; } = [];

        public byte[] Salt { get; set; } = null!;
    }
}
