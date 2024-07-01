using KotiCRM.Repository.Constants;
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
        private readonly string _profilePicturePath; // Path where profile pictures are stored
        private readonly string _profilePictureLink; // Link used to access profile pictures

        // Constructor to initialize configuration settings
        public ProfilePictureRepository(IConfiguration configuration)
        {
            _profilePicturePath = configuration.GetSection("BaseFileConfig:Path").Value;
            _profilePictureLink = configuration.GetSection("BaseFileConfig:Link").Value;
        }
        // Method to upload a profile picture
        public async Task<string> UploadProfilePicture(IFormFile profilePicture, string fileName)
        {
            // Check if the profile picture is null or empty
            if (profilePicture == null || profilePicture.Length == 0)
                throw new ArgumentNullException(nameof(profilePicture), "Profile picture is required");

            try
            {
                // Check if the directory exists, if not, create it
                if (!Directory.Exists(_profilePicturePath + '/' + PathConstant.PROFILE_PICTURE_FOLDER))
                    Directory.CreateDirectory(_profilePicturePath + '/' + PathConstant.PROFILE_PICTURE_FOLDER);
                // Create a unique name for the profile picture
                string name = String.Concat(DateTime.Now.ToString("MM_dd_yyyy_HH_mm"), "_", fileName, Path.GetExtension(ContentDispositionHeaderValue.Parse(profilePicture.ContentDisposition).FileName.Trim('"')));
                string fullPath = Path.Combine(_profilePicturePath, PathConstant.PROFILE_PICTURE_FOLDER, name);
                // Save the profile picture to the file system
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    await profilePicture.CopyToAsync(stream);
                }
                // Return the name of the uploaded file
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
        // Method to get the image path by employee ID
        public string GetImagePathByEmployeeId(string profilePic)
        {
            // Return null if profilePic is null
            if (profilePic == null)
            {
                return null;
            }
            // Combine paths to get the absolute path
            var absolutePath = Path.Combine(_profilePicturePath, PathConstant.PROFILE_PICTURE_FOLDER, profilePic);

            // Check if the file exists
            if (File.Exists(absolutePath))
            {
                // Return the web link to the profile picture
                return Path.Combine(_profilePictureLink + '/' + PathConstant.PROFILE_PICTURE_FOLDER, profilePic);
            }
            else
            {
                // Return null if the file doesn't exist
                return null;
            }
        }
    }
}
