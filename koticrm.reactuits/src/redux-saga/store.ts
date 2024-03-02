import { combineReducers, legacy_createStore as createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducers/reducer.ts'
import mySaga from './sagas/sagas.ts'


const sagaMiddelware = createSagaMiddleware();
  
  const rootReducer = combineReducers({
    reducer: reducer
  });
  
  const store = createStore(  rootReducer, applyMiddleware(sagaMiddelware));
  sagaMiddelware.run(mySaga);

  export default store;