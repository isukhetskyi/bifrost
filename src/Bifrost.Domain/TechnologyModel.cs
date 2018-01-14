using System.Collections.Generic;

namespace Bifrost.Domain
{
    public class TechnologyModel
    {
        public TechnologyModel()
        {
            this.Respondents = new HashSet<RespondentModel>();
        }

        /// <summary>
        /// Technology type
        /// 1 - Programming language
        /// 2 - Framework
        /// 3 - Database
        /// </summary>
        /// <returns></returns>
        public int TechnologyType { get; set; }
        public string TechonologyName { get; set; }

        public ICollection<RespondentModel> Respondents {get;set;}
    }
}