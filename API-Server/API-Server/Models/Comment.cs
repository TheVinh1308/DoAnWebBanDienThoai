using System.ComponentModel.DataAnnotations.Schema;

namespace API_Server.Models
{
    public class Comment
    {
        public int Id { get; set; }

        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }

        public int PhoneId {  get; set; }

        public Phone Phone { get; set; }

        public string Content { get; set; }

        public DateTime PostDate { get; set; }
        [ForeignKey("ParentComment")]
        public int? ParentCommentId { get; set; }
        public Comment ParentComment { get; set; }

        public bool Status { get; set; }

        public Comment()
        {
            Status = true;
            PostDate = DateTime.Now;
        }
    }
}
