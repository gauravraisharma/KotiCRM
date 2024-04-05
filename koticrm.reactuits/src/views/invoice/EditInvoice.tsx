import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup'; // Add import for validationSchema
import { CButton, CCard, CCardBody, CCardHeader, CCol } from '@coreui/react';
import { getOrganization } from '../../redux-saga/modules/shared/action';

interface newInvoiceProps {
  invoiceData: any;
  accountId: any;
  ownerId: any;
}
const validationSchema = Yup.object().shape({
  invoiceOwner: Yup.string().required("Invoice owner is required"),
  subject: Yup.string().required("Subject is required"),
  dueDate: Yup.date().required("Due date is required"),
  accountName: Yup.string().required("Account name is required"),
  contacts: Yup.string().required("Contacts are required"),
  purchaseOrder: Yup.string().required("Purchase order is required"),
  status: Yup.string().required("Status is required"),
  fromBillingStreet: Yup.string().required("From billing street is required"),
  fromBillingCity: Yup.string().required("From billing city is required"),
  fromBillingState: Yup.string().required("From billing state is required"),
  fromZipCode: Yup.string().required("From zip code is required"),
  fromBillingCountry: Yup.string().required("From billing country is required"),
  toBillingStreet: Yup.string().required("To billing street is required"),
  toBillingCity: Yup.string().required("To billing city is required"),
  toBillingState: Yup.string().required("To billing state is required"),
  toZipCode: Yup.string().required("To zip code is required"),
  toBillingCountry: Yup.string().required("To billing country is required"),
  termsandConditions: Yup.string().required("Terms and conditions are required"),
  description: Yup.string().required("Description is required"),
  tax: Yup.number().required("Tax is required"),
  adjustments: Yup.number().required("Adjustments are required"),
});


const initialValues = {
  invoiceOwner: "",
  subject: "",
  dueDate: "",
  accountName: "",
  contacts: "",
  purchaseOrder: "",
  status: "",
  fromBillingStreet: "",
  fromBillingCity: "",
  fromBillingState: "",
  fromZipCode: "",
  fromBillingCountry: "",
  toBillingStreet: "",
  toBillingCity: "",
  toBillingState: "",
  toZipCode: "",
  toBillingCountry: "",
   termsandConditions: "",
   description: "",
  tax: "",
  adjustments: "",
};


