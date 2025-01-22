using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
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

namespace DesktopApp.Pages
{
    /// <summary>
    /// Interaction logic for Page4.xaml
    /// </summary>
    public partial class Page4 : Page, INotifyPropertyChanged
    {
        private bool _isEditing;
        private Visibility _saveButtonVisibility;
        private User _currentUser;

        public bool IsEditing
        {
            get => _isEditing;
            set
            {
                _isEditing = value;
                OnPropertyChanged();
            }
        }

        public Visibility SaveButtonVisibility
        {
            get => _saveButtonVisibility;
            set
            {
                _saveButtonVisibility = value;
                OnPropertyChanged();
            }
        }
        public User CurrentUser
        {
            get => _currentUser;
            set
            {
                _currentUser = value;
                OnPropertyChanged();
            }
        }

        public Page4()
        {
            InitializeComponent();
            DataContext = this;
            IsEditing = true;
            SaveButtonVisibility = Visibility.Collapsed;
            LoadUserData();
        }
        private void LoadUserData()
        {
            using (var context = new UserDbContext())
            {
                // Assuming the user ID is 1 for demonstration purposes
                CurrentUser = context.Users.FirstOrDefault(u => u.UserID == 1);
            }
        }


        private void EditButton_Click(object sender, RoutedEventArgs e)
        {
            IsEditing = false;
            SaveButtonVisibility = Visibility.Visible;
        }

        private void SaveButton_Click(object sender, RoutedEventArgs e)
        {
            IsEditing = true;
            SaveButtonVisibility = Visibility.Collapsed;
            // Add save logic here
        }
        private void SaveUserData()
        {
            try
            {
                using (var context = new UserDbContext())
                {
                    var user = context.Users.FirstOrDefault(u => u.UserID == CurrentUser.UserID);
                    if (user != null)
                    {
                        user.Username = CurrentUser.Username;
                        user.Email = CurrentUser.Email;
                        user.Name = CurrentUser.Name;
                        user.Country = CurrentUser.Country;
                        user.PhoneNumber = CurrentUser.PhoneNumber;
                        context.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"An error occurred while saving the data: {ex.Message}");
            }
        }

        public event PropertyChangedEventHandler PropertyChanged;

        protected void OnPropertyChanged([CallerMemberName] string name = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
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
                        case "Itinerary":
                            NavigationService.Navigate(new Page5());
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    }
}
