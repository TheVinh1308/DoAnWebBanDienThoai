namespace API_Server.Models
{
    public class Image
    {
        public int Id { get; set; }
        public int PhoneId {  get; set; }
        public Phone Phone { get; set; }
        public string Path { get; set; }
        public bool Status {  get; set; }

        public Image()
        {
            Status = true;
        }
    }
}
