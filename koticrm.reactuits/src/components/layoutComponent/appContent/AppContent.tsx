import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer } from '@coreui/react'

// routes config
import routes from '../../../routes'
import PermissionAuth from '../../../utils/PermissionAuth'

const AppContent = () => {
  return (
    <CContainer lg>
 
        <Routes>
          {routes.map((route:any, index) => {

            return (<Route key={index} path={route.path} element={<PermissionAuth modulePermission={route.modulePermission} isAuth={route.isAuth} />}>
              <Route
                key={index}
                path={route.path}
                element={<route.element />} />
            </Route>
            )

          })}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>

    </CContainer>
  )
}

export default React.memo(AppContent)
