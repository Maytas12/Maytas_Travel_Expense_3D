// import axios from 'axios';

// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// // Calendar API
// export const calendarAPI = {
//   getEvents: async (month, year) => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/calendar/events`, {
//         params: { month, year }
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching calendar events:', error);
//       return generateMockCalendarData(month, year);
//     }
//   }
// };

// // Contacts API
// export const contactsAPI = {
//   getSummary: async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/contacts/summary`);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching contact summary:', error);
//       return generateMockContactData();
//     }
//   }
// };

// // Applications API
// export const applicationsAPI = {
//   getSummary: async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/applications/summary`);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching application summary:', error);
//       return generateMockApplicationData();
//     }
//   }
// };

// // Mock data generators
// const generateMockCalendarData = (month = new Date().getMonth(), year = new Date().getFullYear()) => {
//   const data = [];
//   const daysInMonth = new Date(year, month + 1, 0).getDate();
  
//   for (let day = 1; day <= daysInMonth; day++) {
//     if (Math.random() > 0.6) {
//       const eventCount = Math.floor(Math.random() * 5) + 1;
//       for (let i = 0; i < eventCount; i++) {
//         data.push({
//           id: `${year}-${month + 1}-${day}-${i}`,
//           date: `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
//           title: `Event ${i + 1} on ${day}/${month + 1}`,
//           type: Math.random() > 0.5 ? 'meeting' : 'task',
//           description: `Sample ${Math.random() > 0.5 ? 'meeting' : 'task'} for demonstration`,
//           priority: Math.random() > 0.7 ? 'high' : Math.random() > 0.5 ? 'medium' : 'low',
//           status: Math.random() > 0.8 ? 'completed' : 'pending'
//         });
//       }
//     }
//   }
//   return data;
// };

// const generateMockContactData = () => {
//   const total = 100;
//   return [
//     { name: 'Email', value: Math.floor(Math.random() * 30) + 30, color: '#667eea' },
//     { name: 'Phone', value: Math.floor(Math.random() * 20) + 20, color: '#764ba2' },
//     { name: 'Social Media', value: Math.floor(Math.random() * 15) + 10, color: '#f093fb' },
//     { name: 'Contact Form', value: Math.floor(Math.random() * 10) + 5, color: '#4facfe' }
//   ];
// };

// const generateMockApplicationData = () => {
//   return [
//     { name: 'Web Development', value: Math.floor(Math.random() * 20) + 30, color: '#667eea' },
//     { name: 'Mobile Apps', value: Math.floor(Math.random() * 15) + 25, color: '#764ba2' },
//     { name: 'Desktop Software', value: Math.floor(Math.random() * 10) + 15, color: '#f093fb' },
//     { name: 'API Integration', value: Math.floor(Math.random() * 5) + 5, color: '#4facfe' }
//   ];
// };

// // Real-time data updates
// export const subscribeToUpdates = (callback) => {
//   // Simulate real-time updates
//   const interval = setInterval(() => {
//     callback({
//       calendar: generateMockCalendarData(),
//       contacts: generateMockContactData(),
//       applications: generateMockApplicationData()
//     });
//   }, 30000); // Update every 30 seconds

//   return () => clearInterval(interval);
// };

// export default {
//   calendarAPI,
//   contactsAPI,
//   applicationsAPI,
//   subscribeToUpdates
// };
