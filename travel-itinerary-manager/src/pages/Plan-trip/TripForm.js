import * as React from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { Clock, Trash2, Edit2, Bed, Coffee, Bus, Camera, Utensils } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import { Save } from 'react-feather';
import { saveTrip } from "../../api";
import { useNavigate } from 'react-router-dom';

const ACTIVITY_CATEGORIES = {
  LODGING: { label: 'Lodging', icon: Bed, color: '#7c3aed' },
  DINING: { label: 'Dining', icon: Utensils, color: '#ef4444' },
  TRANSPORT: { label: 'Transport', icon: Bus, color: '#3b82f6' },
  SIGHTSEEING: { label: 'Sightseeing', icon: Camera, color: '#10b981' },
  OTHER: { label: 'Other', icon: Coffee, color: '#6b7280' }
};

export function TripForm() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [isStartDatePickerOpen, setIsStartDatePickerOpen] = React.useState(false);
  const [isEndDatePickerOpen, setIsEndDatePickerOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);
  const [activities, setActivities] = React.useState({});
  const [isAddingActivity, setIsAddingActivity] = React.useState(false);
  const [editingActivity, setEditingActivity] = React.useState(null);
  const [tripName, setTripName] = React.useState('');
  const [tripCost, setTripCost] = React.useState('');

  const handleSaveTrip = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('Please log in to save trips');
        return;
      }
      if (!tripName) {
        alert('Please enter a trip name');
        return;
      }
      if (!startDate || !endDate) {
        alert('Please select start and end dates');
        return;
      }

      const tripData = {
        name: tripName,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        cost: tripCost ? parseFloat(tripCost) : 0,
        currency: 'USD', 
        activities: Object.entries(activities).map(([date, dayActivities]) => ({
          date,
          activities: dayActivities
        })),
        userId: localStorage.getItem('userId')
      };
     const response = await saveTrip(tripData);
    console.log('Response:', response);
    
    if (window.confirm('Trip saved successfully! Click OK to return to dashboard.')) {
      navigate('/dashboard');
    }
  } catch (error) {
    console.error('Full error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    alert(`Failed to save trip: ${error.response?.data?.error || error.message}`);
  }
};

