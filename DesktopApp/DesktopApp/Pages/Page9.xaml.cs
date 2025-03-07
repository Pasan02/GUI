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

            
            this.Loaded += TripDetailsPage_Loaded;
            

            LoadTripDetails();
        }

        private void TripDetailsPage_Loaded(object sender, RoutedEventArgs e)
        {
            
            if (NavigationService != null)
            {
                NavigationService.Navigated += NavigationService_Navigated;
            }
        }

        private void NavigationService_Navigated(object sender, NavigationEventArgs e)
        {
            
            if (e.Content == this)
            {
                
                LoadTripDetails();
            }
        }

       
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
                
                var tripRepository = new TripRepository();
                _trip = tripRepository.GetTripById(_tripId);

                if (_trip == null)
                {
                    MessageBox.Show("Trip details could not be loaded.", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                    NavigationService.GoBack();
                    return;
                }

                
                _activities = ActivityRepository.GetActivities(_tripId);

                
                TripNameTextBlock.Text = _trip.TripName;
                DateRangeTextBlock.Text = $"{_trip.StartDate:MMM d, yyyy} - {_trip.EndDate:MMM d, yyyy}";
                CostTextBlock.Text = $"{_trip.Cost:N2} {_trip.Currency}";

                
                ActivitiesDataGrid.ItemsSource = null; 
                ActivitiesDataGrid.ItemsSource = _activities;

                
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
                
                NavigationService.Navigate(new EditActivityPage(selectedActivity, _tripId));
            }
        }

        private void BackButton_Click(object sender, RoutedEventArgs e)
        {
            
            if (NavigationService != null)
            {
                NavigationService.Navigated -= NavigationService_Navigated;
            }

            
            if (NavigationService.CanGoBack)
            {
                NavigationService.GoBack();
            }
            else
            {
                
                NavigationService.Navigate(new Page5());
            }
        }
    }
}
