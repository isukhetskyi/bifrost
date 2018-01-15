using System.Collections.Generic;
using Bifrost.Domain;

namespace Bifrost.Services.RespondentService
{
    public interface IRespondentService
    {
         bool Add(RespondentModel respondent);
         List<RespondentModel> GetAll();
    }
}