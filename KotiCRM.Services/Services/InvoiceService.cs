using KotiCRM.Repository.DTOs.Contact;
using KotiCRM.Repository.DTOs.Invoice;
using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using KotiCRM.Services.IServices;
using System.Drawing.Printing;

namespace KotiCRM.Services.Services;

public class InvoiceService : IInvoiceService
{
    private readonly IInvoiceRepository _invoiceRepository;

    public InvoiceService(IInvoiceRepository invoiceRepository)
    {
        _invoiceRepository = invoiceRepository;
    }

    public async Task<InvoiceWithInvoiceItemAndCount> GetInvoiceList(int? accountID = null, int? status = null, DateTime? startDate = null, DateTime? endDate = null, int? pageNumber = null, int? pageSize = null)
    {
            var invoiceList = (from invoices in await _invoiceRepository.GetInvoiceList(accountID, status, startDate, endDate)
                               select new InvoiceWithItemsDTO
                               {
                                   Invoice = new InvoiceDTO
                                   {
                                       ID = invoices.Invoice.ID,
                                       AccountID = invoices.Invoice.AccountID,
                                       OwnerID = invoices.Invoice.OwnerID,
                                       ContactID = invoices.Invoice.ContactID,
                                       Subject = invoices.Invoice.Subject,
                                       InvoiceDate = invoices.Invoice.InvoiceDate,
                                       DueDate = invoices.Invoice.DueDate,
                                       DealName = invoices.Invoice.DealName,
                                       PurchaseOrder = invoices.Invoice.PurchaseOrder,
                                       Status = invoices.Invoice.Status,
                                       FromBillingCity = invoices.Invoice.FromBillingCity,
                                       FromBillingCountry = invoices.Invoice.FromBillingCountry,
                                       FromBillingStreet = invoices.Invoice.FromBillingStreet,
                                       FromBillingState = invoices.Invoice.FromBillingState,
                                       FromZipCode = invoices.Invoice.FromZipCode,
                                       ToBillingCity = invoices.Invoice.ToBillingCity,
                                       ToBillingStreet = invoices.Invoice.ToBillingStreet,
                                       ToBillingState = invoices.Invoice.ToBillingState,
                                       ToBillingCountry = invoices.Invoice.ToBillingCountry,
                                       ToZipCode = invoices.Invoice.ToZipCode,
                                       TermsAndConditions = invoices.Invoice.TermsAndConditions,
                                       Description = invoices.Invoice.Description,
                                       Isdelete = invoices.Invoice.Isdelete,
                                       CreatedBy = invoices.Invoice.CreatedBy,
                                       CreatedOn = invoices.Invoice.CreatedOn,
                                       ModifiedBy = invoices.Invoice.ModifiedBy,
                                       ModifiedOn = invoices.Invoice.ModifiedOn
                                   },
                                   InvoiceItems = (from item in invoices.InvoiceItems
                                                   select new InvoiceItemDTO
                                                   {
                                                       ID = item.ID,
                                                       InvoiceID = item.InvoiceID,
                                                       Sno = item.Sno,
                                                       ProductName = item.ProductName,
                                                       Description = item.Description,
                                                       Quantity = item.Quantity,
                                                       Amount = item.Amount,
                                                       Discount = item.Discount,
                                                       Tax = item.Tax,
                                                       Total = item.Total,
                                                       IsDeleted = item.IsDeleted
                                                   }).ToList()
                               })
                              .Skip(pageNumber.HasValue && pageSize.HasValue ? (pageNumber.Value - 1) * pageSize.Value : 0)
                               .Take(pageNumber.HasValue && pageSize.HasValue ? pageSize.Value : int.MaxValue);
        var invoice = await _invoiceRepository.GetInvoiceList(null, null, startDate, endDate);
        int count = invoice.Count();
        return new InvoiceWithInvoiceItemAndCount { Invoices = invoiceList, InvoiceCount = count };
    }


    public async Task<InvoiceCreationModel> GetInvoiceDetails(int id)
    {
        return await _invoiceRepository.GetInvoiceDetails(id);
    }

    public async Task<DbResponse> CreateInvoice(InvoiceCreationModel invoiceModel)
    {
        return await _invoiceRepository.CreateInvoice(invoiceModel);
    }

