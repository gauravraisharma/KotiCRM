using Microsoft.AspNetCore.Identity;

namespace KotiCRM.Repository.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Password { get; set; }
        public bool RememberMe { get;  set; }
        public int RollId { get; set; }
        public bool IsModify {  get; set; }
        public string ModifiedBy {  get; set; }
        public bool IsDelete {  get; set; }
    }
}
