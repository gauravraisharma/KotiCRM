import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CForm,
  CFormTextarea,
} from '@coreui/react'
import { BsFiletypeDocx } from 'react-icons/bs'
import { IoPersonCircleOutline } from 'react-icons/io5'
import { MdOutlinePictureAsPdf } from 'react-icons/md'
import { TiAttachmentOutline } from 'react-icons/ti'
import '../../css/style.css'

const Contacts = () => {
  return (
    <CRow>
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

      <div>
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
              {/* <DocsExample href="components/table"> */}
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
              {/* </DocsExample> */}
            </CCardBody>
          </CCard>
        </CCol>
      </div>

      <div>
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
              <CCol xs={8}>
                <div className="Note">
                  <ul>
                    <li>
                      <span>
                        <IoPersonCircleOutline />
                      </span>
                      <span>dsadsadsa</span>
                      <br></br>
                      <span>Account -</span>
                      <span>King (Sample)</span>.<span>Add Note</span>
                    </li>
                    <li>
                      <span>
                        <IoPersonCircleOutline />
                      </span>
                      <span>dsadsadsa</span>
                      <br></br>
                      <span>Account -</span>
                      <span>King (Sample)</span>.<span>Add Note</span>
                    </li>
                    <li>
                      <span>
                        <IoPersonCircleOutline />
                      </span>
                      <span>dsadsadsa</span>
                      <br></br>
                      <span>Account -</span>
                      <span>King (Sample)</span>.<span>Add Note</span>
                    </li>
                    <li>
                      <CForm>
                        <CFormTextarea
                          label="Example textarea"
                          rows={3}
                          placeholder="Add a note"
                        ></CFormTextarea>

                        <div className="text-end ">
                          <TiAttachmentOutline />

                          <CButton component="input" type="button" color="light" value="Cancel" />
                          <CButton component="input" type="button" color="primary" value="Save" />
                        </div>
                      </CForm>
                    </li>
                  </ul>
                </div>
              </CCol>
            </CCardBody>
          </CCard>
        </CCol>
      </div>
    </CRow>
  )
}

export default Contacts
