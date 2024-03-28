using BlogAppAPI.Data;
using BlogAppAPI.Models;
using BlogAppAPI.Models.DTOS;
using BlogAppAPI.Security;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BlogAppAPI.Controllers
{
    // Responsible for login and sign up (couldn't find a better name,shut up)

    [ApiController]
    [Route("api/[controller]")]
    public class CredController : Controller
    {
        private readonly AppDbContext context; // too bored to use repository pattern.
        private readonly Verifier verifier;
        private readonly Hasher hasher;
        public CredController(AppDbContext context,Verifier verifier,Hasher hasher) { 
            this.context = context;
            this.verifier = verifier;
            this.hasher = hasher;
        }

        [HttpPost]
        [Route("log-in")]
        public async Task<IActionResult> Login(LoginRequestDto request)
        {
            // Assume that no duplicate names exist.
            User? user = await context.Users.SingleOrDefaultAsync(user => user.Name == request.Username);
            if(user == null)
                return NotFound();

            // Logged in!
            if (verifier.VerifyPassword(request.Password, user.HashedPassword, user.Salt))
                return Ok();
           
            // Incorrect credentials
            return Unauthorized();
        }

        [HttpPost]
        [Route("sign-up")]
        public async Task<IActionResult> SignUp(SignUpRequestDto request)
        {
            string hashed = hasher.HashPassword(request.Password, out var salt);

            User toAdd = new User()
            {
                Name = request.Username,
                Email = request.Email,
                HashedPassword = hashed,
                Salt = salt,
                blogIds = []
            };

            try
            {
                await context.AddAsync(toAdd);
                await context.SaveChangesAsync();
            } catch(Exception ex)
            {
                // Oops something went wrong
                return StatusCode(500,ex.Message);
            }

            return Ok();
        }
    }
}
