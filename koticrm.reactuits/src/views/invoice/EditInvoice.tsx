import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CFormTextarea,
  CTable,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Invoice,
  InvoiceClass,
  InvoiceCreationModel,
  InvoiceItem,
} from "../../models/invoice/Invoice";
import { useDispatch } from "react-redux";

import Select from "react-select";
import DatePicker from "react-datepicker";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import "react-datepicker/dist/react-datepicker.css";
import {
  clearInvoice,
  getInvoiceByIdRequest,
  updateInvoiceRequest,
} from "../../redux-saga/modules/invoice/action";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { MdDelete } from "react-icons/md";

interface newInvoiceProps {
  accountId: any;
  ownerId: any;
}

const EditInvoice: React.FC<newInvoiceProps> = () => {
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  interface Row {
    sNo: number;
    productName: string;
    description: string;
    quantity: number;
    discount: number;
    amount: number;
    total: number;
  }

  const [updateInvoice, setUpdateInvoice] = useState<Invoice>(
    new InvoiceClass()
  );
  const [termsAndConditions, setTermsAndConditions] = useState("");

  const [extraFields, setExtraFields] = useState({
    tax: 0,
    adjustments: 0,
  });
  const [toAddress, setToAddress] = useState({
    billingStreet: "",
    billingCity: "",
    billingState: "",
    zipCode: "",
    billingCountry: "",
  });
  const [dropdownItems, setDropdownItems] = useState({
    contactID: 0,
    accountID: 0,
    ownerID: "",
  });

  const [rows, setRows] = useState<InvoiceItem[]>([]);
  const [allRows, setAllRows] = useState<InvoiceItem[]>([]);


  const contactWithAccountNameListAndTotalCount = useSelector((state: any) => state.contactReducer.contacts);
  const contacts = contactWithAccountNameListAndTotalCount.contactWithAccountNames;
  const fetchedInvoice = useSelector((state: any) => state.invoiceReducer.invoice);
  console.log(fetchedInvoice)
  const invoice = fetchedInvoice?.invoice;
  const invoiceItems = fetchedInvoice?.invoiceItems;
  // const organization = useSelector((state: any) => state.sharedReducer.organization);
  const invoiceStatus = useSelector(
    (state: any) => state.invoiceReducer.invoiceStatus
  );
  const invoiceOwners = useSelector(
    (state: any) => state.invoiceReducer.invoiceOwner
  );
  const accountOwner = useSelector(
    (state: any) => state.accountReducer.accountOwner
  );
  const userId = useSelector((state: any) => state.authReducer.userId);
  const accountNames = useSelector(
    (state: any) => state.accountReducer.accounts
  );

  const currentDate: Date = new Date();
  const formattedDateTime: string = currentDate.toISOString().slice(0, -1);

  // const invoiceDate = new Date().toLocaleDateString("en-US", {
  //   year: "numeric",
  //   month: "long",
  //   day: "2-digit",
  // });

  useEffect(() => {
    if (invoiceId) {
      dispatch(getInvoiceByIdRequest(invoiceId));
    } else {
      setUpdateInvoice(new InvoiceClass());
      dispatch(clearInvoice());
    }
  }, [dispatch, invoiceId]);

  useEffect(() => {
    setDropdownItems({
      contactID: invoice.contactID,
      ownerID: invoice.ownerID,
      accountID: invoice.accountID,
    });
    if (invoiceId) {
      setUpdateInvoice(invoice);
      setRows(invoiceItems);
      setAllRows(invoiceItems)
    }
  }, [invoiceId, invoice, invoiceItems]);

  useEffect(() => {
    setUpdateInvoice((prevInvoice) => ({
      ...prevInvoice,
      toBillingStreet: toAddress?.billingStreet,
      toBillingCity: toAddress?.billingCity,
      toBillingState: toAddress?.billingState,
      toZipCode: toAddress?.zipCode,
      toBillingCountry: toAddress?.billingCountry,
    }));
  }, [toAddress]);

  const defaultOwner = invoiceOwners?.find(
    (dOwner) => dOwner.id === invoice?.ownerID
  );
  console.log(invoiceOwners);
  const defaultAccount = accountNames.account?.find(
    (dAccount) => dAccount.id === invoice?.accountID
  );
  const defaultContact = contacts?.find(
    (dContact) => dContact.id === invoice?.contactID
  );

  console.log(invoice);
  // useEffect(() => {
  //   dispatch(getOrganization());
  // }, [dispatch]);

  const handleAddRow = () => {
   
    const maxSno = Math.max(...rows.map(row => row.sno));

    const newRow: InvoiceItem = {
      sno: maxSno + 1,
      productName: "",
      description: "",
      quantity: 0,
      discount: 0,
      amount: 0,
      total: 0,
      tax :0,
      invoiceID :invoice?.id,
      id :0,
      isDeleted : false
    };
    setRows([...rows, newRow]);
  };

  const handleEditorChange = (e: any, editor: any) => {
    const data = editor.getData();
    setUpdateInvoice({ ...updateInvoice, termsAndConditions: data });
  };

  const [touchedFields, setTouchedFields] = useState({
    fromBillingStreet: false,
    fromBillingCity: false,
    fromBillingState: false,
    fromZipCode: false,
    fromBillingCountry: false,
    toBillingStreet: false,
    toBillingCity: false,
    toBillingState: false,
    toZipCode: false,
    toBillingCountry: false,
    dueDate: false,
    invoiceDate: false,
  });
  const handleInputChange = (fieldName: any) => {
    setTouchedFields((prevFields) => ({
      ...prevFields,
      [fieldName]: true, // Mark the field as touched
    }));
  };

  // var orgDetails;
  // if (organization) {
  //   const activeOrg = organization.filter(
  //     (org: any) => org.organizationResponse?.isActive === true
  //   );
  //   if (activeOrg && activeOrg.length > 0) {
  //     orgDetails = activeOrg[0]?.organizationResponse;
  //   }
  // }

  let grandTotalValue = 0;

  // const [updateInvoice, setUpdateInvoice] = useState({
  //   subject: "",
  //   invoiceDate: new Date(),
  //   dueDate: new Date(),
  //   dealName: "",
  //   purchaseOrder: "",
  //   status: 0,

  //   fromBillingStreet: orgDetails?.billingStreet,
  //   fromBillingCity: orgDetails?.billingCity,
  //   fromBillingState: orgDetails?.billingState,
  //   fromZipCode: orgDetails?.zipCode,
  //   fromBillingCountry: orgDetails?.billingCountry,

  //   toBillingStreet: "",
  //   toBillingCity: "",
  //   toBillingState: "",
  //   toZipCode: "",
  //   toBillingCountry: "",

  //   termsandConditions: "",
  //   description: "",
  //   subTotal: 0,
  //   discount: 0,
  //   tax: 0,
  //   adjustments: 0,
  //   grandTotal: grandTotalValue,
  // });

  const validationSchema = Yup.object().shape({
    accountID: Yup.string().required("Required (Account)"),
    ownerID: Yup.string().required("Required (Invoice Owner)"),
    subject: Yup.string().required("Required(Subject)"),
    contactID: Yup.number().required("Required (Contacts)"),
    // invoiceDate: touchedFields.invoiceDate
    //   ? Yup.string().required("Required (Due Date)")
    //   : Yup.string(),
    // dueDate: touchedFields.dueDate
    //   ? Yup.string().required("Required (Due Date)")
    //   : Yup.string(),
    // status: Yup.string().required("Required (Status)"),
    // fromBillingStreet: touchedFields.fromBillingStreet
    //   ? Yup.string().required("Required (Billing Street)")
    //   : Yup.string(),
    // fromBillingCity: touchedFields.fromBillingCity
    //   ? Yup.string().required("Required (Billing City)")
    //   : Yup.string(),
    // fromBillingState: touchedFields.fromBillingState
    //   ? Yup.string().required("Required (Billing State)")
    //   : Yup.string(),
    // fromZipCode: touchedFields.fromZipCode
    //   ? Yup.string()
    //     .required("Required (zip Code)")
    //   : Yup.string(),
    // fromBillingCountry: touchedFields.fromBillingCountry
    //   ? Yup.string().required("Required (Billing Country)")
    //   : Yup.string(),
    // toBillingStreet:
    //   updateInvoice.toBillingStreet == ""
    //     ? Yup.string().required("Required (Billing Street)")
    //     : touchedFields.toBillingStreet
    //       ? Yup.string().required("Required (Billing Street)")
    //       : Yup.string(),
    // toBillingCity:
    //   updateInvoice.toBillingCity == ""
    //     ? Yup.string().required("Required (Billing City)")
    //     : touchedFields.toBillingCity
    //       ? Yup.string().required("Required (Billing City)")
    //       : Yup.string(),
    // toBillingState:
    //   updateInvoice.toBillingState == ""
    //     ? Yup.string().required("Required (Billing State)")
    //     : touchedFields.toBillingState
    //       ? Yup.string().required("Required (Billing State)")
    //       : Yup.string(),
    // toZipCode:
    //   updateInvoice.toZipCode == ""
    //     ? Yup.string().required("Required (zip Code)")
    //     : Yup.string(),
    // toBillingCountry:
    //   updateInvoice.toBillingCountry == ""
    //     ? Yup.string().required("Required (Billing Country)")
    //     : touchedFields.toBillingCountry
    //       ? Yup.string().required("Required (Billing Country)")
    //       : Yup.string(),
  });

  const handleDropdownChange = (e: any, selectedOption: any) => {
    if (e != null) {
      setDropdownItems({ ...dropdownItems, [selectedOption.name]: e.key });
      if (selectedOption.name == "accountID") {
        const accountAddress = accountNames.account?.find(
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

  const subTotalValue = rows.reduce((total, row) => {
    // Parse row.amount and row.quantity to numbers, defaulting to 0 if NaN
    const amount = row.amount || 0;
    const quantity = row.quantity || 0;

    return total + amount * quantity;
  }, 0);

  const discountValue = rows.reduce((discount, row) => {
    const rowDiscount = row.discount || 0;
    return discount + rowDiscount;
  }, 0);

  grandTotalValue =
    subTotalValue - discountValue + extraFields.tax - extraFields.adjustments;

  const handleChangeData = (e: any) => {
    setUpdateInvoice({ ...updateInvoice, [e.target.name]: e.target.value });
  };

    //handle delete invoice item
    const handleDeleteClick =( invoiceItemId :any)=>{
      debugger
     const updatedRows = rows.map((row) =>
        row.id === invoiceItemId ? { ...row, isDeleted: true } : row
      );
      setAllRows(updatedRows)
      setRows(updatedRows.filter((row) => row.id !== invoiceItemId));
  
    }
  const handleUpdateInvoiceClick = () => {
    const invoiceDetails: Invoice = {
      id: updateInvoice.id,
      accountID: dropdownItems.accountID,
      ownerID: dropdownItems.ownerID,
      subject: updateInvoice.subject,
      invoiceDate: updateInvoice.invoiceDate
        ? new Date(updateInvoice.invoiceDate).toISOString()
        : "",
      dueDate: updateInvoice.dueDate
        ? new Date(updateInvoice.dueDate).toISOString()
        : "",
      contactID: dropdownItems.contactID,
      dealName: updateInvoice.dealName,
      purchaseOrder: updateInvoice.purchaseOrder,
      status: parseInt(updateInvoice.status.toString(), 10),
      fromBillingStreet: updateInvoice.fromBillingStreet,
      fromBillingCity: updateInvoice.fromBillingCity,
      fromBillingState: updateInvoice.fromBillingState,
      fromZipCode: updateInvoice.fromZipCode,
      fromBillingCountry: updateInvoice.fromBillingCountry,
      toBillingStreet: updateInvoice.toBillingStreet,
      toBillingCity: updateInvoice.toBillingCity,
      toBillingState: updateInvoice.toBillingState,
      toZipCode: updateInvoice.toZipCode,
      toBillingCountry: updateInvoice.toBillingCountry,
      termsAndConditions: updateInvoice.termsAndConditions,
      description: updateInvoice.description,
      isDelete: false,
      createdBy: userId,
      createdOn: formattedDateTime,
      modifiedBy: userId,
      modifiedOn: formattedDateTime,
    };
    
    const invoiceItemsDetails: InvoiceItem[] = allRows.map((row) => ({
      id: row.id,
      invoiceID: row.invoiceID,
      sno: row.sno,
      productName: row.productName,
      description: row.description,
      quantity: row.quantity,
      amount: row.amount,
      discount: row.discount,
      tax: row.tax,
      total: row.total,
      isDeleted : row.isDeleted
    }));

    const invoiceModel: InvoiceCreationModel = {
      invoice: invoiceDetails,
      invoiceItems: invoiceItemsDetails,
    };

    dispatch(updateInvoiceRequest(invoiceModel));
    navigate("/invoices");
    // console.log(rows);
  };

  const getAccountOwner = (ownerId: any) => {
    const owner = accountOwner?.find((owner: any) => owner.id === ownerId);
    return owner ? owner.label : "";
  };

  const calculateTotal = (row: any) => {
    const amount = row.amount || 0;
    const discount = row.discount || 0;
    const quantity = row.quantity || 0;
    return (amount - discount) * quantity;
  };



  return (
    <div>
      {/* <ToastContainer /> */}
      <CCard>
        <CCardHeader className="mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-0">Edit Invoice</h5>
            </div>
            <div className="text-end">
              <CButton
                component="input"
                type="button"
                color="secondary"
                value="Back To Invoices"
                onClick={() => navigate("/invoices")}
              />
            </div>
          </div>
        </CCardHeader>
        <CCardBody>
          <Formik
            initialValues={updateInvoice}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={handleUpdateInvoiceClick}
          >
            {({ handleSubmit, handleChange, touched, errors, handleBlur }) => (
              <Form onSubmit={handleSubmit}>
                <div className="label-form">Invoice Information</div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label
                        htmlFor="ownerID"
                        className="col-sm-4 col-form-label"
                      >
                        Invoice Owner
                        <span style={{ color: "red", fontSize: "25px" }}>
                          *
                        </span>
                      </label>
                      <div className="col-sm-6">
                        <Field name="ownerID">
                          {(fieldProps: any) => (
                            <>
                              <Select
                                placeholder="Select Owner..."
                                id="ownerID"
                                name="ownerID"
                                options={invoiceOwners?.map((owner: any) => ({
                                  key: owner.id,
                                  value: owner.firstName,
                                  label: (
                                    <>
                                      <div style={{ fontSize: "15px" }}>
                                        {owner.label}
                                      </div>
                                      <div style={{ fontSize: "12px" }}>
                                        {owner.email}
                                      </div>
                                    </>
                                  ),
                                }))}
                                defaultValue={{
                                  value: defaultOwner?.firstName,
                                  label: `${defaultOwner?.label} (${defaultOwner?.email})`,
                                }}
                                isSearchable={true}
                                isClearable={true}
                                onChange={(e: any, selectedOption: any) => {
                                  handleDropdownChange(e, selectedOption);
                                  fieldProps.form.setFieldValue(
                                    "ownerID",
                                    e?.key,
                                    true
                                  );
                                }}
                                onBlur={handleBlur("ownerID")}
                                className={`form-control ${
                                  touched.ownerID && errors.ownerID
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
                          name="ownerID"
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
                        <span style={{ color: "red", fontSize: "25px" }}>
                          *
                        </span>
                      </label>
                      <div className="col-sm-6">
                        <Field
                          type="text"
                          name="subject"
                          value={updateInvoice.subject}
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
                                selected={updateInvoice.invoiceDate || null}
                                // style={{ height: "50px" }}
                                onChange={(date: any) => {
                                  handleChangeData({
                                    target: {
                                      name: "invoiceDate",
                                      value: date,
                                    },
                                  });
                                  fieldProps.form.setFieldValue(
                                    "invoiceDate",
                                    date,
                                    true
                                  );
                                }}
                                dateFormat="MMM d, yyyy"
                                className={`form-control ${
                                  touched.invoiceDate && errors.invoiceDate
                                    ? "border-danger"
                                    : ""
                                }`}
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
                                selected={updateInvoice.dueDate || null}
                                // style={{ height: "50px" }}
                                onChange={(date: any) => {
                                  handleChangeData({
                                    target: { name: "dueDate", value: date },
                                  });
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
                        htmlFor="accountID"
                        className="col-sm-4 col-form-label"
                      >
                        Account
                        <span style={{ color: "red", fontSize: "25px" }}>
                          *
                        </span>
                      </label>
                      <div className="col-sm-6">
                        <Field name="accountID">
                          {(fieldProps: any) => (
                            <>
                              <Select
                                name="accountID"
                                options={accountNames.account?.map(
                                  (name: any) => ({
                                    key: name.id,
                                    value: name.id,
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
                                  })
                                )}
                                defaultValue={{
                                  value: defaultAccount?.id,
                                  label: `${
                                    defaultAccount?.accountName
                                  } (${getAccountOwner(
                                    defaultAccount?.ownerId
                                  )})`,
                                }}
                                isSearchable
                                isClearable
                                onChange={(e: any, selectedOption: any) => {
                                  handleDropdownChange(e, selectedOption);
                                  fieldProps.form.setFieldValue(
                                    "accountID",
                                    e?.key,
                                    true
                                  );
                                }}
                                onBlur={handleBlur("accountID")}
                                placeholder="Select account..."
                                className={`form-control ${
                                  touched.accountID && errors.accountID
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
                          name="accountID"
                          component="div"
                          className="error form-error"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    {/* <div className="form-group row">
                      <label
                        htmlFor="contactID"
                        className="col-sm-4 col-form-label"
                      >
                        Contacts
                        <span style={{ color: "red", fontSize: "25px" }}>*</span>
                      </label>
                      <div className="col-sm-6">
                        <Field name="contactID">
                          {(fieldProps: any) => (
                            <>
                              <Select
                                name="contactID"
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
                                defaultValue={{ value: defaultContact?.firstName, label: `${defaultContact?.firstName} (${defaultContact?.email})` }}
                                isSearchable
                                isClearable
                                onChange={(e: any, selectedOption: any) => {
                                  handleDropdownChange(e, selectedOption);
                                  fieldProps.form.setFieldValue(
                                    "contactID",
                                    e?.key,
                                    true
                                  );
                                }}
                                onBlur={handleBlur("accountName")}
                                placeholder="Select contact..."
                                className={`form-control ${touched.contactID && errors.contactID
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
                          name="contactID"
                          component="div"
                          className="error form-error"
                        />
                      </div>
                    </div> */}
                    <div className="form-group row">
                      <label
                        htmlFor="contactID"
                        className="col-sm-4 col-form-label"
                      >
                        Contacts
                        <span style={{ color: "red", fontSize: "25px" }}>
                          *
                        </span>
                      </label>
                      <div className="col-sm-6">
                        <Field name="contactID">
                          {({ field, form }) => (
                            <>
                              <Select
                                name="contactID"
                                options={contacts?.map((contact) => ({
                                  value: contact.id,
                                  label: `${contact.firstName} ${contact.lastName}`,
                                }))}
                                defaultValue={{
                                  value: defaultContact?.id,
                                  label: `${defaultContact?.firstName} ${defaultContact?.lastName}`,
                                }}
                                isSearchable
                                isClearable
                                onChange={(selectedOption, actionMeta) => {
                                  handleDropdownChange(
                                    selectedOption,
                                    actionMeta
                                  );
                                  form.setFieldValue(
                                    "contactID",
                                    selectedOption?.value
                                  );
                                }}
                                onBlur={handleBlur("contactID")}
                                placeholder="Select contact..."
                                className={`form-control ${
                                  touched.contactID && errors.contactID
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
                              <ErrorMessage
                                name="contactID"
                                component="div"
                                className="error form-error"
                              />
                            </>
                          )}
                        </Field>
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
                          value={updateInvoice.fromBillingStreet}
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
                          value={updateInvoice.fromBillingCity}
                          className={`form-control  ${
                            touched.fromBillingCity && errors.fromBillingCity
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
                          value={updateInvoice.fromBillingState}
                          className={`form-control  ${
                            touched.fromBillingState && errors.fromBillingState
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
                          value={updateInvoice.fromZipCode}
                          className={`form-control  ${
                            touched.fromZipCode && errors.fromZipCode
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
                          value={updateInvoice.fromBillingCountry}
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
                              ? updateInvoice.toBillingStreet
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
                              ? updateInvoice.toBillingCity
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
                              ? updateInvoice.toBillingState
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
                              ? updateInvoice.toZipCode
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
                              ? updateInvoice.toBillingCountry
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
                            <CTableHeaderCell>Actions</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        {rows.map((row, index) => (
                          <CTableRow key={index}>
                            <CTableDataCell>{row.sno}</CTableDataCell>
                            <CTableDataCell width={250}>
                              <div style={{ margin: "5px" }}>
                                <input
                                  type="text"
                                  className="form-control mb-2"
                                  value={row.productName}
                                  placeholder="Item name"
                                  onChange={(e) => {
                                    const updatedRows = [...rows];
                                    updatedRows[index].productName =
                                      e.target.value;
                                    setRows(updatedRows);
                                    setAllRows(updatedRows)
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
                                   setAllRows(updatedRows)

                                  }}
                                />
                              </div>
                            </CTableDataCell>

                            <CTableDataCell>
                              <div>
                                <input
                                  type="number"
                                  className="form-control"
                                  value={row.quantity}
                                  onChange={(e) => {
                                    const updatedRows = [...rows];
                                    const newValue = parseFloat(e.target.value);
                                    if (!isNaN(newValue)) {
                                      updatedRows[index].quantity = newValue;
                                      updatedRows[index].total = calculateTotal(
                                        updatedRows[index]
                                      );
                                      // console.log("Updated rows:", updatedRows); // Log updated rows
                                      setRows(updatedRows);
                                      setAllRows(updatedRows)
                                    } else {
                                      console.error(
                                        "Invalid input value:",
                                        e.target.value
                                      );
                                    }
                                  }}
                                />
                              </div>
                            </CTableDataCell>
                            <CTableDataCell>
                              <div>
                                <input
                                  type="number"
                                  className="form-control"
                                  value={row.discount}
                                  onChange={(e) => {
                                    const updatedRows = [...rows];
                                    updatedRows[index].discount = parseFloat(
                                      e.target.value
                                    );
                                    updatedRows[index].total = calculateTotal(
                                      updatedRows[index]
                                    );
                                    setRows(updatedRows);
                                    setAllRows(updatedRows)
                                  }}
                                />
                              </div>
                            </CTableDataCell>
                            <CTableDataCell>
                              <div>
                                <input
                                  type="number"
                                  className="form-control"
                                  value={row.amount}
                                  onChange={(e) => {
                                    const updatedRows = [...rows];
                                    updatedRows[index].amount = parseFloat(
                                      e.target.value
                                    );
                                    updatedRows[index].total = calculateTotal(
                                      updatedRows[index]
                                    );
                                    setRows(updatedRows);
                                    setAllRows(updatedRows)
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
                            <CTableDataCell>
                            <MdDelete
                                style={{
                                  color: "red",
                                  fontSize: "40px",
                                  cursor: "pointer",
                                 marginLeft:"10px"
                                }}
                                className="text-danger"
                                onClick={() => handleDeleteClick( row.id)}
                              />
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
                        data={updateInvoice?.termsAndConditions}
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

                <div className="text-end mt-3">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={() => handleSubmit}
                  >
                    Update Invoice
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary ms-1"
                    onClick={() => navigate("/invoices")}
                  >
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