const EditInvoice: React.FC<newInvoiceProps> = ({ invoiceData }) => {
  const [termsAndConditions, setTermsAndConditions] = useState("");

  const dispatch = useDispatch();
  
  const [updateInvoice, setUpdateInvoice] = useState({
  invoiceOwner: invoiceData.invoiceOwner,
  subject: invoiceData.subject,
  dueDate: invoiceData.dueDate,
  accountName: invoiceData.accountName,
  contacts: invoiceData.contacts,
  purchaseOrder: invoiceData.purchaseOrder,
  status: invoiceData.status,
  fromBillingStreet: invoiceData.fromBillingStreet,
  fromBillingCity: invoiceData.fromBillingCity,
  fromBillingState: invoiceData.fromBillingState,
  fromZipCode:invoiceData.fromZipCode ,
  fromBillingCountry: invoiceData.fromBillingCountry,
  toBillingStreet: invoiceData.toBillingStreet,
  toBillingCity: invoiceData.toBillingCity,
  toBillingState:invoiceData.toBillingState ,
  toZipCode: invoiceData.toZipCode,
  toBillingCountry:invoiceData.toBillingCountry ,
  termsandConditions: invoiceData.termsandConditions,
  description: invoiceData.description,
  tax: invoiceData.tax,
  adjustments: invoiceData.adjustments,

  });
  // const [touchedFields, setTouchedFields] = useState({
  //   invoiceOwner: false,
  //   subject: false,
  //   dueDate: false,
  //   accountName: false,
  //   contacts: false,
  //   purchaseOrder: false,
  //   status: false,
  //   fromBillingStreet: false,
  //   fromBillingCity: false,
  //   fromBillingState: false,
  //   fromZipCode: false,
  //   fromBillingCountry: false,
  //   toBillingStreet: false,
  //   toBillingCity: false,
  //   toBillingState: false,
  //   toZipCode: false,
  //   toBillingCountry: false,
  //    termsandConditions: false,
  //    description: false,
  //   tax: false,
  //   adjustments: false,

  // )};

  // Fetching data from store
  const contactWithAccountNameListAndTotalCount = useSelector((state: any) => state.contactReducer.contacts);
  const contacts = contactWithAccountNameListAndTotalCount.contactWithAccountNames;
  const invoiceStatus = useSelector((state: any) => state.invoiceReducer.invoiceStatus);
  const invoiceOwner = useSelector((state: any) => state.invoiceReducer.invoiceOwner);
  const accountOwner = useSelector((state: any) => state.accountReducer.accountOwner);
  const userId = useSelector((state: any) => state.authReducer.userId);
  const accountNames = useSelector((state: any) => state.accountReducer.accounts);
  const organization = useSelector((state: any) => state.sharedReducer.organization);

  var orgDetails;
  if (organization) {
    const activeOrg = organization.filter(
      (org: any) => org.organizationResponse?.isActive === true
    );
    if (activeOrg && activeOrg.length > 0) {
      orgDetails = activeOrg[0]?.organizationResponse;
    }
  }
  
  useEffect(() => {
    dispatch(getOrganization());
  }, [dispatch]);

  var grandTotalValue = 0;
  const [toAddress, setToAddress] = useState({
    billingStreet: "",
    billingCity: "",
    billingState: "",
    zipCode: "",
    billingCountry: "",
  });

  const [dropdownItems, setDropdownItems] = useState({
    contacts: "",
    invoiceOwner: "",
    accountName: "",
  });
  const handleDropdownChange = (e: any, selectedOption: any) => {
    if (e != null) {
      setDropdownItems({ ...dropdownItems, [selectedOption.name]: e.key });
      if (selectedOption.name == "accountName") {
        const accountAddress = accountNames?.find(
          (account: any) => account.id == e.key
        );
        if (accountAddress) {
          setToAddress({
            billingStreet: accountAddress.billingStreet || "",
            billingCity: accountAddress.billingCity || "",
            billingState: accountAddress.billingState || "",
            zipCode: accountAddress.zipCode || "",
            billingCountry: accountAddress.country || "",
          });
        }
      }
    } else {
      setDropdownItems({ ...dropdownItems, [selectedOption.name]: "" });
    }
  };

  const currentDate: Date = new Date();
  const formattedDateTime: string = currentDate.toISOString().slice(0, -1);

  const invoiceDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  const handleChangeData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUpdateInvoice({ ...updateInvoice, [e.target.name]: e.target.value });
  };
  interface Row {
    sNo: number;
    productName: string;
    description: string;
    quantity: string;
    discount: string;
    amount: string;
    total: string;
  }
  const handleAddRow = () => {
    const newRow: Row = {
      sNo: rows.length + 1,
      productName: "",
      description: "",
      quantity: "",
      discount: "",
      amount: "",
      total: "",
    };
    setRows([...rows, newRow]);
  };
  const subTotalValue = rows.reduce((total, row) => {
    // Parse row.amount and row.quantity to numbers, defaulting to 0 if NaN
    const amount = parseFloat(row.amount) || 0;
    const quantity = parseFloat(row.quantity) || 0;

    return total + amount * quantity;
}, 0);
  const discountValue = rows.reduce((discount, row) => {
    const rowDiscount = parseFloat(row.discount) || 0
    return discount +rowDiscount;
  }, 0);
    grandTotalValue =
    subTotalValue -
    discountValue +
    parseFloat(invoice.tax.toString()) -
    parseFloat(invoice.adjustments.toString());

  // const handleChangeData = (e: any) => {
  //   setInvoice({ ...invoice, [e.target.name]: e.target.value });
  // };
  const handleUpdateInvoiceClick = () => {

  };
  
  const getAccountOwner = (ownerId: any) => {
    const owner = accountOwner?.find((owner: any) => owner.id === ownerId);
    return owner ? owner.label : "";
  };

  const calculateTotal = (row: any) => {
    const amount = parseFloat(row.amount) || 0;
    const discount = parseFloat(row.discount) || 0;
    const quantity = parseFloat(row.quantity) || 0;
    return ((amount - discount) * quantity).toString();
  };

  // const { handleSubmit } = useFormik({
  //   enableReinitialize: true,
  //   initialValues: initialValues,
  //   validationSchema: validationSchema,
  // });



  return (
    <div>
      <ToastContainer />
      <CCard>
        <CCardHeader className="mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-0">Upadte Invoice</h5>
            </div>
            <CCol xs={6} className="text-end">
              {
                <Link to={`/invoices`}>
                  <CButton
                    component="input"
                    type="button"
                    color="secondary"
                    value="Back To Invoices"
                  />
                </Link>
              }
            </CCol>
          </div>
        </CCardHeader>
        <CCardBody>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
          {({ handleChange, errors, handleSubmit, touched }) => (
            <Form>
              <div className="label-form">Invoice Information</div>
              
              <div className="row">
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label
                        htmlFor="invoiceOwner"
                        className="col-sm-4 col-form-label"
                      >
                        Invoice Owner
                      </label>
                      <div className="col-sm-6">
                        <Field name="invoiceOwner">
                          {(fieldProps: any) => (
                            <>
                              <Select
                                placeholder="Select Owner..."
                                name="invoiceOwner"
                                options={invoiceOwner?.map((invoice: any) => ({
                                  key: invoice.id,
                                  value: invoice.firstName,
                                  label: (
                                    <>
                                      <div
                                        style={{ fontSize: "15px" }}
                                      >{`${invoice.label}`}</div>
                                      <div style={{ fontSize: "12px" }}>
                                        {invoice.email}
                                      </div>
                                    </>
                                  ),
                                }))}
                                defaultValue={dropdownItems.invoiceOwner}
                                isSearchable={true}
                                isClearable={true}
                                onChange={(e: any, selectedOption: any) => {
                                  handleDropdownChange(e, selectedOption);
                                  fieldProps.form.setFieldValue(
                                    "invoiceOwner",
                                    e?.key,
                                    true
                                  );
                                }}
                                onBlur={handleBlur("invoiceOwner")}
                                className={`form-control ${
                                  touched.invoiceOwner && errors.invoiceOwner
                                    ? "border-danger"
                                    : ""
                                }`}
                                styles={{
                                  control: (provided) => ({
                                    ...provided,
                                    outline: "none",
                                    border: "none",
                                  }),
                                }}
                              />
                            </>
                          )}
                        </Field>
                        <ErrorMessage
                          name="invoiceOwner"
                          component="div"
                          className="error form-error"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="subject"
                        className="col-sm-4 col-form-label"
                      >
                        Subject
                      </label>
                      <div className="col-sm-6">
                        <Field
                          type="text"
                          name="subject"
                          className={`form-control ${
                            touched.subject && errors.subject
                              ? "border-danger"
                              : ""
                          }`}
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                          }}
                        />
                        <ErrorMessage
                          name="subject"
                          component="div"
                          className="error form-error"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="invoiceDate"
                        className="col-sm-4 col-form-label"
                      >
                        Invoice Date
                      </label>
                      <div className="col-sm-6">
                        <Field name="invoiceDate">
                          {(fieldProps: any) => (
                            <>
                              <DatePicker
                                name="invoiceDate"
                                selected={invoice.invoiceDate || null}
                                // style={{ height: "50px" }}
                                onChange={(date: any) => {
                                  handleChangeData({
                                    target: { name: "invoiceDate", value: date },
                                  });
                                  handleInputChange("invoiceDate");
                                  fieldProps.form.setFieldValue(
                                    "invoiceDate",
                                    date,
                                    true
                                  );
                                }}
                                dateFormat="MMM d, yyyy"
                                className="form-control"
                               
                              />
                            </>
                          )}
                        </Field>
                        <ErrorMessage
                          name="invoiceDate"
                          component="div"
                          className="error form-error"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="dueDate"
                        className="col-sm-4 col-form-label"
                      >
                        Due Date
                      </label>
                      <div className="col-sm-8">
                        <Field name="dueDate">
                          {(fieldProps: any) => (
                            <>
                              <DatePicker
                                name="dueDate"
                                selected={invoice.dueDate || null}
                                // style={{ height: "50px" }}
                                onChange={(date: any) => {
                                  handleChangeData({
                                    target: { name: "dueDate", value: date },
                                  });
                                  handleInputChange("dueDate");
                                  fieldProps.form.setFieldValue(
                                    "dueDate",
                                    date,
                                    true
                                  );
                                }}
                                dateFormat="MMM d, yyyy"
                                className={`form-control ${
                                  touched.dueDate && errors.dueDate
                                    ? "border-danger"
                                    : ""
                                }`}
                              />
                            </>
                          )}
                        </Field>
                        <ErrorMessage
                          name="dueDate"
                          component="div"
                          className="error form-error"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="accountName"
                        className="col-sm-4 col-form-label"
                      >
                        Account
                      </label>
                      <div className="col-sm-6">
                        <Field name="accountName">
                          {(fieldProps: any) => (
                            <>
                              <Select
                                name="accountName"
                                options={accountNames?.map((name: any) => ({
                                  key: name.id,
                                  value: name.accountName,
                                  label: (
                                    <>
                                      <div
                                        style={{ fontSize: "15px" }}
                                      >{`${name.accountName}`}</div>
                                      <div style={{ fontSize: "12px" }}>
                                        {getAccountOwner(name.ownerId)}
                                      </div>
                                    </>
                                  ),
                                }))}
                                defaultValue={dropdownItems.accountName}
                                isSearchable
                                isClearable
                                onChange={(e: any, selectedOption: any) => {
                                  handleDropdownChange(e, selectedOption);
                                  fieldProps.form.setFieldValue(
                                    "accountName",
                                    e?.key,
                                    true
                                  );
                                }}
                                onBlur={handleBlur("accountName")}
                                placeholder="Select account..."
                                className={`form-control ${
                                  touched.accountName && errors.accountName
                                    ? "border-danger"
                                    : ""
                                }`}
                                styles={{
                                  control: (provided) => ({
                                    ...provided,
                                    outline: "none",
                                    border: "none",
                                  }),
                                }}
                              />
                            </>
                          )}
                        </Field>
                        <ErrorMessage
                          name="accountName"
                          component="div"
                          className="error form-error"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label
                        htmlFor="contacts"
                        className="col-sm-4 col-form-label"
                      >
                        Contacts
                      </label>
                      <div className="col-sm-6">
                        <Field name="contacts">
                          {(fieldProps: any) => (
                            <>
                              <Select
                                name="contacts"
                                options={contacts?.map((contact: any) => ({
                                  key: contact.id,
                                  value: contact.firstName,
                                  label: (
                                    <>
                                      <div
                                        style={{ fontSize: "15px" }}
                                      >{`${contact.firstName} ${contact.lastName}`}</div>
                                      <div style={{ fontSize: "12px" }}>
                                        {contact.email}
                                      </div>
                                    </>
                                  ),
                                }))}
                                defaultValue={dropdownItems.contacts}
                                isSearchable
                                isClearable
                                onChange={(e: any, selectedOption: any) => {
                                  handleDropdownChange(e, selectedOption);
                                  fieldProps.form.setFieldValue(
                                    "contacts",
                                    e?.key,
                                    true
                                  );
                                }}
                                onBlur={handleBlur("accountName")}
                                placeholder="Select contact..."
                                className={`form-control ${
                                  touched.contacts && errors.contacts
                                    ? "border-danger"
                                    : ""
                                }`}
                                styles={{
                                  control: (provided) => ({
                                    ...provided,
                                    outline: "none",
                                    border: "none",
                                  }),
                                }}
                              />
                            </>
                          )}
                        </Field>
                        <ErrorMessage
                          name="contacts"
                          component="div"
                          className="error form-error"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="dealName"
                        className="col-sm-4 col-form-label"
                      >
                        Deal Name
                      </label>
                      <div className="col-sm-6">
                        <Field
                          type="text"
                          name="dealName"
                          className="form-control"
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                          }}
                        />
                        <ErrorMessage
                          name="dealName"
                          component="div"
                          className="error form-error"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="purchaseOrder"
                        className="col-sm-4 col-form-label"
                      >
                        Purchase Order
                      </label>
                      <div className="col-sm-6">
                        <Field
                          type="text"
                          name="purchaseOrder"
                          className="form-control"
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                          }}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="status"
                        className="col-sm-4 col-form-label"
                      >
                        Status
                      </label>
                      <div className="col-sm-6">
                        <Field
                          as="select"
                          name="status"
                          className={`form-control form-select ${
                            touched.status && errors.status
                              ? "border-danger"
                              : ""
                          }`}
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                          }}
                        >
                          <option value="">Select Status</option>
                          {invoiceStatus?.map((status: any) => (
                            <option key={status.value} value={status.value}>
                              {status.name}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="status"
                          component="div"
                          className="error form-error"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="label-form" style={{ margin: "15px" }}>
                    Address Information
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      className="label-form"
                      style={{ marginLeft: "100px", fontWeight: "700" }}
                    >
                      From Address
                    </div>
                    <div
                      className="label-form"
                      style={{ marginLeft: "500px", fontWeight: "700" }}
                    >
                      To Address
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group row">
                      <label
                        htmlFor="fromBillingStreet"
                        className="col-sm-4 col-form-label"
                      >
                        Billing Street
                      </label>
                      <div className="col-sm-6">
                        <Field
                          type="text"
                          name="fromBillingStreet"
                          value={invoice.fromBillingStreet}
                          className={`form-control  ${
                            touched.fromBillingStreet &&
                            errors.fromBillingStreet
                              ? "border-danger"
                              : ""
                          }`}
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                            handleInputChange("fromBillingStreet");
                          }}
                        />
                        <ErrorMessage
                          name="fromBillingStreet"
                          component="div"
                          className="error form-error"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="fromBillingCity"
                        className="col-sm-4 col-form-label"
                      >
                        Billing City
                      </label>
                      <div className="col-sm-6">
                        <Field
                          type="text"
                          name="fromBillingCity"
                          value={invoice.fromBillingCity}
                          className={`form-control  ${
                            touched.fromBillingCity && errors.fromBillingCity
                              ? "border-danger"
                              : ""
                          }`}
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                            handleInputChange("fromBillingCity");
                          }}
                        />
                        <ErrorMessage
                          name="fromBillingCity"
                          component="div"
                          className="error form-error"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="fromBillingState"
                        className="col-sm-4 col-form-label"
                      >
                        Billing State
                      </label>
                      <div className="col-sm-6">
                        <Field
                          type="text"
                          name="fromBillingState"
                          value={invoice.fromBillingState}
                          className={`form-control  ${
                            touched.fromBillingState && errors.fromBillingState
                              ? "border-danger"
                              : ""
                          }`}
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                            handleInputChange("fromBillingState");
                          }}
                        />
                        <ErrorMessage
                          name="fromBillingState"
                          component="div"
                          className="error form-error"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="fromZipCode"
                        className="col-sm-4 col-form-label"
                      >
                        Zip Code
                      </label>
                      <div className="col-sm-6">
                        <Field
                          type="number"
                          name="fromZipCode"
                          value={invoice.fromZipCode}
                          className={`form-control  ${
                            touched.fromZipCode && errors.fromZipCode
                              ? "border-danger"
                              : ""
                          }`}
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                            handleInputChange("fromZipCode");
                          }}
                        />
                        <ErrorMessage
                          name="fromZipCode"
                          component="div"
                          className="error form-error"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="fromBillingCountry"
                        className="col-sm-4 col-form-label"
                      >
                        Billing Country
                      </label>
                      <div className="col-sm-6">
                        <Field
                          type="text"
                          name="fromBillingCountry"
                          value={invoice.fromBillingCountry}
                          className={`form-control  ${
                            touched.fromBillingCountry &&
                            errors.fromBillingCountry
                              ? "border-danger"
                              : ""
                          }`}
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                            handleInputChange("fromBillingCountry");
                          }}
                        />
                        <ErrorMessage
                          name="fromBillingCountry"
                          component="div"
                          className="error form-error"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label
                        htmlFor="toBillingStreet"
                        className="col-sm-4 col-form-label"
                      >
                        Billing Street
                      </label>
                      <div className="col-sm-6">
                        <Field
                          type="text"
                          name="toBillingStreet"
                          value={
                            dropdownItems.accountName !== ""
                              ? invoice.toBillingStreet
                              : ""
                          }
                          className={`form-control  ${
                            touched.toBillingStreet && errors.toBillingStreet
                              ? "border-danger"
                              : ""
                          }`}
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                            handleInputChange("toBillingStreet");
                          }}
                        />
                        <ErrorMessage
                          name="toBillingStreet"
                          component="div"
                          className="error form-error"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="toBillingCity"
                        className="col-sm-4 col-form-label"
                      >
                        Billing City
                      </label>
                      <div className="col-sm-6">
                        <Field
                          type="text"
                          name="toBillingCity"
                          value={
                            dropdownItems.accountName !== ""
                              ? invoice.toBillingCity
                              : ""
                          }
                          className={`form-control  ${
                            touched.toBillingCity && errors.toBillingCity
                              ? "border-danger"
                              : ""
                          }`}
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                            handleInputChange("toBillingCity");
                          }}
                        />
                        <ErrorMessage
                          name="toBillingCity"
                          component="div"
                          className="error form-error"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="toBillingState"
                        className="col-sm-4 col-form-label"
                      >
                        Billing State
                      </label>
                      <div className="col-sm-6">
                        <Field
                          type="text"
                          name="toBillingState"
                          value={
                            dropdownItems.accountName !== ""
                              ? invoice.toBillingState
                              : ""
                          }
                          className={`form-control  ${
                            touched.toBillingState && errors.toBillingState
                              ? "border-danger"
                              : ""
                          }`}
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                            handleInputChange("toBillingState");
                          }}
                        />
                        <ErrorMessage
                          name="toBillingState"
                          component="div"
                          className="error form-error"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="toZipCode"
                        className="col-sm-4 col-form-label"
                      >
                        ZipCode
                      </label>
                      <div className="col-sm-6">
                        <Field
                          type="number"
                          name="toZipCode"
                          value={
                            dropdownItems.accountName !== ""
                              ? invoice.toZipCode
                              : ""
                          }
                          className={`form-control  ${
                            touched.toZipCode && errors.toZipCode
                              ? "border-danger"
                              : ""
                          }`}
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                            handleInputChange("toZipCode");
                          }}
                        />
                        <ErrorMessage
                          name="toZipCode"
                          component="div"
                          className="error form-error"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="toBillingCountry"
                        className="col-sm-4 col-form-label"
                      >
                        Billing Country
                      </label>
                      <div className="col-sm-6">
                        <Field
                          type="text"
                          name="toBillingCountry"
                          value={
                            dropdownItems.accountName !== ""
                              ? invoice.toBillingCountry
                              : ""
                          }
                          className={`form-control  ${
                            touched.toBillingCountry && errors.toBillingCountry
                              ? "border-danger"
                              : ""
                          }`}
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                            handleInputChange("toBillingCountry");
                          }}
                        />
                        <ErrorMessage
                          name="toBillingCountry"
                          component="div"
                          className="error form-error"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="label-form" style={{ marginLeft: "15px" }}>
                    Invoice Items
                  </div>

                  <CCard className="rounded" style={{ width: "90%" }}>
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
                            <CTableDataCell width={250}>
                              <div style={{ margin: "5px" }}>
                                <input
                                  type="text"
                                  className="form-control mb-2"
                                  value={row.productName}
                                  onChange={(e) => {
                                    const updatedRows = [...rows];
                                    updatedRows[index].productName =
                                      e.target.value;
                                    setRows(updatedRows);
                                  }}
                                />

                                <CFormTextarea
                                  placeholder="Description"
                                  className="form-control"
                                  value={row.description}
                                  onChange={(e) => {
                                    const updatedRows = [...rows];
                                    updatedRows[index].description =
                                      e.target.value;
                                    setRows(updatedRows);
                                  }}
                                />
                              </div>
                            </CTableDataCell>

                            <CTableDataCell>
                              <div>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={row.quantity}
                                  onChange={(e) => {
                                    const updatedRows = [...rows];
                                    const newValue= parseFloat(e.target.value);
                                    if(!isNaN(newValue)){
                                      updatedRows[index].quantity = newValue.toString();
                                      updatedRows[index].total = calculateTotal(updatedRows[index]);
                                      console.log("Updated rows:", updatedRows); // Log updated rows
                                      setRows(updatedRows);
                                    } else {
                                      console.error("Invalid input value:", e.target.value);
                                    }
                                  }}
                                />
                              </div>
                            </CTableDataCell>
                            <CTableDataCell>
                              <div>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={row.discount}
                                  onChange={(e) => {
                                    const updatedRows = [...rows];
                                    updatedRows[index].discount =
                                      e.target.value;
                                    updatedRows[index].total = calculateTotal(
                                      updatedRows[index]
                                    );
                                    setRows(updatedRows);
                                  }}
                                />
                              </div>
                            </CTableDataCell>
                            <CTableDataCell>
                              <div>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={row.amount}
                                  onChange={(e) => {
                                    const updatedRows = [...rows];
                                    updatedRows[index].amount = e.target.value;
                                    updatedRows[index].total = calculateTotal(
                                      updatedRows[index]
                                    );
                                    setRows(updatedRows);
                                  }}
                                />
                              </div>
                            </CTableDataCell>
                            <CTableDataCell>
                              <div>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={row.total}
                                  disabled
                                />
                              </div>
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTable>
                    </CCardBody>
                  </CCard>

                  <div className="col-sm-4 ">
                    <CButton
                      color="primary"
                      variant="outline"
                      style={{ borderRadius: "8px" }}
                      onClick={handleAddRow}
                    >
                      + Add Row
                    </CButton>
                  </div>
                  <div>
                    <CCard
                      className="rounded col-4 offset-md-7"
                      style={{ width: "35%" }}
                    >
                      <div className="form-group row mt-3">
                        <label
                          htmlFor="subTotal"
                          className="col-sm-5 col-form-label mt-2"
                        >
                          Sub Total ($)
                        </label>
                        <div className="col-sm-6 mt-2">
                          <Field
                            type="text"
                            name="subTotal"
                            disabled
                            className="form-control"
                            value={subTotalValue}
                            //  onChange={(e: any) => { handleChangeData(e); handleChange(e) }}
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label
                          htmlFor="discount"
                          className="col-sm-5 col-form-label"
                        >
                          Discount ($)
                        </label>
                        <div className="col-sm-6">
                          <Field
                            type="text"
                            name="discount"
                            disabled
                            value={discountValue}
                            className="form-control"
                            // onChange={(e: any) => { handleChangeData(e); handleChange(e) }}
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label
                          htmlFor="tax"
                          className="col-sm-5 col-form-label"
                        >
                          Tax ($)
                        </label>
                        <div className="col-sm-6">
                          <Field
                            type="text"
                            name="tax"
                            className="form-control"
                            onChange={(e: any) => {
                              handleChangeData(e);
                              handleChange(e);
                            }}
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label
                          htmlFor="adjustments"
                          className="col-sm-5 col-form-label"
                        >
                          Adjustments ($)
                        </label>
                        <div className="col-sm-6">
                          <Field
                            type="text"
                            name="adjustments"
                            className="form-control"
                            onChange={(e: any) => {
                              handleChangeData(e);
                              handleChange(e);
                            }}
                          />
                        </div>
                      </div>
                      <hr />
                      <div className="form-group row">
                        <label
                          htmlFor="grandTotal"
                          className="col-sm-5 col-form-label"
                        >
                          Grand Total ($)
                        </label>
                        <div className="col-sm-6">
                          <Field
                            type="text"
                            name="grandTotal"
                            value={grandTotalValue}
                            disabled
                            className="form-control"
                          />
                        </div>
                      </div>
                    </CCard>
                  </div>
                  <div
                    className="label-form"
                    style={{ marginLeft: "15px", paddingTop: "30px" }}
                  >
                    Terms & Conditions
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="terms&condition"
                      className="col-sm-3 col-form-label"
                    >
                      Terms & Condition
                    </label>
                    <div className="col-sm-9">
                      <CKEditor
                        editor={ClassicEditor}
                        data={termsAndConditions}
                        onChange={handleEditorChange}
                      />
                    </div>
                  </div>

                  <div className="label-form" style={{ marginLeft: "15px" }}>
                    Description
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="description"
                      className="col-sm-3  col-form-label"
                    >
                      Description
                    </label>
                    <div className="col-sm-9">
                      <Field
                        as="textarea"
                        name="description"
                        className="form-control"
                        style={{ height: "120px" }}
                        onChange={(e: any) => {
                          handleChangeData(e);
                          handleChange(e);
                        }}
                      />
                    </div>
                  </div>
                </div>

              <div className="text-end">
                <button className="btn btn-primary">Update</button>

                <button type="button" className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </Form>
          )}
          </Formik>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default EditInvoice;
