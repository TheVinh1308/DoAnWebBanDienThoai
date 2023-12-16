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
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Authorization;

namespace API_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
  
    public class BrandsController : ControllerBase
    {
        private readonly PhoneShopIdentityContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public BrandsController(PhoneShopIdentityContext context,IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;   
        }

        // GET: api/Brands
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Brand>>> GetBrands()
        {
            return await _context.Brands.ToListAsync();
        }

        // GET: api/Brands/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Brand>> GetBrand(int id)
        {
            var brand = await _context.Brands.FindAsync(id);

            if (brand == null)
            {
                return NotFound();
            }

            return brand;
        }

        // PUT: api/Brands/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> PutBrand([FromForm] int id, [FromForm] Brand brand)
        {
            if (id != brand.Id)
            {
                return BadRequest();
            }

            _context.Entry(brand).State = EntityState.Modified;

            try
            {
                if (brand.LogoFile != null && brand.LogoFile.Length > 0)
                {
                   
                   
                    var fileName = brand.LogoFile.FileName;
                    var imagePath = Path.Combine(_webHostEnvironment.WebRootPath, "images", "brands");
                    var uploadPath = Path.Combine(imagePath, fileName);
                    using (var fileStream = new FileStream(uploadPath, FileMode.Create))
                    {
                        await brand.LogoFile.CopyToAsync(fileStream);

                    }
                    //xóa hình ảnh cũ
                    var oldImagePath = Path.Combine(_webHostEnvironment.WebRootPath, "images", "brands", brand.Logo);
                    if (System.IO.File.Exists(oldImagePath))
                    {
                        System.IO.File.Delete(oldImagePath);
                    }

                    // Lưu đường dẫn hình ảnh vào trường Logo
                    brand.Logo = brand.LogoFile.FileName;
                }

                _context.Brands.Update(brand);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BrandExists(id))
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

        // POST: api/Brands
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Brand>> PostBrand([FromForm] Brand brand)
        {
            if (brand.LogoFile != null && brand.LogoFile.Length > 0)
            {
                var fileName = brand.LogoFile.FileName;
                var imagePath = Path.Combine(_webHostEnvironment.WebRootPath, "images", "brands");

                var uploadPath = Path.Combine(imagePath, fileName);
                using (var fileStream = new FileStream(uploadPath, FileMode.Create))
                {
                    await brand.LogoFile.CopyToAsync(fileStream);
                        
                }

                // Lưu đường dẫn hình ảnh vào trường Logo    
                brand.Logo = brand.LogoFile.FileName;
            }

            _context.Brands.Add(brand);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBrand", new { id = brand.Id }, brand);
        }

        // DELETE: api/Brands/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteBrand(int id)
        {
            var brand = await _context.Brands.FindAsync(id);
            if (brand == null)
            {
                return NotFound();
            }

            _context.Brands.Remove(brand);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BrandExists(int id)
        {
            return _context.Brands.Any(e => e.Id == id);
        }
    }
}
