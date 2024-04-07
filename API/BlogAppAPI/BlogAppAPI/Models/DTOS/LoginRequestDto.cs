namespace BlogAppAPI.Models.DTOS
{
    public class LoginRequestDto
    {
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
