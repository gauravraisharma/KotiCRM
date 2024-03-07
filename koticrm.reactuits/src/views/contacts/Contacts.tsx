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
  CLink,
} from '@coreui/react'
import '../../css/style.css'
import { useDispatch, useSelector } from 'react-redux'
import { getContacts } from '../../redux-saga/action'
import { useEffect } from 'react'
import { Contact } from '../../models/contact/Contact'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilFace, cilHamburgerMenu, cilPen } from '@coreui/icons'

const tableHeader = [
  "Contact Name",
  "Account Name",
  "Email",
  "Phone",
  "Contact Owner",
  "Actions",
]

const Contacts = () => {
  // const [contacts, setContacts] = useState([]);
  const dispatch = useDispatch();
  const fetchedContacts = useSelector((state: any) => state.reducer.contacts);

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  console.log("Contact on component:");
  console.log(fetchedContacts);

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={6}><h1>Contacts</h1></CCol>
              <CCol xs={6} className='text-end'>
                  <Link to={`/contacts/createContact`}>
                  <CButton
                    component="input"
                    type="button"
                    color="primary"
                    value="New"
                    variant="outline"
                  />
                  </Link>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            {/* <DocsExample href="components/table"> */}
            <CTable>
              <CTableHead>
                <CTableRow>
                  {tableHeader.map((header, index)=>(
                    <CTableHeaderCell key={index} scope='col'>
                      {header} <span><CIcon icon={cilHamburgerMenu} title='hamburger' className='me-1' size='lg' /></span>
                      </CTableHeaderCell>
                  ))}
                  {/* <CTableHeaderCell scope="col">Contact Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Account Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Contact Owner</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Actions</CTableHeaderCell> */}
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {fetchedContacts ? fetchedContacts?.map((contact: Contact, index: number) => (
                  <CTableRow key={index}>
                    {/* <CTableDataCell>
                      <Link to="/contacts/contactDetails">
                        <CLink>
                          {contact.firstName}
                        </CLink>
                      </Link>
                    </CTableDataCell> */}
                    <CTableDataCell>{`${contact.firstName} ${contact.lastName}`}</CTableDataCell>
                    <CTableDataCell>{contact.accountID}</CTableDataCell>
                    <CTableDataCell>{contact.email}</CTableDataCell>
                    <CTableDataCell>{contact.phone}</CTableDataCell>
                    <CTableDataCell>{contact.ownerId}</CTableDataCell>
                    <CTableDataCell>
                      <Link to={`/contacts/editContact/${contact.id}`}>
                        <CIcon icon={cilPen} size='lg' title='Edit' className='mx-1' />
                      </Link>
                      {/* <CIcon icon={cilPen} size='lg' title='Edit' onClick={() => handleEditClick(contact)/> */}
                      <Link to={`/contacts/${contact.id}`}>
                        <CIcon icon={cilFace} size='lg' title='View' className='mx-1' />
                      </Link>
                      {/* <LuView style={{ color: 'blue' }}
                            onClick={()=>showItems(account?.id)}></LuView> */}
                      {/* <MdDelete style={{ color: "red" }} onClick={()=>handleDeleteClick(account.id)} /> */}
                    </CTableDataCell>
                  </CTableRow>
                )) : <div>No contact available</div>}
                {/* <CTableRow>
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
                </CTableRow> */}
              </CTableBody>
            </CTable>
            {/* </DocsExample> */}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Contacts