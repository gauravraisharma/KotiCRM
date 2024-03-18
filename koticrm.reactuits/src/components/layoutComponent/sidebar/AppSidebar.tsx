import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import logoNegative from '../../../assets/brand/logo-blue.png'

import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../../../_nav'
import { RootState } from '../../../models/commonModels/CommonModels'
import { Link } from 'react-router-dom'
import { SIDEBAR_TOGGLE } from '../../../constants/reduxConstants'

const allowedItems = ['Dashboard'];
const AppSidebar = () => {
    const dispatch = useDispatch()
    const unfoldable = useSelector((state: RootState) => state.sidebarUnfoldable)
    const sidebarShow = useSelector((state: any) => state.sharedReducer.sidebarToggle)
    const modulePermissions = useSelector((state: any) => state.authReducer.modulePermission);

    const filteredNavItems = navigation.filter((item) => {
        // Check if corresponding permission object exists in `modulePermissions`
        if (modulePermissions != null && modulePermissions != undefined) {
            return allowedItems.includes(item.moduleName) || (
                modulePermissions.some((permission: any) => permission.moduleName === item.moduleName && permission.isAdd)
            );
        } else {
            return null;
        }
    });

    return (

        <CSidebar
            position="fixed"
            unfoldable={unfoldable}
            visible={sidebarShow}
            onVisibleChange={(visible) => {
                dispatch({ type: SIDEBAR_TOGGLE, sidebarShow: visible })
            }}
        >
            <Link to="/">
                <CSidebarBrand className="d-none d-md-flex py-3">
                    <img src={logoNegative} alt="Logo" style={{ height: '40px', width: 'auto' }} />
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
