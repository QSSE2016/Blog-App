using BlogAppAPI.Data;
using BlogAppAPI.Models;
using BlogAppAPI.Models.DTOS;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace BlogAppAPI.Controllers
{
    [Route("api/blog")]
    [ApiController]
    public class BlogController : Controller
    {
        private readonly AppDbContext _context;

        public BlogController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> AllBlogs()
        {
            var blogs = await _context.Blogs.ToArrayAsync();
            return Ok(blogs);
        }

        [HttpPost]
        [Route("user-based")]
        public async Task<IActionResult> BlogsById(BlogRequestDto request)
        {
            var blogs = await _context.Blogs.Where(x => x.authorId == request.Id && x.authorName == request.Name).ToArrayAsync();
            if (blogs == null)
                return NotFound();
            
            return Ok(blogs);
        }

        // OK I GIVE UP I COULDN'T GET THIS TO WORK WITH HTTPDELETE
        [HttpPost]
        [Route("delete")]
        public async Task<IActionResult> Delete(DeleteRequestDto request)
        {
            Blog? blog = await _context.Blogs.SingleOrDefaultAsync(x => x.Id == request.Id);
            if (blog == null)
                return NotFound(new { id = request.Id});

            _context.Blogs.Remove(blog);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create(EditOrCreateBlogRequestDto request)
        {
            Blog? sameTitleBlog = await _context.Blogs.SingleOrDefaultAsync(x => x.Title == request.Title);
            if (sameTitleBlog != null)
                return BadRequest("Can't create this blog because there already is another blog with that title.");

            Blog toAdd = new Blog()
            {
                authorId = request.AuthorId,
                authorName = request.AuthorName,
                Title = request.Title,
                Description = request.Description
            };
            await _context.Blogs.AddAsync(toAdd);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost]
        [Route("edit")]
        public async Task<IActionResult> Edit(EditOrCreateBlogRequestDto request)
        {
            var titleToSearchWith = request.OriginalTitle.IsNullOrEmpty() ? request.Title : request.OriginalTitle;
            Blog? blogToEdit = await _context.Blogs.SingleOrDefaultAsync(x => x.Title == titleToSearchWith);
            if (blogToEdit == null)
                return BadRequest("Can't find the blog you're editing...");

            // Update blog (without triggering error where you can't change id or whatever)
            // DbContext tracks the blog so you can just update it independently...
            blogToEdit.Title = request.Title;
            blogToEdit.Description = request.Description;
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
