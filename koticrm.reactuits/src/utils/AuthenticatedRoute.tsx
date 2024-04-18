import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface AuthProps {
    isAuth: boolean;
}

const AuthenticatedRoute: React.FC<AuthProps> = ({ isAuth }) => {
    // user should be logged in and have authorization 
    const authLogin = localStorage.getItem('accessToken');

    // if not logged In then cannot access authorized pages
    if (isAuth) {
        return authLogin ? <Outlet /> : <Navigate to="/login" />;
    }
    else if ((authLogin && window.location.pathname === '/login') || (authLogin && window.location.pathname === '/')) {
        return <Navigate to="/dashboard" />
    } else {
        return <Outlet />;
    }
};

export default AuthenticatedRoute;
