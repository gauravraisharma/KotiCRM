import React, { FC } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

import { CBadge, CNav, CNavItem, CNavLink } from '@coreui/react'
import { NavItem } from '../../../models/commonModels/CommonModels';
import CIcon from '@coreui/icons-react';

// interface Badge {
//   color: string;
//   text: string;
// }

// interface Props {
//   items: NavItem[];
// }
interface SidebarItem {
  name: string;
  to: string;
  icon: string;
}

interface Props {
  items: SidebarItem[];
}


export const AppSidebarNav: FC<Props> = ({ items }) => {
  const location = useLocation()

  // const navLink = (name: string, icon: JSX.Element, badge?: Badge) => {
  //   return (
  //     <>
  //       {icon && icon}
  //       {name && name}
  //       {badge && (
  //         <CBadge color={badge.color} className="ms-auto">
  //           {badge.text}
  //         </CBadge>
  //       )}
  //     </>
  //   )
  // }

  // const navItem = (item: NavItem, index: number) => {
  //   const { component, name, badge, icon, ...rest } = item
  //   const Component = component
  //   return (
  //     <Component
  //       {...(rest.to &&
  //         !rest.items && {
  //         component: NavLink,
  //       })}
  //       key={index}
  //       {...rest}
  //     >
  //       {navLink(name, icon, badge)}
  //     </Component>
  //   )
  // }
  
  // const navGroup = (item: NavItem, index: number) => {
  //   const { component, name, icon, to, ...rest } = item
  //   const Component = component
  //   return (
  //     <Component
  //       idx={String(index)}
  //       key={index}
  //       toggler={navLink(name, icon)}
  //       visible={location.pathname.startsWith(to!)}
  //       {...rest}
  //     >
  //       {item.items?.map((item, index) =>
  //         item.items ? navGroup(item, index) : navItem(item, index),
  //       )}
  //     </Component>
  //   )
  // }


  return (
    <>
      <CNav className="sidebar-nav">
      {items.map((item, index) => (
        <CNavItem key={index} className={location.pathname.startsWith(item.to) ? 'active' : ''}>
          <Link to={item.to} className="nav-link" >
           {item.icon}
           <span className="nav-text">{item.name}</span>
          </Link>
        </CNavItem>
      ))}
    </CNav>
    </>
  )
}

// AppSidebarNav.propTypes = {
//   items: PropTypes.arrayOf(PropTypes.any).isRequired,
// }