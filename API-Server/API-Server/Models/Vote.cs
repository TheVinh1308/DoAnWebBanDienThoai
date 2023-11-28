using System.ComponentModel.DataAnnotations.Schema;

namespace API_Server.Models
{
    public class Vote
    {
        public int Id { get; set; }

        public string UserId {  get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }

        public int ModPhoneId { get; set; }

        public ModPhone ModPhone { get; set; }
        public double Rate { get; set; }
        public string Content {  get; set; }
        public string Image { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }

        public bool Status {  get; set; }

        public Vote()
        {
            Status = true;
        }

    }
}
