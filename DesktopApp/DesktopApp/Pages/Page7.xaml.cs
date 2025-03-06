using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Navigation;

namespace DesktopApp.Pages
{
    public partial class Page7 : Page
    {
        private int _tripId;
        public Page7()
        {
            InitializeComponent();
        }

        private void SaveTripButton_Click(object sender, RoutedEventArgs e)
        {
            string tripName = TripNameTextBox.Text;
            DateTime? startDate = StartDatePicker.SelectedDate;
            DateTime? endDate = EndDatePicker.SelectedDate;
            decimal cost;
            if (!decimal.TryParse(CostTextBox.Text, out cost))
            {
                MessageBox.Show("Please enter a valid cost.");
                return;
            }
            string currency = (CurrencyComboBox.SelectedItem as ComboBoxItem)?.Content.ToString();

            if (string.IsNullOrEmpty(tripName) || !startDate.HasValue || !endDate.HasValue || string.IsNullOrEmpty(currency))
            {
                MessageBox.Show("Please fill in all required fields.");
                return;
            }

            TripRepository tripRepository = new TripRepository();
            int tripId = tripRepository.SaveTrip(tripName, startDate.Value, endDate.Value, cost, currency);

            // Update activities with the new trip ID
            ActivityRepository.UpdateActivitiesWithTripId(tripId);

            MessageBox.Show("Trip saved successfully.");
            NavigationService.Navigate(new Page5());
        }

        private void CancelButton_Click(object sender, RoutedEventArgs e)
        {
            // Delete activities with the default trip ID
            ActivityRepository.DeleteActivitiesWithDefaultTripId();

            // Navigate back to Page5
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
                // Use the DefaultTripId constant from ActivityRepository
                int tripId = ActivityRepository.DefaultTripId;
                NavigationService.Navigate(new Page8(numberOfDays, startDate.Value, tripId));
            }
            else
            {
                MessageBox.Show("Please select both Start and End Dates.");
            }
        }

    }
}
