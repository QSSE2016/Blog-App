using System.ComponentModel.DataAnnotations.Schema;

namespace BlogAppAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string HashedPassword { get; set; } = string.Empty; // or just call it password idk.

        // EF Core can't actually store primitive type arrays. Don't ask me why, but it can't. This is a workaround.
        public string InternalBlogIds { get; set; } = string.Empty;

        [NotMapped]
        public int[] BlogIds
        {
            get
            {
                if (InternalBlogIds == "")
                    return Array.Empty<int>();

                return Array.ConvertAll(InternalBlogIds.Split(','), int.Parse);
            }
            set
            {
                this.InternalBlogIds = string.Join(',', value);
            }
        }

        // I like how int arrays are not ok but this shit is
        public byte[] Salt { get; set; } = null!;
    }
}
