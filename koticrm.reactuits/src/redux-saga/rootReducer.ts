import { combineReducers } from 'redux'
import accountReducer from './modules/account/reducer'
import authReducer from './modules/auth/reducer'
import attachmentReducer from './modules/attachment/reducer'
import contactReducer from './modules/contact/reducer'
import noteReducer from './modules/notes/reducer'
import invoiceReducer from './modules/invoice/reducer'
import sharedReducer from './modules/shared/reducer'
const rootReducer = combineReducers({ 
                                    authReducer,
                                    accountReducer,
                                    attachmentReducer,
                                    contactReducer,
                                    invoiceReducer,
                                    noteReducer,
                                    sharedReducer
                                     });

export default rootReducer;