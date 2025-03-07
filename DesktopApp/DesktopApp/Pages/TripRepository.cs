using System;
using MySql.Data.MySqlClient;
using System.Configuration;
using DesktopApp.Pages;

public class TripRepository
{
    private readonly string _connectionString;

    public TripRepository()
    {
        _connectionString = ConfigurationManager.ConnectionStrings["UserDbContext"].ConnectionString;
    }

    public int SaveTrip(string tripName, DateTime startDate, DateTime endDate, decimal cost, string currency)
    {
        
        int currentUserId = DesktopApp.Pages.Page4.SessionManager.CurrentUserId;

        int tripId;
        using (MySqlConnection connection = new MySqlConnection(_connectionString))
        {
            connection.Open();
            string query = "INSERT INTO Trips (TripName, StartDate, EndDate, Cost, Currency, UserID) VALUES (@TripName, @StartDate, @EndDate, @Cost, @Currency, @UserID)";
            using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@TripName", tripName);
                command.Parameters.AddWithValue("@StartDate", startDate);
                command.Parameters.AddWithValue("@EndDate", endDate);
                command.Parameters.AddWithValue("@Cost", cost);
                command.Parameters.AddWithValue("@Currency", currency);
                command.Parameters.AddWithValue("@UserID", currentUserId);
                command.ExecuteNonQuery();
                tripId = (int)command.LastInsertedId;
            }
        }
        return tripId;
    }

    public Trip GetTripById(int tripId)
    {
        Trip trip = null;

        using (MySqlConnection connection = new MySqlConnection(_connectionString))
        {
            connection.Open();
            string query = "SELECT TripId, TripName, StartDate, EndDate, Cost, Currency, UserID FROM Trips WHERE TripId = @TripId";
            using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@TripId", tripId);
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        trip = new Trip
                        {
                            TripId = reader.GetInt32("TripId"),
                            TripName = reader.GetString("TripName"),
                            StartDate = reader.GetDateTime("StartDate"),
                            EndDate = reader.GetDateTime("EndDate"),
                            Cost = reader.GetDecimal("Cost"),
                            Currency = reader.GetString("Currency"),
                            UserID = reader.GetInt32("UserID")
                        };
                    }
                }
            }
        }

        return trip;
    }

    public List<Trip> GetTrips(bool onlyUpcoming = true)
    {
        List<Trip> trips = new List<Trip>();
        int currentUserId = DesktopApp.Pages.Page4.SessionManager.CurrentUserId;

        using (MySqlConnection connection = new MySqlConnection(_connectionString))
        {
            connection.Open();
            string query = onlyUpcoming
                ? "SELECT TripId, TripName, StartDate, EndDate FROM Trips WHERE StartDate >= @Today AND UserID = @UserID"
                : "SELECT TripId, TripName, StartDate, EndDate FROM Trips WHERE UserID = @UserID";

            using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                if (onlyUpcoming)
                {
                    command.Parameters.AddWithValue("@Today", DateTime.Today);
                }
                command.Parameters.AddWithValue("@UserID", currentUserId);

                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        trips.Add(new Trip
                        {
                            TripId = reader.GetInt32("TripId"),
                            TripName = reader.GetString("TripName"),
                            StartDate = reader.GetDateTime("StartDate"),
                            EndDate = reader.GetDateTime("EndDate"),
                            UserID = currentUserId
                        });
                    }
                }
            }
        }

        return trips;
    }
}

public class Trip
{
    public string TripName { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public decimal Cost { get; set; }
    public string Currency { get; set; }
    public int TripId { get; set; }
    public int UserID { get; set; }  
}
