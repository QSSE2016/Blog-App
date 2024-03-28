using BlogAppAPI.Data;
using BlogAppAPI.Security;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddRouting(options => options.LowercaseUrls = true); // everything is lower case, just in case some controller uses Capitals for some reason,idk.


// Add "global" services.
builder.Services.AddSingleton<Hasher>();
builder.Services.AddSingleton<Verifier>();

// Add context
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("BlogDB"));
});

var app = builder.Build();
app.UseHttpsRedirection();

// Allow any request from angular app.
app.UseCors(options =>
{
    options.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod().AllowCredentials();
});

app.Run();