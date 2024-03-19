import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CButton,
  CCardBody
} from "@coreui/react";

import { useEffect, useState } from "react";
// import "../../css/style.css";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Notes from "../../../components/notes/Notes";
import InvoiceComponent from "../../invoice/Invoice";
import Contacts from "../../contacts/Contacts";
import Attachments from "../../attachments/Attachments";
import { getAccountByIdRequest } from "../../../redux-saga/modules/account/action";

const AccountDetails = () => {
  const navigate = useNavigate();
  const { accountId } = useParams();
  const dispatch = useDispatch();

  const [notesCount, setNotesCount] = useState();
  const [invoicesCount, setInvoicesCount] = useState();
  const [attachmentsCount, setAttachmentsCount] = useState(0);

  const account = useSelector((state: any) => state.accountReducer.account);

  const accountOwner = useSelector(
    (state: any) => state.accountReducer.accountOwner
  );
  const industry = useSelector((state: any) => state.accountReducer.industry);

  const industryName =
    account && industry
      ? industry.find((industry: any) => industry.id === account.industryId)
        ?.name
      : null;
  const ownerName =
    account && accountOwner
      ? accountOwner?.find((owner: any) => owner.id == account.ownerId)?.label
      : null;

  const getNotesCount = (noteCount: any) => {
    setNotesCount(noteCount);
  };

  const getInvoiceCount = (invoiceCount: any) => {
    setInvoicesCount(invoiceCount);
  };

  const getAttachmentsCount = (attachmentCount: number) => {
    setAttachmentsCount(attachmentCount);
  };

  // const handleNoteSave = (name: string) => {
  // Filter notes based on the name parameter
  // const filteredNotes = notes.filter((note: Note) => note.name === name);

  // Handle filteredNotes as needed
  // };

  useEffect(() => {
    if (accountId) {
      dispatch(getAccountByIdRequest(+accountId));
    }
  }, [dispatch, accountId]);

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
                    color="secondary"
                    value="Back To Account"
                    onClick={() => navigate("/accountsList")}
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
                  Notes{" "}
                  <strong>{notesCount == 0 ? "" : `(${notesCount})`}</strong>
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
                  Attachments
                  <strong>{attachmentsCount == 0 ? "" : ` (${attachmentsCount})`}</strong>
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
                  Invoices{" "}
                  <strong>
                    {invoicesCount == 0 ? "" : `(${invoicesCount})`}
                  </strong>
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
                <div className="headings">
                  <h5>Account information</h5>
                </div>
                <ul className="account-list">
                  <CRow>
                    <CCol xs={3}>
                      <li>
                        Account Owner: <p>{ownerName}</p>
                      </li>
                    </CCol>

                    <CCol xs={3}>
                      <li>
                        Account type: <p>{account?.country}</p>
                      </li>
                    </CCol>
                    <CCol xs={3}>
                      <li>
                        Industry: <p>{industryName}</p>
                      </li>
                    </CCol>
                    <CCol xs={3}>
                      <li>
                        Annual Revenue: <p>{account?.annualRevenue}</p>
                      </li>
                    </CCol>
                    <CCol xs={3}>
                      <li>
                        Billing Street: <p>{account?.billingStreet}</p>
                      </li>
                    </CCol>
                    <CCol xs={3}>
                      <li>
                        Billing City: <p>{account?.billingCity}</p>
                      </li>
                    </CCol>
                    <CCol xs={3}>
                      <li>
                        Billing State: <p>{account?.billingState}</p>
                      </li>
                    </CCol>
                    <CCol xs={3}>
                      <li>
                        Billing Code: <p>{account?.billingCode}</p>
                      </li>
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
                <Contacts
                // accountId={account?.id}
                // accountName={account?.accountName}
                />
              </div>

              <div
                className="tab-pane fade"
                id="notes"
                role="tabpanel"
                aria-labelledby="notes-tab"
              >
                <CCol xs={12}>
                  <CCard className="mb-4">
                    <CCardHeader className="mb-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h5 className="mb-0">Notes</h5>
                        </div>


                        {/* <div className="text-end">
                          <CDropdown>
                            <CDropdownToggle color="primary" variant="outline">
                              Recent Last
                            </CDropdownToggle>
                            <CDropdownMenu>

                            <CDropdownItem
                              href="#"
                              onClick={() => handleNoteSave("Name")}
                            >
                              Name
                            </CDropdownItem>
                            <CDropdownItem
                              href="#"
                              onClick={() => handleNoteSave("Owner")}
                            >
                              Owner
                            </CDropdownItem>
                            <CDropdownItem
                              href="#"
                              onClick={() => handleNoteSave("Phone")}
                            >
                              Phone
                            </CDropdownItem>
                            <CDropdownItem
                              href="#"
                              onClick={() => handleNoteSave("Country")}
                            >
                              Country
                            </CDropdownItem>
                            </CDropdownMenu>
                          </CDropdown>
                        </div>*/}
                      </div>
                    </CCardHeader>
                    <CCardBody>
                      <Notes
                        getNotesCount={getNotesCount}
                        accountId={account?.id}
                        accountName={account?.accountName}
                      />
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
                <Attachments
                  accountId={account?.id}
                  getAttachmentsCount={getAttachmentsCount}
                />
              </div>

              <div
                className="tab-pane fade"
                id="invoices"
                role="tabpanel"
                aria-labelledby="invoices-tab"
              >
                <CCol xs={12}>
                  <InvoiceComponent
                    accountId={account?.id}
                    ownerId={account?.ownerId}
                    getInvoiceCount={getInvoiceCount}
                  />
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