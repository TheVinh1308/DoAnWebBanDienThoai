using System.ComponentModel;
using System.Text.Json.Serialization;

namespace API_Server.Models
{
    public class Phone
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string SKU { get; set; }
        public int ModPhoneId { get; set; }

        public ModPhone ModPhone { get; set; }
        [DefaultValue(0)]
        public int Price { get; set; }
        [DefaultValue(0)]
        public int Stock { get; set; }

        public string Color { get; set; }

        public int Rom {  get; set; }

        public Phone()
        {
            Price = 0;
            Stock = 0;
        }

    }
}
