import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

import { CNav, CNavItem } from "@coreui/react";

interface SidebarItem {
  name: string;
  to: string;
  icon: string;
}

interface Props {
  items: SidebarItem[];
}

export const AppSidebarNav: FC<Props> = ({ items }) => {
  const location = useLocation();

  return (
    <>
      <CNav className="sidebar-nav">
        {items.map((item, index) => (
          <CNavItem
            key={index}
            className={location.pathname.startsWith(item.to) ? "active" : ""}
          >
            <Link to={item.to} className="nav-link">
              {item.icon}
              <span className="nav-text">{item.name}</span>
            </Link>
          </CNavItem>
        ))}
      </CNav>
    </>
  );
};
