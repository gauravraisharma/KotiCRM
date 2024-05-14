using KotiCRM.Repository.Data;
using KotiCRM.Repository.Models;
using KotiCRM.Server.Authentication;
using KotiCRM.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
});

builder.Services.AddEndpointsApiExplorer();

//JWT toket setup 
builder.Services.AddAuthentication(auth =>
{
    auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateIssuerSigningKey = true,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
    options.MapInboundClaims = false;

});

builder.Services.AddSwaggerGen(opt =>
{
    opt.SwaggerDoc("v1", new OpenApiInfo { Title = "MyAPI", Version = "v1" });
    opt.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "bearer"
    });

    opt.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});

builder.Services.AddSingleton<IAuthorizationHandler, ModuleAuthorizationHandler>();

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy(Policies.Accounts, policy => policy.Requirements.Add(new ModuleRequirement(Policies.Accounts, "View:True")));
    options.AddPolicy(Policies.Accounts_Add, policy => policy.Requirements.Add(new ModuleRequirement(Policies.Accounts, "Add:True")));
    options.AddPolicy(Policies.Accounts_Edit, policy => policy.Requirements.Add(new ModuleRequirement(Policies.Accounts, "Edit:True")));
    options.AddPolicy(Policies.Accounts_Delete, policy => policy.Requirements.Add(new ModuleRequirement(Policies.Accounts, "Delete:True")));

});

builder.Services.AddCors(p => p.AddPolicy("defaultCorsPolicy", builder =>
{
    builder.AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader();
})
);

builder.Services.AddInfrastructure();

// Database context setup
builder.Services.AddDbContext<KotiCRMDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DbConnection"), b => b.MigrationsAssembly("KotiCRM.Server")));

//Identity confirguration 
builder.Services.AddIdentity<ApplicationUser, ApplicationRole>().AddEntityFrameworkStores<KotiCRMDbContext>().AddDefaultTokenProviders();

var app = builder.Build();

app.UseDefaultFiles();
// Configure the static file middleware to serve static files from the repository project
app.UseStaticFiles(new StaticFileOptions
{
    // Set the file provider to the directory where the repository project's static files are located
    FileProvider = new PhysicalFileProvider(
        Path.Combine(app.Environment.ContentRootPath, "../KotiCRM.Repository/Uploads/ProfilePictures")),
    RequestPath = "/Uploads/ProfilePictures" // URL prefix to access the files
});

app.UseCors("defaultCorsPolicy");
app.UseAuthentication();
app.UseAuthorization();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();