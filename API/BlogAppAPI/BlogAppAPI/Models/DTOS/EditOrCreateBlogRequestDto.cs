namespace BlogAppAPI.Models.DTOS
{
    public class EditOrCreateBlogRequestDto
    {
        public string OriginalTitle { get; set; } = null!;
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string AuthorName { get; set; } = null!;
        public int AuthorId { get; set; }
    }
}
