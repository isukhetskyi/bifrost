using System.Collections.Generic;
using Bifrost.Domain.Models;

namespace Bifrost.Services.TechnologyService
{
    public interface ITechnologyService
    {
         List<TechnologyModel> GetAll();
    }
}