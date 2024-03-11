import { CButton, CCard, CCardBody, CCardHeader, CFormTextarea, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";

import { useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { Invoice } from "../../models/invoice/Invoice";
import { useDispatch } from "react-redux";
import { createInvoiceRequest } from "../../redux-saga/action";

import Select from 'react-select';
import DatePicker from "react-datepicker"

import 'react-datepicker/dist/react-datepicker.css';




const initialValues = {
	subject: "",
	// dueDate: "",
	// contacts: "",
	purchaseOrder: "",
	status: "",
	billingStreet: "",
	billingCity: "",
	billingState: "",
	billingCode: "",
	billingCountry: "",
	termsandConditions: "",
	description: "",
	subTotal: "",
	discount: "",
	adjustments: "",
	// grandTotal: "",
}

const validationSchema = Yup.object().shape({
	subject: Yup.string().required("Required(Subject)"),
	// dueDate: Yup.string().required("Required (Due Date)"),
	// contacts: Yup.string().required("Required (Contacts)"),
	status: Yup.string().required("Required (Status)"),
	purchaseOrder: Yup.string().required("Required(Purchase Order)"),
	billingStreet: Yup.string().required("Required (Billing Street)"),
	billingCity: Yup.string().required("Required (Billing City)"),
	billingState: Yup.string().required("Required (Billing State)"),
	billingCode: Yup.string().required("Required (Billing Code)").matches(/^\d+$/, "Billing Code must be a number")
		.min(4, "Billing Code must be at least 4 digit")
		.max(10, "Billing Code can have maximum 10 digits"),
	billingCountry: Yup.string().required("Required (Billing Coutry)"),
	termsandConditions: Yup.string().required("Required (Terms and Conditions)"),
	description: Yup.string().required("Required (Description)"),
	subTotal: Yup.string().required("Required (Sub Total)").matches(/^\d*\.?\d+$/, 'Sub Total must be a valid number'),
	discount: Yup.string().required("Required (Discount)").matches(/^\d*\.?\d+$/, 'Discount must be a valid number'),
	adjustments: Yup.string().required("Required (Adjustments)"),
	// grandTotal: Yup.string().required("Required (Grand Total)").matches(/^\d*\.?\d+$/, 'Grand Total must be a valid number'),

});


interface newInvoiceProps {
	onBackToListButtonClickHandler: () => void;
	closeModal: () => void;
	accountId: any;
	ownerId: any;


}


const NewInvoice: React.FC<newInvoiceProps> = ({ closeModal, onBackToListButtonClickHandler, accountId, ownerId }) => {

	const dispatch = useDispatch()

	const [selectedContactId, setSelectedContactId] = useState('');

	const contacts = useSelector((state: any) => state.reducer.contacts)
	const invoiceStatus = useSelector((state: any) => state.reducer.invoiceStatus);

	const accountNames = useSelector((state: any) => state.reducer.accounts)
	console.log(accountNames)


	const currentDate: Date = new Date();
	const formattedDateTime: string = currentDate.toISOString().slice(0, -1);

	const invoiceDate = new Date().toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: '2-digit',
	});

	const [invoice, setInvoice] = useState({
		subject: '', dueDate: new Date(), status: 0, purchaseOrder: '', billingStreet: '', billingCity: '', billingState: '',
		billingCode: '', billingCountry: '', termsandConditions: '', description: '', subTotal: 0, discount: 0,
		adjustments: 0
	})
	interface Row {
		sNo: number;
		productName: string;
		quantity: string;
		discount: string;
		amount: string;
		total: string;
	}

	const [rows, setRows] = useState<Row[]>([]);


	const handleAddRow = () => {
		const newRow: Row = {
			sNo: rows.length + 1,
			productName: '',
			quantity: '',
			discount: '',
			amount: '',
			total: ''
		};
		setRows([...rows, newRow]);
	};

	const handleDropdownChange = (selectedOption: any) => {
		if (selectedOption) {
			// Handle selection
			setSelectedContactId(selectedOption.key);
		} else {
			// Handle clearing
			setSelectedContactId(''); // or undefined
		}
	};

	const handleChangeData = (e: any) => {
		debugger
		setInvoice({ ...invoice, [e.target.name]: e.target.value })

	}

	const handleCreateInvoiceClick = () => {
		debugger
		const invoiceDetails: Invoice = {
			id: 0,
			accountId: accountId,
			ownerId: ownerId,
			subject: invoice.subject,
			invoiceDate: formattedDateTime,
			dueDate: invoice.dueDate ? invoice.dueDate.toString() : '',
			contactId: parseInt(selectedContactId, 10),
			purchaseOrder: invoice.purchaseOrder,
			status: parseInt(invoice.status.toString(), 10),
			billingStreet: invoice.billingStreet,
			billingCity: invoice.billingCity,
			billingState: invoice.billingState,
			billingCode: invoice.billingCode,
			billingCountry: invoice.billingCountry,
			termsAndConditions: invoice.termsandConditions,
			description: invoice.description,
			subTotal: parseFloat(invoice.subTotal.toString()),
			discount: parseFloat(invoice.discount.toString()),
			adjustments: parseFloat(invoice.adjustments.toString()),
			grandTotal: (parseFloat(invoice.subTotal.toString()) - parseFloat(invoice.discount.toString()) - parseFloat(invoice.adjustments.toString()))
		}
		dispatch(createInvoiceRequest(invoiceDetails));
		closeModal();
	}
	const { handleSubmit } = useFormik({
		enableReinitialize: true,
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: handleCreateInvoiceClick


	})

	return (
		<div>
			<CCard>
				<CCardHeader className="mb-3">
					<div className="d-flex justify-content-between align-items-center">
						<div>
							<h5 className="mb-0">Create Invoice</h5>
						</div>
						<div className="text-end">
							<CButton
								component="input"
								type="button"
								color="primary"
								value="Back To Invoices"
								onClick={onBackToListButtonClickHandler}
							/>
						</div>
					</div>
				</CCardHeader>
				<CCardBody>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleCreateInvoiceClick}
					>
						{({ handleChange }) => (

							<Form >
								<div className="label-form">Invoice Information</div>
								<div className="row">
									<div className="col-md-6">

										<div className="form-group row">
											<label htmlFor="invoiceOwner" className="col-sm-4 col-form-label">Invoice Owner</label>
											<div className="col-sm-6">
												{/* <Field as="select" className="form-control form-select" name="contacts"
													onChange={(e: any) => { handleChangeData(e); handleChange(e) }} >
													<option value="">Select Contact</option>
													{contacts?.map((contact: any) => (
														<option key={contact.id} value={contact.id}>
															{contact.firstName} {contact.lastName}
														</option>
													))}
												</Field> */}

												<Select
													options={accountNames?.map((invoice: any) => ({
														key: invoice.id,
														value: invoice.firstName,
														label: (
															<>
																<div style={{ fontSize: "15px" }}>{`${invoice.firstName} ${invoice.lastName}`}</div>
																<div style={{ fontSize: "12px" }}>{invoice.email}</div>
															</>
														)
													}))}
													defaultValue={selectedContactId}
													isSearchable={true}
													isClearable={true}
													onChange={(selectedOption: any) => handleDropdownChange(selectedOption)}

												/>
												{/* <ErrorMessage
													name="contacts"
													component="div"
													className="error form-error"
												/> */}
											</div>
										</div>

										<div className="form-group row">
											<label htmlFor="subject" className="col-sm-4 col-form-label">Subject</label>
											<div className="col-sm-6">
												<Field type="text" name="subject" className="form-control" onChange={(e: any) => { handleChangeData(e); handleChange(e) }}
												/>
												<ErrorMessage name="subject" component="div" className="error form-error" />
											</div>
										</div>

										<div className="form-group row">
											<label htmlFor="invoiceDate" className="col-sm-4 col-form-label">Invoice Date</label>
											<div className="col-sm-6">
												<Field name="invoiceDate" className="form-control" value={invoiceDate} disabled />
												<ErrorMessage
													name="invoiceDate"
													component="div"
													className="error form-error"
												/>
											</div>
										</div>

										<div className="form-group row">
											<label htmlFor="dueDate" className="col-sm-4 col-form-label">Due Date</label>
											<div className="col-sm-8" >
												{/* <Field type="date" name="dueDate" className="form-control" onChange={(e: any) => { handleChangeData(e); handleChange(e) }} /> */}
												<DatePicker
													selected={invoice.dueDate}
													onChange={(date: any, e: any) => {
														handleChangeData({ target: { name: 'dueDate', value: date } });
														handleChange(e);
													}}
													dateFormat="MMM d, yyyy"
													className="form-control"

												/>
												<ErrorMessage
													name="dueDate"
													component="div"
													className="error form-error"
												/>
											</div>
										</div>

										<div className="form-group row">
											<label htmlFor="accountName" className="col-sm-4 col-form-label">Account Names</label>
											<div className="col-sm-6">
												<Select
													name="accountName"
													options={accountNames?.map((name: any) => ({
														key: name.id,
														value: name.accountName,
														label: (
															<>
																<div style={{ fontSize: "15px" }}>{`${name.accountName}`}</div>
																<div style={{ fontSize: "12px" }}>{name.phone}</div>
															</>
														)
													}))}
													defaultValue={selectedContactId}
													isSearchable
													isClearable
													onChange={(selectedOption: any) => handleDropdownChange(selectedOption)}
													placeholder="Select account..."
												/>
											</div>
										</div>

									</div>
									<div className="col-md-6">


										<div className="form-group row">
											<label htmlFor="contacts" className="col-sm-4 col-form-label">Contacts</label>
											<div className="col-sm-6">
												{/* <Field as="select" className="form-control form-select" name="contacts"
													onChange={(e: any) => { handleChangeData(e); handleChange(e) }} >
													<option value="">Select Contact</option>
													{contacts?.map((contact: any) => (
														<option key={contact.id} value={contact.id}>
															{contact.firstName} {contact.lastName}
														</option>
													))}
												</Field> */}

												<Select
													options={contacts?.map((contact: any) => ({
														key: contact.id,
														value: contact.firstName,
														label: (
															<>
																<div style={{ fontSize: "15px" }}>{`${contact.firstName} ${contact.lastName}`}</div>
																<div style={{ fontSize: "12px" }}>{contact.email}</div>
															</>
														)
													}))}
													defaultValue={selectedContactId}
													isSearchable
													isClearable
													onChange={(selectedOption: any) => handleDropdownChange(selectedOption)}
													placeholder="Select contact..."

												/>
												{/* <ErrorMessage
													name="contacts"
													component="div"
													className="error form-error"
												/> */}
											</div>
										</div>

										<div className="form-group row">
											<label htmlFor="dealName" className="col-sm-4 col-form-label">Deal Name</label>
											<div className="col-sm-6">
												<Field type="text" name="dealName" className="form-control" onChange={(e: any) => { handleChangeData(e); handleChange(e) }} />
												<ErrorMessage name="dealName" component="div" className="error form-error" />
											</div>
										</div>

										<div className="form-group row">
											<label htmlFor="purchaseOrder" className="col-sm-4 col-form-label">Purchase Order</label>
											<div className="col-sm-6">
												<Field type="text" name="purchaseOrder" className="form-control" onChange={(e: any) => { handleChangeData(e); handleChange(e) }} />
												<ErrorMessage name="purchaseOrder" component="div" className="error form-error" />
											</div>
										</div>

										<div className="form-group row">
											<label htmlFor="status" className="col-sm-4 col-form-label">Status</label>
											<div className="col-sm-6">
												<Field as="select" name="status" className="form-control form-select" onChange={(e: any) => { handleChangeData(e); handleChange(e) }}
												>
													<option value="">Select Status</option>
													{invoiceStatus?.map((status: any) => (
														<option key={status.value} value={status.value}>
															{status.name}
														</option>
													))}
												</Field>
												<ErrorMessage name="status" component="div" className="error form-error" />
											</div>
										</div>
									</div>

									<div className="label-form" style={{ margin: '15px' }}>Address Information</div>
									<div style={{ display: 'flex', alignItems: 'center' }}>

										<div className="label-form" style={{ marginLeft: '100px', fontWeight: '700' }}>From Address</div>
										<div className="label-form" style={{ marginLeft: '500px', fontWeight: '700' }}>To Address</div>
									</div>

									<div className="col-md-6">

										<div className="form-group row">
											<label htmlFor="billingStreet" className="col-sm-4 col-form-label">Billing Street</label>
											<div className="col-sm-6">
												<Field type="text" name="billingStreet" className="form-control" onChange={(e: any) => { handleChangeData(e); handleChange(e) }} />
												<ErrorMessage
													name="billingStreet"
													component="div"
													className="error form-error"
												/>
											</div>
										</div>
										<div className="form-group row">
											<label htmlFor="billingCity" className="col-sm-4 col-form-label" >Billing City</label>
											<div className="col-sm-6">
												<Field type="text" name="billingCity" className="form-control" onChange={(e: any) => { handleChangeData(e); handleChange(e) }} />
												<ErrorMessage
													name="billingCity"
													component="div"
													className="error form-error"
												/>
											</div>
										</div>
										<div className="form-group row">
											<label htmlFor="billingState" className="col-sm-4 col-form-label">Billing State</label>
											<div className="col-sm-6">
												<Field type="text" name="billingState" className="form-control" onChange={(e: any) => { handleChangeData(e); handleChange(e) }} />
												<ErrorMessage
													name="billingState"
													component="div"
													className="error form-error"
												/>
											</div>
										</div>

										<div className="form-group row">
											<label htmlFor="billingCode" className="col-sm-4 col-form-label">Billing Code</label>
											<div className="col-sm-6">
												<Field type="number" name="billingCode" className="form-control" onChange={(e: any) => { handleChangeData(e); handleChange(e) }} />
												<ErrorMessage
													name="billingCode"
													component="div"
													className="error form-error"
												/>
											</div>
										</div>

										<div className="form-group row" >
											<label htmlFor="billingCountry" className="col-sm-4 col-form-label">Billing Country</label>
											<div className="col-sm-6">
												<Field type="text" name="billingCountry" className="form-control" onChange={(e: any) => { handleChangeData(e); handleChange(e) }} />
												<ErrorMessage name="billingCountry" component="div" className="error form-error" />
											</div>
										</div>
									</div>
									<div className="col-md-6">


										<div className="form-group row">
											<label htmlFor="billingStreet" className="col-sm-4 col-form-label">Billing Street</label>
											<div className="col-sm-6">
												<Field type="text" name="billingStreet" className="form-control" onChange={(e: any) => { handleChangeData(e); handleChange(e) }} />
												<ErrorMessage
													name="billingStreet"
													component="div"
													className="error form-error"
												/>
											</div>
										</div>
										<div className="form-group row">
											<label htmlFor="billingCity" className="col-sm-4 col-form-label" >Billing City</label>
											<div className="col-sm-6">
												<Field type="text" name="billingCity" className="form-control" onChange={(e: any) => { handleChangeData(e); handleChange(e) }} />
												<ErrorMessage
													name="billingCity"
													component="div"
													className="error form-error"
												/>
											</div>
										</div>
										<div className="form-group row">
											<label htmlFor="billingState" className="col-sm-4 col-form-label">Billing State</label>
											<div className="col-sm-6">
												<Field type="text" name="billingState" className="form-control" onChange={(e: any) => { handleChangeData(e); handleChange(e) }} />
												<ErrorMessage
													name="billingState"
													component="div"
													className="error form-error"
												/>
											</div>
										</div>

										<div className="form-group row">
											<label htmlFor="billingCode" className="col-sm-4 col-form-label">Billing Code</label>
											<div className="col-sm-6">
												<Field type="number" name="billingCode" className="form-control" onChange={(e: any) => { handleChangeData(e); handleChange(e) }} />
												<ErrorMessage
													name="billingCode"
													component="div"
													className="error form-error"
												/>
											</div>
										</div>

										<div className="form-group row" >
											<label htmlFor="billingCountry" className="col-sm-4 col-form-label">Billing Country</label>
											<div className="col-sm-6">
												<Field type="text" name="billingCountry" className="form-control" onChange={(e: any) => { handleChangeData(e); handleChange(e) }} />
												<ErrorMessage name="billingCountry" component="div" className="error form-error" />
											</div>
										</div>
									</div>


									<div className="label-form" style={{ marginLeft: '15px' }}>Invoice Items</div>

									<CCard className="rounded" style={{ width: '80%' }}>
										<CCardBody>
											<CTable responsive bordered>
												<CTableHead>
													<CTableRow>
														<CTableHeaderCell>S.No</CTableHeaderCell>
														<CTableHeaderCell>Product Name</CTableHeaderCell>
														<CTableHeaderCell>Quantity</CTableHeaderCell>
														<CTableHeaderCell>Discount</CTableHeaderCell>
														<CTableHeaderCell>Amount</CTableHeaderCell>
														<CTableHeaderCell>Total</CTableHeaderCell>
													</CTableRow>
												</CTableHead>
													{rows.map((row, index) => (
														<CTableRow key={index}>
															<CTableDataCell>{row.sNo}</CTableDataCell>
															<CTableDataCell>
																<input
																	type="text"
																	className="form-control"
																	value={row.productName}
																	onChange={(e) => {
																		const updatedRows = [...rows];
																		updatedRows[index].productName = e.target.value;
																		setRows(updatedRows);
																	}}
																/>
															</CTableDataCell>
															<CTableDataCell>
																<input
																	type="text"
																	className="form-control"
																	value={row.quantity}
																	onChange={(e) => {
																		const updatedRows = [...rows];
																		updatedRows[index].quantity = e.target.value;
																		setRows(updatedRows);
																	}}
																/>
															</CTableDataCell>
															<CTableDataCell>
																<input
																	type="text"
																	className="form-control"
																	value={row.discount}
																	onChange={(e) => {
																		const updatedRows = [...rows];
																		updatedRows[index].discount = e.target.value;
																		setRows(updatedRows);
																	}}
																/>
															</CTableDataCell>
															<CTableDataCell>
																<input
																	type="text"
																	className="form-control"
																	value={row.amount}
																	onChange={(e) => {
																		const updatedRows = [...rows];
																		updatedRows[index].amount = e.target.value;
																		setRows(updatedRows);
																	}}
																/>
															</CTableDataCell>
															<CTableDataCell>
																<input
																	type="text"
																	className="form-control"
																	value={row.total}
																	onChange={(e) => {
																		const updatedRows = [...rows];
																		updatedRows[index].total = e.target.value;
																		setRows(updatedRows);
																	}}
																/>
															</CTableDataCell>
														</CTableRow>
													))}
											</CTable>
										</CCardBody>
									</CCard>

									<div className="col-sm-4">
										<CButton color="primary" variant="outline" style={{ borderRadius: '8px' }} onClick={handleAddRow}>+ Add Row</CButton>
									</div>
									<div className="label-form" style={{ marginLeft: '15px', paddingTop: "30px" }}>Terms and Conditions</div>

									<div className="form-group row">
										<label htmlFor="termsandConditions" className="col-sm-3 col-form-label">Terms and Conditions</label>
										<div className="col-sm-9">
											<Field as="textarea" name="termsandConditions" className="form-control" onChange={(e: any) => { handleChangeData(e); handleChange(e) }} />
											<ErrorMessage name="termsandConditions" component="div" className="error form-error" />
										</div>
									</div>
									<div className="label-form" style={{ marginLeft: '15px' }}>Description</div>

									<div className="form-group row">
										<label htmlFor="description" className="col-sm-3  col-form-label">Description</label>
										<div className="col-sm-9">
											<Field as="textarea" name="description" className="form-control" onChange={(e: any) => { handleChangeData(e); handleChange(e) }} />
											<ErrorMessage
												name="description"
												component="div"
												className="error form-error"
											/>
										</div>
									</div>


								</div>

								<div>
									<button className="btn btn-primary" onClick={(e: any) => handleSubmit}>Create Invoice</button>
								</div>
							</Form>
						)}
					</Formik>
				</CCardBody>
			</CCard>
		</div>

	)
}

export default NewInvoice
