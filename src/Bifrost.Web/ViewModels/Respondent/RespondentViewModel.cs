using System;
using System.Collections.Generic;
using System.Linq;
using Bifrost.Domain.Models;

namespace Bifrost.Web.ViewModels.Respondent
{
    public class RespondentViewModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Age { get; set; }
        public bool IsEmployed { get; set; }
        public string Phone { get; set; }
        public string Skype { get; set; }
        public string Email { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ListOfChechnologies { get; set; }
        [NonSerialized]
        public List<RespondentTechnologyModel> RespondentsTechnologies;

        public string Technologies
        {
            get { return string.Join(",", this.RespondentsTechnologies.Select(t => t.Technology.TechnologyName).ToList());}
        }

        public string CreatedShortDate
        {
            get { return this.CreatedDate.ToString ("D"); }
            private set { value = this.CreatedDate.ToShortDateString (); }
        }
    }
}