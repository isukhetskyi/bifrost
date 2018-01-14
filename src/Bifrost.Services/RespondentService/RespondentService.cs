using System;
using AutoMapper;
using Bifrost.Data.Models;
using Bifrost.Domain;
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
        public bool Add(RespondentModel respondent)
        {
            var result = false;
            try
            {
                var model = mapper.Map<Respondent>(respondent);
                this.repository.Create<Respondent>(model);
                this.repository.Save();
                result = true;
            }
            catch(Exception e)
            {
                result = false;
            }

            return result;
        }
    }
}