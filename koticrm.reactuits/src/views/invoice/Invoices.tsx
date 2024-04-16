import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CFormSelect,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { useEffect, useState } from "react";
import NewInvoice from "./NewInvoice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AiFillEye } from "react-icons/ai";

import { MdDelete, MdEditSquare } from "react-icons/md";
import InvoiceTemplate from "../../pdf-template/InvoiceTemplate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteConfirmationModal from "../account/accountsList/DeleteConfirmation";
import {
  getAccountOwner,
  getAccounts,
} from "../../redux-saga/modules/account/action";
import {
  getInvoiceOwner,
  getInvoiceStatus,
  getInvoices,
} from "../../redux-saga/modules/invoice/action";
import { getNotes } from "../../redux-saga/modules/notes/action";
import { formatDate } from "../../utils/Shared/DateTransform";
import { Link } from "react-router-dom";
import { getContacts } from "../../redux-saga/modules/contact/action";
import ReactDatePicker from "react-datepicker";
import moment from "moment";
import 'moment-timezone' 


interface InvoiceProps {
  getInvoiceCount: (data: string) => void;
  accountId: any;
  ownerId: any;
}
const Invoices: React.FC<InvoiceProps> = ({
  accountId,
  ownerId,
  getInvoiceCount,
}) => {
  const getFirstDayOfMonth = () => {
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const startDateOfTheMonth = startDate.toISOString();
    return startDateOfTheMonth;
  };

  const getLastDayOfMonth = () => {
    const today = new Date();
    const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const endDateOfTheMonth = endDate.toISOString();
    return endDateOfTheMonth;
  };

  const dispatch = useDispatch();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showCreateInvoice, setShowCreateInvoice] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState<boolean>(false);
  const [invoiceId, setInvoiceId] = useState();
  const [accountID, setAccountID] = useState(accountId);
  const [status, setStatus] = useState(null);
  const [startDate, setStartDate] = useState(getFirstDayOfMonth());
  const [endDate, setEndDate] = useState(getLastDayOfMonth());

  const invoices = useSelector((state: any) => state.invoiceReducer.invoices);
  const invoiceStatuses = useSelector((state: any) => state.invoiceReducer.invoiceStatus);
  const fetchedAccounts = useSelector((state: any) => state.accountReducer.accounts);
  const timezone = useSelector((state: any) => state.sharedReducer.timezone);
  const invoiceStatus = useSelector((state: any) => state.invoiceReducer.invoiceStatus);
  const invoiceCreateResponse = useSelector((state: any) => state.invoiceReducer.createInvoiceResponse);
  const invoiceUpdateResponse = useSelector((state: any) => state.invoiceReducer.updateInvoiceResposne);
  const invoiceDeleteResponse = useSelector((state: any) => state.invoiceReducer.deleteInvoiceResponse);
  const isLoading = useSelector((state:any)=> state.invoiceReducer.isLoading)

  let createdAndPending = 0, paid = 0;
  const invoiceCount = invoices?.length;
  invoices.map(invoiceWithItems => {
    const currentInvoiceItem = invoiceWithItems.invoiceItems;
    if (invoiceWithItems.invoice.status === 1 || invoiceWithItems.invoice.status === 2) {
      currentInvoiceItem.map(invoiceItem => {
        createdAndPending += invoiceItem.total;
      });
    } else if (invoiceWithItems.invoice.status === 3) {
      currentInvoiceItem.map(invoiceItem => {
        paid += invoiceItem.total;
      });
    }
  });

  const handleCreateNewInvoice = () => {
    setShowCreateInvoice(true);
  };
  const backToInvoiceList = () => {
    setShowCreateInvoice(false);
  };
  const closeCreateModal = () => {
    setShowCreateInvoice(false);
  };

  const closeInvoicePdfModal = () => {
    setOpenPreviewModal(false);
  };
  const generateInvoicePDF = (invoiceId: any) => {
    setOpenPreviewModal(true);
    setInvoiceId(invoiceId);
  };
  const confirmDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const backToInvoicesListFromPdf = () => {
    setOpenPreviewModal(false);
  };

  const handleDeleteClick = (invoiceId: any) => {
    setInvoiceId(invoiceId);
    setShowDeleteConfirmation(true);
  };

  const handleAccountChange = (event) => {
    if (event.target.value === '0') {
      setAccountID(null);
    } else {
      setAccountID(event.target.value);
    }
  };

  const handleStatusChange = (event) => {
    if (event.target.value === '0') {
      setStatus(null);
    } else {
      setStatus(event.target.value);
    }
  };

  function getInvoiceStatusValue(statusValue: any): any {
    const iStatus = invoiceStatus?.find(
      (status: any) => status.value === statusValue
    );
    return iStatus ? iStatus.name : "";
  }

  function getDates(stringDate: string) {
    const date = new Date(stringDate);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month < 10 ? "0" : ""}${month}/${year}`;
  }

  useEffect(() => {
    dispatch(getInvoices(accountID, status, startDate, endDate));
  }, [dispatch, accountID, status, startDate, endDate, invoiceCreateResponse, invoiceDeleteResponse, invoiceUpdateResponse]);

  useEffect(() => {
    setAccountID(accountId)
  }, [accountId]);

  useEffect(() => {
    if (getInvoiceCount) {
      getInvoiceCount(invoiceCount);
    } else return;
  });

  useEffect(() => {
    dispatch(getContacts());
    dispatch(getInvoiceStatus());
    dispatch(getNotes());
    dispatch(getAccounts());
    dispatch(getAccountOwner());
    dispatch(getInvoiceOwner());
  }, [dispatch]);

  return (
    <div>
        {isLoading && (
        <div className="spinner-backdrop">
          <CSpinner size="sm"
            color="white"
            style={{ width: '5rem', height: '5rem', borderWidth: '0.60rem', zIndex: '9999' }}
          />
        </div>
      )}
      <CCard className="d-flex flex-row justify-content-between m-1 p-2">
        <div>
          <label htmlFor="accountId" className="form-label fw-bold">Select Account</label>
          <CFormSelect className="mb-0" aria-label="Select Account" onChange={handleAccountChange}>
            <option value={0}>Select Account...</option>
            {fetchedAccounts.map(fetchedAccount => (
              <option key={fetchedAccount.id} value={fetchedAccount.id}>{fetchedAccount.accountName}</option>
            ))}
          </CFormSelect>
        </div>
        <div>
          <label htmlFor="status" className="form-label fw-bold">Select Status</label>
          <CFormSelect className="mb-0" aria-label="Select Status" onChange={handleStatusChange}>
            <option value={0}>Select Status...</option>
            {invoiceStatuses.map(invoiceStatus => (
              <option key={invoiceStatus.value} value={invoiceStatus.value}>{invoiceStatus.name}</option>
            ))}
          </CFormSelect>
        </div>
        <div>
          <div>
            <label htmlFor="startDate" className="form-label fw-bold">Start Date</label>
          </div>
          <div>
            <ReactDatePicker selected={startDate} onChange={(date: Date) => setStartDate(date.toISOString()!)} className="form-control" />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="endDate" className="form-label fw-bold">End Date</label>
          </div>
          <div>
            <ReactDatePicker selected={endDate} onChange={(date: Date) => setEndDate(date.toISOString())} className="form-control" />
          </div>
        </div>
      </CCard>
      <div className="d-flex justify-content-around my-3">
        <h4>Created + Pending : <span style={{ color: "red" }}>${createdAndPending}</span></h4>
        <h4>Paid: <span style={{ color: "green" }}>${paid}</span></h4>
      </div>
      <ToastContainer />
      {showCreateInvoice ? (
        <NewInvoice
          closeModal={closeCreateModal}
          onBackToListButtonClickHandler={backToInvoiceList}
          accountId={accountId}
          ownerId={ownerId}
        />
      ) : (
        <>
          <DeleteConfirmationModal
            isOpen={showDeleteConfirmation}
            onCancel={cancelDelete}
            onConfirm={confirmDelete}
            accountId={null}
            invoiceId={invoiceId}
          />

          {openPreviewModal ? (
            <InvoiceTemplate
              invoiceId={invoiceId}
              closeInvoicePdfModal={closeInvoicePdfModal}
              onBackToListButtonClickHandler={backToInvoicesListFromPdf}
            />
          ) : (
            <CCard className="mb-4">
              <CCardHeader className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-0">
                      <strong>Invoices</strong>
                    </h5>
                  </div>
                  <div className="text-end">
                    <CButton
                      component="input"
                      type="button"
                      color="primary"
                      value="New"
                      onClick={handleCreateNewInvoice}
                    />
                  </div>
                </div>
              </CCardHeader>
              <CCardBody>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Subject</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        Invoice Date
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col">Due Date</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>

                  <CTableBody>
                    {invoices ? (invoices?.map((invoiceModel: any) => (
                      <CTableRow key={invoiceModel.invoice?.id}>
                        <CTableDataCell>
                          {invoiceModel.invoice?.subject}
                        </CTableDataCell>
                        <CTableDataCell>
                          {getInvoiceStatusValue(
                            invoiceModel.invoice?.status
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          {getDates(invoiceModel.invoice?.invoiceDate)}
                        </CTableDataCell>
                        <CTableDataCell>
                          {/* {formatDate(
                            invoiceModel.invoice?.dueDate,
                            "DD/MM/YYYY HH:mm",
                            timezone
                          )} */}
                        {moment.utc(invoiceModel.invoice?.dueDate).tz(timezone).format('DD/MM/YYYY hh:mm A')}

                        </CTableDataCell>
                        <CTableDataCell>
                          {invoiceModel.invoice?.status === 3 ? (<MdEditSquare
                            style={{
                              color: "green",
                              marginRight: "10px",
                              fontSize: "20px",
                              opacity: "0.5",
                              cursor: "not-allowed"
                            }}
                            title="Paid invoice is not editable"
                          />) : (<Link to={`/invoices/editInvoice/${invoiceModel.invoice?.id}`}>
                            <MdEditSquare
                              style={{
                                color: "green",
                                marginRight: "10px",
                                fontSize: "20px",
                              }}
                            />
                          </Link>)}
                          <AiFillEye
                            size={21}
                            style={{
                              color: "rgb(30, 30, 115)",
                              marginRight: "7px",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              generateInvoicePDF(invoiceModel.invoice?.id)
                            }
                          />
                          <MdDelete
                            size={21}
                            style={{
                              color: "red",
                              marginRight: "10px",
                              fontSize: "20px",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              handleDeleteClick(invoiceModel.invoice?.id)
                            }
                          />
                        </CTableDataCell>
                      </CTableRow>
                    ))) : (<p>There is no invoice</p>)}
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
          )}
        </>
      )}
    </div>
  );
};

export default Invoices;