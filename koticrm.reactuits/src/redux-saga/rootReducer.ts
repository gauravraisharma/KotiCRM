import {combineReducers } from 'redux'
import accountReducer from './modules/account/reducer'
import authReducer from './modules/auth/reducer'
import attachmentReducer from './modules/attachment/reducer'
import contactReducer from './modules/contact/reducer'
import noteReducer from './modules/notes/reducer'
import invoiceReducer from './modules/invoice/reducer'
import sharedReducer from './modules/shared/reducer'
import { Reducer } from 'react'
import { RootState } from '../models/commonModels/CommonModels'
import { actionPayloadModel } from '../models/actionModel/actionModel'
const rootReducer: Reducer<RootState, actionPayloadModel> = combineReducers({ 
                                    authReducer,
                                    accountReducer,
                                    attachmentReducer,
                                    contactReducer,
                                    invoiceReducer,
                                    noteReducer,
                                    sharedReducer
                                     });

export default rootReducer;