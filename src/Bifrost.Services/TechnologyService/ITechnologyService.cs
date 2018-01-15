using System.Collections.Generic;
using Bifrost.Domain;

namespace Bifrost.Services.TechnologyService
{
    public interface ITechnologyService
    {
         List<TechnologyModel> GetAll();
    }
}