import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ChangeEvent, useEffect, useState } from "react";
import * as Yup from "yup";
import { Contact, ContactClass } from "../../models/contact/Contact";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchDropdown from "../../components/base/select/SearchDropdown";

import Countries from "../../constants/country-state/countries+states.json";
import { Country, State } from "../../models/Country-State/CountryState";
import {
  clearContact,
  createContact,
  getContactById,
  updateContact,
} from "../../redux-saga/modules/contact/action";
import { ToastContainer } from "react-toastify";

const CreateOrEditContact = () => {
  const { contactId } = useParams<{ contactId: string }>();
  const [contact, setContact] = useState<Contact>(new ContactClass());
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchedContact = useSelector(
    (state: any) => state.contactReducer.contact
  );
  const fetchedAccountOwners = useSelector(
    (state: any) => state.accountReducer.accountOwner
  );
  const fetchedAccount = useSelector(
    (state: any) => state.accountReducer.account
  );

  const mappedFetchedAccountOwners = fetchedAccountOwners.map(
    (fetchedAccountOwner) => ({
      ...fetchedAccountOwner,
      value: fetchedAccountOwner.id,
      label1: `${fetchedAccountOwner.firstName} ${fetchedAccountOwner.lastName}`,
      label2: fetchedAccountOwner.email,
    })
  );

  // Country-State
  const countries: Country[] = Countries;
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [states, setStates] = useState<State[]>([]);

  useEffect(() => {
    if (contactId) {
      dispatch(getContactById(+contactId));
    } else {
      setContact(new ContactClass());
      dispatch(clearContact());
    }
  }, [dispatch, contactId]);

  useEffect(() => {
    if (contactId) {
      setContact(fetchedContact);
    }
  }, [contactId, fetchedContact]);

  const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value;
    setSelectedCountry(selectedCountry);

    const selectedCountryObject = countries.find(
      (country) => country.name === selectedCountry
    );



    if (selectedCountryObject) {
      setStates(selectedCountryObject.states);
    } else {
      setStates([]);
    }
  };

  const handleStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedState = e.target.value;
    setSelectedState(selectedState);
  };

  const handleFormSubmit = async (
    contact: Contact,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      contact.country = selectedCountry;
      contact.state = selectedState;
      contact.accountID = fetchedAccount.id;
      if (!contact.id) {
        dispatch(createContact(contact));
      } else {
        dispatch(updateContact(contact));
      }
    } catch (error) {
      console.log("error message:",error.errors);
    } finally {
      setSubmitting(false);
      navigate("/contacts");
    }
  };

  const validationSchema = Yup.object().shape({
    ownerId: Yup.string().required("Owner ID is required"),
  });

  return (
    <>
      <ToastContainer />
      <CCard>
        <CCardHeader className="mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-0">Create Or Edit Contact</h5>
            </div>
            <div className="text-end"></div>
          </div>
        </CCardHeader>
        <CCardBody>
          <Formik
            initialValues={contact}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ handleSubmit, isValid, isSubmitting }) => (
              <Form onSubmit={handleSubmit} autoComplete="off">
                <CRow className="justify-content-between">
                  <CCol xs={6}>
                    <CRow className="mb-3">
                      <CCol sm={4}>
                        <label htmlFor="ownerId" className="col-form-label">
                          Contact Owner
                          <span style={{ color: "red", fontSize: "25px" }}>
                            *
                          </span>
                        </label>
                      </CCol>
                      <CCol sm={8}>
                        <SearchDropdown
                          name="ownerId"
                          options={mappedFetchedAccountOwners}
                        />
                        <ErrorMessage
                          name="ownerId"
                          component="div"
                          className="invalid-feedback"
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={4}>
                        <label htmlFor="firstName" className="col-form-label">
                          First Name
                          <span style={{ color: "red", fontSize: "25px" }}>
                            *
                          </span>
                        </label>
                      </CCol>
                      <CCol sm={8}>
                        <Field
                          type="text"
                          id="firstName"
                          name="firstName"
                          className="form-control"
                          style={{ height: "50px" }}
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="invalid-feedback"
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={4}>
                        <label htmlFor="phone" className="col-form-label">
                          Phone
                        </label>
                      </CCol>
                      <CCol sm={8}>
                        <Field
                          type="text"
                          id="phone"
                          name="phone"
                          className="form-control"
                          placeholder="Enter your phone number"
                          style={{ height: "50px" }}
                        />
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="invalid-feedback"
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={4}>
                        <label htmlFor="mobile" className="col-form-label">
                          Mobile
                        </label>
                      </CCol>
                      <CCol sm={8}>
                        <Field
                          type="text"
                          id="mobile"
                          name="mobile"
                          className="form-control"
                          placeholder="Enter your mobile number"
                          style={{ height: "50px" }}
                        />
                        <ErrorMessage
                          name="mobile"
                          component="div"
                          className="invalid-feedback"
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={4}>
                        <label htmlFor="department" className="col-form-label">
                          Department
                        </label>
                      </CCol>
                      <CCol sm={8}>
                        <Field
                          type="text"
                          id="department"
                          name="department"
                          className="form-control"
                          placeholder="Enter department"
                          style={{ height: "50px" }}
                        />
                        <ErrorMessage
                          name="department"
                          component="div"
                          className="invalid-feedback"
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={4}>
                        <label htmlFor="homePhone" className="col-form-label">
                          Home Phone
                        </label>
                      </CCol>
                      <CCol sm={8}>
                        <Field
                          type="text"
                          id="homePhone"
                          name="homePhone"
                          className="form-control"
                          placeholder="Home phone"
                          style={{ height: "50px" }}
                        />
                        <ErrorMessage
                          name="homePhone"
                          component="div"
                          className="invalid-feedback"
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={4}>
                        <label htmlFor="linkedinUrl" className="col-form-label">
                          Linkedin URL
                        </label>
                      </CCol>
                      <CCol sm={8}>
                        <Field
                          type="text"
                          id="linkedinUrl"
                          name="linkedinURL"
                          className="form-control"
                          placeholder="Enter your LinkedIn URL"
                          style={{ height: "50px" }}
                        />
                        <ErrorMessage
                          name="linkedinURL"
                          component="div"
                          className="invalid-feedback"
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={4}>
                        <label
                          htmlFor="secondaryEmail"
                          className="col-form-label"
                        >
                          Secondary Email
                        </label>
                      </CCol>
                      <CCol sm={8}>
                        <Field
                          type="email"
                          id="secondaryEmail"
                          name="secondaryEmail"
                          className="form-control"
                          placeholder="name@example.com"
                          style={{ height: "50px" }}
                        />
                        <ErrorMessage
                          name="secondaryEmail"
                          component="div"
                          className="invalid-feedback"
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={4}>
                        <label htmlFor="city" className="col-form-label">
                          City
                        </label>
                      </CCol>
                      <CCol sm={8}>
                        <Field
                          type="text"
                          id="city"
                          name="city"
                          className="form-control"
                          placeholder="Enter your city"
                          style={{ height: "50px" }}
                        />
                        <ErrorMessage
                          name="city"
                          component="div"
                          className="invalid-feedback"
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={4}>
                        <label htmlFor="zip" className="col-form-label">
                          Zip
                        </label>
                      </CCol>
                      <CCol sm={8}>
                        <Field
                          type="text"
                          id="zip"
                          name="zip"
                          className="form-control"
                          placeholder="Enter your zip code"
                          style={{ height: "50px" }}
                        />
                        <ErrorMessage
                          name="zip"
                          component="div"
                          className="invalid-feedback"
                        />
                      </CCol>
                    </CRow>
                  </CCol>

                  <CCol xs={6}>
                    <CRow className="mb-3">
                      <CCol sm={4}>
                        <label htmlFor="lastName" className="col-form-label">
                          Last Name
                        </label>
                      </CCol>
                      <CCol sm={8}>
                        <Field
                          type="text"
                          id="lastName"
                          name="lastName"
                          className="form-control"
                          style={{ height: "50px" }}
                        />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="invalid-feedback"
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={4}>
                        <label htmlFor="email" className="col-form-label">
                          Email
                        </label>
                      </CCol>
                      <CCol sm={8}>
                        <Field
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="name@example.com"
                          style={{ height: "50px" }}
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="invalid-feedback"
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={4}>
                        <label htmlFor="otherPhone" className="col-form-label">
                          Other Phone
                        </label>
                      </CCol>
                      <CCol sm={8}>
                        <Field
                          type="text"
                          id="otherPhone"
                          name="otherPhone"
                          className="form-control"
                          placeholder="Enter your second phone number"
                          style={{ height: "50px" }}
                        />
                        <ErrorMessage
                          name="otherPhone"
                          component="div"
                          className="invalid-feedback"
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={4}>
                        <label htmlFor="title" className="col-form-label">
                          Title
                        </label>
                      </CCol>
                      <CCol sm={8}>
                        <Field
                          type="text"
                          id="title"
                          name="title"
                          className="form-control"
                          placeholder="Enter title"
                          style={{ height: "50px" }}
                        />
                        <ErrorMessage
                          name="title"
                          component="div"
                          className="invalid-feedback"
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={4}>
                        <label htmlFor="dateOfBirth" className="col-form-label">
                          Date of birth
                        </label>
                      </CCol>
                      <CCol sm={8}>
                        <Field
                          type="date"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          className="form-control"
                          placeholder="Enter DOB"
                          style={{ height: "50px" }}
                        />
                        <ErrorMessage
                          name="dateOfBirth"
                          component="div"
                          className="invalid-feedback"
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={4}>
                        <label htmlFor="skypeId" className="col-form-label">
                          Skype ID
                          <span style={{ color: "red", fontSize: "25px" }}>
                            *
                          </span>
                        </label>
                      </CCol>
                      <CCol sm={8}>
                        <Field
                          type="text"
                          id="skypeId"
                          name="skypeID"
                          className="form-control"
                          placeholder="Skype ID"
                          style={{ height: "50px" }}
                        />
                        <ErrorMessage
                          name="skypeId"
                          component="div"
                          className="invalid-feedback"
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={4}>
                        <label htmlFor="twitterUrl" className="col-form-label">
                          Twitter URL
                        </label>
                      </CCol>
                      <CCol sm={8}>
                        <Field
                          type="text"
                          id="twitterUrl"
                          name="twitterURL"
                          className="form-control"
                          placeholder="Enter your Twitter URL"
                          style={{ height: "50px" }}
                        />
                        <ErrorMessage
                          name="twitterURL"
                          component="div"
                          className="invalid-feedback"
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={4}>
                        <label
                          htmlFor="mailingStreet"
                          className="col-form-label"
                        >
                          Mailing Street
                        </label>
                      </CCol>
                      <CCol sm={8}>
                        <Field
                          type="text"
                          id="mailingStreet"
                          name="mailingStreet"
                          className="form-control"
                          placeholder="Enter your Mailing Street"
                          style={{ height: "50px" }}
                        />
                        <ErrorMessage
                          name="mailingStreet"
                          component="div"
                          className="invalid-feedback"
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={4}>
                        <label htmlFor="country" className="col-form-label">
                          Country
                        </label>
                      </CCol>
                      <CCol sm={8}>
                        <Field
                          as="select"
                          id="country"
                          name="country"
                          className="form-control"
                          onChange={handleCountryChange}
                          style={{ height: "50px" }}
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
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={4}>
                        <label htmlFor="state" className="col-form-label">
                          State
                        </label>
                      </CCol>
                      <CCol sm={8}>
                        <Field
                          as="select"
                          id="state"
                          name="state"
                          className="form-control"
                          onChange={handleStateChange}
                          style={{ height: "50px" }}
                        >
                          <option value="">
                            {selectedState ? selectedState : "Select State"}
                          </option>
                          {states.map((state) => (
                            <option key={state.id} value={state.name}>
                              {state.name}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="state"
                          component="div"
                          className="invalid-feedback"
                        />
                      </CCol>
                    </CRow>
               
                   
                  </CCol>
                  <CCol xs={12}>
                  <CRow className="mb-3">
                      <CCol sm={2}>
                        <label htmlFor="description" className="col-form-label">
                          Description
                        </label>
                      </CCol>
                      <CCol sm={10}>
                        <Field
                          as="textarea"
                          id="description"
                          name="description"
                          className="form-control"
                          placeholder="Leave a comment here"
                          style={{ height: "50px" }}
                        />
                        <ErrorMessage
                          name="description"
                          component="div"
                          className="invalid-feedback"
                        />
                      </CCol>
                    </CRow>
                  </CCol>
                  <CRow className="mb-3">
                      <CCol sm={12} className="text-end">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={isSubmitting || !isValid}
                        >
                          {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                        <Link to={`/contacts`}>
                          <CButton
                            component="input"
                            type="button"
                            color="secondary"
                            value="cancel"
                            // variant="outline"
                          />
                        </Link>
                      </CCol>
                    </CRow>
                </CRow>
              </Form>
            )}
          </Formik>
        </CCardBody>
      </CCard>
    </>
  );
};

export default CreateOrEditContact;
