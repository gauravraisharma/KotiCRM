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
import { Link, useNavigate } from 'react-router-dom';
import NewAccount from '../account/NewAccount';
import { Account } from '../../models/account/Account';
import { useSelector } from 'react-redux';
import DeleteConfirmationModal from "./DeleteConfirmation";



const AccountList: React.FC = () => {

  const accounts = useSelector((state: any) =>  state.reducer.accounts);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [searchField, setSearchField] = useState<string>("");
  const [searchBy, setSearchBy] = useState<string>("Name");
  const [stateData, setStateData] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [rowData, setRowData] = useState<Account | null>(null);


  const dispatch = useDispatch();

  const handleEditClick = (data: Account) => {
    setRowData(data);
    setIsModalOpen(true);
  };

  // const handleDeleteClick = (e:any, id:number) => {
  //   setIsDeleteModalOpen(true);
  // };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    // onDelete(); delete API call
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
  };

  useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);

  const navigate = useNavigate()
  const showItems =(id:any)=>{
  
    debugger
    navigate(`/accountDetails/accountId=${id}`)
  }

  return (
    <>
      {stateData ? (
      <NewAccount onBackToListButtonClickHandler={backToAccountList} />   
         ) : (
          <>
           <DeleteConfirmationModal isOpen={showDeleteConfirmation} onCancel={cancelDelete} onConfirm={confirmDelete} />
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Accounts</strong> <small>List</small>
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
                        <CTableDataCell>{account.billingState}</CTableDataCell> 
                        <CTableDataCell>{account.country}</CTableDataCell>
                        <CTableDataCell>
                          <FaEdit
                            style={{ color: 'green' }}
                            onClick={() => handleEditClick(accounts)}
                          />
                          <LuView style={{ color: 'blue' }}
                            onClick={()=>showItems(account?.id)}></LuView>
                          <MdDelete style={{ color: "red" }} onClick={handleDeleteClick} />
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
        </>
      )}
    </>
  );
};

export default AccountList;
