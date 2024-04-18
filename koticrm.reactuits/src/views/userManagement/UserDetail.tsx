import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CButton,
  CCardBody,
} from "@coreui/react";
import { useNavigate} from "react-router-dom";

const userDetails = () => {
  const navigate = useNavigate();

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={6} className="d-flex align-items-center">
                <h5>
                  <strong>User Detail</strong>
                </h5>
              </CCol>
              <CCol xs={6}>
                <div className="text-end">
                  <CButton
                    component="input"
                    type="button"
                    color="secondary"
                    value="Back To users"
                    onClick={() => navigate("/users")}
                  />
                </div>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home"
                  type="button"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  User Detail
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="contacts-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#contacts"
                  type="button"
                  role="tab"
                  aria-controls="contacts"
                  aria-selected="false"
                >
                  User Contacts
              
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="notes-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#notes"
                  type="button"
                  role="tab"
                  aria-controls="notes"
                  aria-selected="false"
                >
                 User Notes
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="attachments-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#attachments"
                  type="button"
                  role="tab"
                  aria-controls="attachments"
                  aria-selected="false"
                >
                  User Attachments
               
                </button>
              </li>
           
            </ul>
            <div className="tab-content" id="accountdetail">
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div className="headings">
                  <h5>User information</h5>
                </div>
                <ul className="account-list">
                  <CRow></CRow>
                </ul>
              </div>
              <div
                className="tab-pane fade"
                id="contacts"
                role="tabpanel"
                aria-labelledby="contacts-tab"
              ></div>
              <div
                className="tab-pane fade"
                id="notes"
                role="tabpanel"
                aria-labelledby="notes-tab"
              >
                <CCol xs={12}>
                  <CCard className="mb-4">
                    <CCardHeader className="mb-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h5 className="mb-0">Notes</h5>
                        </div>
                      </div>
                    </CCardHeader>
                  </CCard>
                </CCol>
              </div>
           
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default userDetails;
