import { GET_INDUSTRY_FETCH, GET_ORGANIZATION_FETCH, SIDEBAR_TOGGLE, UPDATE_TIMEZONE } from "../../../constants/reduxConstants";

export const sidebarToggle = (sidebarShow: boolean) => ({
  type: SIDEBAR_TOGGLE,
  payload: sidebarShow
});

export const getIndustry = () => ({
  type: GET_INDUSTRY_FETCH
})

export const getOrganization = () => ({
  type: GET_ORGANIZATION_FETCH
})

export const updateTimeZone = (id:any, organizationResponse:any) => ({
  type: UPDATE_TIMEZONE,
  payload: {id, organizationResponse },
})
