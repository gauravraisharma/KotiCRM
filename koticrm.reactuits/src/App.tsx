import { Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { appRoutes } from './routes';
import AuthenticatedRoute from './utils/AuthenticatedRoute';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

function App() {
  return (
    <HashRouter>
      {/* <AuthProvider> */}
      <Suspense fallback={loading}>
                  <Routes>

                      {appRoutes.map((route:any, index) => {
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
        </Routes>
      </Suspense>
      {/* </AuthProvider> */}
    </HashRouter>
  );
}

export default App;