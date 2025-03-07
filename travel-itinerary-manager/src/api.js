import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; 

export const addUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error getting users:', error);
    throw error;
  }
};
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const deleteUserAccount = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user account:', error);
    throw error;
  }
};


export const getUserInfo = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error getting user info:', error);
    throw error;
  }
};

export const updateUserInfo = async (username, userData) => {
  try {
    const response = await axios.put(`${API_URL}/users/${username}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user info:', error);
    throw error;
  }
};


export const saveTrip = async (tripData) => {
  try {
    const userId = localStorage.getItem('userId'); 
    const tripWithUserId = { ...tripData, userId };
    const response = await axios.post(`${API_URL}/trips`, tripWithUserId);
    return response.data;
  } catch (error) {
    console.error('Error saving trip:', error);
    throw error;
  }
};
export const getUserTrips = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/trips/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user trips:', error);
    throw error;
  }
};


export const getTripById = async (tripId) => {
  try {
    const response = await axios.get(`${API_URL}/trips/${tripId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching trip:', error);
    throw error;
  }
};

export const getTripActivities = async (tripId) => {
  try {
    const response = await axios.get(`${API_URL}/trips/${tripId}/activities`);
    return response.data;
  } catch (error) {
    console.error('Error fetching trip activities:', error);
    throw error;
  }
};

export const updateTrip = async (tripId, tripData) => {
  try {
    
    const formattedData = {
      name: tripData.name,
      startDate: tripData.startDate,
      endDate: tripData.endDate,
      cost: parseFloat(tripData.cost) || 0,
      currency: tripData.currency || 'USD',
      activities: tripData.activities.map(day => ({
        date: day.date,
        activities: day.activities.map(activity => ({
          id: activity.id,
          title: activity.title,
          category: activity.category,
          location: activity.location || '',
          startTime: activity.startTime,
          endTime: activity.endTime,
          notes: activity.notes || ''
        }))
      }))
    };

    const response = await axios.put(`${API_URL}/trips/${tripId}`, formattedData);
    return response.data;
  } catch (error) {
    console.error('Error updating trip:', error);
    throw error;
  }
};

const UNSPLASH_ACCESS_KEY = '2PpANlCw-mkc5qlmvKZ6BeBAU_QMrYd6EMb27b-QT8Q'; 

export const getLocationImages = async (location) => {
  try {
    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: {
        client_id: UNSPLASH_ACCESS_KEY,
        query: location,
        orientation: 'landscape',
        per_page: 5,
        w: 1024,              
        h: 400,               
        fit: 'crop',          
        crop: 'entropy',      
        q: 80      
      },
      headers: {
        'Accept-Version': 'v1'
      }
    });
    
    return response.data.results.map(photo => ({
      id: photo.id,
      url: photo.urls.regular, 
      photographer: photo.user.name,
      location: photo.location?.name || location
    }));
  } catch (error) {
    console.error('Error fetching location images:', error);
    return [];
  }
};

export const getTripCoverImage = (title) => {
  try {
    
    const locationMatch = title.toLowerCase().match(/(?:trip to|in|at|visit(?:ing)?)\s+([a-z\s]+)$/i);
    const location = locationMatch ? 
      locationMatch[1].trim().replace(/\s+/g, '') : 
      title.toLowerCase().replace(/\s+/g, '');

    console.log('Extracted location:', location); 

    return require(`./images/${location}.jpg`);
  } catch (error) {
    console.error('Error getting cover image:', error);
    return require('./images/default.jpg');
  }
};