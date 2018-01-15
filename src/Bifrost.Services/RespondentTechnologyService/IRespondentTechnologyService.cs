using System.Collections.Generic;
using Bifrost.Domain;

namespace Bifrost.Services.RespondentTechnologyService
{
    public interface IRespondentTechnologyService
    {
         List<RespondentTechnologyModel> GetAll();
    }
}