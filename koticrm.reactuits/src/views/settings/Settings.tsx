import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
} from "@coreui/react";
import React, { useState } from "react";
import TimezoneSelect from "react-timezone-select";

import "../../css/style.css";



const Settings: React.FC = () => {

  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const handleTimezone = (selectedItem: any) => {
    setSelectedTimezone(selectedItem.value);
  };

  const saveSettings = () => {
    // dispatch(saveTimezone(selectedTimezone));
  };


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
  );
};

export default Settings;
