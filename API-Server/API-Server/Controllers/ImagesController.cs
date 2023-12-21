using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Server.Data;
using API_Server.Models;
using Microsoft.VisualBasic;
using Microsoft.AspNetCore.Hosting;
using System.Drawing.Drawing2D;

namespace API_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly PhoneShopIdentityContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ImagesController(PhoneShopIdentityContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        // GET: api/Images
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Image>>> GetImages()
        {
            return await _context.Images.Include(i => i.Phone).ToListAsync();
        }

        //[HttpGet("{id}")]
        //public async Task<ActionResult<Image>> GetImgForPhone(int id)
        //{
        //    return await _context.Images.FindAsync(id);
        //}

        // GET: api/Images/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Image>> GetImage(int id)
        {
            var image = await _context.Images.FindAsync(id);

            if (image == null)
            {
                return NotFound();
            }

            return image;
        }


        //LẤY ẢNH THEO TỪNG ĐIỆN THOẠI
        [HttpGet]
        [Route("GetImgForPhone/{phoneId}")]
        public async Task<ActionResult<Image>> GetImgForPhone(int phoneId)
        {
            var image = await _context.Images.FirstOrDefaultAsync(i => i.PhoneId == phoneId);

            if (image == null)
            {
                return NotFound();
            }

            return image;
        }

        // LẤY ẢNH THEO TỪNG DÒNG ĐIỆN THOẠI
        [HttpGet]
        [Route("GetImgForModPhone/{modphoneId}")]
        public async Task<ActionResult<IEnumerable<Image>>> GetImagesForPhone(int modphoneId)
        {
            var phoneIds = await _context.Phones
                .Where(p => p.ModPhoneId == modphoneId)
                .Select(p => p.Id)
                .ToArrayAsync();

            var images = await _context.Images
                .Include(i => i.Phone)
                .Where(i => phoneIds.Contains(i.PhoneId))
                .ToListAsync();

            if (images == null || images.Count == 0)
            {
                return NotFound();
            }

            return images;
        }

        [HttpGet]
        [Route("GetImgForCart/{userId}")]
        public async Task<ActionResult<IEnumerable<Image>>> GetImagesForCart(string userId)
        {
            var carts = await _context.Carts
                .Where(p => p.UserId == userId)
                .Select(p => p.PhoneId)
                .ToArrayAsync();

            var images = await _context.Images
                .Include(i => i.Phone)
                .Where(i => carts.Contains(i.PhoneId))
                .ToListAsync();

            if (images == null || images.Count == 0)
            {
                return NotFound();
            }

            return images;
        }

        [HttpGet]
        [Route("GetImgForFavorites/{userId}")]
        public async Task<ActionResult<IEnumerable<Image>>> GetImgForFavorites(string userId)
        {
            var favorite = await _context.Favorites
                .Where(p => p.UserId == userId)
                .Select(p => p.PhoneId)
                .ToArrayAsync();

            var images = await _context.Images
                .Include(i => i.Phone)
                .Where(i => favorite.Contains(i.PhoneId))
                .ToListAsync();

            if (images == null || images.Count == 0)
            {
                return NotFound();
            }

            return images;
        }


        // PUT: api/Images/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutImage(int id, Image image)
        {
            if (id != image.Id)
            {
                return BadRequest();
            }

            _context.Entry(image).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ImageExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Images
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<IActionResult> PostImage([FromForm] Image image)
        {
            // Khởi tạo mảng để lưu danh sách tên file
            List<string> fileNames = new List<string>();

            foreach (var file in image.Files)
            {
                if (file.Length > 0)
                {
                    var fileName = file.FileName;
                    var imagePath = Path.Combine(_webHostEnvironment.WebRootPath, "images", "products");

                    var uploadPath = Path.Combine(imagePath, fileName);
                    using (var fileStream = new FileStream(uploadPath, FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream);
                    }

                    // Thêm tên file vào mảng
                    fileNames.Add(fileName);
                }
            } 

            // Chuyển đổi danh sách tên file thành chuỗi JSON
            string jsonFileNames = Newtonsoft.Json.JsonConvert.SerializeObject(fileNames);

            // Lưu chuỗi JSON vào trường Path
            image.Path = jsonFileNames;

            _context.Images.Add(image);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetImage", new { id = image.Id }, image);
        }




        // DELETE: api/Images/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImage(int id)
        {
            var image = await _context.Images.FindAsync(id);
            if (image == null)
            {
                return NotFound();
            }

            _context.Images.Remove(image);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ImageExists(int id)
        {
            return _context.Images.Any(e => e.Id == id);
        }
    }
}
