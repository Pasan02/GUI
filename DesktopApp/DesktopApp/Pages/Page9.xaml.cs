using System;
using System.Collections.Generic;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Navigation;

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

            // Subscribe to navigation events to reload data when returning to this page
            this.Loaded += TripDetailsPage_Loaded;
            

            LoadTripDetails();
        }

        private void TripDetailsPage_Loaded(object sender, RoutedEventArgs e)
        {
            // Subscribe to navigation events
            if (NavigationService != null)
            {
                NavigationService.Navigated += NavigationService_Navigated;
            }
        }

        private void NavigationService_Navigated(object sender, NavigationEventArgs e)
        {
            // Check if we're navigating back to this page
            if (e.Content == this)
            {
                // Reload activities as they might have been modified
                LoadTripDetails();
            }
        }

        // Unsubscribe from events when the page is unloaded
        private void Page_Unloaded(object sender, RoutedEventArgs e)
        {
            if (NavigationService != null)
            {
                NavigationService.Navigated -= NavigationService_Navigated;
            }
        }

        private void LoadTripDetails()
        {
            try
            {
                // Retrieve trip details
                var tripRepository = new TripRepository();
                _trip = tripRepository.GetTripById(_tripId);

                if (_trip == null)
                {
                    MessageBox.Show("Trip details could not be loaded.", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                    NavigationService.GoBack();
                    return;
                }

                // Retrieve activities for this trip
                _activities = ActivityRepository.GetActivities(_tripId);

                // Populate UI elements
                TripNameTextBlock.Text = _trip.TripName;
                DateRangeTextBlock.Text = $"{_trip.StartDate:MMM d, yyyy} - {_trip.EndDate:MMM d, yyyy}";
                CostTextBlock.Text = $"{_trip.Cost:N2} {_trip.Currency}";

                // Populate activities grid
                ActivitiesDataGrid.ItemsSource = null; // Clear first to force refresh
                ActivitiesDataGrid.ItemsSource = _activities;

                // Show message if no activities
                if (_activities.Count == 0)
                {
                    MessageBox.Show("No activities found for this trip.", "Information",
                        MessageBoxButton.OK, MessageBoxImage.Information);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error loading trip details: {ex.Message}",
                    "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void ActivitiesDataGrid_MouseDoubleClick(object sender, MouseButtonEventArgs e)
        {
            if (ActivitiesDataGrid.SelectedItem is Activity selectedActivity)
            {
                // Navigate to the activity edit page with the selected activity
                NavigationService.Navigate(new EditActivityPage(selectedActivity, _tripId));
            }
        }

        private void BackButton_Click(object sender, RoutedEventArgs e)
        {
            // Unsubscribe from navigation events
            if (NavigationService != null)
            {
                NavigationService.Navigated -= NavigationService_Navigated;
            }

            // Navigate back to the previous page
            if (NavigationService.CanGoBack)
            {
                NavigationService.GoBack();
            }
            else
            {
                // Fallback to Itineraries page if can't go back
                NavigationService.Navigate(new Page5());
            }
        }
    }
}
