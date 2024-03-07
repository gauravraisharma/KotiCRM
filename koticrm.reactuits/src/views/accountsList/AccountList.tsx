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
import { getAccounts } from '../../redux-saga/action';
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




const AccountList: React.FC = () => {

  const accounts = useSelector((state: any) =>  state.reducer.accounts);

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

  const handleDeleteClick = (id:any) => {
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

  const backToAccountList = () => {
    debugger
    setStateData(false);
    setOpenEditModal(false);
  };

  const deleteResponse = useSelector((state:any)=> state.reducer.deleteResponse)
 


  // if(deleteResponse?.succeed == true){
  //   debugger
  //   toast.success(deleteResponse?.message);
  // }
  // else{
  //   toast.error(deleteResponse?.message)
  // }

  useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);



  const navigate = useNavigate()
  const showItems =(id:any)=>{
    navigate(`/accountDetails/accountId=${id}`)
  }

  return (
    <>
    <ToastContainer/>
      {stateData ? (
      <NewAccount onBackToListButtonClickHandler={backToAccountList} />   
         ) : (
          <>
           <DeleteConfirmationModal isOpen={showDeleteConfirmation} onCancel={cancelDelete} onConfirm={confirmDelete} id = {accountId} />
           {openEditModal ? (
            <EditPage  closeModal={closeEditModal} accountData={accountData} onBackToListButtonClickHandler={backToAccountList}/>
           ): (
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Accounts</strong>
              </CCardHeader>
              <CCardBody>   
                  <CRow >
                    <CCol xs={6}>
                      <div className="input-group">
                        <CDropdown>
                          <CDropdownToggle style={{ marginRight: 6 }} color="light">
                            Select
                          </CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem href="#">Account Name</CDropdownItem>
                            <CDropdownItem href="#">Phone</CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search for..."
                          aria-label="Search for..."
                        />
                      </div>
                      <br />
                    </CCol>
                {/* <div>
                  <select value={searchBy} onChange={handleSearchByChange}>
                    <option value="Name">Name</option>
                    <option value="Owner">Owner</option>
                    <option value="Phone">Phone</option>
                    <option value="Country">Country</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchField}
                    onChange={handleChange}
                  />
                </div> */}
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
                    <CTableHeaderCell scope="col">Account Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Owner</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Website</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {accounts?.map((account : Account) => (
                      <CTableRow key={account.id}>
                        <CTableHeaderCell scope="row">{account.id}</CTableHeaderCell>
                         <CTableDataCell>{account.ownerId}</CTableDataCell>
                        <CTableDataCell>{account.phone}</CTableDataCell>
                        <CTableDataCell>{account.webSite}</CTableDataCell> 
                        <CTableDataCell>{account.country}</CTableDataCell>
                        <CTableDataCell>
                          <FaEdit
                            style={{ color: 'green' }}
                            onClick={() => handleEditClick(account)}
                          />
                          <LuView style={{ color: 'blue' }}
                            onClick={()=>showItems(account?.id)}></LuView>
                          <MdDelete style={{ color: "red" }} onClick={()=>handleDeleteClick(account.id)} />
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
