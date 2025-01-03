import React, { useState } from "react";
import styled from "styled-components";
import { FaEdit, FaFileDownload, FaTrashAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Clock, Bed, Coffee, Bus, Camera, Utensils } from "lucide-react";

export function ItineraryView() {
  const [days, setDays] = useState([
    {
      id: 1,
      title: "Day 1: Arrival in Paris",
      activities: [
        { id: 1, time: "10:00 AM", description: "Check-in at hotel" },
        { id: 2, time: "1:00 PM", description: "Visit Eiffel Tower" },
      ],
      isOpen: true,
    },
    {
      id: 2,
      title: "Day 2: Versailles Tour",
      activities: [
        { id: 1, time: "9:00 AM", description: "Depart for Versailles" },
        { id: 2, time: "1:00 PM", description: "Lunch at local bistro" },
      ],
      isOpen: false,
    },
  ]);

  const toggleAccordion = (id) => {
    setDays((prevDays) =>
      prevDays.map((day) =>
        day.id === id ? { ...day, isOpen: !day.isOpen } : day
      )
    );
  };

  const handleEditActivity = (dayId, activityId, newDescription) => {
    setDays((prevDays) =>
      prevDays.map((day) =>
        day.id === dayId
          ? {
              ...day,
              activities: day.activities.map((activity) =>
                activity.id === activityId
                  ? { ...activity, description: newDescription }
                  : activity
              ),
            }
          : day
      )
    );
  };

  return (
    <Container>
      <Header>
        <Title>My Paris Vacation</Title>
        <ActionButtons>
          <Button>
            <FaEdit /> Edit
          </Button>
          <Button>
            <FaFileDownload /> Download PDF
          </Button>
          <DeleteButton>
            <FaTrashAlt /> Delete
          </DeleteButton>
        </ActionButtons>
      </Header>

      <Summary>
        <SummaryItem>
          <strong>Travel Dates:</strong> Jan 1, 2025 - Jan 7, 2025
        </SummaryItem>
        <SummaryItem>
          <strong>Destinations:</strong> Paris, Versailles
        </SummaryItem>
        <SummaryItem>
          <strong>Total Cost:</strong> $2500
        </SummaryItem>
      </Summary>

      {days.map((day) => (
        <Card key={day.id}>
          <CardHeader onClick={() => toggleAccordion(day.id)}>
            <h3>{day.title}</h3>
            <Icon>{day.isOpen ? <FaChevronUp /> : <FaChevronDown />}</Icon>
          </CardHeader>
          {day.isOpen && (
            <CardContent>
              {day.activities.map((activity) => (
                <Activity key={activity.id}>
                  <Time>{activity.time}</Time>
                  <EditableDescription
                    defaultValue={activity.description}
                    onBlur={(e) =>
                      handleEditActivity(day.id, activity.id, e.target.value)
                    }
                  />
                </Activity>
              ))}
            </CardContent>
          )}
        </Card>
      ))}

      <NotesSection>
        <h3>Notes:</h3>
        <TextArea placeholder="Add additional notes here..." />
      </NotesSection>

      <Footer>
        <FooterButton>Back to List</FooterButton>
        <FooterButton>Add New Day</FooterButton>
      </Footer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  font-family: Inter, sans-serif;
  font-weight: 500;
  border: none;
  background: #2563eb;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: #1d4ed8;
  }
`;

const DeleteButton = styled(Button)`
  background: #dc2626;
  
  &:hover {
    background: #b91c1c;
  }
`;

const Summary = styled.section`
  margin-bottom: 20px;
`;

const SummaryItem = styled.p`
  margin: 5px 0;
`;

const Card = styled.div`
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled.div`
  padding: 16px;
  background: #f8f8f8;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const Icon = styled.div`
  font-size: 18px;
`;

const CardContent = styled.div`
  padding: 10px;
`;

const Activity = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
`;

const Time = styled.span`
  font-weight: bold;
`;

const EditableDescription = styled.input`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
  flex: 1;
`;

const NotesSection = styled.section`
  margin-bottom: 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 12px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  font-family: Inter, sans-serif;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 24px;
`;

const FooterButton = styled(Button)`
  background: #2563eb;
  
  &:hover {
    background: #1d4ed8;
  }
`;
