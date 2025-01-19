using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;

namespace DesktopApp.Pages
{
    public partial class Page8 : Page
    {
        public Page8(int numberOfDays, DateTime startDate)
        {
            InitializeComponent();
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
                var activityCard = CreateActivityCard(inputDialog.ResponseText, activitiesList);
                activitiesList.Children.Add(activityCard);
            }
        }

        private Border CreateActivityCard(string activityText, StackPanel activitiesList)
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
                Text = activityText,
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
                activityTextBlock.Text = inputDialog.ResponseText;
            }
        }

        private void DeleteActivity(Border activityCard, StackPanel activitiesList)
        {
            activitiesList.Children.Remove(activityCard);
        }

        private void SaveActivitiesButton_Click(object sender, RoutedEventArgs e)
        {
            MessageBox.Show("Activities saved successfully.");
            NavigationService
                .GoBack();
        }
    }

    public class InputDialog : Window
    {
        private TextBox _inputTextBox;
        public string ResponseText => _inputTextBox.Text;

        public InputDialog(string question, string defaultValue = "")
        {
            Title = "Activity Details";
            Width = 300;
            Height = 150;
            WindowStartupLocation = WindowStartupLocation.CenterOwner;

            var panel = new StackPanel { Margin = new Thickness(10) };

            panel.Children.Add(new TextBlock { Text = question, Margin = new Thickness(0, 0, 0, 10) });

            _inputTextBox = new TextBox { Text = defaultValue, Margin = new Thickness(0, 0, 0, 10) };
            panel.Children.Add(_inputTextBox);

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
