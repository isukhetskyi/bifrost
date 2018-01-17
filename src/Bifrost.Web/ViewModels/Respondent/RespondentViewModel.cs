using System;

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

        public string CreatedShortDate
        {
            get { return this.CreatedDate.ToString ("D"); }
            private set { value = this.CreatedDate.ToShortDateString (); }
        }
    }
}