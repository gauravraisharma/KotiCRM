import { Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { appRoutes } from './routes';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

function App() {
  return (
    <HashRouter>
      <Suspense fallback={loading}>
        <Routes>
          {appRoutes.map((route, index) => (
            (route.element && <Route key={index} path={route.path} element={<route.element />} />)
          ))}
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;