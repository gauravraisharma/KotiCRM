import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
// import store from './store'
import { combineReducers, legacy_createStore as createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from './redux-saga/reducer'
import mySaga from './redux-saga/sagas'

const sagaMiddelware = createSagaMiddleware();

const rootReducer = combineReducers({
  reducer: reducer
});
const store = createStore(rootReducer, applyMiddleware(sagaMiddelware))
sagaMiddelware.run(mySaga);
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
