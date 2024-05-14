import React, { Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MdEdit } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getAccountOwner,
  getAccountStatus,
  getAccountType,
  getAccounts,
} from "../../../redux-saga/modules/account/action";
import { getIndustry } from "../../../redux-saga/modules/shared/action";
import { getNotes } from "../../../redux-saga/modules/notes/action";
import { getContacts } from "../../../redux-saga/modules/contact/action";
import DeleteConfirmationModal from "./DeleteConfirmation";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CPagination,
  CPaginationItem,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { Account } from "../../../models/account/Account";
import { ToastContainer } from "react-toastify";
import GetModulePermissions from "../../../utils/Shared/GetModulePermissions";

const AccountList: React.FC = () => {
  //use hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //State declaration
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [accountId, setAccountId] = useState<number>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const accountsPermissions = GetModulePermissions("Accounts");

  const showItems = (id: any) => {
    navigate(`/accountsList/accountDetails/${id}`);
  };

  const handleDeleteClick = (id: any) => {
    setAccountId(id);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  //Fetching data from store
  const accounts = useSelector((state: any) => state.accountReducer.accounts);
  console.log(accounts);
  const refreshList = useSelector(
    (state: any) => state.accountReducer.refreshList
  );
  const accountOwner = useSelector(
    (state: any) => state.accountReducer.accountOwner
  );
  const createresponse = useSelector(
    (state: any) => state.accountReducer.createAccountResponse
  );
  const updateResponse = useSelector(
    (state: any) => state.accountReducer.updateAccountResponse
  );
  const isLoading = useSelector((state: any) => state.accountReducer.isLoading);

  //Get owner name
  function getOwnerName(ownerId: string): string {
    const  owner = accountOwner?.find((owner: any) => owner.id === ownerId);
    return owner ? owner.label : "";
  }

  // Pagination
  const pageSize = 5;
  const totalCount = accounts.accountCount;
  const totalPages = Math.ceil(totalCount / pageSize);

  //Handle page change
  const handlePageChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
  };

  //Handle enter click to search account
  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      dispatch(getAccounts(searchTerm, pageNumber, pageSize));
    }
  };
  //Focus out event to searchh
  const handleBlur = () => {
    dispatch(getAccounts(searchTerm, pageNumber, pageSize));
  };
  //Effects
  useEffect(() => {
    dispatch(getAccounts(searchTerm, pageNumber, pageSize));
    dispatch(getAccountOwner());
    dispatch(getAccountStatus());
    dispatch(getAccountType());
    dispatch(getIndustry());
    dispatch(getNotes());
    dispatch(getContacts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAccounts(searchTerm, pageNumber, pageSize));
  }, [
    dispatch,
    refreshList,
    createresponse,
    updateResponse,
    pageNumber,
    pageSize,
  ]);

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
      <ToastContainer />
      <CRow>
        <CCol xs={12}>
          <CRow className="align-items-center m-1">
            <CCol xs={4} className="text-start">
              <CInputGroup>
                <CInputGroupText htmlFor="searchInput">Search</CInputGroupText>
                <CFormInput
                  id="searchInput"
                  type="text"
                  placeholder="Search by account name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={handleBlur}
                />
              </CInputGroup>
            </CCol>
            <CCol xs={8} className="text-end">
              {accountsPermissions.isAdd && (
                <Link to={`/accountsList/createAccount`}>
                  {/* <Link to = {`/accountsList/createAccount`}> */}
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ padding: "6px 16px" }}
                  >
                    + New
                  </button>
                </Link>
              )}
            </CCol>
          </CRow>
        </CCol>
      </CRow>
      <>
        <DeleteConfirmationModal
          isOpen={showDeleteConfirmation}
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
          accountId={accountId}
          invoiceId={null}
        />
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4 mt-2">
              <CCardHeader>
                <CRow>
                  <CCol xs={6} className="d-flex align-items-center">
                    <h5>
                      <strong>Accounts</strong>
                    </h5>
                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                <CTable responsive striped hover>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">
                        Account Name
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col">Owner</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {accounts.account?.map((account: Account) => (
                      <CTableRow key={account.id}>
                        <CTableDataCell>{account.accountName}</CTableDataCell>
                        <CTableDataCell>
                          {getOwnerName(account.ownerId)}
                        </CTableDataCell>
                        <CTableDataCell>{account.phone}</CTableDataCell>
                        <CTableDataCell>{account.country}</CTableDataCell>
                        <CTableDataCell>
                          {accountsPermissions.isEdit && (
                            <Link
                              to={`/accountsList/editAccount/${account.id}`}
                            >
                              {/* <Link to ={`/accountsList/editAccount/${account.id}`}> */}
                              <MdEdit
                                style={{
                                  color: "green",
                                  marginRight: "10px",
                                  fontSize: "20px",
                                }}
                                className="mr-4 text-success"
                              />
                            </Link>
                          )}
                          <AiFillEye
                            style={{
                              color: "darkblue",
                              marginRight: "10px",
                              fontSize: "20px",
                            }}
                            className="mr-4 text-primary"
                            onClick={() => showItems(account?.id)}
                          />
                          {accountsPermissions.isDelete && (
                            <MdDelete
                              style={{
                                color: "red",
                                marginRight: "10px",
                                fontSize: "20px",
                                cursor: "pointer",
                              }}
                              className="text-danger"
                              onClick={() => handleDeleteClick(account.id)}
                            />
                          )}
                        </CTableDataCell>
                      </CTableRow>
                    ))}
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
    </>
  );
};

export default AccountList;
