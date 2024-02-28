import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
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

import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { LuView } from 'react-icons/lu'

const AccountList = () => {
  // Sample data for accounts
  //   const [accounts, setAccounts] = useState([
  //     { id: 1, name: 'Account 1', owner: 'Owner 1', phone: '123-456-7890', country: 'USA' },
  //     { id: 2, name: 'Account 2', owner: 'Owner 2', phone: '234-567-8901', country: 'Canada' },
  // Add more sample accounts as needed
  //   ]);

  //   const [searchField, setSearchField] = useState('');
  //   const [searchBy, setSearchBy] = useState('Name');

  //   const handleChange = (event) => {
  //     setSearchField(event.target.value);
  // };
  // const handleSearchByChange = (event) => {
  //     setSearchBy(event.target.value);
  // };

  // const filteredAccounts = accounts.filter(account => {
  //     if (searchBy === 'Name') {
  //         return account.name.toLowerCase().includes(searchField.toLowerCase());
  //     } else if (searchBy === 'Owner') {
  //         return account.owner.toLowerCase().includes(searchField.toLowerCase());
  //     } else if (searchBy === 'Phone') {
  //         return account.phone.includes(searchField);
  //     } else if (searchBy === 'Country') {
  //         return account.country.toLowerCase().includes(searchField.toLowerCase());
  //     }
  //     return true;
  // });

  return (
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
                  />
                </div>
              </CCol>
            </CRow>

            {/* <DocsExample href="components/table"> */}
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
                    <FaEdit style={{ color: 'green' }} /> <LuView style={{ color: 'blue' }} />{' '}
                    <MdDelete style={{ color: 'red' }} />{' '}
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row">2</CTableHeaderCell>
                  <CTableDataCell>Jacob</CTableDataCell>
                  <CTableDataCell>Thornton</CTableDataCell>
                  <CTableDataCell>9944466622</CTableDataCell>
                  <CTableDataCell>
                    <FaEdit style={{ color: 'green' }} /> <LuView style={{ color: 'blue' }} />{' '}
                    <MdDelete style={{ color: 'red' }} />{' '}
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
            {/* </DocsExample> */}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AccountList
