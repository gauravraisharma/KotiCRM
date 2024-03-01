import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          {/* <button onClick={()=> dispatch(getAccounts())}>Get Account</button>
<div>Accounts : {accounts.map((mp=> (<div key={mp.id}>{mp.billingCity}</div>)))}</div> */}
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
