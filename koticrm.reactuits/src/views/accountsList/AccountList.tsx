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
import { Link } from 'react-router-dom';
import NewAccount from '../account/NewAccount';
import { Account } from '../../models/account/Account';
import { dummyAccounts } from '../../constants';
import ModalComponent from './modalComponent';
import { useSelector } from 'react-redux';

interface AccountItem {
  id: number;
  name: string;
  owner: string;
  phone: string;
  country: string;
}


const AccountList: React.FC = () => {

  // const [accounts, setAccounts] = useState<Account[]>([]);

  const accounts :AccountItem[] = [
    { id: 1, name: 'Account 1', owner: 'Owner 1', phone: '123-456-7890', country: 'USA' },
    { id: 2, name: 'Account 2', owner: 'Owner 2', phone: '234-567-8901', country: 'Canada' },

];

const [searchField, setSearchField] = useState<string>('');
const [searchBy, setSearchBy] = useState<string>('Name');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchField(event.target.value);
  };
  const handleSearchByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchBy(event.target.value);
  };

  const filteredAccounts = accounts.filter(account => {
    // if (searchBy === 'Name') {
    //   return account.ownerId.toLowerCase().includes(searchField.toLowerCase());
    // } else 
    // if (searchBy === 'Owner') {
    //   return account.owner.toLowerCase().includes(searchField.toLowerCase());
    // } else 
    if (searchBy === 'Phone') {
      return account.phone.includes(searchField);
    } else if (searchBy === 'Country') {
      return account.country.toLowerCase().includes(searchField.toLowerCase());
    }
    return true;
  });


  const [stateData, setStateData] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [rowData, setRowData] = useState<Account | null>(null);

  const dispatch = useDispatch();
  const account = useSelector((state: any) => {
    console.log('State: ', state);
    return state.reducer.accounts;
  });
console.log(account)
  // const filteredAccounts = account.filter((account:Account) => {
  //   if (searchBy === 'Name') {
  //       return account.billingCity.toLowerCase().includes(searchField.toLowerCase());
  //   } else if (searchBy === 'Owner') {
  //       return account.billingCode.toLowerCase().includes(searchField.toLowerCase());
  //   } else if (searchBy === 'Phone') {
  //       return account.phone.includes(searchField);
  //   } else if (searchBy === 'Country') {
  //       return account.country.toLowerCase().includes(searchField.toLowerCase());
  //   }
  //   return true;
  // });
  const handleEditClick = (data: Account) => {
    setRowData(data);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    console.log(id);
  };

  const handleCreateNew = () => {
    setStateData(true);
  };

  const backToAccountList = () => {
    setStateData(false);
  };

  useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);


  return (
    <>
      {stateData ? (
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
                <div>
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
                </div>
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
                    {/*{account.map((item : AccountItem) => (
                      <CTableRow key={item.id}>
                        <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
                         <CTableDataCell>{item.industryId}</CTableDataCell>
                        <CTableDataCell>{item.billingCity}</CTableDataCell>
                        <CTableDataCell>{item.billingState}</CTableDataCell> 
                        <CTableDataCell>{item.country}</CTableDataCell>
                        <CTableDataCell>
                          <FaEdit
                            style={{ color: 'green' }}
                            onClick={() => handleEditClick(account)}
                          />
                          <LuView
                            style={{ color: 'blue' }}
                            onClick={() => handleDeleteClick(item?.id)}
                          />
                          <Link to={`/details/${account.id}`}>View Details</Link>
                          <MdDelete style={{ color: 'red' }} />
                        </CTableDataCell>
                      </CTableRow>
                    ))}*/}
                  </CTableBody>
                </CTable>

                {isModalOpen && rowData && (
                  <ModalComponent rowData={rowData} closeModal={() => setIsModalOpen(false)} backToAccountList={backToAccountList} />
                )}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}
    </>
  );
};

export default AccountList;
