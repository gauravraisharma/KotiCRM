import { useNavigate } from 'react-router';
import {  AppSidebar, AppFooter, AppHeader, AppContent } from '../components/index'
import { useSelector } from 'react-redux';

const DefaultLayout = () => {
  //const loggedIn = useSelector((state: any) => {
  //  console.log('State: ', state);
  //  return state.reducer.loggedIn;
  //});

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
