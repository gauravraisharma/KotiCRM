import React, { ChangeEvent, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Account } from "../../../models/account/Account";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CButton, CCard, CCardBody, CCardHeader } from "@coreui/react";
import Countries from "../../../constants/country-state/countries+states.json";
import { Country } from "../../../models/Country-State/CountryState";
import * as Yup from "yup";
import "../../../css/style.css";
import Select from "react-select";
import { createAccountRequest } from "../../../redux-saga/modules/account/action";

const initialValues = {
  accountOwner: "",
  industry: "",
  type: "",
  status: "",
  accountName: "",
  annualRevenue: "",
  phone: "",
  fax: "",
  website: "",
  billingStreet: "",
  billingCity: "",
  billingState: "",
  billingCode: "",
  country: "",
  description: "",
};

interface MyFormProps {
  closeModal: () => void;
  onBackToListButtonClickHandler: () => void;
}

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
  fax: Yup.string()
    .required("Required (Fax)")
    .matches(/^[\d()-\s]{10}$/, "Fax number must be exactly 10 digits"),
  website: Yup.string()
    .required("Required (Website)")
    .url("Website must be a valid URL"),
  billingStreet: Yup.string().required("Required (Billing Street)"),
  billingCity: Yup.string().required("Required (Billing City)"),
  billingState: Yup.string().required("Required (Billing State)"),
  billingCode: Yup.string()
    .required("Required (Billing Code)")
    .matches(/^\d+$/, "Billing Code must be a number")
    .min(4, "Billing Code must be at least 4 digits")
    .max(10, "Billing Code can have maximum 10 digits"),
  country: Yup.string().required("Required (Country)"),
  description: Yup.string().required("Required (Description)"),
});

