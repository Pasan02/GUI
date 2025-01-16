import * as React from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

export function ItinerariesContent() {
  const navigate = useNavigate();
  const [itineraries, setItineraries] = React.useState([
    { id: 1, name: "Paris Adventure", date: "2024-01-15" },
    { id: 2, name: "Tokyo Getaway", date: "2024-02-05" },
    { id: 3, name: "Maldives Escape", date: "2024-03-10" },
  ]);

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
        <ItinerariesGrid>
          {itineraries.map((itinerary) => (
         <ItineraryCard 
         key={itinerary.id} 
         onClick={() => handleItineraryClick(itinerary.id)}
         style={{ cursor: 'pointer' }}
       >
         <ItineraryImage src="https://via.placeholder.com/150" alt={itinerary.name} />
         <ItineraryTitle>{itinerary.name}</ItineraryTitle>
         <ItineraryDate>{itinerary.date}</ItineraryDate>
       </ItineraryCard>
     ))}
        </ItinerariesGrid>
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
  @media (max-width: 991px) {
    font-size: 40px;
    flex-direction: row;
  }
`;
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  margin-right: -600px;
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

const ActionBar = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
`;

const NewItineraryButton = styled.button`
  padding: 10px 20px;
  
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-right: -600px;
`;

const ItineraryCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ItineraryImage = styled.img`
  width: 100%;
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