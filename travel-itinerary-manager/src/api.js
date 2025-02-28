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
    const response = await axios.put(`${API_URL}/trips/${tripId}`, tripData);
    return response.data;
  } catch (error) {
    console.error('Error updating trip:', error);
    throw error;
  }
};

const PIXABAY_API_KEY = '32258999-ea3fdee2c69c77e6b4accb3ec'; 

export const getLocationImages = async (location) => {
  try {
    const response = await axios.get(`https://pixabay.com/api/`, {
      params: {
        key: PIXABAY_API_KEY,
        q: encodeURIComponent(location),
        image_type: 'photo',
        category: 'places',
        per_page: 5,
        min_width: 1024,
        min_height: 400,
        orientation: 'horizontal'
      }
    });
    return response.data.hits.map(hit => ({
      id: hit.id,
      url: hit.largeImageURL, 
      photographer: hit.user
    }));
  } catch (error) {
    console.error('Error fetching location images:', error);
    return [];
  }
};

export const getTripCoverImage = (location) => {
  try {
    
    const formattedLocation = location.toLowerCase().replace(/\s+/g, '');
    return require (`./images/${formattedLocation}.jpg`);
  } catch (error) {
    console.error('Error getting cover image:', error);
    return require ('./images/default.jpg');
  }
};