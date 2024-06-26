import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import { useEffect, useState } from 'react'
import NewInvoice from './NewInvoice'
import { useDispatch } from 'react-redux';
import { getAccountOwner, getAccounts, getInvoice, getInvoiceOwner, getInvoiceStatus, getNotes } from '../../redux-saga/action';
import { useSelector } from 'react-redux';

import { MdDelete, MdPreview } from 'react-icons/md';
import InvoiceTemplate from '../../pdf-template/InvoiceTemplate';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import DeleteConfirmationModal from '../accountsList/DeleteConfirmation';


interface InvoiceProps {
	getInvoiceCount: (data: string) => void;
	accountId: any;
	ownerId: any;

}
const InvoiceComponent: React.FC<InvoiceProps> = ({ accountId, ownerId, getInvoiceCount }) => {
	const dispatch = useDispatch();
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
	const [showCreateInvoice, setShowCreateInvoice] = useState(false)
	const [openPreviewModal, setOpenPreviewModal] = useState<boolean>(false);
	const [invoiceId, setInvoiceId] = useState();

	const invoices = useSelector((state: any) => state.reducer.invoices)


	const handleCreateNewInvoice = () => {
		setShowCreateInvoice(true);
	};
	const backToInvoiceList = () => {
		setShowCreateInvoice(false);
	};
	const closeCreateModal = () => {
		setShowCreateInvoice(false);
	}


	const closeInvoicePdfModal = () => {
		setOpenPreviewModal(false)
	}
	const generateInvoicePDF = (invoiceId: any) => {
		setOpenPreviewModal(true)
		setInvoiceId(invoiceId)
	}
	const confirmDelete = () => {
		setShowDeleteConfirmation(false);
	};

	const cancelDelete = () => {
		setShowDeleteConfirmation(false);
	};

	const backToInvoicesListFromPdf = () => {
		setOpenPreviewModal(false)
	};

	const handleDeleteClick = (invoiceId: any) => {
		setInvoiceId(invoiceId)
		setShowDeleteConfirmation(true);
	};

	const invoiceStatus = useSelector((state: any) => state.reducer.invoiceStatus);
	const invoiceResponse = useSelector((state: any) => state.reducer.createInvoiceResponse);

	function getInvoiceStatusValue(statusValue: any): any {
		const iStatus = invoiceStatus?.find((status: any) => status.value === statusValue);
		return iStatus ? iStatus.name : '';
	}

	function getDates(stringDate: string) {
		const date = new Date(stringDate);

		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		return `${day}/${month < 10 ? '0' : ''}${month}/${year}`;
	}

	useEffect(() => {
		dispatch(getInvoice())
	}, [invoiceResponse])


	const filteredInvoices = invoices?.filter((invoice: any) => {
		return invoice?.invoice.accountID == accountId
	})
	const invoiceCount = filteredInvoices?.length;

	const invoiceDeleteResponse = useSelector((state: any) => state.reducer.deleteInvoiceResponse)

	useEffect(() => {
		if (getInvoiceCount) {
			getInvoiceCount(invoiceCount)
		} 
		else return
	})

	useEffect(() => {
		dispatch(getInvoiceStatus());
		dispatch(getInvoice());
		dispatch(getNotes())
		dispatch(getAccounts());
		dispatch(getAccountOwner())
		dispatch(getInvoiceOwner())
	}, [dispatch])

	useEffect(() => {
		dispatch(getInvoice())
	}, [invoiceDeleteResponse])
	return (
		<div>
			<ToastContainer />
			{showCreateInvoice ? (
				<NewInvoice closeModal={closeCreateModal} onBackToListButtonClickHandler={backToInvoiceList} accountId={accountId}
					ownerId={ownerId} />
			) : (
				<>
					<DeleteConfirmationModal isOpen={showDeleteConfirmation} onCancel={cancelDelete} onConfirm={confirmDelete} accountId={null} invoiceId={invoiceId} />

					{openPreviewModal ?
						(
							<InvoiceTemplate invoiceId={invoiceId} closeInvoicePdfModal={closeInvoicePdfModal} onBackToListButtonClickHandler={backToInvoicesListFromPdf} />
						) : (
							<CCard className="mb-4">
								<CCardHeader>
									<CRow className="align-items-center">
										<CCol xs={6}>Invoices</CCol>
										<CCol xs={6}>
											<div className="text-end">
												<CButton
													component="input"
													type="button"
													color="primary"
													value="New"
													// variant="outline"
													onClick={handleCreateNewInvoice}
												/>
											</div>
										</CCol>
									</CRow>
								</CCardHeader>
								<CCardBody>
									<CTable>
										<CTableHead>
											<CTableRow>
												<CTableHeaderCell scope="col">
													Subject
												</CTableHeaderCell>
												<CTableHeaderCell scope="col">
													Status
												</CTableHeaderCell>
												<CTableHeaderCell scope="col">
													Invoice Date
												</CTableHeaderCell>
												<CTableHeaderCell scope="col">
													Due Date
												</CTableHeaderCell>
												<CTableHeaderCell scope="col">
													Actions
												</CTableHeaderCell>
											</CTableRow>
										</CTableHead>
										<CTableBody>
											{accountId != null ?

												(filteredInvoices?.map((invoiceModel: any) => (
													<CTableRow key={invoiceModel.invoice?.id}>
														<CTableDataCell>{invoiceModel.invoice?.subject}</CTableDataCell>
														<CTableDataCell>{getInvoiceStatusValue(invoiceModel.invoice?.status)}</CTableDataCell>
														<CTableDataCell>{getDates(invoiceModel.invoice?.invoiceDate)}</CTableDataCell>
														<CTableDataCell>{getDates(invoiceModel.invoice?.dueDate)}</CTableDataCell>
														<CTableDataCell>
															<MdPreview size={21} style={{ color: "rgb(30, 30, 115)", marginRight: "7px" }} onClick={() => generateInvoicePDF(invoiceModel.invoice?.id)} />

															<MdDelete size={21} style={{ color: "red" }} onClick={() => handleDeleteClick(invoiceModel.invoice?.id)} />
														</CTableDataCell>
													</CTableRow>
												))) :

												(invoices?.map((invoiceModel: any) => (
													<CTableRow key={invoiceModel.invoice?.id}>
														<CTableDataCell>{invoiceModel.invoice?.subject}</CTableDataCell>
														<CTableDataCell>{getInvoiceStatusValue(invoiceModel.invoice?.status)}</CTableDataCell>
														<CTableDataCell>{getDates(invoiceModel.invoice?.invoiceDate)}</CTableDataCell>
														<CTableDataCell>{getDates(invoiceModel.invoice?.dueDate)}</CTableDataCell>
														<CTableDataCell>
															<MdPreview size={21} style={{ color: "rgb(30, 30, 115)", marginRight: "7px" }} onClick={() => generateInvoicePDF(invoiceModel.invoice?.id)} />

															<MdDelete size={21} style={{ color: "red" }} onClick={() => handleDeleteClick(invoiceModel.invoice?.id)} />
														</CTableDataCell>
													</CTableRow>
												)))
											}

										</CTableBody>
									</CTable>
								</CCardBody>
							</CCard>
						)}
				</>
			)}
		</div>
	)
}

export default InvoiceComponent
