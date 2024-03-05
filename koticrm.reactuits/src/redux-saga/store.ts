import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import mySaga from './sagas/sagas.ts'
import rootReducer from './reducers/rootReducer';


const sagaMiddleware = createSagaMiddleware();

// const rootReducer = combineReducers({
//   reducer
// });

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(mySaga);

export default store;