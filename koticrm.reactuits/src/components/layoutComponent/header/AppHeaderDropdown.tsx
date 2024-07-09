import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import { cilAccountLogout, cilSettings, cilUser, cilUserFemale } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { useNavigate } from "react-router-dom";
import avatar from "../../../assets/brand/profilePlaceholder.jpg";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../redux-saga/modules/auth/action";
import { useSelector } from "react-redux";

const AppHeaderDropdown = () => {
  
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(logout());
    navigate("/login");
  };


  const modulePermissions = useSelector(
    (state: any) => state.authReducer.modulePermission
  );

  const user = useSelector((state: any) => state.authReducer.user);
  console.log("useruseruser" + user.profilePictureURL);

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle className="py-0" caret={false}>
        <CAvatar src={user.profilePictureURL ? user.profilePictureURL : avatar} size="lg" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0">
      <CDropdownItem>
          <CIcon icon={cilUserFemale} className="me-2" />
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`users/profile/${user.employeeId}`}
          >
            Profile
          </Link>
        </CDropdownItem>
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
