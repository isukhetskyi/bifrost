using System;
using Bifrost.Repository;

namespace Bifrost.Data.Models
{
    public class PersonalInfo : Entity<int>
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public int? Age { get; set; }

        public string Address { get; set; }

        public bool? IsEmployed { get; set; }

        public string CurrentPosition { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public string Skype { get; set; }
    }
}
