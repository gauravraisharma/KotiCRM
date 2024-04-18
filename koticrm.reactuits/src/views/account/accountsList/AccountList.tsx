
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MdEdit, MdEditSquare } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
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
import NewAccount from "../createAccount/NewAccount";
import EditPage from "./EditAccountModal";
import styled from "styled-components";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CInputGroup,
  CInputGroupText,
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

const AccountListWrapper = styled.div`
  padding: 20px;
`;

const SearchInput = styled.input`
  height: 50px;
`;

const NewButton = styled.button`
  width: 80px;
  padding: 10px;
  font-size: 17px;
`;

const AccountList: React.FC = () => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [accountId, setAccountId] = useState<number>();
  const [stateData, setStateData] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openCreateModal, setCreateModal] = useState<boolean>(false);
  const [accountData, setAccountData] = useState<Account | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const showItems = (id: any) => {
    navigate(`/accounts/accountDetails/${id}`);
  };

  const handleEditClick = (data: any) => {
    setAccountData(data);
    setOpenEditModal(true);
  };

  const closeEditModal = () => {
    setOpenEditModal(false);
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

  const handleCreateNew = () => {
    setStateData(true);
    setCreateModal(true);
  };

  const closeCreateModal = () => {
    setStateData(false);
  };

  const backToAccountList = () => {
    setCreateModal(false);
    setStateData(false);
    setOpenEditModal(false);
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

  function getOwnerName(ownerId: string): string {
    const owner = accountOwner?.find((owner: any) => owner.id === ownerId);
    return owner ? owner.label : "";
  }

  useEffect(() => {
    dispatch(getAccounts());
    dispatch(getAccountOwner());
    dispatch(getAccountStatus());
    dispatch(getAccountType());
    dispatch(getIndustry());
    dispatch(getNotes());
    dispatch(getContacts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch, refreshList, createresponse, updateResponse]);

  const filteredAccounts = searchTerm
    ? accounts.filter((account: Account) =>
        account.accountName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : accounts;

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
      {!openCreateModal && !openEditModal && (
        <CRow>
          <CCol xs={12}>
            <CRow className="align-items-center m-1">
              <CCol xs={4} className="text-start">
                <CInputGroup>
                  <CInputGroupText htmlFor="searchInput">
                    Search
                  </CInputGroupText>
                  <CFormInput
                    id="searchInput"
                    type="text"
                    placeholder="Search by account name..."
                  />
                </CInputGroup>
              </CCol>
              <CCol xs={8} className="text-end">
                <button
                  onClick={handleCreateNew}
                  type="button"
                  className="btn btn-primary"
                  style={{padding:'6px 16px'}}
                >
                  + New
                </button>
              </CCol>
            </CRow>
          </CCol>
        </CRow>
      )}
      {stateData ? (
        <NewAccount
          closeModal={closeCreateModal}
          onBackToListButtonClickHandler={backToAccountList}
        />
      ) : (
        <>
          <DeleteConfirmationModal
            isOpen={showDeleteConfirmation}
            onCancel={cancelDelete}
            onConfirm={confirmDelete}
            accountId={accountId}
            invoiceId={null}
          />
          {openEditModal ? (
            <EditPage
              closeModal={closeEditModal}
              accountData={accountData}
              onBackToListButtonClickHandler={backToAccountList}
            />
          ) : (
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
                          <CTableHeaderCell scope="col">
                            Country
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            Actions
                          </CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {filteredAccounts?.map((account: Account) => (
                          <CTableRow key={account.id}>
                            <CTableDataCell>
                              {account.accountName}
                            </CTableDataCell>
                            <CTableDataCell>
                              {getOwnerName(account.ownerId)}
                            </CTableDataCell>
                            <CTableDataCell>{account.phone}</CTableDataCell>
                            <CTableDataCell>{account.country}</CTableDataCell>
                            <CTableDataCell>
                              <MdEdit
                                style={{
                                  color: "green",
                                  marginRight: "10px",
                                  fontSize: "20px",
                                }}
                                onClick={() => handleEditClick(account)}
                                className="mr-4 text-success"
                              />

                              <AiFillEye
                                style={{
                                  color: "darkblue",
                                  marginRight: "10px",
                                  fontSize: "20px",
                                }}
                                className="mr-4 text-primary"
                                onClick={() => showItems(account?.id)}
                              />
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
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                    </CTable>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          )}
        </>
      )}
    </>
  );
};

export default AccountList;
