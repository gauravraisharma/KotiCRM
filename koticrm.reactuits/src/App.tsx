import { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { appRoutes } from './routes';
import AuthenticatedRoute from './utils/AuthenticatedRoute';
import ResetPassword from './views/userAuthentication/resetPassword/ResetPassword';



const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

function App() {

  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>

          {appRoutes.map((route: any, index) => {
            return (<Route
              key={index}
              path={route.path}
              element={<AuthenticatedRoute isAuth={route.isAuth} />}>
              <Route
                key={index}
                path={route.path}
                element={<route.element />} />
            </Route>
            )

          })}

          <Route path="/resetPassword" element={<ResetPassword />} />

        </Routes>

      </Suspense>

    </BrowserRouter>
  );
}

export default App;