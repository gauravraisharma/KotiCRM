import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CButton,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CDropdownMenu,
  CDropdown,
  CDropdownToggle,
  CDropdownItem,

} from "@coreui/react";
import { BsFiletypeDocx } from "react-icons/bs";

import { MdOutlinePictureAsPdf } from "react-icons/md";
import { useEffect, useState } from 'react';
import "../../css/style.css";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAccountByIdRequest } from "../../redux-saga/action";
// import { }
import { useSelector } from "react-redux";
import Notes from "../../components/Notes";
import InvoiceComponent from "../invoice/Invoice";
import Contacts from "../contacts/Contacts";
import Attachments from "../attachments/Attachments";

const AccountDetails = () => {
  const navigate = useNavigate();
  const data = useParams()
  const dispatch = useDispatch();
  const accountId = data.accountId?.split('=')[1];

  const [notesCount, setNotesCount] = useState();
  const [invoicesCount, setInvoicesCount] = useState();

  const account = useSelector((state: any) => state.reducer.account);

  const accountOwner = useSelector((state: any) => state.reducer.accountOwner);
  const industry = useSelector((state: any) => state.reducer.industry);

  const industryName = account && industry
    ? industry.find((industry: any) => industry.id === account.industryId)?.name
    : null;
  const ownerName = account && accountOwner
    ? accountOwner?.find((owner: any) => owner.id == account.ownerId)?.label
    : null

  const getNotesCount = (noteCount: any) => {
    setNotesCount(noteCount)
  }

  const getInvoiceCount = (invoiceCount: any) => {
    setInvoicesCount(invoiceCount)
  }

  useEffect(() => {
    dispatch(getAccountByIdRequest(accountId));
  }, [dispatch])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={6} className="d-flex align-items-center">
                <h5>
                  <strong>Account Detail</strong>
                </h5>
              </CCol>
              <CCol xs={6}>
                <div className="text-end">
                  <CButton
                    component="input"
                    type="button"
                    color="primary"
                    value="Back To Accounts"
                    onClick={() => navigate('/accountsList')}
                  />
                </div>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home"
                  type="button"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  Account Detail
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="contacts-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#contacts"
                  type="button"
                  role="tab"
                  aria-controls="contacts"
                  aria-selected="false"
                >
                  Contacts
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="notes-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#notes"
                  type="button"
                  role="tab"
                  aria-controls="notes"
                  aria-selected="false"
                >
                  Notes ({notesCount})
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="attachments-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#attachments"
                  type="button"
                  role="tab"
                  aria-controls="attachments"
                  aria-selected="false"
                >
                  Attachments 5
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="invoices-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#invoices"
                  type="button"
                  role="tab"
                  aria-controls="invoices"
                  aria-selected="false"
                >
                  Invoices ({invoicesCount})
                </button>
              </li>
            </ul>
            <div className="tab-content" id="accountdetail">
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >

                <div className="headings">Account information</div>
                <ul className="account-list">
                  <CRow>
                    <CCol xs={3}>
                      <li>Account Owner: <p>{ownerName}</p></li>
                    </CCol>

                    <CCol xs={3}>
                      <li>Account type: <p>{account?.country}</p></li>
                    </CCol>
                    <CCol xs={3}>
                      <li>Industry: <p>{industryName}</p></li>
                    </CCol>
                    <CCol xs={3}>
                      <li>Annual Revenue: <p>{account?.annualRevenue}</p></li>
                    </CCol>
                    <CCol xs={3}>
                      <li>Billing Street: <p>{account?.billingStreet}</p></li>
                    </CCol>
                    <CCol xs={3}>
                      <li>Billing City: <p>{account?.billingCity}</p></li>
                    </CCol>
                    <CCol xs={3}>
                      <li>Billing State: <p>{account?.billingState}</p></li>
                    </CCol>
                    <CCol xs={3}>
                      <li>Billing Code: <p>{account?.billingCode}</p></li>
                    </CCol>
                  </CRow>

                </ul>
              </div>

              <div
                className="tab-pane fade"
                id="contacts"
                role="tabpanel"
                aria-labelledby="contacts-tab"
              >
                <Contacts />
              </div>

              <div
                className="tab-pane fade"
                id="notes"
                role="tabpanel"
                aria-labelledby="notes-tab"
              >
                <CCol xs={12}>
                  <CCard className="mb-4">
                    <CCardHeader>
                      <CRow className="align-items-center">
                        <CCol xs={6}  >Notes</CCol>
                        <CCol xs={6}>
                          <div className="text-end">
                            <CDropdown>
                              <CDropdownToggle color="primary" variant="outline">
                                Recent Last
                              </CDropdownToggle>
                              <CDropdownMenu>
                                <CDropdownItem href="#">Name</CDropdownItem>
                                <CDropdownItem href="#">Owner</CDropdownItem>
                                <CDropdownItem href="#">Phone</CDropdownItem>
                                <CDropdownItem href="#">Country</CDropdownItem>
                              </CDropdownMenu>
                            </CDropdown>
                          </div>
                        </CCol>
                      </CRow>
                    </CCardHeader>
                    <CCardBody>
                      <Notes getNotesCount={getNotesCount} accountId={account?.id} accountName={account?.accountName} />
                    </CCardBody>
                  </CCard>
                </CCol>
              </div>

              <div
                className="tab-pane fade"
                id="attachments"
                role="tabpanel"
                aria-labelledby="attachments-tab"
              >
                <Attachments />
              </div>

              <div
                className="tab-pane fade"
                id="invoices"
                role="tabpanel"
                aria-labelledby="invoices-tab"
              >
                <CCol xs={12}>

                  <InvoiceComponent accountId={account?.id} ownerId={account?.ownerId} getInvoiceCount={getInvoiceCount} />

                </CCol>
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default AccountDetails;
