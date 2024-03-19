import React, { useEffect, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
  } from "@coreui/react";
import { OrganizationModel } from "../../models/commonModels/SharedModels";
import TimezoneSelect from "react-timezone-select";
import "../../css/style.css";


import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { getOrganization, updateTimeZone } from '../../redux-saga/modules/shared/action';

const Timezone: React.FC = () => {
  const dispatch = useDispatch();
  // const currentDate = new Date(); 
  
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [timezone, setTimezone] = useState('')
  const handleTimezone = (selectedItem: any) => {
    debugger
    const regex = /\+(\d{1,2}:\d{2})/;
    const match = regex.exec(selectedItem.label);

if (match && match.length > 1) {
  const extractedTimezone = match[0];
    setSelectedTimezone(selectedItem.value);
    setTimezone(extractedTimezone)

  };

}
const organization = useSelector((state: any) => state.sharedReducer.organization);
console.log(organization)
// var orgDetails:any;
var orgDetails: OrganizationModel | undefined;
// console.log('orgDetails')  
if (organization) {
  const activeOrg = organization.filter((org: any) => org.organizationResponse?.isActive === true);
  if (activeOrg && activeOrg.length > 0) {
      orgDetails  = activeOrg[0]?.organizationResponse;
  }
}
const saveSettings = () => {
debugger
if(orgDetails){
const organizationDetail: OrganizationModel = {
id :orgDetails.id,
orgName : orgDetails.orgName,
isActive: orgDetails.isActive,
timeZone: timezone,
shifts: orgDetails.shifts,
includeLogofToIdle :orgDetails.includeLogofToIdle,
currency : orgDetails.currency,
billingStreet:orgDetails.billingStreet,
billingCity :orgDetails.billingCity,
billingState:orgDetails.billingState,
billingCode:orgDetails.billingCode,
billingCountry:orgDetails.billingCountry
};
dispatch(updateTimeZone(orgDetails.id, organizationDetail))

}else{
  console.error("orgDetails is undefined");

}
};


useEffect(()=>{
dispatch(getOrganization());
},[dispatch])


  return (
    
    <CRow>
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <CRow>
            <CCol xs={6} className="d-flex align-items-center">
              <h5>
                <strong>Time Zone</strong>
              </h5>
            </CCol>
          

          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow className="mb-3">
            <div className="select-wrapper">
              <TimezoneSelect
                value={selectedTimezone}
                onChange={handleTimezone}
              />
            </div>
          </CRow>

          <div className="text-right">
            <CButton
              component="input"
              type="button"
              color="primary"
              value="Save"
              onClick={saveSettings}
            />
            <CButton
              component="input"
              type="button"
              color="secondary"
              value="Cancel"
            />
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  )
}

export default Timezone