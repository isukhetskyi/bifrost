using System;
using System.Collections.Generic;

namespace Bifrost.Domain
{
    public class RespondentModel
    {
        public RespondentModel()
        {
            this.Technologies = new HashSet<TechnologyModel>();
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Age { get; set; }
        public string Address { get; set; }
        public bool IsEmployed { get; set; }
        public string CurrentPosition { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Skype { get; set; }
        public string PlaceOfStudying { get; set; }
        public string Speciality { get; set; }
        public string OtherInfo { get; set; }

        public virtual ICollection<TechnologyModel> Technologies {get; set;}
    }
}
