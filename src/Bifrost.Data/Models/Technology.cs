using System.Collections.Generic;
using Bifrost.Repository;

namespace Bifrost.Data.Models
{
    public class Technology : Entity<int>
    {
        public Technology()
        {
            this.RespondentsTechnologies = new List<RespondentTechnology>();
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

        public List<RespondentTechnology> RespondentsTechnologies {get;set;}
    }
}