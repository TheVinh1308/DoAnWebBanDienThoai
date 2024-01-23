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

namespace API_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VotesController : ControllerBase
    {
        private readonly PhoneShopIdentityContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public VotesController(PhoneShopIdentityContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        // GET: api/Votes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vote>>> GetVotes()
        {
            return await _context.Votes.ToListAsync();
        }

        // GET: api/Votes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Vote>> GetVote(int id)
        {
            var vote = await _context.Votes.FindAsync(id);

            if (vote == null)
            {
                return NotFound();
            }

            return vote;
        }

        // PUT: api/Votes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVote(int id, Vote vote)
        {
            if (id != vote.Id)
            {
                return BadRequest();
            }

            _context.Entry(vote).State = EntityState.Modified;

            try
            {
                // Khởi tạo mảng để lưu danh sách tên file
                List<string> fileNames = new List<string>();

                foreach (var file in vote.Files)
                {
                    if (file.Length > 0)
                    {
                        var fileName = file.FileName;
                        var imagePath = Path.Combine(_webHostEnvironment.WebRootPath, "images", "review");

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
                vote.Path = jsonFileNames;

                _context.Votes.Update(vote);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VoteExists(id))
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

        // POST: api/Votes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<IActionResult> PostVote([FromForm] Vote vote)
        {

            List<string> fileNames = new List<string>();
            if (vote.Files == null)
            {

                Console.WriteLine("File has zero length");
            }
            else
            {
                foreach (var file in vote.Files)
                {
                    if (file.Length > 0)
                    {
                        var fileName = file.FileName;
                        var imagePath = Path.Combine(_webHostEnvironment.WebRootPath, "images", "review");

                        var uploadPath = Path.Combine(imagePath, fileName);
                        using (var fileStream = new FileStream(uploadPath, FileMode.Create))
                        {
                            await file.CopyToAsync(fileStream);
                        }

                        // Thêm tên file vào mảng
                        fileNames.Add(fileName);
                    }

                }
            }

            // Chuyển đổi danh sách tên file thành chuỗi JSON
            string jsonFileNames = Newtonsoft.Json.JsonConvert.SerializeObject(fileNames);

            // Lưu chuỗi JSON vào trường Path
            vote.Path = jsonFileNames;


            _context.Votes.Add(vote);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVote", new { id = vote.Id }, vote);
        }

        // DELETE: api/Votes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVote(int id)
        {
            var vote = await _context.Votes.FindAsync(id);
            if (vote == null)
            {
                return NotFound();
            }

            _context.Votes.Remove(vote);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        //LẤY Hoá đơn theo PhoneId
        [HttpGet]
        [Route("GetInvoiceByPhoneId/{phoneId}")]
        public async Task<ActionResult<IEnumerable<Vote>>> GetImgForPhone(int phoneId)
        {
            var votes = await _context.Votes
                .Where(i => i.PhoneId == phoneId)
                .ToListAsync();

            if (votes == null)
            {
                return NotFound();
            }

            return votes;
        }

        private bool VoteExists(int id)
        {
            return _context.Votes.Any(e => e.Id == id);
        }
    }
}
