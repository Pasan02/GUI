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
            try
            {
                using (var context = new UserDbContext())
                {
                    
                    int currentUserId = SessionManager.CurrentUserId;

                    
                    CurrentUser = context.GetUserById(currentUserId);

                    if (CurrentUser == null)
                    {
                        MessageBox.Show("Could not load user data. Please log in again.");
                        
                        NavigationService.Navigate(new Page2());
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error loading user data: {ex.Message}");
            }
        }


        public static class SessionManager
        {
            
            public static int CurrentUserId { get; set; }
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
            
            SaveUserData();
        }
        private void SaveUserData()
        {
            try
            {
                using (var context = new UserDbContext())
                {
                    
                    User updatedUser = CurrentUser.Clone();

                   
                    bool result = context.UpdateUser(updatedUser);

                    if (result)
                    {
                        MessageBox.Show("Information saved successfully.");
                    }
                    else
                    {
                        MessageBox.Show("User not found or could not be updated.");
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
