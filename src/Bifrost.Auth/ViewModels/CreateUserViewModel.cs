using Bifrost.Domain.Enums;

namespace Bifrost.Auth.ViewModels
{
    public class CreateUserViewModel
    {
        public string Email { get; set; }

        public string Password { get; set; }

        public string ConfirmPassword { get; set; }

        public RolesEnum Role {get;set;}
    }
}
