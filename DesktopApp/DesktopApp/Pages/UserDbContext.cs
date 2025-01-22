using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using MySql.Data.EntityFramework;
using MySql.Data.MySqlClient;

namespace DesktopApp.Pages
{
    [DbConfigurationType(typeof(MySqlEFConfiguration))]
    public class UserDbContext : DbContext, IDisposable
    {
        public UserDbContext() : base("name=UserDbContext")
        {
        }
        public DbSet<User> Users { get; set; }

      
    }
}
