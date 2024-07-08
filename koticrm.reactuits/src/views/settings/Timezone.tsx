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
import "../../css/style.css";


import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { getOrganization, updateTimeZone } from '../../redux-saga/modules/shared/action';
import moment from 'moment';
import 'moment-timezone';
import Select from 'react-select'



const Timezone: React.FC = () => {
  const dispatch = useDispatch();
  //Fetch data from redux
  const timeZone = useSelector((state: any) => state.sharedReducer.timezone);

  const organization = useSelector((state: any) => state.sharedReducer.organization);

  // const [selectedTimezone, setSelectedTimezone] = useState(
  //   Intl.DateTimeFormat().resolvedOptions().timeZone
  // );


  const [timezone, setTimezone] = useState({ value: timeZone , label:  `(GMT ${moment.tz(timeZone).format('Z')}) ${timeZone} `})

  const handleTimezone = (selectedItem: any) => {
      setTimezone(selectedItem.value)
  }

  //All timezones
  const allTimeZones = moment.tz.names().map(timezone => ({
    value: timezone,
    label: `(GMT ${moment.tz(timezone).format('Z')}) ${timezone} `
  }));


  var orgDetails: OrganizationModel | undefined;

  if (organization) {
    const activeOrg = organization.filter((org: any) => org.organizationResponse?.isActive === true);
    if (activeOrg && activeOrg.length > 0) {
      orgDetails = activeOrg[0]?.organizationResponse;
    }
  }
  const saveSettings = () => {
    if (orgDetails) {
      const organizationDetail: OrganizationModel = {
        id: orgDetails.id,
        orgName: orgDetails.orgName,
        isActive: orgDetails.isActive,
        timeZone: timezone,
        shifts: orgDetails.shifts,
        includeLogofToIdle: orgDetails.includeLogofToIdle,
        currency: orgDetails.currency,
        billingStreet: orgDetails.billingStreet,
        billingCity: orgDetails.billingCity,
        billingState: orgDetails.billingState,
        zipCode: orgDetails.zipCode,
        billingCountry: orgDetails.billingCountry
      };
      dispatch(updateTimeZone(orgDetails.id, organizationDetail))
    } else {
      console.error("orgDetails is undefined");
    }
  };
  useEffect(() => {
    dispatch(getOrganization());
  }, [dispatch])

  return (
    <>
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
                  {/* <TimezoneSelect
                    value={selectedTimezone}
                    onChange={handleTimezone}
                  /> */}
                    <Select 
                    defaultValue= {timezone}
                    onChange={handleTimezone}
                    options={allTimeZones} 
                    isClearable
                    isSearchable
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
    </>
  )
}

export default Timezone