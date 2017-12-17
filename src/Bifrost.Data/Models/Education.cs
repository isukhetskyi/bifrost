using Bifrost.Repository;

namespace Bifrost.Data.Models
{
    public class Education : Entity<int>
    {
        public string PlaceOfStudying { get; set; }

        public string Speciality { get; set; }
    }
}