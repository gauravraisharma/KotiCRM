import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface AuthProps {
    isAuth: boolean;
}

const checkTokenExpired = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        return true;
    }

    try {
        const tokenPayload = JSON.parse(atob(token.split('.')[1])); // Decode token payload
        const tokenExpirationTime = tokenPayload.exp * 1000; // Convert expiration time to milliseconds
        const currentTime = Date.now(); // Get current time in milliseconds

        return currentTime > tokenExpirationTime; 
    } catch (error) {
        console.error('Error decoding or parsing token:', error);
        return true;
    }
};

const AuthenticatedRoute: React.FC<AuthProps> = ({ isAuth }) => {
    
    const isTokenExpired = checkTokenExpired();
    
    const authLogin = localStorage.getItem('accessToken');

    if (isAuth) {
        if(isTokenExpired)
        {
            localStorage.removeItem('accessToken');
            return <Navigate to="/login" />
        } else if (authLogin && !isTokenExpired) {
            return <Outlet />;
        } else {
            return <Navigate to="/login" />;
        }
    }
    else if ((authLogin && window.location.pathname === '/')) {
        return <Navigate to="/dashboard" />;
    } else {
        return <Outlet />;
    }

    // const authLogin = localStorage.getItem('accessToken');  (authLogin && window.location.pathname === '/login') || 

    // if not logged In then cannot access authorized pages
    // if (isAuth) {
    //     return authLogin ? <Outlet /> : <Navigate to="/login" />;
    // }
    // else if ((authLogin && window.location.pathname === '/login') || (authLogin && window.location.pathname === '/')) {
    //     return <Navigate to="/dashboard" />
    // } else {
    //     return <Outlet />;
    // }
};

export default AuthenticatedRoute;
