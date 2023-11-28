using System.ComponentModel.DataAnnotations.Schema;

namespace API_Server.Models
{
    public class Favorite
    {
        public int Id { get; set; }

        public int ModPhoneId { get; set; }

        public ModPhone ModPhone { get; set; }

        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }

        public bool Status { get; set; }

        public Favorite()
        {
            Status = true;
        }
    }
}
