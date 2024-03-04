import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from '../assets/brand/logo-negative'
import { sygnet } from '../assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
import { RootState } from '../models/commonModels/CommonModels'
import { Link } from 'react-router-dom'

const allowedItems = ['Dashboard'];
const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state:RootState) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state:RootState) => state.sidebarShow)
  const modulePermissions = useSelector((state:any) => state.reducer.modulePermission); 

  console.log(modulePermissions)
  const filteredNavItems = navigation.filter((item) => {
    // Check if corresponding permission object exists in `modulePermissions`
    return allowedItems.includes(item.moduleName) || (
      modulePermissions.some((permission:any) => permission.moduleName === item.moduleName && permission.isAdd)
    );
  });
  console.log(filteredNavItems)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <Link to="/">
        <CSidebarBrand className="d-none d-md-flex">
          <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
          <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
        </CSidebarBrand>
      </Link>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={filteredNavItems} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
