using BlogAppAPI.Data;
using BlogAppAPI.Models;
using BlogAppAPI.Models.DTOS;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BlogAppAPI.Controllers
{
    [Route("api/cred")]
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

        [HttpDelete("{*id}")]
        public async Task<IActionResult> Delete([FromRoute] int blogId)
        {
            Blog? blog = await _context.Blogs.SingleOrDefaultAsync(x => x.Id == blogId);
            if (blog == null)
                return BadRequest("No blog with the given id " + blogId);

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
            Blog? sameTitleBlog = await _context.Blogs.SingleOrDefaultAsync(x => x.Title == request.Title);
            if (sameTitleBlog == null)
                return BadRequest("Can't find the blog you're editing...");

            Blog updatedBlog = new Blog()
            {
                authorId = request.AuthorId,
                authorName = request.AuthorName,
                Title = request.Title,
                Description = request.Description
            };
             
            _context.Blogs.Entry(sameTitleBlog).CurrentValues.SetValues(updatedBlog);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
