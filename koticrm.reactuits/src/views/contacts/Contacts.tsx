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
  CPagination,
  CInputGroup,
  CInputGroupText,
  CFormInput,
} from "@coreui/react";
import "../../css/style.css";
import { useDispatch, useSelector } from "react-redux";
import { MdEditSquare } from "react-icons/md";
import { useEffect ,useState} from "react";
import { AiFillEye } from "react-icons/ai";
// import { FaPlus } from "react-icons/fa"; 
import { Link } from "react-router-dom";
import { getContacts } from "../../redux-saga/modules/contact/action";
import { ToastContainer } from "react-toastify";
import { ContactWithAccountName } from "../../models/contact/ContactWithAccountName";

const tableHeader = [
  "Contact Name",
  "Account Name",
  "Email",
  "Mobile",
  "Contact Owner",
  "Actions",
];

interface Props {
  accountId: number;
}

const Contacts = ({ accountId }: Props) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1); // Added currentPage state
  // const totalPages = 10;
  const pageSize = 5;

  const refreshList = useSelector(
    (state: any) => state.contactReducer.refreshList
  );
  const fetchedContacts = useSelector(
    (state: any) => state.contactReducer.contacts
  );
  const fetchedAccountOwner = useSelector(
    (state: any) => state.accountReducer.accountOwner
  );

  let filteredContacts = fetchedContacts;
  if (accountId) {
    filteredContacts = fetchedContacts?.filter(
      (contact: any) => contact.accountID === accountId
    );
  }

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch, refreshList]);
  


   // Filter based on search term
   if (searchTerm) {
    filteredContacts = fetchedContacts.filter(
      (contact: any) =>
        contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.mobile.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  // Pagination

  const totalItems = filteredContacts.length;
  const totalPages = Math.ceil(totalItems / pageSize);
   const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
  const paginatedContacts = filteredContacts.slice(startIndex, endIndex + 1);

  function getAccountOwnerName(ownerId: string): string {
    const owner = fetchedAccountOwner?.find(
      (owner: any) => owner.id === ownerId
    );
    return owner ? owner.label : "";
  }

  return (
    <>
      <ToastContainer />
      <div className="head" style={{ padding: "20px" }}>
        <CRow>
          <CCol xs={6}>
            <CInputGroup className="mb-3">
              <CInputGroupText as="label" htmlFor="searchInput">
                Search
              </CInputGroupText>
              <CFormInput
                id="searchInput"
                type="text"
                style={{height:'50px'}}
                value={searchTerm}
                 onChange={(e)=>setSearchTerm(e.target.value)}
                placeholder="Search by..."
              />
            </CInputGroup>
          </CCol>
          <CCol xs={6} className="text-end">
            {
              <Link to={`/contacts/createContact`}>
                <CButton
                  component="input"
                  type="button"
                  style={{width:'100px',padding:'10px',fontSize:'18px'}}
                   color="primary"
                   value="+ New"
                variant="outline"
                />
                  {/* <FaPlus style={{ marginRight: '5px' }} /> New */}

              </Link>
            }
          </CCol>
        </CRow>
      </div>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <CRow>
                <CCol xs={6} className="d-flex align-items-center">
                  <h5>
                    <strong>Contacts</strong>
                  </h5>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    {tableHeader.map((header, index) => (
                      <CTableHeaderCell key={index} scope="col">
                        {header}
                      </CTableHeaderCell>
                    ))}
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {paginatedContacts.length>0 ? (
                    paginatedContacts?.map(
                      (contact: ContactWithAccountName, index: number) => (
                        <CTableRow key={index}>
                          <CTableDataCell>{`${contact?.firstName} ${contact?.lastName}`}</CTableDataCell>
                          <CTableDataCell>{contact.accountName}</CTableDataCell>
                          <CTableDataCell>{contact?.email}</CTableDataCell>
                          <CTableDataCell>{contact?.mobile}</CTableDataCell>
                          <CTableDataCell>
                            {getAccountOwnerName(contact?.ownerId)}
                          </CTableDataCell>
                          <CTableDataCell>
                            <Link to={`/contacts/editContact/${contact?.id}`}>
                              <MdEditSquare
                                style={{
                                  color: "green",
                                  marginRight: "10px",
                                  fontSize: "20px",
                                }}
                              />
                            </Link>
                            <Link to={`/contacts/${contact?.id}`}>
                              <AiFillEye
                                style={{
                                  color: "darkblue",
                                  marginRight: "10px",
                                  fontSize: "20px",
                                }}
                              />
                            </Link>
                          </CTableDataCell>
                        </CTableRow>
                      )
                    )
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan={tableHeader.length}>
                        No contact available
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
          <CCol xs={12}>
            <CPagination
              align="center"
              aria-label="Page navigation example">
              doubleArrows={false}
              pages={totalPages}
              activePage={currentPage}
              onActivePageChange={(page: number) => setCurrentPage(page)}
            </CPagination>
          </CCol>
        </CCol>
      </CRow>
    </>
  );
};

export default Contacts;
