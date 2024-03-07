import React, { useEffect, useState } from 'react';
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
} from '@coreui/react';
import { useDispatch } from 'react-redux';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { LuView } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import NewAccount from '../account/NewAccount';
import { Account } from '../../models/account/Account';
import { useSelector } from 'react-redux';
import DeleteConfirmationModal from "./DeleteConfirmation";
import { ToastContainer } from 'react-toastify';
import EditPage from './EditAccountModal';
import { getAccountOwner, getAccountStatus, getAccountType, getAccounts, getIndustry, getNotes } from "../../redux-saga/action";




const AccountList: React.FC = () => {


    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [accountId, setAccountId] = useState<number>();
    const [stateData, setStateData] = useState<boolean>(false);
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const [accountData, setAccountData] = useState<Account | null>(null);


    const dispatch = useDispatch();

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

    }

    const backToAccountList = () => {
        debugger
        setStateData(false);
        setOpenEditModal(false);
    };

    const accounts = useSelector((state: any) => state.reducer.accounts);
    const deleteResponse = useSelector((state: any) => state.reducer.deleteResponse)
    const accountOwner = useSelector((state: any) => state.reducer.accountOwner);


    function getOwnerName(ownerId: string): string {
        const owner = accountOwner?.find((owner: any) => owner.id === ownerId);
        return owner ? owner.label : '';
    }


    useEffect(() => {
        dispatch(getAccounts());
        dispatch(getAccountOwner());
        dispatch(getAccountStatus());
        dispatch(getAccountType());
        dispatch(getIndustry());
        dispatch(getNotes());

    }, [dispatch]);

    const navigate = useNavigate()
    const showItems = (id: any) => {
        navigate(`/accountDetails/accountId=${id}`)
    }

    return (
        <>
            <ToastContainer />
            {stateData ? (
                <NewAccount closeModal={closeCreateModal} onBackToListButtonClickHandler={backToAccountList} />
            ) : (
                <>
                    <DeleteConfirmationModal isOpen={showDeleteConfirmation} onCancel={cancelDelete} onConfirm={confirmDelete} id={accountId} />
                    {openEditModal ? (
                        <EditPage closeModal={closeEditModal} accountData={accountData} onBackToListButtonClickHandler={backToAccountList} />
                    ) : (
                        <CRow>
                            <CCol xs={12}>
                                <CCard className="mb-4">
                                    <CCardHeader>
                                        <CRow >
                                            <CCol xs={6} className="d-flex align-items-center">
                                                <h5 >
                                                    <strong>Accounts</strong>
                                                </h5>
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
                                    </CCardHeader>
                                    <CCardBody>
                                        <CTable>
                                            <CTableHead>
                                                <CTableRow>
                                                    <CTableHeaderCell scope="col">Account Name</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col">Owner</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col">Website</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                                                </CTableRow>
                                            </CTableHead>
                                            <CTableBody>
                                                {accounts?.map((account: Account) => (
                                                    <CTableRow key={account.id}>
                                                        <CTableHeaderCell scope="row">{account.accountName}</CTableHeaderCell>
                                                        <CTableDataCell>{getOwnerName(account.ownerId)}</CTableDataCell>
                                                        <CTableDataCell>{account.phone}</CTableDataCell>
                                                        <CTableDataCell>{account.webSite}</CTableDataCell>
                                                        <CTableDataCell>{account.country}</CTableDataCell>
                                                        <CTableDataCell>
                                                            <FaEdit
                                                                style={{ color: 'green', marginRight: "8px" }}
                                                                onClick={() => handleEditClick(account)}
                                                            />
                                                            <LuView style={{ color: 'blue', marginRight: "8px" }}
                                                                onClick={() => showItems(account?.id)}></LuView>
                                                            <MdDelete style={{ color: "red" }} onClick={() => handleDeleteClick(account.id)} />
                                                        </CTableDataCell>
                                                    </CTableRow>
                                                ))}
                                            </CTableBody>
                                        </CTable>

                                        {/* {isModalOpen && rowData && (
                  <OpenAccountModal
                    rowData={rowData}
                    closeModal={() => setIsModalOpen(false)}
                    backToAccountList={backToAccountList}
                  />
                )} */}

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
