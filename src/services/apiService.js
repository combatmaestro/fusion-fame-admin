// src/services/apiService.js

// const API_BASE_URL = 'http://localhost:5000/api'; // Change to full URL in production if needed
const API_BASE_URL ='https://fusion-fame-server.vercel.app/api'; // Production URL
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return { success: response.ok, data };
  } catch (error) {
    console.error('Login API error:', error);
    return { success: false, data: { message: 'Network error' } };
  }
};

export const getAllEnquiries = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/enquiries/enquiry`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add Authorization header if protected
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const data = await response.json();
    return { success: response.ok, data };
  } catch (error) {
    console.error('Get Enquiries API error:', error);
    return { success: false, data: { message: 'Network error' } };
  }
};



export const addBooking = async (bookingData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/bookings/addBooking`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });
    if (!res.ok) throw new Error('Failed to add booking');
    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
};


export const getAllBookings = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/bookings/getAllBookings`);
    if (!res.ok) throw new Error('Failed to fetch bookings');
    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return { success: false, message: error.message };
  }
};
