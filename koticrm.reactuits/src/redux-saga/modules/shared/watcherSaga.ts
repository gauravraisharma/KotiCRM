import { takeEvery } from "redux-saga/effects";
import { GET_INDUSTRY_FETCH, GET_ORGANIZATION_FETCH, UPDATE_TIMEZONE } from "../../../constants/reduxConstants";
import { workGetIndustryFetch, workGetOrganizationFetch, workUpdateTimezone } from "./WorkerSaga";

function* sharedSaga() {
  //industry
  yield takeEvery(GET_INDUSTRY_FETCH, workGetIndustryFetch);
  //organization
  yield takeEvery(GET_ORGANIZATION_FETCH, workGetOrganizationFetch)
    yield takeEvery(UPDATE_TIMEZONE, workUpdateTimezone)
  }

  export default sharedSaga