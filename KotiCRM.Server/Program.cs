using KotiCRM.Repository.Data;
using KotiCRM.Repository.Models;
using KotiCRM.Server.Authentication;
using KotiCRM.Services;
using KotiCRM.Services.Services.IServices;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Features;
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

builder.Services.AddAuthorization(async options =>
{
    using (var scope = builder.Services.BuildServiceProvider().CreateScope())
    {
        var permissionService = scope.ServiceProvider.GetRequiredService<IPermissionService>();
        var permissions = await permissionService.GetPermissionsAsync();
        var modules = await permissionService.GetModulesAsync();

        foreach (var permission in permissions)
        {
            var module = modules.FirstOrDefault(m => m.Id == permission.ModuleID);

            if (module != null)
            {
                if (permission.View)
                {
                    options.AddPolicy($"{module.Name}.View", policy => policy.Requirements.Add(new ModuleRequirement(module.Name, "View:True")));
                }

                if (permission.Add)
                {
                    options.AddPolicy($"{module.Name}.Add", policy => policy.Requirements.Add(new ModuleRequirement(module.Name, "Add:True")));
                }

                if (permission.Edit)
                {
                    options.AddPolicy($"{module.Name}.Edit", policy => policy.Requirements.Add(new ModuleRequirement(module.Name, "Edit:True")));
                }

                if (permission.Delete)
                {
                    options.AddPolicy($"{module.Name}.Delete", policy => policy.Requirements.Add(new ModuleRequirement(module.Name, "Delete:True")));
                }
            }
        }
    }
});

builder.Services.AddCors(p => p.AddPolicy("defaultCorsPolicy", builder =>
{
    builder.AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader();
})
);

builder.Services.AddInfrastructure();

builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 104857600; // 100 MB
});

// Database context setup
builder.Services.AddDbContext<KotiCRMDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DbConnection"), b => b.MigrationsAssembly("KotiCRM.Server")));

//Identity confirguration 
builder.Services.AddIdentity<ApplicationUser, ApplicationRole>().AddEntityFrameworkStores<KotiCRMDbContext>().AddDefaultTokenProviders();

var app = builder.Build();

app.UseDefaultFiles();
// Configure the static file middleware to serve static files from the repository project
//app.UseStaticFiles(new StaticFileOptions
//{
//    // Set the file provider to the directory where the repository project's static files are located
//    FileProvider = new PhysicalFileProvider(
//        Path.Combine(app.Environment.ContentRootPath, "../KotiCRM.Repository/Uploads/ProfilePictures")),
//    RequestPath = "/Uploads/ProfilePictures" // URL prefix to access the files
//});

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