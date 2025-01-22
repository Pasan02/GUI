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

    public void SaveTrip(string tripName, DateTime startDate, DateTime endDate, decimal cost, string currency)
    {
        using (MySqlConnection connection = new MySqlConnection(_connectionString))
        {
            connection.Open();
            string query = "INSERT INTO Trips (TripName, StartDate, EndDate, Cost, Currency) VALUES (@TripName, @StartDate, @EndDate, @Cost, @Currency)";
            using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@TripName", tripName);
                command.Parameters.AddWithValue("@StartDate", startDate);
                command.Parameters.AddWithValue("@EndDate", endDate);
                command.Parameters.AddWithValue("@Cost", cost);
                command.Parameters.AddWithValue("@Currency", currency);
                command.ExecuteNonQuery();
            }
        }
    }
    public List<Trip> GetTrips()
    {
        List<Trip> trips = new List<Trip>();

        using (MySqlConnection connection = new MySqlConnection(_connectionString))
        {
            connection.Open();
            string query = "SELECT TripName, StartDate, EndDate FROM Trips WHERE StartDate >= @Today";
            using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@Today", DateTime.Today);
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        trips.Add(new Trip
                        {
                            TripName = reader.GetString("TripName"),
                            StartDate = reader.GetDateTime("StartDate"),
                            EndDate = reader.GetDateTime("EndDate")
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
}
