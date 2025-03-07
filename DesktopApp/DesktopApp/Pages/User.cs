using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DesktopApp.Pages
{
    public class User
    {
        public int UserID { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }

        
        public int? PhoneNumber { get; set; }

        
        public User Clone()
        {
            return new User
            {
                UserID = this.UserID,
                Username = this.Username,
                Password = this.Password,
                Email = this.Email,
                Name = this.Name,
                Country = this.Country,
                PhoneNumber = this.PhoneNumber
            };
        }
    }
}

