import { authState } from './authState';
import { attachmentState } from './attachmentState';
import { contactState } from './contactState';
import { invoiceState } from './invoiceState';
import { noteState } from './noteState';
import { sharedState } from './sharedState';
import { accountState } from './accountState';

export interface rootState {
    authReducer:authState;
    accountReducer:accountState;
    attachmentReducer:attachmentState;
    contactReducer:contactState;
    invoiceReducer:invoiceState;
    noteReducer:noteState;
    sharedReducer:sharedState;
}