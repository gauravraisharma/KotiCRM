import {combineReducers } from 'redux'
import accountReducer from './modules/account/reducer'
import authReducer from './modules/auth/reducer'
import attachmentReducer from './modules/attachment/reducer'
import contactReducer from './modules/contact/reducer'
import noteReducer from './modules/notes/reducer'
import invoiceReducer from './modules/invoice/reducer'
import sharedReducer from './modules/shared/reducer'
import { Reducer } from 'react'
import { rootState } from '../models/reduxState/rootState'
import { AppAction } from '../models/redux/action/ActionModel'
const rootReducer: Reducer<rootState | undefined, AppAction> = combineReducers({ 
                                    authReducer,
                                    accountReducer,
                                    attachmentReducer,
                                    contactReducer,
                                    invoiceReducer,
                                    noteReducer,
                                    sharedReducer
                                     });

export default rootReducer;