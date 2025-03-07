﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Effects;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using static DesktopApp.Pages.Page4;

namespace DesktopApp.Pages
{
    /// <summary>
    /// Interaction logic for Page5.xaml
    /// </summary>
    public partial class Page5 : Page
    {
        private static readonly string[] KnownDestinations = new[]
        {
            "Paris", "London", "New York", "Tokyo", "Rome", "Barcelona", "Amsterdam",
            "Berlin", "Sydney", "Dubai", "Bangkok", "Singapore", "Hong Kong", "Venice",
            "Prague", "Vienna", "Madrid", "Istanbul", "San Francisco", "Las Vegas", "Colombo"
        };
        public Page5()
        {
            InitializeComponent();
            LoadTrips();
        }
        private void LoadTrips()
        {
            TripRepository tripRepository = new TripRepository();
            List<Trip> trips = tripRepository.GetTrips(false); 

            ItineraryGrid.Children.Clear();

            foreach (var trip in trips)
            {
                
                Border outerBorder = new Border
                {
                    Margin = new Thickness(8,0,8,12),
                    CornerRadius = new CornerRadius(10),
                    Background = Brushes.White,
                    BorderThickness = new Thickness(1),
                    BorderBrush = new SolidColorBrush(Color.FromRgb(224, 224, 224)),
                    ClipToBounds = true

                };

                Grid cardGrid = new Grid();
                
                cardGrid.RowDefinitions.Add(new RowDefinition { Height = new GridLength(180) }); 
                cardGrid.RowDefinitions.Add(new RowDefinition { Height = GridLength.Auto }); 

                
                Border imageContainer = new Border
                {
                    CornerRadius = new CornerRadius(10, 10, 0, 0),
                    ClipToBounds = true
                };

               
                Image tripImage = new Image
                {
                    Height = 180,
                    Stretch = Stretch.UniformToFill,
                    HorizontalAlignment = HorizontalAlignment.Center
                };

                string destination = ExtractDestinationFromTripName(trip.TripName);
                if (!string.IsNullOrEmpty(destination))
                {
                    try
                    {
                        string imagePath = $@"C:\Users\USER\Desktop\GUI Project\GUI\DesktopApp\DesktopApp\Images\{destination.ToLower()}.jpg";
                        tripImage.Source = new BitmapImage(new Uri(imagePath, UriKind.Absolute));
                    }
                    catch
                    {
                        tripImage.Source = new BitmapImage(new Uri(@"C:\Users\USER\Desktop\GUI Project\GUI\DesktopApp\DesktopApp\Images\default.jpg", UriKind.Absolute));
                    }
                }
                else
                {
                    tripImage.Source = new BitmapImage(new Uri(@"C:\Users\USER\Desktop\GUI Project\GUI\DesktopApp\DesktopApp\Images\default.jpg", UriKind.Absolute));
                }

                imageContainer.Child = tripImage;
                Grid.SetRow(imageContainer, 0);
                cardGrid.Children.Add(imageContainer);

                
                Border contentBorder = new Border
                {
                    Background = Brushes.White,
                    Padding = new Thickness(16, 10, 16, 0), 
                    CornerRadius = new CornerRadius(0, 0, 10, 10)
                };

                
                DockPanel contentPanel = new DockPanel();
                contentPanel.LastChildFill = true;

                TextBlock tripNameTextBlock = new TextBlock
                {
                    Text = trip.TripName,
                    FontWeight = FontWeights.SemiBold,
                    FontSize = 16,
                    TextWrapping = TextWrapping.Wrap,
                    TextTrimming = TextTrimming.CharacterEllipsis,
                    MaxHeight = 20,
                    Foreground = new SolidColorBrush(Color.FromRgb(51, 51, 51)),
                    Margin = new Thickness(0, 0, 0, 8) 
                };
                DockPanel.SetDock(tripNameTextBlock, Dock.Top);
                contentPanel.Children.Add(tripNameTextBlock);

               
                Border divider = new Border
                {
                    Height = 1,
                    Background = new SolidColorBrush(Color.FromRgb(240, 240, 240)),
                    Margin = new Thickness(0, 0, 0, 8) 
                };
                DockPanel.SetDock(divider, Dock.Top);
                contentPanel.Children.Add(divider);

                
                StackPanel datesContainer = new StackPanel { Margin = new Thickness(0, 0, 0, 10) }; 

                
                Grid dateStartGrid = new Grid();
                dateStartGrid.ColumnDefinitions.Add(new ColumnDefinition { Width = new GridLength(20) });
                dateStartGrid.ColumnDefinitions.Add(new ColumnDefinition { Width = new GridLength(1, GridUnitType.Star) });

                Path calendarStartIcon = new Path
                {
                    Data = Geometry.Parse("M19,4h-1V2h-2v2H8V2H6v2H5C3.89,4,3,4.9,3,6v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V6C21,4.9,20.1,4,19,4z M19,20 H5V9h14V20z"),
                    Fill = new SolidColorBrush(Color.FromRgb(26, 115, 232)),
                    Width = 16,
                    Height = 16,
                    Stretch = Stretch.Uniform,
                    HorizontalAlignment = HorizontalAlignment.Left,
                    VerticalAlignment = VerticalAlignment.Center
                };

                TextBlock startDateTextBlock = new TextBlock
                {
                    Text = $"Start: {trip.StartDate.ToString("MMM dd, yyyy")}",
                    FontSize = 13,
                    Foreground = new SolidColorBrush(Color.FromRgb(102, 102, 102)),
                    VerticalAlignment = VerticalAlignment.Center,
                    Margin = new Thickness(6, 0, 0, 0)
                };

                Grid.SetColumn(calendarStartIcon, 0);
                Grid.SetColumn(startDateTextBlock, 1);
                dateStartGrid.Children.Add(calendarStartIcon);
                dateStartGrid.Children.Add(startDateTextBlock);
                datesContainer.Children.Add(dateStartGrid);

                
                Grid dateEndGrid = new Grid();
                dateEndGrid.ColumnDefinitions.Add(new ColumnDefinition { Width = new GridLength(20) });
                dateEndGrid.ColumnDefinitions.Add(new ColumnDefinition { Width = new GridLength(1, GridUnitType.Star) });
                dateEndGrid.Margin = new Thickness(0, 4, 0, 0); 

                Path calendarEndIcon = new Path
                {
                    Data = Geometry.Parse("M19,4h-1V2h-2v2H8V2H6v2H5C3.89,4,3,4.9,3,6v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V6C21,4.9,20.1,4,19,4z M19,20 H5V9h14V20z"),
                    Fill = new SolidColorBrush(Color.FromRgb(26, 115, 232)),
                    Width = 16,
                    Height = 16,
                    Stretch = Stretch.Uniform,
                    HorizontalAlignment = HorizontalAlignment.Left,
                    VerticalAlignment = VerticalAlignment.Center
                };

                TextBlock endDateTextBlock = new TextBlock
                {
                    Text = $"End: {trip.EndDate.ToString("MMM dd, yyyy")}",
                    FontSize = 13,
                    Foreground = new SolidColorBrush(Color.FromRgb(102, 102, 102)),
                    VerticalAlignment = VerticalAlignment.Center,
                    Margin = new Thickness(6, 0, 0, 0)
                };

                Grid.SetColumn(calendarEndIcon, 0);
                Grid.SetColumn(endDateTextBlock, 1);
                dateEndGrid.Children.Add(calendarEndIcon);
                dateEndGrid.Children.Add(endDateTextBlock);
                datesContainer.Children.Add(dateEndGrid);

                
                contentPanel.Children.Add(datesContainer);

                contentBorder.Child = contentPanel;
                Grid.SetRow(contentBorder, 1);
                cardGrid.Children.Add(contentBorder);

                outerBorder.Child = cardGrid;
                outerBorder.Cursor = Cursors.Hand;
                outerBorder.MouseLeftButtonUp += (s, e) => NavigationService.Navigate(new TripDetailsPage(trip.TripId));

                ItineraryGrid.Children.Add(outerBorder);
            }
        }




