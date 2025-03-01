import { getUserTrips, getTripCoverImage } from "../../api";
import * as React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export function MainContent() {
  const [upcomingTrips, setUpcomingTrips] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate(); 

  React.useEffect(() => {
    const fetchTrips = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const trips = await getUserTrips(userId);
        
       
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const upcomingTrips = trips
          .filter(trip => {
            const tripStartDate = new Date(trip.start_date);
            tripStartDate.setHours(0, 0, 0, 0);
            return tripStartDate >= today;
          })
          .sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
          .map(trip => ({
            ...trip,
            coverImage: getTripCoverImage(trip.destination || trip.name)
          }));

        setUpcomingTrips(upcomingTrips);
      } catch (error) {
        console.error('Error fetching trips:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const handleTripClick = (tripId) => {
    navigate(`/itinerary/${tripId}`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <ContentContainer>
      <Divider />
      <ContentWrapper>
        <PageTitle>Your Upcoming Trips</PageTitle>
        {upcomingTrips.length === 0 ? (
          <NoTripsMessage>No upcoming trips</NoTripsMessage>
        ) : (
          <TripsGrid>
            {upcomingTrips.map((trip) => (
              <TripCard 
                key={trip.id} 
                onClick={() => handleTripClick(trip.id)}
                style={{ cursor: 'pointer' }}
              >
                 <TripImage 
                  src={trip.coverImage} 
                  alt={trip.name}
                  onError={(e) => {
                    e.target.src = '/images/default.jpg';
                  }}
                />
                <TripTitle>{trip.name}</TripTitle>
                <TripDate>
                  {new Date(trip.start_date).toLocaleDateString()} - {new Date(trip.end_date).toLocaleDateString()}
                </TripDate>
              </TripCard>
            ))}
          </TripsGrid>
        )}
      </ContentWrapper>
    </ContentContainer>
  );
}



const ContentContainer = styled.section`
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  font-size: 50px;
 
  color: #000;
  font-weight: 700;
  @media (max-width: 800px) {
    font-size: 40px;
    flex-direction: row;
  }
`;
const NoTripsMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: #666;
  margin-top: 40px;
`;

const Divider = styled.div`
  width: 3px;
  height: 100%;
  background: rgba(196, 196, 196, 0.5);
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding-left: 20px;
`;

const PageTitle = styled.h2`
  font-size: 30px;
  margin-bottom: 20px;
`;

const TripsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(220px, 1fr));
  gap: 20px;
  margin-right: 20px;
  max-width: 800px;
`;

const TripCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const TripImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 15px;
`;

const TripTitle = styled.h3`
  font-size: 18px;
  margin: 0;
  text-align: center;
`;

const TripDate = styled.p`
  font-size: 14px;
  color: #555;
  margin: 5px 0 0;
`;
