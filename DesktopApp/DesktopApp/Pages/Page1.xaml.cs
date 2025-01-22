﻿using System;
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

namespace DesktopApp.Pages
{
    /// <summary>
    /// Interaction logic for Page1.xaml
    /// </summary>
    public partial class Page1 : Page
    {
        public Page1()
        {
            InitializeComponent();
        }

        private void TextBox_Click(object sender, RoutedEventArgs e)
        {

        }
        private void CreateAnAccount_Click(object sender, RoutedEventArgs e)
        {
            string username = UsernameTextBox.Text;
            string password = PasswordBox.Text;
            string email = EmailBox.Text;

            MainWindow mainWindow = (MainWindow)Application.Current.MainWindow;
            mainWindow.AddUser(username, password, email);

            MessageBox.Show("User registered successfully!");
            NavigationService.Navigate(new Page2());
        }
    }
}
