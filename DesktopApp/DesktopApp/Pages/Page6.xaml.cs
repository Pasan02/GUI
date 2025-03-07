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
using static DesktopApp.Pages.Page4;

namespace DesktopApp.Pages
{
    /// <summary>
    /// Interaction logic for Page6.xaml
    /// </summary>
    public partial class Page6 : Page
    {
        public Page6()
        {
            InitializeComponent();
            DeleteAccountButton.Click += DeleteAccountButton_Click;
        }


        private void DeleteAccountButton_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                
                int userId = GetCurrentUserId();

                
                Console.WriteLine($"Attempting to delete user with ID {userId}");

                using (var context = new UserDbContext())
                {
                    context.DeleteUser(userId);
                }

                
                MessageBox.Show("Account deleted successfully. You will be redirected to the Signup Page.");
                NavigationService.Navigate(new Page1());
            }
            catch (Exception ex)
            {
                
                MessageBox.Show($"An error occurred while deleting the account: {ex.Message}");
            }
        }

        private int GetCurrentUserId()
        {
           
            return SessionManager.CurrentUserId;
        }




        private void NavigationMenu_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (NavigationMenu.SelectedItem is ListViewItem selectedItem)
            {
                if (selectedItem.Content is Grid grid && grid.Children.Count > 1 && grid.Children[1] is TextBlock textBlock)
                {
                    string selectedText = textBlock.Text;

                    switch (selectedText)
                    {
                        case "Dashboard":
                            NavigationService.Navigate(new Page3());
                            break;
                        case "My Information":
                            NavigationService.Navigate(new Page4());
                            break;
                        case "Settings":
                            NavigationService.Navigate(new Page6());
                            break;
                        case "Itineraries":
                            NavigationService.Navigate(new Page5());
                            break;
                        default:
                            break;
                    }
                }
            }
            }
        private void LogoutButton_Click(object sender, RoutedEventArgs e)
        {
            
            SessionManager.CurrentUserId = 0;

            
            var mainWindow = new MainWindow();
            Application.Current.MainWindow = mainWindow;
            mainWindow.Show();
            Application.Current.Windows.OfType<Window>().FirstOrDefault(w => w != mainWindow)?.Close();
        }
    }

}
