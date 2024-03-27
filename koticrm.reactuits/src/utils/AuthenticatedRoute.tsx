import {  Navigate, Outlet } from 'react-router-dom';
interface AuthProps {
    isAuth: boolean;
}
const AuthenticatedRoute: React.FC<AuthProps> = ({ isAuth }) => {

    //user should be logged in and have authorization 
    const authLogin = localStorage.getItem('accessToken');

    //if not logged In than cannot authorized pages
    if (isAuth) {
        return authLogin ? <Outlet /> : <Navigate to="/login" />;
    }
    else {
        return  <Outlet />
    }
};

export default AuthenticatedRoute;
