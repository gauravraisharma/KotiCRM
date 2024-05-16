import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import { cilAccountLogout, cilSettings, cilUser } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import avatar8 from "../../../assets/images/avatars/8.jpg";
import { useNavigate } from "react-router-dom";
//import { useAuth } from '../../utils/AuthProvider'
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../redux-saga/modules/auth/action";
import { useSelector } from "react-redux";

const AppHeaderDropdown = () => {
  
 
  const navigate = useNavigate();
  // const auth = useAuth();
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    // auth?.logout()
    dispatch(logout());
    navigate("/login");
  };


  const modulePermissions = useSelector(
    (state: any) => state.authReducer.modulePermission
  );
  console.log(modulePermissions);

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0">
      {modulePermissions && modulePermissions.some(permission => permission.moduleName === 'ManageUsers' && permission.isView) && (
        <CDropdownItem href="javascript:;">
          <CIcon icon={cilUser} className="me-2" />

        <Link to="/users">
        Users
        </Link>
     
        </CDropdownItem>
           )}
      {modulePermissions && modulePermissions.some(permission => permission.moduleName === 'ManageUsers' && permission.isView) && (

        <CDropdownItem>
          <CIcon icon={cilSettings} className="me-2" />
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/settings`}
          >
            Settings
          </Link>
        </CDropdownItem>
      )}
        <CDropdownDivider />
        <CDropdownItem onClick={handleLogout} style={{ cursor: "pointer" }}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Log out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
