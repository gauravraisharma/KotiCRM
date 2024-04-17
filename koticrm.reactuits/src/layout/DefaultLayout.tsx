import { AppSidebar, AppHeader, AppContent } from '../components/index'
import "react-toastify/dist/ReactToastify.css";


const DefaultLayout = () => {

    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader />
                <div className="body flex-grow-1 px-3">
                    <AppContent />
                </div>
            </div>
        </div>
    )
}

export default DefaultLayout
