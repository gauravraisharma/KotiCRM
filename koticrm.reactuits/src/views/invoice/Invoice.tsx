import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormSelect,
  CRow,
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
  getInvoice,
  getInvoiceOwner,
  getInvoiceStatus,
} from "../../redux-saga/modules/invoice/action";
import { getNotes } from "../../redux-saga/modules/notes/action";
import { formatDate } from "../../utils/Shared/DateTransform";
import { Link } from "react-router-dom";
import { getContacts } from "../../redux-saga/modules/contact/action";
import SearchDropdown from "../../components/base/select/SearchDropdown";
import ReactDatePicker from "react-datepicker";

interface InvoiceProps {
  getInvoiceCount: (data: string) => void;
  accountId: any;
  ownerId: any;
}
const InvoiceComponent: React.FC<InvoiceProps> = ({
  accountId,
  ownerId,
  getInvoiceCount,
}) => {
  const getFirstDayOfMonth = () => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  };

  const getLastDayOfMonth = () => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth() + 1, 0);
  };

  const dispatch = useDispatch();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showCreateInvoice, setShowCreateInvoice] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState<boolean>(false);
  const [invoiceId, setInvoiceId] = useState();
  const [startDate, setStartDate] = useState(getFirstDayOfMonth());
  const [endDate, setEndDate] = useState(getLastDayOfMonth());

  const invoices = useSelector((state: any) => state.invoiceReducer.invoices);
  const timezone = useSelector((state: any) => state.authReducer.timezone);

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
    console.log("Selected account:", event.target.value);
  };

  const handleStatusChange = (event) => {
    console.log("Selected status:", event.target);
  };

  const invoiceStatus = useSelector(
    (state: any) => state.invoiceReducer.invoiceStatus
  );
  const invoiceResponse = useSelector(
    (state: any) => state.invoiceReducer.createInvoiceResponse
  );

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
    dispatch(getInvoice());
  }, [invoiceResponse]);

  const filteredInvoices = invoices?.filter((invoice: any) => {
    return invoice?.invoice.accountID == accountId;
  });
  const invoiceCount = filteredInvoices?.length;

  const invoiceDeleteResponse = useSelector(
    (state: any) => state.invoiceReducer.deleteInvoiceResponse
  );

  useEffect(() => {
    if (getInvoiceCount) {
      getInvoiceCount(invoiceCount);
    } else return;
  });

  useEffect(() => {
    dispatch(getContacts());
    dispatch(getInvoiceStatus());
    dispatch(getInvoice());
    dispatch(getNotes());
    dispatch(getAccounts());
    dispatch(getAccountOwner());
    dispatch(getInvoiceOwner());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getInvoice());
  }, [invoiceDeleteResponse]);

  return (
    <div>
      <CCard className="d-flex flex-row justify-content-between m-1 p-2">
        {/* <CDropdown className="d-inline" onChange={handleAccountChange}>
          <CDropdownToggle color="secondary">Dropdown button</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem value={"Action"}>Action</CDropdownItem>
            <CDropdownItem value={"Another action"}>Another action</CDropdownItem>
            <CDropdownItem value={"Something else here"}>Something else here</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
        <CDropdown className="d-inline" onChange={handleStatusChange}>
          <CDropdownToggle color="secondary">Dropdown button</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem value={"Action"}>Action</CDropdownItem>
            <CDropdownItem value={"Another action"}>Another action</CDropdownItem>
            <CDropdownItem value={"Something else here"}>Something else here</CDropdownItem>
          </CDropdownMenu>
        </CDropdown> */}
        <div>
          <label htmlFor="accountId" className="form-label fw-bold">Select Account</label>
          <CFormSelect
            id="accountId"
            name="accountId"
            aria-label="Select Account"
            options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']}
            onChange={handleAccountChange}
          />
        </div>
        <div>
          <label htmlFor="status" className="form-label fw-bold">Select Status</label>
          <CFormSelect
            id="status"
            name="status"
            aria-label="Select status"
            options={['Ag+', 'Ag-', 'Bg+', 'Bg-', 'ABg+', 'ABg-', 'Og+', 'Og-']}
            onChange={handleStatusChange}
          />
        </div>
        <div>
          <div>
            <label htmlFor="startDate" className="form-label fw-bold">Start Date</label>
          </div>
          <div>
            <ReactDatePicker selected={startDate} onChange={(date) => setStartDate(date!)} className="form-control" />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="endDate" className="form-label fw-bold">End Date</label>
          </div>
          <div>
            <ReactDatePicker selected={endDate} onChange={(date) => setEndDate(date!)} className="form-control" />
          </div>
        </div>
      </CCard>
      <div className="d-flex justify-content-around my-3">
        <h4>Create + Pending : $43543</h4>
        <h4>Paid: $5822</h4>
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
                    {accountId != null && filteredInvoices?.length > 0 ? (
                      filteredInvoices.map((invoiceModel: any) => (
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
                            {formatDate(
                              invoiceModel.invoice?.dueDate,
                              "DD/MM/YYYY HH:mm",
                              timezone
                            )}
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
                              }}
                              onClick={() =>
                                generateInvoicePDF(invoiceModel.invoice?.id)
                              }
                            />
                            <MdDelete
                              size={21}
                              style={{ color: "red" }}
                              onClick={() =>
                                handleDeleteClick(invoiceModel.invoice?.id)
                              }
                            />
                          </CTableDataCell>
                        </CTableRow>
                      ))
                    ) : accountId != null && filteredInvoices?.length === 0 ? (
                      <tr>
                        <td colSpan={5}>No invoices found</td>
                      </tr>
                    ) : (
                      invoices?.map((invoiceModel: any) => (
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
                            {formatDate(
                              invoiceModel.invoice?.dueDate,
                              "DD/MM/YYYY HH:mm",
                              timezone
                            )}
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
                      ))
                    )}
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

export default InvoiceComponent;