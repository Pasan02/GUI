import * as React from "react";
import styled from "styled-components";

export function ItinerariesContent() {
  const [itineraries, setItineraries] = React.useState([
    { id: 1, name: "Paris Adventure", date: "2024-01-15" },
    { id: 2, name: "Tokyo Getaway", date: "2024-02-05" },
    { id: 3, name: "Maldives Escape", date: "2024-03-10" },
  ]);

  const handleNewItinerary = () => {
    alert("Redirect to create a new itinerary!");
  };

  return (
    <ItinerariesContainer>
      <Header>
        <Title>My Itineraries</Title>
        <NewItineraryButton onClick={handleNewItinerary}>
          + New Itinerary
        </NewItineraryButton>
      </Header>
      <ItinerariesGrid>
        {itineraries.length > 0 ? (
          itineraries.map((itinerary) => (
            <ItineraryCard key={itinerary.id}>
              <CardTitle>{itinerary.name}</CardTitle>
              <CardDate>{itinerary.date}</CardDate>
            </ItineraryCard>
          ))
        ) : (
          <EmptyState>No itineraries found. Start by creating one!</EmptyState>
        )}
      </ItinerariesGrid>
    </ItinerariesContainer>
  );
}

const ItinerariesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #000;
`;

const NewItineraryButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const ItinerariesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const ItineraryCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #000;
`;

const CardDate = styled.p`
  font-size: 14px;
  color: #555;
`;

const EmptyState = styled.div`
  font-size: 16px;
  color: #888;
  text-align: center;
  grid-column: 1 / -1;
`;
