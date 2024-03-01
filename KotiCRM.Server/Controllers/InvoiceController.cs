using KotiCRM.Repository.Models;
using KotiCRM.Services.IServices;
using KotiCRM.Services.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KotiCRM.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class InvoiceController : Controller
    {
        private readonly IInvoiceService _invoiceService;
        public InvoiceController(IInvoiceService invoiceService)
        {
            _invoiceService = invoiceService;
        }
        [HttpGet]
        [Route("GetInvoiceList")]
        public async Task<IEnumerable<Invoice>> GetInvoiceList()
        {
            return await _invoiceService.GetInvoiceList();
        }

        [HttpGet("GetInvoiceDetails/{id}")]
        public async Task<ActionResult<Invoice>> GetInvoiceDetails(int id)
        {
            return Ok(await _invoiceService.GetInvoiceDetails(id));
        }

        [HttpPost]
        [Route("CreateInvoice")]
        public async Task<ActionResult<Invoice>> CreateInvoice(Invoice invoice)
        {
            return Ok(await _invoiceService.CreateInvoice(invoice));
        }

        [HttpPut("UpdateInvoice/{id}")]

        public async Task<IActionResult> UpdateInvoice(int id, Invoice invoice)
        {
            return Ok(await _invoiceService.UpdateInvoice(id, invoice));
        }


        [HttpDelete("DeleteInvoice/{id}")]
        public async Task<IActionResult> DeleteInvoice(int id)
        {
            return Ok(await _invoiceService.DeleteInvoice(id));
        }
    }
}
