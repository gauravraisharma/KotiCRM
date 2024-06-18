using KotiCRM.Repository.DTOs.Invoice;
using KotiCRM.Repository.Models;
using KotiCRM.Server.Authentication;
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
        // Retrieves a list of invoices based on optional filters.
        /// Requires the policy "Invoices_View" for authorization.
        [HttpGet]
        [Route("GetInvoiceList")]
        [Authorize(Policy = Policies.Invoices_View)]
        public async Task<InvoiceWithInvoiceItemAndCount> GetInvoiceList(int? accountID = null, int? status = null, DateTime? startDate = null, DateTime? endDate = null, int? pageNumber = null, int? pageSize = null)
        {
            return await _invoiceService.GetInvoiceList(accountID, status, startDate, endDate, pageNumber, pageSize);
        }
        // Retrieves details of a specific invoice by its ID.
        /// Requires the policy "Invoices_View" for authorization.
        [HttpGet("GetInvoiceDetails/{id}")]
        [Authorize(Policy = Policies.Invoices_View)]
        public async Task<ActionResult<InvoiceCreationModel>> GetInvoiceDetails(int id)
        {
            return Ok(await _invoiceService.GetInvoiceDetails(id));
        }
        // Creates a new invoice.
        /// Requires the policy "Invoices_Add" for authorization.
        [HttpPost]
        [Route("CreateInvoice")]
        [Authorize(Policy = Policies.Invoices_Add)]
        public async Task<ActionResult<InvoiceCreationModel>> CreateInvoice([FromBody] InvoiceCreationModel invoiceModel)
        {
            return Ok(await _invoiceService.CreateInvoice(invoiceModel));
        }
        // Updates an existing invoice.
        /// Requires the policy "Invoices_Edit" for authorization.
        [HttpPut("UpdateInvoice")]
        [Authorize(Policy = Policies.Invoices_Edit)]
        public async Task<IActionResult> UpdateInvoice(InvoiceWithItemsDTO invoiceWithItemsDTO)
        {
            return Ok(await _invoiceService.UpdateInvoiceAsync(invoiceWithItemsDTO));
        }

        // Deletes an invoice by its ID.
        /// Requires the policy "Invoices_Delete" for authorization.
        [HttpDelete("DeleteInvoice/{id}")]
        [Authorize(Policy = Policies.Invoices_Delete)]
        public async Task<IActionResult> DeleteInvoice(int id)
        {
            return Ok(await _invoiceService.DeleteInvoice(id));
        }
    }
}
