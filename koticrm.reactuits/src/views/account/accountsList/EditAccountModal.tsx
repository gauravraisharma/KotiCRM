import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Account } from "../../../models/account/Account";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateAccountRequest } from "../../../redux-saga/modules/account/action";

interface EditModalProps {
  closeModal: () => void;
  accountData: any;
  onBackToListButtonClickHandler: () => void;
}

const initialValues = {
  accountOwner: "",
  industry: 0,
  type: "",
  status: "",
  annualRevenue: "",
  accountName: "",
  phone: "",
  fax: "",
  website: "",
  billingStreet: "",
  billingCity: "",
  billingState: "",
  zipCode: "",
  country: "",
  description: "",
};
const EditPage: React.FC<EditModalProps> = ({
  closeModal,
  accountData,
  onBackToListButtonClickHandler,
}) => {
  const dispatch = useDispatch();
  const [touchedFields, setTouchedFields] = useState({
    accountOwner: false,
    industry: false,
    type: false,
    status: false,
    accountName: false,
    annualRevenue: false,
    phone: false,
    fax: false,
    website: false,
    billingStreet: false,
    billingCity: false,
    billingState: false,
    zipCode: false,
    country: false,
    description: false,
  });

  const handleInputChange = (fieldName: keyof typeof touchedFields) => {
    setTouchedFields((prevFields) => ({
      ...prevFields,
      [fieldName]: true, // Mark the field as touched
    }));
  };

  const validationSchema = Yup.object().shape({
    accountOwner: Yup.string().required("Required (Account Owner)"),
    industry: Yup.number().required("Required (Industry)"),
    type: Yup.number().required("Required (Type)"),
    status: Yup.number().required("Required (Status)"),
    accountName: Yup.string().required("Required (Account Name)"),
    annualRevenue: Yup.string().required("Required (Annual Revenue)"),
    phone: Yup.string()
      .required("Required (Phone)")
      .matches(/^[0-9()-\s]+$/, "Phone number must be a number")
      .min(10, "Phone number must be at least 10 digits")
      .max(
        13,
        "Phone number must be at most 13 digits with country calling code"
      ),

    billingStreet: Yup.string().required("Required (Billing Street)"),
    billingCity: Yup.string().required("Required (Billing City)"),
    billingState: Yup.string().required("Required (Billing State)"),
    zipCode: Yup.string()
      .required("Required (Zip Code)"),
      // .matches(/^\d+$/, "Zip Code must be a number")
      // .min(4, "Zip Code must be at least 4 digits")
      // .max(10, "Zip Code can have maximum 10 digits"),
    country: Yup.string().required("Required (Country)"),
    // description: Yup.string().required("Required (Description)"),
  });

  const [updateAccount, setUpdateAccount] = useState({
    accountOwner: accountData.ownerId,
    industry: accountData.industryId,
    type: accountData.type,
    status: accountData.status,
    accountName: accountData.accountName,
    annualRevenue: accountData.annualRevenue,
    phone: accountData.phone,
    fax: accountData.fax,
    website: accountData.webSite,
    billingStreet: accountData.billingStreet,
    billingCity: accountData.billingCity,
    billingState: accountData.billingState,
    zipCode: accountData.zipCode,
    country: accountData.country,
    description: accountData.description,
  });
  const handleChangeData = (e: any) => {
    setUpdateAccount({ ...updateAccount, [e.target.name]: e.target.value });
  };

  const currentDate: Date = new Date();
  const formattedDateTime: string = currentDate.toISOString().slice(0, -1);

  const handleEditClick = () => {
    const accountDetail: Account = {
      id: accountData.id,
      ownerId: updateAccount.accountOwner,
      industryId: parseInt(updateAccount.industry.toString(), 10),
      type: parseInt(updateAccount.type.toString(), 10),
      status: parseInt(updateAccount.status.toString(), 10),
      accountName: updateAccount.accountName,
      annualRevenue: updateAccount.annualRevenue,
      phone: updateAccount.phone,
      fax: updateAccount.fax,
      webSite: updateAccount.website,
      billingStreet: updateAccount.billingStreet,
      billingCity: updateAccount.billingCity,
      billingState: updateAccount.billingState,
      zipCode: updateAccount.zipCode,
      country: updateAccount.country,
      description: updateAccount.description,
      createdBy: accountData.createdBy,
      createdOn: accountData.createdOn,
      modifiedBy: updateAccount.accountOwner,
      modifiedOn: formattedDateTime,
      isactive: true,
      isdelete: false,
      currency: "",
    };
    dispatch(updateAccountRequest(accountDetail, accountData.id));
    closeModal();
  };
  //Fetching data from store
  const accountOwner = useSelector(
    (state: any) => state.accountReducer.accountOwner
  );
  const industry = useSelector((state: any) => state.sharedReducer.industries);
  const accountStatus = useSelector(
    (state: any) => state.accountReducer.accountStatus
  );
  const accountType = useSelector(
    (state: any) => state.accountReducer.accountType
  );

  return (
    <div>
      <CCard>
        <CCardHeader className="mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-0">
                <strong>Update Account</strong>
              </h5>
            </div>
            <div className="text-end">
              <CButton
                component="input"
                type="button"
                color="secondary"
                value="Back To Account"
                onClick={onBackToListButtonClickHandler}
              />
            </div>
          </div>
        </CCardHeader>
        <CCardBody>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleEditClick}
          >
            {({ handleChange, handleSubmit }) => (
              <Form>
                <CRow className="justify-content-between">
                  <CCol xs={6}>
                    <CRow className="mb-3">
                      <CCol sm={4}>
                        <label htmlFor="accountOwner">
                          Account Owner
                          <span style={{ color: "red", fontSize: "25px" }}>
                            *
                          </span>
                        </label>
                      </CCol>
                      <CCol sm={8}>
                        <Field
                          as="select"
                          name="accountOwner"
                          className="form-control form-select"
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                            handleInputChange("accountOwner");
                          }}
                          value={updateAccount.accountOwner}
                        >
                          <option value="">Select Account Owner</option>
                          {accountOwner?.map((owner: any) => (
                            <option key={owner.id} value={owner.id}>
                              {owner.label}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="accountOwner"
                          component="div"
                          className="error form-error"
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={4}>
                        <label htmlFor="industry">
                          Industry<span style={{ color: "red" }}>*</span>
                        </label>
                      </CCol>
                      <CCol sm={8}>
                        <Field
                          as="select"
                          name="industry"
                          className="form-control form-select"
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                          }}
                          value={updateAccount.industry}
                        >
                          <option value="">Select...</option>
                          {industry?.map((industry: any) => (
                            <option key={industry.id} value={industry.id}>
                              {industry.name}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="industry"
                          component="div"
                          className="error form-error"
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={4}>
                        <label htmlFor="type">
                          Type
                          <span style={{ color: "red", fontSize: "25px" }}>
                            *
                          </span>
                        </label>
                      </CCol>
                      <CCol sm={8}>
                        <Field
                          as="select"
                          name="type"
                          className="form-control form-select"
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                            handleInputChange("type");
                          }}
                          value={updateAccount.type}
                        >
                          <option value="">Select Type</option>
                          {accountType?.map((type: any) => (
                            <option key={type.value} value={type.value}>
                              {type.name}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="type"
                          component="div"
                          className="error form-error"
                        />
                      </CCol>
                    </CRow>

                    <CRow className="mb-3">
                      <CCol sm={4}>
                        <label htmlFor="status">
                          Status
                          <span style={{ color: "red", fontSize: "25px" }}>
                            *
                          </span>
                        </label>
                      </CCol>
                      <CCol sm={8}>
                        <Field
                          as="select"
                          name="status"
                          className="form-control form-select"
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                            handleInputChange("status");
                          }}
                          value={updateAccount.status}
                        >
                          <option value="">Select Status</option>
                          {accountStatus?.map((status: any) => (
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
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={4}>
                        <label htmlFor="accountName">
                          Account Name
                          <span style={{ color: "red", fontSize: "25px" }}>
                            *
                          </span>
                        </label>
                      </CCol>
                      <CCol sm={8}>
                        <Field
                          type="text"
                          value={updateAccount.accountName}
                          className="form-control"
                          name="accountName"
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleInputChange("accountName");
                            handleChangeData(e);
                            handleChange(e);
                          }}
                        />
                        <ErrorMessage
                          name="accountName"
                          component="div"
                          className="error form-error"
                        />
                      </CCol>
                    </CRow>

                    <CRow className="mb-3">
                      <CCol sm={4}>
                        <label htmlFor="annualRevenue">Annual Revenue</label>
                      </CCol>
                      <CCol sm={8}>
                        <Field
                          type="number"
                          value={updateAccount.annualRevenue}
                          className="form-control"
                          name="annualRevenue"
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                          }}
                        />
                        <ErrorMessage
                          name="annualRevenue"
                          component="div"
                          className="error form-error"
                        />
                      </CCol>
                    </CRow>

                    <CRow className="mb-3">
                      <CCol sm={4}>
                        <label htmlFor="number">
                          Phone
                          <span style={{ color: "red", fontSize: "25px" }}>
                            *
                          </span>
                        </label>
                      </CCol>
                      <CCol sm={8}>
                        <Field
                          type="phone"
                          name="phone"
                          value={updateAccount.phone}
                          className="form-control"
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                          }}
                        />
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="error form-error"
                        />
                      </CCol>
                    </CRow>
                  </CCol>
                  <CCol sm={6}>
                    <CRow className="mb-3">
                      <CCol sm={4}>
                        <label htmlFor="fax">Fax</label>
                      </CCol>
                      <CCol sm={8}>
                        <Field
                          type="text"
                          name="fax"
                          value={updateAccount.fax}
                          className="form-control"
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                          }}
                        />
                        <ErrorMessage
                          name="fax"
                          component="div"
                          className="error form-error"
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={4}>
                        <label htmlFor="website">
                          Website
                          <span style={{ color: "red", fontSize: "25px" }}>
                            *
                          </span>
                        </label>
                      </CCol>
                      <CCol sm={8}>
                        <Field
                          type="text"
                          className="form-control"
                          value={updateAccount.website}
                          name="website"
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                          }}
                        />
                        <ErrorMessage
                          name="website"
                          component="div"
                          className="error form-error"
                        />
                      </CCol>
                    </CRow>

                    <CRow className="mb-3">
                      <CCol sm={4}>
                        <label htmlFor="billingStreet">Billing Street</label>
                      </CCol>
                      <CCol sm={8}>
                        <Field
                          type="text"
                          name="billingStreet"
                          value={updateAccount.billingStreet}
                          className="form-control"
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                          }}
                        />
                        <ErrorMessage
                          name="billingStreet"
                          component="div"
                          className="error form-error"
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={4}>
                        <label htmlFor="billingCity">Billing City</label>
                      </CCol>
                      <CCol sm={8}>
                        <Field
                          type="text"
                          name="billingCity"
                          value={updateAccount.billingCity}
                          className="form-control"
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                          }}
                        />
                        <ErrorMessage
                          name="billingCity"
                          component="div"
                          className="error form-error"
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={4}>
                        <label htmlFor="billingState">Billing State</label>
                      </CCol>
                      <CCol sm={8}>
                        <Field
                          type="text"
                          name="billingState"
                          value={updateAccount.billingState}
                          className="form-control"
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                          }}
                        />
                        <ErrorMessage
                          name="billingState"
                          component="div"
                          className="error form-error"
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={4}>
                        <label htmlFor="zipCode">Zip Code</label>
                      </CCol>
                      <CCol sm={8}>
                        <Field
                          type="number"
                          name="zipCode"
                          value={updateAccount.zipCode}
                          className="form-control"
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                          }}
                        />
                        <ErrorMessage
                          name="zipCode"
                          component="div"
                          className="error form-error"
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={4}>
                        <label htmlFor="country">
                          Country
                          <span style={{ color: "red", fontSize: "25px" }}>
                            *
                          </span>
                        </label>
                      </CCol>
                      <CCol sm={8}>
                        <Field
                          type="text"
                          name="country"
                          value={updateAccount.country}
                          className="form-control form-select"
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                          }}
                        />
                        <ErrorMessage
                          name="country"
                          component="div"
                          className="error form-error"
                        />
                      </CCol>
                    </CRow>
                  </CCol>
                  <CCol xs={12}>
                    <CRow className="mb-3">
                      <CCol xs={2}>
                        <label htmlFor="country">Description</label>
                      </CCol>
                      <CCol xs={10}>
                        <textarea
                          id="description"
                          name="description"
                          className="form-control"
                           style={{ height: "100px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                          }}
                        />
                        {/* <ErrorMessage
                          name="description"
                          component="div"
                          className="invalid-feedback"
                        /> */}
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol sm={12} className="text-end">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleSubmit}
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => onBackToListButtonClickHandler()}
                    >
                      Cancel
                    </button>
                  </CCol>
                </CRow>
              </Form>
            )}
          </Formik>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default EditPage;