const [currency, setCurrency] = React.useState('USD');

 
  const [newActivity, setNewActivity] = React.useState({
    title: '',
    category: 'OTHER',
    startTime: new Date(),
    endTime: new Date(),
    location: '',
    notes: ''
  });

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setIsStartDatePickerOpen(false);
    if (date > endDate) {
      setEndDate(date);
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    setIsEndDatePickerOpen(false);
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    }) || 'Select date';
  };

  const getDatesInRange = (start, end) => {
    if (!start || !end) return [];
    const dates = [];
    let currentDate = new Date(start);

    while (currentDate <= end) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const dateRange = getDatesInRange(startDate, endDate);

  const handleAddActivity = () => {
    const currentDate = dateRange[activeTab];
    const dateKey = currentDate.toISOString().split('T')[0];
    
    const newActivityWithId = {
      ...newActivity,
      id: Date.now(),
      date: dateKey
    };

    setActivities(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newActivityWithId]
    }));

    setIsAddingActivity(false);
    setNewActivity({
      title: '',
      category: 'OTHER',
      startTime: new Date(),
      endTime: new Date(),
      location: '',
      notes: ''
    });
  };

  const handleEditActivity = (activity) => {
    setEditingActivity(activity);
    setNewActivity(activity);
    setIsAddingActivity(true);
  };

  const handleUpdateActivity = () => {
    const dateKey = editingActivity.date;
    setActivities(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].map(act => 
        act.id === editingActivity.id ? { ...newActivity, id: act.id, date: dateKey } : act
      )
    }));
    setIsAddingActivity(false);
    setEditingActivity(null);
    setNewActivity({
      title: '',
      category: 'OTHER',
      startTime: new Date(),
      endTime: new Date(),
      location: '',
      notes: ''
    });
  };
  

  const handleDeleteActivity = (activityId, dateKey) => {
    setActivities(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].filter(act => act.id !== activityId)
    }));
  };

  const getCurrentDateActivities = () => {
    const currentDate = dateRange[activeTab];
    if (!currentDate) return [];
    const dateKey = currentDate.toISOString().split('T')[0];
    return activities[dateKey] || [];
  };

  return (
    <PageContainer>


<FormContainer>
<TripNameInput
          type="text"
          placeholder="Enter Trip Name"
          value={tripName}
          onChange={(e) => setTripName(e.target.value)}
        />
  <DatePickerWrapper>
    <DateLabel>Start Date</DateLabel>
    <DatePickerButton onClick={() => setIsStartDatePickerOpen(true)}>
      {formatDate(startDate)}
      <Clock size={20} />
    </DatePickerButton>
    {isStartDatePickerOpen && (
      <DatePickerOverlay>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          minDate={new Date()}
          inline
        />
      </DatePickerOverlay>
    )}
  </DatePickerWrapper>

  <DatePickerWrapper>
    <DateLabel>End Date</DateLabel>
    <DatePickerButton onClick={() => setIsEndDatePickerOpen(true)}>
      {formatDate(endDate)}
      <Clock size={20} />
    </DatePickerButton>
    {isEndDatePickerOpen && (
      <DatePickerOverlay>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          minDate={startDate || new Date()}
          inline
        />
      </DatePickerOverlay>
    )}
  </DatePickerWrapper>
</FormContainer>

      {dateRange.length > 0 && (
        <ItineraryContainer>
          <TabsContainer>
            {dateRange.map((date, index) => (
              <TabButton
                key={date.toISOString()}
                isActive={activeTab === index}
                onClick={() => setActiveTab(index)}
              >
                Day {index + 1}
                <TabDate>
                  {date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </TabDate>
              </TabButton>
            ))}
          </TabsContainer>
          
          <ItineraryContent>
            <DayHeader>
              <DayTitle>Day {activeTab + 1} - {formatDate(dateRange[activeTab])}</DayTitle>
              <AddButton onClick={() => setIsAddingActivity(true)}>+ Add Activity</AddButton>
            </DayHeader>

            {isAddingActivity && (
              <ActivityForm>
                <FormTitle>{editingActivity ? 'Edit Activity' : 'Add New Activity'}</FormTitle>
                <FormGrid>
                  <FormField>
                    <label>Title</label>
                    <input
                      type="text"
                      value={newActivity.title}
                      onChange={e => setNewActivity({...newActivity, title: e.target.value})}
                      placeholder="Activity title"
                    />
                  </FormField>
                  
                  <FormField>
                    <label>Category</label>
                    <select
                      value={newActivity.category}
                      onChange={e => setNewActivity({...newActivity, category: e.target.value})}
                    >
                      {Object.entries(ACTIVITY_CATEGORIES).map(([key, {label}]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </select>
                  </FormField>
                  
                  <FormField>
                    <label>Start Time</label>
                    <DatePicker
                      selected={newActivity.startTime}
                      onChange={date => setNewActivity({...newActivity, startTime: date})}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      dateFormat="h:mm aa"
                    />
                  </FormField>
                  
                  <FormField>
                    <label>End Time</label>
                    <DatePicker
                      selected={newActivity.endTime}
                      onChange={date => setNewActivity({...newActivity, endTime: date})}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      dateFormat="h:mm aa"
                    />
                  </FormField>
                  
                  <FormField>
                    <label>Location</label>
                    <input
                      type="text"
                      value={newActivity.location}
                      onChange={e => setNewActivity({...newActivity, location: e.target.value})}
                      placeholder="Location"
                    />
                  </FormField>
                  
                  <FormField className="full-width">
                    <label>Notes</label>
                    <textarea
                      value={newActivity.notes}
                      onChange={e => setNewActivity({...newActivity, notes: e.target.value})}
                      placeholder="Additional notes"
                    />
                  </FormField>
                </FormGrid>
                
                <FormActions>
                  <CancelButton onClick={() => {
                    setIsAddingActivity(false);
                    setEditingActivity(null);
                  }}>Cancel</CancelButton>
                  <SaveButton onClick={editingActivity ? handleUpdateActivity : handleAddActivity}>
                    {editingActivity ? 'Update' : 'Add'} Activity
                  </SaveButton>
                </FormActions>
              </ActivityForm>
            )}

            <ActivitiesList>
              {getCurrentDateActivities()
                .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
                .map(activity => {
                  const CategoryIcon = ACTIVITY_CATEGORIES[activity.category].icon;
                  return (
                    <ActivityCard key={activity.id}>
                      <ActivityHeader color={ACTIVITY_CATEGORIES[activity.category].color}>
                        <CategoryIcon size={20} />
                        <ActivityTime>
                          {new Date(activity.startTime).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                          {" - "}
                          {new Date(activity.endTime).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </ActivityTime>
                      </ActivityHeader>
                      
                      <ActivityContent>
                        <ActivityTitle>{activity.title}</ActivityTitle>
                        {activity.location && (
                          <ActivityLocation>{activity.location}</ActivityLocation>
                        )}
                        {activity.notes && (
                          <ActivityNotes>{activity.notes}</ActivityNotes>
                        )}
                      </ActivityContent>
                      
                      <ActivityActions>
                        <ActionButton onClick={() => handleEditActivity(activity)}>
                          <Edit2 size={16} />
                        </ActionButton>
                        <ActionButton onClick={() => handleDeleteActivity(activity.id, activity.date)}>
                          <Trash2 size={16} />
                        </ActionButton>
                      </ActivityActions>
                    </ActivityCard>
                  );
                })}
            </ActivitiesList>
          </ItineraryContent>
        </ItineraryContainer>
        
      )}
         <CostSection>
         <Label>Trip Cost</Label>
         <CostInputGroup>
  <CostInputWrapper>
    <CostInput
      type="number"
      placeholder="Enter trip cost"
      value={tripCost}
      onChange={(e) => setTripCost(e.target.value)}
      min="0"
      step="0.01"
    />
  </CostInputWrapper>
  <CurrencySelect 
      value={currency} 
      onChange={(e) => setCurrency(e.target.value)}
    >
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="GBP">GBP</option>
      <option value="JPY">JPY</option>
      <option value="AUD">AUD</option>
      <option value="CAD">CAD</option>
      <option value="LKR">LKR</option>
    </CurrencySelect>
  </CostInputGroup>
      </CostSection>
<SaveTripSection>
      <SaveTripButton onClick={handleSaveTrip}>
        <Save size={20} />
        Save Trip
      </SaveTripButton>
    </SaveTripSection>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const FormContainer = styled.div`
  display: flex;
  width: 467px;
  max-width: 100%;
  flex-direction: column;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;




const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`;
const DatePickerWrapper = styled.div`
  display: flex;
  margin-top: 21px;
  width: 100%;
  flex-direction: column;
  font-family: Poppins, sans-serif;
  font-weight: 500;
  justify-content: start;
  position: relative;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const DateLabel = styled.label`
  color: #101010;
  font-size: 14px;
  line-height: 1;
`;

const DatePickerButton = styled.button`
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  margin-top: 8px;
  width: 100%;
  align-items: center;
  gap: 16px;
  overflow: hidden;
  font-size: 16px;
  color: #141414;
  justify-content: space-between;
  padding: 16px;
  border: 2px solid #e5e5e5;
  cursor: pointer;
`;


const DatePickerOverlay = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-top: 4px;

  .react-datepicker {
    border: none;
    font-family: Poppins, sans-serif;
  }

  .react-datepicker__header {
    background-color: white;
    border-bottom: 1px solid #e5e5e5;
  }

  .react-datepicker__day--selected {
    background-color: #2c2c2c;
    color: white;
  }

  .react-datepicker__day:hover {
    background-color: #f5f5f5;
  }
`;

const ItineraryContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const TabsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  border-bottom: 1px solid #e5e5e5;
  background: #f8f8f8;
  padding: 0 16px;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 2px;
  }
`;

const TabButton = styled.button`
  padding: 16px 24px;
  border: none;
  background: none;
  cursor: pointer;
  font-family: Poppins, sans-serif;
  font-weight: 500;
  color: ${props => props.isActive ? '#000' : '#666'};
  border-bottom: 2px solid ${props => props.isActive ? '#000' : 'transparent'};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 100px;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.isActive ? 'none' : '#f0f0f0'};
  }
`;

const TabDate = styled.span`
  font-size: 12px;
  color: #666;
`;

const ItineraryContent = styled.div`
  padding: 24px;
`;

const DayTitle = styled.h2`
  font-family: Poppins, sans-serif;
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 24px 0;
`;

const AddButton = styled.button`
  padding: 8px 16px;
  border: none;
  background: #000;
  color: white;
  border-radius: 4px;
  font-family: Poppins, sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #333;
  }
`;

const DayHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const ActivityForm = styled.div`
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
`;

const FormTitle = styled.h3`
  margin: 0 0 20px 0;
  font-family: Poppins, sans-serif;
  font-size: 18px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
  
  .full-width {
    grid-column: 1 / -1;
  }
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  label {
    font-size: 14px;
    font-weight: 500;
    color: #374151;
  }
  
  input, select, textarea {
    padding: 8px 12px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    font-family: Poppins, sans-serif;
    
    &:focus {
      outline: none;
      border-color: #2563eb;
    }
  }
  
  textarea {
    min-height: 100px;
    resize: vertical;
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  font-family: Poppins, sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
`;

const SaveButton = styled(Button)`
  background: #2563eb;
  color: white;
  border: none;
  
  &:hover {
    background: #1d4ed8;
  }
`;

const CancelButton = styled(Button)`
  background: white;
  color: #374151;
  border: 1px solid #e5e5e5;
  
  &:hover {
    background: #f3f4f6;
  }
`;

const ActivitiesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ActivityCard = styled.div`
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  overflow: hidden;
`;

const ActivityHeader = styled.div`
  background: ${props => props.color};
  color: white;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ActivityTime = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const ActivityContent = styled.div`
  padding: 16px;
`;

const ActivityTitle = styled.h4`
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
`;

const ActivityLocation = styled.p`
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #6b7280;
`;

const ActivityNotes = styled.p`
  margin: 0;
  font-size: 14px;
  color: #374151;
`;

const ActivityActions = styled.div`
  padding: 8px 16px;
  border-top: 1px solid #e5e5e5;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const ActionButton = styled.button`
  padding: 4px;
  border: none;
  background: none;
  color: #6b7280;
  cursor: pointer;
  transition: color 0.2s;
  
  &:hover {
    color: #374151;
  }
`;
const TripNameInput = styled.input`
  width: 93%;
  padding: 16px;
  border: 2px solid #e5e5e5;
  border-radius: 8px;
  font-size: 16px;
  font-family: Poppins, sans-serif;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`;
const CostSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 24px;
`;

const CostInputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  

`;
const CostInputGroup = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`;
const CostInput = styled.input`
  width: 100%;
  padding: 16px;
  padding-left: 18px;
  border: 2px solid #e5e5e5;
  border-radius: 8px;
  font-size: 16px;
  font-family: Poppins, sans-serif;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #2563eb;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const CurrencySelect = styled.select`
  padding: 16px;
  border: 2px solid #e5e5e5;
  border-radius: 8px;
  font-size: 16px;
  font-family: Poppins, sans-serif;
  background-color: white;
  cursor: pointer;
  width: 100px;
  
  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`;
const SaveTripButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  width: auto;
  margin-left: auto;

  &:hover {
    background: #1d4ed8;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const SaveTripSection = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 24px 0;
  border-top: 1px solid #e5e5e5;
  margin-top: 32px;
`;
