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

// interface TimeZoneOption {
//   label: string;
//   value: string;
// }

// const timeZones: TimeZoneOption[] = [
//   { label: "UTC", value: "UTC" },
//   { label: "America/New_York", value: "America/New_York" },
//   { label: "America/Los_Angeles", value: "America/Los_Angeles" },
//   // Add more timezones as needed
// ];

const Settings: React.FC = () => {
  // const [selectedTimeZoneUser, setSelectedTimeZoneUser] =
  //   useState<string>("UTC");

  // const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedTimeZoneUser(event.target.value);
  // };
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const handleTimezone = (selectedItem: any) => {
    setSelectedTimezone(selectedItem.value);
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

              {/* <div className="time">
                  <label htmlFor="timezone">Select Timezone:</label>
                  <select
                    id="timezone"
                    value={selectedTimeZoneUser}
                    onChange={handleChange}
                  >
                    {timeZones.map((tz) => (
                      <option key={tz.value} value={tz.value}>
                        {tz.label}
                      </option>
                    ))}
                  </select>
              </div> */}
            </CRow>

            <div className="text-right">
              <CButton
                component="input"
                type="button"
                color="primary"
                value="Save"
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
