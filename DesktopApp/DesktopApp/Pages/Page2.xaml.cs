using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Data.Entity;
using System.Diagnostics;
using static DesktopApp.Pages.Page4;

namespace DesktopApp.Pages
{
    /// <summary>
    /// Interaction logic for Page2.xaml
    /// </summary>
    public partial class Page2 : Page
    {
        public Page2()
        {
            InitializeComponent();
        }
        private void Dashboard_Nav_Click(object sender, RoutedEventArgs e)
        {
            string username = UsernameTextBox.Text;
            string password = PasswordBox.Password;

            if (ValidateUser(username, password))
            {
                NavigationService.Navigate(new Page3());
            }
            else
            {
                MessageBox.Show("Invalid username or password.");
            }
        }
        private void Hyperlink_RequestNavigate(object sender, RequestNavigateEventArgs e)
        {
            NavigationService.Navigate(new Uri("Pages/Page1.xaml", UriKind.Relative));
            e.Handled = true;
        }

        private bool ValidateUser(string username, string password)
        {
            try
            {
                using (var context = new UserDbContext())
                {
                    // Use direct SQL query to bypass EF materialization issues
                    var sql = "SELECT * FROM users WHERE Username = @p0";
                    var userList = context.Database.SqlQuery<User>(sql, username).ToList();

                    if (userList.Count == 0)
                    {
                        MessageBox.Show($"Username '{username}' not found.");
                        return false;
                    }

                    var user = userList[0];

                    if (user.Password != password)
                    {
                        MessageBox.Show("Password does not match.");
                        return false;
                    }

                    // Set the current user ID in the session manager
                    SessionManager.CurrentUserId = user.UserID;

                    return true;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Login error: {ex.Message}\nInner exception: {ex.InnerException?.Message}");
                return false;
            }
        }


    }
}
