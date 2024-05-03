import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CNavItem,
  CNavLink,
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
  
    // // Check if corresponding permission object exists in `modulePermissions`
    // if (modulePermissions) {
    //     return allowedItems.includes(item.moduleName) ||
    //         modulePermissions.some((permission: any) => permission.moduleName === item.moduleName && permission.isView);
    // } else {
    //     return null;
    // }
  const navigate = useNavigate();
  // const auth = useAuth();
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    // auth?.logout()
    dispatch(logout());
    navigate("/login");
  };
  const handleClick = (link) => {
    setActiveLink(link);
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

         {/* if {modulePermissions && (
            <Link to="/users" onClick={() => handleClick("/users")}>
              Users
            </Link>
          )} */}

        <Link to="/users" onClick={() => handleClick("/users")}>
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
