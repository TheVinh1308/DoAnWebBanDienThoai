using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_Server.Models
{
    public class Brand
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Logo { get; set; }
        [NotMapped]
        public IFormFile LogoFile { get; set; }

        [DefaultValue(true)]
        public bool Status { get; set; }

        public Brand()
        {
            Status = true;
        }
    }
}
