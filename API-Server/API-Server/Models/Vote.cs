using System.ComponentModel.DataAnnotations.Schema;

namespace API_Server.Models
{
    public class Vote
    {
        public int Id { get; set; }

        public string UserId {  get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }

        public int InvoiceId { get; set; }

        // Reference navigation property cho khóa ngoại đến Invoice
        public Invoice Invoice { get; set; }

        public int PhoneId { get; set; }

        // Navigation reference property cho khóa ngoại đến Product
        public Phone Phone { get; set; }
        public double Rate { get; set; }
        public string Content {  get; set; }
        public string Path { get; set; }

        [NotMapped]
        public List<IFormFile> Files { get; set; }
        public string Fullname { get; set; }

        public DateTime Voteday { get; set; }
        public bool Status {  get; set; }

        public Vote()
        {
            Status = true;
        }

    }
}
