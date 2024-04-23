import { Suspense } from 'react';
import { AppSidebar, AppHeader, AppContent } from '../components/index'
import "react-toastify/dist/ReactToastify.css";
import { CSpinner } from '@coreui/react';


const DefaultLayout = () => {

    return (
        <div>
          <Suspense fallback={ <div className="spinner-backdrop">
          <CSpinner
            size="sm"
            color="white"
            style={{
              width: "5rem",
              height: "5rem",
              borderWidth: "0.60rem",
              zIndex: "9999",
            }}
          />
        </div>}>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader />
                <div className="body flex-grow-1 px-3">
                    <AppContent />
                </div>
            </div>
            </Suspense>
        </div>
    )
}

export default DefaultLayout
