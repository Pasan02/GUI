using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Collections.Generic;
using System.Windows.Media.Animation;
using MySql.Data.MySqlClient;
namespace DesktopApp
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            
        }
        private void SignUpButton_Click(object sender, RoutedEventArgs e)
        {
            MainFrame.Navigate(new Pages.Page1());
        }

        private void SignInButton_Click(object sender, RoutedEventArgs e)
        {
            MainFrame.Navigate(new Pages.Page2());
        }
        public void AddUser(string username, string password, string email)
        {
            string connectionString = "server=127.0.0.2; database=userdatabase; user=root;password=pasan2002";
            using (MySqlConnection conn = new MySqlConnection(connectionString))
            {
                try
                {
                    conn.Open();
                    string query = "INSERT INTO Users (Username, Password, Email) VALUES (@Username, @Password, @Email)";
                    MySqlCommand cmd = new MySqlCommand(query, conn);
                    cmd.Parameters.AddWithValue("@Username", username);
                    cmd.Parameters.AddWithValue("@Password", password); // Consider hashing the password before storing
                    cmd.Parameters.AddWithValue("@Email", email);
                    cmd.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Error: " + ex.Message);
                }
            }
        }
    }

}