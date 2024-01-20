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

namespace API_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SlideShowsController : ControllerBase
    {
        private readonly PhoneShopIdentityContext _context;
        private readonly IWebHostEnvironment _environment;

        public SlideShowsController(PhoneShopIdentityContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        // GET: api/SlideShows
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SlideShow>>> GetSlideShows()
        {
            return await _context.SlideShows.Include(s => s.ModPhone).ToListAsync();
        }

        // GET: api/SlideShows/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SlideShow>> GetSlideShow(int id)
        {
            var slideShow = await _context.SlideShows.Include(s => s.ModPhone).FirstOrDefaultAsync(s => s.Id == id);

            if (slideShow == null)
            {
                return NotFound();
            }

            return slideShow;
        }

        // PUT: api/SlideShows/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSlideShow([FromForm]int id, [FromForm] SlideShow slideShow)
        {
            if (id != slideShow.Id)
            {
                return BadRequest();
            }

            _context.Entry(slideShow).State = EntityState.Modified;

            try
            {
                if (slideShow.FilePath != null && slideShow.FilePath.Length > 0)
                {
                    var fileName = slideShow.FilePath.FileName;
                    var imagePath = Path.Combine(_environment.WebRootPath, "images", "slideshows");

                    var uploadPath = Path.Combine(imagePath, fileName);
                    using (var fileStream = new FileStream(uploadPath, FileMode.Create))
                    {
                        await slideShow.FilePath.CopyToAsync(fileStream);

                    }

                    // Lưu đường dẫn hình ảnh vào trường Logo    
                    slideShow.Path = slideShow.FilePath.FileName;
                }
                _context.SlideShows.Update(slideShow);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SlideShowExists(id))
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

        // POST: api/SlideShows
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SlideShow>> PostSlideShow([FromForm]SlideShow slideShow)
        {
            if (slideShow.FilePath != null && slideShow.FilePath.Length > 0)
            {
                var fileName = slideShow.FilePath.FileName;
                var imagePath = Path.Combine(_environment.WebRootPath, "images", "slideshows");

                var uploadPath = Path.Combine(imagePath, fileName);
                using (var fileStream = new FileStream(uploadPath, FileMode.Create))
                {
                    await slideShow.FilePath.CopyToAsync(fileStream);

                }

                // Lưu đường dẫn hình ảnh vào trường Logo    
                slideShow.Path = slideShow.FilePath.FileName;
            }
            _context.SlideShows.Add(slideShow);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSlideShow", new { id = slideShow.Id }, slideShow);
        }

        // DELETE: api/SlideShows/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSlideShow(int id)
        {
            var slideShow = await _context.SlideShows.FindAsync(id);
            if (slideShow == null)
            {
                return NotFound();
            }

            _context.SlideShows.Remove(slideShow);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SlideShowExists(int id)
        {
            return _context.SlideShows.Any(e => e.Id == id);
        }
    }
}
