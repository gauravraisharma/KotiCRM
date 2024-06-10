import { useSelector } from "react-redux"
import './invoiceTemplate.css'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CButton, CCard, CCardHeader } from "@coreui/react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { getAccountByIdRequest } from "../redux-saga/modules/account/action";
import { getInvoiceByIdRequest } from "../redux-saga/modules/invoice/action";
import { getOrganization } from "../redux-saga/modules/shared/action";
import { Link, useParams } from "react-router-dom";



const InvoiceTemplate= () => {

	const dispatch = useDispatch()
	const {invoiceId} = useParams();

	function getDateTime(date: any) {
		const formattedDate = new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: '2-digit',
		});
		return formattedDate;
	}

	const invoiceDetails = useSelector((state: any) => state.invoiceReducer.invoice)
	const accountDetails = useSelector((state: any) => state.accountReducer.account)
	const totalAmount = invoiceDetails?.invoiceItems.reduce((total: any, item: any) => total + item.total, 0);
	const organization = useSelector((state: any) => state.sharedReducer.organization)

	var orgName;
	var bankDetails;
	if (organization) {
		const activeOrg = organization.filter((org: any) => org.organizationResponse?.isActive === true);
		if (activeOrg.length > 0) {
			orgName = activeOrg[0]?.organizationResponse?.orgName;
			const bank = activeOrg[0]?.banks?.filter((bank: any) => bank.organizationId === activeOrg[0].organizationResponse?.id);
			if (bank && bank.length > 0) {

				bankDetails = bank[0];
			}
		}
	}


	const handleDownloadPDF = () => {
		const input: any = document.getElementById('invoice-pdf');

		html2canvas(input).then((canvas: any) => {
			const imgData = canvas.toDataURL('image/png');
			const pdf = new jsPDF();
			const imgHeight = (canvas.height * 210) / canvas.width;
			pdf.addImage(imgData, 0, 0, 210, imgHeight);
			pdf.save(`${invoiceDetails?.invoice.subject}.pdf`);
		});
	};

	useEffect(() => {
		dispatch(getInvoiceByIdRequest(invoiceId))
		dispatch(getOrganization())
		dispatch(getAccountByIdRequest(invoiceDetails?.invoice.accountID))
	}, [dispatch])
	return (
		<CCard>
			<CCardHeader className="mb-3">
				<div className="text-end">
					<CButton
						className="mx-3"
						component="input"
						type="button"
						color="primary"
						value="Download PDF"
						onClick={handleDownloadPDF}>
					</CButton>
					<Link to ={`/invoices`}>
					<CButton
						component="input"
						type="button"
						color="secondary"
						value="Cancel"
					/>
					</Link>
				</div>
			</CCardHeader>
			<div id="invoice-pdf">
				<div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '30px auto' }}>
					<div style={{ textAlign: 'center', marginBottom: '20px' }}>

						<h2 style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '10px' }}>{orgName}</h2>
						<div style={{ fontSize: '20px', margin: '20px 0 20px 0' }}>
							<i>Invoice for <strong>{invoiceDetails?.invoice.subject}</strong>  against <strong>{invoiceDetails?.invoice.fromBillingStreet} </strong>Purchase order no. <strong><u>{invoiceDetails?.invoice.purchaseOrder}</u></strong></i> </div>
						<div className='div-box'>
							<table style={{ width: '100%', borderCollapse: 'collapse' }}>
								<tr>
									<th className='table-header'>
										<p style={{ fontSize: '13px', margin: '10px 0' }}>Invoice # : {invoiceDetails?.invoice.id}</p>
									</th>
									<th className='table-header'>
										<p style={{ fontSize: '13px', margin: '10px 0' }}>Invoice Date: {getDateTime(invoiceDetails?.invoice.invoiceDate)}</p>
									</th>
									<th className='table-header'>
										<p style={{ fontSize: '13px', margin: '10px 0' }}>Due Date: {getDateTime(invoiceDetails?.invoice.dueDate)}</p>
									</th>
									<th className='table-header'>
										<p style={{ fontSize: '13px', margin: '10px 0' }}>Total Amount: AUD<p>($) {totalAmount}</p></p>

									</th>
								</tr>
							</table>
						</div>
					</div>


					<div className="div-box" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
						<div style={{ width: '45%', padding: '10px' }}>
							<p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', }}>From :</p>
							<p style={{ fontSize: '14px', margin: '5px 0' }}>{invoiceDetails?.invoice.fromBillingStreet} {invoiceDetails?.invoice.fromBillingCity}</p>
							<p style={{ fontSize: '14px', margin: '5px 0' }}>{invoiceDetails?.invoice.fromBillingState}</p>
							<p style={{ fontSize: '14px', margin: '5px 0' }}> {invoiceDetails?.invoice.fromBillingCode}</p>
							<p style={{ fontSize: '14px', margin: '5px 0' }}> {invoiceDetails?.invoice.fromBillingCountry}</p>
						</div>
						<div className="vertical-line"></div>
						<div style={{ width: '45%' }}>
							<p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', marginTop: '10px' }}>To :</p>
							<p style={{ fontSize: '14px', margin: '5px 0' }}>{invoiceDetails?.invoice.toBillingStreet} {invoiceDetails?.invoice.toBillingCity}</p>
							<p style={{ fontSize: '14px', margin: '5px 0' }}> {invoiceDetails?.invoice.toBillingState}</p>
							<p style={{ fontSize: '14px', margin: '5px 0' }}>{invoiceDetails?.invoice.toBillingCode}</p>
							<p style={{ fontSize: '14px', margin: '5px 0' }}> {invoiceDetails?.invoice.toBillingCountry}</p>
						</div>
					</div>

					<div className="invoice-items" style={{ marginBottom: '20px' }}>
						<h3   >Invoice Items</h3>
						<table style={{ width: '100%', borderCollapse: 'collapse' }}>
							<thead>
								<tr style={{ background: 'rgb(176, 172, 172) ' }}>
									<th style={{ border: '1px solid #ccc', padding: '12px 8px', textAlign: 'left', fontSize: '14px' }}>Item #</th>
									<th style={{ border: '1px solid #ccc', padding: '12px 8px', textAlign: 'left', fontSize: '14px' }}>Product Name</th>
									<th style={{ border: '1px solid #ccc', padding: '12px 8px', textAlign: 'left', fontSize: '14px' }}>Description</th>
									<th style={{ border: '1px solid #ccc', padding: '12px 8px', textAlign: 'left', fontSize: '14px' }}>Quantity</th>
									<th style={{ border: '1px solid #ccc', padding: '12px 8px', textAlign: 'left', fontSize: '14px' }}>Amount</th>
									<th style={{ border: '1px solid #ccc', padding: '12px 8px', textAlign: 'left', fontSize: '14px' }}>Discount</th>
									<th style={{ border: '1px solid #ccc', padding: '12px 8px', textAlign: 'left', fontSize: '14px' }}>Tax</th>
									<th style={{ border: '1px solid #ccc', padding: '12px 8px', textAlign: 'left', fontSize: '14px' }}>Amount to Pay ($)</th>
								</tr>
							</thead>
							<tbody>
								{invoiceDetails?.invoiceItems.map((item: any, index: any) => (
									<tr key={item.id} style={{ background: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
										<td style={{ border: '1px solid #ccc', padding: '12px 8px', fontSize: '14px' }}>{item.sno}</td>
										<td style={{ border: '1px solid #ccc', padding: '12px 8px', fontSize: '14px' }}>{item.productName}</td>
										<td style={{ border: '1px solid #ccc', padding: '12px 8px', fontSize: '14px' }}>{item.description}</td>
										<td style={{ border: '1px solid #ccc', padding: '12px 8px', fontSize: '14px' }}>{item.quantity}</td>
										<td style={{ border: '1px solid #ccc', padding: '12px 8px', fontSize: '14px' }}>{item.amount}</td>
										<td style={{ border: '1px solid #ccc', padding: '12px 8px', fontSize: '14px' }}>{item.discount}</td>
										<td style={{ border: '1px solid #ccc', padding: '12px 8px', fontSize: '14px' }}>{item.tax}</td>
										<td style={{ border: '1px solid #ccc', padding: '12px 8px', fontSize: '14px' }}>{item.total}</td>
									</tr>
								))}
							</tbody>
						</table>
						<div style={{ fontSize: '14px', marginTop: '10px', whiteSpace: 'nowrap', display: 'flex', justifyContent: 'flex-end', marginRight: '90px' }}>Total Amount To Pay : &nbsp;&nbsp; <strong>{totalAmount}</strong></div>

					</div>

					<div style={{ marginBottom: '20px' }}>
						<h3>Bank Details</h3>
						<div className="bank-details">
							<div >
								<p><strong>Name of the Bank</strong></p>
								<p><strong>Branch</strong></p>
								<p><strong>IFSC CODE</strong></p>

								<p><strong>Account Name</strong></p>
								<p><strong>Account Number</strong></p>
								<p><strong>Bank Address</strong></p>
							</div>
							<div style={{ marginLeft: '7%' }}>
								<p>: &nbsp;  &nbsp; {bankDetails?.name}</p>
								<p>: &nbsp;  &nbsp; {bankDetails?.branch}</p>
								<p>: &nbsp;  &nbsp; {bankDetails?.ifsc}</p>

								<p>:  &nbsp;  &nbsp; {accountDetails?.accountName}</p>
								<p> : &nbsp; &nbsp; {accountDetails?.phone}</p>
								<p> : &nbsp; &nbsp; {accountDetails?.billingStreet} {accountDetails?.billingCity}, {accountDetails?.billingState} - {accountDetails?.billingCode} {accountDetails?.country}</p>
							</div>
						</div>
					</div>
					<div className="invoice-footer" style={{ fontSize: '16px'}}>
						<p style={{ margin: '5px 0', borderTop: '1px solid rgb(182, 178, 178) ', paddingTop: '20px' }}><strong>Terms & Conditions :</strong> {invoiceDetails?.invoice.termsAndConditions}</p>
						<p className='link-footer'><b><u>In case of any questions on Invoice, please contact info@techbitsolution.com</u></b></p>
						<p className='link-footer' style={{ marginTop: '20px' }}>{getDateTime(invoiceDetails?.invoice.invoiceDate)}</p>
					</div>
				</div>
			</div>
		</CCard>
	)
}

export default InvoiceTemplate
