using BlogAppAPI.Data;
using BlogAppAPI.Models;
using BlogAppAPI.Models.DTOS;
using BlogAppAPI.Security;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BlogAppAPI.Controllers
{
    // Responsible for login and sign up (couldn't find a better name,shut up)

    [Route("api/cred")]
    [ApiController]
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

        [HttpGet]
        public IActionResult Get()
        {
            return Ok();
        }

        [HttpPost]
        [Route("log-in")]
        public async Task<IActionResult> Login(LoginRequestDto request)
        {
            // Assume that no duplicate names exist.
            User? user = await context.Users.SingleOrDefaultAsync(user => user.Name == request.Username);
            if(user == null)
                return NotFound("Invalid credentials. Please try again");

            // Logged in!
            if (verifier.VerifyPassword(request.Password, user.HashedPassword, user.Salt))
            {
                UserDto response = new UserDto()
                {
                    Username = user.Name,
                    Email = user.Email,
                    Id = user.Id
                };
                return Ok(response);
            }
           
            // Incorrect credentials
            return Unauthorized("Invalid credentials. Please try again");
        }

        [HttpPost]
        [Route("sign-up")]
        public async Task<IActionResult> SignUp(SignUpRequestDto request)
        {
            // email and username are unique to every user
            User? user = await context.Users.SingleOrDefaultAsync(user => user.Name == request.Username || user.Email == request.Email);
            if (user != null)
                return StatusCode(400, "The username or password you entered belong to another account. Please try different credentials");


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
                return StatusCode(500,"Something went wrong while attempting to sign up. Please try again later.");
            }

            return Ok();
        }
    }
}
