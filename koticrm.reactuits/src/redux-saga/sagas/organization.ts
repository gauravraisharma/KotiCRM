

import {
     UPDATE_TIMEZONE_SUCCESS
} from '../../constants/reduxConstants';
import { UserLogin } from '../../models/userAccount/login';


function* updateTimeZoneRequest(action: {payload: { invoice: any, id: any }}) : Generator<any>{
    try {
      const { invoice, id } = action.payload;
  
        const response = yield call(InvoiceService.UpdateInvoice,invoice, id );
        return response;
    } catch (error) {
      console.error('Error fetching Invoices:', error);
      throw error;
    }
  }
  export function* workUpdateContact(action: any) {
    try {
        const updatedContact: Contact = yield call(updateContact, { payload: action.payload });
        yield put({ type: UPDATE_CONTACT_SUCCESS, updatedContact });
    } catch (error) {
        // Handle error if needed
    }
}