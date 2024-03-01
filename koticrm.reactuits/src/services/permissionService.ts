// // permissionService.js

// // Import any necessary libraries for making HTTP requests
// import axios from 'axios';

// // Define the base URL for your API
// const BASE_URL = 'https://localhost:7063/api/UserAccount/GetModulePermission/e807190e-4092-4e2b-97bd-0c2264454501';

// // Define functions for interacting with your permissions API

// // Function to fetch permissions for a specific user based on their role
// export const fetchPermissions = async (userId) => {
//   try {
//     // Make a GET request to your API endpoint to fetch permissions
//     const response = await axios.get(`${BASE_URL}/permissions/${userId}`);
//     // Extract and return the permissions from the response data
//     return response.data.permissions;
//   } catch (error) {
//     // Handle any errors that occur during the request
//     console.error('Error fetching permissions:', error);
//     throw error; // Re-throw the error to be handled by the caller
//   }
// };

// // Export the functions for use in other parts of your application
// export default {
//   fetchPermissions,
// };