        private string ExtractDestinationFromTripName(string tripName)
        {
            if (string.IsNullOrWhiteSpace(tripName))
                return null;

            
            string normalizedName = tripName.ToLower();
            normalizedName = Regex.Replace(normalizedName, @"[^\w\s]", "");

            
            foreach (var destination in KnownDestinations)
            {
                if (normalizedName.Contains(destination.ToLower()))
                {
                    return destination;
                }
            }

            
            if (normalizedName.Contains("getaway") || normalizedName.Contains("vacation") ||
                normalizedName.Contains("trip to") || normalizedName.Contains("visit"))
            {
                
                string[] patterns = { "trip to", "visit to", "travel to", "vacation in", "getaway to" };
                foreach (var pattern in patterns)
                {
                    int index = normalizedName.IndexOf(pattern);
                    if (index >= 0 && index + pattern.Length + 1 < normalizedName.Length)
                    {
                        string possibleDestination = normalizedName.Substring(index + pattern.Length).Trim();
                        string firstWord = possibleDestination.Split(' ').FirstOrDefault();

                        
                        if (!string.IsNullOrEmpty(firstWord) &&
                            KnownDestinations.Any(d => d.ToLower() == firstWord))
                        {
                            return KnownDestinations.First(d => d.ToLower() == firstWord);
                        }
                    }
                }
            }

            return null;
        }



        private void Itinerary_Button_Click(object sender, RoutedEventArgs e)
        {
            
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
                        case "Itineraries":
                            NavigationService.Navigate(new Page5());
                            break;
                        default:
                            break;
                    }
                }
            }
        }
        private void LogoutButton_Click(object sender, RoutedEventArgs e)
        {
           
            SessionManager.CurrentUserId = 0;

            
            var mainWindow = new MainWindow();
            Application.Current.MainWindow = mainWindow;
            mainWindow.Show();
            Application.Current.Windows.OfType<Window>().FirstOrDefault(w => w != mainWindow)?.Close();
        }
    }
}
