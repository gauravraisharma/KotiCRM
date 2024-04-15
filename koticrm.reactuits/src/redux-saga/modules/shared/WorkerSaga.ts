
import { call, put } from 'redux-saga/effects';
import { toast } from "react-toastify";
import { GetIndustryList, GetOrganizationList, updateTimeZone} from './apiService';

import {
  GET_INDUSTRY_SUCCESS,
  GET_ORGANIZATION_SUCCESS,
  UPDATE_TIMEZONE_SUCCESS
} from '../../../constants/reduxConstants';
import { OrganizationBankModel, OrganizationModel, SharedModel } from '../../../models/commonModels/SharedModels';
import { actionPayloadModel } from '../../../models/actionModel/actionModel';



export function* workUpdateTimezone(action: actionPayloadModel) : Generator<any> {
  try {
    const response:any= yield call(updateTimeZone,  action.payload.id,action.payload.organizationResponse );
    if(response.status!=200){
      toast.error('Error fetching accounts')
    }else{
      let timeZone: string =response.data.timeZone;
      yield put({ type: UPDATE_TIMEZONE_SUCCESS, timeZone });
      toast.success('TimeZone Updated successfully ')
    }
    
  } catch (error) {
    toast.error('Something Went Wrong, Please try after sometime')
    }
}

export function* workGetIndustryFetch(): Generator<any> {
  try {
    const response:any = yield call(GetIndustryList);
    if(response.status!=200){
      toast.error('Error fetching accounts')
    }else{
      const industry: SharedModel[]   =response.data;
      yield put({ type: GET_INDUSTRY_SUCCESS, payload: industry });
   
    }
    
  } catch (error) {
    toast.error('SomethingWent Wrong, Please try after sometime')
  }
}


export function* workGetOrganizationFetch(): Generator<any> {
  try {
    const response:any = yield call(GetOrganizationList);
    if(response.status!=200){
      toast.error('Error fetching accounts')
    }else{
      const organization: OrganizationBankModel[]    =response.data;
      yield put({ type: GET_ORGANIZATION_SUCCESS, payload: organization });
   
    }
    
  } catch (error) {
    toast.error('SomethingWent Wrong, Please try after sometime')
  }
}




