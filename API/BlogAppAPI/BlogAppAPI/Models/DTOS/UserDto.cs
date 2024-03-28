namespace BlogAppAPI.Models.DTOS
{
    // This is what's sent back to front-end to register the current user. I will not be sending password cause i don't really care about it.
    // Not including blogs and such, as i am planning to simply send a request for them
    public class UserDto
    {
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public int Id { get; set; } = 0;
    }
}
