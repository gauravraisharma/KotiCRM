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
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import {
  Invoice,
  InvoiceCreationModel,
  InvoiceItem,
} from "../../models/invoice/Invoice";
import { useDispatch } from "react-redux";

import Select from "react-select";
import DatePicker from "react-datepicker";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import "react-datepicker/dist/react-datepicker.css";
import { getOrganization } from "../../redux-saga/modules/shared/action";
import { createInvoiceRequest } from "../../redux-saga/modules/invoice/action";
import { ToastContainer, toast } from "react-toastify";

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
  // termsandConditions: "",
  // description: "",
  tax: "",
  adjustments: "",
};

interface newInvoiceProps {
  onBackToListButtonClickHandler: () => void;
  closeModal: () => void;
  accountId: any;
  ownerId: any;
}

const NewInvoice: React.FC<newInvoiceProps> = ({
  closeModal,
  onBackToListButtonClickHandler,
}) => {
  const dispatch = useDispatch();

  const contactWithAccountNameListAndTotalCount = useSelector((state: any) => state.contactReducer.contacts);
  const contacts = contactWithAccountNameListAndTotalCount.contactWithAccountNames;
  const invoiceStatus = useSelector(
    (state: any) => state.invoiceReducer.invoiceStatus
  );
  const invoiceOwner = useSelector(
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

  const invoiceDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  const [termsAndConditions, setTermsAndConditions] = useState("");

  const handleEditorChange = (event: any, editor: any) => {
    const data = editor.getData();
    setTermsAndConditions(data);
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

  const organization = useSelector(
    (state: any) => state.sharedReducer.organization
  );
  var orgDetails;
  if (organization) {
    const activeOrg = organization.filter(
      (org: any) => org.organizationResponse?.isActive === true
    );
    if (activeOrg && activeOrg.length > 0) {
      orgDetails = activeOrg[0]?.organizationResponse;
    }
  }
  var grandTotalValue = 0;

  const [invoice, setInvoice] = useState({
    subject: "",
    invoiceDate: new Date(),
    dueDate: new Date(),
    dealName: "",
    purchaseOrder: "",
    status: 0,

    fromBillingStreet: orgDetails?.billingStreet,
    fromBillingCity: orgDetails?.billingCity,
    fromBillingState: orgDetails?.billingState,
    fromZipCode: orgDetails?.zipCode,
    fromBillingCountry: orgDetails?.billingCountry,

    toBillingStreet: "",
    toBillingCity: "",
    toBillingState: "",
    toZipCode: "",
    toBillingCountry: "",

    description: "",
    subTotal: 0,
    discount: 0,
    tax: 0,
    adjustments: 0,
    grandTotal: grandTotalValue,
  });
  const validationSchema = Yup.object().shape({
    invoiceOwner: Yup.string().required("Required (Invoice Owner)"),
    subject: Yup.string().required("Required(Subject)"),
    invoiceDate: touchedFields.invoiceDate
      ? Yup.string().required("Required (Due Date)")
      : Yup.string(),
    dueDate: touchedFields.dueDate
      ? Yup.string().required("Required (Due Date)")
      : Yup.string(),
    accountName: Yup.string().required("Required (Account)"),
    contacts: Yup.string().required("Required (Contacts)"),
    status: Yup.string().required("Required (Status)"),
    fromBillingStreet: touchedFields.fromBillingStreet
      ? Yup.string().required("Required (Billing Street)")
      : Yup.string(),
    fromBillingCity: touchedFields.fromBillingCity
      ? Yup.string().required("Required (Billing City)")
      : Yup.string(),
    fromBillingState: touchedFields.fromBillingState
      ? Yup.string().required("Required (Billing State)")
      : Yup.string(),
    fromZipCode: touchedFields.fromZipCode
      ? Yup.string()
        .required("Required (zip Code)")
      : Yup.string(),
    fromBillingCountry: touchedFields.fromBillingCountry
      ? Yup.string().required("Required (Billing Country)")
      : Yup.string(),
    toBillingStreet:
      invoice.toBillingStreet == ""
        ? Yup.string().required("Required (Billing Street)")
        : touchedFields.toBillingStreet
          ? Yup.string().required("Required (Billing Street)")
          : Yup.string(),
    toBillingCity:
      invoice.toBillingCity == ""
        ? Yup.string().required("Required (Billing City)")
        : touchedFields.toBillingCity
          ? Yup.string().required("Required (Billing City)")
          : Yup.string(),
    toBillingState:
      invoice.toBillingState == ""
        ? Yup.string().required("Required (Billing State)")
        : touchedFields.toBillingState
          ? Yup.string().required("Required (Billing State)")
          : Yup.string(),
    toZipCode:
      invoice.toZipCode == ""
        ? Yup.string().required("Required (zip Code)")
        : Yup.string(),
    toBillingCountry:
      invoice.toBillingCountry == ""
        ? Yup.string().required("Required (Billing Country)")
        : touchedFields.toBillingCountry
          ? Yup.string().required("Required (Billing Country)")
          : Yup.string(),
  });

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

  useEffect(() => {
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      toBillingStreet: toAddress?.billingStreet,
      toBillingCity: toAddress?.billingCity,
      toBillingState: toAddress?.billingState,
      toZipCode: toAddress?.zipCode,
      toBillingCountry: toAddress?.billingCountry,
    }));
  }, [toAddress]);

  useEffect(() => {
    dispatch(getOrganization());
  }, [dispatch]);

  interface Row {
    sNo: number;
    productName: string;
    description: string;
    quantity: number;
    discount: number;
    amount: number;
    total: number;
  }

  const [rows, setRows] = useState<Row[]>([]);

  const handleAddRow = () => {
    const newRow: Row = {
      sNo: rows.length + 1,
      productName: "",
      description: "",
      quantity: 0,
      discount: 0,
      amount: 0,
      total: 0,
    };
    setRows([...rows, newRow]);
  };

  const subTotalValue = rows.reduce((total, row) => {
    // Parse row.amount and row.quantity to numbers, defaulting to 0 if NaN
    const amount = row.amount || 0;
    const quantity = row.quantity || 0;

    return total + amount * quantity;
  }, 0);

  const discountValue = rows.reduce((discount, row) => {
    const rowDiscount = row.discount || 0
    return discount + rowDiscount;
  }, 0);

  grandTotalValue =
    subTotalValue -
    discountValue +
    parseFloat(invoice.tax.toString()) -
    parseFloat(invoice.adjustments.toString());

  const handleChangeData = (e: any) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };

  const handleCreateInvoiceClick = () => {
    const invoiceDetails: Invoice = {
      id: 0,
      ownerID: dropdownItems.invoiceOwner,
      accountID: parseInt(dropdownItems.accountName, 10),
      subject: invoice.subject,
      invoiceDate: invoice.invoiceDate ? new Date(invoice.invoiceDate).toISOString() : "",
      dueDate: invoice.dueDate ? new Date(invoice.dueDate).toISOString() : "",
      contactID: parseInt(dropdownItems.contacts, 10),
      dealName: invoice.dealName,
      purchaseOrder: invoice.purchaseOrder,
      status: parseInt(invoice.status.toString(), 10),
      fromBillingStreet: invoice.fromBillingStreet,
      fromBillingCity: invoice.fromBillingCity,
      fromBillingState: invoice.fromBillingState,
      fromZipCode: invoice.fromZipCode,
      fromBillingCountry: invoice.fromBillingCountry,
      toBillingStreet: invoice.toBillingStreet,
      toBillingCity: invoice.toBillingCity,
      toBillingState: invoice.toBillingState,
      toZipCode: invoice.toZipCode,
      toBillingCountry: invoice.toBillingCountry,
      termsAndConditions: termsAndConditions,
      description: invoice.description,
      isDelete: false,
      createdBy: userId,
      createdOn: formattedDateTime,
      modifiedBy: userId,
      modifiedOn: formattedDateTime,
    };
    const invoiceItemDetails: InvoiceItem[] = rows.map((row) => {
      return {
        id: 0,
        invoiceID: 0,
        sno: row.sNo,
        productName: row.productName,
        description: row.description,
        quantity: row.quantity,
        discount: row.discount,
        amount: row.amount,
        tax: parseFloat(invoice.tax.toString()),
        total: row.total,
      };
    });
    if (invoiceItemDetails.length === 0) {
      toast.warn("You need to add item to the invoice");
      return;
    }
    const invoiceModel: InvoiceCreationModel = {
      invoice: invoiceDetails,
      invoiceItems: invoiceItemDetails,
    };
    dispatch(createInvoiceRequest(invoiceModel));
    closeModal();
  };

  const getAccountOwner = (ownerId: any) => {
    const owner = accountOwner?.find((owner: any) => owner.id === ownerId);
    return owner ? owner.label : "";
  };

  const calculateTotal = (row: any) => {
    const amount = row.amount || 0;
    const discount = row.discount || 0;
    const quantity = row.quantity || 0;
    return (amount * quantity - discount);
  };

  const { handleSubmit } = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleCreateInvoiceClick,
  });

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
                color="secondary"
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
            {({ handleChange, touched, errors, handleBlur }) => (
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
                        <span style={{ color: "red", fontSize: "25px" }}>
                          *
                        </span>
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
                                className={`form-control ${touched.invoiceOwner && errors.invoiceOwner
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
                        <span style={{ color: "red", fontSize: "25px" }}>
                          *
                        </span>
                      </label>
                      <div className="col-sm-6">
                        <Field
                          type="text"
                          name="subject"
                          className={`form-control ${touched.subject && errors.subject
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
                                className={`form-control ${touched.invoiceDate && errors.invoiceDate
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
                                className={`form-control ${touched.dueDate && errors.dueDate
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
                        <span style={{ color: "red", fontSize: "25px" }}>
                          *
                        </span>
                      </label>
                      <div className="col-sm-6">
                        <Field name="accountName">
                          {(fieldProps: any) => (
                            <>
                              <Select
                                name="accountName"
                                options={accountNames.account?.map((name: any) => ({
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
                                className={`form-control ${touched.accountName && errors.accountName
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
                        <span style={{ color: "red", fontSize: "25px" }}>
                          *
                        </span>
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
                                className={`form-control ${touched.contacts && errors.contacts
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
                        <span style={{ color: "red", fontSize: "25px" }}>
                          *
                        </span>
                      </label>
                      <div className="col-sm-6">
                        <Field
                          as="select"
                          name="status"
                          className={`form-control form-select ${touched.status && errors.status
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
                          className={`form-control  ${touched.fromBillingStreet &&
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
                          className={`form-control  ${touched.fromBillingCity && errors.fromBillingCity
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
                          className={`form-control  ${touched.fromBillingState && errors.fromBillingState
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
                          className={`form-control  ${touched.fromZipCode && errors.fromZipCode
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
                        <span style={{ color: "red", fontSize: "25px" }}>
                          *
                        </span>
                      </label>
                      <div className="col-sm-6">
                        <Field
                          type="text"
                          name="fromBillingCountry"
                          value={invoice.fromBillingCountry}
                          className={`form-control  ${touched.fromBillingCountry &&
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
                        <span style={{ color: "red", fontSize: "25px" }}>
                          *
                        </span>
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
                          className={`form-control  ${touched.toBillingStreet && errors.toBillingStreet
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
                        <span style={{ color: "red", fontSize: "25px" }}>
                          *
                        </span>
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
                          className={`form-control  ${touched.toBillingCity && errors.toBillingCity
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
                        <span style={{ color: "red", fontSize: "25px" }}>
                          *
                        </span>
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
                          className={`form-control  ${touched.toBillingState && errors.toBillingState
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
                        <span style={{ color: "red", fontSize: "25px" }}>
                          *
                        </span>
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
                          className={`form-control  ${touched.toZipCode && errors.toZipCode
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
                        <span style={{ color: "red", fontSize: "25px" }}>
                          *
                        </span>
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
                          className={`form-control  ${touched.toBillingCountry && errors.toBillingCountry
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
                                  placeholder="Item name"
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
                                  type="number"
                                  className="form-control"
                                  value={row.quantity}
                                  onChange={(e) => {
                                    const updatedRows = [...rows];
                                    const newValue = parseFloat(e.target.value);
                                    if (!isNaN(newValue)) {
                                      updatedRows[index].quantity = newValue;
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
                                  type="number"
                                  className="form-control"
                                  value={row.discount}
                                  onChange={(e) => {
                                    const updatedRows = [...rows];
                                    updatedRows[index].discount = parseFloat(e.target.value);
                                    updatedRows[index].total = calculateTotal(updatedRows[index]);
                                    setRows(updatedRows);
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
                                    updatedRows[index].amount = parseFloat(e.target.value);
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
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={() => handleSubmit}
                  >
                    Create Invoice
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => onBackToListButtonClickHandler()}
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

export default NewInvoice;