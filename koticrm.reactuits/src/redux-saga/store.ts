import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers/rootReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web



const persistConfig = {
    key: 'root',
    storage,
  };
  
//   const persistedReducer=persistReducer(persistConfig,rootReducer);
// const sagaMiddleware = createSagaMiddleware();

// // const peristStore = createStore(
// //     persistedReducer,
// //      applyMiddleware(sagaMiddleware));
// // sagaMiddleware.run(mySaga);


// const PersistStore=configureStore({
//             reducer:persistedReducer,
//             middleware:applyMiddleware(sagaMiddleware)
// })

// export const store=persistStore(peristStore);

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
let persistor = persistStore(store);

export { store, persistor, sagaMiddleware };