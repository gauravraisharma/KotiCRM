
// import axios from 'axios';

// // Define the base URL for your authentication API
// const BASE_URL = 'http://your-api-url';

// // Function to authenticate user credentials
// export const login = async (credentials) => {
//   try {
//     // Make a POST request to your API endpoint to authenticate user
//     const response = await axios.post(`${BASE_URL}/login`, credentials);
//     // Extract and return user data from the response
//     return response.data.user;
//   } catch (error) {
//     // Handle any errors that occur during the request
//     console.error('Error logging in:', error);
//     throw error; // Re-throw the error to be handled by the caller
//   }
// };

// // Function to log out the user
// export const logout = async () => {
//   try {
//     // Make a POST request to your API endpoint to log out the user
//     const response = await axios.post(`${BASE_URL}/logout`);
//     // Return response data
//     return response.data;
//   } catch (error) {
//     // Handle any errors that occur during the request
//     console.error('Error logging out:', error);
//     throw error; // Re-throw the error to be handled by the caller
//   }
// };

// // Export the functions for use in other parts of your application
// export default {
//   login,
//   logout,
// };
