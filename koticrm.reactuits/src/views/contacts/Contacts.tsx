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
  CPaginationItem,
} from "@coreui/react";
import "../../css/style.css";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
// import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getContacts } from "../../redux-saga/modules/contact/action";
import { ToastContainer } from "react-toastify";
import { ContactWithAccountName } from "../../models/contact/ContactWithAccountName";
import DeleteConfirmationModal from "../account/accountsList/DeleteConfirmation";

const tableHeader = [
  "Contact Name",
  "Account Name",
  "Email",
  "Mobile",
  "Contact Owner",
  "Actions",
];

interface Props {
  getContactsCount?: (data: number) => void;
  accountId?: number;
}

const Contacts = ({ getContactsCount, accountId }: Props) => {
  const dispatch = useDispatch();
  const [contactId, setContactId] = useState<number>(0);
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);

  const fetchedContactWithAccountNameListAndTotal = useSelector(
    (state: any) => state.contactReducer.contacts
  );
  const fetchedAccountOwner = useSelector(
    (state: any) => state.accountReducer.accountOwner
  );

  const contactsCount = fetchedContactWithAccountNameListAndTotal.contactsCount;

  // Pagination
  const pageSize = 5;
  const totalCount = fetchedContactWithAccountNameListAndTotal.contactsCount;
  const totalPages = Math.ceil(totalCount / pageSize);

  useEffect(() => {
    dispatch(getContacts(accountId, searchQuery, pageNumber, pageSize));
  }, [dispatch, accountId, searchQuery, pageNumber, pageSize]);

  useEffect(() => {
    if (getContactsCount) {
      getContactsCount(contactsCount);
    }
  });

  // // Filter based on search term
  // let filteredContacts = fetchedContactWithAccountNameListAndTotal;
  // if (searchTerm) {
  //   filteredContacts = fetchedContactWithAccountNameListAndTotal.filter(
  //     (contact: any) =>
  //       contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       contact.mobile.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  // }

  const handlePageChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
  };

  function getAccountOwnerName(ownerId: string): string {
    const owner = fetchedAccountOwner?.find(
      (owner: any) => owner.id === ownerId
    );
    return owner ? owner.label : "";
  }

  const handleDeleteClick = (id: number) => {
    setContactId(id);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <>
      <ToastContainer />
      <div className="head" style={{ padding: "20px" }}>
        <CRow>
          <CCol xs={6}>
            <CInputGroup>
              <CInputGroupText as="label" htmlFor="searchInput">
                Search
              </CInputGroupText>
              <CFormInput
                id="searchInput"
                type="text"
                style={{ height: "50px" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name,email,mobile..."
              />
            </CInputGroup>
          </CCol>
          <CCol xs={6} className="text-end">
            {
              <Link to={`/contacts/createContact`}>
                <CButton
                  component="input"
                  type="button"
                  style={{ width: "100px", padding: "10px", fontSize: "18px" }}
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
      <DeleteConfirmationModal
        isOpen={showDeleteConfirmation}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        contactId={contactId}
      />
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
                  {fetchedContactWithAccountNameListAndTotal
                    .contactWithAccountNames.length > 0 ? (
                    fetchedContactWithAccountNameListAndTotal.contactWithAccountNames?.map(
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
                            <MdDelete
                              style={{
                                color: "red",
                                marginRight: "10px",
                                fontSize: "20px",
                                cursor: "pointer",
                              }}
                              onClick={() => handleDeleteClick(contact.id)}
                            />
                          </CTableDataCell>
                        </CTableRow>
                      )
                    )
                  ) : (
                    <CTableRow>
                      {/* <CTableDataCell colSpan={tableHeader.length}> */}
                      <div>
                        <p>No contacts found.</p>
                      </div>
                      {/* </CTableDataCell> */}
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
          <CCol xs={12}>
            <CPagination
              size="sm" // Change the size to "sm" (small)
              align="end"
              aria-label="Page navigation example"
              style={{
                backgroundColor: "lightgray",
                padding: "5px",
                borderRadius: "5px",
                height: "40px",
              }} // Decrease padding
            >
              <CPaginationItem
                onClick={() => handlePageChange(pageNumber - 1)}
                disabled={pageNumber === 1}
                style={{ marginRight: "5px", fontSize: "12px" }} // Decrease font size
              >
                Previous
              </CPaginationItem>
              {Array.from({ length: totalPages }, (_, index) => (
                <CPaginationItem
                  key={index}
                  active={pageNumber === index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  style={{
                    margin: "0 2px",
                    cursor: "pointer",
                    fontSize: "12px",
                  }} // Decrease font size
                >
                  {index + 1}
                </CPaginationItem>
              ))}
              <CPaginationItem
                onClick={() => handlePageChange(pageNumber + 1)}
                disabled={pageNumber === totalPages}
                style={{ marginLeft: "5px", fontSize: "12px" }} // Decrease font size
              >
                Next
              </CPaginationItem>
            </CPagination>
          </CCol>
        </CCol>
      </CRow>
    </>
  );
};

export default Contacts;
