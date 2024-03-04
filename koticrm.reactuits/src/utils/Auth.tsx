import { useState,useContext, createContext,ReactNode } from 'react'
import { UserLogin } from '../models/userAccount/login';

interface AuthContextType {
  user: UserLogin | null;
  login: (user: UserLogin) => void;
  logout: () => void;
}
  const AuthContext = createContext<AuthContextType | null>(null);

  interface AuthProviderProps {
    children: ReactNode;
  }
  
  export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<UserLogin | null>(null);
    const login = (user: UserLogin) => {
        setUser(user);
      };
      const logout = () => {
        localStorage.removeItem('accessToken')
        setUser(null);
      };

      const authContextValue: AuthContextType = {
        user,
        login,
        logout,
      };    
    
      return (
        <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
      )
    };

export const useAuth =()=>{
    const context = useContext(AuthContext)
  //   if (!context) {
  //     throw new Error('useAuth must be used within an AuthProvider');
  // }

  return context;

}
