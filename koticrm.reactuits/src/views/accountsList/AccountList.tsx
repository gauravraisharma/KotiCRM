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
import { useDispatch, useSelector } from 'react-redux';
import { getAccounts } from '../../redux-saga/action';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { LuView } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import NewAccount from '../account/NewAccount';

interface AccountItem {
  id: string;
  name: string;
  owner: string;
  phone: string;
  country: string;
}

const AccountList: React.FC = () => {
  const [state, setState] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [rowData, setRowData] = useState<AccountItem | null>(null);

  const dispatch = useDispatch();
  const accounts: AccountItem[] = useSelector((state: any) => state.reducer.accounts);

  const handleEditClick = (data: AccountItem) => {
    setRowData(data);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    // Handle delete click logic
  };

  const handleCreateNew = () => {
    setState(true);
  };

  const backToAccountList = () => {
    setState(false);
  };

  useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);

  return (
    <>
      {state ? (
        <NewAccount backToAccountList={backToAccountList} />
      ) : (
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Accounts</strong> <small>List</small>
              </CCardHeader>
              <CCardBody>
                {accounts.map((item) => (
                  <CRow key={item.id}>
                    <CCol xs={6}>
                      <div className="input-group">
                        <CDropdown>
                          <CDropdownToggle style={{ marginRight: 6 }} color="light">
                            Select
                          </CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem href="#">Account Name</CDropdownItem>
                            <CDropdownItem href="#">Phone</CDropdownItem>
                            <CDropdownItem href="#">Website</CDropdownItem>
                            <CDropdownItem href="#">Account Owner</CDropdownItem>
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
                  </CRow>
                ))}
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
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Owner</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {accounts.map((item) => (
                      <CTableRow key={item.id}>
                        <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
                        <CTableDataCell>{item.name}</CTableDataCell>
                        <CTableDataCell>{item.owner}</CTableDataCell>
                        <CTableDataCell>{item.phone}</CTableDataCell>
                        <CTableDataCell>{item.country}</CTableDataCell>
                        <CTableDataCell>
                          <FaEdit
                            style={{ color: 'green' }}
                            onClick={() => handleEditClick(item)}
                          />
                          <LuView
                            style={{ color: 'blue' }}
                            onClick={() => handleDeleteClick(item.id)}
                          />
                          <Link to={`/details/${item.id}`}>View Details</Link>
                          <MdDelete style={{ color: 'red' }} />
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
{/* 
                {isModalOpen && (
                  <ModalComponent rowData={rowData} closeModal={() => setIsModalOpen(false)} />
                )} */}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}
    </>
  );
};

export default AccountList;
