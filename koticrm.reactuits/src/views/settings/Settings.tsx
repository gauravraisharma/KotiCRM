import { useSelector } from "react-redux";
import Timezone from "./Timezone";
import { ToastContainer } from "react-toastify";

const Settings: React.FC = () => {
  const userType = useSelector((state:any)=> state.authReducer.userType)
  return (
      <>
      <ToastContainer/>
      {userType == 'Administrator' ? <Timezone/> : ''}
      </>
  );
};

export default Settings;
