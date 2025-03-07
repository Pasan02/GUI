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
        public const int DefaultTripId = -1; 
        public static void AddActivity(Activity activity)
        {
            // Get current user ID
            int currentUserId = Page4.SessionManager.CurrentUserId;
            activity.UserID = currentUserId;

            // Only add to memory initially. Activities are saaved in memory until the user saves the whole trip
            inMemoryActivities.Add(activity);

            // Only save to database if it's not a temporary trip ID
            if (activity.TripId != DefaultTripId)
            {
                SaveActivityToDatabase(activity);
            }
        }

        private static void SaveActivityToDatabase(Activity activity)
        {
            using (var connection = new MySqlConnection(connectionString))
            {
                connection.Open();
                string query = "INSERT INTO Activities (Title, Category, Location, StartTime, EndTime, TripId, UserID) VALUES (@Title, @Category, @Location, @StartTime, @EndTime, @TripId, @UserID)";
                using (var command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Title", activity.Title);
                    command.Parameters.AddWithValue("@Category", activity.Category);
                    command.Parameters.AddWithValue("@Location", activity.Location);
                    command.Parameters.AddWithValue("@StartTime", activity.StartTime);
                    command.Parameters.AddWithValue("@EndTime", activity.EndTime);
                    command.Parameters.AddWithValue("@TripId", activity.TripId);
                    command.Parameters.AddWithValue("@UserID", activity.UserID);
                    command.ExecuteNonQuery();
                }
            }
        }


        public static void UpdateActivitiesWithTripId(int newTripId)
        {
            int currentUserId = Page4.SessionManager.CurrentUserId;

            // First, save in-memory activities with the new trip ID
            foreach (var activity in inMemoryActivities.Where(a => a.TripId == DefaultTripId && a.UserID == currentUserId).ToList())
            {
                activity.TripId = newTripId;
                SaveActivityToDatabase(activity);
            }

            // Temorory activities are removed from memory
            inMemoryActivities.RemoveAll(a => a.TripId == newTripId && a.UserID == currentUserId);
        }


        public static void DeleteActivitiesWithDefaultTripId()
        {
            int currentUserId = Page4.SessionManager.CurrentUserId;

            using (var connection = new MySqlConnection(connectionString))
            {
                connection.Open();
                string query = "DELETE FROM Activities WHERE TripId = @DefaultTripId AND UserID = @UserID";
                using (var command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@DefaultTripId", DefaultTripId);
                    command.Parameters.AddWithValue("@UserID", currentUserId);
                    command.ExecuteNonQuery();
                }
            }
        }

        public static List<Activity> GetActivities(int tripId)
        {
            var activities = new List<Activity>();
            int currentUserId = Page4.SessionManager.CurrentUserId;

            using (var connection = new MySqlConnection(connectionString))
            {
                connection.Open();
                string query = "SELECT * FROM Activities WHERE TripId = @TripId AND UserID = @UserID";
                using (var command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@TripId", tripId);
                    command.Parameters.AddWithValue("@UserID", currentUserId);
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
                                TripId = reader.GetInt32("TripId"),
                                UserID = reader.GetInt32("UserID")
                            });
                        }
                    }
                }
            }
            return activities;
        }

        public static List<Activity> GetInMemoryActivities(int tripId)
        {
            int currentUserId = Page4.SessionManager.CurrentUserId;
            return inMemoryActivities.Where(a => a.TripId == tripId && a.UserID == currentUserId).ToList();
        }

        public static void ClearInMemoryActivities()
        {
            inMemoryActivities.Clear();
        }

        public static void DeleteActivitiesByTripId(int tripId)
        {
            int currentUserId = Page4.SessionManager.CurrentUserId;

            using (var connection = new MySqlConnection(connectionString))
            {
                connection.Open();
                string query = "DELETE FROM Activities WHERE TripId = @TripId AND UserID = @UserID";
                using (var command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@TripId", tripId);
                    command.Parameters.AddWithValue("@UserID", currentUserId);
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
        public int UserID { get; set; }  
    }
}
