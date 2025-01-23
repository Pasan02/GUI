using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace DesktopApp.Pages
{
    public static class ActivityRepository
    {
        private static readonly string connectionString = "server=127.0.0.2; database=userdatabase; user=root;password=pasan2002;SslMode=none";
        private static List<Activity> inMemoryActivities = new List<Activity>();
        private const int DefaultTripId = -1; // Default TripID value

        public static void AddActivity(Activity activity)
        {
            activity.TripId = DefaultTripId; // Assign default TripID
            inMemoryActivities.Add(activity);
            using (var connection = new MySqlConnection(connectionString))
            {
                connection.Open();
                string query = "INSERT INTO Activities (Title, Category, Location, StartTime, EndTime, TripId) VALUES (@Title, @Category, @Location, @StartTime, @EndTime, @TripId)";
                using (var command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Title", activity.Title);
                    command.Parameters.AddWithValue("@Category", activity.Category);
                    command.Parameters.AddWithValue("@Location", activity.Location);
                    command.Parameters.AddWithValue("@StartTime", activity.StartTime);
                    command.Parameters.AddWithValue("@EndTime", activity.EndTime);
                    command.Parameters.AddWithValue("@TripId", activity.TripId);
                    command.ExecuteNonQuery();
                }
            }
        }
        public static void UpdateActivitiesWithTripId(int newTripId)
        {
            using (var connection = new MySqlConnection(connectionString))
            {
                connection.Open();
                string query = "UPDATE Activities SET TripId = @NewTripId WHERE TripId = @DefaultTripId";
                using (var command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@NewTripId", newTripId);
                    command.Parameters.AddWithValue("@DefaultTripId", DefaultTripId);
                    command.ExecuteNonQuery();
                }
            }
        }
        public static void DeleteActivitiesWithDefaultTripId()
        {
            using (var connection = new MySqlConnection(connectionString))
            {
                connection.Open();
                string query = "DELETE FROM Activities WHERE TripId = @DefaultTripId";
                using (var command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@DefaultTripId", DefaultTripId);
                    command.ExecuteNonQuery();
                }
            }
        }

        public static List<Activity> GetActivities(int tripId)
        {
            var activities = new List<Activity>();
            using (var connection = new MySqlConnection(connectionString))
            {
                connection.Open();
                string query = "SELECT * FROM Activities WHERE TripId = @TripId";
                using (var command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@TripId", tripId);
                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            activities.Add(new Activity
                            {
                                Id = reader.GetInt32("Id"),
                                Title = reader.GetString("Title"),
                                Category = reader.GetString("Category"),
                                Location = reader.GetString("Location"),
                                StartTime = reader.GetString("StartTime"),
                                EndTime = reader.GetString("EndTime"),
                                TripId = reader.GetInt32("TripId")
                            });
                        }
                    }
                }
            }
            return activities;
        }

        public static List<Activity> GetInMemoryActivities(int tripId)
        {
            return inMemoryActivities.Where(a => a.TripId == tripId).ToList();
        }

        public static void ClearInMemoryActivities()
        {
            inMemoryActivities.Clear();
        }
        public static void DeleteActivitiesByTripId(int tripId)
        {
            using (var connection = new MySqlConnection(connectionString))
            {
                connection.Open();
                string query = "DELETE FROM Activities WHERE TripId = @TripId";
                using (var command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@TripId", tripId);
                    command.ExecuteNonQuery();
                }
            }
        }
    }


    public class Activity
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public string Location { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public int TripId { get; set; }
    }
}
