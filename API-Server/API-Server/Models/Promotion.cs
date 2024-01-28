using System.ComponentModel;

namespace API_Server.Models
{
    public class Promotion
    {
        public int Id { get; set; }
        public string Content { get; set; }

        public double DiscountPercent { get; set; }

        public DateTime DatePromotion { get; set; }
     
        [DefaultValue(true)]
        public bool Status {  get; set; }

        public Promotion()
        {
            DatePromotion = DateTime.Now;
            Status = true;
        }
    }
}
