﻿using System.Text;
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
    }

}