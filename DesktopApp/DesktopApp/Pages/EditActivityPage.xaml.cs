using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Navigation;
using MySql.Data.MySqlClient;

namespace DesktopApp.Pages
{
    
    public partial class EditActivityPage : Page
    {
        private Activity _activity;
        private int _tripId;
        private static readonly string connectionString = "server=127.0.0.2; database=userdatabase; user=root;password=pasan2002;SslMode=none";

        public EditActivityPage(Activity activity, int tripId)
        {
            InitializeComponent();
            _activity = activity;
            _tripId = tripId;
            LoadActivityDetails();
        }

        
        public EditActivityPage()
        {
            InitializeComponent();
        }

        private void LoadActivityDetails()
        {
            
            TitleTextBox.Text = _activity.Title;
            LocationTextBox.Text = _activity.Location;
            StartTimeTextBox.Text = _activity.StartTime;
            EndTimeTextBox.Text = _activity.EndTime;

            
            foreach (ComboBoxItem item in CategoryComboBox.Items)
            {
                if (item.Content.ToString() == _activity.Category)
                {
                    CategoryComboBox.SelectedItem = item;
                    break;
                }
            }

            
            if (CategoryComboBox.SelectedIndex == -1)
            {
                CategoryComboBox.SelectedIndex = CategoryComboBox.Items.Count - 1; 
            }
        }

        private void UpdateActivityButton_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                
                if (string.IsNullOrWhiteSpace(TitleTextBox.Text))
                {
                    MessageBox.Show("Activity title cannot be empty.", "Validation Error", MessageBoxButton.OK, MessageBoxImage.Warning);
                    return;
                }

               
                _activity.Title = TitleTextBox.Text;
                _activity.Location = LocationTextBox.Text;
                _activity.StartTime = StartTimeTextBox.Text;
                _activity.EndTime = EndTimeTextBox.Text;
                _activity.Category = (CategoryComboBox.SelectedItem as ComboBoxItem)?.Content.ToString() ?? "Other";

                
                UpdateActivity(_activity);

                MessageBox.Show("Activity updated successfully!", "Success", MessageBoxButton.OK, MessageBoxImage.Information);

                
                NavigationService.GoBack();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error updating activity: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void DeleteActivityButton_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                
                MessageBoxResult result = MessageBox.Show(
                    $"Are you sure you want to delete the activity '{_activity.Title}'?",
                    "Confirm Delete",
                    MessageBoxButton.YesNo,
                    MessageBoxImage.Warning);

                if (result == MessageBoxResult.Yes)
                {
                    
                    DeleteActivity(_activity.Id);

                    MessageBox.Show("Activity deleted successfully!", "Success", MessageBoxButton.OK, MessageBoxImage.Information);

                    
                    NavigationService.GoBack();
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error deleting activity: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void CancelButton_Click(object sender, RoutedEventArgs e)
        {
            
            NavigationService.GoBack();
        }

        
        private void UpdateActivity(Activity activity)
        {
            using (var connection = new MySqlConnection(connectionString))
            {
                connection.Open();
                string query = "UPDATE Activities SET Title = @Title, Category = @Category, Location = @Location, " +
                              "StartTime = @StartTime, EndTime = @EndTime WHERE Id = @Id AND UserID = @UserID";
                using (var command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Title", activity.Title);
                    command.Parameters.AddWithValue("@Category", activity.Category);
                    command.Parameters.AddWithValue("@Location", activity.Location);
                    command.Parameters.AddWithValue("@StartTime", activity.StartTime);
                    command.Parameters.AddWithValue("@EndTime", activity.EndTime);
                    command.Parameters.AddWithValue("@Id", activity.Id);
                    command.Parameters.AddWithValue("@UserID", activity.UserID);
                    command.ExecuteNonQuery();
                }
            }
        }

        
        private void DeleteActivity(int activityId)
        {
            using (var connection = new MySqlConnection(connectionString))
            {
                connection.Open();
                string query = "DELETE FROM Activities WHERE Id = @Id";
                using (var command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Id", activityId);
                    command.ExecuteNonQuery();
                }
            }
        }
    }
}

