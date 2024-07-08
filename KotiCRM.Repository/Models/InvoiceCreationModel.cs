namespace KotiCRM.Repository.Models
{
    public class InvoiceCreationModel
    {
        public Invoice Invoice { get; set; }
        public List<InvoiceItem> InvoiceItems { get; set; }
    }
}