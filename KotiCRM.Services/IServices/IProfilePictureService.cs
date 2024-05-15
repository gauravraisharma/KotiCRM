using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Services.IServices
{
    public interface IProfilePictureService
    {
        Task<string> UploadProfilePicture(IFormFile profilePicture);
        //Task<string> UpdateProfilePicture(string employeeId, IFormFile updatedProfilePicture);


    }
}
