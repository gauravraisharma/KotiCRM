using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Repository
{
    public class ProfilePictureRepository : IProfilePictureRepository
    {
        private readonly string _profilePicturePath;
        private readonly string _profilePictureLink;

        public ProfilePictureRepository(IConfiguration configuration)
        {
            _profilePicturePath = configuration.GetSection("ProfileFileConfig:Path").Value;
            _profilePictureLink = configuration.GetSection("ProfileFileConfig:Link").Value;
        }

        public async Task<string> UploadProfilePicture(IFormFile profilePicture, string fileName)
        {
            if (profilePicture == null || profilePicture.Length == 0)
                throw new ArgumentNullException(nameof(profilePicture), "Profile picture is required");



            try
            {
                if (!Directory.Exists(_profilePicturePath))
                    Directory.CreateDirectory(_profilePicturePath);

                string name = String.Concat(DateTime.Now.ToString("MM_dd_yyyy_HH_mm"), "_", fileName, Path.GetExtension(ContentDispositionHeaderValue.Parse(profilePicture.ContentDisposition).FileName.Trim('"')));
                string fullPath = Path.Combine(_profilePicturePath, name);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    await profilePicture.CopyToAsync(stream);
                }

                return name;
            }
            catch (Exception ex)
            {
                // Handle exceptions here
                throw ex;
            }
        }
        //    public async Task<string> UpdateProfilePicture(string employeeId, IFormFile updatedProfilePicture, string fileName)
        //    {
        //        var employee = await _profilePicturePath.GetEmployeeById(employeeId);
        //        var existingImagePath = employee.ImagePath;

        //        // Delete existing profile picture file
        //        if (File.Exists(existingImagePath))
        //        {
        //            File.Delete(existingImagePath);
        //        }

        //        // Proceed with uploading the new profile picture
        //        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "ProfileImage");

        //        try
        //        {
        //            if (!Directory.Exists(filePath))
        //                Directory.CreateDirectory(filePath);

        //            string name = String.Concat(DateTime.Now.ToString("MM_dd_yyyy_HH_mm"), "_", fileName, Path.GetExtension(ContentDispositionHeaderValue.Parse(updatedProfilePicture.ContentDisposition).FileName.Trim('"')));
        //            string fullPath = Path.Combine(filePath, name);

        //            using (var stream = new FileStream(fullPath, FileMode.Create))
        //            {
        //                await updatedProfilePicture.CopyToAsync(stream);
        //            }

        //            return fullPath;
        //        }
        //        catch (Exception ex)
        //        {
        //            // Handle exceptions here
        //            throw ex;
        //        }
        //    }

        //}

        public string GetImagePathByEmployeeId(string profilePic)
        {
            var absolutePath = Path.Combine(_profilePicturePath, profilePic);
            if (File.Exists(absolutePath))
            {
                return Path.Combine(_profilePictureLink, profilePic);
            }
            else
            {
                return null;
            }

        }

    }
}
