
using KotiCRM.Repository.Data;
using KotiCRM.Repository.Models;
using KotiCRM.Server.Authentication;
using KotiCRM.Services;
using KotiCRM.Services.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using KotiCRM.Server.Authentication;
using System.IdentityModel.Tokens.Jwt;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
JwtSecurityTokenHandler.DefaultOutboundClaimTypeMap.Clear();
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
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
    options.MapInboundClaims = false;

});




builder.Services.AddSwaggerGen(opt => {
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
app.UseStaticFiles();




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
