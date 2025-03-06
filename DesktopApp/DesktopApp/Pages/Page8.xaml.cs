using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Collections.Generic;
using System.Windows.Input;

namespace DesktopApp.Pages
{
    public partial class Page8 : Page
    {
        private int _tripId;

        public Page8(int numberOfDays, DateTime startDate, int tripId)
        {
            InitializeComponent();
            _tripId = tripId;
            InitializeDayTabs(numberOfDays, startDate);
        }

        private void InitializeDayTabs(int numberOfDays, DateTime startDate)
        {
            for (int i = 0; i < numberOfDays; i++)
            {
                var day = startDate.AddDays(i);
                var tabItem = new TabItem
                {
                    Header = $"Day {i + 1}\n{day:MMM dd}",
                    FontWeight = FontWeights.SemiBold,
                    FontSize = 14
                };

                var scrollViewer = new ScrollViewer
                {
                    VerticalScrollBarVisibility = ScrollBarVisibility.Auto,
                    Padding = new Thickness(10)
                };

                var mainPanel = new StackPanel { Margin = new Thickness(10) };

                var header = new TextBlock
                {
                    Text = $"Day {i + 1} - {day:dddd, MMMM dd}",
                    FontSize = 20,
                    FontWeight = FontWeights.SemiBold,
                    Foreground = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#1a73e8")),
                    Margin = new Thickness(0, 0, 0, 20)
                };

                var activitiesList = new StackPanel { Name = $"ActivitiesList_{i + 1}" };

                // Load activities from the database
                var activities = ActivityRepository.GetInMemoryActivities(_tripId);
                foreach (var activity in activities)
                {
                    var activityCard = CreateActivityCard(activity.Title, activity.Category, activity.Location, activity.StartTime, activity.EndTime, activitiesList);
                    activitiesList.Children.Add(activityCard);
                }

                var addActivityButton = new Button
                {
                    Content = "+ Add Activity",
                    HorizontalAlignment = HorizontalAlignment.Right,
                    Margin = new Thickness(0, 10, 0, 10),
                    Background = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#1a73e8")),
                    Foreground = Brushes.White,
                    Padding = new Thickness(15),
                    BorderThickness = new Thickness(0),
                    Cursor = Cursors.Hand
                };
                addActivityButton.Resources = new ResourceDictionary();
                addActivityButton.Resources.Add(typeof(Border), new Style(typeof(Border))
                {
                    Setters = { new Setter(Border.CornerRadiusProperty, new CornerRadius(20)) }
                });

                addActivityButton.Click += (s, e) => AddActivity(activitiesList);

                mainPanel.Children.Add(header);
                mainPanel.Children.Add(activitiesList);
                mainPanel.Children.Add(addActivityButton);

                scrollViewer.Content = mainPanel;
                tabItem.Content = scrollViewer;
                DayTabs.Items.Add(tabItem);
            }
        }

        private void BackButton_Click(object sender, RoutedEventArgs e)
        {
            NavigationService.GoBack();
        }


