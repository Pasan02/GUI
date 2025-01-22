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
    /// Interaction logic for Page5.xaml
    /// </summary>
    public partial class Page5 : Page
    {
        public Page5()
        {
            InitializeComponent();
            LoadTrips();
        }
        private void LoadTrips()
        {
            TripRepository tripRepository = new TripRepository();
            List<Trip> trips = tripRepository.GetTrips();

            ItineraryGrid.Children.Clear();

            foreach (var trip in trips)
            {
                Border border = new Border
                {
                    BorderBrush = new SolidColorBrush(Color.FromRgb(221, 221, 221)),
                    BorderThickness = new Thickness(1),
                    CornerRadius = new CornerRadius(8),
                    Margin = new Thickness(10)
                };

                StackPanel stackPanel = new StackPanel();

                Rectangle rectangle = new Rectangle
                {
                    Width = 150,
                    Height = 150,
                    Fill = new SolidColorBrush(Color.FromRgb(238, 238, 238)),
                    Margin = new Thickness(10)
                };

                TextBlock tripNameTextBlock = new TextBlock
                {
                    Text = trip.TripName,
                    FontWeight = FontWeights.Bold,
                    FontSize = 16,
                    Margin = new Thickness(10, 5, 10, 0),
                    HorizontalAlignment = HorizontalAlignment.Center
                };

                TextBlock startDateTextBlock = new TextBlock
                {
                    Text = trip.StartDate.ToString("yyyy-MM-dd"),
                    FontSize = 14,
                    Foreground = new SolidColorBrush(Color.FromRgb(85, 85, 85)),
                    Margin = new Thickness(10, 0, 10, 10),
                    HorizontalAlignment = HorizontalAlignment.Center
                };

                stackPanel.Children.Add(rectangle);
                stackPanel.Children.Add(tripNameTextBlock);
                stackPanel.Children.Add(startDateTextBlock);

                border.Child = stackPanel;

                ItineraryGrid.Children.Add(border);
            }
        }
        private void Itinerary_Button_Click(object sender, RoutedEventArgs e)
        {
            // Clear in-memory activities for the new itinerary
            ActivityRepository.ClearInMemoryActivities();

            NavigationService.Navigate(new Page7());
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
                        case "Itinerary":
                            NavigationService.Navigate(new Page5());
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    }
}
