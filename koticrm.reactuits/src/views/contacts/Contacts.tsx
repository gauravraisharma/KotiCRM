import React, { useState, useEffect } from "react";
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
  CSpinner,
  CPaginationItem,
} from "@coreui/react";
import "../../css/style.css";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdEdit } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getContacts } from "../../redux-saga/modules/contact/action";
import { ContactWithAccountName } from "../../models/contact/ContactWithAccountName";
import DeleteConfirmationModal from "../account/accountsList/DeleteConfirmation";
import { ToastContainer } from "react-toastify";
import GetModulePermissions from "../../utils/Shared/GetModulePermissions";

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

  const contactsPermissions = GetModulePermissions('Contacts');


  const fetchedContactWithAccountNameListAndTotal = useSelector(
    (state: any) => state.contactReducer.contacts
  );
  const fetchedAccountOwner = useSelector(
    (state: any) => state.accountReducer.accountOwner
  );
  const isLoading = useSelector((state: any) => state.contactReducer.isLoading);

  const contactsCount = fetchedContactWithAccountNameListAndTotal.contactWithAccountNames?.length;

  // Pagination
  const pageSize = 10;
  const totalCount = fetchedContactWithAccountNameListAndTotal.contactsCount;
  const totalPages = Math.ceil(totalCount / pageSize);

  useEffect(() => {
    dispatch(getContacts(accountId, searchQuery, pageNumber, pageSize));
  }, [dispatch, accountId, pageNumber, pageSize]);

console.log(fetchedContactWithAccountNameListAndTotal)
  useEffect(() => {
    if (getContactsCount) {
      getContactsCount(contactsCount);
    } else return;
  });
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

  //Handle enter click to search account
  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      dispatch(getContacts(accountId, searchQuery, pageNumber, pageSize));
    }
  };
  //Focus out event to searchh
  const handleBlur = () => {
    dispatch(getContacts(accountId, searchQuery, pageNumber, pageSize));
  };

  return (
    <>
      {isLoading && (
        <div className="spinner-backdrop">
          <CSpinner
            size="sm"
            color="white"
            style={{
              width: "5rem",
              height: "5rem",
              borderWidth: "0.60rem",
              zIndex: "9999",
            }}
          />
        </div>
      )}
      <ToastContainer/>
      <CRow>
        <CCol xs={12}>
          <CRow className="align-items-center m-1">
            <CCol xs={4} className="text-start">
              <CInputGroup>
                <CInputGroupText as="label" htmlFor="searchInput">
                  Search
                </CInputGroupText>
                <CFormInput
                  id="searchInput"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name,email,mobile..."
                  onKeyDown={handleKeyDown}
                  onBlur={handleBlur}
                />
              </CInputGroup>
            </CCol>
            <CCol xs={8} className="text-end">
              {contactsPermissions.isAdd && <Link to={`/contacts/createContact`}>
                <CButton
                  component="input"
                  type="button"
                  style={{ padding: "6px 16px" }}
                  color="primary"
                  value="+ New"
                  variant="outline"
                />
              </Link>}
            </CCol>
          </CRow>
        </CCol>
      </CRow>
      <DeleteConfirmationModal
        isOpen={showDeleteConfirmation}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        contactId={contactId}
      />

      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4 mt-2">
            <CCardHeader>
              <CCol xs={6} className="d-flex align-items-center">
                <h5>
                  <strong>Contacts</strong>
                </h5>
              </CCol>
            </CCardHeader>
            <CCardBody>
              <CTable responsive striped hover>
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
                            {contactsPermissions.isEdit && <Link to={`/contacts/editContact/${contact?.id}`}>
                              <MdEdit
                                style={{
                                  color: "green",
                                  marginRight: "10px",
                                  fontSize: "20px",
                                }}
                                className="mr-4 text-success"
                              />
                            </Link>}
                            <Link to={`/contacts/${contact?.id}`}>
                              <AiFillEye
                                style={{
                                  color: "darkblue",
                                  marginRight: "10px",
                                  fontSize: "20px",
                                }}
                                className="mr-4 text-primary"
                              />
                            </Link>
                            {contactsPermissions.isDelete && <MdDelete
                              style={{
                                color: "red",
                                marginRight: "10px",
                                fontSize: "20px",
                                cursor: "pointer",
                              }}
                              className="text-danger"
                              onClick={() => handleDeleteClick(contact.id)}
                            />}
                          </CTableDataCell>
                        </CTableRow>
                      )
                    )
                  ) : (
                    <CTableRow>
                      <div>
                        <p>No contacts found.</p>
                      </div>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>

              <CPagination
                size="sm"
                align="end"
                aria-label="Page navigation example"
                className="m-auto"
              >
                <CPaginationItem
                  onClick={() => handlePageChange(pageNumber - 1)}
                  disabled={pageNumber === 1}
                  style={{
                    margin: "0 2px",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  <span aria-hidden="true">&laquo;</span>
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
                    }}
                  >
                    {index + 1}
                  </CPaginationItem>
                ))}
                <CPaginationItem
                  onClick={() => handlePageChange(pageNumber + 1)}
                  disabled={pageNumber === totalPages}
                  style={{
                    margin: "0 2px",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  <span aria-hidden="true">&raquo;</span>
                </CPaginationItem>
              </CPagination>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Contacts;
