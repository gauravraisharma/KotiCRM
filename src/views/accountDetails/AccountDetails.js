import React from 'react'
import { CRow, CCol, CCard, CCardHeader, CButton } from '@coreui/react'
import { FaAngleLeft } from 'react-icons/fa6'
import { FaChevronRight } from 'react-icons/fa'
import '../../css/style.css'

const AccountDetails = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={6}>Account Name</CCol>
              <CCol xs={6}>
                <div className="text-end">
                  <CButton
                    style={{ margin: 4 }}
                    component="input"
                    type="button"
                    color="primary"
                    value="Send Email"
                  />
                  <CButton
                    style={{ margin: 4 }}
                    component="input"
                    type="button"
                    color="light"
                    value="Edit"
                  />
                  <CButton
                    style={{ margin: 4 }}
                    component="input"
                    type="button"
                    color="light"
                    value="..."
                  />
                  <FaAngleLeft />
                  <FaChevronRight />
                </div>
              </CCol>
            </CRow>
          </CCardHeader>
        </CCard>
      </CCol>
      <CCol>
        <CRow xs={12}>
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
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
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                Contacts
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="contact-tab"
                data-bs-toggle="tab"
                data-bs-target="#contact"
                type="button"
                role="tab"
                aria-controls="contact"
                aria-selected="false"
              >
                Notes 2
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="contact-tab"
                data-bs-toggle="tab"
                data-bs-target="#contact"
                type="button"
                role="tab"
                aria-controls="contact"
                aria-selected="false"
              >
                Attachments 5
              </button>
            </li>
          </ul>
        </CRow>

        <CRow>
          <CCol xs={6}>
            <div className="headings">Account information</div>
            <ul>
              <li>
                <span className="title">Account owner - </span>
                <span className="info">Gourav Rai</span>
              </li>
              <li>
                <span className="title">Account Site </span>
                <span className="info">-</span>
              </li>
              <li>
                <span className="title"> Account Number </span>

                <span className="info">0</span>
              </li>
              <li>
                <span className="title"> Account Type </span>

                <span className="info">Vendor</span>
              </li>
              <li>
                <span className="title"> Annual Revenue </span>

                <span className="info">$850,000,00</span>
              </li>
              <li>
                <span className="title"> Created By </span>

                <span className="info">Gourav rai</span>
              </li>
            </ul>
            <div className="headings">Address information</div>

            <ul>
              <li>
                <span className="title"> Billing street</span>
                <span className="info">228 Runamuck PI#2808</span>
              </li>

              <li>
                <span className="title">Billing City </span>
                <span className="info">Baltimore</span>
              </li>
              <li>
                <span className="title">Billing State </span>

                <span className="info">MD</span>
              </li>
              <li>
                <span className="title"> Billing Code </span>
                <span className="info">21224</span>
              </li>
              <li>
                <span className="title"> Billing Country </span>
                <span className="info">United States</span>
              </li>
            </ul>
            <div className="headings">Discription information</div>

            <ul>
              <li>
                <span className="title">Description</span>
                <span className="info">
                  King is a multinational electronics contract manufacturing company with its
                  headquarters in Baltimore,United States
                </span>
              </li>
            </ul>
          </CCol>
          <CCol xs={6}>
            <ul>
              <li>
                <span className="title"> Rating </span>
                <span className="info">-</span>
              </li>

              <li>
                <span className="title">Phone</span>
                <span className="info">555-555-5555</span>
              </li>
              <li>
                <span className="title"> Fax </span>
                <span className="info">-</span>
              </li>
              <li>
                <span className="title">Website </span>
                <span className="info">https://Kingmanufacturing.com</span>
              </li>
              <li>
                <span className="title">Ownership</span>
                <span className="info">Partnershil</span>
              </li>
              {/* <CButton
                style={{ margin: 4 }}
                component="input"
                type="button"
                color="secondary"
                value="Locate Map"
              /> */}
              <li>
                <span className="title">Employees</span>
                <span className="info">445</span>
              </li>
              <li>
                <span className="title"> SIC code </span>
                <span className="info">-</span>
              </li>
              <li>
                <span className="title">Modified By</span>
                <span className="info">Gourav Rai</span>
              </li>
            </ul>

            <ul>
              <li>
                <span className="title"> Shipping Street </span>
                <span className="info">-</span>
              </li>

              <li>
                <span className="title"> Shipping City </span>
                <span className="info">-</span>
              </li>
              <li>
                <span className="title">Shipping State </span>
                <span className="info">-</span>
              </li>
              <li>
                <span className="title">Shipping Code</span>
                <span className="info">-</span>
              </li>
              <li>
                <span className="title"> Shipping Country </span>
                <span className="info">-</span>
              </li>
            </ul>
          </CCol>
        </CRow>
      </CCol>
    </CRow>
  )
}

export default AccountDetails