    public async Task<DbResponse> UpdateInvoiceAsync(InvoiceWithItemsDTO invoiceWithItemsDTO)
    {
        if (invoiceWithItemsDTO == null)
        {
            throw new ArgumentNullException(nameof(invoiceWithItemsDTO), "Invoice With Items are null. Please provide data for updating the Invoice.");
        }
        if (invoiceWithItemsDTO.Invoice == null)
        {
            throw new ArgumentNullException(nameof(invoiceWithItemsDTO.Invoice), "Invoice is null. Please provide data for updating the Invoice.");
        }

        // Retrieve the existing invoice details
        InvoiceCreationModel invoiceCreationModel = await _invoiceRepository.GetInvoiceDetails(invoiceWithItemsDTO.Invoice.ID);

        // Update invoice properties
        invoiceCreationModel.Invoice.AccountID = invoiceWithItemsDTO.Invoice.AccountID;
        invoiceCreationModel.Invoice.OwnerID = invoiceWithItemsDTO.Invoice.OwnerID;
        invoiceCreationModel.Invoice.Subject = invoiceWithItemsDTO.Invoice.Subject;
        invoiceCreationModel.Invoice.InvoiceDate = invoiceWithItemsDTO.Invoice.InvoiceDate;
        invoiceCreationModel.Invoice.DueDate = invoiceWithItemsDTO.Invoice.DueDate;
        invoiceCreationModel.Invoice.ContactID = invoiceWithItemsDTO.Invoice.ContactID;
        invoiceCreationModel.Invoice.DealName = invoiceWithItemsDTO.Invoice.DealName;
        invoiceCreationModel.Invoice.PurchaseOrder = invoiceWithItemsDTO.Invoice.PurchaseOrder;
        invoiceCreationModel.Invoice.Status = invoiceWithItemsDTO.Invoice.Status;
        invoiceCreationModel.Invoice.FromBillingStreet = invoiceWithItemsDTO.Invoice.FromBillingStreet;
        invoiceCreationModel.Invoice.FromBillingCity = invoiceWithItemsDTO.Invoice.FromBillingCity;
        invoiceCreationModel.Invoice.FromBillingState = invoiceWithItemsDTO.Invoice.FromBillingState;
        invoiceCreationModel.Invoice.FromZipCode = invoiceWithItemsDTO.Invoice.FromZipCode;
        invoiceCreationModel.Invoice.FromBillingCountry = invoiceWithItemsDTO.Invoice.FromBillingCountry;
        invoiceCreationModel.Invoice.ToBillingStreet = invoiceWithItemsDTO.Invoice.ToBillingStreet;
        invoiceCreationModel.Invoice.ToBillingCity = invoiceWithItemsDTO.Invoice.ToBillingCity;
        invoiceCreationModel.Invoice.ToBillingState = invoiceWithItemsDTO.Invoice.ToBillingState;
        invoiceCreationModel.Invoice.ToZipCode = invoiceWithItemsDTO.Invoice.ToZipCode;
        invoiceCreationModel.Invoice.ToBillingCountry = invoiceWithItemsDTO.Invoice.ToBillingCountry;
        invoiceCreationModel.Invoice.TermsAndConditions = invoiceWithItemsDTO.Invoice.TermsAndConditions;
        invoiceCreationModel.Invoice.Description = invoiceWithItemsDTO.Invoice.Description;
        invoiceCreationModel.Invoice.Isdelete = invoiceWithItemsDTO.Invoice.Isdelete;
        invoiceCreationModel.Invoice.CreatedBy = invoiceWithItemsDTO.Invoice.CreatedBy;
        invoiceCreationModel.Invoice.CreatedOn = invoiceWithItemsDTO.Invoice.CreatedOn;
        invoiceCreationModel.Invoice.ModifiedBy = invoiceWithItemsDTO.Invoice.ModifiedBy;
        invoiceCreationModel.Invoice.ModifiedOn = invoiceWithItemsDTO.Invoice.ModifiedOn;

        // Update invoice items
        foreach (var item in invoiceWithItemsDTO.InvoiceItems!)
        {
            var existingItem = invoiceCreationModel.InvoiceItems.Find(x => x.ID == item.ID);
            if (existingItem != null)
            {
                existingItem.ProductName = item.ProductName;
                existingItem.Description = item.Description;
                existingItem.Quantity = item.Quantity;
                existingItem.Amount = item.Amount;
                existingItem.Discount = item.Discount;
                existingItem.Tax = item.Tax;
                existingItem.Total = item.Total;
                existingItem.IsDeleted = item.IsDeleted;
            }
            else
            {
                invoiceCreationModel.InvoiceItems.Add(new InvoiceItem
                {
                    // Populate properties from item
                    ID = item.ID,
                    ProductName = item.ProductName,
                    Description = item.Description,
                    Quantity = item.Quantity,
                    Amount = item.Amount,
                    Discount = item.Discount,
                    Tax = item.Tax,
                    Total = item.Total,
                    IsDeleted = item.IsDeleted,
                    InvoiceID = item.InvoiceID,
                    Sno = item.Sno,
                });
            }
        }

        DbResponse dbResponse= await _invoiceRepository.UpdateInvoiceAsync(invoiceCreationModel);

        return dbResponse;
    }

    public async Task<DbResponse> DeleteInvoice(int id)
    {
        return await _invoiceRepository.DeleteInvoice(id);
    }
}