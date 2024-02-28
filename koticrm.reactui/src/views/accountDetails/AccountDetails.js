import React from 'react'
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CButton,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CDropdownMenu,
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CForm,
  CFormTextarea,
} from '@coreui/react'
import { BsFiletypeDocx } from 'react-icons/bs'
import { FaAngleLeft } from 'react-icons/fa6'
import { FaChevronRight } from 'react-icons/fa'
import { IoPersonCircleOutline } from 'react-icons/io5'
import { MdOutlinePictureAsPdf } from 'react-icons/md'
import { TiAttachmentOutline } from 'react-icons/ti'
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
                Notes 2
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
                Attachments 5
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
                Invoices
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
                <CCol className="right" xs={6}>
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
                    <CButton
                      style={{ margin: 4 }}
                      component="input"
                      type="button"
                      color="secondary"
                      value="Locate Map"
                    />
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
            </div>
            <div
              className="tab-pane fade"
              id="contacts"
              role="tabpanel"
              aria-labelledby="contacts-tab"
            >
              <CCol xs={12}>
                <CCard className="mb-4">
                  <CCardHeader>
                    <CRow>
                      <CCol xs={6}>Contacts</CCol>
                      <CCol xs={6}>
                        <div className="text-end">
                          <CButton
                            component="input"
                            type="button"
                            color="primary"
                            value="New"
                            variant="outline"
                          />
                        </div>
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    {/* <DocsExample href="components/table"> */}
                    <CTable>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell scope="col">Contact Name</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Mobile</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Fax</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        <CTableRow>
                          <CTableHeaderCell>Sakshi Gupta</CTableHeaderCell>
                          <CTableDataCell>@sakshigupta.com</CTableDataCell>
                          <CTableDataCell>3456788765</CTableDataCell>
                          <CTableDataCell>9988335677</CTableDataCell>
                          <CTableDataCell>--</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableHeaderCell>Rakesh Choudhary</CTableHeaderCell>
                          <CTableDataCell>@rakesh.com</CTableDataCell>
                          <CTableDataCell>8634567678</CTableDataCell>
                          <CTableDataCell>9944466622</CTableDataCell>
                          <CTableDataCell>--</CTableDataCell>
                        </CTableRow>
                      </CTableBody>
                    </CTable>
                    {/* </DocsExample> */}
                  </CCardBody>
                </CCard>
              </CCol>
            </div>
            <div className="tab-pane fade" id="notes" role="tabpanel" aria-labelledby="notes-tab">
              <CCol xs={12}>
                <CCard className="mb-4">
                  <CCardHeader>
                    <CRow>
                      <CCol xs={6}>Notes</CCol>
                      <CCol xs={6}>
                        <div className="text-end">
                          <CDropdown>
                            <CDropdownToggle color="primary" variant="outline">
                              Recent Last
                            </CDropdownToggle>
                            <CDropdownMenu>
                              <CDropdownItem href="#">Name</CDropdownItem>
                              <CDropdownItem href="#">Owner</CDropdownItem>
                              <CDropdownItem href="#">Phone</CDropdownItem>
                              <CDropdownItem href="#">Country</CDropdownItem>
                            </CDropdownMenu>
                          </CDropdown>
                        </div>
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    <CRow>
                      <CCol xs={8}>
                        <ul>
                          <li>
                            <span className="person">
                              <IoPersonCircleOutline />
                            </span>
                            <span className="content">dsadsadsa</span>
                            <br></br>
                            <span>Account -</span>
                            <span className="linking">King (Sample)</span>.<span>Add Note</span>
                          </li>
                          <li>
                            <span className="person">
                              <IoPersonCircleOutline />
                            </span>
                            <span className="content">dsadsadsa</span>
                            <br></br>
                            <span>Account -</span>
                            <span className="linking">King (Sample)</span>.<span>Add Note</span>
                          </li>
                          <li>
                            <span className="person">
                              <IoPersonCircleOutline />
                            </span>
                            <span className="content">dsadsadsa</span>
                            <br></br>
                            <span>Account -</span>
                            <span className="linking">King (Sample)</span>.<span>Add Note</span>
                          </li>

                          <CRow>
                            <CForm>
                              <CFormTextarea
                                className="textarea"
                                rows={3}
                                placeholder="Add a note"
                              ></CFormTextarea>

                              <div className="text-end ">
                                <TiAttachmentOutline />

                                <CButton
                                  style={{ margin: '5px' }}
                                  component="input"
                                  type="button"
                                  color="light"
                                  value="Cancel"
                                />
                                <CButton
                                  style={{ margin: '5px' }}
                                  component="input"
                                  type="button"
                                  color="primary"
                                  value="Save"
                                />
                              </div>
                            </CForm>
                          </CRow>
                        </ul>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
            </div>
            <div
              className="tab-pane fade"
              id="attachments"
              role="tabpanel"
              aria-labelledby="attachments-tab"
            >
              <CCol xs={12}>
                <CCard className="mb-4">
                  <CCardHeader>
                    <CRow>
                      <CCol xs={6}>Attachments</CCol>
                      <CCol xs={6}>
                        <div className="text-end">
                          <CDropdown>
                            <CDropdownToggle color="primary" variant="outline">
                              Attach
                            </CDropdownToggle>
                            <CDropdownMenu>
                              <CDropdownItem href="#">Name</CDropdownItem>
                              <CDropdownItem href="#">Owner</CDropdownItem>
                              <CDropdownItem href="#">Phone</CDropdownItem>
                              <CDropdownItem href="#">Country</CDropdownItem>
                            </CDropdownMenu>
                          </CDropdown>
                        </div>
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    <CTable>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell scope="col">File Name</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Attached By</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Date Added</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Size</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        <CTableRow>
                          <CTableHeaderCell>
                            <BsFiletypeDocx className="doc" />
                            <CButton className="link" color="link">
                              Learner Settings Page-February 2024.docx
                            </CButton>
                          </CTableHeaderCell>
                          <CTableDataCell>Gourav Rai</CTableDataCell>
                          <CTableDataCell>22/02/2024 06:50PM</CTableDataCell>
                          <CTableDataCell>38kb</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableHeaderCell>
                            <MdOutlinePictureAsPdf className="pdf" />
                            <CButton className="link" color="link">
                              Learner Settings Page-February 2024.pdf
                            </CButton>
                          </CTableHeaderCell>
                          <CTableDataCell>Gourav Rai</CTableDataCell>
                          <CTableDataCell>22/02/2024 06:50PM</CTableDataCell>
                          <CTableDataCell>35kb</CTableDataCell>
                        </CTableRow>
                      </CTableBody>
                    </CTable>
                  </CCardBody>
                </CCard>
              </CCol>
            </div>
            <div
              className="tab-pane fade"
              id="invoices"
              role="tabpanel"
              aria-labelledby="invoices-tab"
            >
              <CCol xs={12}>
                <CCard className="mb-4">
                  <CCardHeader>
                    <CRow>
                      <CCol xs={6}>Invoices</CCol>
                      <CCol xs={6}>
                        <div className="text-end">
                          <CButton
                            component="input"
                            type="button"
                            color="primary"
                            value="New"
                            variant="outline"
                          />
                        </div>
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    <CTable>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell scope="col">Subject</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Invoice Date</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Due Date</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        <CTableRow>
                          <CTableHeaderCell>Feb Month</CTableHeaderCell>
                          <CTableDataCell>Created</CTableDataCell>
                          <CTableDataCell>27/02/2024</CTableDataCell>
                          <CTableDataCell>29/02/2024</CTableDataCell>
                        </CTableRow>
                      </CTableBody>
                    </CTable>
                  </CCardBody>
                </CCard>
              </CCol>
            </div>
          </div>
        </CRow>
      </CCol>
    </CRow>
  )
}

export default AccountDetails
