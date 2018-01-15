using System.Collections.Generic;

namespace Bifrost.Web.ViewModels.Statistics
{
    public class StatisticsViewModel
    {
        public List<SimplifiedTechnologyModel> Languages {get;set;} = new List<SimplifiedTechnologyModel>();
        public List<SimplifiedTechnologyModel> Frameworks {get;set;} = new List<SimplifiedTechnologyModel>();
        public List<SimplifiedTechnologyModel> Databases {get;set;} = new List<SimplifiedTechnologyModel>();
    }
}