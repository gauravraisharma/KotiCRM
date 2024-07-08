import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilBell, cilMenu } from "@coreui/icons";
import { AppBreadcrumb } from "../../index";
import { AppHeaderDropdown } from "./index";
import { logo } from "../../../assets/brand/logo";
import { SIDEBAR_TOGGLE } from "../../../constants/reduxConstants";
import "../../../css/style.css";

// Define the type for the state used in useSelector
interface RootState {
  sharedReducer: {
    sidebarToggle: boolean;
  };
}

const AppHeader: React.FC = () => {
  // Define the type of the state explicitly
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const dispatch = useDispatch();

  // Define the type of the parameter for handleClick
  const handleClick = (link: string) => {
    setActiveLink(link);
  };

  // Use the RootState type in useSelector
  const sidebarShow = useSelector((state: RootState) => state.sharedReducer.sidebarToggle);

  const toggleSidebar = () => {
    dispatch({ type: SIDEBAR_TOGGLE, sidebarShow: !sidebarShow });
  };

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler className="ps-1" onClick={toggleSidebar}>
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none">
          <Link to="/">
            <CIcon icon={logo} height={48} />
          </Link>
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink
              to="/dashboard"
              component={NavLink}
              activeClassName="active"
              onClick={() => handleClick("/dashboard")}
            >
              Dashboard
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  );
};

export default AppHeader;
