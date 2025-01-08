import React, { useState } from 'react';
import styled from 'styled-components';

import { Share2, Download, ChevronLeft, ChevronRight, Bed, Utensils, Bus, Camera, Activity, MapPin } from 'lucide-react';

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 1rem;
`;

const ImageSliderContainer = styled.div`
  position: relative;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 2rem;
`;

const SliderActions = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
  z-index: 10;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  
  &:hover {
    background: rgba(255, 255, 255, 1);
  }
`;

const SliderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SliderButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  padding: 0.5rem;
  cursor: pointer;
  
  &.left { left: 1rem; }
  &.right { right: 1rem; }
`;

const Indicators = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
`;

const Indicator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
`;

const TripCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const TripHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TripTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
`;

const TripInfo = styled.p`
  color: #666;
  margin: 0.5rem 0;
`;

const TabsContainer = styled.div`
  margin-bottom: 2rem;
`;

const TabList = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
`;

const Tab = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: ${props => props.active ? '#3b82f6' : '#f3f4f6'};
  color: ${props => props.active ? 'white' : 'black'};
  cursor: pointer;
  
  &:hover {
    background: ${props => props.active ? '#2563eb' : '#e5e7eb'};
  }
`;

const ActivityCard = styled.div`
  border-left: 4px solid ${props => props.categoryColor};
  padding: 1rem;
  margin-bottom: 1rem;
  background: white;
  border-radius: 0 8px 8px 0;
`;

const ActivityHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;

const ActivityTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
`;

const ActivityTime = styled.span`
  color: #666;
  font-size: 0.875rem;
`;

const ActivityDescription = styled.p`
  color: #4b5563;
  margin: 0.5rem 0;
`;

const ActivityLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #666;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const ActivityNote = styled.div`
  background: #f9fafb;
  padding: 0.75rem;
  border-radius: 4px;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #666;
`;

const CategoryIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.color};
`;

const TripItinerary = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [activeTab, setActiveTab] = useState('1');

  const categoryConfig = {
    lodging: { icon: Bed, color: '#8b5cf6' },
    dining: { icon: Utensils, color: '#ef4444' },
    transport: { icon: Bus, color: '#3b82f6' },
    sightseeing: { icon: Camera, color: '#10b981' },
    other: { icon: Activity, color: '#f59e0b' }
  };

  // Sample data
  const tripData = {
    name: "European Adventure",
    duration: 5,
    totalCost: 3500,
    images: [
      "https://picsum.photos/800/400", // Use placeholder images that work
    "https://picsum.photos/800/401",
    "https://picsum.photos/800/402"
    ],
    days: [
      {
        day: 1,
        activities: [
          {
            time: "09:00 AM",
            title: "City Walking Tour",
            description: "Explore the historic city center",
            location: "Old Town Square",
            category: "sightseeing",
            notes: "Wear comfortable walking shoes"
          },
          {
            time: "02:00 PM",
            title: "Hotel Check-in",
            description: "Check in to Grand Hotel",
            location: "123 Main Street",
            category: "lodging",
            notes: "Early check-in requested"
          }
        ]
      },
      {
        day: 2,
        activities: [
          {
            time: "10:00 AM",
            title: "Local Market",
            description: "Experience local culture and food",
            location: "Central Market Hall",
            category: "dining",
            notes: "Bring cash for purchases"
          }
        ]
      }
    ]
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % tripData.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + tripData.images.length) % tripData.images.length);
  };

  return (
    <Container>
      <ImageSliderContainer>
        <SliderActions>
          <ActionButton>
            <Share2 size={16} />
            Share
          </ActionButton>
          <ActionButton>
            <Download size={16} />
            Download PDF
          </ActionButton>
        </SliderActions>
        
        <SliderImage
          src={tripData.images[currentImage]}
          alt={`Trip image ${currentImage + 1}`}
        />
        
        <SliderButton className="left" onClick={prevImage}>
          <ChevronLeft size={24} />
        </SliderButton>
        
        <SliderButton className="right" onClick={nextImage}>
          <ChevronRight size={24} />
        </SliderButton>
        
        <Indicators>
          {tripData.images.map((_, idx) => (
            <Indicator key={idx} active={idx === currentImage} />
          ))}
        </Indicators>
      </ImageSliderContainer>

      <TripCard>
        <TripHeader>
          <div>
            <TripTitle>{tripData.name}</TripTitle>
            <TripInfo>{tripData.duration} Days</TripInfo>
          </div>
          <div>
            <TripInfo>Total Cost</TripInfo>
            <TripTitle>${tripData.totalCost}</TripTitle>
          </div>
        </TripHeader>
      </TripCard>

      <TabsContainer>
        <TabList>
          {tripData.days.map((day) => (
            <Tab
              key={day.day}
              active={activeTab === day.day.toString()}
              onClick={() => setActiveTab(day.day.toString())}
            >
              Day {day.day}
            </Tab>
          ))}
        </TabList>

        {tripData.days.map((day) => (
          day.day.toString() === activeTab && (
            <div key={day.day}>
              {day.activities.map((activity, idx) => {
                const CategoryIconComponent = categoryConfig[activity.category].icon;
                return (
                  <ActivityCard
                    key={idx}
                    categoryColor={categoryConfig[activity.category].color}
                  >
                    <ActivityHeader>
                      <div>
                        <CategoryIcon color={categoryConfig[activity.category].color}>
                          <CategoryIconComponent size={20} />
                          <ActivityTitle>{activity.title}</ActivityTitle>
                        </CategoryIcon>
                        <ActivityDescription>{activity.description}</ActivityDescription>
                        <ActivityLocation>
                          <MapPin size={16} />
                          {activity.location}
                        </ActivityLocation>
                      </div>
                      <ActivityTime>{activity.time}</ActivityTime>
                    </ActivityHeader>
                    {activity.notes && (
                      <ActivityNote>Note: {activity.notes}</ActivityNote>
                    )}
                  </ActivityCard>
                );
              })}
            </div>
          )
        ))}
      </TabsContainer>
    </Container>
  );
};

export default TripItinerary; 