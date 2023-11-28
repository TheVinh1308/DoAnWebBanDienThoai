﻿using Microsoft.AspNetCore.Identity;

namespace API_Server.Models
{
    public class User : IdentityUser
    {
        public string FullName { get; set; }
        public DateTime BirthDay { get; set; }

    }
}
