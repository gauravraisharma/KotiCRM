import { FC, useState } from 'react'
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
} from '@coreui/react'

import NewAccount from '../account/NewAccount';
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'

interface Props { }

const AccountList: FC<Props> = () => {
  // const navigate = useNavigate();
  const [state, setState] = useState(false)

  const handleCreateNew = () => {
    alert('hello')
    // navigate('/NewAccount');
    setState(true);
  }

  const backToAccountList = () => {
    alert('account')
    setState(false);
  }

  return (
    <>
      {state ? <NewAccount backToAccountList={backToAccountList} /> :
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Accounts</strong> <small>List</small>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol xs={6}>
                    <div className="input-group">
                      <CDropdown>
                        <CDropdownToggle style={{ marginRight: 6 }} color="light">
                          Select
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem href="#">Name</CDropdownItem>
                          <CDropdownItem href="#">Owner</CDropdownItem>
                          <CDropdownItem href="#">Phone</CDropdownItem>
                          <CDropdownItem href="#">Country</CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search for..."
                        aria-label="Search for..."
                      />
                    </div>
                    <br></br>
                  </CCol>
                  <CCol xs={6}>
                    <div className="text-end">
                      <CButton
                        component="input"
                        type="button"
                        color="primary"
                        value="Create New Account"
                        onClick={handleCreateNew}
                      />
                    </div>
                  </CCol>
                </CRow>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Owner</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    <CTableRow>
                      <CTableHeaderCell scope="row">1</CTableHeaderCell>
                      <CTableDataCell>Akash</CTableDataCell>
                      <CTableDataCell>Akash khattra</CTableDataCell>
                      <CTableDataCell>@9988546234</CTableDataCell>

                      <CTableDataCell>
                        {/* <FaEdit style={{ color: 'green' }} /> <LuView style={{ color: 'blue' }} />{' '} */}
                        <CIcon icon={cilPencil} size="sm" />
                        {/* <MdDelete style={{ color: 'red' }} />{' '} */}
                        <CIcon icon={cilTrash} size="sm" />
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell scope="row">2</CTableHeaderCell>
                      <CTableDataCell>Jacob</CTableDataCell>
                      <CTableDataCell>Thornton</CTableDataCell>
                      <CTableDataCell>9944466622</CTableDataCell>
                      <CTableDataCell>
                        {/* <FaEdit style={{ color: 'green' }} /> <LuView style={{ color: 'blue' }} />{' '} */}
                        <CIcon icon={cilPencil} size="sm" />
                        {/* <MdDelete style={{ color: 'red' }} />{' '} */}
                        <CIcon icon={cilTrash} size="sm" />
                      </CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      }
    </>
  )
}

export default AccountList