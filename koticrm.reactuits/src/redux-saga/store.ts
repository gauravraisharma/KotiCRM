import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import mySaga from './sagas/sagas.ts'
import rootReducer from './reducers/rootReducer.ts';


const sagaMiddelware = createSagaMiddleware();

// const rootReducer = combineReducers({
//   reducer
// });

const store = createStore(rootReducer, applyMiddleware(sagaMiddelware));
sagaMiddelware.run(mySaga);

export default store;