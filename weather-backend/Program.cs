using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using weather_app;
using weather_app.Helpers;
using weather_app.Models;
using weather_app.Services;

var builder = WebApplication.CreateBuilder(args);

// Configure CORS policy (adjust origins in appsettings.json)
var allowedOrigins = builder.Configuration.GetSection("AllowedCorsOrigins").Get<string[]>() ?? new string[] { "http://localhost:4200" };

builder.Services.AddCors(options =>
{
    options.AddPolicy("DefaultCorsPolicy", policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Register application services
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<LoginService>();
builder.Services.AddHttpClient<WeatherService>();
builder.Services.AddScoped<JwtGenerator>();
builder.Services.AddSingleton(builder.Configuration.GetSection("JwtConfig").Get<JwtConfig>() ?? new JwtConfig());
builder.Services.AddSingleton(builder.Configuration.GetSection("WeatherConfig").Get<WeatherConfig>() ?? new WeatherConfig());

// Register DbContext with PostgreSQL provider
builder.Services.AddDbContext<WeatherDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add controllers and swagger services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var jwtConfig = builder.Configuration.GetSection("JwtConfig").Get<JwtConfig>();

var secret = jwtConfig?.JwtSecretKey ?? string.Empty;

builder.Services.AddAuthentication(option =>
{
    option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = "weather-app",
        ValidAudience = "weather-app-user",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret.ToString().ToCharArray())),
        ClockSkew = TimeSpan.Zero // Optional: remove token expiration tolerance
    };
});



var app = builder.Build();

// Use swagger only in development environment
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Enable CORS middleware before routing
app.UseCors("DefaultCorsPolicy");

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
