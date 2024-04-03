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
  CPaginationItem,
  CInputGroup,
  CInputGroupText,
  CFormSelect,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MdEditSquare } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Account } from "../../../models/account/Account";
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

const AccountList: React.FC = () => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [accountId, setAccountId] = useState<number>();
  const [stateData, setStateData] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
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
  };

  const closeCreateModal = () => {
    setStateData(false);
  };

  const backToAccountList = () => {
    setStateData(false);
    setOpenEditModal(false);
  };
  //Fetching data from store
  const accounts = useSelector((state: any) => state.accountReducer.accounts);
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
      <ToastContainer />
      <div className="head"style={{padding:'20px'}}>
                <CRow>
                  <CCol xs={6}>
                    <CInputGroup className="mb-3">
                      <CInputGroupText as="label" htmlFor="searchInput">
                        Search
                      </CInputGroupText>
                      <input
                        type="text"
                        placeholder="Search by account name..."
                        style={{ height: "50px" }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="form-control"
                      />
                    </CInputGroup>
                  </CCol>

                  <CCol xs={6}>
                    <div className="text-end">
                      <CButton
                        style={{
                          width: "100px",
                          padding: "10px",
                          fontSize: "18px",
                        }}
                        component="input"
                        type="button"
                        color="primary"
                        value="+ New"
                        onClick={handleCreateNew}
                      />
                    </div>
                  </CCol>
                </CRow>
              </div>
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
                <CCard className="mb-4">
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
                    <CTable>
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
                              <MdEditSquare
                                style={{
                                  color: "green",
                                  marginRight: "10px",
                                  fontSize: "20px",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleEditClick(account)}
                              />
                              <AiFillEye
                                style={{
                                  color: "darkblue",
                                  marginRight: "10px",
                                  fontSize: "20px",
                                  cursor: "pointer",
                                }}
                                onClick={() => showItems(account?.id)}
                              />
                              <MdDelete
                                style={{
                                  color: "red",
                                  marginRight: "10px",
                                  fontSize: "20px",
                                  cursor: "pointer",
                                }}
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
