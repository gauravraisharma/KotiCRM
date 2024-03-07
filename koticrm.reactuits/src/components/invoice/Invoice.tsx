import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import { useEffect, useState } from 'react'
import NewInvoice from './NewInvoice'
import { useDispatch } from 'react-redux';
import { getInvoice } from '../../redux-saga/action';
import { useSelector } from 'react-redux';
import { Invoice } from '../../models/invoice/Invoice';

interface InvoiceProps {
	getInvoiceCount: (data: string) => void;
	accountId: any;
	ownerId: any;
}
const InvoiceComponent: React.FC<InvoiceProps> = ({ accountId, ownerId, getInvoiceCount }) => {
	const dispatch = useDispatch();
	// const [invoiceStatus, setInvoiceStatus] = useState([]);
	const [showCreateInvoice, setShowCreateInvoice] = useState(false)
	const [showEditInvoice, setShowEditInvoice] = useState(false)

	const invoices = useSelector((state: any) => state.reducer.invoices)
	console.log(invoices)


	const handleCreateNewInvoice = () => {
		debugger
		setShowCreateInvoice(true);
	};
	const backToInvoiceList = () => {
		debugger
		setShowCreateInvoice(false);
		setShowEditInvoice(false);
	};
	const closeCreateModal = () => {
		setShowCreateInvoice(false);
	}

	const invoiceStatus = useSelector((state: any) => state.reducer.invoiceStatus);
	const invoiceResponse = useSelector((state: any) => state.reducer.invoices);

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
		return invoice.accountID == accountId
	})
	const invoiceCount = filteredInvoices?.length;
	
	useEffect(()=>{
		getInvoiceCount(invoiceCount)
	})
	return (
		<div>
			{showCreateInvoice ? (
				<NewInvoice closeModal={closeCreateModal} onBackToListButtonClickHandler={backToInvoiceList} accountId={accountId}
					ownerId={ownerId} />
			) : (
				<>
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
											variant="outline"
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
									</CTableRow>
								</CTableHead>
								<CTableBody>
									{filteredInvoices?.map((invoice: Invoice) => (
										<CTableRow>
											<CTableHeaderCell>{invoice.subject}</CTableHeaderCell>
											<CTableDataCell>{getInvoiceStatusValue(invoice.status)}</CTableDataCell>
											<CTableDataCell>{getDates(invoice.invoiceDate)}</CTableDataCell>
											<CTableDataCell>{getDates(invoice.dueDate)}</CTableDataCell>
										</CTableRow>
									))}

								</CTableBody>
							</CTable>
						</CCardBody>
					</CCard>
				</>
			)}
		</div>
	)
}

export default InvoiceComponent
