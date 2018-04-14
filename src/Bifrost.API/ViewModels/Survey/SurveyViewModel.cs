using System.Collections.Generic;

namespace Bifrost.API.ViewModels.Survey
{
    public class SurveyViewModel
    {
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
        public List<object> ProgrammingLanguagesCheckboxes { get; set; }
        public List<object> FrameworksCheckboxes { get; set; }
        public List<object> DatabasesCheckboxes { get; set; }
        public List<int> Technologies { get; set; }
        public string Other { get; set; }
    }
}