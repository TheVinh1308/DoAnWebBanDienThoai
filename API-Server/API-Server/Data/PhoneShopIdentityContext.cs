using API_Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API_Server.Data
{
    public class PhoneShopIdentityContext : IdentityDbContext<User>
    {
        public PhoneShopIdentityContext(DbContextOptions<PhoneShopIdentityContext> options)
           : base(options)
        {

        }

        public DbSet<Brand> Brands { get; set; } = default!;

        public DbSet<Cart> Carts { get; set; } = default!;

        public DbSet<Comment> Comments { get; set; } = default!;

        public DbSet <Favorite> Favorites { get; set; } = default!;

        public DbSet <Image> Images { get; set; } = default!;

        public DbSet <Invoice> Invoices { get; set; } = default!;

        public DbSet <InvoiceDetail> InvoiceDetails { get; set; } = default!;

        public DbSet <ModPhone> ModPhones { get; set; } = default!;
       

        public DbSet <PaymentMethod> PaymentMethods { get; set; } = default!;
        public DbSet <Phone> Phones { get; set; } = default!;

        public DbSet <Promotion> Promotions { get; set; } = default!;

        public DbSet <SlideShow> SlideShows { get; set; } = default!;

        public DbSet<Vote> Votes { get; set; } = default!;
    }
}
