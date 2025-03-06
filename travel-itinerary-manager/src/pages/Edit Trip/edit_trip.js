import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, Save, Plus, Trash2, Bed, Utensils, Bus, Camera, Activity, MapPin } from 'lucide-react';
import { getTripById, getTripActivities, updateActivity, addActivity, deleteActivity, updateTrip } from '../../api';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 1rem;
`;
const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #ef4444;
  
  &:hover {
    background: #fee2e2;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${props => props.variant === 'primary' ? '#2563eb' : '#f3f4f6'};
  color: ${props => props.variant === 'primary' ? 'white' : 'black'};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: ${props => props.variant === 'primary' ? '600' : 'normal'};
  
  &:hover {
    background: ${props => props.variant === 'primary' ? '#1d4ed8' : '#e5e7eb'};
  }
`;

const TripDetailsCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #4b5563;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
`;

const DateContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const DateWrapper = styled.div`
  flex: 1;

  .react-datepicker-wrapper {
    width: 100%;
  }
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

const TabContent = styled.div`
  margin-top: 1rem;
`;

const ActivityContainer = styled.div`
  margin-bottom: 2rem;
`;

const AddActivityButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem;
  background: #f3f4f6;
  border: 1px dashed #d1d5db;
  border-radius: 4px;
  cursor: pointer;
  color: #4b5563;
  margin-top: 1rem;
  
  &:hover {
    background: #e5e7eb;
  }
`;

const ActivityCard = styled.div`
  background: white;
  border-left: 4px solid ${props => props.categoryColor};
  border-radius: 0 8px 8px 0;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ActivityCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CategorySelector = styled.select`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background-color: white;
`;

const TimePickerContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;

  & > * {
    flex: 1;
  }
`;

const TimePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__input-container {
    width: 100%;
  }

  .react-datepicker__input-container input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    font-size: 0.875rem;
    color: #374151;
  }
`;

const SuccessMessage = styled.div`
  background-color: #d1fae5;
  color: #065f46;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
`;

const ErrorMessage = styled.div`
  background-color: #fee2e2;
  color: #b91c1c;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
`;

const EditTripPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('1');
  const [tripData, setTripData] = useState({
    name: '',
    startDate: new Date(),
    endDate: new Date(),
    cost: 0,
    currency: 'USD'
  });
  const [days, setDays] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const categoryConfig = {
    LODGING: { color: '#8b5cf6', icon: Bed },
    DINING: { color: '#ef4444', icon: Utensils },
    TRANSPORT: { color: '#3b82f6', icon: Bus },
    SIGHTSEEING: { color: '#10b981', icon: Camera },
    OTHER: { color: '#f59e0b', icon: Activity }
  };

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        // Fetch trip details
        const trip = await getTripById(id);
        
        // Fetch activities
        const activities = await getTripActivities(id);
        
        // Set trip data
        setTripData({
          name: trip.name,
          startDate: new Date(trip.start_date),
          endDate: new Date(trip.end_date),
          cost: trip.cost || 0,
          currency: trip.currency || 'USD'
        });
        
        // Calculate number of days
        const startDate = new Date(trip.start_date);
        const endDate = new Date(trip.end_date);
        const durationInDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
        
        // Create days array
        const daysArray = [];
        
        for (let i = 0; i < durationInDays; i++) {
          const currentDate = new Date(startDate);
          currentDate.setDate(startDate.getDate() + i);
          
          daysArray.push({
            date: currentDate,
            activities: []
          });
        }
        
        // Populate activities in the days array
        activities.forEach(activity => {
          const activityDate = new Date(activity.date);
          const dayIndex = Math.floor((activityDate - startDate) / (1000 * 60 * 60 * 24));
          
          if (dayIndex >= 0 && dayIndex < daysArray.length) {
            // Convert time strings to Date objects for DatePicker
            let startTime = null;
            let endTime = null;
            
            if (activity.start_time) {
              // Create a date object using the activity date and start time
              const [hours, minutes] = activity.start_time.split(':');
              startTime = new Date(activityDate);
              startTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);
            }
            
            if (activity.end_time) {
              // Create a date object using the activity date and end time
              const [hours, minutes] = activity.end_time.split(':');
              endTime = new Date(activityDate);
              endTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);
            }
            
            daysArray[dayIndex].activities.push({
              id: activity.id,
              title: activity.title,
              category: activity.category,
              location: activity.location || '',
              startTime: startTime || new Date(activityDate),
              endTime: endTime || new Date(activityDate),
              notes: activity.notes || ''
            });
          }
        });
        
        setDays(daysArray);
        setActiveTab('1'); // Show first day by default
      } catch (error) {
        console.error('Error fetching trip data:', error);
        setError('Failed to load trip data. Please try again.');
      }
    };
    
    fetchTripData();
  }, [id]);
  
  // Add a helper function to format time for display and API
  const formatTimeForAPI = (timeDate) => {
    if (!timeDate) return null;
    
    const hours = timeDate.getHours().toString().padStart(2, '0');
    const minutes = timeDate.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  // Add these handler functions after the useEffect and before the handleSave function

const handleTripDataChange = (field, value) => {
    setTripData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const handleStartDateChange = (date) => {
    setTripData(prevData => ({
      ...prevData,
      startDate: date
    }));
  
    // Recalculate days array
    recalculateDays(date, tripData.endDate);
  };
  
  const handleEndDateChange = (date) => {
    setTripData(prevData => ({
      ...prevData,
      endDate: date
    }));
  
    // Recalculate days array
    recalculateDays(tripData.startDate, date);
  };
  
  const recalculateDays = (startDate, endDate) => {
    const durationInDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    
    const newDays = [];
    
    // Keep existing days and their activities if they fall within the new date range
    for (let i = 0; i < durationInDays; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      const existingDay = days.find(day => {
        const dayDate = new Date(day.date);
        return dayDate.getDate() === currentDate.getDate() &&
               dayDate.getMonth() === currentDate.getMonth() &&
               dayDate.getFullYear() === currentDate.getFullYear();
      });
      
      if (existingDay) {
        newDays.push({
          ...existingDay,
          date: currentDate
        });
      } else {
        newDays.push({
          date: currentDate,
          activities: []
        });
      }
    }
    
    setDays(newDays);
  
    // Update active tab if necessary
    if (parseInt(activeTab) > newDays.length) {
      setActiveTab('1');
    }
  };
  
  const handleActivityChange = (dayIndex, activityIndex, field, value) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].activities[activityIndex][field] = value;
    setDays(updatedDays);
  };
  
  const handleAddActivity = (dayIndex) => {
    const updatedDays = [...days];
    const currentDate = new Date(updatedDays[dayIndex].date);
    
    updatedDays[dayIndex].activities.push({
      title: '',
      category: 'OTHER',
      location: '',
      startTime: new Date(currentDate),
      endTime: new Date(currentDate),
      notes: ''
    });
    
    setDays(updatedDays);
  };
  
  const handleRemoveActivity = (dayIndex, activityIndex) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].activities.splice(activityIndex, 1);
    setDays(updatedDays);
  };
  // Update the handleSave function to format time properly
  const handleSave = async () => {
    try {
      setIsSaving(true);
      setMessage(null);
      setError(null);
  
      // Format data for API with time values in the correct format
      const formattedData = {
        name: tripData.name,
        startDate: tripData.startDate,
        endDate: tripData.endDate,
        cost: parseFloat(tripData.cost) || 0,
        currency: tripData.currency || 'USD',
        activities: days.map(day => ({
          date: day.date,
          activities: day.activities.map(activity => ({
            id: activity.id,
            title: activity.title,
            category: activity.category,
            location: activity.location || '',
            startTime: formatTimeForAPI(activity.startTime),
            endTime: formatTimeForAPI(activity.endTime),
            notes: activity.notes || ''
          }))
        }))
      };
  
      console.log('Saving trip with data:', formattedData);
  
      // Update trip in the database
      const result = await updateTrip(id, formattedData);
      
      console.log('Trip update successful:', result);
      setMessage('Trip updated successfully!');
      
      // After short delay, redirect back to view page
      setTimeout(() => {
        navigate(`/itinerary/${id}`);
      }, 1500);
      
    } catch (error) {
      console.error('Error saving trip:', error);
      setError(`Failed to save trip: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Container>
      <Header>
        <Button onClick={() => navigate(`/itinerary/${id}`)}>
          <ChevronLeft size={20} />
          Back to Itinerary
        </Button>
        <Title>Edit Trip</Title>
        <Button variant="primary" onClick={handleSave} disabled={isSaving}>
          <Save size={20} />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </Header>

      {message && <SuccessMessage>{message}</SuccessMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <TripDetailsCard>
        <FormGroup>
          <Label htmlFor="tripName">Trip Name</Label>
          <Input
            id="tripName"
            type="text"
            value={tripData.name}
            onChange={(e) => handleTripDataChange('name', e.target.value)}
          />
        </FormGroup>

        <DateContainer>
          <DateWrapper>
            <Label>Start Date</Label>
            <DatePicker
              selected={tripData.startDate}
              onChange={handleStartDateChange}
              dateFormat="MMMM d, yyyy"
              className="form-control"
              wrapperClassName="datePicker"
              customInput={<Input />}
            />
          </DateWrapper>

          <DateWrapper>
            <Label>End Date</Label>
            <DatePicker
              selected={tripData.endDate}
              onChange={handleEndDateChange}
              dateFormat="MMMM d, yyyy"
              minDate={tripData.startDate}
              className="form-control"
              wrapperClassName="datePicker"
              customInput={<Input />}
            />
          </DateWrapper>
        </DateContainer>

        <FormGroup>
          <Label>Estimated Cost</Label>
          <Input
            type="number"
            value={tripData.cost}
            onChange={(e) => handleTripDataChange('cost', parseFloat(e.target.value))}
          />
        </FormGroup>
      </TripDetailsCard>

      <TabsContainer>
        <Label>Daily Activities</Label>
        <TabList>
          {days.map((day, index) => (
            <Tab
              key={index}
              active={activeTab === (index + 1).toString()}
              onClick={() => setActiveTab((index + 1).toString())}
            >
              Day {index + 1} - {formatDate(day.date)}
            </Tab>
          ))}
        </TabList>

        {days.map((day, dayIndex) => (
          dayIndex + 1 === parseInt(activeTab) && (
            <ActivityContainer key={dayIndex}>
              {day.activities.map((activity, activityIndex) => (
                <ActivityCard 
                  key={activityIndex}
                  categoryColor={categoryConfig[activity.category]?.color || categoryConfig.OTHER.color}
                >
                  <ActivityCardHeader>
                    <CategorySelector
                      value={activity.category}
                      onChange={(e) => handleActivityChange(dayIndex, activityIndex, 'category', e.target.value)}
                    >
                      <option value="LODGING">Lodging</option>
                      <option value="DINING">Dining</option>
                      <option value="TRANSPORT">Transport</option>
                      <option value="SIGHTSEEING">Sightseeing</option>
                      <option value="OTHER">Other</option>
                    </CategorySelector>
                    <RemoveButton onClick={() => handleRemoveActivity(dayIndex, activityIndex)}>
                      <Trash2 size={18} />
                    </RemoveButton>
                  </ActivityCardHeader>

                  <FormGroup>
                    <Label>Activity Title</Label>
                    <Input
                      type="text"
                      value={activity.title}
                      onChange={(e) => handleActivityChange(dayIndex, activityIndex, 'title', e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Location</Label>
                    <Input
                      type="text"
                      value={activity.location}
                      onChange={(e) => handleActivityChange(dayIndex, activityIndex, 'location', e.target.value)}
                    />
                  </FormGroup>

                  <TimePickerContainer>
  <TimePickerWrapper>
    <Label>Start Time</Label>
    <DatePicker
      selected={activity.startTime}
      onChange={(date) => handleActivityChange(dayIndex, activityIndex, 'startTime', date)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      dateFormat="h:mm aa"
      className="form-control"
    />
  </TimePickerWrapper>

  <TimePickerWrapper>
    <Label>End Time</Label>
    <DatePicker
      selected={activity.endTime}
      onChange={(date) => handleActivityChange(dayIndex, activityIndex, 'endTime', date)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      dateFormat="h:mm aa"
      className="form-control"
    />
  </TimePickerWrapper>
</TimePickerContainer>

                  <FormGroup>
                    <Label>Notes</Label>
                    <Input
                      as="textarea"
                      rows={3}
                      value={activity.notes || ''}
                      onChange={(e) => handleActivityChange(dayIndex, activityIndex, 'notes', e.target.value)}
                    />
                  </FormGroup>
                </ActivityCard>
              ))}
              
              <AddActivityButton onClick={() => handleAddActivity(dayIndex)}>
                <Plus size={18} />
                Add Activity
              </AddActivityButton>
            </ActivityContainer>
          )
        ))}
      </TabsContainer>
    </Container>
  );
};

export default EditTripPage;