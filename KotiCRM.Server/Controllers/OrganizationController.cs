using KotiCRM.Repository.DTOs.Organization;
using KotiCRM.Repository.Models;
using KotiCRM.Services.IServices;
using KotiCRM.Services.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KotiCRM.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrganizationController : ControllerBase
    {
        private readonly IOrganizationService _organizationService;

        public OrganizationController(IOrganizationService organizationService)
        {
            _organizationService = organizationService;
        }

        [HttpGet]
        [Route("GetOrganizationList")]
        public async Task<IEnumerable<OrganizationBankResponse>> GetOrganizationList()
        {
            return await _organizationService.GetOrganizationList();
        }

        [HttpGet]
        [Route("GetOrganizationList/{id}")]
        public async Task<OrganizationDTO> GetOrganization(int id)
        {
            return await _organizationService.GetOrganization(id);
        }

        [HttpPut("UpdateOrganization/{id}")]
        public async Task<ActionResult<OrganizationDTO>> UpdateOrganization(int id,Organization organization)
        {
            var res = await _organizationService.UpdateOrganizationTimeZone(id, organization);
            return Ok(res);
        }
    }
}