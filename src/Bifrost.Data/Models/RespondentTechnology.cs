using Bifrost.Repository;

namespace Bifrost.Data.Models
{
    public class RespondentTechnology : Entity<int>
    {
        public int RespondentId { get; set; }
        public Respondent Respondent { get; set; }
        public int TechnologyId { get; set; }
        public Technology Technology { get; set; }
    }
}