import { call, put } from "redux-saga/effects";
import { GET_ORGANIZATION_SUCCESS, UPDATE_ORGANIZATION_SUCCESS } from "../../constants/reduxConstants";
import { OrganizationBankModel, OrganizationModel } from "../../models/commonModels/SharedModels";
import OrganizationService from "../../services/OrganizationService";


function* organizationFetch(): Generator<any> {
  debugger
  try {
    const response = yield call(OrganizationService.GetOrganizationList);
    return response;
  } catch (error) {
    console.error('Error fetching organization:', error);
    throw error;
  }
}

export function* workGetOrganizationFetch() {
  try {
    const organization: OrganizationBankModel[] = yield call(organizationFetch);
    yield put({ type: GET_ORGANIZATION_SUCCESS, organization });
  } catch (error) {
    // Handle error if needed
  }
}


function* updateOrganization(action: {payload: {  id: any,organizationResponse: any }}) : Generator<any>{
debugger
  try {
    const {  id,organizationResponse } = action.payload;

      const response = yield call(OrganizationService.UpdateOrganization,id, organizationResponse );
      return response;
  } catch (error) {
    console.error('Error setting timezone:', error);
    throw error;
  }
}

export function* workUpdateOrganization(action: any) {
  try {
    const updatedOrg: OrganizationModel = yield call(updateOrganization, {payload : action.payload} );
    yield put({ type: UPDATE_ORGANIZATION_SUCCESS, updatedOrg });
  } catch (error) {
    // Handle error if needed
  }
}
