using Bifrost.Repository;

namespace Bifrost.Data.Models
{
    public class WorkExperiance : Entity<int>
    {
        public byte ExperianceType { get; set; }

        public string Description { get; set; }
    }
}