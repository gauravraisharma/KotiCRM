// // AuthProvider.js
// import { createContext, useContext, useState } from 'react';

// // Create the authentication context
// export const AuthContext = createContext({});

// // Custom hook to consume the authentication context
// export const useAuth = () => useContext(AuthContext);

// // AuthProvider component to manage authentication state
// export const AuthProvider = ( children:any ) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     // Function to log in the user
//     const login = () => {
//         // Perform your authentication logic here
//         setIsAuthenticated(true);
//     };

//     // Function to log out the user
//     const logout = () => {
//         // Perform your logout logic here
//         setIsAuthenticated(false);
//     };

//     return (
//         <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
