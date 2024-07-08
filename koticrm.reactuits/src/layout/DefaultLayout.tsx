import { Suspense } from 'react';
import { AppSidebar, AppHeader, AppContent } from '../components/index'
import "react-toastify/dist/ReactToastify.css";
import { CSpinner } from '@coreui/react';

const loading = (
	<div className='spinner-backdrop'>
	<CSpinner
		size="sm"
		color='white'
		style={{
			width: "5rem",
			height: "5rem",
			borderWidth: "0.70rem",
			zIndex: "9999",
		}}
	/>
	</div>
);


const DefaultLayout = () => {

	return (
		<Suspense fallback={loading}>

			<div>
				<AppSidebar />
				<div className="wrapper d-flex flex-column min-vh-100 bg-light">
					<AppHeader />
					<div className="body flex-grow-1 px-3">
						<AppContent />
					</div>
				</div>
			</div>

		</Suspense>
	)
}

export default DefaultLayout