        private void AddActivity(StackPanel activitiesList)
        {
            try
            {
                var inputDialog = new InputDialog("Enter activity details:");
                inputDialog.Owner = Window.GetWindow(this); // Set the owner window
                if (inputDialog.ShowDialog() == true)
                {
                    var activity = new Activity
                    {
                        Title = inputDialog.ActivityTitle,
                        Category = inputDialog.ActivityCategory,
                        Location = inputDialog.ActivityLocation,
                        StartTime = inputDialog.StartTime,
                        EndTime = inputDialog.EndTime,
                        TripId = _tripId
                    };

                    // Save activity to the database
                    ActivityRepository.AddActivity(activity);

                    var activityCard = CreateActivityCard(activity.Title, activity.Category, activity.Location, activity.StartTime, activity.EndTime, activitiesList);
                    activitiesList.Children.Add(activityCard);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error adding activity: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }


        private Border CreateActivityCard(string activityTitle, string activityCategory, string activityLocation, string startTime, string endTime, StackPanel activitiesList)
        {
            // Create the card without relying on the XAML-defined style
            var card = new Border
            {
                Background = new SolidColorBrush(Colors.White),
                BorderBrush = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#E0E0E0")),
                BorderThickness = new Thickness(1),
                CornerRadius = new CornerRadius(10),
                Padding = new Thickness(15),
                Margin = new Thickness(0)
            };

            // Add hover effect
            card.MouseEnter += (s, e) =>
            {
                card.Background = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#F8F9FA"));
            };

            card.MouseLeave += (s, e) =>
            {
                card.Background = new SolidColorBrush(Colors.White);
            };

            // Rest of the method remains the same
            var grid = new Grid();
            grid.ColumnDefinitions.Add(new ColumnDefinition { Width = new GridLength(1, GridUnitType.Star) });
            grid.ColumnDefinitions.Add(new ColumnDefinition { Width = GridLength.Auto });

            // Create a more structured activity display
            var contentPanel = new StackPanel();

            var titleBlock = new TextBlock
            {
                Text = activityTitle,
                FontSize = 16,
                FontWeight = FontWeights.SemiBold,
                Foreground = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#333333"))
            };
            contentPanel.Children.Add(titleBlock);

            var detailsPanel = new StackPanel
            {
                Orientation = Orientation.Horizontal,
                Margin = new Thickness(0, 5, 0, 0)
            };

            var categoryBlock = new TextBlock
            {
                Text = activityCategory,
                Foreground = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#1a73e8")),
                FontSize = 12,
                Margin = new Thickness(0, 0, 15, 0)
            };
            detailsPanel.Children.Add(categoryBlock);

            var locationBlock = new TextBlock
            {
                Text = $"📍 {activityLocation}",
                Foreground = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#666666")),
                FontSize = 12
            };
            detailsPanel.Children.Add(locationBlock);

            contentPanel.Children.Add(detailsPanel);

            var timeBlock = new TextBlock
            {
                Text = $"⏱ {startTime} to {endTime}",
                Foreground = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#666666")),
                FontSize = 12,
                Margin = new Thickness(0, 5, 0, 0)
            };
            contentPanel.Children.Add(timeBlock);

            // Actions panel with edit and delete buttons
            var actionsPanel = new StackPanel
            {
                Orientation = Orientation.Horizontal,
                HorizontalAlignment = HorizontalAlignment.Right,
                VerticalAlignment = VerticalAlignment.Top
            };

            var editButton = new Button
            {
                Content = "✏",
                Margin = new Thickness(5, 0, 5, 0),
                Padding = new Thickness(8, 5, 8, 5),
                Background = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#F0F4FF")),
                Foreground = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#1a73e8")),
                BorderThickness = new Thickness(0),
                Cursor = Cursors.Hand
            };

            var deleteButton = new Button
            {
                Content = "🗑",
                Margin = new Thickness(5, 0, 0, 0),
                Padding = new Thickness(8, 5, 8, 5),
                Background = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#FFF0F0")),
                Foreground = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#FF5252")),
                BorderThickness = new Thickness(0),
                Cursor = Cursors.Hand
            };

            // Store the activity information for editing
            var activityInfo = $"{activityTitle}|{activityCategory}|{activityLocation}|{startTime}|{endTime}";
            editButton.Tag = activityInfo;

            editButton.Click += (s, e) => EditActivity(card, contentPanel, activityInfo);
            deleteButton.Click += (s, e) => DeleteActivity(card, activitiesList);

            actionsPanel.Children.Add(editButton);
            actionsPanel.Children.Add(deleteButton);

            Grid.SetColumn(contentPanel, 0);
            Grid.SetColumn(actionsPanel, 1);

            grid.Children.Add(contentPanel);
            grid.Children.Add(actionsPanel);

            card.Child = grid;
            return card;
        }

        private void EditActivity(Border card, StackPanel contentPanel, string activityInfo)
        {
            string[] parts = activityInfo.Split('|');
            if (parts.Length < 5) return;

            var inputDialog = new InputDialog("Edit activity details:")
            {
                ActivityTitle = parts[0],
                ActivityCategory = parts[1],
                ActivityLocation = parts[2],
                ActivityStartTime = parts[3],
                ActivityEndTime = parts[4]
            };

            if (inputDialog.ShowDialog() == true)
            {
                // Find and update title text block
                if (contentPanel.Children[0] is TextBlock titleBlock)
                {
                    titleBlock.Text = inputDialog.ActivityTitle;
                }

                // Find and update category and location
                if (contentPanel.Children[1] is StackPanel detailsPanel &&
                    detailsPanel.Children.Count >= 2 &&
                    detailsPanel.Children[0] is TextBlock categoryBlock &&
                    detailsPanel.Children[1] is TextBlock locationBlock)
                {
                    categoryBlock.Text = inputDialog.ActivityCategory;
                    locationBlock.Text = $"📍 {inputDialog.ActivityLocation}";
                }

                // Find and update time block
                if (contentPanel.Children[2] is TextBlock timeBlock)
                {
                    timeBlock.Text = $"⏱ {inputDialog.StartTime} to {inputDialog.EndTime}";
                }

                // Update the tag with new activity info
                if (card.Child is Grid grid &&
                    grid.Children.Count > 1 &&
                    grid.Children[1] is StackPanel actionPanel &&
                    actionPanel.Children.Count > 0 &&
                    actionPanel.Children[0] is Button editBtn)
                {
                    string newActivityInfo = $"{inputDialog.ActivityTitle}|{inputDialog.ActivityCategory}|{inputDialog.ActivityLocation}|{inputDialog.StartTime}|{inputDialog.EndTime}";
                    editBtn.Tag = newActivityInfo;
                }
            }
        }

        private void DeleteActivity(Border activityCard, StackPanel activitiesList)
        {
            var result = MessageBox.Show("Are you sure you want to delete this activity?", "Confirm Delete", MessageBoxButton.YesNo, MessageBoxImage.Question);

            if (result == MessageBoxResult.Yes)
            {
                activitiesList.Children.Remove(activityCard);
            }
        }

        private void SaveActivitiesButton_Click(object sender, RoutedEventArgs e)
        {
            MessageBox.Show("Activities saved successfully.");
            NavigationService.GoBack();
        }
    }

    public class InputDialog : Window
    {
        private TextBox _titleTextBox;
        private ComboBox _categoryComboBox;
        private TextBox _locationTextBox;
        private TextBox _startTimeTextBox;
        private ComboBox _startTimeAmPmComboBox;
        private TextBox _endTimeTextBox;
        private ComboBox _endTimeAmPmComboBox;

        public string ActivityTitle
        {
            get => _titleTextBox.Text;
            set => _titleTextBox.Text = value;
        }

        public string ActivityCategory
        {
            get => _categoryComboBox.SelectedItem?.ToString() ?? "Other";
            set
            {
                if (value != null && _categoryComboBox.Items.Contains(value))
                {
                    _categoryComboBox.SelectedItem = value;
                }
            }
        }

        public string ActivityLocation
        {
            get => _locationTextBox.Text;
            set => _locationTextBox.Text = value;
        }

        public string StartTime => $"{_startTimeTextBox.Text} {_startTimeAmPmComboBox.SelectedItem ?? "AM"}";
        public string EndTime => $"{_endTimeTextBox.Text} {_endTimeAmPmComboBox.SelectedItem ?? "AM"}";

        public string ActivityStartTime
        {
            set
            {
                if (value != null)
                {
                    string[] parts = value.Split(' ');
                    if (parts.Length >= 2)
                    {
                        _startTimeTextBox.Text = parts[0];
                        _startTimeAmPmComboBox.SelectedItem = parts[1];
                    }
                }
            }
        }

        public string ActivityEndTime
        {
            set
            {
                if (value != null)
                {
                    string[] parts = value.Split(' ');
                    if (parts.Length >= 2)
                    {
                        _endTimeTextBox.Text = parts[0];
                        _endTimeAmPmComboBox.SelectedItem = parts[1];
                    }
                }
            }
        }

        public InputDialog(string question, string defaultValue = "")
        {
            Title = "Activity Details";
            Width = 400;
            Height = 500;
            WindowStartupLocation = WindowStartupLocation.CenterOwner; // Change from CenterScreen to CenterOwner
            Background = new SolidColorBrush(Colors.White);
            ResizeMode = ResizeMode.NoResize;

            _categoryComboBox = new ComboBox();
            _startTimeAmPmComboBox = new ComboBox();
            _endTimeAmPmComboBox = new ComboBox();

            var panel = new StackPanel { Margin = new Thickness(20) };

            var headerText = new TextBlock
            {
                Text = question,
                FontSize = 18,
                FontWeight = FontWeights.SemiBold,
                Foreground = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#1a73e8")),
                Margin = new Thickness(0, 0, 0, 20)
            };
            panel.Children.Add(headerText);

            // Title field
            panel.Children.Add(new TextBlock
            {
                Text = "Title:",
                FontWeight = FontWeights.SemiBold,
                Margin = new Thickness(0, 0, 0, 5)
            });
            _titleTextBox = new TextBox
            {
                Text = defaultValue,
                Margin = new Thickness(0, 0, 0, 15),
                Padding = new Thickness(8, 5, 8, 5),
                BorderThickness = new Thickness(1),
                BorderBrush = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#E0E0E0"))
            };
            panel.Children.Add(_titleTextBox);

            // Category field
            panel.Children.Add(new TextBlock
            {
                Text = "Category:",
                FontWeight = FontWeights.SemiBold,
                Margin = new Thickness(0, 0, 0, 5)
            });
            _categoryComboBox = new ComboBox
            {
                ItemsSource = new[] { "Lodging", "Dining", "Transport", "Sightseeing", "Other" },
                Margin = new Thickness(0, 0, 0, 15),
                Padding = new Thickness(8, 5, 8, 5),
                BorderThickness = new Thickness(1),
                BorderBrush = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#E0E0E0"))
            };
            panel.Children.Add(_categoryComboBox);

            // Location field
            panel.Children.Add(new TextBlock
            {
                Text = "Location:",
                FontWeight = FontWeights.SemiBold,
                Margin = new Thickness(0, 0, 0, 5)
            });
            _locationTextBox = new TextBox
            {
                Margin = new Thickness(0, 0, 0, 15),
                Padding = new Thickness(8, 5, 8, 5),
                BorderThickness = new Thickness(1),
                BorderBrush = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#E0E0E0"))
            };
            panel.Children.Add(_locationTextBox);

            // Start Time field with AM/PM selector
            panel.Children.Add(new TextBlock
            {
                Text = "Start Time:",
                FontWeight = FontWeights.SemiBold,
                Margin = new Thickness(0, 0, 0, 5)
            });
            var startTimePanel = new StackPanel
            {
                Orientation = Orientation.Horizontal,
                Margin = new Thickness(0, 0, 0, 15)
            };

            _startTimeTextBox = new TextBox
            {
                Width = 200,
                Margin = new Thickness(0, 0, 10, 0),
                Padding = new Thickness(8, 5, 8, 5),
                BorderThickness = new Thickness(1),
                BorderBrush = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#E0E0E0"))
            };

            _startTimeAmPmComboBox = new ComboBox
            {
                ItemsSource = new[] { "AM", "PM" },
                Width = 70,
                Padding = new Thickness(8, 5, 8, 5),
                BorderThickness = new Thickness(1),
                BorderBrush = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#E0E0E0")),
                SelectedIndex = 0
            };

            startTimePanel.Children.Add(_startTimeTextBox);
            startTimePanel.Children.Add(_startTimeAmPmComboBox);
            panel.Children.Add(startTimePanel);

            // End Time field with AM/PM selector
            panel.Children.Add(new TextBlock
            {
                Text = "End Time:",
                FontWeight = FontWeights.SemiBold,
                Margin = new Thickness(0, 0, 0, 5)
            });

            var endTimePanel = new StackPanel
            {
                Orientation = Orientation.Horizontal,
                Margin = new Thickness(0, 0, 0, 25)
            };

            _endTimeTextBox = new TextBox
            {
                Width = 200,
                Margin = new Thickness(0, 0, 10, 0),
                Padding = new Thickness(8, 5, 8, 5),
                BorderThickness = new Thickness(1),
                BorderBrush = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#E0E0E0"))
            };

            _endTimeAmPmComboBox = new ComboBox
            {
                ItemsSource = new[] { "AM", "PM" },
                Width = 70,
                Padding = new Thickness(8, 5, 8, 5),
                BorderThickness = new Thickness(1),
                BorderBrush = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#E0E0E0")),
                SelectedIndex = 0
            };

            endTimePanel.Children.Add(_endTimeTextBox);
            endTimePanel.Children.Add(_endTimeAmPmComboBox);
            panel.Children.Add(endTimePanel);

            // Buttons panel
            var buttonsPanel = new StackPanel
            {
                Orientation = Orientation.Horizontal,
                HorizontalAlignment = HorizontalAlignment.Center,
                Margin = new Thickness(0, 10, 0, 0)
            };

            var okButton = new Button
            {
                Content = "Save",
                Width = 100,
                Height = 40,
                Margin = new Thickness(0, 0, 10, 0),
                Background = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#1a73e8")),
                Foreground = new SolidColorBrush(Colors.White),
                BorderThickness = new Thickness(1),
                Cursor = Cursors.Hand
            };

            okButton.Click += (s, e) => DialogResult = true;

            var cancelButton = new Button
            {
                Content = "Cancel",
                Width = 100,
                Height = 40,
                Background = new SolidColorBrush(Colors.White),
                Foreground = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#666666")),
                BorderThickness = new Thickness(1),
                BorderBrush = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#E0E0E0")),
                Cursor = Cursors.Hand
            };

            cancelButton.Click += (s, e) => DialogResult = false;

            // Add rounded corners to buttons (fixes the Clone() error)
            okButton.Resources = new ResourceDictionary();
            okButton.Resources.Add(typeof(Border), new Style(typeof(Border))
            {
                Setters = { new Setter(Border.CornerRadiusProperty, new CornerRadius(20)) }
            });

            cancelButton.Resources = new ResourceDictionary();
            cancelButton.Resources.Add(typeof(Border), new Style(typeof(Border))
            {
                Setters = { new Setter(Border.CornerRadiusProperty, new CornerRadius(20)) }
            });

            buttonsPanel.Children.Add(okButton);
            buttonsPanel.Children.Add(cancelButton);
            panel.Children.Add(buttonsPanel);

            Content = panel;
        }
    }
}
