using System.Collections.Generic;
using System.Windows;
using System.Windows.Controls;

namespace DesktopApp.Pages
{
    public partial class TripDetailsPage : Page
    {
        private int _tripId;
        private Trip _trip;
        private List<Activity> _activities;

        public TripDetailsPage(int tripId)
        {
            InitializeComponent();
            _tripId = tripId;
            LoadTripDetails();
        }

        private void LoadTripDetails()
        {
            // Retrieve trip details
            var tripRepository = new TripRepository();
            _trip = tripRepository.GetTripById(_tripId);

            // Retrieve activities for this trip
            _activities = ActivityRepository.GetActivities(_tripId);

            // Populate UI elements
            TripNameTextBlock.Text = _trip.TripName;
            DateRangeTextBlock.Text = $"{_trip.StartDate:d} - {_trip.EndDate:d}";
            CostTextBlock.Text = $"{_trip.Cost} {_trip.Currency}";

            // Populate activities grid
            ActivitiesDataGrid.ItemsSource = _activities;
        }

        private void BackButton_Click(object sender, RoutedEventArgs e)
        {
            // Navigate back to the previous page
            if (NavigationService.CanGoBack)
            {
                NavigationService.GoBack();
            }
        }
    }
}
