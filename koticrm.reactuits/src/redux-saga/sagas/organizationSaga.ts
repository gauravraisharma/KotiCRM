import { call, put } from "redux-saga/effects";
import { GET_ORGANIZATION_SUCCESS } from "../../constants/reduxConstants";
import { OrganizationBankModel } from "../../models/commonModels/SharedModels";
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
