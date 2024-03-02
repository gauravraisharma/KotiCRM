import { useNavigate } from 'react-router';
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const DefaultLayout = () => {
  const navigate = useNavigate();
  const loggedIn = useSelector((state: any) => {
    console.log('State: ', state);
    return state.reducer.loggedIn;
  });
  useEffect(() => {
    if (!loggedIn) {
      navigate('/login');
    }
  }, [loggedIn, navigate]);
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
