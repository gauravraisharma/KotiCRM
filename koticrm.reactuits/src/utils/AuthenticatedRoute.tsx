// import {  Navigate, Outlet } from 'react-router-dom';
// interface AuthProps {
//     isAuth: boolean;
// }
// const AuthenticatedRoute: React.FC<AuthProps> = ({ isAuth }) => {

//     //user should be logged in and have authorization 
//     const authLogin = localStorage.getItem('accessToken');

//     //if not logged In than cannot authorized pages
//     if (isAuth) {
//         return authLogin ? <Outlet /> : <Navigate to="/login" />;
//     }
//     else {
//         return  <Outlet />
//     }
// };

// export default AuthenticatedRoute;
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface AuthProps {
    isAuth: boolean;
}

const AuthenticatedRoute: React.FC<AuthProps> = ({ isAuth }) => {
    // user should be logged in and have authorization 
    const authLogin = localStorage.getItem('accessToken');
    console.log("authLogin:", authLogin); // Add this line to check the value of authLogin

    // if not logged In then cannot access authorized pages
    if (isAuth) {
        return authLogin ? <Outlet /> : <Navigate to="/login" />;
    } else {
        return <Outlet />;
    }
};

export default AuthenticatedRoute;
