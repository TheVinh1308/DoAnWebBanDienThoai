using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_Server.Models
{
    public class Image
    {
        public int Id { get; set; }
        public int PhoneId {  get; set; }
        public Phone Phone { get; set; }
       /* [NotMapped]
        public string[] Path { get; set; }
        public string PathJson
        {
            get => JsonConvert.SerializeObject(Path);
            set => Path = JsonConvert.DeserializeObject<string[]>(value);
        }*/

        public string Path { get; set; }
        [NotMapped]
        public List<IFormFile> Files { get; set; }
        public bool Status {  get; set; }

        public Image()
        {
            Status = true;
        }
    }
}
