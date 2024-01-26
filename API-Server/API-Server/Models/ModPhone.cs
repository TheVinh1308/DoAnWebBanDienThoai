using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Newtonsoft.Json;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http;

namespace API_Server.Models
{
    public class ModPhone
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public double ScreenSize { get; set; }
        public string Description { get; set; }
        public int Ram { get; set; }
        public int BrandId {  get; set; }
        public Brand Brand { get; set; }
        public string OS {  get; set; }
        public string CPU { get; set; }
        public int Battery { get; set; }
        public string Image {  get; set; }
        [NotMapped]
        public IFormFile ImageFile {  get; set; }
        public int PromotionId { get; set; }
        public Promotion Promotion { get; set; }
        [DefaultValue(true)]
        public bool Status {  get; set; }
        public ModPhone() { Status = true; }
      
    }
}
