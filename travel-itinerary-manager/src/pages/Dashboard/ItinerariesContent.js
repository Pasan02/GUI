import * as React from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import { getUserTrips, getTripCoverImage } from "../../api";


export function ItinerariesContent() {
  const navigate = useNavigate();
  const [itineraries, setItineraries] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const trips = await getUserTrips(userId);
        const itinerariesWithImages = trips.map(trip => ({
          ...trip,
          coverImage: getTripCoverImage(trip.destination || trip.name)
        }));
        setItineraries(itinerariesWithImages);
      } catch (error) {
        console.error('Error fetching itineraries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItineraries();
  }, []);

  if (loading) return <div>Loading...</div>;
  
  const handleNewItinerary = () => {
    navigate('/plan-trip');
  };

  const handleItineraryClick = (id) => {
    navigate(`/itinerary/${id}`);
  };


  return (
    <ContentContainer>
      <Divider />
      <ContentWrapper>
        <HeaderContainer>
          <PageTitle>My Itineraries</PageTitle>
          <NewItineraryButton onClick={handleNewItinerary}>
            + New Itinerary
          </NewItineraryButton>
        </HeaderContainer>
        {itineraries.length === 0 ? (
          <NoItinerariesMessage>No itineraries created</NoItinerariesMessage>
        ) : (
          <ItinerariesGrid>
            {itineraries.map((itinerary) => (
              <ItineraryCard 
                key={itinerary.id} 
                onClick={() => handleItineraryClick(itinerary.id)}
              >
                <ItineraryImage 
                  src={itinerary.coverImage}
                  alt={itinerary.name}
                  onError={(e) => {
                    e.target.src = '/images/default.jpg';
                  }}
                />
                <ItineraryTitle>{itinerary.name}</ItineraryTitle>
                <ItineraryDate>{new Date(itinerary.start_date).toLocaleDateString()}</ItineraryDate>
              </ItineraryCard>
            ))}
          </ItinerariesGrid>
        )}
      </ContentWrapper>
    </ContentContainer>
  );
}

const NoItinerariesMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: #666;
  margin-top: 40px;
`;
const ContentContainer = styled.section`
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  font-size: 50px;
  color: #000;
  font-weight: 700;
  @media (max-width: 991px) {
    font-size: 40px;
    flex-direction: row;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  width: 100%; /* Ensure the header spans the full width */
  max-width: 1100px; /* Optional: Match grid's width for alignment */
  padding: 0 10px; /* Optional: Add horizontal padding */
  margin: 0 auto; /* Center the header container */
`;



const Divider = styled.div`
  width: 3px;
  height: 100%;
  background: rgba(196, 196, 196, 0.5);
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding-left: 10px;
  padding-right:30px;
`;

const PageTitle = styled.h2`
  font-size: 30px;
  margin-bottom: 20px;
`;


const NewItineraryButton = styled.button`
  padding: 10px 20px;
  margin-left: 20px;
  
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }
`;
const ItinerariesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, 1fr));
  gap: 20px;
  max-width: calc(100vw - 100px); // Account for padding/margins
  margin: 0 auto;
  overflow-x: hidden;
  padding: 0 0px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, minmax(200px, 1fr));
  }
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ItineraryCard = styled.div`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ItineraryImage = styled.img`
  width: 100%;
  max-width: 270px;
  max-height: 180px;
  height: auto;
  border-radius: 5px;
  margin-bottom: 15px;
`;

const ItineraryTitle = styled.h3`
  font-size: 18px;
  margin: 0;
  text-align: center;
`;

const ItineraryDate = styled.p`
  font-size: 14px;
  color: #555;
  margin: 5px 0 0;
`;