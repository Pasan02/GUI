using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using MySql.Data.EntityFramework;
using MySql.Data.MySqlClient;
using System.Data.Entity.Infrastructure;

namespace DesktopApp.Pages
{
    [DbConfigurationType(typeof(MySqlEFConfiguration))]
    public class UserDbContext : DbContext, IDisposable
    {
        public UserDbContext() : base("name=UserDbContext")
        {
            // Configure EF to not proxy objects for better control
            this.Configuration.ProxyCreationEnabled = false;
            this.Configuration.LazyLoadingEnabled = false;

            // Add error handler to help diagnose issues
            ((IObjectContextAdapter)this).ObjectContext.ObjectMaterialized += (sender, e) =>
            {
                if (e.Entity is User)
                {
                    // Handle potential null values that might cause conversion problems
                    User user = e.Entity as User;
                    if (user != null && user.PhoneNumber == null)
                    {
                        // Default value if phone number is null
                        Console.WriteLine($"User {user.UserID}: Phone number is null");
                    }
                }
            };
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure User entity
            modelBuilder.Entity<User>()
                .ToTable("users")
                .HasKey(u => u.UserID);

            // Configure property mappings
            modelBuilder.Entity<User>()
                .Property(u => u.UserID)
                .HasColumnName("UserID");

            modelBuilder.Entity<User>()
                .Property(u => u.Username)
                .HasColumnName("Username")
                .IsRequired();

            modelBuilder.Entity<User>()
                .Property(u => u.Password)
                .HasColumnName("Password")
                .IsRequired();

            modelBuilder.Entity<User>()
                .Property(u => u.Email)
                .HasColumnName("Email")
                .IsRequired();

            modelBuilder.Entity<User>()
                .Property(u => u.Name)
                .HasColumnName("Name")
                .IsOptional();

            modelBuilder.Entity<User>()
                .Property(u => u.Country)
                .HasColumnName("Country")
                .IsOptional();

            modelBuilder.Entity<User>()
                .Property(u => u.PhoneNumber)
                .HasColumnName("PhoneNumber")
                .IsOptional();
        }

        public void DeleteUser(int userId)
        {
            var user = Users.Find(userId);
            if (user != null)
            {
                Users.Remove(user);
                SaveChanges();
            }
            else
            {
                // Log the user ID that was not found
                Console.WriteLine($"User with ID {userId} not found.");
                throw new Exception("User not found.");
            }
        }

        public bool UpdateUser(User updatedUser)
        {
            try
            {
                var user = Users.Find(updatedUser.UserID);
                if (user != null)
                {
                    // Update individual properties to avoid type conversion issues
                    user.Username = updatedUser.Username;
                    user.Email = updatedUser.Email;
                    user.Name = updatedUser.Name;
                    user.Country = updatedUser.Country;
                    user.PhoneNumber = updatedUser.PhoneNumber;

                    // Keep the password if it's not being updated
                    if (!string.IsNullOrEmpty(updatedUser.Password))
                    {
                        user.Password = updatedUser.Password;
                    }

                    SaveChanges();
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating user: {ex.Message}");
                return false;
            }
        }

        public User GetUserById(int userId)
        {
            try
            {
                return Users.AsNoTracking().FirstOrDefault(u => u.UserID == userId);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting user by ID: {ex.Message}");
                return null;
            }
        }
    }
}
