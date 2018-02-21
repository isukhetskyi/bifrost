using System.Collections.Generic;
using AutoMapper;
using Bifrost.Data.Models;
using Bifrost.Domain.Models;
using Bifrost.Repository;

namespace Bifrost.Services.RespondentTechnologyService
{
    public class RespondentTechnologyService : IRespondentTechnologyService
    {
        private readonly IRepository repository;
        private readonly IMapper mapper;

        public RespondentTechnologyService (IRepository repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        public List<RespondentTechnologyModel> GetAll()
        {
            var rt = this.repository.GetAll<RespondentTechnology>();
            return this.mapper.Map<List<RespondentTechnologyModel>>(rt);
        }
    }
}