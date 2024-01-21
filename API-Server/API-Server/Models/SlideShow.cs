using System.ComponentModel.DataAnnotations.Schema;

namespace API_Server.Models
{
    public class SlideShow
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public int ModPhoneId {  get; set; }
        public ModPhone ModPhone { get; set; }

        public string Path { get; set; }

        [NotMapped]
        public IFormFile FilePath { get; set; }

        public bool Status { get; set; }

        public SlideShow()
        {
            Status = true;
        }
    }
}