const MyForm: React.FC<MyFormProps> = ({
  closeModal,
  onBackToListButtonClickHandler,
}) => {
  // Country-State
  const countries: Country[] = Countries;
  // const [selectedAccountOwner, setSelectedAccountOwner] = useState('');

  const [selectedCountry, setSelectedCountry] = useState<string>("");
  //   const [selectedState, setSelectedState] = useState<string>("");
  // const [states, setStates] = useState<State[]>([]);

  const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value;
    setSelectedCountry(selectedCountry);

    // const selectedCountryObject = countries.find(
    //   (country) => country.name === selectedCountry
    // );

    console.log(selectedCountry);

    // if (selectedCountryObject) {
    //   setStates(selectedCountryObject.states);
    // } else {
    //   setStates([]);
    // }
  };

  // const handleDropdownChange = (selectedOption: any) => {
  // 	if (selectedOption) {
  // 		// Handle selection
  // 		setSelectedAccountOwner(selectedOption.key);
  // 	} else {
  // 		// Handle clearing
  // 		setSelectedAccountOwner(''); // or undefined
  // 	}
  // };
  const userId = useSelector((state: any) => state.authReducer.userId);
  const dispatch = useDispatch();

  const [account, setAccount] = useState({
    accountOwner: "",
    industry: 0,
    type: 0,
    status: 0,
    accountName: "",
    annualRevenue: "",
    phone: "",
    fax: "",
    currency: "",
    website: "",
    billingStreet: "",
    billingCity: "",
    billingState: "",
    billingCode: "",
    country: "",
    description: "",
  });
  const handleChangeData = (e: any) => {
    debugger;
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const currentDate: Date = new Date();
  const formattedDateTime = currentDate.toISOString().slice(0, -1);

  const handleCreateAccountClick = () => {
    debugger;
    const accountDetail: Account = {
      id: 0,
      ownerId: selectedAccountOwner,
      industryId: parseInt(account.industry.toString(), 10),
      type: parseInt(account.type.toString()),
      status: parseInt(account.status.toString()),
      accountName: account.accountName,
      annualRevenue: account.annualRevenue,
      phone: account.phone,
      fax: account.fax,
      currency: account.currency,
      webSite: account.website,
      billingStreet: account.billingStreet,
      billingCity: account.billingCity,
      billingState: account.billingState,
      billingCode: account.billingCode,
      country: account.country,
      description: account.description,
      createdBy: userId,
      createdOn: formattedDateTime,
      modifiedBy: userId,
      modifiedOn: formattedDateTime,
      isactive: true,
      isdelete: false,
    };

    dispatch(createAccountRequest(accountDetail));
    closeModal();
  };
  const accountOwner = useSelector(
    (state: any) => state.accountReducer.accountOwner
  );
  console.log(accountOwner);
  const industry = useSelector((state: any) => state.sharedReducer.industries);
  console.log(industry);
  const accountStatus = useSelector(
    (state: any) => state.accountReducer.accountStatus
  );
  console.log(accountStatus);
  const accountType = useSelector(
    (state: any) => state.accountReducer.accountType
  );
  console.log(accountType);
  const [selectedAccountOwner, setSelectedAccountOwner] = useState("");

  const handleDropdownChange = (selectedOption: any) => {
    debugger;
    if (selectedOption) {
      // Handle selection
      setSelectedAccountOwner(selectedOption.key);
    } else {
      // Handle clearing
      setSelectedAccountOwner(""); // or undefined
    }
  };

  return (
    <div>
      <ToastContainer />
      <CCard>
        <CCardHeader className="mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-0">Create Account</h5>
            </div>
            <div className="text-end">
              <CButton
                component="input"
                type="button"
                color="secondary"
                value="Back To Accounts"
                onClick={onBackToListButtonClickHandler}
              />
            </div>
          </div>
        </CCardHeader>
        <CCardBody>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleCreateAccountClick}
          >
            {({ errors, touched, handleChange, handleBlur, handleSubmit }) => (
              <Form>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label
                        className="col-sm-4 col-form-label"
                        htmlFor="accountOwner"
                      >
                        Account Owner
                        <span style={{ color: "red", fontSize: "25px" }}>
                          *
                        </span>
                      </label>
                      <div className="col-sm-8">
                        <Field name="accountOwner">
                          {(fieldProps: any) => (
                            <>
                              <Select
                                placeholder="Select Owner..."
                                name="accountOwner"
                                options={accountOwner?.map((owner: any) => ({
                                  key: owner.id,
                                  value: owner.firstName,
                                  label: (
                                    <>
                                      <div
                                        style={{ fontSize: "15px" }}
                                      >{`${owner.label}`}</div>
                                      <div style={{ fontSize: "12px" }}>
                                        {owner.email}
                                      </div>
                                    </>
                                  ),
                                }))}
                                defaultValue={selectedAccountOwner}
                                isSearchable={true}
                                isClearable={true}
                                onChange={(selectedOption: any) => {
                                  handleDropdownChange(selectedOption);
                                  fieldProps.form.setFieldValue(
                                    "accountOwner",
                                    selectedOption?.key,
                                    true
                                  );
                                }}
                                onBlur={handleBlur("accountOwner")}
                                className={`form-control ${
                                  touched.accountOwner && errors.accountOwner
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
                          name="accountOwner"
                          component="div"
                          className="error form-error"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        className="col-sm-4 col-form-label"
                        htmlFor="industry"
                      >
                        Industry<span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="col-sm-8">
                        <Field
                          as="select"
                          name="industry"
                          className={`form-control form-select ${
                            touched.industry && errors.industry
                              ? "border-danger"
                              : ""
                          }`}
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                          }}
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
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        className="col-sm-4 col-form-label"
                        htmlFor="status"
                      >
                        Status
                        <span style={{ color: "red", fontSize: "25px" }}>
                          *
                        </span>
                      </label>
                      <div className="col-sm-8">
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
                          <option value="">Select...</option>
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
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label" htmlFor="type">
                        Type
                        <span style={{ color: "red", fontSize: "25px" }}>
                          *
                        </span>
                      </label>
                      <div className="col-sm-8">
                        <Field
                          as="select"
                          name="type"
                          className={`form-control form-select ${
                            touched.type && errors.type ? "border-danger" : ""
                          }`}
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                          }}
                        >
                          <option value="" disabled style={{ color: "grey" }}>
                            Select...
                          </option>
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
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        className="col-sm-4 col-form-label"
                        htmlFor="phone"
                      >
                        Phone
                        <span style={{ color: "red", fontSize: "25px" }}>
                          *
                        </span>
                      </label>
                      <div className="col-sm-8">
                        <Field
                          type="text"
                          name="phone"
                          className={`form-control ${
                            touched.phone && errors.phone ? "is-invalid" : ""
                          }`}
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                          }}
                        />
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        className="col-sm-4 col-form-label"
                        htmlFor="accountName"
                      >
                        Account Name
                        <span style={{ color: "red", fontSize: "25px" }}>
                          *
                        </span>
                      </label>
                      <div className="col-sm-8">
                        <Field
                          type="text"
                          name="accountName"
                          className={`form-control ${
                            touched.accountName && errors.accountName
                              ? "is-invalid"
                              : ""
                          }`}
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                          }}
                        />
                        <ErrorMessage
                          name="accountName"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        className="col-sm-4 col-form-label"
                        htmlFor="annualRevenue"
                      >
                        Annual Revenue
                      </label>
                      <div className="col-sm-8">
                        <Field
                          type="text"
                          name="annualRevenue"
                          className={`form-control ${
                            touched.annualRevenue && errors.annualRevenue
                              ? "is-invalid"
                              : ""
                          }`}
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                          }}
                        />
                        <ErrorMessage
                          name="annualRevenue"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label" htmlFor="fax">
                        Fax
                      </label>
                      <div className="col-sm-8">
                        <Field
                          type="text"
                          name="fax"
                          className={`form-control ${
                            touched.fax && errors.fax ? "is-invalid" : ""
                          }`}
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                          }}
                        />
                        <ErrorMessage
                          name="fax"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        className="col-sm-4 col-form-label"
                        htmlFor="website"
                      >
                        Website
                        <span style={{ color: "red", fontSize: "25px" }}>
                          *
                        </span>
                      </label>
                      <div className="col-sm-8">
                        <Field
                          type="text"
                          name="website"
                          className={`form-control ${
                            touched.website && errors.website
                              ? "is-invalid"
                              : ""
                          }`}
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                          }}
                        />
                        <ErrorMessage
                          name="website"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        className="col-sm-4 col-form-label"
                        htmlFor="billingStreet"
                      >
                        Billing Street
                      </label>
                      <div className="col-sm-8">
                        <Field
                          type="text"
                          name="billingStreet"
                          className={`form-control ${
                            touched.billingStreet && errors.billingStreet
                              ? "is-invalid"
                              : ""
                          }`}
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                          }}
                        />
                        <ErrorMessage
                          name="billingStreet"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        className="col-sm-4 col-form-label"
                        htmlFor="billingCity"
                      >
                        Billing City
                      </label>
                      <div className="col-sm-8">
                        <Field
                          type="text"
                          name="billingCity"
                          className={`form-control ${
                            touched.billingCity && errors.billingCity
                              ? "is-invalid"
                              : ""
                          }`}
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                          }}
                        />
                        <ErrorMessage
                          name="billingCity"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        className="col-sm-4 col-form-label"
                        htmlFor="billingState"
                      >
                        Billing State
                      </label>
                      <div className="col-sm-8">
                        <Field
                          type="text"
                          name="billingState"
                          className={`form-control ${
                            touched.billingState && errors.billingState
                              ? "is-invalid"
                              : ""
                          }`}
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                          }}
                        />
                        <ErrorMessage
                          name="billingState"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        className="col-sm-4 col-form-label"
                        htmlFor="billingCode"
                      >
                        Billing Code
                      </label>
                      <div className="col-sm-8">
                        <Field
                          type="text"
                          name="billingCode"
                          className={`form-control ${
                            touched.billingCode && errors.billingCode
                              ? "is-invalid"
                              : ""
                          }`}
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleChangeData(e);
                            handleChange(e);
                          }}
                        />
                        <ErrorMessage
                          name="billingCode"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>

                    {/* <div className="form-group row">
                      <label
                        className="col-sm-4 col-form-label"
                        htmlFor="currency"
                      >
                        Currency
                      </label>
                      <div className="col-sm-6">
                      <Field
                          as="select"
                          id="country"
                          name="country"
                          type="text"
                          className={`form-control ${
                            touched.country && errors.country
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={(e: any) => {
                            handleCountryChange(e);
                            handleChange(e);
                          }}
                        >
                          <option value="">
                            {selectedCountry
                              ? selectedCountry
                              : "Select Country"}
                          </option>
                          {countries.map((country, index) => (
                            <option key={index} value={country.name}>
                              {country.name}
                            </option>
                          ))}
                        </Field>
                      
                        <ErrorMessage
                          name="currency"
                          component="div"
                          className="error form-error"
                        />
                      </div>
                    </div> */}

                    <div className="form-group row">
                      <label
                        className="col-sm-4 col-form-label"
                        htmlFor="country"
                      >
                        Country
                        <span style={{ color: "red", fontSize: "25px" }}>
                          *
                        </span>
                      </label>
                      <div className="col-sm-8">
                        <Field
                          as="select"
                          id="country"
                          name="country"
                          type="text"
                          className={`form-control  form-select ${
                            touched.country && errors.country
                              ? "is-invalid"
                              : ""
                          }`}
                          style={{ height: "50px" }}
                          onChange={(e: any) => {
                            handleCountryChange(e);
                            handleChange(e);
                          }}
                        >
                          <option value="">
                            {selectedCountry
                              ? selectedCountry
                              : "Select Country"}
                          </option>
                          {countries.map((country, index) => (
                            <option key={index} value={country.name}>
                              {country.name}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="country"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="country"
                    >
                      Description
                    </label>
                    <div className="col-sm-10">
                      <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        style={{ height: "120px" }}
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
                    </div>
                  </div>
                </div>
                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={() => handleSubmit}
                  >
                    Submit
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

export default MyForm;
