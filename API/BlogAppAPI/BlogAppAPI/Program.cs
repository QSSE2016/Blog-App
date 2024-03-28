using BlogAppAPI.Data;
using BlogAppAPI.Security;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddRouting(options => options.LowercaseUrls = true); // everything is lower case, just in case some controller uses Capitals for some reason,idk.

// Add context
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("BlogDB"));
});


// Add "global" services.
builder.Services.AddSingleton<Hasher>();
builder.Services.AddSingleton<Verifier>();

var app = builder.Build();
app.UseHttpsRedirection();

// Allow any request from angular app.
app.UseCors(options =>
{
    options.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod().AllowCredentials();
});


app.MapControllers(); // word of advice: DON'T FORGET THIS LINE. LIKE EVER. DON'T. Controllers are literally useless without this.

app.Run();