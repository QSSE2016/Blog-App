namespace BlogAppAPI.Models
{
    public class Blog
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int authorId { get; set; } // forgot to uppercase the first letters. oh well
        public string authorName { get; set; } = string.Empty;
    }
}
