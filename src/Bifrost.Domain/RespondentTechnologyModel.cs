using Bifrost.Data.Models;

namespace Bifrost.Domain
{
    public class RespondentTechnologyModel
    {
        public int Id { get; set; }
        public int RespondentId { get; set; }
        public RespondentModel Respondent { get; set; }
        public int TechnologyId { get; set; }
        public TechnologyModel Technology { get; set; }
    }
}