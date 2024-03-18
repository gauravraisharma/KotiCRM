import { useSelector } from "react-redux";
import Timezone from "./Timezone";

const Settings: React.FC = () => {
  const userType = useSelector((state:any)=> state.authReducer.userType)
  console.log(userType)
  return (
      <>
      {userType == 'Administrator' ? <Timezone/> : ''}
      </>
  );
};

export default Settings;
