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

namespace DesktopApp.Pages
{
    /// <summary>
    /// Interaction logic for Page7.xaml
    /// </summary>
    public partial class Page7 : Page
    {
        public Page7()
        {
            InitializeComponent();
           
        }
        

        private void SaveTripButton_Click(object sender, RoutedEventArgs e)
        {
            MessageBox.Show("Trip saved successfully.");
            // Add logic to save the trip details
            NavigationService.Navigate(new Page5());
        }

        private void AddActivitiesButton_Click(object sender, RoutedEventArgs e)
        {
            DateTime? startDate = StartDatePicker.SelectedDate;
            DateTime? endDate = EndDatePicker.SelectedDate;

            if (startDate.HasValue && endDate.HasValue)
            {
                if (startDate.Value > endDate.Value)
                {
                    MessageBox.Show("End Date must be later than Start Date.");
                    return;
                }

                int numberOfDays = (endDate.Value - startDate.Value).Days + 1;
                NavigationService.Navigate(new Page8(numberOfDays, startDate.Value));
            }
            else
            {
                MessageBox.Show("Please select both Start and End Dates.");
            }
        }

    }

}
