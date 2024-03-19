import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import rootSaga from './rootSaga';
import rootReducer from './rootReducer';
import { rootState } from '../models/reduxState/rootState';


const persistConfig = {
    key: 'root',
    storage,
  };
  


const persistedReducer = persistReducer<rootState | undefined>(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  persistedReducer, 
  applyMiddleware(sagaMiddleware)
  );

  
sagaMiddleware.run(rootSaga);
const  persistor = persistStore(store);
export { store, persistor, sagaMiddleware };