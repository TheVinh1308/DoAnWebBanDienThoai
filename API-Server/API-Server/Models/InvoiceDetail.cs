using System.ComponentModel;

namespace API_Server.Models
{
    public class InvoiceDetail
    {
        public int Id { get; set; }

        public int InvoiceId { get; set; }

        // Reference navigation property cho khóa ngoại đến Invoice
        public Invoice Invoice { get; set; }

        public int PhoneId { get; set; }

        // Navigation reference property cho khóa ngoại đến Product
        public Phone Phone { get; set; }

        [DefaultValue(1)]
        public int Quantity { get; set; }

        [DefaultValue(0)]
        public int UnitPrice { get; set; }

        public InvoiceDetail()
        {
            Quantity = 1;
            UnitPrice = 0;
        }
    }
}
