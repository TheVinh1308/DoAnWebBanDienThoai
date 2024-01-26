using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Server.Data;
using API_Server.Models;
using Microsoft.AspNetCore.Hosting;
using System.Drawing.Drawing2D;
using System.Drawing.Printing;

namespace API_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModPhonesController : ControllerBase
    {
        private readonly PhoneShopIdentityContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ModPhonesController(PhoneShopIdentityContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        // GET: api/ModPhones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ModPhone>>> GetModPhones()
        {
            return await _context.ModPhones.Include(mp => mp.Brand).ToListAsync();
        }
        // GET: api/ModPhones/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ModPhone>> GetModPhone(int id)
        {
            var modPhone = await _context.ModPhones
                .Include(mp => mp.Brand)
                .FirstOrDefaultAsync(mp => mp.Id == id);

            if (modPhone == null)
            {
                return NotFound();
            }

            return modPhone;
        }


        // PUT: api/ModPhones/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutModPhone([FromForm]int id,[FromForm] ModPhone modPhone)
        {
            if (id != modPhone.Id)
            {
                return BadRequest();
            }

            _context.Entry(modPhone).State = EntityState.Modified;

            try
            {
                if (modPhone.ImageFile != null && modPhone.ImageFile.Length > 0)
                {
                    var fileName = modPhone.ImageFile.FileName;
                    var imagePath = Path.Combine(_webHostEnvironment.WebRootPath, "images", "products");

                    var uploadPath = Path.Combine(imagePath, fileName);
                    using (var fileStream = new FileStream(uploadPath, FileMode.Create))
                    {
                        await modPhone.ImageFile.CopyToAsync(fileStream);

                    }

                    //xóa hình ảnh cũ
                    var oldImagePath = Path.Combine(_webHostEnvironment.WebRootPath, "images", "products", modPhone.Image);
                    if (System.IO.File.Exists(oldImagePath))
                    {
                        System.IO.File.Delete(oldImagePath);
                    }

                        
                    modPhone.Image = modPhone.ImageFile.FileName;
                }
                _context.ModPhones.Update(modPhone);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ModPhoneExists(id))
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

        // POST: api/ModPhones
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ModPhone>> PostModPhone([FromForm] ModPhone modPhone)
        {
            if (modPhone.ImageFile != null && modPhone.ImageFile.Length > 0)
            {
                var fileName = modPhone.ImageFile.FileName;
                var imagePath = Path.Combine(_webHostEnvironment.WebRootPath, "images", "products");

                var uploadPath = Path.Combine(imagePath, fileName);
                using (var fileStream = new FileStream(uploadPath, FileMode.Create))
                {
                    await modPhone.ImageFile.CopyToAsync(fileStream);

                }

                // Lưu đường dẫn hình ảnh vào trường Logo    
                modPhone.Image = modPhone.ImageFile.FileName;
            }
            _context.ModPhones.Add(modPhone);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetModPhone", new { id = modPhone.Id }, modPhone);
        }

        // DELETE: api/ModPhones/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteModPhone(int id)
        {
            var modPhone = await _context.ModPhones.FindAsync(id);
            if (modPhone == null)
            {
                return NotFound();
            }

            _context.ModPhones.Remove(modPhone);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet]
        [Route("GetModPhoneByName/{name}")]
        public async Task<ActionResult<ModPhone>> GetModPhoneByName(string name)
        {
            var modPhone = await _context.ModPhones.Where(n => n.Name == name).FirstOrDefaultAsync();


            return modPhone;
            
        }


        private bool ModPhoneExists(int id)
        {
            return _context.ModPhones.Any(e => e.Id == id);
        }
    }
}
