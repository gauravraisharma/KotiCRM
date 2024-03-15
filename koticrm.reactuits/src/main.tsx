import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import {store, persistor, sagaMiddleware} from './redux-saga/store.ts'
import mySaga from './redux-saga/sagas/sagas.ts'
import { PersistGate } from 'redux-persist/integration/react'

sagaMiddleware.run(mySaga);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>	  
      <App/>
    </PersistGate>	
  </Provider>,
)
