using Microsoft.AspNetCore.Http;

namespace KotiCRM.Repository.IRepository
{
    public interface IProfilePictureRepository
    {
        Task<string> UploadProfilePicture(IFormFile profilePicture, string fileName);
        //Task<string> GetImagePathByEmployeeId(string employeeId);
        string GetImagePathByEmployeeId(string profileImage);

    }
}
