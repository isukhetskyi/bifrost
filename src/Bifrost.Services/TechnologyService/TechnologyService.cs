using System.Collections.Generic;
using AutoMapper;
using Bifrost.Data.Models;
using Bifrost.Domain;
using Bifrost.Repository;

namespace Bifrost.Services.TechnologyService
{
    public class TechnologyService : ITechnologyService
    {
        private readonly IRepository repository;
        private readonly IMapper mapper;

        public TechnologyService (IRepository repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }
        public List<TechnologyModel> GetAll()
        {
            var techonlogies = this.repository.GetAll<Technology>();
            return this.mapper.Map<List<TechnologyModel>>(techonlogies);
        }
    }
}