using System.Collections.Generic;
using Bifrost.Domain.Models;

namespace Bifrost.Services.RespondentService
{
    public interface IRespondentService
    {
         bool Add(RespondentModel respondent);
         RespondentModel Get(int respondentId);
         List<RespondentModel> GetAll();
         List<RespondentModel> GetFiltered(int programmingLanguageId = 0, int frameworkId = 0, int databaseId = 0);
    }
}