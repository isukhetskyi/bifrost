using Bifrost.Domain.Models;
using System.Collections.Generic;

namespace Bifrost.Web.ViewModels.Technology
{
    public class TechnologyViewModel
    {
        public List<TechnologyModel> Languages { get; set; }
        public List<TechnologyModel> Frameworks { get; set; }
        public List<TechnologyModel> Databases { get; set; }
    }
}