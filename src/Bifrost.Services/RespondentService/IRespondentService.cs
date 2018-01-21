using System.Collections.Generic;
using Bifrost.Domain.Models;

namespace Bifrost.Services.RespondentService
{
    public interface IRespondentService
    {
         bool Add(RespondentModel respondent);
         List<RespondentModel> GetAll();
    }
}