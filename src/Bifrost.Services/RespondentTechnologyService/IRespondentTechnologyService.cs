using System.Collections.Generic;
using Bifrost.Domain.Models;

namespace Bifrost.Services.RespondentTechnologyService
{
    public interface IRespondentTechnologyService
    {
         List<RespondentTechnologyModel> GetAll();
    }
}