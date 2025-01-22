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
            string password = PasswordBox.Text;

            if (ValidateUser(username, password))
            {
                NavigationService.Navigate(new Page3());
            }
            else
            {
                MessageBox.Show("Invalid username or password.");
            }
        }

        private bool ValidateUser(string username, string password)
        {
            using (var context = new UserDbContext())
            {
                var user = context.Users
                    .FirstOrDefault(u => u.Username.Equals(username, StringComparison.OrdinalIgnoreCase));

                if (user == null)
                {
                    MessageBox.Show($"Username '{username}' not found.");
                    return false;
                }

                if (user.Password != password)
                {
                    MessageBox.Show("Password does not match.");
                    return false;
                }

                return true;
            }
        }
    }
}
