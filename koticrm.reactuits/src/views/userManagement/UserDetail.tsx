import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CButton,
  CCardBody,
} from "@coreui/react";
import { useNavigate, useParams } from "react-router-dom";

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
                    value="Back To Account"
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
                  Account Detail
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
                  Contacts
                  <strong>hello</strong>
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
                  Notes <strong>hii</strong>
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
                  Attachments
                  <strong>hllo</strong>
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="invoices-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#invoices"
                  type="button"
                  role="tab"
                  aria-controls="invoices"
                  aria-selected="false"
                >
                  Invoices <strong>hii</strong>
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
                  <h5>Account information</h5>
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
              <div
                className="tab-pane fade"
                id="attachments"
                role="tabpanel"
                aria-labelledby="attachments-tab"
              ></div>
              <div
                className="tab-pane fade"
                id="invoices"
                role="tabpanel"
                aria-labelledby="invoices-tab"
              >
                <CCol xs={12}></CCol>
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default userDetails;
