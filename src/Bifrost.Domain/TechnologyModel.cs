using System.Collections.Generic;

namespace Bifrost.Domain
{
    public class TechnologyModel
    {
        public TechnologyModel()
        {
            this.RespondentsTechnologies = new List<RespondentTechnologyModel>();
        }

        public int Id { get; set; }

        /// <summary>
        /// Technology type
        /// 1 - Programming language
        /// 2 - Framework
        /// 3 - Database
        /// </summary>
        /// <returns></returns>
        public int TechnologyType { get; set; }
        public string TechnologyName { get; set; }

        public List<RespondentTechnologyModel> RespondentsTechnologies {get;set;}
    }
}