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
    public class ModPhonesController : ControllerBase
    {
        private readonly PhoneShopIdentityContext _context;

        public ModPhonesController(PhoneShopIdentityContext context)
        {
            _context = context;
        }

        // GET: api/ModPhones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ModPhone>>> GetModPhones()
        {
            return await _context.ModPhones
                .ToListAsync();

           
        }

      


        // GET: api/ModPhones/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ModPhone>> GetModPhone(int id)
        {
            var modPhone = await _context.ModPhones.FindAsync(id);

            if (modPhone == null)
            {
                return NotFound();
            }

            return modPhone;
        }

        // PUT: api/ModPhones/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutModPhone(int id, ModPhone modPhone)
        {
            if (id != modPhone.Id)
            {
                return BadRequest();
            }

            _context.Entry(modPhone).State = EntityState.Modified;

            try
            {
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
        public async Task<ActionResult<ModPhone>> PostModPhone(ModPhone modPhone)
        {
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

        private bool ModPhoneExists(int id)
        {
            return _context.ModPhones.Any(e => e.Id == id);
        }
    }
}
