using Bifrost.Repository;

namespace Bifrost.Data.Models
{
    public class OtherInfo : Entity<int>
    {
        public int RespondentId { get; set; }

        public string RepondentOtherNotes { get; set; }

        public string RecruterNotes { get; set; }
    }
}