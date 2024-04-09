import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../../../routes'
import PermissionAuth from '../../../utils/PermissionAuth'

const AppContent = () => {
  return (
    <CContainer lg>
      {/* <Suspense fallback={<CSpinner color="primary" />}> */}
      {/* <div className="spinner-backdrop">
    <CSpinner className="spinner" color="primary" />
</div> */}
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
      {/* </Suspense> */}
    </CContainer>
  )
}

export default React.memo(AppContent)
