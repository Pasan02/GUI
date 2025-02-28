﻿using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Collections.Generic;

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
                    FontWeight = FontWeights.Bold,
                    FontSize = 14,
                    Padding = new Thickness(10)
                };

                var mainPanel = new StackPanel { Margin = new Thickness(10) };

                var header = new TextBlock
                {
                    Text = $"Day {i + 1} - {day:dddd, MMMM dd}",
                    FontSize = 20,
                    FontWeight = FontWeights.Bold,
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
                    Background = Brushes.Black,
                    Foreground = Brushes.White,
                    Padding = new Thickness(10)
                };
                addActivityButton.Click += (s, e) => AddActivity(activitiesList);

                mainPanel.Children.Add(header);
                mainPanel.Children.Add(activitiesList);
                mainPanel.Children.Add(addActivityButton);

                tabItem.Content = mainPanel;
                DayTabs.Items.Add(tabItem);
            }
        }


        private void AddActivity(StackPanel activitiesList)
        {
            var inputDialog = new InputDialog("Enter activity details:");
            if (inputDialog.ShowDialog() == true)
            {
                var activity = new Activity
                {
                    Title = inputDialog.ActivityTitle,
                    Category = inputDialog.ActivityCategory,
                    Location = inputDialog.ActivityLocation,
                    StartTime = inputDialog.StartTime,
                    EndTime = inputDialog.EndTime,
                    TripId = -1 // Default TripID
                };

                // Save activity to the database
                ActivityRepository.AddActivity(activity);

                var activityCard = CreateActivityCard(activity.Title, activity.Category, activity.Location, activity.StartTime, activity.EndTime, activitiesList);
                activitiesList.Children.Add(activityCard);
            }
        }

        private Border CreateActivityCard(string activityTitle, string activityCategory, string activityLocation, string startTime, string endTime, StackPanel activitiesList)
        {
            var card = new Border
            {
                Background = Brushes.LightGray,
                CornerRadius = new CornerRadius(10),
                Margin = new Thickness(0, 5, 0, 5),
                Padding = new Thickness(10)
            };

            var grid = new Grid();
            grid.ColumnDefinitions.Add(new ColumnDefinition { Width = new GridLength(1, GridUnitType.Star) });
            grid.ColumnDefinitions.Add(new ColumnDefinition { Width = GridLength.Auto });

            var activityTextBlock = new TextBlock
            {
                Text = $"{activityTitle} - {activityCategory} - {activityLocation} - {startTime} to {endTime}",
                FontSize = 14,
                VerticalAlignment = VerticalAlignment.Center
            };

            var actionsPanel = new StackPanel
            {
                Orientation = Orientation.Horizontal,
                HorizontalAlignment = HorizontalAlignment.Right
            };

            var editButton = new Button
            {
                Content = "✏",
                Margin = new Thickness(5, 0, 5, 0),
                Padding = new Thickness(5)
            };
            editButton.Click += (s, e) => EditActivity(activityTextBlock);

            var deleteButton = new Button
            {
                Content = "🗑",
                Margin = new Thickness(5, 0, 5, 0),
                Padding = new Thickness(5)
            };
            deleteButton.Click += (s, e) => DeleteActivity(card, activitiesList);

            actionsPanel.Children.Add(editButton);
            actionsPanel.Children.Add(deleteButton);

            Grid.SetColumn(activityTextBlock, 0);
            Grid.SetColumn(actionsPanel, 1);

            grid.Children.Add(activityTextBlock);
            grid.Children.Add(actionsPanel);

            card.Child = grid;
            return card;
        }

        private void EditActivity(TextBlock activityTextBlock)
        {
            var inputDialog = new InputDialog("Edit activity details:", activityTextBlock.Text);
            if (inputDialog.ShowDialog() == true)
            {
                activityTextBlock.Text = $"{inputDialog.ActivityTitle} - {inputDialog.ActivityCategory} - {inputDialog.ActivityLocation} - {inputDialog.StartTime} to {inputDialog.EndTime}";
            }
        }

        private void DeleteActivity(Border activityCard, StackPanel activitiesList)
        {
            activitiesList.Children.Remove(activityCard);
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

        public string ActivityTitle => _titleTextBox.Text;
        public string ActivityCategory => _categoryComboBox.SelectedItem?.ToString() ?? "Other";
        public string ActivityLocation => _locationTextBox.Text;
        public string StartTime => $"{_startTimeTextBox.Text} {_startTimeAmPmComboBox.SelectedItem ?? "AM"}";
        public string EndTime => $"{_endTimeTextBox.Text} {_endTimeAmPmComboBox.SelectedItem ?? "AM"}";

        public InputDialog(string question, string defaultValue = "")
        {
            Title = "Activity Details";
            Width = 400;
            Height = 400;
            WindowStartupLocation = WindowStartupLocation.CenterOwner;

            var panel = new StackPanel { Margin = new Thickness(10) };

            panel.Children.Add(new TextBlock { Text = question, Margin = new Thickness(0, 0, 0, 10) });

            _titleTextBox = new TextBox { Text = defaultValue, Margin = new Thickness(0, 0, 0, 10) };
            panel.Children.Add(new TextBlock { Text = "Title:", Margin = new Thickness(0, 0, 0, 5) });
            panel.Children.Add(_titleTextBox);

            _categoryComboBox = new ComboBox
            {
                ItemsSource = new[] { "Lodging", "Dining", "Transport", "Sightseeing", "Other" },
                Margin = new Thickness(0, 0, 0, 10)
            };
            panel.Children.Add(new TextBlock { Text = "Category:", Margin = new Thickness(0, 0, 0, 5) });
            panel.Children.Add(_categoryComboBox);

            _locationTextBox = new TextBox { Margin = new Thickness(0, 0, 0, 10) };
            panel.Children.Add(new TextBlock { Text = "Location:", Margin = new Thickness(0, 0, 0, 5) });
            panel.Children.Add(_locationTextBox);

            var startTimePanel = new StackPanel { Orientation = Orientation.Horizontal, Margin = new Thickness(0, 0, 0, 10) };
            _startTimeTextBox = new TextBox { Width = 100, Margin = new Thickness(0, 0, 10, 0) };
            _startTimeAmPmComboBox = new ComboBox
            {
                ItemsSource = new[] { "AM", "PM" },
                Width = 60
            };
            startTimePanel.Children.Add(_startTimeTextBox);
            startTimePanel.Children.Add(_startTimeAmPmComboBox);
            panel.Children.Add(new TextBlock { Text = "Start Time:", Margin = new Thickness(0, 0, 0, 5) });
            panel.Children.Add(startTimePanel);

            var endTimePanel = new StackPanel { Orientation = Orientation.Horizontal, Margin = new Thickness(0, 0, 0, 10) };
            _endTimeTextBox = new TextBox { Width = 100, Margin = new Thickness(0, 0, 10, 0) };
            _endTimeAmPmComboBox = new ComboBox
            {
                ItemsSource = new[] { "AM", "PM" },
                Width = 60
            };
            endTimePanel.Children.Add(_endTimeTextBox);
            endTimePanel.Children.Add(_endTimeAmPmComboBox);
            panel.Children.Add(new TextBlock { Text = "End Time:", Margin = new Thickness(0, 0, 0, 5) });
            panel.Children.Add(endTimePanel);

            var buttonsPanel = new StackPanel
            {
                Orientation = Orientation.Horizontal,
                HorizontalAlignment = HorizontalAlignment.Center
            };

            var okButton = new Button
            {
                Content = "OK",
                Width = 75,
                Margin = new Thickness(5)
            };
            okButton.Click += (s, e) => DialogResult = true;

            var cancelButton = new Button
            {
                Content = "Cancel",
                Width = 75,
                Margin = new Thickness(5)
            };
            cancelButton.Click += (s, e) => DialogResult = false;

            buttonsPanel.Children.Add(okButton);
            buttonsPanel.Children.Add(cancelButton);

            panel.Children.Add(buttonsPanel);

            Content = panel;
        }
    }

}
