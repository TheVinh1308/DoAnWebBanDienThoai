using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Server.Data;
using API_Server.Models;

namespace API_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhonesController : ControllerBase
    {
        private readonly PhoneShopIdentityContext _context;

        public PhonesController(PhoneShopIdentityContext context)
        {
            _context = context;
        }

        // GET: api/Phones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Phone>>> GetPhones()
        {
            var phones = await _context.Phones
                .Include(a => a.ModPhone)
                .ToListAsync();

            var distinctPhones = phones.DistinctBy(p => p.Name);

            return distinctPhones.ToList();
        }



        [HttpGet]
        [Route("GetRomInModPhone/{modphoneid}")]
        public async Task<ActionResult<IEnumerable<int>>> GetRomInModPhone(int modphoneid)
        {
            return  await _context.Phones
                .Where(m=>m.ModPhoneId==modphoneid)
                .Select(m => m.Rom).Distinct()
                .ToListAsync();
        }



        [HttpGet]
        [Route("FirstByModel")]
        public async Task<ActionResult<IEnumerable<Phone>>> GetFirstPhonesByModel()
        {
            var models = await _context.ModPhones
                .Select(m => m.Id)
                .ToListAsync();
            List<Phone> result = new List<Phone>();
            foreach (var item in models)
            {
                result.Add(_context.Phones.Include(a=>a.ModPhone).FirstOrDefault(p => p.ModPhoneId == item));
            }

            return result;
        }

        [HttpGet]
        [Route("GetListByModPhone/{modPhoneId}")]
        public async Task<ActionResult<IEnumerable<Phone>>> GetListByModPhone(int modPhoneId)
        {
            var phones = await _context.Phones
         .Where(p => p.ModPhoneId == modPhoneId)
         .ToListAsync();

            if (phones == null || phones.Count == 0)
            {
                return NotFound();
            }

            return phones;
        }


        [HttpGet]
        [Route("GetPhoneWithModPhone/{PhoneId}")]
        public async Task<ActionResult<Phone>> GetPhoneWithModPhone(int PhoneId)
        {
            var phone = await _context.Phones
                 .Include(p => p.ModPhone) // Include the related ModPhone object
                .FirstOrDefaultAsync(p => p.Id == PhoneId);

            if (phone == null)
            {
                return NotFound();
            }

            return phone;
        }


        // GET: api/Phones/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Phone>> GetPhone(int id)
        {
            var phone = await _context.Phones
                .FindAsync(id);

            if (phone == null)
            {
                return NotFound();
            }

            return phone;
        }

        // PUT: api/Phones/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPhone(int id, Phone phone)
        {
            if (id != phone.Id)
            {
                return BadRequest();
            }

            _context.Entry(phone).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PhoneExists(id))
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

        // POST: api/Phones
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Phone>> PostPhone(Phone phone)
        {
            _context.Phones.Add(phone);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPhone", new { id = phone.Id }, phone);
        }

        // DELETE: api/Phones/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhone(int id)
        {
            var phone = await _context.Phones.FindAsync(id);
            if (phone == null)
            {
                return NotFound();
            }

            _context.Phones.Remove(phone);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PhoneExists(int id)
        {
            return _context.Phones.Any(e => e.Id == id);
        }
    }
}
