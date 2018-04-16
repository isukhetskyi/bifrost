using System;

namespace Bifrost.API.ViewModels.Statistics
{
    public class SimplifiedTechnologyModel
    {
        public int Value { get; set; }
        public string Key { get; set; }
        public int TotalCount { get; set; }
        public decimal Percentage { get { return Math.Round((decimal)(Value * 100) / TotalCount); } set { } }
    }
}