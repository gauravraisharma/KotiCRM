import  { ReactNode } from 'react';
import { useAuth } from './Auth';
import { Navigate } from 'react-router-dom';

interface RequireAuthProps {
  children: ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
    const token = localStorage.getItem('accessToken')
    if(token){
  const loginData = JSON.parse(token);
  const auth = useAuth();
  if (!loginData) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
 } 
 else{
    return <Navigate to="/login" replace />;
 }
}
