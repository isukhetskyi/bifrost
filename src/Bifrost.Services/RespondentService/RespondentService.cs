using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Bifrost.Data.Models;
using Bifrost.Domain.Models;
using Bifrost.Repository;

namespace Bifrost.Services.RespondentService
{
    public class RespondentService : IRespondentService
    {
        private readonly IRepository repository;
        private readonly IMapper mapper;

        public RespondentService (IRepository repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }
        public bool Add (RespondentModel respondent)
        {
            var result = false;
            try
            {
                var model = mapper.Map<Respondent> (respondent);
                this.repository.Create<Respondent> (model);
                this.repository.Save ();
                result = true;
            }
            catch (Exception e)
            {
                result = false;
            }

            return result;
        }

        public RespondentModel Get (int respondentId)
        {
            var respondent = this.repository.Get<Respondent> (r => r.Id == respondentId, includeProperties: "RespondentsTechnologies").FirstOrDefault ();

            foreach (var rt in respondent.RespondentsTechnologies)
            {
                rt.Technology = this.repository.Get<Technology> (t => t.Id == rt.TechnologyId).FirstOrDefault ();
            }

            return this.mapper.Map<RespondentModel> (respondent);
        }

        public List<RespondentModel> GetAll ()
        {
            return this.mapper.Map<List<RespondentModel>> (this.repository.GetAll<Respondent> (includeProperties: "RespondentsTechnologies"));
        }

        public List<RespondentModel> GetFiltered (int programmingLanguageId = 0, int frameworkId = 0, int databaseId = 0)
        {
            var result = new List<RespondentModel> ();
            if (programmingLanguageId == 0 && frameworkId == 0 && databaseId == 0)
            {
                result = this.GetAll ();
            }
            else
            {
                result = this.mapper.Map<List<RespondentModel>> (
                    this.repository.GetAll<Respondent> (includeProperties: "RespondentsTechnologies")
                    .Where (r => r.RespondentsTechnologies
                        .Any (t => programmingLanguageId == 0 || t.TechnologyId == programmingLanguageId))
                    .Where (r => r.RespondentsTechnologies
                        .Any (t => frameworkId == 0 || t.TechnologyId == frameworkId))
                    .Where (r => r.RespondentsTechnologies
                        .Any (t => databaseId == 0 || t.TechnologyId == databaseId)));
            }

            foreach (var respondent in result)
            {
                foreach (var rt in respondent.RespondentsTechnologies)
                {
                    rt.Technology = this.mapper.Map<TechnologyModel> (this.repository.Get<Technology> (t => t.Id == rt.TechnologyId).FirstOrDefault ());
                }
            }

            return result;
        }
    }
}