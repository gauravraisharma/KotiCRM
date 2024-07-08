using KotiCRM.Services.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

public class ProfilePictureService : IProfilePictureService
{
    private readonly string _profilePicturePath;
    //private readonly IConfiguration _configuration;

    public ProfilePictureService(IConfiguration configuration)
    {

       // _configuration = configuration;
        _profilePicturePath = configuration.GetSection("ProfileFileConfig:Path").Value;
    }

    public async Task<string> UploadProfilePicture(IFormFile profilePicture)
    {
        if (profilePicture == null || profilePicture.Length == 0)
            throw new ArgumentNullException(nameof(profilePicture),"Profile picture is required");

        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(profilePicture.FileName);
        //var filePath = Path.Combine("E:\\NewKotiCRM\\koticrm.reactuits\\dist\\NewFolder\\", fileName);
        var filePath = Path.Combine( _profilePicturePath, fileName);


        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await profilePicture.CopyToAsync(stream);
        }

        return filePath;
    }

}
