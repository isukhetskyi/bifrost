﻿using System;
using System.Collections.Generic;
using System.Linq;

namespace Bifrost.Domain.Models
{
    public class RespondentModel
    {
        public RespondentModel ()
        {
            this.RespondentsTechnologies = new List<RespondentTechnologyModel> ();
        }
        public int Id { get; set; }
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
        public string Other { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Technologies
        {
            get { return string.Join(",", this.RespondentsTechnologies.Select(t => t.Technology.TechnologyName)); }
        }

        [NonSerialized]
        public List<RespondentTechnologyModel> RespondentsTechnologies;
    }
}