
import * as React from "react";
import styled from "styled-components";

export function MainContent() {
  // Sample data for upcoming trips
  const upcomingTrips = [
    {
      id: 1,
      title: "Trip to Bali",
      date: "2025-01-15",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Explore Japan",
      date: "2025-02-10",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Paris Adventure",
      date: "2025-03-05",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <ContentContainer>
      <Divider />
      <ContentWrapper>
        <PageTitle>Your Upcoming Trips</PageTitle>
        <TripsGrid>
          {upcomingTrips.map((trip) => (
            <TripCard key={trip.id}>
              <TripImage src={trip.image} alt={trip.title} />
              <TripTitle>{trip.title}</TripTitle>
              <TripDate>{trip.date}</TripDate>
            </TripCard>
          ))}
        </TripsGrid>
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-right: -600px;
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
