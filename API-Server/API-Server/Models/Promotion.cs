using System.ComponentModel;

namespace API_Server.Models
{
    public class Promotion
    {
        public int Id { get; set; }
        public string Content { get; set; }

        public double DiscountPercent { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
        [DefaultValue(true)]
        public bool Status {  get; set; }

        public Promotion()
        {
            Status = true;
        }
    }
}
